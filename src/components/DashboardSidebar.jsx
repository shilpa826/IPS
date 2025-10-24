// // DashboardSidebar.jsx
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//  FaHome, FaUserPlus, FaClipboardList, FaCalendarAlt,
// FaMoneyBill, FaFileInvoiceDollar, FaListUl, FaChartBar,
//  FaUsers, FaUserGraduate, FaArrowUp, FaKey
// } from 'react-icons/fa';

// // Menu items are defined outside the component for clarity
// const menuItems = [
//  { label: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
//  { label: 'Create Accountant', icon: <FaUserPlus />, path: '/create-accountant' },
//  { label: 'Class', icon: <FaClipboardList />, path: '/class-list' },
//  { label: 'Session', icon: <FaCalendarAlt />, path: '/session-list' },
//  { label: 'Section', icon: <FaCalendarAlt />, path: '/section-list' },
//  { label: 'Fee Setup', icon: <FaMoneyBill />, path: '/fee-setup' },
//  { label: 'Demand Bill', icon: <FaFileInvoiceDollar />, path: '/demand-bill' },
//  { label: 'Dues List', icon: <FaListUl />, path: '/dues-list' },
//  { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
// { label: 'Students', icon: <FaUsers />, path: '/students' },
//  { label: 'Students List', icon: <FaUserGraduate />, path: '/students-list' },
//  { label: 'Promote Students', icon: <FaArrowUp />, path: '/promote-students' },
// { label: 'Change Password', icon: <FaKey />, path: '/change-password' },
// { label: 'Fee Setup', icon: <FaMoneyBill />, path: '/fee-setup' },
//  { label: 'Demand Bill', icon: <FaFileInvoiceDollar />, path: '/demand-bill' },
//  { label: 'Dues List', icon: <FaListUl />, path: '/dues-list' },
//  { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
// { label: 'Students', icon: <FaUsers />, path: '/students' },
//  { label: 'Students List', icon: <FaUserGraduate />, path: '/students-list' },
//  { label: 'Promote Students', icon: <FaArrowUp />, path: '/promote-students' },
// { label: 'Change Password', icon: <FaKey />, path: '/change-password' },
// ];

// const DashboardSidebar = ({ isCollapsed }) => { 
//  const location = useLocation();

//  // Renamed for internal clarity
//  const isExpanded = !isCollapsed; 
//  return (
// <aside 
// className={`
// ${isExpanded ? 'w-64 p-5' : 'w-[72px] p-3'} 
// bg-gray-800 text-white h-full border-r border-gray-700 
// transition-all duration-300 ease-in-out flex-shrink-0 z-10
//          flex flex-col
// `}
// >
//  {/* --- REMOVED: Logo + Title Section --- */}

// {/* --- Session Info (Hidden when collapsed) --- */}
// {isExpanded && (
//  <div className="text-sm text-gray-400 mb-4 border-b border-gray-700 pb-3 flex-shrink-0">
// Current Session: <span className="text-lime-400 font-semibold">2025-26</span>
//  </div>
// )}

// {/* --- Navigation (Scrollable Area) --- */}
//  <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
//  {menuItems.map((item, idx) => {
//  const isActive = location.pathname === item.path;
//  return (
//  <Link
//  key={idx}
//  to={item.path}
//  className={`
// flex items-center py-2 rounded transition duration-200 
//  ${isActive
//  ? 'bg-lime-500 text-gray-900 font-semibold'
//  : 'hover:bg-gray-700 hover:text-lime-400'
//  }
//  ${isExpanded ? 'px-3 justify-between' : 'justify-center'}
//  `}
// >
// <div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
//  <span className="text-lg flex-shrink-0">{item.icon}</span>
 
//  {/* Item Label (Only visible when expanded) */}
// {isExpanded && (
// <span className="text-sm whitespace-nowrap">{item.label}</span>
//  )}
//  </div>
 
//            {/* Arrow (Only visible when expanded) */}
//               {isExpanded && <span className="text-gray-400 text-xs">{'>'}</span>}
//             </Link>
//           );
//        })}
//   </nav>
//   </aside>
// );
// };

// export default DashboardSidebar;


// DashboardSidebar.jsx
import React, { useState } from 'react'; // <-- useState is necessary for dropdown
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaUserPlus, FaClipboardList, FaCalendarAlt,
  FaMoneyBill, FaFileInvoiceDollar, FaListUl, FaChartBar,
  FaUsers, FaUserGraduate, FaArrowUp, FaKey, FaEdit,
  FaChevronDown, FaCheck // <-- Icons needed for the dropdown UI
} from 'react-icons/fa';

// Define available sessions and the initial state
const availableSessions = [
  '2025-26 (Current)',
  '2024-25',
  '2023-24',
  '2022-23',
];
const initialSession = availableSessions[0];

