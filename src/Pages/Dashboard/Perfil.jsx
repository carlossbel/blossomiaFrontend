import React, { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/UI/Button';
import flower5 from '../../public/flower5.png';

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    telefono: '123456789',
    nivelExperiencia: 'Intermedio',
    tipoJardin: 'Interior'
  });

  // Recordatorios para el cuidado de plantas
  const recordatorios = [
    {
      id: 1,
      planta: 'Todas las plantas',
      accion: 'Revisar plagas',
      fecha: '2023-03-20'
    },
    {
      id: 2,
      planta: 'Plantas de interior',
      accion: 'Fertilizar',
      fecha: '2023-03-25'
    }
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Mi Perfil de Jardinería</h1>
          
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
                <p className="font-medium">{userData.telefono}</p>
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
          </div>
          
          <div className="flex space-x-4 mb-6">
            <Button variant="primary">Editar Perfil</Button>
            <Button variant="secondary">Ajustes de Notificación</Button>
          </div>
          
          {/* Calendario de Cuidados (Movido debajo de la info del perfil) */}
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium mb-4">Calendario de Cuidados</h2>
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500 rounded-md mb-4">
              Gráfico de calendario
            </div>
            <h3 className="font-medium text-gray-700 mb-2">Próximos Recordatorios</h3>
            <div className="space-y-2">
              {recordatorios.map(recordatorio => (
                <div key={recordatorio.id} className="flex items-center justify-between p-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{recordatorio.accion}</p>
                    <p className="text-sm text-gray-500">{recordatorio.planta}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-500">{recordatorio.fecha}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Consejos Personalizados (Ahora debajo del calendario) */}
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
        
        {/* Columna derecha - Solo imagen */}
        <div>
          <div className="flex justify-center">
            {/* Imagen de flores */}
            <div className="w-2/3 h-auto">
              <img 
                src={flower5} 
                alt="Flores" 
                className="w-full h-auto rounded-lg shadow-sm object-cover" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 24 24" fill="none" stroke="%230073dd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Perfil;