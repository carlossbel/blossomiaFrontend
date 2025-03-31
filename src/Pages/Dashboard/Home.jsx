import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import { useNotification } from '../../contexts/NotificationContext';

// Importar las imágenes originales
import flower1 from '../../public/flower1.png';
import flower2 from '../../public/flower2.png';
import flower3 from '../../public/flower3.png';

const Home = () => {
  const { showSuccess } = useNotification();

  // Datos de ejemplo para plantas destacadas
  const plantasDestacadas = [
    {
      id: 1,
      nombre: 'Monstera Deliciosa',
      emoji: '🌿',
      imagen: flower1, // Usar la imagen original
      descripcion: 'Conocida por sus hojas grandes y perforadas, esta planta tropical es perfecta para interiores luminosos.',
      cuidados: 'Riego: Moderado, cada 7-10 días. Luz: Indirecta brillante. Dificultad: Baja.'
    },
    {
      id: 2,
      nombre: 'Lavanda',
      emoji: '💜',
      imagen: flower2, // Usar la imagen original
      descripcion: 'Planta aromática con hermosas flores moradas, ideal para jardines y balcones soleados.',
      cuidados: 'Riego: Escaso, tolera sequía. Luz: Sol directo. Dificultad: Media.'
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
      url: flower1,
      titulo: "Jardín tropical"
    },
    {
      id: 2,
      url: flower2,
      titulo: "Orquídeas"
    },
    {
      id: 3,
      url: flower3,
      titulo: "Cactus"
    },
    {
      id: 4,
      url: flower1,
      titulo: "Monstera"
    },
    {
      id: 5,
      url: flower2,
      titulo: "Suculentas"
    }
  ];

  // Función para mostrar una notificación cuando se haga clic en una planta
  const handlePlantaClick = (nombre) => {
    showSuccess(`Has seleccionado ${nombre}`);
  };

  return (
    <DashboardLayout>
      {/* Primera fila con dos plantas destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {plantasDestacadas.map(planta => (
          <div 
            key={planta.id} 
            className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePlantaClick(planta.nombre)}
          >
            <div className="flex flex-col sm:flex-row items-start">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                <img 
                  src={planta.imagen} 
                  alt={planta.nombre}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                  }}
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="font-semibold text-lg mb-2">{planta.nombre} {planta.emoji}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {planta.descripcion}
                </p>
                <p className="text-xs text-gray-500">
                  {planta.cuidados}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Segunda fila con galería de imágenes y consejo del día */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Galería de Plantas</h3>
          
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
                          e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
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
              <h4 className="font-medium mb-2 flex items-center">
                <span className="mr-2">🌸</span> Flores
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Petunias</li>
                <li>• Girasoles</li>
                <li>• Margaritas</li>
                <li>• Geranios</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="font-medium mb-2 flex items-center">
                <span className="mr-2">🌿</span> Plantas aromáticas
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Albahaca</li>
                <li>• Menta</li>
                <li>• Romero</li>
                <li>• Tomillo</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
              <h4 className="font-medium mb-2 flex items-center">
                <span className="mr-2">🍅</span> Hortalizas
              </h4>
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