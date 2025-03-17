import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../public/logo.jpg';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/dashboard" className="flex items-center">
          <img src={logoImg} alt="BLOSSOMIA" className="h-8" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
          Home
        </Link>
        <Link to="/contacto" className="text-gray-700 hover:text-gray-900 font-medium">
          Contacto
        </Link>
        <Link to="/perfil" className="text-gray-700 hover:text-gray-900 font-medium">
          Perfil
        </Link>
      </nav>
    </header>
  );
};

export default Header;