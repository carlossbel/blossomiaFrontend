import React, { useState } from 'react';
import IMAGES from '../../../constants/images';

const PlantGallery = () => {
  const [activeImage, setActiveImage] = useState(null);
  
  // Preparar todas las colecciones de imágenes para la galería
  const allCollections = [
    {
      name: 'Monstera Deliciosa',
      images: IMAGES.PLANTS.monstera,
      id: 'monstera'
    },
    {
      name: 'Lavanda',
      images: IMAGES.PLANTS.lavanda,
      id: 'lavanda'
    },
    {
      name: 'Jardín Tropical',
      images: IMAGES.PLANTS.jardinTropical,
      id: 'jardin-tropical'
    },
    {
      name: 'Orquídeas',
      images: IMAGES.PLANTS.orquideas,
      id: 'orquideas'
    },
    {
      name: 'Cactus',
      images: IMAGES.PLANTS.cactus,
      id: 'cactus'
    },
    {
      name: 'Cactus Estrella',
      images: IMAGES.PLANTS.cactusEstrella,
      id: 'cactus-estrella'
    },
    {
      name: 'Suculentas',
      images: IMAGES.PLANTS.suculentas,
      id: 'suculentas'
    },
    {
      name: 'Nenúfar',
      images: IMAGES.PLANTS.nenufar,
      id: 'nenufar'
    },
    {
      name: 'Pothos',
      images: IMAGES.PLANTS.pothos,
      id: 'pothos'
    }
  ];

  // Abrir imagen en vista ampliada
  const openImage = (collection, imageIndex) => {
    setActiveImage({
      src: collection.images[imageIndex],
      name: collection.name,
      index: imageIndex,
      collection: collection
    });
  };

  // Cerrar la vista ampliada
  const closeImage = () => {
    setActiveImage(null);
  };

  // Navegar a la siguiente o anterior imagen
  const navigateImage = (direction) => {
    if (!activeImage) return;
    
    const collection = activeImage.collection;
    let newIndex = activeImage.index + direction;
    
    // Ajustar índice si está fuera de rango
    if (newIndex < 0) newIndex = collection.images.length - 1;
    if (newIndex >= collection.images.length) newIndex = 0;
    
    setActiveImage({
      ...activeImage,
      src: collection.images[newIndex],
      index: newIndex
    });
  };

  return (
    <div className="plant-gallery">
      {/* Modal de vista ampliada */}
      {activeImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Botón para cerrar */}
            <button 
              onClick={closeImage}
              className="absolute top-4 right-4 text-white z-10 p-2 bg-black bg-opacity-50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navegación previa */}
            <button 
              onClick={() => navigateImage(-1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-10 p-2 bg-black bg-opacity-50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Imagen */}
            <div className="h-[80vh] flex flex-col items-center justify-center">
              <img 
                src={activeImage.src} 
                alt={`${activeImage.name}`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMAGES.FALLBACK;
                }}
              />
              <div className="text-white text-center mt-4">
                <h3 className="text-xl font-medium">{activeImage.name}</h3>
                <p className="text-sm text-gray-300">{`Imagen ${activeImage.index + 1} de ${activeImage.collection.images.length}`}</p>
              </div>
            </div>
            
            {/* Navegación siguiente */}
            <button 
              onClick={() => navigateImage(1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-10 p-2 bg-black bg-opacity-50 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Galería de imágenes */}
      <div className="space-y-8">
        {allCollections.map((collection) => (
          <div key={collection.id} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{collection.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {collection.images.map((image, index) => (
                <div 
                  key={`${collection.id}-${index}`} 
                  className="relative cursor-pointer overflow-hidden rounded-lg group"
                  onClick={() => openImage(collection, index)}
                >
                  <img 
                    src={image}
                    alt={`${collection.name} ${index + 1}`}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = IMAGES.FALLBACK;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantGallery;