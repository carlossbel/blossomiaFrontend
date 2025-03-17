import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../public/logo.jpg';
import flower2 from '../../public/flower2.png';
import LoginForm from './Components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image - wrapper con tamaño reducido */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
        <div className="w-3/4 h-3/4"> {/* Contenedor más pequeño para la imagen */}
          <img 
            src={flower2}
            alt="Flor" 
            className="w-full h-full object-contain rounded-lg shadow-md" 
          />
        </div>
      </div>
      
      {/* Right form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={logoImg} alt="BLOSSOMIA" className="h-16" />
          </div>
          
          <h2 className="text-2xl font-semibold text-center mb-8">Iniciar sesión</h2>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;