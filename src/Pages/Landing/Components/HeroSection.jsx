import React from 'react';
import Button from '../../../Components/UI/Button';

const HeroSection = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Aprende mas sobre plantas</h1>
      <p className="text-gray-600 mb-6">bla bla bla</p>
      <div className="mb-8">
        <p className="text-sm text-gray-700">Descubre todo lo necesario y los cuidados para tus plantas</p>
      </div>
      <div className="max-w-xs">
        <Button fullWidth>Boton</Button>
      </div>
    </div>
  );
};

export default HeroSection;