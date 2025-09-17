"use client";

import { useEffect } from 'react';
import { registerServiceWorker, preloadCriticalResources } from '@/utils/service-worker';

export default function ClientInitializer() {
  useEffect(() => {
    // Registrar Service Worker
    registerServiceWorker();
    
    // Preload recursos críticos
    preloadCriticalResources();
  }, []);

  return null; // Este componente no renderiza nada
}
