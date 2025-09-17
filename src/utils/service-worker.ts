// ========================================
// SERVICE WORKER REGISTRATION - ELITE PERFORMANCE
// ========================================

export const registerServiceWorker = () => {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });

        console.log('Service Worker registered successfully:', registration);

        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nueva versión disponible
                if (confirm('Nueva versión disponible. ¿Recargar la página?')) {
                  window.location.reload();
                }
              }
            });
          }
        });

        // Manejar errores
        registration.addEventListener('error', (error) => {
          console.error('Service Worker registration failed:', error);
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  }
};

// ========================================
// CACHE MANAGEMENT
// ========================================

export const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
};

export const getCacheSize = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const key of keys) {
        const response = await cache.match(key);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return {
      totalSize,
      formattedSize: formatBytes(totalSize),
      cacheCount: cacheNames.length
    };
  }
  return null;
};

// ========================================
// OFFLINE DETECTION
// ========================================

export const useOfflineStatus = () => {
  // Note: This would need to be used in a React component
  // const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Note: This would need to be used in a React component
  // useEffect(() => {
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener('online', handleOnline);
  //   window.addEventListener('offline', handleOffline);

  //   return () => {
  //     window.removeEventListener('online', handleOnline);
  //     window.removeEventListener('offline', handleOffline);
  //   };
  // }, []);

  // return isOnline;
  return navigator.onLine;
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

export const monitorPerformance = () => {
  if (typeof window === 'undefined') return;

  // Monitorear Core Web Vitals
  if ('web-vitals' in window) {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric) => {
        console.log('CLS:', metric);
        // Enviar a analytics
      });

      onFCP((metric) => {
        console.log('FCP:', metric);
        // Enviar a analytics
      });

      onLCP((metric) => {
        console.log('LCP:', metric);
        // Enviar a analytics
      });

      onTTFB((metric) => {
        console.log('TTFB:', metric);
        // Enviar a analytics
      });

      onINP((metric) => {
        console.log('INP:', metric);
        // Enviar a analytics
      });
    });
  }

  // Monitorear recursos
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        console.log(`Resource: ${resource.name} - ${resource.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

// ========================================
// PRELOAD STRATEGY
// ========================================

export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    { href: '/images/shared/logo.svg', as: 'image' },
    { href: '/images/home-page-33/hero-bg.png', as: 'image' }
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
  });
};
