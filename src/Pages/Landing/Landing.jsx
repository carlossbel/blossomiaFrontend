import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../Layouts/MainLayout';
import flower1 from '../../public/flower1.png';
import logoImg from '../../public/logo.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full p-4 flex justify-between items-center absolute top-0 left-0 z-10">
        <div className="flex space-x-2">
          <a href="https://instagram.com" className="bg-black text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
          <a href="https://facebook.com" className="bg-black text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="mailto:info@blossomia.com" className="bg-black text-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
        
        <div className="auth-links text-right">
          <Link to="/login" className="text-gray-800 hover:text-gray-600">Inicia sesión</Link>
          <span className="mx-1">/</span> 
          <Link to="/register" className="text-gray-800 hover:text-gray-600">Registrarse</Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-12 mt-16">
            <div className="w-3/4 flex justify-center">
              <img src={logoImg} alt="BLOSSOMIA" className="max-h-16" />
            </div>
          </div>
          
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4">Aprende mas sobre plantas</h1>
            <p className="text-gray-600 mb-4">bla bla bla</p>
            <p className="text-gray-700 mb-8">Descubre todo lo necesario y los cuidados para tus plantas</p>
            <button className="bg-gray-700 text-white py-3 px-8 w-full font-medium hover:bg-gray-800 transition-colors">
              Explorar
            </button>
          </div>
        </div>
        
        {/* Right image */}
        <div className="w-full md:w-1/2 relative">
          <img 
            src={flower1} 
            alt="Flor" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;