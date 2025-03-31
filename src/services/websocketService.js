// src/services/websocketService.js
import { io } from 'socket.io-client';
import { WEBSOCKET_CONFIG, AUTH_CONFIG } from '../config/config';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = {
      nuevoRecordatorio: []
    };
    this.reconnectAttempts = 0;
  }

  // Conectar al servidor WebSocket
  connect() {
    if (this.socket) return;

    const SOCKET_URL = WEBSOCKET_CONFIG.URL;
    
    // Clear any URL errors - make sure no trailing /ws or other path
    const cleanUrl = SOCKET_URL.replace(/\/+$/, '');
    
    console.log(`Intentando conectar a WebSocket en: ${cleanUrl}`);
    
    this.socket = io(cleanUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: WEBSOCKET_CONFIG.RECONNECTION_ATTEMPTS,
      reconnectionDelay: WEBSOCKET_CONFIG.RECONNECTION_DELAY
    });

    this.socket.on('connect', () => {
      console.log('WebSocket conectado exitosamente');
      this.reconnectAttempts = 0;
      
      // Unirse a sala personalizada si hay un usuario autenticado
      const user = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_KEY) || '{}');
      if (user.id) {
        this.joinRoom(user.id);
      }
    });

    // Manejar evento de recordatorio
    this.socket.on('nuevoRecordatorio', (data) => {
      console.log('Recordatorio recibido:', data);
      this.callbacks.nuevoRecordatorio.forEach(callback => {
        callback(data);
      });
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket desconectado');
    });

    this.socket.on('connect_error', (error) => {
      this.reconnectAttempts++;
      console.error(`Error de conexión WebSocket (intento ${this.reconnectAttempts}):`, error.message);
      
      // Si hay muchos intentos fallidos, mostrar mensaje más detallado
      if (this.reconnectAttempts >= 3) {
        console.warn('Múltiples errores de conexión WebSocket. Verifique que el servidor esté ejecutándose en:', cleanUrl);
      }
    });
  }

  // Desconectar del servidor WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('WebSocket desconectado manualmente');
    }
  }

  // Verificar si está conectado
  isConnected() {
    return this.socket && this.socket.connected;
  }

  // Unirse a una sala específica (por userId)
  joinRoom(userId) {
    if (this.socket) {
      this.socket.emit('join', userId);
      console.log(`Unido a la sala: ${userId}`);
    } else {
      console.warn('No se puede unir a la sala: Socket no inicializado');
    }
  }

  // Enviar un recordatorio de cuidado de plantas
  sendRecordatorio(data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('recordatorio', data);
      console.log('Recordatorio enviado:', data);
      return true;
    } else {
      console.warn('No se pudo enviar recordatorio: Socket no conectado');
      return false;
    }
  }

  // Suscribirse a eventos
  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
    
    // Devolver función para cancelar suscripción
    return () => {
      this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
    };
  }

  // Cancelar todas las suscripciones
  offAll() {
    Object.keys(this.callbacks).forEach(event => {
      this.callbacks[event] = [];
    });
    console.log('Todas las suscripciones canceladas');
  }
}

// Crear instancia singleton
const websocketService = new WebSocketService();

export default websocketService;