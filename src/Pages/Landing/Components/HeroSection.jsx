import React from 'react';
import Button from '../../../Components/UI/Button';

const HeroSection = () => {
  return (
    <div className="flex flex-col max-w-lg">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">Aprende mas sobre plantas</h1>
      <p className="text-gray-600 text-lg mb-6">bla bla bla</p>
      <div className="mb-8">
        <p className="text-gray-700 text-base">Descubre todo lo necesario y los cuidados para tus plantas</p>
      </div>
      <div className="w-full max-w-xs">
        <Button fullWidth variant="primary">Explorar</Button>
      </div>
    </div>
  );
};

export default HeroSection;