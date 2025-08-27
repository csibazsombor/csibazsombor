const cacheName = 'our-relationship-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon.png',
  '/Images'
];

// Install event → pre-cache the files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

// 🚫 Removed fetch listener → no automatic intercept

// Manual fetch + cache update function
async function manualUpdate() {
  const cache = await caches.open(cacheName);
  for (const file of filesToCache) {
    try {
      const response = await fetch(file, { cache: "no-store" });
      await cache.put(file, response.clone());
      console.log(`✅ Updated: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to fetch ${file}`, err);
    }
  }
}

// Listen for messages from the main app
self.addEventListener("message", event => {
  if (event.data && event.data.type === "MANUAL_UPDATE") {
    manualUpdate();
  }
});
