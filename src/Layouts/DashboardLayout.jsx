import React, { useState, useEffect } from 'react';
import Header from '../Components/Dashboard/Header';
import Sidebar from '../Components/Dashboard/Sidebar';
import Footer from '../Components/Dashboard/Footer';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize to adjust sidebar visibility on large screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Determine if we should display the sidebar for large screens
  const isLargeScreen = windowWidth >= 1024; // Tailwind's lg breakpoint

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isLargeScreen && sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;