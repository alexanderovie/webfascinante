'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

// ========================================
// ELITE LOADING SYSTEM - GOOGLE PAGESPEED OPTIMIZED
// ========================================

interface LoadingState {
  isInitialLoad: boolean;
  isContentReady: boolean;
  progress: number;
}

// Skeleton Components for Critical Content
export const HeroSkeleton = () => (
  <div className="animate-pulse space-y-6 pt-[200px] pb-[100px]">
    <div className="text-center space-y-4">
      <div className="h-16 bg-gray-200 rounded-lg mx-auto w-3/4 max-w-2xl"></div>
      <div className="h-6 bg-gray-200 rounded mx-auto w-1/2 max-w-md"></div>
      <div className="h-4 bg-gray-200 rounded mx-auto w-1/3 max-w-sm"></div>
    </div>
    <div className="flex justify-center space-x-4">
      <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
      <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
    </div>
  </div>
);

export const ServicesSkeleton = () => (
  <div className="animate-pulse space-y-8 py-20">
    <div className="text-center space-y-4">
      <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
      <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto max-w-lg"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto max-w-md"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  </div>
);

export const BlogSkeleton = () => (
  <div className="animate-pulse space-y-8 py-20">
    <div className="text-center space-y-4">
      <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
      <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto max-w-lg"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Elite Loading Spinner - Optimized for Performance
export const EliteSpinner = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
      <div className="absolute inset-0 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

// Progress Indicator for Long Operations
export const ProgressLoader = ({ progress, message }: { progress: number; message: string }) => (
  <div className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl max-w-md w-full mx-4">
      <div className="text-center space-y-4">
        <EliteSpinner size="lg" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% completado</p>
      </div>
    </div>
  </div>
);

// Main Loading System Hook
export const useEliteLoading = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isInitialLoad: true,
    isContentReady: false,
    progress: 0
  });

  useEffect(() => {
    // Simulate progressive loading for better perceived performance
    const progressInterval = setInterval(() => {
      setLoadingState(prev => {
        if (prev.progress >= 100) {
          clearInterval(progressInterval);
          return { ...prev, isContentReady: true, isInitialLoad: false };
        }
        return { ...prev, progress: prev.progress + Math.random() * 15 };
      });
    }, 100);

    // Ensure loading completes within reasonable time
    const timeout = setTimeout(() => {
      setLoadingState(prev => ({ ...prev, isContentReady: true, isInitialLoad: false, progress: 100 }));
      clearInterval(progressInterval);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  return loadingState;
};

// Elite Loading Screen Component
export const EliteLoadingScreen = () => {
  const { isInitialLoad, progress } = useEliteLoading();

  if (!isInitialLoad) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-4">
        {/* Brand Logo Placeholder */}
        <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto flex items-center justify-center">
          <span className="text-white font-bold text-xl">FD</span>
        </div>
        
        {/* Loading Animation */}
        <div className="space-y-4">
          <EliteSpinner size="lg" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fascinante Digital
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparando tu experiencia digital...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Tips */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>✨ Optimizando para Google PageSpeed</p>
          <p>🚀 Cargando contenido de forma inteligente</p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Wrapper for Components
export const SkeletonWrapper = ({ 
  children, 
  isLoading, 
  skeleton 
}: { 
  children: React.ReactNode; 
  isLoading: boolean; 
  skeleton: React.ReactNode; 
}) => {
  if (isLoading) return <>{skeleton}</>;
  return <>{children}</>;
};

export default EliteLoadingScreen;
