import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../UI/Button';

const MfaVerification = ({ onSuccess, onCancel }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo restante para el código
  const { verifyMfa, loading, cancelMfaVerification } = useAuth();

  // Contador regresivo para el código de verificación
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e) => {
    // Solo permitir números
    const value = e.target.value.replace(/[^\d]/g, '');
    
    if (value.length <= 6) {
      setToken(value);
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token.trim()) {
      return setError('Por favor ingresa el código de verificación');
    }
    
    if (token.length !== 6) {
      return setError('El código debe tener 6 dígitos');
    }
    
    const result = await verifyMfa(token);
    
    if (result.success) {
      onSuccess && onSuccess();
    } else {
      setError(result.error?.message || 'Código de verificación inválido');
    }
  };

  const handleCancel = () => {
    // Limpiar el token y cualquier error
    setToken('');
    setError('');
    
    // Llamar al método del contexto para cancelar la verificación MFA
    cancelMfaVerification && cancelMfaVerification();
    
    // Llamar a la función onCancel proporcionada
    onCancel && onCancel();
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-center mb-4">Verificación de seguridad</h3>
      <p className="text-gray-600 text-sm mb-6">
        Ingresa el código de 6 dígitos de tu aplicación de autenticación
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="token" className="block text-gray-700 mb-1 text-sm">Código de verificación</label>
          <input
            type="text"
            id="token"
            placeholder="Código de 6 dígitos"
            value={token}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-center text-xl tracking-widest"
            maxLength={6}
            autoComplete="one-time-code"
          />
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-500">
              El código expirará en {timeLeft} segundos
            </span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </Button>
          
          <Button 
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No puedes acceder a tu aplicación de autenticación?
          <button className="ml-1 text-blue-600 hover:text-blue-800">
            Contacta con soporte
          </button>
        </p>
      </div>
    </div>
  );
};

export default MfaVerification;