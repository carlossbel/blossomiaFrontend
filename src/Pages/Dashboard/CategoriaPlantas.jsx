// src/Pages/Dashboard/CategoriaPlantas.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { categoriaService } from '../../services/apiService';
import { useNotification } from '../../contexts/NotificationContext';
import Loader from '../../Components/UI/Loader';

// Importar imágenes directamente
import monsteraImg from '../../public/m1.jpg';
import monstera2Img from '../../public/m2.jpg';
import monstera3Img from '../../public/m3.jpg';
import lavandaImg from '../../public/l1.jpg';
import lavanda2Img from '../../public/l2.jpg';
import lavanda3Img from '../../public/l3.jpg';
import cactusImg from '../../public/c.jpg';
import cactus1Img from '../../public/c1.jpg';
import cactus2Img from '../../public/c2.jpg';
import cactusEstrellaImg from '../../public/ce.jpeg';
import cactusEstrella1Img from '../../public/ce1.jpg';
import nenufarImg from '../../public/n.jpg';
import nenufar1Img from '../../public/n1.jpg';
import nenufar2Img from '../../public/n2.jpeg';
import orquideaImg from '../../public/o1.jpeg';
import orquidea1Img from '../../public/o2.jpg';
import orquidea2Img from '../../public/o3.jpg';
import flower1Img from '../../public/flower1.png';
import flower2Img from '../../public/flower2.png';
import flower3Img from '../../public/flower3.png';
import flower4Img from '../../public/flower4.jpg';
import flower5Img from '../../public/flower5.png';
import pothosImg from '../../public/p.jpg';
import pothos1Img from '../../public/p1.jpg';
import s1Img from '../../public/s1.jpg';
import s2Img from '../../public/s2.jpg';

const CategoriaPlantas = () => {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotification();
  
  const [categoria, setCategoria] = useState(null);
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mapeo de ID de categorías a imágenes principales
  const categoriaImageMap = {
    'interior': flower1Img,
    'exterior': flower2Img,
    'cactus': cactusImg,
    'aromaticas': flower4Img,
    'acuaticas': flower5Img,
    'tropicales': flower3Img,
    'ornamentales': orquideaImg,
    'bonsais': flower1Img,
    'huerto': flower5Img,
    'xerofitas': cactusEstrellaImg
  };
  
  // Mapeo de ID de plantas a imágenes específicas
  const plantaImageMap = {
    // Monstera y variantes
    'monstera': monsteraImg,
    'monstera-deliciosa': monsteraImg,
    'monstera-variegada': monstera2Img,
    'monstera-adansonii': monstera3Img,
    
    // Lavanda y plantas aromáticas
    'lavanda': lavandaImg,
    'lavandula': lavandaImg,
    'aromatica': lavanda2Img,
    'menta': lavanda3Img,
    'romero': lavanda2Img,
    
    // Cactus y suculentas
    'cactus': cactusImg,
    'cactus-espinoso': cactus1Img,
    'cactus-san-pedro': cactus2Img,
    'cactus-estrella': cactusEstrellaImg,
    'cactus-globo': cactusEstrella1Img,
    
    // Plantas acuáticas
    'nenufar': nenufarImg,
    'loto': nenufar1Img,
    'acuatica': nenufar2Img,
    
    // Orquídeas y ornamentales
    'orquidea': orquideaImg,
    'phalaenopsis': orquidea1Img,
    'orquidea-vanda': orquidea2Img,
    
    // Pothos y trepadoras
    'pothos': pothosImg,
    'pothos-variegado': pothos1Img,
    'filodendro': pothos1Img,
    
    // Suculentas
    'suculenta': s1Img,
    'echeveria': s2Img,
    'sedum': s1Img
  };
  
  // Icono de respaldo
  const fallbackIcon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
  
  // Función para determinar la mejor imagen para una planta
  const getBestImageForPlant = (planta) => {
    // Primero verificar si hay una coincidencia directa por ID
    const plantaId = planta.id.toLowerCase();
    
    // Buscar coincidencias exactas o parciales en el ID
    for (const [key, img] of Object.entries(plantaImageMap)) {
      if (plantaId === key || plantaId.includes(key)) {
        return img;
      }
    }
    
    // Si no se encuentra por ID, buscar en el nombre
    if (planta.nombre) {
      const nombre = planta.nombre.toLowerCase();
      for (const [key, img] of Object.entries(plantaImageMap)) {
        if (nombre.includes(key)) {
          return img;
        }
      }
    }
    
    // Si aún no hay coincidencia, usar la imagen de la categoría
    if (categoriaImageMap[categoriaId]) {
      return categoriaImageMap[categoriaId];
    }
    
    // Si todo falla, usar flower1 como imagen por defecto
    return flower1Img;
  };
  
  useEffect(() => {
    const fetchCategoriaPlantas = async () => {
      try {
        setLoading(true);
        const response = await categoriaService.getCategoriaPlantas(categoriaId);
        
        if (response && response.categoria && response.plantas) {
          setCategoria(response.categoria);
          
          // Asignar imágenes locales a cada planta
          const plantasConImagenes = response.plantas.map(planta => {
            return {
              ...planta,
              imagen: getBestImageForPlant(planta)
            };
          });
          
          setPlantas(plantasConImagenes);
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
                    e.target.src = fallbackIcon;
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