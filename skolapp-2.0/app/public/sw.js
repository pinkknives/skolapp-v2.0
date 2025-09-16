const CACHE_NAME = 'skolapp-shell-v1';
const DATA_CACHE = 'skolapp-data-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/quizzes.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Data strategy for quizzes.json: cache-first with background update
  if (request.url.endsWith('/quizzes.json')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(DATA_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then(res => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => undefined);
        return cached || networkPromise || new Response('[]', { headers: { 'Content-Type': 'application/json' } });
      })()
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).catch(() => caches.match('/index.html'));
    })
  );
});
