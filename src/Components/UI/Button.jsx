import React from 'react';

const Button = ({ children, onClick, fullWidth = false, variant = 'primary' }) => {
  const baseStyles = "py-3 font-medium transition-colors duration-200";
  
  const variants = {
    primary: "bg-gray-700 text-white hover:bg-gray-800",
    secondary: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50"
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;