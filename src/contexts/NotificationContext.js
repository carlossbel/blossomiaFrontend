import React, { createContext, useContext, useState } from 'react';
import Notification from '../Components/UI/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Mostrar una notificación
  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    return id;
  };

  // Mostrar una notificación de éxito
  const showSuccess = (message, duration = 3000) => {
    return showNotification(message, 'success', duration);
  };

  // Mostrar una notificación de error
  const showError = (message, duration = 3000) => {
    return showNotification(message, 'error', duration);
  };

  // Mostrar una notificación de información
  const showInfo = (message, duration = 3000) => {
    return showNotification(message, 'info', duration);
  };

  // Mostrar una notificación de advertencia
  const showWarning = (message, duration = 3000) => {
    return showNotification(message, 'warning', duration);
  };

  // Cerrar una notificación específica
  const closeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Cerrar todas las notificaciones
  const closeAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        closeNotification,
        closeAllNotifications
      }}
    >
      {children}
      {/* Renderizar todas las notificaciones activas */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => closeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para usar el contexto de notificaciones
export const useNotification = () => {
  return useContext(NotificationContext);
};

export default NotificationContext;