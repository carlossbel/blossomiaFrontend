import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../UI/Button';
import logoImg from '../../public/logo.jpg';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isVerifying, setIsVerifying] = useState(true);
  
  // Verificar la validez del token cuando se monta el componente
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // En una implementación real, aquí se verificaría el token con el backend
        // Por ahora, simulamos una verificación exitosa
        setTimeout(() => {
          setIsVerifying(false);
          // Si el token es inválido, se establecería isTokenValid a false
        }, 1000);
      } catch (error) {
        setIsTokenValid(false);
        setIsVerifying(false);
        showError('El enlace de restablecimiento es inválido o ha expirado');
      }
    };
    
    verifyToken();
  }, [token, showError]);
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Evaluar la fortaleza de la contraseña
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[a-z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
    
    setPasswordStrength(strength);
    
    if (error) setError('');
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!password) {
      return setError('Por favor ingresa una contraseña');
    }
    
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    
    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setSuccess(true);
        showSuccess('Contraseña actualizada correctamente');
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        throw result.error || { message: 'Error al restablecer la contraseña' };
      }
    } catch (error) {
      setError(error.message || 'Error al restablecer la contraseña');
      showError(error.message || 'Error al restablecer la contraseña');
    }
  };
  
  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Débil';
    if (passwordStrength <= 3) return 'Media';
    return 'Fuerte';
  };
  
  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Mostrar un indicador de carga mientras se verifica el token
  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="BLOSSOMIA" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Verificando enlace</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
        </div>
      </div>
    );
  }
  
  // Mostrar mensaje de error si el token es inválido
  if (!isTokenValid) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="BLOSSOMIA" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Enlace inválido</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          El enlace de restablecimiento de contraseña es inválido o ha expirado.
        </div>
        <Link to="/forgot-password">
          <Button fullWidth>
            Solicitar un nuevo enlace
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-8">
        <img src={logoImg} alt="BLOSSOMIA" className="h-12" />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6">Restablecer contraseña</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success ? (
        <div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Tu contraseña ha sido restablecida correctamente. Serás redirigido al inicio de sesión...
          </div>
          
          <Link to="/login">
            <Button fullWidth>
              Ir al inicio de sesión
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Mínimo 6 caracteres"
            />
            {password && (
              <div className="mt-2">
                <div className="flex h-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-full ${
                        i < passwordStrength ? getStrengthColor() : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fortaleza: {getStrengthText()}
                </p>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Repite tu contraseña"
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Recomendaciones para una contraseña segura:</h4>
            <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
              <li>Usa al menos 8 caracteres</li>
              <li>Incluye letras mayúsculas y minúsculas</li>
              <li>Incluye números y símbolos</li>
              <li>Evita utilizar información personal o contraseñas comunes</li>
            </ul>
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Restablecer contraseña'}
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;