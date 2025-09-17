'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

// ========================================
// MICRO-INTERACTIONS - ELITE UX FEEDBACK
// ========================================

// Button Loading States
export const ButtonLoader = ({ 
  isLoading, 
  children, 
  className 
}: { 
  isLoading: boolean; 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <button 
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        isLoading && 'cursor-not-allowed opacity-75',
        className
      )}
      disabled={isLoading}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={cn('transition-opacity duration-200', isLoading && 'opacity-0')}>
        {children}
      </span>
    </button>
  );
};

// Hover Loading Indicator
export const HoverLoader = ({ 
  children, 
  loadingText = "Cargando...",
  className 
}: { 
  children: React.ReactNode; 
  loadingText?: string;
  className?: string; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div
      className={cn('relative group', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
      
      {/* Hover Overlay */}
      {isHovered && !isLoading && (
        <div className="absolute inset-0 bg-blue-600/10 rounded-lg transition-opacity duration-200 flex items-center justify-center">
          <span className="text-blue-600 text-sm font-medium">Hover para cargar</span>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{loadingText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Skeleton Pulse Animation
export const SkeletonPulse = ({ 
  className, 
  count = 1 
}: { 
  className?: string; 
  count?: number; 
}) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded h-4 mb-2"></div>
      ))}
    </div>
  );
};

// Progressive Loading Bar
export const ProgressiveLoader = ({ 
  progress, 
  message, 
  showPercentage = true 
}: { 
  progress: number; 
  message: string; 
  showPercentage?: boolean; 
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {message}
        </span>
        {showPercentage && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
    </div>
  );
};

// Shimmer Effect for Loading States
export const ShimmerEffect = ({ 
  children, 
  isLoading 
}: { 
  children: React.ReactNode; 
  isLoading: boolean; 
}) => {
  return (
    <div className="relative overflow-hidden">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )}
    </div>
  );
};

// Loading Dots Animation
export const LoadingDots = ({ 
  size = 'md', 
  color = 'blue' 
}: { 
  size?: 'sm' | 'md' | 'lg'; 
  color?: 'blue' | 'gray' | 'purple'; 
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    purple: 'bg-purple-600'
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-bounce',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
};

// Performance Optimized Loading Component
export const PerformanceLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Hide loading after a short delay
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    // Ensure loading completes within 2 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-4">
        {/* Brand Logo with Animation */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-2xl">FD</span>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg opacity-20 animate-ping"></div>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fascinante Digital
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cargando tu experiencia digital...
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressiveLoader 
          progress={progress} 
          message="Preparando tu experiencia digital" 
        />

        {/* Performance Tips */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>✨ Diseño moderno y profesional</p>
          <p>🚀 Carga rápida y optimizada</p>
          <p>📱 Experiencia móvil perfecta</p>
          <p>🎯 Soluciones digitales efectivas</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceLoader;