// Menu items (cleaned for display purposes)
const menuItems = [
  { label: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
  { label: 'Create Accountant', icon: <FaUserPlus />, path: '/create-accountant' },
  { label: 'Class', icon: <FaClipboardList />, path: '/class-list' },
  { label: 'Session', icon: <FaCalendarAlt />, path: '/session-list' },
  { label: 'Section', icon: <FaCalendarAlt />, path: '/section-list' },
  { label: 'Fee Setup', icon: <FaMoneyBill />, path: '/fee-setup' },
  { label: 'Demand Bill', icon: <FaFileInvoiceDollar />, path: '/demand-bill' },
  { label: 'Dues List', icon: <FaListUl />, path: '/dues-list' },
  { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
  { label: 'Students', icon: <FaUsers />, path: '/students' },
  { label: 'Students List', icon: <FaUserGraduate />, path: '/students-list' },
  { label: 'Promote Students', icon: <FaArrowUp />, path: '/promote-students' },
  { label: 'Change Password', icon: <FaKey />, path: '/change-password' },
  { label: 'Extra 1', icon: <FaMoneyBill />, path: '/extra-1' },
  { label: 'Extra 2', icon: <FaFileInvoiceDollar />, path: '/extra-2' },
  { label: 'Extra 3', icon: <FaListUl />, path: '/extra-3' },
];

const DashboardSidebar = ({ isCollapsed }) => { 
  const location = useLocation();
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(initialSession); // Tracks the currently selected session

  const isExpanded = !isCollapsed; 
  
  // Define colors
  const baseTextColor = 'text-gray-700';
  const hoverBgColor = 'hover:bg-gray-100';
  const activeBgColor = 'bg-lime-500'; 
  const activeTextColor = 'text-white'; 

  // Function to handle session selection
  const handleSessionChange = (session) => {
    setActiveSession(session);
    setIsSessionDropdownOpen(false); // Close dropdown after selection
    // API call or global state update would go here
  };

  return (
    <aside 
      className={`
        ${isExpanded ? 'w-64 p-5' : 'w-[72px] p-3'} 
        bg-white text-gray-800 h-full border-r border-gray-200 
        transition-all duration-300 ease-in-out flex-shrink-0 z-10
        flex flex-col
      `}
    >
      {/* 1. Current Session Dropdown (Prominent Block) */}
      {isExpanded && (
        <div className="mb-4 flex-shrink-0 relative"> {/* Added relative for the dropdown position */}
          <div
            onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)} // Toggle dropdown on click
            className={`
              flex items-center justify-between p-2 -mx-2 rounded-md 
              text-sm font-medium cursor-pointer
              bg-lime-500 text-white hover:bg-lime-600 transition duration-200
            `}
          >
            <div className="flex items-center gap-1">
              <span className="text-white">Current Session:</span>
              <span className="font-bold text-white">{activeSession.replace(' (Current)', '')}</span>
            </div>
            
            {/* Dropdown Indicator Icon */}
            <FaChevronDown 
              size={12} 
              className={`text-white transition-transform ${isSessionDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
            />
          </div>

          {/* Dropdown Options List */}
          {isSessionDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {availableSessions.map((session, index) => (
                <div
                  key={index}
                  onClick={() => handleSessionChange(session)}
                  className={`
                    flex items-center justify-between p-2 text-sm cursor-pointer 
                    ${session === activeSession 
                      ? 'bg-lime-100 text-lime-700 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {session}
                  {session === activeSession && <FaCheck size={12} className="text-lime-500" />}
                </div>
              ))}
              {/* Link for full management */}
              <Link to="/session-edit" onClick={() => setIsSessionDropdownOpen(false)} 
                    className="block p-2 text-xs text-center text-gray-500 border-t hover:bg-gray-50">
                    Manage Sessions...
              </Link>
            </div>
          )}

          {/* Divider */}
          <hr className="border-gray-100 mb-4 flex-shrink-0" /> 
        </div>
      )}

      {/* 2. Navigation (Scrollable Area) */}
      <nav 
        className="flex flex-col gap-1 flex-grow overflow-y-auto"
      >
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          
          // Menu Item Link Styling
          const linkClasses = `
            flex items-center py-2 rounded transition duration-200 
            ${isActive
              ? 'bg-lime-500 text-white font-semibold shadow-inner'
              : `${baseTextColor} ${hoverBgColor} hover:text-lime-500`
            }
            ${isExpanded ? 'px-3 justify-between' : 'justify-center'}
          `;
          const iconColor = isActive ? activeTextColor : 'text-gray-500';

          return (
            <Link
              key={idx}
              to={item.path}
              className={linkClasses}
            >
              <div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
                <span className={`text-lg flex-shrink-0 ${iconColor}`}>{item.icon}</span>
                {isExpanded && (
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                )}
              </div>
              {isExpanded && <span className="text-gray-400 text-xs">{'>'}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;