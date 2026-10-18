const CACHE_NAME = 'tabungan-fm-shell-v8';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './app-config.js',
  './assets/icon-192.png?v=20261018',
  './assets/icon-512.png?v=20261018',
  './assets/apple-touch-icon.png?v=20261018'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Biarkan Google Apps Script menangani semua request aplikasi dan login.
  if (url.origin !== self.location.origin || request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          return (await caches.match('./index.html')) || Response.error();
        }
        return Response.error();
      })
  );
});
