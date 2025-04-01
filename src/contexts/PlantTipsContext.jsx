// src/contexts/PlantTipsContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNotification } from './NotificationContext';

// Reemplaza con la URL real de tu API desplegada en Render
const API_URL = process.env.REACT_APP_PLANT_TIPS_API || 'https://longpollplantstips.onrender.com';

// Crear el contexto
const PlantTipsContext = createContext();

// Hook personalizado para usar el contexto
export const usePlantTips = () => {
  const context = useContext(PlantTipsContext);
  if (!context) {
    throw new Error('usePlantTips debe ser usado dentro de un PlantTipsProvider');
  }
  return context;
};

// Proveedor del contexto
export const PlantTipsProvider = ({ children }) => {
  const [tips, setTips] = useState([]);
  const [currentTip, setCurrentTip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tipVersion, setTipVersion] = useState(0);
  const [pollingActive, setPollingActive] = useState(true);
  
  const { showSuccess, showError } = useNotification();

  // Función para obtener todos los consejos
  const fetchTips = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/tips`;
      
      // Construir query params
      const queryParams = new URLSearchParams();
      if (filters.plantType) queryParams.append('plantType', filters.plantType);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener consejos de plantas');
      }
      
      const data = await response.json();
      setTips(data.tips);
      setTipVersion(data.version);
      setError(null);
      return data.tips;
    } catch (err) {
      console.error('Error fetching plant tips:', err);
      setError('No pudimos cargar los consejos. Por favor, intenta de nuevo más tarde.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Función para obtener un consejo aleatorio
  const fetchRandomTip = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/tips/random`;
      
      // Construir query params
      const queryParams = new URLSearchParams();
      if (filters.plantType) queryParams.append('plantType', filters.plantType);
      if (filters.category) queryParams.append('category', filters.category);
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener consejo aleatorio');
      }
      
      const data = await response.json();
      setCurrentTip(data.tip);
      setTipVersion(data.version);
      setError(null);
      return data.tip;
    } catch (err) {
      console.error('Error fetching random tip:', err);
      setError('No pudimos cargar el consejo. Por favor, intenta de nuevo más tarde.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Función para iniciar el longpolling
  const startLongPolling = useCallback(async () => {
    if (!pollingActive) return;
    
    try {
      const pollUrl = `${API_URL}/api/tips/poll?version=${tipVersion}`;
      const response = await fetch(pollUrl);
      
      if (!response.ok) {
        throw new Error('Error en la conexión de longpolling');
      }
      
      const data = await response.json();
      
      if (data.updated) {
        // Si hay actualizaciones, mostrar notificación y obtener nuevo consejo
        showSuccess('¡Nuevo consejo de plantas disponible!');
        fetchRandomTip();
      }
      
      // Continuar con el longpolling
      startLongPolling();
    } catch (err) {
      console.error('Longpolling error:', err);
      // Reintentar después de un retraso en caso de error
      setTimeout(() => {
        if (pollingActive) {
          startLongPolling();
        }
      }, 5000);
    }
  }, [tipVersion, pollingActive, fetchRandomTip, showSuccess]);
  
  // Iniciar longpolling cuando cambia el tipVersion
  useEffect(() => {
    if (tipVersion > 0 && pollingActive) {
      startLongPolling();
    }
    
    return () => {
      // Para limpiar cuando el componente se desmonta
      setPollingActive(false);
    };
  }, [tipVersion, pollingActive, startLongPolling]);
  
  // Cargar un consejo aleatorio al inicio
  useEffect(() => {
    fetchRandomTip();
  }, [fetchRandomTip]);
  
  // Activar/desactivar el polling
  const togglePolling = (active) => {
    setPollingActive(active);
  };
  
  // Obtener un consejo específico por ID
  const fetchTipById = async (tipId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/tips/${tipId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el consejo específico');
      }
      
      const data = await response.json();
      return data.tip;
    } catch (err) {
      console.error('Error fetching tip by id:', err);
      setError('No pudimos cargar el consejo específico. Por favor, intenta de nuevo más tarde.');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Valor del contexto para exportar
  const value = {
    tips,
    currentTip,
    loading,
    error,
    tipVersion,
    pollingActive,
    fetchTips,
    fetchRandomTip,
    fetchTipById,
    togglePolling
  };
  
  return (
    <PlantTipsContext.Provider value={value}>
      {children}
    </PlantTipsContext.Provider>
  );
};