import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import flower2 from '../../public/flower2.png';
import logoImg from '../../public/logo.jpg';

const Login = () => {
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
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="page-container login-page">
      <div className="two-column-layout">
        <div className="column image-column">
          <img src={flower2} alt="Orquídea púrpura" />
        </div>
        
        <div className="column content-column">
          <div className="logo">
            <img src={logoImg} alt="BLOSSOMIA" />
          </div>

          <div className="form-container">
            <h2 className="form-title">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Ingresa tu correo"
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
                <button type="submit" className="btn">
                  Iniciar sesión
                </button>
              </div>
            </form>
            <Link to="/register" className="account-link">
              No tienes cuenta? Registrarte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;