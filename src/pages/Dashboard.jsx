// DashboardPage.jsx
import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  // State to track if the sidebar is collapsed (true) or expanded (false)
  // --- KEY CHANGE HERE: Initial state set to FALSE (Expanded) ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); 

  // Toggle function to invert the state on click
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    // 'h-screen' ensures the main app takes the full viewport height.
    <div className="h-screen bg-gray-100 flex flex-col"> 
      
      {/* 1. Navbar (Fixed at the Top) */}
      {/* NOTE: Class attribute should use curly braces in JSX: className="w-full..." */}
      <div className="w-full fixed top-0 z-30 shadow-md">
        <DashboardNavbar 
          onMenuClick={toggleSidebar}
        />
      </div>
      
      {/* 2. Main Layout Area (Sidebar and Content Side-by-Side) */}
      <div className="flex flex-1 overflow-hidden"> 
        
        {/* Sidebar Wrapper (FIXED) */}
        <div 
          className={`
            hidden lg:block border-r bg-white h-full fixed left-0 z-20 
            top-16 bottom-0 
            transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? 'w-[72px]' : 'w-64'} 
          `}
        >
           <DashboardSidebar isCollapsed={isSidebarCollapsed} />
        </div>

        {/* Content Area (SCROLLABLE) */}
        <div 
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out mt-15
            ${isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}
          `}
        >
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;


