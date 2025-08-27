const cacheName = 'our-relationship-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon.png',
  '/Images'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
