// src/config/config.js

// Determinar si estamos en modo desarrollo
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// URL base para la API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 15000, // 15 segundos
  RETRY_COUNT: 3  // Intentos de reintento en caso de error
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Blossomia',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma para el cuidado de plantas y jardinería',
  SUPPORT_EMAIL: 'carlossbel09@gmail.com'
};

export const WEBSOCKET_CONFIG = {
  URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000',
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 1000
};

// Funcionalidades habilitadas
export const FEATURES = {
  MFA_ENABLED: true,
  SOCIAL_LOGIN: false,
  NOTIFICATIONS: true,
  DARK_MODE: false
};

export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY_MFA: '/auth/verify-mfa',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_RESET_CODE: '/auth/verify-reset-code', // AÑADIDA esta ruta
    RESET_PASSWORD: '/auth/reset-password'
  },
  USER: {
    PROFILE: '/users/profile'
  },
  CATEGORIES: {
    LIST: '/categorias',
    PLANTS_BY_CATEGORY: (id) => `/categorias/${id}/plantas`,
    PLANT_DETAILS: (id) => `/plantas/${id}`
  },
  CONTACT: {
    SEND: '/contacto'
  }
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  TOKEN_KEY: 'blossomia_token',
  USER_KEY: 'blossomia_user',
  TOKEN_EXPIRATION: 86400, // 24 horas en segundos
  LOGIN_REDIRECT: '/dashboard',
  LOGOUT_REDIRECT: '/login'
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'No autorizado. Por favor inicia sesión nuevamente.',
  FORBIDDEN: 'No tienes permisos para acceder a este recurso.',
  SERVER_ERROR: 'Error en el servidor. Por favor intenta más tarde.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Error de validación. Revisa los datos ingresados.'
};

// Exportación por defecto para compatibilidad
export default {
  IS_DEVELOPMENT,
  API_CONFIG,
  API_ROUTES,
  AUTH_CONFIG,
  ERROR_MESSAGES,
  APP_CONFIG,
  WEBSOCKET_CONFIG,
  FEATURES
};