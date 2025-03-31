import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import Button from '../../../Components/UI/Button';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    nivelExperiencia: 'Principiante',
    tipoJardin: 'Interior'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  // Lista de aplicaciones de autenticación compatibles
  const authApps = [
    {
      name: 'Google Authenticator',
      description: 'Aplicación de Google para generar códigos de verificación.',
      icon: 'G',
      link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
    },
    {
      name: 'Microsoft Authenticator',
      description: 'App de Microsoft para autenticación de dos factores.',
      icon: 'M',
      link: 'https://www.microsoft.com/en-us/security/mobile-authenticator-app'
    },
    {
      name: 'Authy',
      description: 'Solución multiplataforma para autenticación 2FA.',
      icon: 'A',
      link: 'https://authy.com/download/'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo inválido. Debe tener formato usuario@dominio.com';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await register(formData);
        
        if (result.success) {
          // Mostrar el código QR para configuración MFA
          setQrCode(result.data?.qrCode || '');
          setShowQrCode(true);
        } else {
          showError(result.error?.message || 'Error al registrar el usuario');
        }
      } catch (error) {
        showError(error.message || 'Error al registrar el usuario');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full">
      {showQrCode ? (
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Configuración de autenticación de dos factores</h3>
          <p className="text-gray-600 mb-4">
            Escanea este código QR con tu aplicación de autenticación para configurar la verificación de dos factores
          </p>
          
          <div className="mb-6 flex justify-center">
            <img src={qrCode} alt="Código QR para MFA" className="border rounded-md p-2" />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6 text-left">
            <h4 className="font-medium text-blue-800 mb-2">Aplicaciones compatibles:</h4>
            <div className="space-y-3">
              {authApps.map((app, index) => (
                <div key={index} className="flex items-start">
                  <div className="font-bold w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-700 mr-2">{app.icon}</div>
                  <div>
                    <a 
                      href={app.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {app.name}
                    </a>
                    <p className="text-sm text-gray-600">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6 text-left">
            <h4 className="font-medium text-yellow-800 mb-2">Importante:</h4>
            <p className="text-sm text-yellow-700">
              Guarda este código cuidadosamente. Lo necesitarás cada vez que inicies sesión.
              Si pierdes acceso a tu aplicación de autenticación, no podrás recuperar tu cuenta.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => navigate('/login')} 
              fullWidth
            >
              Continuar al inicio de sesión
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1 text-sm">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Tu nombre completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
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
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1 text-sm">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {!errors.password && formData.password && (
              <div className="mt-1">
                <div className="flex items-center">
                  <div className={`h-1 flex-1 ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`h-1 ml-1 flex-1 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`h-1 ml-1 flex-1 ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  La contraseña debe tener al menos 6 caracteres, una mayúscula y un número
                </p>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 text-sm">Repite tu contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repite tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-gray-700 mb-1 text-sm">Teléfono (opcional)</label>
            <input
              type="tel"
              id="telefono"
              placeholder="Tu número de teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="nivelExperiencia" className="block text-gray-700 mb-1 text-sm">Nivel de experiencia</label>
              <select
                id="nivelExperiencia"
                name="nivelExperiencia"
                value={formData.nivelExperiencia}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tipoJardin" className="block text-gray-700 mb-1 text-sm">Tipo de jardín</label>
              <select
                id="tipoJardin"
                name="tipoJardin"
                value={formData.tipoJardin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
                <option value="Balcón">Balcón</option>
                <option value="Terraza">Terraza</option>
                <option value="Huerto">Huerto</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
            <h4 className="font-medium text-blue-800 mb-2">Verificación de dos factores</h4>
            <p className="text-sm text-blue-700 mb-2">
              Para tu seguridad, utilizamos verificación de dos factores. Después de registrarte, deberás configurar una aplicación de autenticación.
            </p>
            <div className="flex items-center space-x-2">
              {authApps.map((app, index) => (
                <div key={index} className="text-center">
                  <span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-medium flex items-center justify-center">{app.icon}</span>
                  <p className="text-xs mt-1">{app.name}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Procesando...' : 'Registrarse'}
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;