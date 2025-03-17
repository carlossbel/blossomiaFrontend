import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">BLOSSOMIA</h3>
            <p className="text-gray-300 max-w-md">
              Tu tienda online de plantas. Encuentra las mejores plantas para tu hogar o jardín.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Productos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Plantas de Interior</a></li>
                <li><a href="#" className="hover:text-white">Plantas de Exterior</a></li>
                <li><a href="#" className="hover:text-white">Cactus y Suculentas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Recursos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Guías de Cuidado</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Contacto</h4>
              <ul className="space-y-2 text-gray-300">
                <li>info@blossomia.com</li>
                <li>+52 4424000000</li>
                <li>Mexico, Queretaro</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} BLOSSOMIA. Todos los derechos reservados.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;