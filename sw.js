const CACHE_NAME = 'laotou-site-v5';
const urlsToCache = ['./', './index.html', './avatar.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))); self.skipWaiting(); });
self.addEventListener('fetch', e => { if(e.request.mode === 'navigate') { e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request))); } else { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); } });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });