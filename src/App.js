import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './globals.css';

// Importar páginas
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
