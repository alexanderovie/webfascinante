// ========================================
// SERVICE WORKER - ELITE CACHE STRATEGY
// ========================================

const CACHE_NAME = 'fascinante-digital-v1';
const STATIC_CACHE = 'fascinante-static-v1';
const DYNAMIC_CACHE = 'fascinante-dynamic-v1';

// Recursos críticos para cache
const CRITICAL_RESOURCES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/styles/critical.css',
  '/styles/loading.css',
  '/fonts/inter-tight-400.woff2',
  '/fonts/inter-tight-600.woff2',
  '/images/logo.webp',
  '/images/hero-bg.webp'
];

// Estrategias de cache
const CACHE_STRATEGIES = {
  // Cache First: Para recursos estáticos
  CACHE_FIRST: 'cache-first',
  // Network First: Para contenido dinámico
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate: Para recursos que pueden ser stale
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching critical resources...');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo interceptar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }

  // Estrategia basada en el tipo de recurso
  if (isStaticResource(request)) {
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request));
  } else if (isPageRequest(request)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// ========================================
// CACHE STRATEGIES
// ========================================

// Cache First: Para recursos estáticos (CSS, JS, imágenes)
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Network First: Para APIs y contenido dinámico
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Stale While Revalidate: Para páginas HTML
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function isStaticResource(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|woff2?|png|jpg|jpeg|gif|webp|avif|svg|ico)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || url.hostname.includes('api.');
}

function isPageRequest(request) {
  return request.method === 'GET' && request.headers.get('accept').includes('text/html');
}

// ========================================
// BACKGROUND SYNC
// ========================================

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync triggered');
  // Implementar lógica de sincronización en segundo plano
}

// ========================================
// PUSH NOTIFICATIONS
// ========================================

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/icon-192x192.png',
      badge: '/images/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Ver más',
          icon: '/images/checkmark.png'
        },
        {
          action: 'close',
          title: 'Cerrar',
          icon: '/images/xmark.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// ========================================
// NOTIFICATION CLICK
// ========================================

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
