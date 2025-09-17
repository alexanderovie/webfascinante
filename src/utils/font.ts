import { Inter } from 'next/font/google';

// Configuración optimizada de Inter siguiendo mejores prácticas Next.js 15
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Critical: evita FOIT (Flash of Invisible Text)
  preload: true,
  variable: '--font-inter', // Variable para Tailwind CSS
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
  // No especificamos weight para variable fonts (Inter es variable)
  // Next.js maneja automáticamente los pesos
});

export { inter };
