import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Menu, X, Bell, Search } from "lucide-react";
// import profile from '../../assets/profile.jpg';
// import logo from '../../assets/image.png';
 
function Navbar({ toggleSidebar, isSidebarOpen, isMobile }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
 
  // Placeholder for profile image - replace with your actual import
  const profilePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234F46E5'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3EJD%3C/text%3E%3C/svg%3E";
  
  // Placeholder for logo - replace with your actual import
  const logoPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Crect width='120' height='40' rx='8' fill='%234F46E5'/%3E%3Ctext x='60' y='25' text-anchor='middle' fill='white' font-size='14' font-weight='bold' font-family='Arial'%3EDashboard%3C/text%3E%3C/svg%3E";
 
  const notifications = [
    { id: 1, title: "New message received", time: "2 min ago", unread: true },
    { id: 2, title: "Project deadline approaching", time: "1 hour ago", unread: true },
    { id: 3, title: "System maintenance scheduled", time: "3 hours ago", unread: false }
  ];
 
  const unreadCount = notifications.filter(n => n.unread).length;
 
  return (
    <div 
      className={`fixed top-0 right-0 h-[72px] bg-white border-b border-gray-200 p-4 flex items-center justify-between z-40 transition-all duration-300 ${
        isMobile ? 'left-0' : (isSidebarOpen ? 'left-72' : 'left-20')
      }`}
      style={{ boxShadow: '0 4px 8px -2px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Left side - Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        )}
 
        {/* Logo - Show on mobile when sidebar is closed, always show on desktop */}
        <div className={`flex items-center ${isMobile && isSidebarOpen ? 'hidden' : 'flex'}`}>
          <img 
            src={logoPlaceholder} // Replace with {logo}
            alt="Dashboard Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>
 
      {/* Center - Search bar (hidden on mobile) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
      </div>
 
      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>
 
          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
 
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img 
              src={profilePlaceholder} // Replace with {profile}
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              John Doe
            </span>
            <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isProfileDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>
 
          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Account
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Billing
              </button>
              
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
 
      {/* Click outside handler */}
      {(isProfileDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </div>
  );
}
 
export default Navbar;