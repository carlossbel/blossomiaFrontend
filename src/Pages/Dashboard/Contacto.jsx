import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/UI/Button';
import axios from 'axios';
import { useNotification } from '../../contexts/NotificationContext';
import { AUTH_CONFIG } from '../../config/config';
import IMAGES from '../../constants/images';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Contacto = () => {
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    tipoConsulta: 'cuidados'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Opciones para consultas de plantas
  const tiposConsulta = [
    { id: 'cuidados', nombre: 'Cuidados de plantas' },
    { id: 'enfermedades', nombre: 'Enfermedades y plagas' },
    { id: 'compra', nombre: 'Información de compra' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
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
      setLoading(true);
      
      try {
        // Construir objeto de datos
        const datos = {
          nombre: formData.nombre,
          email: formData.email,
          mensaje: formData.mensaje,
          tipoConsulta: formData.tipoConsulta
        };
        
        // Obtener token del localStorage (si existe)
        const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
        
        // Configurar headers con token de autorización si está disponible
        const headers = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Realizar petición al endpoint /api/contacto
        const response = await axios.post(`${API_BASE_URL}/contacto`, datos, {
          headers
        });
        
        if (response.status === 201) {
          showSuccess('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
          
          // Mostrar mensaje específico sobre a dónde se ha enviado
          console.log('Mensaje enviado a carlossbel09@gmail.com');
          
          // Limpiar formulario
          setFormData({
            nombre: '',
            email: '',
            mensaje: '',
            tipoConsulta: 'cuidados'
          });
        } else {
          throw new Error('La respuesta del servidor no fue la esperada');
        }
      } catch (error) {
        console.error('Error al enviar contacto:', error);
        
        // Mostrar mensaje de error más específico
        if (error.response) {
          // El servidor respondió con un código de error
          showError(error.response.data?.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.');
        } else if (error.request) {
          // La petición se hizo pero no hubo respuesta
          showError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
          // Error en la configuración de la petición
          showError('Error al preparar el envío del mensaje. Intenta de nuevo.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Contacto</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Contacta con nuestros expertos en plantas</h2>
            
            <div className="space-y-3">
              <button 
                onClick={() => setFormData({...formData, tipoConsulta: 'cuidados'})} 
                className={`w-full py-3 px-4 border rounded-md text-left ${formData.tipoConsulta === 'cuidados' ? 'bg-green-50 border-green-200' : 'border-gray-300 hover:bg-gray-50'}`}
                type="button"
              >
                <div className="font-medium">Consulta sobre cuidados</div>
                <div className="text-sm text-gray-600">Consejos para el cuidado óptimo de tus plantas</div>
              </button>
              
              <button 
                onClick={() => setFormData({...formData, tipoConsulta: 'enfermedades'})} 
                className={`w-full py-3 px-4 border rounded-md text-left ${formData.tipoConsulta === 'enfermedades' ? 'bg-green-50 border-green-200' : 'border-gray-300 hover:bg-gray-50'}`}
                type="button"
              >
                <div className="font-medium">Enfermedades y plagas</div>
                <div className="text-sm text-gray-600">Ayuda para identificar y tratar problemas</div>
              </button>
              
              <button 
                onClick={() => setFormData({...formData, tipoConsulta: 'compra'})} 
                className={`w-full py-3 px-4 border rounded-md text-left ${formData.tipoConsulta === 'compra' ? 'bg-green-50 border-green-200' : 'border-gray-300 hover:bg-gray-50'}`}
                type="button"
              >
                <div className="font-medium">Información de compra</div>
                <div className="text-sm text-gray-600">Preguntas sobre disponibilidad y precios</div>
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="tipoConsulta" className="block text-gray-700 mb-2">Tipo de Consulta</label>
              <select
                id="tipoConsulta"
                name="tipoConsulta"
                value={formData.tipoConsulta}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                {tiposConsulta.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-gray-700 mb-2">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-2 border ${errors.mensaje ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Describe tu consulta sobre plantas..."
              ></textarea>
              {errors.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>}
            </div>
            
            <Button 
              type="submit" 
              fullWidth
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Consulta'}
            </Button>
          </form>
          
          {/* Bloque de horario de atención */}
          <div className="bg-green-50 p-6 border border-green-100 rounded-lg">
            <h3 className="font-medium text-green-800 mb-3">Horario de atención</h3>
            <p className="text-green-700 mb-4">Nuestros expertos están disponibles para atender tus consultas:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-green-800">Lunes a Viernes:</div>
              <div className="text-green-700">9:00 - 18:00</div>
              <div className="text-green-800">Sábados:</div>
              <div className="text-green-700">10:00 - 14:00</div>
              <div className="text-green-800">Domingos:</div>
              <div className="text-green-700">Cerrado</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="mb-6 flex justify-center">
            {/* Imagen de flores con tamaño reducido */}
            <div className="w-3/4 h-auto">
              <img 
                src={IMAGES.CATEGORY_AROMATICAS || '/flower4.jpg'} 
                alt="Flores" 
                className="w-full h-auto rounded-lg shadow-sm object-cover" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23850073" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">¿Por qué contactarnos?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Asesoramiento especializado</h4>
                  <p className="text-sm text-gray-600">Nuestros expertos en jardinería te ayudarán a resolver cualquier duda sobre tus plantas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Diagnóstico de problemas</h4>
                  <p className="text-sm text-gray-600">Identificamos enfermedades y plagas que afectan a tus plantas, ofreciendo soluciones efectivas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Respuesta rápida</h4>
                  <p className="text-sm text-gray-600">Nos comprometemos a responder a tus consultas en un plazo máximo de 24 horas.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Información de contacto adicional */}
          <div className="mt-6 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-4">Información de contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">carlossbel09@gmail.com</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+1 234 567 890</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">123 Calle de las Flores<br/>Ciudad Jardín, CP 12345<br/>España</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contacto;