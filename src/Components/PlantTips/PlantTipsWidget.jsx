// src/Components/PlantTips/PlantTipsWidget.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import Loader from '../UI/Loader';

// Reemplaza con la URL real de tu API desplegada en Render
const API_URL = process.env.REACT_APP_PLANT_TIPS_API || 'https://longpollplantstips.onrender.com';

const PlantTipsWidget = ({ plantType = 'todas', category = null, autoRefresh = true }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTip, setCurrentTip] = useState(null);
  const [tipVersion, setTipVersion] = useState(0);
  const [pollingActive, setPollingActive] = useState(autoRefresh);
  const { showSuccess, showError } = useNotification();

  // Función para obtener un consejo aleatorio
  const fetchRandomTip = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/api/tips/random?plantType=${plantType}`;
      if (category) {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener consejos de plantas');
      }

      const data = await response.json();
      setCurrentTip(data.tip);
      setTipVersion(data.version);
      setError(null);
    } catch (err) {
      console.error('Error fetching plant tip:', err);
      setError('No pudimos cargar el consejo. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [plantType, category]);

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

  // Cargar consejo inicial
  useEffect(() => {
    fetchRandomTip();
  }, [fetchRandomTip]);

  // Iniciar longpolling cuando se carga el componente
  useEffect(() => {
    if (autoRefresh && tipVersion > 0) {
      startLongPolling();
    }
    
    return () => {
      // Detener el polling cuando el componente se desmonta
      setPollingActive(false);
    };
  }, [tipVersion, autoRefresh, startLongPolling]);

  // Cambiar a un nuevo consejo aleatorio
  const handleRefreshTip = () => {
    fetchRandomTip();
  };

  if (loading && !currentTip) {
    return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm min-h-[200px] flex items-center justify-center">
        <Loader text="Cargando consejos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Error de conexión</h3>
          <p className="text-gray-500 mb-3">{error}</p>
          <button
            onClick={fetchRandomTip}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">Consejo del día</h3>
        <button
          onClick={handleRefreshTip}
          className="text-green-600 hover:text-green-700 flex items-center text-sm font-medium"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Nuevo consejo
        </button>
      </div>
      
      {currentTip && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">{currentTip.title}</h4>
          <p className="text-gray-600 mb-4 text-sm">{currentTip.content}</p>
          
          <div className="bg-green-50 p-4 rounded-md border border-green-100 mt-2">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-green-800 text-xs">
                  Categoría: <span className="font-medium capitalize">{currentTip.category.replace(/-/g, ' ')}</span>
                </p>
                <p className="text-green-800 text-xs mt-1">
                  Tipo de planta: <span className="font-medium capitalize">{currentTip.plantType}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantTipsWidget;