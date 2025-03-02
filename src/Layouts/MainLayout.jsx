import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;