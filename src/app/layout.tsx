import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { CriticalResourcePreloader } from '@/components/shared/ResourcePreloader';
import ClientInitializer from '@/components/shared/ClientInitializer';
import { inter } from '@/utils/font';
import { ReactNode, Suspense } from 'react';
import { Metadata } from 'next';
import './globals.css';
import '../styles/loading.css';
import '../styles/professional-loading.css';

export const metadata: Metadata = {
  title: 'Fascinante Digital - Plataforma Digital de Vanguardia',
  description: 'Fascinante Digital es tu plataforma digital de vanguardia para el éxito empresarial. Soluciones innovadoras, tecnología de punta y resultados excepcionales.',
  keywords: 'fascinante digital, plataforma digital, tecnología, innovación, soluciones empresariales',
  authors: [{ name: 'Fascinante Digital' }],
  creator: 'Fascinante Digital',
  publisher: 'Fascinante Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fascinantedigital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fascinante Digital - Plataforma Digital de Vanguardia',
    description: 'Fascinante Digital es tu plataforma digital de vanguardia para el éxito empresarial. Soluciones innovadoras, tecnología de punta y resultados excepcionales.',
    url: 'https://fascinantedigital.com',
    siteName: 'Fascinante Digital',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fascinante Digital - Plataforma Digital de Vanguardia',
    description: 'Fascinante Digital es tu plataforma digital de vanguardia para el éxito empresarial.',
    creator: '@fascinantedigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical CSS for loading states */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .initial-load-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .dark .initial-load-screen {
              background: #000000;
            }
            .skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: skeleton-loading 1.5s infinite;
            }
            @keyframes skeleton-loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `
        }} />
        
               {/* Preload critical resources */}
               <link rel="preload" href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/shared/logo.svg" as="image" />
        <link rel="preload" href="/images/home-page-33/hero-bg.png" as="image" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientInitializer />
          <CriticalResourcePreloader />
          <Suspense fallback={
            <div className="initial-load-screen">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div className="w-4 h-4 border border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-gray-500">Cargando...</p>
              </div>
            </div>
          }>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
