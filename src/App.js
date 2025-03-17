import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Proveedor de autenticación
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

// Páginas públicas
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

// Páginas protegidas - Dashboard
import Home from './Pages/Dashboard/Home';
import Contacto from './Pages/Dashboard/Contacto';
import Perfil from './Pages/Dashboard/Perfil';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          
          {/* Ruta para 404 - Redirige a la página principal */}
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
              <p className="mb-6">La página que buscas no existe.</p>
              <a href="/" className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-800">
                Volver al inicio
              </a>
            </div>
          </div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;