import React from 'react';
import { Link } from 'react-router-dom';
import flower1 from '../../public/flower1.png';
import logoImg from '../../public/logo.jpg';

const Landing = () => {
  return (
    <div className="page-container">
      <div className="navbar">
        <div className="social-icons">
          <a href="https://instagram.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
          <a href="https://facebook.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="mailto:info@blossomia.com" className="social-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
        
        <div className="logo" style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)' }}>
          <img src={logoImg} alt="BLOSSOMIA" />
        </div>
        
        <div className="auth-links">
          <Link to="/login">Inicia sesión</Link> / 
          <Link to="/register">Registrarse</Link>
        </div>
      </div>

      <div className="two-column-layout">
        <div className="column content-column">
          <div className="hero-section">
            <h1 className="hero-title">Aprende mas sobre plantas</h1>
            <p className="hero-text">bla bla bla</p>
            <p className="hero-text">Descubre todo lo necesario y los cuidados para tus plantas</p>
            <button className="btn">Boton</button>
          </div>
        </div>

        <div className="column image-column">
          <img src={flower1} alt="Flor de lirio" />
        </div>
      </div>
    </div>
  );
};

export default Landing;