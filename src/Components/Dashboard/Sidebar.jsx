// src/Components/Dashboard/Sidebar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { categoriaService } from '../../services/apiService';
import { useNotification } from '../../contexts/NotificationContext';
import Loader from '../UI/Loader';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { showError } = useNotification();
  
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar categorías desde el backend
  const fetchCategorias = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriaService.getCategorias();
      
      if (response && response.categorias) {
        setCategorias(response.categorias);
        console.log('Categorías cargadas:', response.categorias);
      } else {
        throw new Error('No se recibieron datos de categorías desde el servidor');
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setError(error.message || 'Error al cargar las categorías');
      showError('Error al cargar las categorías');
      
      // Usar datos de respaldo en caso de error
      setCategorias([
        { 
          id: 'interior', 
          nombre: 'Plantas de Interior', 
          descripcion: 'Perfectas para decorar tu hogar',
          imagen: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'exterior', 
          nombre: 'Plantas de Exterior', 
          descripcion: 'Resistentes y decorativas',
          imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'cactus', 
          nombre: 'Cactus y Suculentas', 
          descripcion: 'Ideales para principiantes',
          imagen: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'aromaticas', 
          nombre: 'Plantas Aromáticas', 
          descripcion: 'Hierbas para tu cocina',
          imagen: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'acuaticas', 
          nombre: 'Plantas Acuáticas', 
          descripcion: 'Para estanques y fuentes',
          imagen: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'tropicales', 
          nombre: 'Plantas Tropicales', 
          descripcion: 'Exóticas y llamativas',
          imagen: 'https://images.unsplash.com/photo-1572969036142-ef8de30f5b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'ornamentales', 
          nombre: 'Flores Ornamentales', 
          descripcion: 'Coloridas y decorativas',
          imagen: 'https://images.unsplash.com/photo-1599593892345-65ca6c7b62c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'bonsais', 
          nombre: 'Bonsáis', 
          descripcion: 'El arte de la miniatura',
          imagen: 'https://images.unsplash.com/photo-1611844085880-e901d5b6b146?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'huerto', 
          nombre: 'Huerto Urbano', 
          descripcion: 'Cultiva tus propios alimentos',
          imagen: 'https://images.unsplash.com/photo-1595855341503-4e5f82488917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        },
        { 
          id: 'xerofitas', 
          nombre: 'Xerofitas', 
          descripcion: 'Plantas de bajo consumo de agua',
          imagen: 'https://images.unsplash.com/photo-1572902505249-11fe8581d83c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [showError]);
  
  // Cargar categorías cuando se monte el componente
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);
  
  // Función para navegar a la página de categoría
  const handleCategoriaClick = (categoriaId) => {
    navigate(`/categoria/${categoriaId}`);
    
    // Cerrar el sidebar después de hacer clic en una categoría
    toggleSidebar();
  };
  
  // Verificar si una ruta corresponde a la categoría actual
  const isCategoriaActive = (categoriaId) => {
    return location.pathname === `/categoria/${categoriaId}` || 
           location.pathname.startsWith(`/categoria/${categoriaId}/planta/`);
  };
  
  // Consejo del día aleatorio
  const consejos = [
    "La mayoría de las plantas de interior necesitan luz indirecta y un riego moderado.",
    "Rota tus plantas periódicamente para que crezcan de forma uniforme.",
    "Las plantas suculentas necesitan menos agua que otras plantas de interior.",
    "Utiliza agua a temperatura ambiente para regar tus plantas.",
    "Limpia las hojas de tus plantas con un paño húmedo para quitar el polvo.",
    "Los bonsáis necesitan poda regular para mantener su forma característica.",
    "Las plantas tropicales suelen preferir ambientes húmedos.",
    "Muchas hierbas aromáticas prefieren suelos bien drenados y soleados.",
    "Fertiliza tus plantas durante su temporada de crecimiento activo.",
    "Observa los patrones de crecimiento para determinar si tu planta necesita más luz."
  ];
  
  const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];

  return (
    <>
      {/* Overlay para cerrar el sidebar en dispositivos móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white w-64 z-30 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-md overflow-y-auto`}
        style={{ marginTop: '61px', height: 'calc(100vh - 61px)' }}
      >
        {/* Perfil resumido del usuario */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-lg">
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">{currentUser?.name || "Usuario"}</h3>
              <p className="text-xs text-gray-500">{currentUser?.nivelExperiencia || "Principiante"}</p>
            </div>
          </div>
        </div>
        
        {/* Sección de categorías */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categorías de Plantas
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader size="small" text="Cargando..." />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-3 rounded-md text-sm text-red-600 mb-3">
              {error}
              <button 
                onClick={fetchCategorias}
                className="block mt-2 text-red-700 hover:underline"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <button 
                    onClick={() => handleCategoriaClick(categoria.id)}
                    className={`w-full flex items-start p-3 rounded-md transition-colors ${
                      isCategoriaActive(categoria.id)
                        ? 'bg-green-50 border border-green-100' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-12 h-12 mr-3 flex-shrink-0 rounded-md overflow-hidden">
                      <img 
                        src={categoria.imagen} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-medium text-gray-800 block">{categoria.nombre}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{categoria.descripcion}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Consejo del día */}
        <div className="p-4 mt-4">
          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <h3 className="font-medium text-green-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Consejo del día
            </h3>
            <p className="text-sm text-green-700">
              {consejoAleatorio}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;