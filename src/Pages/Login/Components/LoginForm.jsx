import React, { useState } from 'react';
import Button from '../../../Components/UI/Button';
import InputField from '../../../Components/UI/InputField';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // This would typically handle authentication
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-3">
        <InputField
          type="email"
          placeholder="Ingresa tu correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <InputField
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <Button fullWidth type="submit">Iniciar sesión</Button>
      <div className="text-center mt-4">
        <a href="/register" className="text-sm text-gray-600 hover:underline">No tienes cuenta? Registrarte</a>
      </div>
    </form>
  );
};

export default LoginForm;