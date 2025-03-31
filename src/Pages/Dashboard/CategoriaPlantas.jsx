// src/Pages/Dashboard/CategoriaPlantas.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { categoriaService } from '../../services/apiService';
import { useNotification } from '../../contexts/NotificationContext';
import IMAGES from '../../constants/images';
import Loader from '../../Components/UI/Loader';

const CategoriaPlantas = () => {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotification();
  
  const [categoria, setCategoria] = useState(null);
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoriaPlantas = async () => {
      try {
        setLoading(true);
        const response = await categoriaService.getCategoriaPlantas(categoriaId);
        
        if (response && response.categoria && response.plantas) {
          setCategoria(response.categoria);
          setPlantas(response.plantas);
        } else {
          throw new Error('No se encontraron datos de la categoría');
        }
      } catch (error) {
        console.error('Error al cargar categoría y plantas:', error);
        showError('No se pudo cargar la información de esta categoría');
      } finally {
        setLoading(false);
      }
    };
    
    if (categoriaId) {
      fetchCategoriaPlantas();
    }
  }, [categoriaId, showError]);
  
  const handlePlantaClick = (plantaId) => {
    navigate(`/categoria/${categoriaId}/planta/${plantaId}`);
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }
  
  if (!categoria) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-800">Categoría no encontrada</h2>
          <p className="mt-2 text-gray-500">La categoría que buscas no existe o no está disponible.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      {/* Cabecera de la categoría */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="mr-3 text-gray-600 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{categoria.nombre}</h1>
        </div>
        <p className="text-gray-600">{categoria.descripcion}</p>
      </div>
      
      {/* Filtros y ordenación */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Mostrar:</span>
            <select className="border border-gray-300 rounded-md p-2 text-sm">
              <option value="todos">Todas las plantas</option>
              <option value="disponibles">Disponibles</option>
              <option value="novedad">Novedades</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Ordenar por:</span>
            <select className="border border-gray-300 rounded-md p-2 text-sm">
              <option value="nombreAsc">Nombre (A-Z)</option>
              <option value="nombreDesc">Nombre (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Grid de plantas */}
      {plantas.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No hay plantas disponibles</h3>
          <p className="text-gray-600">
            Actualmente no hay plantas en esta categoría. Por favor, vuelve a revisar más tarde.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plantas.map((planta) => (
            <div 
              key={planta.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => handlePlantaClick(planta.id)}
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={planta.imagen} 
                  alt={planta.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IMAGES.FALLBACK;
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{planta.nombre}</h3>
                </div>
                
                {planta.nombreCientifico && (
                  <p className="text-sm text-gray-500 italic mb-2">{planta.nombreCientifico}</p>
                )}
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{planta.descripcionCorta || planta.descripcion}</p>
                
                {/* Características destacadas */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {planta.caracteristicas && planta.caracteristicas.slice(0, 3).map((caract, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {caract}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CategoriaPlantas;