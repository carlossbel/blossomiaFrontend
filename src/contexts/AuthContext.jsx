import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService, userService } from '../services/apiService';
import websocketService from '../services/websocketService';
import { AUTH_CONFIG } from '../config/config';

// Crear el contexto de autenticación
const AuthContext = createContext(null);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    const user = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    
    if (token && user) {
      try {
        setCurrentUser(JSON.parse(user));
        
        // Conectar WebSocket si hay un usuario autenticado
        websocketService.connect();
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Si hay un error al parsear, limpiar datos de sesión inválidos
        logout();
      }
    }
    
    setLoading(false);
  }, []);

  // Función para iniciar sesión (primer paso)
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const response = await authService.login(credentials);
      
      if (response.requiresMfa) {
        setRequiresMfa(true);
        setPendingUserId(response.userId);
        return { success: true, requiresMfa: true };
      }
      
      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Error de autenticación');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar MFA (segundo paso)
  const verifyMfa = async (token) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const response = await authService.verifyMfa(pendingUserId, token);
      
      if (response.token) {
        // Guardar token en localStorage
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.token);
        
        // Si hay info de usuario en la respuesta, guardarla
        if (response.user) {
          localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user));
          setCurrentUser(response.user);
        }
        
        setRequiresMfa(false);
        setPendingUserId(null);
        
        // Conectar WebSocket
        websocketService.connect();
        
        return { success: true };
      } else {
        throw { message: 'Autenticación fallida' };
      }
    } catch (error) {
      setAuthError(error.message || 'Código de verificación inválido');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Función para cancelar verificación MFA
  const cancelMfaVerification = () => {
    setRequiresMfa(false);
    setPendingUserId(null);
    setAuthError(null);
  };

  // Función para cerrar sesión
  const logout = () => {
    try {
      // Limpiar localStorage
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
      
      // Limpiar estado
      setCurrentUser(null);
      setRequiresMfa(false);
      setPendingUserId(null);
      
      // Desconectar WebSocket
      websocketService.disconnect();
      
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const result = await authService.register(userData);
      return { success: true, data: result };
    } catch (error) {
      setAuthError(error.message || 'Error al registrar el usuario');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser && !!localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  };

  // Función para obtener información del usuario
  const getUserInfo = () => {
    return currentUser;
  };

  // Función para actualizar información del usuario
  const updateUserInfo = async (userData) => {
    try {
      setLoading(true);
      
      const response = await userService.updateProfile(userData);
      
      if (response.user) {
        setCurrentUser(response.user);
        return { success: true, user: response.user };
      } else {
        throw { message: 'Error al actualizar el perfil' };
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };


// Función para solicitar recuperación de contraseña
const forgotPassword = async (email) => {
  try {
    setLoading(true);
    setAuthError(null);
    
    const response = await authService.forgotPassword(email);
    return { success: true, data: response };
  } catch (error) {
    setAuthError(error.message || 'Error al procesar la solicitud');
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};

// Función para verificar código de recuperación
const verifyResetCode = async (email, code) => {
  try {
    setLoading(true);
    setAuthError(null);
    
    const response = await authService.verifyResetCode(email, code);
    return { success: true, token: response.token };
  } catch (error) {
    setAuthError(error.message || 'Código inválido o expirado');
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};

const resetPassword = async (token, password) => {
  try {
    setLoading(true);
    setAuthError(null);
    
    const response = await authService.resetPassword(token, password);
    return { success: true, data: response };
  } catch (error) {
    setAuthError(error.message || 'Error al restablecer la contraseña');
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};

const value = {
  currentUser,
  loading,
  authError,
  requiresMfa,
  pendingUserId,
  login,
  verifyMfa,
  cancelMfaVerification,
  logout,
  register,
  isAuthenticated,
  getUserInfo,
  updateUserInfo,
  forgotPassword,
  verifyResetCode, // Agregar aquí
  resetPassword
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};