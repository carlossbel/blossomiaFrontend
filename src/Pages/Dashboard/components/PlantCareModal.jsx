import React from 'react';
import IMAGES from '../../../constants/images';

const PlantCareModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{plant.nombre}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <img 
                src={plant.imagen} 
                alt={plant.nombre}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMAGES.FALLBACK;
                }}
              />
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700 mb-4">{plant.descripcion}</p>
              <h3 className="font-semibold text-lg mb-3">Cuidados necesarios</h3>
              <div className="space-y-4">
                {plant.cuidados.map((cuidado, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                    <h4 className="font-medium text-gray-800">{cuidado.titulo}</h4>
                    <p className="text-sm text-gray-600">{cuidado.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCareModal;