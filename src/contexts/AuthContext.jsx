import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext(null);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    try {
      // Aquí normalmente harías una llamada a tu API de autenticación
      // Simulamos un login exitoso guardando los datos en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      localStorage.removeItem('user');
      setCurrentUser(null);
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  // Función para registrar un nuevo usuario
  const register = (userData) => {
    try {
      // Aquí normalmente harías una llamada a tu API para registrar
      // Por ahora simulamos un registro exitoso
      
      // Si quieres que el usuario inicie sesión automáticamente después de registrarse:
      // localStorage.setItem('user', JSON.stringify(userData));
      // setCurrentUser(userData);
      
      return true;
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser;
  };

  // Función para obtener información del usuario
  const getUserInfo = () => {
    return currentUser;
  };

  // Función para actualizar información del usuario
  const updateUserInfo = (newUserData) => {
    try {
      // Actualizar información del usuario
      const updatedUser = { ...currentUser, ...newUserData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Error updating user info:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated,
    getUserInfo,
    updateUserInfo,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};