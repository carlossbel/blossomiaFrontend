import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  // Efecto para verificar la autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      // En una aplicación real, aquí podrías verificar
      // el token JWT con el servidor
      setIsVerifying(false);
    };

    checkAuth();
  }, []);

  // Mientras verifica si hay un usuario, muestra un indicador de carga
  if (loading || isVerifying) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirige al login
  if (!isAuthenticated()) {
    // Guardamos la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay usuario, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;