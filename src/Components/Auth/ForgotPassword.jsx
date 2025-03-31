import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../UI/Button';
import logoImg from '../../public/logo.jpg';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // 1: Ingresar email, 2: Ingresar código
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { forgotPassword, verifyResetCode, loading } = useAuth();
  const { showSuccess, showError } = useNotification();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleCodeChange = (e) => {
    // Solo permitir números y limitar a 6 dígitos
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(value);
    if (error) setError('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return setError('Por favor ingresa tu correo electrónico');
    }
    
    try {
      setIsSubmitting(true);
      const result = await forgotPassword(email);
      
      if (result.success) {
        const successMessage = 'Se ha enviado un código de verificación a tu correo electrónico';
        setMessage(successMessage);
        showSuccess(successMessage);
        setStep(2); // Avanzar al paso de verificación de código
      } else {
        throw result.error || { message: 'Error al procesar la solicitud' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Error al procesar la solicitud';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      return setError('Por favor ingresa el código de 6 dígitos');
    }
    
    try {
      setIsSubmitting(true);
      const result = await verifyResetCode(email, code);
      
      if (result.success) {
        showSuccess('Código verificado correctamente');
        // Redirigir a la página de restablecer contraseña con el token
        navigate(`/reset-password/${result.token}`);
      } else {
        throw result.error || { message: 'Código inválido o expirado' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Código inválido o expirado';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-8">
        <img src={logoImg} alt="BLOSSOMIA" className="h-12" />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6">Recuperar contraseña</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      
      {step === 1 ? (
        // Paso 1: Ingresar correo electrónico
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="usuario@ejemplo.com"
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Información:</h4>
            <p className="text-sm text-blue-700">
              Te enviaremos un código de verificación de 6 dígitos a tu correo electrónico.
              El código será válido por 1 hora.
            </p>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar código'}
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      ) : (
        // Paso 2: Ingresar código de verificación
        <form onSubmit={handleCodeSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700 mb-2">Código de verificación</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Importante:</h4>
            <p className="text-sm text-yellow-700">
              Hemos enviado un código de 6 dígitos a {email}.
              Si no lo encuentras, revisa tu carpeta de spam.
            </p>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verificando...' : 'Verificar código'}
          </Button>
          
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cambiar correo
            </button>
            
            <button
              type="button"
              onClick={() => handleEmailSubmit({ preventDefault: () => {} })}
              className="text-blue-600 hover:text-blue-800"
              disabled={isSubmitting}
            >
              Reenviar código
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;