'use strict';

const version = 'v1.26::';
const staticCacheName = version + 'static';
const pagesCacheName = 'pages';
const imagesCacheName = 'images';

const cacheList = [
    staticCacheName,
    pagesCacheName,
    imagesCacheName
];

const offlinePages = [
    '/',
    '/journal/',
    '/links/',
    '/articles/',
    '/notes/',
    '/about/',
    '/contact/'
];

function updateStaticCache() {
    return caches.open(staticCacheName)
    .then( cache => {
        // These items won't block the installation of the Service Worker
        cache.addAll([
            '/skins/default/images/bandstand.jpg'
        ].concat(offlinePages));
        // These items must be cached for the Service Worker to complete installation
        return cache.addAll([
            '/main.js',
            '/style.css',
            '/offline.html'
        ]);
    });
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
    .then( cache => {
        cache.keys()
        .then(keys => {
            if (keys.length > maxItems) {
                cache.delete(keys[0])
                .then(trimCache(cacheName, maxItems));
            }
        });
    });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
    .then( keys => {
        return Promise.all(keys
            .filter(key => !cacheList.includes(key))
            .map(key => caches.delete(key))
        );
    });
}

addEventListener('install', event => {
    event.waitUntil(
        updateStaticCache()
        .then( () => {
          skipWaiting()
        })
    );
});

addEventListener('activate', event => {
    event.waitUntil(
        clearOldCaches()
        .then( () => {
            clients.claim()
        })
    );
});

addEventListener('message', event => {
    if (event.data.command == 'trimCaches') {
        trimCache(pagesCacheName, 35);
        trimCache(imagesCacheName, 20);
    }
});

addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Ignore requests to some directories
    if (request.url.includes('/mint') || request.url.includes('/cms')) {
        return;
    }

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
            .then( responseFromFetch => {
                // NETWORK
                let copy = responseFromFetch.clone();
                if (offlinePages.includes(url.pathname) || offlinePages.includes(url.pathname + '/')) {
                    // Stash a copy of this page in the static cache
                    try {
                        event.waitUntil(
                            caches.open(staticCacheName)
                            .then( staticCache => {
                                staticCache.put(request, copy);
                            })
                        );
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    // Stash a copy of this page in the pages cache
                    try {
                        event.waitUntil(
                            caches.open(pagesCacheName)
                            .then( pagesCache => {
                                pagesCache.put(request, copy);
                            })
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
                return responseFromFetch;
            })
            .catch( fetchError => {
                console.error(fetchError);
                // CACHE or FALLBACK
                return caches.match(request)
                .then( responseFromCache => {
                    return responseFromCache || caches.match('/offline');
                });
            })
        );
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
        .then(responseFromCache => {
            // CACHE
            return responseFromCache || fetch(request)
            .then( responseFromFetch => {
                // NETWORK
                // If the request is for an image, stash a copy of this image in the images cache
                if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
                    let copy = responseFromFetch.clone();
                    try {
                        event.waitUntil(
                            caches.open(imagesCacheName)
                            .then( imagesCache => {
                                imagesCache.put(request, copy);
                            })
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
                return responseFromFetch;
            })
            .catch( fetchError => {
                console.error(fetchError);
                // OFFLINE
                // If the request is for an image, show an offline placeholder
                if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
                    return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                }
            });
        })
    );
});
