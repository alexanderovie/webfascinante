'use client';
import { useState } from 'react';
import Image from 'next/image';

// ========================================
// SUBTLE LOADER - MINIMAL & ELEGANT
// ========================================

interface SubtleLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const SubtleLoader = ({ 
  isLoading, 
  children, 
  fallback,
  className = '' 
}: SubtleLoaderProps) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={`relative ${className}`}>
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
        {fallback || (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-sm">Cargando...</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

// ========================================
// SKELETON LOADERS MINIMALISTAS
// ========================================

export const TextSkeleton = ({ 
  lines = 1, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-100 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

export const CardSkeleton = ({ 
  className = '' 
}: { 
  className?: string; 
}) => (
  <div className={`p-4 border border-gray-100 rounded-lg ${className}`}>
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded w-full"></div>
      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
    </div>
  </div>
);

export const ImageSkeleton = ({ 
  aspectRatio = 'aspect-video',
  className = '' 
}: { 
  aspectRatio?: string; 
  className?: string; 
}) => (
  <div className={`${aspectRatio} bg-gray-100 rounded-lg ${className}`}></div>
);

// ========================================
// PROGRESSIVE IMAGE LOADER
// ========================================

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const ProgressiveImage = ({ 
  src, 
  alt, 
  className = ''
}: Omit<ProgressiveImageProps, 'placeholder'>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Imagen real */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Error al cargar</div>
        </div>
      )}
    </div>
  );
};

// ========================================
// INLINE LOADING STATES
// ========================================

export const InlineLoader = ({ 
  text = 'Cargando...',
  size = 'sm' 
}: { 
  text?: string; 
  size?: 'sm' | 'md' | 'lg' 
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
      <span className="text-sm">{text}</span>
    </div>
  );
};

// ========================================
// BUTTON LOADING STATE
// ========================================

interface ButtonLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonLoader = ({ 
  isLoading,
  children,
  loadingText = 'Cargando...',
  className = '',
  disabled = false,
  onClick
}: ButtonLoaderProps) => {
  return (
    <button
      className={`relative ${className} ${(isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>
        {isLoading ? loadingText : children}
      </span>
    </button>
  );
};

// ========================================
// HOOK PARA LOADING STATES
// ========================================

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const toggleLoading = () => setIsLoading(prev => !prev);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading
  };
};
