// ======================
// WEBSITE SERVICE WORKER
// ======================

const CACHE_VERSION = "ourapp-v1"; // <-- bump when deploying
const CACHE_NAME = `ourapp-cache-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./offline.html"
];

// Install → download files for offline use
self.addEventListener("install", event => {
  console.log("[SW] Installing our update-ready service worker…");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Fetch → offline-first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).catch(() => caches.match("./offline.html"))
    )
  );
});

// Activate → claim control (NO CACHE DELETE YET)
self.addEventListener("activate", event => {
  console.log("[SW] Ready and waiting for user approval to update");
  event.waitUntil(self.clients.claim());
});

// Manual update trigger from main app
self.addEventListener("message", event => {
  if (event.data && event.data.type === "APPLY_UPDATE") {
    console.log("🔁 User accepted update → Applying now…");

    self.skipWaiting().then(async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );

      console.log("♻ Cache refreshed successfully!");

      const clients = await self.clients.matchAll();
      clients.forEach(client =>
        client.postMessage({ type: "UPDATE_DONE" })
      );
    });
  }
});
