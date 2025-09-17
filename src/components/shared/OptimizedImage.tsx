'use client';
import Image from 'next/image';
import { useState } from 'react';

// ========================================
// OPTIMIZED IMAGE COMPONENT - ELITE PERFORMANCE
// ========================================

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 85,
  fill = false,
  style,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generar blur placeholder si no se proporciona
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="text-gray-400 text-sm">Error al cargar imagen</div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Imagen optimizada */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        quality={quality}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

// ========================================
// LAZY IMAGE COMPONENT
// ========================================

interface LazyImageProps extends OptimizedImageProps {
  threshold?: number;
  rootMargin?: string;
}

export const LazyImage = ({
  ...props
}: Omit<LazyImageProps, 'threshold' | 'rootMargin'>) => {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      placeholder="blur"
    />
  );
};

// ========================================
// HERO IMAGE COMPONENT
// ========================================

interface HeroImageProps extends OptimizedImageProps {
  title?: string;
  subtitle?: string;
  overlay?: boolean;
}

export const HeroImage = ({
  title,
  subtitle,
  overlay = true,
  ...props
}: HeroImageProps) => {
  return (
    <div className="relative w-full h-full">
      <OptimizedImage
        {...props}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
          <div className="max-w-4xl">
            {title && (
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// CARD IMAGE COMPONENT
// ========================================

interface CardImageProps extends OptimizedImageProps {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

export const CardImage = ({
  aspectRatio = 'video',
  ...props
}: CardImageProps) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  return (
    <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
      <OptimizedImage
        {...props}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

// ========================================
// AVATAR IMAGE COMPONENT
// ========================================

interface AvatarImageProps extends OptimizedImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarImage = ({
  size = 'md',
  ...props
}: AvatarImageProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}>
      <OptimizedImage
        {...props}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50px, 100px"
      />
    </div>
  );
};
