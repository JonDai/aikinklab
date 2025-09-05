// Service Worker for AIKinkLab - Performance and Caching Strategy
const CACHE_NAME = 'aikinklab-v1.0.0';
const RUNTIME_CACHE = 'aikinklab-runtime';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/test',
  '/bdsm-test',
  '/lab',
  '/offline',
  '/manifest.json'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for frequently updated content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  event.respondWith(
    handleRequest(request)
  );
});

// Request handling logic
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets - cache first
    if (isStaticAsset(url)) {
      return handleStaticAsset(request);
    }
    
    // API requests - network first
    if (url.pathname.startsWith('/api/')) {
      return handleAPIRequest(request);
    }
    
    // HTML pages - stale while revalidate
    if (request.headers.get('accept')?.includes('text/html')) {
      return handleHTMLRequest(request);
    }
    
    // Images and media - cache first with runtime caching
    if (isImageOrMedia(request)) {
      return handleImageRequest(request);
    }
    
    // Default - network first
    return handleNetworkFirst(request);
    
  } catch (error) {
    console.error('Service Worker fetch error:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(CACHE_NAME);
      return cache.match('/offline') || new Response('Offline', { status: 503 });
    }
    
    return new Response('Service Unavailable', { status: 503 });
  }
}

// Static assets handler - cache first
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  const response = await fetch(request);
  
  if (response.status === 200) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// API requests handler - network first with short cache
async function handleAPIRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      // Cache API responses for 5 minutes
      const responseToCache = response.clone();
      responseToCache.headers.set('sw-cache-time', Date.now().toString());
      cache.put(request, responseToCache);
    }
    
    return response;
  } catch (error) {
    // Return cached version if network fails
    const cached = await cache.match(request);
    
    if (cached) {
      // Check if cache is still fresh (5 minutes)
      const cacheTime = cached.headers.get('sw-cache-time');
      const isFresh = cacheTime && (Date.now() - parseInt(cacheTime)) < 300000;
      
      if (isFresh) {
        return cached;
      }
    }
    
    throw error;
  }
}

// HTML requests handler - stale while revalidate
async function handleHTMLRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  
  // Fetch updated version in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });
  
  // Return cached version immediately if available
  if (cached) {
    return cached;
  }
  
  // Wait for network if no cache available
  return fetchPromise;
}

// Image and media handler - cache first with size limits
async function handleImageRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  const response = await fetch(request);
  
  if (response.status === 200) {
    // Only cache images smaller than 5MB
    const contentLength = response.headers.get('content-length');
    if (!contentLength || parseInt(contentLength) < 5 * 1024 * 1024) {
      cache.put(request, response.clone());
    }
  }
  
  return response;
}

// Network first handler
async function handleNetworkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Utility functions
function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|woff|woff2|ttf|eot|ico|png|jpg|jpeg|gif|svg|webp|avif)$/);
}

function isImageOrMedia(request) {
  return request.headers.get('accept')?.includes('image/') ||
         request.url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|mp4|webm|mp3|wav)$/);
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    // Sync any queued analytics data
    const queuedData = await getQueuedAnalytics();
    
    if (queuedData.length > 0) {
      await fetch('/api/analytics/sync', {
        method: 'POST',
        body: JSON.stringify(queuedData),
        headers: { 'Content-Type': 'application/json' }
      });
      
      await clearAnalyticsQueue();
      console.log('Analytics data synced');
    }
  } catch (error) {
    console.error('Analytics sync failed:', error);
  }
}

async function getQueuedAnalytics() {
  // Return empty array for now - would integrate with IndexedDB
  return [];
}

async function clearAnalyticsQueue() {
  // Clear the analytics queue - would integrate with IndexedDB
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      tag: 'aikinklab-notification',
      requireInteraction: false
    })
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker registered successfully');