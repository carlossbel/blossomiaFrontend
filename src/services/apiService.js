import axios from 'axios';
import { 
  API_CONFIG, 
  API_ROUTES, 
  AUTH_CONFIG, 
  ERROR_MESSAGES, 
  IS_DEVELOPMENT 
} from '../config/config';

// Crear instancia de axios con la configuración base
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores comunes
    if (!error.response) {
      console.error('Error de red:', error);
      return Promise.reject({ 
        message: ERROR_MESSAGES.NETWORK_ERROR,
        originalError: error 
      });
    }

    // Manejo de error 401 (no autorizado)
    if (error.response.status === 401) {
      // Limpiar datos de sesión
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
      
      // Redirigir a página de login (si no está ya en login)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error.response.data || error);
  }
);

// Servicios de autenticación
const authService = {
  // Registro de usuarios
  register: async (userData) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Datos de registro simulados:', userData);
          resolve({
            message: 'Usuario registrado exitosamente',
            userId: 'user-' + Date.now(),
            qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Blossomia:' + userData.email + '?secret=JBSWY3DPEHPK3PXP&issuer=Blossomia'
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Inicio de sesión (primer paso)
  login: async (credentials) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Credenciales simuladas:', credentials);
          resolve({
            message: 'Primer paso de autenticación completado',
            requiresMfa: true,
            userId: 'user-123'
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Verificación MFA (segundo paso)
  verifyMfa: async (userId, token) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Verificación MFA simulada:', { userId, token });
          const userData = {
            id: userId,
            name: 'Usuario Ejemplo',
            email: 'usuario@ejemplo.com',
            nivelExperiencia: 'Intermedio',
            tipoJardin: 'Interior',
            telefono: '123456789'
          };
          const authToken = 'jwt-token-simulado-' + Date.now();
          
          // Guardar datos en localStorage
          localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, authToken);
          localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
          
          resolve({
            message: 'Autenticación completada',
            token: authToken,
            user: userData
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.VERIFY_MFA, { userId, token });
      
      // Guardar token y datos de usuario en localStorage
      if (response.data.token) {
        localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.data.token);
        if (response.data.user) {
          localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Solicitud de recuperación de contraseña
  forgotPassword: async (email) => {
    if (IS_DEVELOPMENT && false) { // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Recuperación de contraseña simulada:', { email });
          resolve({
            success: true,
            message: 'Se ha enviado un código de verificación a tu correo electrónico'
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      console.error('Error en forgotPassword:', error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error al procesar la solicitud' };
    }
  },

  // Verificar código de recuperación de contraseña
  verifyResetCode: async (email, code) => {
    if (IS_DEVELOPMENT && false) { // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Verificación de código simulada:', { email, code });
          resolve({
            success: true,
            message: 'Código verificado correctamente',
            token: 'token-simulado-' + Date.now()
          });
        }, 800);
      });
    }
    
    try {
      // Usa el log para depurar
      console.log('Enviando verificación de código a:', API_CONFIG.BASE_URL + API_ROUTES.AUTH.VERIFY_RESET_CODE);
      
      // Asegúrate de usar apiClient que ya tiene la URL base configurada
      const response = await apiClient.post(API_ROUTES.AUTH.VERIFY_RESET_CODE, { email, code });
      return response.data;
    } catch (error) {
      console.error('Error en verifyResetCode:', error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw { success: false, message: 'Código inválido o expirado' };
    }
  },

  // Restablecer contraseña
  resetPassword: async (token, password) => {
    if (IS_DEVELOPMENT && false) { // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Restablecimiento de contraseña simulado:', { token, password });
          resolve({
            success: true,
            message: 'Contraseña actualizada correctamente'
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.RESET_PASSWORD, { token, password });
      return response.data;
    } catch (error) {
      console.error('Error en resetPassword:', error);
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error al restablecer la contraseña' };
    }
  }
};

// Servicios de usuario
const userService = {
  // Obtener perfil del usuario
  getProfile: async () => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_KEY) || '{}');
          resolve({ user });
        }, 500);
      });
    }
    
    try {
      const response = await apiClient.get(API_ROUTES.USER.PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Actualizar perfil del usuario
  updateProfile: async (userData) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Actualización de perfil simulada:', userData);
          
          // Actualizar datos en localStorage
          const storedUser = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_KEY) || '{}');
          const updatedUser = { ...storedUser, ...userData };
          localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(updatedUser));
          
          resolve({
            message: 'Perfil actualizado correctamente',
            user: updatedUser
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.put(API_ROUTES.USER.PROFILE, userData);
      
      // Actualizar datos en localStorage
      if (response.data.user) {
        const storedUser = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_KEY) || '{}');
        const updatedUser = { ...storedUser, ...response.data.user };
        localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Servicios de contacto
const contactService = {
  // Enviar formulario de contacto
  enviarContacto: async (formData) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Datos de contacto simulados:', formData);
          resolve({
            message: 'Mensaje enviado correctamente',
            contactoId: 'simulado-' + Date.now()
          });
        }, 800);
      });
    }
    
    try {
      const response = await apiClient.post(API_ROUTES.CONTACT.SEND, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Cache para categorías
let categoriasCache = null;
let cacheTiempoExpiracion = 0;
const CACHE_DURACION = 5 * 60 * 1000; // 5 minutos

// Servicios para categorías y plantas
const categoriaService = {
  // Obtener todas las categorías
  getCategorias: async () => {
    // Verificar si hay datos en caché válidos
    const ahora = Date.now();
    if (categoriasCache && ahora < cacheTiempoExpiracion) {
      console.log('Usando categorías en caché');
      return categoriasCache;
    }
    
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            categorias: [
              { 
                id: 'interior', 
                nombre: 'Plantas de Interior', 
                descripcion: 'Perfectas para decorar tu hogar',
                imagen: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              { 
                id: 'exterior', 
                nombre: 'Plantas de Exterior', 
                descripcion: 'Resistentes y decorativas',
                imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              // ... otros elementos
            ]
          });
        }, 500);
      });
    }
    
    try {
      const response = await apiClient.get(API_ROUTES.CATEGORIES.LIST);
      
      // Guardar en caché
      categoriasCache = response.data;
      cacheTiempoExpiracion = ahora + CACHE_DURACION;
      
      return response.data;
    } catch (error) {
      // Si hay un error de conexión pero tenemos caché (incluso vencida), usarla como respaldo
      if ((!error.response || error.code === 'ECONNABORTED') && categoriasCache) {
        console.log('Error de conexión. Usando caché antiguo como respaldo.');
        return categoriasCache;
      }
      throw error;
    }
  },
  
  // Obtener plantas por categoría
  getCategoriaPlantas: async (categoriaId) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            categoria: {
              id: categoriaId,
              nombre: categoriaId === 'interior' ? 'Plantas de Interior' : 'Otra categoría',
              descripcion: 'Descripción de la categoría ' + categoriaId
            },
            plantas: [
              // Datos de ejemplo
            ]
          });
        }, 600);
      });
    }
    
    try {
      const response = await apiClient.get(API_ROUTES.CATEGORIES.PLANTS_BY_CATEGORY(categoriaId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener detalles de una planta específica
  getPlantaDetalle: async (plantaId) => {
    if (IS_DEVELOPMENT && false) { // Cambia a false para usar la API real en desarrollo
      // Simulación para desarrollo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            planta: {
              id: plantaId,
              nombre: 'Monstera Deliciosa',
              // Más propiedades
            }
          });
        }, 600);
      });
    }
    
    try {
      const response = await apiClient.get(API_ROUTES.CATEGORIES.PLANT_DETAILS(plantaId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Exportar todos los servicios
export {
  apiClient,
  authService,
  userService,
  contactService,
  categoriaService
};