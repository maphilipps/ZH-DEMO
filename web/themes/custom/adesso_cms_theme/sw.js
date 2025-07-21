/**
 * @file
 * Service Worker for adesso CMS theme
 * Provides caching strategies for improved performance
 */

const CACHE_NAME = 'adesso-cms-v1';
const STATIC_CACHE = 'adesso-cms-static-v1';
const DYNAMIC_CACHE = 'adesso-cms-dynamic-v1';

// Cache duration in milliseconds
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  DYNAMIC: 24 * 60 * 60 * 1000,    // 1 day
  API: 5 * 60 * 1000,              // 5 minutes
};

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/themes/custom/adesso_cms_theme/dist/assets/adesso.css',
  '/themes/custom/adesso_cms_theme/src/js/error-handler.js',
  '/themes/custom/adesso_cms_theme/logo.svg',
  '/themes/custom/adesso_cms_theme/components/',
];

// Network first resources (always try network, fallback to cache)
const NETWORK_FIRST = [
  '/api/',
  '/admin/',
  '/user/',
  '/?q=',
];

// Cache first resources (serve from cache, update in background)
const CACHE_FIRST = [
  '.css',
  '.js',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.woff',
  '.woff2',
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS.filter(asset => asset.length > 0));
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
  
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName.startsWith('adesso-cms-') && cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Take control of all clients
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Skip admin and development requests
  if (NETWORK_FIRST.some(pattern => url.pathname.includes(pattern))) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Cache first for static assets
  if (CACHE_FIRST.some(pattern => url.pathname.includes(pattern))) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Stale while revalidate for HTML pages
  event.respondWith(staleWhileRevalidate(request));
});

/**
 * Network first strategy - try network, fallback to cache
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    const cached = await caches.match(request);
    return cached || new Response('Network error occurred', { 
      status: 408, 
      statusText: 'Request Timeout' 
    });
  }
}

/**
 * Cache first strategy - serve from cache, update in background
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  
  if (cached && !isExpired(cached)) {
    // Update cache in background
    updateCache(request);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    return cached || new Response('Resource not available', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

/**
 * Stale while revalidate strategy
 */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => {
    // Fetch failed, return cached version if available
    return cached;
  });
  
  return cached || fetchPromise;
}

/**
 * Update cache in background
 */
async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

/**
 * Check if cached response is expired
 */
function isExpired(response) {
  const date = response.headers.get('date');
  if (!date) return false;
  
  const responseTime = new Date(date).getTime();
  const now = Date.now();
  
  // Determine cache duration based on content type
  let duration = CACHE_DURATION.DYNAMIC;
  const contentType = response.headers.get('content-type') || '';
  
  if (contentType.includes('text/css') || contentType.includes('javascript')) {
    duration = CACHE_DURATION.STATIC;
  } else if (response.url.includes('/api/')) {
    duration = CACHE_DURATION.API;
  }
  
  return (now - responseTime) > duration;
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

/**
 * Perform background sync when connectivity is restored
 */
async function doBackgroundSync() {
  // Implementation for syncing offline actions
  console.log('Performing background sync...');
  
  // This could sync form submissions, analytics events, etc.
  // that were queued while offline
}

// Message handling for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    updateCache(new Request(event.data.url));
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(DYNAMIC_CACHE);
  }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
  );
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled promise rejection:', event.reason);
});

console.log('Service Worker registered successfully');