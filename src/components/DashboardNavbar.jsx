// DashboardNavbar.jsx
import React, { useState, useRef, useEffect } from 'react'; 
import { Menu, Search, Mail, Bell, User, User as UserIcon, Lock, LogOut } from 'lucide-react'; 
import logo from "../assets/irislogo.svg";

const DashboardNavbar = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  // --- REVISED NAME FETCHING LOGIC ---
  let adminName = 'Super Admin';
  let adminRole = 'Super Admin'; 

  try {
      const userString = localStorage.getItem('user');
      const roleString = localStorage.getItem('role');

      if (userString) {
          const userObj = JSON.parse(userString);
          
          // Primary check for 'name', fallback to 'username' or 'email'
          adminName = userObj.name || userObj.username || userObj.email || 'Super Admin';
          
          // Use the stored role
          if (roleString) {
             // Capitalize the first letter of the role for display
             adminRole = roleString.charAt(0).toUpperCase() + roleString.slice(1);
          }
      }
  } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      // Fallback name remains 'Super Admin'
  }
  // ------------------------------------

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    
    // Clear ALL relevant storage items
    localStorage.removeItem('token');       
    localStorage.removeItem('user');       
    localStorage.removeItem('role');
    localStorage.removeItem('adminName'); // Clearing this for good measure
    
    console.log("Token removed. Redirecting to login page...");
    window.location.href = '/'; 
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-700 shadow-xl h-16">
      
      {/* Left section: Logo and Title (Lime Green) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-6">
           <img className=" md:w-16 md:h-16" src={logo} alt="IRIS Logo" />
          <span className="text-3xl font-extrabold text-lime-400">IPS</span> 
          
          <Menu 
            className="w-8 h-8 text-white cursor-pointer mr-2 transition-transform duration-300 hover:text-lime-400" 
            onClick={onMenuClick}
          />
          
          <span className="text-lg font-bold text-lime-400 tracking-wide hidden sm:inline">
            IRIS PUBLIC SCHOOL
          </span>
        </div>
      </div>

      {/* Right section: Search bar and Icons */}
      <div className="flex items-center space-x-4">
        
        {/* Search Input (White background) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Student Name"
            className="w-64 py-2 pl-4 pr-10 text-sm border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800 bg-white"
          />
          <Search className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
        </div>
        
        {/* Action Icons and User Dropdown Container (DropdownRef is attached here) */}
        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          <Mail className="w-6 h-6 text-white cursor-pointer hover:text-lime-400" />
          <Bell className="w-6 h-6 text-white cursor-pointer hover:text-lime-400" />
          
          {/* User Profile Icon - Toggles Dropdown */}
          <div 
            className="w-8 h-8 rounded-full bg-gray-600 border border-white flex items-center justify-center cursor-pointer hover:bg-lime-400 transition"
            onClick={toggleDropdown}
          >
             <User className="w-4 h-4 text-white" /> 
          </div>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
              
              {/* Profile Header (Using dynamic name) */}
              <div className="p-4 flex items-center space-x-3 bg-gray-50 border-b">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center border-2 border-lime-500">
                    <User className="w-6 h-6 text-gray-600" /> 
                </div>
                <div>
                  {/* Dynamic Admin Name Display */}
                  <p className="font-semibold text-gray-800 text-sm">{adminName}</p> 
                  <p className="text-xs text-gray-500">{adminRole}</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex justify-around p-3 text-sm">
                
                <a href="#" className="flex flex-col items-center p-2 text-gray-700 hover:text-lime-600 transition">
                  <UserIcon className="w-4 h-4 mb-1" /> Profile
                </a>
                
                <a href="/change-password" className="flex flex-col items-center p-2 text-gray-700 hover:text-lime-600 transition">
                  <Lock className="w-4 h-4 mb-1" /> Password
                </a>
                
                <div 
                  className="flex flex-col items-center p-2 text-gray-700 cursor-pointer hover:text-lime-600 transition"
                  onClick={handleLogout} 
                >
                  <LogOut className="w-4 h-4 mb-1" /> Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
