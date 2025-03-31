import React from 'react';

const Loader = ({ size = 'medium', text = 'Cargando...' }) => {
  // Configurar tamaño del spinner
  let spinnerSize = 'h-8 w-8';
  if (size === 'small') spinnerSize = 'h-4 w-4';
  if (size === 'large') spinnerSize = 'h-12 w-12';

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className={`animate-spin rounded-full ${spinnerSize} border-t-2 border-b-2 border-gray-700`}></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;