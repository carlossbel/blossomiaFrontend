import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Datos de ejemplo de categorías de plantas
  const categoriasPlantas = [
    { 
      id: 1, 
      nombre: 'Plantas de Interior', 
      descripcion: 'Perfectas para decorar tu hogar'
    },
    { 
      id: 2, 
      nombre: 'Plantas de Exterior', 
      descripcion: 'Resistentes y decorativas'
    },
    { 
      id: 3, 
      nombre: 'Cactus y Suculentas', 
      descripcion: 'Ideales para principiantes'
    },
    { 
      id: 4, 
      nombre: 'Plantas Aromáticas', 
      descripcion: 'Hierbas para tu cocina'
    },
    { 
      id: 5, 
      nombre: 'Plantas Acuáticas', 
      descripcion: 'Para estanques y fuentes'
    }
  ];

  return (
    <>
      {/* Overlay para cerrar el sidebar en móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar con transición mejorada */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white w-64 z-30 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-md overflow-y-auto`}
        style={{ marginTop: '61px', height: 'calc(100vh - 61px)' }}
      >
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Categorías</h2>
          <p className="text-sm text-gray-600 mt-1">Explora nuestra colección</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-3">
            {/* Lista de categorías con placeholders para imágenes */}
            {categoriasPlantas.map((categoria) => (
              <li key={categoria.id} className="group">
                <Link to="#" className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200">
                  <div className="w-10 h-10 bg-gray-200 mr-3 flex items-center justify-center rounded-md overflow-hidden">
                    <span className="text-xs text-gray-500 group-hover:text-gray-700">🌿</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">{categoria.nombre}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{categoria.descripcion}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-4 bg-green-50 mx-4 rounded-md border border-green-100">
          <h3 className="font-medium text-green-800 mb-2">Consejo del día</h3>
          <p className="text-sm text-green-700">
            La mayoría de las plantas de interior necesitan luz indirecta y 
            un riego moderado. ¡No las ahogues con exceso de agua!
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;