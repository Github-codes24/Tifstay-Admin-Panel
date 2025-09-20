import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
 
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("/dashboard/admin"); // Default active item
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
 
  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setIsSidebarOpen(true); // Open sidebar on desktop by default
      }
    };
 
    // Check on mount
    checkScreenSize();
 
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
 
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
 
  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveItem(currentPath || "/dashboard/admin");
  }, [location.pathname]);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
 
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isMobile={isMobile}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar */}
        <Navbar 
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />
        
        {/* Main Content */}
        <main 
          className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${
            isMobile ? 'pt-[72px]' : 'pt-[72px]'
          }`}
          style={{
            marginLeft: isMobile ? '0' : (isSidebarOpen ? '288px' : '80px'), // 288px = w-72, 80px = w-20
          }}
        >
          <div className="p-6">
            {/* Page Content */}
            <div className="max-w-7xl mx-auto">
              <Outlet context={{ activeItem, setActiveItem }} />
            </div>
          </div>
        </main>
      </div>
 
      {/* Mobile Overlay - handled by Sidebar component */}
    </div>
  );
};
 
export default Layout;