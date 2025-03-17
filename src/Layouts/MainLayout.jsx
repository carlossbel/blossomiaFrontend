import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <div className="w-full mx-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;