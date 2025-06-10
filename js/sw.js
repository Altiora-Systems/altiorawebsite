// Service Worker for Altiora Systems
const CACHE_NAME = 'altiora-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/css/style.css',
    '/js/main.js',
    '/assets/images/AltioraSystems_NoText.png',
    '/assets/images/Barrel Link_No Tagline.png',
    '/assets/images/altiora systems background 2.png',
    '/assets/images/AltioraConnect_black_lightblue.png',
    '/assets/images/AltioraConnect_White_lightblue.png',
    '/assets/icons/facebook.svg',
    '/assets/icons/twitter.svg',
    '/assets/icons/linkedin.svg',
    '/assets/icons/instagram.svg',
    // Add additional assets as needed
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .then(response => {
                        // Cache fetched assets
                        if (event.request.method === 'GET' && response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Fallback to offline page for navigations
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});
