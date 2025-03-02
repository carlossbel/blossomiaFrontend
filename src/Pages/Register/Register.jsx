import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import flower3 from '../../public/flower3.png';
import logoImg from '../../public/logo.jpg';

const Register = () => {
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
    // Aquí iría la lógica de registro
  };

  return (
    <div className="page-container register-page">
      <div className="two-column-layout">
        <div className="column image-column">
          <img src={flower3} alt="Flores de magnolia" />
        </div>
        
        <div className="column content-column">
          <div className="logo">
            <img src={logoImg} alt="BLOSSOMIA" />
          </div>

          <div className="form-container">
            <h2 className="form-title">Registrarse</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Repite tu contraseña"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn">
                  Registrarse
                </button>
              </div>
            </form>
            <Link to="/login" className="account-link">
              Ya tienes una cuenta? Inicia aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;