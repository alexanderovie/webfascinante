'use client';
import { useEffect, useState } from 'react';

// ========================================
// MINIMAL LOADER - ULTRA FAST SITES
// ========================================

interface MinimalLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const MinimalLoader = ({ isVisible, onComplete }: MinimalLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Carga ultra rápida - solo 800ms máximo
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.();
          }, 100);
          return 100;
        }
        return prev + Math.random() * 25; // Progreso más rápido
      });
    }, 50); // Intervalo más corto

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-4 max-w-xs mx-auto px-4">
        {/* Logo minimalista */}
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
        </div>

        {/* Progress bar sutil */}
        <div className="w-full bg-gray-100 rounded-full h-0.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Texto mínimo */}
        <div className="text-xs text-gray-500">
          {progress < 100 ? 'Cargando...' : 'Listo'}
        </div>
      </div>
    </div>
  );
};

// ========================================
// INSTANT LOADING STATES
// ========================================

export const InstantSkeleton = ({ 
  className = '' 
}: { 
  className?: string; 
}) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
  </div>
);

export const InstantCardSkeleton = () => (
  <div className="animate-pulse p-4 border border-gray-100 rounded-lg">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-6 h-6 bg-gray-100 rounded"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-100 rounded w-2/3 mb-1"></div>
        <div className="h-2 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// ========================================
// MICRO LOADING INDICATORS
// ========================================

export const MicroSpinner = () => (
  <div className="w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
);

export const MicroDots = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"
        style={{
          animationDelay: `${i * 0.1}s`,
          animationDuration: '0.6s'
        }}
      />
    ))}
  </div>
);

// ========================================
// SMART LOADING HOOK
// ========================================

export const useSmartLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'instant' | 'minimal' | 'full'>('instant');

  const startLoading = (type: 'instant' | 'minimal' | 'full' = 'instant') => {
    setLoadingType(type);
    setIsLoading(true);
    
    // Auto-stop basado en el tipo
    const duration = {
      instant: 200,
      minimal: 800,
      full: 2000
    }[type];
    
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    loadingType,
    startLoading,
    stopLoading
  };
};

// ========================================
// CONDITIONAL LOADING COMPONENT
// ========================================

interface ConditionalLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingType?: 'instant' | 'minimal' | 'full';
  className?: string;
}

export const ConditionalLoader = ({ 
  children, 
  fallback,
  loadingType = 'instant',
  className = ''
}: ConditionalLoaderProps) => {
  const { isLoading } = useSmartLoading();

  // Solo mostrar loading si es necesario
  if (!isLoading) return <>{children}</>;

  if (loadingType === 'instant') {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[0.5px] z-10 flex items-center justify-center">
          {fallback || <MicroSpinner />}
        </div>
        {children}
      </div>
    );
  }

  if (loadingType === 'minimal') {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
          {fallback || (
            <div className="flex items-center space-x-2 text-gray-500">
              <MicroSpinner />
              <span className="text-xs">Cargando...</span>
            </div>
          )}
        </div>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
