// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Proveedores de contexto
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PlantTipsProvider } from './contexts/PlantTipsContext';
import ProtectedRoute from './Components/ProtectedRoute';

// Páginas públicas
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';

// Páginas protegidas - Dashboard
import Home from './Pages/Dashboard/Home';
import Contacto from './Pages/Dashboard/Contacto';
import Perfil from './Pages/Dashboard/Perfil';
import CategoriaPlantas from './Pages/Dashboard/CategoriaPlantas';
import PlantaDetalle from './Pages/Dashboard/PlantaDetalle';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <PlantTipsProvider>
          <Router>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/perfil" element={<Perfil />} />
                
                {/* Rutas de categorías y plantas */}
                <Route path="/categoria/:categoriaId" element={<CategoriaPlantas />} />
                <Route path="/categoria/:categoriaId/planta/:plantaId" element={<PlantaDetalle />} />
              </Route>
              
              {/* Ruta para 404 - Redirige a la página principal */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </PlantTipsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;