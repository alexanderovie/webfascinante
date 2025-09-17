'use client';
import { useEffect, useState } from 'react';

// ========================================
// PROFESSIONAL LOADER - SUBTLE & ELEGANT
// ========================================

interface ProfessionalLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const ProfessionalLoader = ({ isVisible, onComplete }: ProfessionalLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Simular progreso realista
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-6 max-w-sm mx-auto px-6">
        {/* Logo/Brand */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">
            {isComplete ? 'Completado' : `${Math.round(progress)}%`}
          </div>
        </div>

        {/* Subtle Message */}
        <div className="text-sm text-gray-600">
          {isComplete ? 'Listo' : 'Cargando experiencia digital...'}
        </div>
      </div>
    </div>
  );
};

// ========================================
// MINIMAL SKELETON COMPONENTS
// ========================================

export const MinimalHeroSkeleton = () => (
  <div className="animate-pulse space-y-6 pt-32 pb-16">
    <div className="text-center space-y-4">
      <div className="h-12 bg-gray-100 rounded-lg mx-auto w-2/3 max-w-xl"></div>
      <div className="h-5 bg-gray-100 rounded mx-auto w-1/2 max-w-md"></div>
    </div>
    <div className="flex justify-center space-x-4">
      <div className="h-10 bg-gray-100 rounded-lg w-28"></div>
      <div className="h-10 bg-gray-100 rounded-lg w-28"></div>
    </div>
  </div>
);

export const MinimalCardSkeleton = () => (
  <div className="animate-pulse space-y-4 p-6 border border-gray-100 rounded-xl">
    <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-100 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 rounded w-full"></div>
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
    </div>
  </div>
);

export const MinimalBlogSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="aspect-video bg-gray-100 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-100 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 rounded w-full"></div>
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
    </div>
    <div className="flex items-center space-x-2">
      <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
      <div className="h-4 bg-gray-100 rounded w-20"></div>
    </div>
  </div>
);

// ========================================
// INLINE LOADING INDICATORS
// ========================================

export const InlineSpinner = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-2 border-gray-200 border-t-blue-600 rounded-full"></div>
    </div>
  );
};

export const DotsLoader = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
        style={{
          animationDelay: `${i * 0.2}s`,
          animationDuration: '1s'
        }}
      />
    ))}
  </div>
);

// ========================================
// PROGRESSIVE LOADING HOOK
// ========================================

export const useProgressiveLoading = () => {
  const [loadingState, setLoadingState] = useState({
    isInitialLoad: true,
    isContentReady: false,
    progress: 0
  });

  useEffect(() => {
    // Simular carga progresiva
    const timer = setTimeout(() => {
      setLoadingState(prev => ({
        ...prev,
        isContentReady: true,
        progress: 100
      }));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return loadingState;
};

// ========================================
// CONTEXT FOR LOADING STATE
// ========================================

import { createContext, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
