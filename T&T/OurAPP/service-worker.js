const cacheName = 'our-relationship-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/Images',
  '/fonts.css',
  '/offline.html'
];

// Install event → pre-cache the files
self.addEventListener('install', e => {
  console.log('[SW] Installing service worker...');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[SW] Caching files');
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// Activate event → clean up old caches
self.addEventListener('activate', e => {
  console.log('[SW] Activating service worker...');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Manual fetch + cache update function
async function manualUpdate() {
  console.log('[SW] Starting manual update...');
  const cache = await caches.open(cacheName);
  let successCount = 0;
  let failCount = 0;
  
  for (const file of filesToCache) {
    try {
      const response = await fetch(file, { cache: "no-store" });
      if (response.ok) {
        await cache.put(file, response.clone());
        console.log(`✅ Updated: ${file}`);
        successCount++;
      } else {
        console.warn(`⚠️ Failed to fetch ${file}: ${response.status}`);
        failCount++;
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${file}`, err);
      failCount++;
    }
  }
  
  // Notify the app of update completion
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'UPDATE_COMPLETE',
      success: successCount,
      failed: failCount,
      total: filesToCache.length
    });
  });
  
  console.log(`[SW] Update complete: ${successCount} success, ${failCount} failed`);
}

// Clear all caches
async function clearAllCaches() {
  console.log('[SW] Clearing all caches...');
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cache => caches.delete(cache)));
  console.log('[SW] All caches cleared');
  
  // Notify the app
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'CACHE_CLEARED' });
  });
}

// Get cache status
async function getCacheStatus() {
  const cache = await caches.open(cacheName);
  const cachedRequests = await cache.keys();
  const status = {
    cacheName,
    fileCount: cachedRequests.length,
    files: cachedRequests.map(req => req.url)
  };
  
  // Notify the app
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'CACHE_STATUS',
      data: status
    });
  });
}

// Listen for messages from the main app
self.addEventListener("message", event => {
  console.log('[SW] Message received:', event.data);
  
  if (!event.data || !event.data.type) return;
  
  switch (event.data.type) {
    case "MANUAL_UPDATE":
      event.waitUntil(manualUpdate());
      break;
      
    case "CLEAR_CACHE":
      event.waitUntil(clearAllCaches());
      break;
      
    case "GET_CACHE_STATUS":
      event.waitUntil(getCacheStatus());
      break;
      
    case "SKIP_WAITING":
      self.skipWaiting();
      break;
      
    default:
      console.warn('[SW] Unknown message type:', event.data.type);
  }
});

// Optional: Add a periodic background sync (if needed)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    console.log('[SW] Periodic sync triggered');
    event.waitUntil(manualUpdate());
  }
});

// Optional: Handle push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New update available',
    icon: '/icon-192.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Our Relationship', options)
  );
});

console.log('[SW] Service Worker loaded');