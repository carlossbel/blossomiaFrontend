import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  fullWidth = false, 
  variant = 'primary',
  disabled = false 
}) => {
  const baseStyles = "py-3 px-4 font-medium transition-colors duration-200 rounded-none focus:outline-none";
  
  const variants = {
    primary: `bg-gray-700 text-white ${!disabled ? 'hover:bg-gray-800' : 'opacity-70 cursor-not-allowed'}`,
    secondary: `bg-transparent text-gray-700 border border-gray-300 ${!disabled ? 'hover:bg-gray-50' : 'opacity-70 cursor-not-allowed'}`
  };
  
  // Asegurarse de que la clase btn esté incluida
  return (
    <button
      className={`btn ${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;