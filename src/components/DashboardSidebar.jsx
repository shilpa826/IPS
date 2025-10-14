// DashboardSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
 FaHome, FaUserPlus, FaClipboardList, FaCalendarAlt,
FaMoneyBill, FaFileInvoiceDollar, FaListUl, FaChartBar,
 FaUsers, FaUserGraduate, FaArrowUp, FaKey
} from 'react-icons/fa';

// Menu items are defined outside the component for clarity
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
{ label: 'Fee Setup', icon: <FaMoneyBill />, path: '/fee-setup' },
 { label: 'Demand Bill', icon: <FaFileInvoiceDollar />, path: '/demand-bill' },
 { label: 'Dues List', icon: <FaListUl />, path: '/dues-list' },
 { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
{ label: 'Students', icon: <FaUsers />, path: '/students' },
 { label: 'Students List', icon: <FaUserGraduate />, path: '/students-list' },
 { label: 'Promote Students', icon: <FaArrowUp />, path: '/promote-students' },
{ label: 'Change Password', icon: <FaKey />, path: '/change-password' },
];

const DashboardSidebar = ({ isCollapsed }) => { 
 const location = useLocation();

 // Renamed for internal clarity
 const isExpanded = !isCollapsed; 
 return (
<aside 
className={`
${isExpanded ? 'w-64 p-5' : 'w-[72px] p-3'} 
bg-gray-800 text-white h-full border-r border-gray-700 
transition-all duration-300 ease-in-out flex-shrink-0 z-10
         flex flex-col
`}
>
 {/* --- REMOVED: Logo + Title Section --- */}

{/* --- Session Info (Hidden when collapsed) --- */}
{isExpanded && (
 <div className="text-sm text-gray-400 mb-4 border-b border-gray-700 pb-3 flex-shrink-0">
Current Session: <span className="text-lime-400 font-semibold">2025-26</span>
 </div>
)}

{/* --- Navigation (Scrollable Area) --- */}
 <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
 {menuItems.map((item, idx) => {
 const isActive = location.pathname === item.path;
 return (
 <Link
 key={idx}
 to={item.path}
 className={`
flex items-center py-2 rounded transition duration-200 
 ${isActive
 ? 'bg-lime-500 text-gray-900 font-semibold'
 : 'hover:bg-gray-700 hover:text-lime-400'
 }
 ${isExpanded ? 'px-3 justify-between' : 'justify-center'}
 `}
>
<div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
 <span className="text-lg flex-shrink-0">{item.icon}</span>
 
 {/* Item Label (Only visible when expanded) */}
{isExpanded && (
<span className="text-sm whitespace-nowrap">{item.label}</span>
 )}
 </div>
 
           {/* Arrow (Only visible when expanded) */}
              {isExpanded && <span className="text-gray-400 text-xs">{'>'}</span>}
            </Link>
          );
       })}
  </nav>
  </aside>
);
};

export default DashboardSidebar;




