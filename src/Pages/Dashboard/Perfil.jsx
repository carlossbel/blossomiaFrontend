import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import flower5 from '../../public/flower5.png';

const Perfil = () => {
  const { currentUser, updateUserInfo } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nivelExperiencia: 'Principiante',
    tipoJardin: 'Interior'
  });

  // Cargar datos del usuario
  useEffect(() => {
    if (currentUser) {
      setUserData({
        nombre: currentUser.name || '',
        email: currentUser.email || '',
        telefono: currentUser.telefono || '',
        nivelExperiencia: currentUser.nivelExperiencia || 'Principiante',
        tipoJardin: currentUser.tipoJardin || 'Interior'
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateUserInfo({
        name: userData.nombre,
        email: userData.email,
        telefono: userData.telefono,
        nivelExperiencia: userData.nivelExperiencia,
        tipoJardin: userData.tipoJardin
      });

      if (result.success) {
        showSuccess('Perfil actualizado correctamente');
        setEditMode(false);
      } else {
        showError('Error al actualizar el perfil');
      }
    } catch (error) {
      showError(error.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Mi Perfil de Jardinería</h1>
          
          {editMode ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">Editar información personal</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="nivelExperiencia" className="block text-gray-700 mb-2">Nivel de Experiencia</label>
                  <select
                    id="nivelExperiencia"
                    name="nivelExperiencia"
                    value={userData.nivelExperiencia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tipoJardin" className="block text-gray-700 mb-2">Tipo de Jardín</label>
                  <select
                    id="tipoJardin"
                    name="tipoJardin"
                    value={userData.tipoJardin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Balcón">Balcón</option>
                    <option value="Terraza">Terraza</option>
                    <option value="Huerto">Huerto</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-medium mb-4">Información Personal</h2>
              <div className="space-y-3">
                <div className="p-3 border border-gray-100 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium">{userData.nombre}</p>
                </div>
                
                <div className="p-3 border border-gray-100 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                
                <div className="p-3 border border-gray-100 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{userData.telefono || 'No especificado'}</p>
                </div>
                
                <div className="p-3 border border-gray-100 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Nivel de Experiencia</p>
                  <p className="font-medium">{userData.nivelExperiencia}</p>
                </div>
                
                <div className="p-3 border border-gray-100 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500">Tipo de Jardín</p>
                  <p className="font-medium">{userData.tipoJardin}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="primary" onClick={() => setEditMode(true)}>
                  Editar Perfil
                </Button>
              </div>
            </div>
          )}
          
          {/* Consejos Personalizados */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Consejos Personalizados</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                <p className="font-medium text-green-800 mb-1">Para tus plantas de interior</p>
                <p className="text-sm text-green-700">Incrementa la humedad ambiental colocando las macetas sobre platos con guijarros y agua.</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                <p className="font-medium text-blue-800 mb-1">Monstera Deliciosa</p>
                <p className="text-sm text-blue-700">Limpia las hojas con un paño húmedo regularmente para mantener los poros despejados.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
              <img 
                src={flower5} 
                alt="Flores" 
                className="w-full h-auto object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                }}
              />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Perfil;