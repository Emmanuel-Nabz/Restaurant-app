// ============================================================
// SERVICE WORKER FOR NABZ-TECH EATS
// ============================================================

const CACHE_NAME = 'nabz-eats-v1';
const urlsToCache = [
    '/restaurant-app/',
    '/restaurant-app/restaurant.html',
    '/restaurant-app/manifest.json'
];

// Install the service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('✅ Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch from cache if available
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

// Update service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});