'use client';
import { useEffect } from 'react';

// ========================================
// RESOURCE PRELOADER - ELITE PERFORMANCE
// ========================================

interface ResourcePreloaderProps {
  criticalImages?: string[];
  criticalCSS?: string[];
  criticalJS?: string[];
  criticalFonts?: string[];
  prefetchPages?: string[];
}

export const ResourcePreloader = ({
  criticalImages = [],
  criticalCSS = [],
  criticalJS = [],
  criticalFonts = [],
  prefetchPages = []
}: ResourcePreloaderProps) => {
  useEffect(() => {
    // Preload imágenes críticas
    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload CSS crítico
    criticalCSS.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload JavaScript crítico
    criticalJS.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fuentes críticas
    criticalFonts.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = href;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch páginas probables
    prefetchPages.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }, [criticalImages, criticalCSS, criticalJS, criticalFonts, prefetchPages]);

  return null;
};

// ========================================
// CRITICAL RESOURCE PRELOADER
// ========================================

export const CriticalResourcePreloader = () => {
  const criticalResources = {
    criticalImages: [
      '/images/shared/logo.svg',
      '/images/home-page-33/hero-bg.png'
    ],
    criticalCSS: [],
    criticalJS: [],
    criticalFonts: [],
    prefetchPages: [
      '/about',
      '/services',
      '/contact',
      '/blog'
    ]
  };

  return <ResourcePreloader {...criticalResources} />;
};

// ========================================
// DYNAMIC RESOURCE PRELOADER
// ========================================

interface DynamicPreloaderProps {
  currentPath: string;
}

export const DynamicPreloader = ({ currentPath }: DynamicPreloaderProps) => {
  useEffect(() => {
    // Preload recursos basados en la ruta actual
    const routeResources: Record<string, string[]> = {
      '/': ['/images/hero-bg.webp', '/images/services-bg.webp'],
      '/about': ['/images/about-hero.webp', '/images/team.webp'],
      '/services': ['/images/services-hero.webp', '/images/service-1.webp'],
      '/contact': ['/images/contact-hero.webp', '/images/map.webp'],
      '/blog': ['/images/blog-hero.webp', '/images/blog-1.webp']
    };

    const resources = routeResources[currentPath] || [];
    
    resources.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, [currentPath]);

  return null;
};

// ========================================
// INTERSECTION OBSERVER PRELOADER
// ========================================

interface LazyPreloaderProps {
  threshold?: number;
  rootMargin?: string;
}

export const LazyPreloader = ({ 
  threshold = 0.1, 
  rootMargin = '100px' 
}: LazyPreloaderProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              // Preload imagen cuando está cerca de ser visible
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = src;
              link.crossOrigin = 'anonymous';
              document.head.appendChild(link);
              
              // Cargar imagen
              img.src = src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observar todas las imágenes lazy
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return null;
};

// ========================================
// PERFORMANCE MONITOR
// ========================================

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitorear Core Web Vitals
    if ('web-vitals' in window) {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
        onINP(console.log);
      });
    }

    // Monitorear recursos cargados
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          console.log(`Resource loaded: ${entry.name} in ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
};
