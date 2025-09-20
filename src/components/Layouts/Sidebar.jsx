
import React, { useState,} from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star, 
  Home, 
  User, 
  Settings, 
  FileText, 
  MessageSquare, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Activity,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  Plus
} from "lucide-react";

// Custom CSS animations
const AnimationCSS = () => (
  <style>{`
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes iconBounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    
    @keyframes textReveal {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    .animate-slide-in-left {
      animation: slideInLeft 0.5s ease-out;
    }
    
    .animate-icon-bounce {
      animation: iconBounce 1s ease-in-out;
    }
    
    .animate-text-reveal {
      animation: textReveal 0.3s ease-out;
    }
    
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 200px 100%;
      animation: shimmer 2s infinite;
    }
    
    .animate-pulse-custom {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .card-hover-effect {
      transition: all 0.2s ease-in-out;
    }
    
    .card-hover-effect:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .micro-bounce {
      transition: transform 0.15s ease-in-out;
    }
    
    .micro-bounce:hover {
      transform: scale(1.05);
    }
  `}</style>
);

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, activeItem, setActiveItem, isMobile }) => {
  const [expandedDashboard, setExpandedDashboard] = useState(false);

  const dashboardSubItems = [
    { title: "Admin Dashboard", url: "/dashboard/admin", icon: User, badge: null, color: "blue" },
    { title: "Super Admin", url: "/dashboard/superadmin", icon: Settings, badge: null, color: "purple" },
    { title: "Owner Dashboard", url: "/dashboard/owner", icon: Star, badge: null, color: "yellow" }
  ];

  const navigationItems = [
    { title: "Dashboard", url: "/", icon: Home, badge: null, color: "blue", hasSubmenu: true },
    { title: "Analytics", url: "/analytics", icon: BarChart3, badge: "New", color: "purple" },
    { title: "Projects", url: "/projects", icon: FileText, badge: "12", color: "green" },
    { title: "Messages", url: "/messages", icon: MessageSquare, badge: "3", color: "orange" },
    { title: "Calendar", url: "/calendar", icon: Calendar, badge: null, color: "red" },
    { title: "Profile", url: "/profile", icon: User, badge: null, color: "pink" },
    { title: "Favorites", url: "/favorites", icon: Star, badge: null, color: "yellow" },
    { title: "Settings", url: "/settings", icon: Settings, badge: null, color: "gray" },
  ];

  // Auto-expand dashboard if a dashboard sub-item is active
  React.useEffect(() => {
    if (activeItem.startsWith('/dashboard/')) {
      setExpandedDashboard(true);
    }
  }, [activeItem]);

  const handleItemClick = (url) => {
    if (url === "/") {
      // When clicking Dashboard, open Admin Dashboard directly and expand submenu
      setActiveItem("/dashboard/admin");
      setExpandedDashboard(true);
      if (isMobile) {
        setIsOpen(false);
      }
      return;
    }
    
    // Collapse dashboard submenu when clicking other modules
    setExpandedDashboard(false);
    setActiveItem(url);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleDashboardToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the main dashboard click
    setExpandedDashboard(!expandedDashboard);
  };

  const handleDashboardSubItemClick = (url) => {
    setActiveItem(url);
    // Keep submenu expanded when switching between dashboard types
    setExpandedDashboard(true);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getIconBgClass = (color, isActive) => {
    if (isActive) {
      return "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm";
    }
    return "bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white";
  };

  return (
    <>
      <AnimationCSS />
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={`
        ${isMobile ? 'fixed' : 'relative'} ${isMobile ? 'z-50' : 'z-10'}
        ${isOpen ? "w-72" : (isMobile ? "w-0" : "w-20")} 
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-all duration-300 ease-in-out
        bg-white border-r border-gray-200 shadow-lg
        backdrop-blur-xl h-screen flex flex-col
      `}>
        {/* Header with toggle button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {isOpen && (
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg micro-bounce">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Dashboard</h1>
                <p className="text-xs text-gray-500">Premium Version</p>
              </div>
            </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className="p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group hover:shadow-md micro-bounce"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-3">
          {isOpen && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3 animate-slide-in-left">
              Navigation
            </div>
          )}
          
          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = activeItem === item.url || (item.hasSubmenu && activeItem.startsWith('/dashboard/'));
              const isDashboardExpanded = item.hasSubmenu && expandedDashboard;
              const buttonClasses = [
                "relative group h-14 rounded-2xl transition-all duration-300 hover:shadow-lg w-full card-hover-effect",
                isActive ? "bg-blue-50 border border-blue-200 shadow-md" : "hover:bg-gray-50 border border-transparent",
                !isOpen && !isMobile ? "justify-center" : ""
              ].join(" ");

              return (
                <div key={item.title}>
                  <button
                    onClick={() => handleItemClick(item.url)}
                    className={buttonClasses}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center w-full px-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 micro-bounce ${getIconBgClass(item.color, isActive)}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      
                      {isOpen && (
                        <div className="flex items-center justify-between w-full ml-4 animate-text-reveal">
                          <span className={`font-semibold truncate transition-colors duration-200 ${isActive ? "text-blue-700" : "text-gray-700"}`}>
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 micro-bounce ${item.badge === "New" ? "bg-green-100 text-green-700 border border-green-200 animate-pulse-custom" : "bg-blue-100 text-blue-700 border border-blue-200"}`}>
                                {item.badge}
                              </span>
                            )}
                            {item.hasSubmenu && (
                              <button
                                onClick={handleDashboardToggle}
                                className="p-1 rounded-md hover:bg-blue-100 transition-colors duration-200"
                              >
                                <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDashboardExpanded ? 'rotate-90' : ''}`} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-full shadow-lg" />
                    )}
                  </button>

                  {/* Dashboard Submenu */}
                  {item.hasSubmenu && isOpen && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDashboardExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-6 mt-2 space-y-1">
                        {dashboardSubItems.map((subItem, subIndex) => {
                          const isSubActive = activeItem === subItem.url;
                          return (
                            <button
                              key={subItem.title}
                              onClick={() => handleDashboardSubItemClick(subItem.url)}
                              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group hover:shadow-sm ${
                                isSubActive 
                                  ? "bg-blue-100 border border-blue-200 shadow-sm" 
                                  : "hover:bg-gray-50 border border-transparent"
                              }`}
                              style={{ animationDelay: `${subIndex * 50}ms` }}
                            >
                              <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 micro-bounce ${
                                isSubActive 
                                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm" 
                                  : "bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white"
                              }`}>
                                <subItem.icon className="h-4 w-4" />
                              </div>
                              <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${
                                isSubActive ? "text-blue-700" : "text-gray-700"
                              }`}>
                                {subItem.title}
                              </span>
                              {isSubActive && (
                                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-sm" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* User section at bottom */}
        <div className="p-3">
          <div className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 card-hover-effect ${!isOpen && !isMobile ? "justify-center" : ""}`}>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg micro-bounce">
              <User className="h-6 w-6 text-white" />
            </div>
            {isOpen && (
              <div className="flex flex-col animate-slide-in-left">
                <span className="text-sm font-bold text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500">Premium User</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
