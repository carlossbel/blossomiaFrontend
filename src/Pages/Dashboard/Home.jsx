import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { useNotification } from '../../contexts/NotificationContext';
import PlantGallery from './components/PlantGallery';
import PlantCareModal from './components/PlantCareModal';
import IMAGES from '../../constants/images';

const Home = () => {
  const { showSuccess } = useNotification();
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showPlantCare, setShowPlantCare] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Datos de ejemplo para plantas destacadas
  const plantasDestacadas = [
    {
      id: 1,
      nombre: 'Monstera Deliciosa',
      imagen: IMAGES.PLANTS.monstera[0],
      descripcion: 'Conocida por sus hojas grandes y perforadas, esta planta tropical es perfecta para interiores luminosos.',
      cuidados: [
        { titulo: 'Riego', descripcion: 'Moderado, cada 7-10 días. Dejar secar la capa superior del sustrato entre riegos.' },
        { titulo: 'Luz', descripcion: 'Luz indirecta brillante. Evitar la luz solar directa prolongada.' },
        { titulo: 'Sustrato', descripcion: 'Mezcla bien drenada, rica en materia orgánica.' },
        { titulo: 'Humedad', descripcion: 'Alta (50-60%). Beneficiosa rociar las hojas ocasionalmente.' },
        { titulo: 'Temperatura', descripcion: 'Entre 18-30°C. No tolera temperaturas por debajo de 10°C.' }
      ]
    },
    {
      id: 2,
      nombre: 'Lavanda',
      imagen: IMAGES.PLANTS.lavanda[0],
      descripcion: 'Planta aromática con hermosas flores moradas, ideal para jardines y balcones soleados.',
      cuidados: [
        { titulo: 'Riego', descripcion: 'Escaso, tolera sequía. Regar solo cuando el sustrato esté completamente seco.' },
        { titulo: 'Luz', descripcion: 'Sol directo. Al menos 6 horas diarias.' },
        { titulo: 'Sustrato', descripcion: 'Bien drenado, preferiblemente alcalino o neutro.' },
        { titulo: 'Poda', descripcion: 'Recortar después de la floración para mantener la forma.' },
        { titulo: 'Temperatura', descripcion: 'Prefiere climas templados y secos. Resistente a heladas ligeras.' }
      ]
    }
  ];

  // Consejo del día
  const consejoDia = {
    titulo: "Riego eficiente",
    texto: "Es mejor regar abundantemente y con menos frecuencia. Esto estimula a las raíces a crecer más profundamente, lo que hace que las plantas sean más resistentes."
  };

  // Datos para la galería de imágenes
  const imagenesGaleria = [
    {
      id: 1,
      url: IMAGES.PLANTS.jardinTropical[0],
      titulo: "Jardín tropical"
    },
    {
      id: 2,
      url: IMAGES.PLANTS.orquideas[0],
      titulo: "Orquídeas"
    },
    {
      id: 3,
      url: IMAGES.PLANTS.cactus[0],
      titulo: "Cactus"
    },
    {
      id: 4,
      url: IMAGES.PLANTS.monstera[0],
      titulo: "Monstera"
    },
    {
      id: 5,
      url: IMAGES.PLANTS.suculentas[0],
      titulo: "Suculentas"
    }
  ];

  // Función para mostrar los cuidados de una planta al hacer clic
  const handlePlantaClick = (planta) => {
    setSelectedPlant(planta);
    setShowPlantCare(true);
    showSuccess(`Has seleccionado ${planta.nombre}`);
  };

  // Función para cerrar el modal de cuidados
  const closePlantCare = () => {
    setShowPlantCare(false);
  };

  // Función para mostrar/ocultar la galería completa
  const toggleFullGallery = () => {
    setShowFullGallery(!showFullGallery);
  };

  return (
    <DashboardLayout>
      {/* Modal de cuidados de plantas */}
      {showPlantCare && (
        <PlantCareModal plant={selectedPlant} onClose={closePlantCare} />
      )}
      
      {/* Primera fila con dos plantas destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {plantasDestacadas.map(planta => (
          <div 
            key={planta.id} 
            className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePlantaClick(planta)}
          >
            <div className="flex flex-col sm:flex-row items-start">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                <img 
                  src={planta.imagen} 
                  alt={planta.nombre}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IMAGES.FALLBACK;
                  }}
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="font-semibold text-lg mb-2">{planta.nombre}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {planta.descripcion}
                </p>
                <div className="flex">
                  <button 
                    className="text-green-600 text-sm font-medium hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlantaClick(planta);
                    }}
                  >
                    Ver cuidados
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Segunda fila con galería de imágenes y consejo del día */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Galería de Plantas</h3>
            <button 
              onClick={toggleFullGallery}
              className="text-green-600 text-sm font-medium hover:underline"
            >
              {showFullGallery ? 'Ver menos' : 'Ver galería completa'}
            </button>
          </div>
          
          {showFullGallery ? (
            <PlantGallery />
          ) : (
            <>
              {/* Galería con scroll horizontal */}
              <div className="relative">
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                  <div className="flex space-x-4 w-max">
                    {imagenesGaleria.map(imagen => (
                      <div key={imagen.id} className="w-48 flex-shrink-0">
                        <div className="h-40 w-full rounded-md overflow-hidden">
                          <img 
                            src={imagen.url} 
                            alt={imagen.titulo} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = IMAGES.FALLBACK;
                            }}
                          />
                        </div>
                        <p className="mt-2 text-sm font-medium text-center">{imagen.titulo}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Indicadores de desplazamiento */}
                <div className="flex justify-center mt-2 space-x-1">
                  {imagenesGaleria.map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-1 rounded-full ${index === 0 ? 'w-6 bg-green-500' : 'w-3 bg-gray-300'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Consejo del día</h3>
          <h4 className="font-medium text-base mb-2 text-gray-700">{consejoDia.titulo}</h4>
          <p className="text-gray-600 mb-4 text-sm">
            {consejoDia.texto}
          </p>
          <div className="bg-green-50 p-4 rounded-md border border-green-100">
            <h4 className="font-medium text-green-800 mb-2">¿Sabías que?</h4>
            <p className="text-green-700 text-sm">
              Las plantas no solo embellecen los espacios, también pueden mejorar la calidad del aire 
              filtrando toxinas y produciendo oxígeno.
            </p>
          </div>
        </div>
      </div>

      {/* Tercera fila - Temporada actual */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Plantas de Temporada</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-gray-700 mb-4">
            La primavera es el momento ideal para plantar una gran variedad de flores y 
            hortalizas. A continuación te presentamos algunas recomendaciones:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="font-medium mb-2">Flores</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Petunias</li>
                <li>• Girasoles</li>
                <li>• Margaritas</li>
                <li>• Geranios</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="font-medium mb-2">Plantas aromáticas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Albahaca</li>
                <li>• Menta</li>
                <li>• Romero</li>
                <li>• Tomillo</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="font-medium mb-2">Hortalizas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tomates</li>
                <li>• Pimientos</li>
                <li>• Lechugas</li>
                <li>• Zanahorias</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos adicionales para ocultar la barra de desplazamiento pero mantener la funcionalidad */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Home;