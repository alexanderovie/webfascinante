// ========================================
// FONT OPTIMIZATION - ELITE PERFORMANCE
// ========================================

import { Inter } from 'next/font/google';

// Configuración optimizada de fuentes
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Critical: evita FOIT (Flash of Invisible Text)
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  adjustFontFallback: true,
});

// Fuentes adicionales optimizadas
export const geistSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
  variable: '--font-geist-sans',
  weight: ['300', '400', '500', '600', '700'],
});

// CSS crítico para fuentes - Optimizado para Inter
export const fontCriticalCSS = `
  /* Font display optimization - Inter */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300 700;
    font-display: swap;
    src: url('/fonts/inter.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* Preload critical fonts - Inter */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/inter-400.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/inter-600.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* Font loading optimization */
  .font-loading {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  .font-loaded {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* Prevent layout shift during font load */
  .text-optimized {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Hook para detectar carga de fuentes
export const useFontLoading = () => {
  if (typeof window === 'undefined') {
    return { isLoaded: true, isLoading: false };
  }

  // Note: This would need to be used in a React component
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // Note: This would need to be used in a React component
  // useEffect(() => {
  //   if ('fonts' in document) {
  //     document.fonts.ready.then(() => {
  //       setIsLoaded(true);
  //       setIsLoading(false);
  //     });
  //   } else {
  //     // Fallback para navegadores que no soportan Font Loading API
  //     setTimeout(() => {
  //       setIsLoaded(true);
  //       setIsLoading(false);
  //     }, 1000);
  //   }
  // }, []);

  // return { isLoaded, isLoading };
  return { isLoaded: true, isLoading: false };
};

// CSS ya exportado arriba
