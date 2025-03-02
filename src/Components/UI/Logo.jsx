import React from 'react';
import logoImg from '../../public/logo.jpg'; 

const Logo = () => {
  return (
    <div className="flex items-center brand">
      <img 
        src={logoImg} 
        alt="BLOSSOMIA" 
        className="h-8 mr-2"
      />
    </div>
  );
};

export default Logo;
