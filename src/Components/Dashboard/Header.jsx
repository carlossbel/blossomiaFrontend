// src/Components/Dashboard/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../public/logo.jpg';

const Header = ({ toggleSidebar }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center shadow-sm z-10">
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

      <div className="flex items-center">
        <nav className="hidden md:flex items-center space-x-6 mr-6">
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

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              {currentUser?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="hidden md:block text-sm">{currentUser?.name || "Usuario"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <Link 
                to="/perfil" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Mi Perfil
              </Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;