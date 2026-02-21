/**
 * Junior Jarvis — Service Worker
 * Cache-first strategy for full offline support.
 */

var CACHE_NAME = 'junior-jarvis-v6';
var ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'js/data.js',
  'js/engine.js',
  'js/speech.js',
  'js/effects.js',
  'js/ui.js',
  'js/metrics.js',
  'js/app.js',
  'manifest.json',
  'assets/icon-192.svg',
  'assets/icon-512.svg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      return cached || fetch(event.request);
    })
  );
});
