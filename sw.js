// ======================
// Service Worker Config
// ======================
const CACHE_VERSION = "czsomborweb-v4.5";
const CACHE_NAME = `cache-${CACHE_VERSION}`;

const CORE_ASSETS = [
    "/index.html",
    "/sw.js",
    "/JS/",
    "/CSS/",
    "/PAGE/",
    "/images/",

];

// ======================
// INSTALL
// ======================
self.addEventListener("install", event => {
  console.log("📥 Installing Service Worker...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching core files...");
      return cache.addAll(CORE_ASSETS);
    })
  );

  self.skipWaiting();
});

// ======================
// FETCH – Cache-first
// ======================
self.addEventListener("fetch", event => {
  const req = event.request;

  // Only handle same-origin
  if (!req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(req).then(cacheResp =>
      cacheResp ||
      fetch(req).then(networkResp => {
        if (networkResp && networkResp.ok) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, networkResp.clone());
          });
        }
        return networkResp;
      }).catch(() => cacheResp)
    )
  );
});

// ======================
// ACTIVATE
// ======================
self.addEventListener("activate", event => {
  console.log("✨ Activating new Service Worker...");

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );

  self.clients.claim();
});

// ======================
// Manual skipWaiting
// ======================
self.addEventListener("message", event => {
  if (event.data === "skipWaiting") {
    console.log("🔁 Forcing SW update...");
    self.skipWaiting();
  }
});
