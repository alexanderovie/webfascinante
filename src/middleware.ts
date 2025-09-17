import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  // Verificar si la ruta es /assistant o /:locale/assistant
  const isAssistantPath = 
    url.pathname === '/assistant' ||
    url.pathname.startsWith('/assistant/') ||
    /^\/[a-zA-Z-]{2,5}\/assistant(\/|$)/.test(url.pathname);

  if (isAssistantPath) {
    // CSP restrictiva solo para /assistant
    // Comentario: Esta CSP es deliberadamente estricta para /assistant
    // para mitigar prompt-injection y XSS attacks
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval necesario para Next.js
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        "connect-src 'self' https://api.openai.com https://*.openai.com", // OpenAI API
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "media-src 'self'",
        "worker-src 'self' blob:",
      ].join('; ')
    );

    // Headers de seguridad adicionales
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // Header para indicar que es contenido del assistant
    response.headers.set('X-Assistant-Content', 'true');
  }

  return response;
}

export const config = {
  matcher: [
    '/assistant/:path*',
    '/:locale/assistant/:path*',
  ],
};
