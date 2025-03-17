import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const Home = () => {
  // Datos de ejemplo para plantas destacadas
  const plantasDestacadas = [
    {
      id: 1,
      nombre: 'Monstera Deliciosa',
      emoji: '🌿',
      descripcion: 'Conocida por sus hojas grandes y perforadas, esta planta tropical es perfecta para interiores luminosos.',
      cuidados: 'Riego: Moderado, cada 7-10 días. Luz: Indirecta brillante. Dificultad: Baja.'
    },
    {
      id: 2,
      nombre: 'Lavanda',
      emoji: '💜',
      descripcion: 'Planta aromática con hermosas flores moradas, ideal para jardines y balcones soleados.',
      cuidados: 'Riego: Escaso, tolera sequía. Luz: Sol directo. Dificultad: Media.'
    }
  ];

  // Consejo del día
  const consejoDia = {
    titulo: "Riego eficiente",
    texto: "Es mejor regar abundantemente y con menos frecuencia. Esto estimula a las raíces a crecer más profundamente, lo que hace que las plantas sean más resistentes."
  };

  // Datos para la galería de imágenes - usando imágenes de plantas de Unsplash
  const imagenesGaleria = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      titulo: "Jardín tropical"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1462530260150-162092b860e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      titulo: "Orquídeas"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      titulo: "Cactus"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1629761442974-b87c1ef7772b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      titulo: "Monstera"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1599685315640-4a9faea1f09c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      titulo: "Suculentas"
    }
  ];

  return (
    <DashboardLayout>
      {/* Primera fila con dos plantas destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {plantasDestacadas.map(planta => (
          <div key={planta.id} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-gray-100 mr-4 flex items-center justify-center rounded-md text-2xl">
                {planta.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{planta.nombre}</h3>
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
                          e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="160" viewBox="0 0 24 24" fill="none" stroke="%23859900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>';
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