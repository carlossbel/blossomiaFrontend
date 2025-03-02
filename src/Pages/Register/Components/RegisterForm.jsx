import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../Components/UI/Button';
import InputField from '../../../Components/UI/InputField';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    console.log('Register data:', formData);
    // This would typically handle user registration
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-3">
        <InputField
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          type="email"
          placeholder="Correo electronico"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <InputField
          type="password"
          placeholder="Repite tu contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <Button fullWidth type="submit">Registrarse</Button>
      <div className="text-center mt-4">
        <Link to="/login" className="text-sm text-gray-600 hover:underline">Ya tienes una cuenta? Inicia aquí</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
