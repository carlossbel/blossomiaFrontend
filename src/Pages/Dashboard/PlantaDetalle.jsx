// src/Pages/Dashboard/PlantaDetalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { categoriaService } from '../../services/apiService';
import { useNotification } from '../../contexts/NotificationContext';
import Loader from '../../Components/UI/Loader';
import Button from '../../Components/UI/Button';
import IMAGES from '../../constants/images';

const PlantaDetalle = () => {
  const { plantaId, categoriaId } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [showAllCuidados, setShowAllCuidados] = useState(false);

  useEffect(() => {
    const fetchPlantaDetalle = async () => {
      try {
        setLoading(true);
        const response = await categoriaService.getPlantaDetalle(plantaId);
        
        if (response && response.planta) {
          setPlanta(response.planta);
        } else {
          throw new Error('No se encontraron datos de la planta');
        }
      } catch (error) {
        console.error('Error al cargar detalles de la planta:', error);
        showError('No se pudieron cargar los detalles de la planta');
      } finally {
        setLoading(false);
      }
    };

    if (plantaId) {
      fetchPlantaDetalle();
    }
  }, [plantaId, showError]);

  const handleGoBack = () => {
    navigate(`/categoria/${categoriaId}`);
  };

  const cambiarImagen = (index) => {
    setImagenActiva(index);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Cargando información de la planta..." />
      </DashboardLayout>
    );
  }

  if (!planta) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">Planta no encontrada</h3>
          <p className="mt-1 text-gray-500">No pudimos encontrar los detalles de esta planta.</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Volver a categorías
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const imagenes = planta.imagenes || [planta.imagen];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver a categorías
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Columna de imágenes */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden h-80 border border-gray-200">
              <img
                src={imagenes[imagenActiva]}
                alt={planta.nombre}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMAGES.FALLBACK;
                }}
              />
            </div>
            
            {/* Miniaturas de imágenes adicionales */}
            {imagenes.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {imagenes.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => cambiarImagen(index)}
                    className={`w-16 h-16 border ${
                      index === imagenActiva ? 'border-gray-700' : 'border-gray-200'
                    } rounded-md overflow-hidden flex-shrink-0`}
                  >
                    <img
                      src={img}
                      alt={`${planta.nombre} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = IMAGES.FALLBACK;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna de información */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{planta.nombre}</h1>
            </div>
            
            {planta.nombreCientifico && (
              <p className="text-gray-500 italic mb-4">{planta.nombreCientifico}</p>
            )}

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <p className="text-gray-700 leading-relaxed">
                {planta.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {planta.detalles && Object.entries(planta.detalles).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-md border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de cuidados */}
        {planta.cuidados && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Guía de cuidados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(planta.cuidados)
                .slice(0, showAllCuidados ? Object.entries(planta.cuidados).length : 4)
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2 capitalize">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-600">{value}</p>
                  </div>
                ))}
            </div>
            
            {Object.entries(planta.cuidados).length > 4 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllCuidados(!showAllCuidados)}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  {showAllCuidados ? 'Mostrar menos' : 'Ver todos los cuidados'} 
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 inline-block ml-1 transform ${showAllCuidados ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sección de consejos */}
        {planta.consejos && planta.consejos.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Consejos adicionales</h2>
            
            <div className="bg-green-50 p-5 rounded-md border border-green-100">
              <ul className="space-y-3">
                {planta.consejos.map((consejo, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PlantaDetalle;