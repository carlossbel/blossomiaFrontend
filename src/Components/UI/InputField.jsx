import React from 'react';

const InputField = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 mb-4"
    />
  );
};

export default InputField;