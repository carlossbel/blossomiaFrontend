import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  // Mientras verifica si hay un usuario, muestra un indicador de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  // Si no hay usuario, redirige al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;