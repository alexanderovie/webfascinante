'use client';
import { useEffect, useState, useRef } from 'react';
// import { cn } from '@/utils/cn';

// ========================================
// CRITICAL PATH LOADER - GOOGLE PAGESPEED OPTIMIZED
// ========================================

interface CriticalPathState {
  fontsLoaded: boolean;
  imagesLoaded: boolean;
  scriptsLoaded: boolean;
  isReady: boolean;
}

// Optimized Font Loading Checker
const checkFontsLoaded = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => resolve(true));
    } else {
      // Fallback for older browsers
      setTimeout(() => resolve(true), 100);
    }
  });
};

// Optimized Image Loading Checker
const checkImagesLoaded = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const images = document.querySelectorAll('img');
    if (images.length === 0) {
      resolve(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        resolve(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.addEventListener('load', checkComplete);
        img.addEventListener('error', checkComplete);
      }
    });

    // Timeout fallback
    setTimeout(() => resolve(true), 3000);
  });
};

// Critical Path Loading Hook
export const useCriticalPathLoader = () => {
  const [state, setState] = useState<CriticalPathState>({
    fontsLoaded: false,
    imagesLoaded: false,
    scriptsLoaded: false,
    isReady: false
  });

  useEffect(() => {
    const loadCriticalPath = async () => {
      try {
        // Load fonts first (critical for layout)
        const fontsLoaded = await checkFontsLoaded();
        setState(prev => ({ ...prev, fontsLoaded }));

        // Load images in parallel
        const imagesLoaded = await checkImagesLoaded();
        setState(prev => ({ ...prev, imagesLoaded }));

        // Check if scripts are loaded
        const scriptsLoaded = document.readyState === 'complete';
        setState(prev => ({ ...prev, scriptsLoaded }));

        // All critical resources loaded
        if (fontsLoaded && imagesLoaded && scriptsLoaded) {
          setState(prev => ({ ...prev, isReady: true }));
        }
      } catch (error) {
        console.warn('Critical path loading error:', error);
        // Fallback: mark as ready after timeout
        setTimeout(() => {
          setState(prev => ({ ...prev, isReady: true }));
        }, 1000);
      }
    };

    loadCriticalPath();
  }, []);

  return state;
};

// Critical Path Skeleton Components
export const CriticalHeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div className="text-center space-y-6 max-w-2xl mx-4">
      {/* Logo Skeleton */}
      <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
      
      {/* Title Skeleton */}
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded-lg mx-auto w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded mx-auto w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto w-1/3 animate-pulse"></div>
      </div>

      {/* CTA Buttons Skeleton */}
      <div className="flex justify-center space-x-4">
        <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Performance Optimized Loading Indicator
export const PerformanceLoader = ({ 
  isVisible, 
  message = "Optimizando para Google PageSpeed..." 
}: { 
  isVisible: boolean; 
  message?: string; 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

// Lazy Loading Wrapper with Skeleton
export const LazyLoadWrapper = ({ 
  children, 
  fallback, 
  threshold = 0.1 
}: { 
  children: React.ReactNode; 
  fallback: React.ReactNode; 
  threshold?: number; 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simulate loading delay for better UX
          setTimeout(() => setIsLoaded(true), 200);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      {isVisible ? (
        isLoaded ? children : fallback
      ) : (
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

// Google PageSpeed Optimized Loading States
export const PageSpeedOptimizedLoader = () => {
  const { isReady } = useCriticalPathLoader();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isReady) {
      // Add a small delay for better perceived performance
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Brand Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">FD</span>
        </div>
        
        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Fascinante Digital
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cargando experiencia optimizada...
          </p>
        </div>

        {/* Performance Indicators */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>⚡ Optimizado para Google PageSpeed</p>
          <p>🎯 Core Web Vitals mejorados</p>
          <p>🚀 Carga progresiva inteligente</p>
        </div>
      </div>
    </div>
  );
};

export default PageSpeedOptimizedLoader;
