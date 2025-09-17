'use client';
import { useState } from 'react';
import { 
  ProfessionalLoader, 
  MinimalHeroSkeleton, 
  MinimalCardSkeleton, 
  MinimalBlogSkeleton,
  InlineSpinner,
  DotsLoader,
  useLoading
} from './ProfessionalLoader';
import { SubtleLoader } from './SubtleLoader';

// ========================================
// EJEMPLO DE USO DEL LOADING PROFESIONAL
// ========================================

export const LoadingExample = () => {
  const [showFullLoader, setShowFullLoader] = useState(false);
  const [showSectionLoader, setShowSectionLoader] = useState(false);
  const { isLoading, setLoading } = useLoading();

  const handleFullLoader = () => {
    setShowFullLoader(true);
    setTimeout(() => setShowFullLoader(false), 3000);
  };

  const handleSectionLoader = () => {
    setShowSectionLoader(true);
    setTimeout(() => setShowSectionLoader(false), 2000);
  };

  const handleButtonLoader = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Loading Profesional - Ejemplos
        </h1>
        <p className="text-gray-600">
          Diferentes tipos de loading states para una experiencia elegante
        </p>
      </div>

      {/* Full Page Loader */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Full Page Loader</h2>
        <button
          onClick={handleFullLoader}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Mostrar Full Loader
        </button>
        <ProfessionalLoader 
          isVisible={showFullLoader}
          onComplete={() => console.log('Loading completado')}
        />
      </section>

      {/* Section Loader */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Section Loader</h2>
        <button
          onClick={handleSectionLoader}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Mostrar Section Loader
        </button>
        <SubtleLoader isLoading={showSectionLoader}>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contenido de la Sección
            </h3>
            <p className="text-gray-600">
              Este contenido se muestra normalmente, pero cuando está cargando,
              aparece un overlay sutil con el indicador de loading.
            </p>
          </div>
        </SubtleLoader>
      </section>

      {/* Skeleton Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Skeleton Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Text Skeleton</h3>
            <MinimalHeroSkeleton />
            <MinimalCardSkeleton />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Card Skeleton</h3>
            <MinimalCardSkeleton />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Image Skeleton</h3>
            <MinimalBlogSkeleton />
          </div>
        </div>
      </section>

      {/* Inline Loaders */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Inline Loaders</h2>
        <div className="flex flex-wrap gap-4">
          <InlineSpinner size="sm" />
          <InlineSpinner size="md" />
          <InlineSpinner size="lg" />
        </div>
      </section>

      {/* Button Loaders */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Button Loaders</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleButtonLoader}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {isLoading && <DotsLoader />}
            Guardar Cambios
          </button>
          
          <button
            onClick={handleButtonLoader}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            {isLoading && <DotsLoader />}
            Eliminar
          </button>
        </div>
      </section>

      {/* Grid of Cards with Loading */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Grid con Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SubtleLoader
              key={i}
              isLoading={i < 3}
              fallback={<MinimalCardSkeleton />}
            >
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Card {i + 1}
                </h3>
                <p className="text-gray-600 text-sm">
                  Este es el contenido de la card {i + 1}. 
                  Las primeras 3 cards están en estado de loading.
                </p>
              </div>
            </SubtleLoader>
          ))}
        </div>
      </section>
    </div>
  );
};
