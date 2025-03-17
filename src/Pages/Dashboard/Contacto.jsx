import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/UI/Button';
import flower4 from '../../public/flower4.jpg';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    tipoConsulta: 'cuidados'
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Datos de contacto:', formData);
      // Aquí irían las acciones con el formulario de contacto
      alert('Mensaje enviado con éxito');
      setFormData({
        nombre: '',
        email: '',
        mensaje: '',
        tipoConsulta: 'cuidados'
      });
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
              >
                <div className="font-medium">Consulta sobre cuidados</div>
                <div className="text-sm text-gray-600">Consejos para el cuidado óptimo de tus plantas</div>
              </button>
              
              <button 
                onClick={() => setFormData({...formData, tipoConsulta: 'enfermedades'})} 
                className={`w-full py-3 px-4 border rounded-md text-left ${formData.tipoConsulta === 'enfermedades' ? 'bg-green-50 border-green-200' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="font-medium">Enfermedades y plagas</div>
                <div className="text-sm text-gray-600">Ayuda para identificar y tratar problemas</div>
              </button>
              
              <button 
                onClick={() => setFormData({...formData, tipoConsulta: 'compra'})} 
                className={`w-full py-3 px-4 border rounded-md text-left ${formData.tipoConsulta === 'compra' ? 'bg-green-50 border-green-200' : 'border-gray-300 hover:bg-gray-50'}`}
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
            
            <Button type="submit" fullWidth>Enviar Consulta</Button>
          </form>
          
          {/* Bloque de horario de atención movido debajo del formulario */}
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
                src={flower4} 
                alt="Flores" 
                className="w-full h-auto rounded-lg shadow-sm object-cover" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23850073" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contacto;