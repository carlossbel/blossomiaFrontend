import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import MfaVerification from '../../../Components/Auth/MfaVerification';
import Button from '../../../Components/UI/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, requiresMfa, authError, loading } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showMfa, setShowMfa] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // Efecto para manejar el tiempo de bloqueo
  useEffect(() => {
    if (blockTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBlockTimeLeft(blockTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (blockTimeLeft === 0 && isBlocked) {
      setIsBlocked(false);
    }
  }, [blockTimeLeft, isBlocked]);

  // Efecto para mostrar mensaje de éxito si viene de registro
  useEffect(() => {
    const fromRegistration = new URLSearchParams(location.search).get('fromRegistration');
    if (fromRegistration === 'true') {
      showSuccess('Registro exitoso. Por favor inicia sesión con tus credenciales.');
    }
  }, [location, showSuccess]);

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      showError(`Por favor espera ${blockTimeLeft} segundos antes de intentar nuevamente.`);
      return;
    }
    
    if (validateForm()) {
      try {
        // Si hay muchos intentos fallidos, mostrar advertencia y bloquear temporalmente
        if (loginAttempts >= 3) {
          setIsBlocked(true);
          // Bloquear por 30 segundos después de 3 intentos fallidos
          setBlockTimeLeft(30);
          showError('Demasiados intentos fallidos. Por favor, espera 30 segundos antes de intentar nuevamente.');
          return;
        }
        
        const result = await login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success) {
          if (result.requiresMfa) {
            setShowMfa(true);
          } else {
            showSuccess('Inicio de sesión exitoso');
            // Reiniciar contador de intentos
            setLoginAttempts(0);
            // Redirigir al dashboard
            navigate('/dashboard');
          }
        } else {
          // Incrementar contador de intentos fallidos
          setLoginAttempts(prev => prev + 1);
          showError('Credenciales inválidas');
        }
      } catch (error) {
        setLoginAttempts(prev => prev + 1);
        showError(error.message || 'Error al iniciar sesión');
      }
    }
  };
  
  const handleMfaSuccess = () => {
    showSuccess('Inicio de sesión exitoso');
    // Reiniciar contador de intentos
    setLoginAttempts(0);
    // Redirigir al dashboard
    navigate('/dashboard');
  };
  
  const handleMfaCancel = () => {
    setShowMfa(false);
  };

  return (
    <div className="w-full">
      {/* Mostrar verificación MFA si es necesario */}
      {showMfa || requiresMfa ? (
        <MfaVerification 
          onSuccess={handleMfaSuccess}
          onCancel={handleMfaCancel}
        />
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          {authError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {authError}
            </div>
          )}
          
          {isBlocked && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              Cuenta bloqueada temporalmente. Podrás intentarlo de nuevo en {blockTimeLeft} segundos.
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1 text-sm">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="usuario@ejemplo.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
              disabled={isBlocked}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1 text-sm">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
              disabled={isBlocked}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-gray-700 border-gray-300 rounded"
                disabled={isBlocked}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Después de iniciar sesión, deberás ingresar el código de verificación de tu aplicación de autenticación.
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading || isBlocked}
            fullWidth
          >
            {loading ? 'Verificando...' : isBlocked ? `Bloqueado (${blockTimeLeft}s)` : 'Iniciar sesión'}
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/register" className="text-gray-600 hover:text-gray-800">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;