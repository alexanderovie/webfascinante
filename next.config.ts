import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@public': './public',
    },
  },
  
  // Optimizaciones de Performance Elite
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
  },
  
  // Headers de Cache Optimizados
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // Rewrites para integrar el assistant en /assistant
  async rewrites() {
    return [
      // Rewrite principal para /assistant
      {
        source: '/assistant',
        destination: 'https://assistant-fascinante-bw8hak5x0-alexanderoviedo.vercel.app/assistant',
      },
      // Rewrite para todas las rutas de /assistant/*
      {
        source: '/assistant/:path*',
        destination: 'https://assistant-fascinante-bw8hak5x0-alexanderoviedo.vercel.app/assistant/:path*',
      },
      // Rewrite para soporte i18n /:locale/assistant
      {
        source: '/:locale/assistant',
        destination: 'https://assistant-fascinante-bw8hak5x0-alexanderoviedo.vercel.app/:locale/assistant',
      },
      // Rewrite para rutas i18n /:locale/assistant/*
      {
        source: '/:locale/assistant/:path*',
        destination: 'https://assistant-fascinante-bw8hak5x0-alexanderoviedo.vercel.app/:locale/assistant/:path*',
      },
    ];
  },
};

export default nextConfig;
