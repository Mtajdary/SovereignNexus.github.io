const CACHE_NAME = 'prime-crown-v2.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './static/js/bundle.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => Promise.resolve());
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        }).catch(() => caches.match('./index.html'))
      );
    })
  );
});
