// DashboardContent.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';

// Reusable Stat Card
const StatCard = ({ title, amount, bgColor, textColor }) => (
  <div className={`p-5 rounded-lg shadow-md flex items-center justify-between ${bgColor} text-white`}>
    <div>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <h2 className={`text-3xl font-bold ${textColor}`}>{amount}</h2>
    </div>
    <div className="text-4xl font-bold">₹</div>
  </div>
);

// Detail Panel for Students/Attendance
const DetailPanel = ({ title, mainText, subText, bgColor }) => (
  <div className={`p-5 mb-4 rounded-lg shadow-md ${bgColor} text-gray-900`}>
    <h3 className="text-lg font-semibold border-b pb-2 mb-3 border-gray-800/20">{title}</h3>
    <div className="flex flex-col">
      <p className="text-4xl font-bold">{mainText}</p>
      {subText && <p className="text-sm mt-2">{subText}</p>}
    </div>
  </div>
);

// Chart Placeholder
const CollectionExpenseChart = () => (
  <div className="h-[350px] w-full bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Collection & Expenses for October 2025</h3>
    
    {/* Chart Simulation Area */}
    <div className="flex h-[250px] relative">
      {/* Y-Axis Simulation */}
      <div className="w-10 text-right text-xs text-gray-500 flex flex-col justify-between py-1">
        <span>2000</span><span>1750</span><span>1500</span><span>1250</span><span>1000</span><span>750</span><span>500</span><span>250</span><span>0</span>
      </div>
      
      {/* Chart Plot Area */}
      <div className="flex-grow border-l border-b border-gray-300 relative">
        {/* Single Green Bar from the image */}
        <div className="absolute bottom-0 left-[2.5%] w-[1.5%] h-[50%] bg-green-500 rounded-t-sm" title="Day 02: 1000"></div>

        {/* X-Axis Dates */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-1">
          {Array.from({ length: 31 }).map((_, i) => (
            <span key={i} className="text-[10px] text-gray-500">{i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);


const DashboardContent = () => {
  const stats = [
    { title: '11 Dues Amount', amount: '2550', bgColor: 'bg-pink-600', textColor: 'text-white' },
    { title: 'Total Income This Year', amount: '1460', bgColor: 'bg-blue-600', textColor: 'text-white' },
    { title: 'Income This Month', amount: '1060', bgColor: 'bg-green-600', textColor: 'text-white' },
    { title: 'Income Today', amount: '0', bgColor: 'bg-pink-700', textColor: 'text-white' },
    { title: 'Profit This Month', amount: '1060', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { title: 'Total Expense This Session', amount: '23520', bgColor: 'bg-orange-600', textColor: 'text-white' },
    { title: 'Expense This Month', amount: '0', bgColor: 'bg-pink-700', textColor: 'text-white' },
    { title: 'Expense Today', amount: '0', bgColor: 'bg-pink-700', textColor: 'text-white' },
  ];

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      {/* Top Row of Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content: Graph and Side Panels */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Side: Collection & Expenses Chart */}
        <div className="lg:w-3/4">
          <CollectionExpenseChart />
        </div>

        {/* Right Side: Student and Staff Panels */}
        <div className="lg:w-1/4 min-w-[250px]">
          {/* Total Students Panel */}
          <DetailPanel 
            title="TOTAL STUDENTS" 
            mainText="27" 
            subText="Boys: 24 | Girls: 3" 
            bgColor="bg-yellow-400"
          />

          {/* Present Students Panel */}
          <DetailPanel 
            title="PRESENT STUDENTS TODAY" 
            mainText="0/27" 
            subText="ATTENDANCE PERCENTAGE: 0.00%" 
            bgColor="bg-yellow-500"
          />
          
          {/* Staff Panel */}
          <DetailPanel 
            title="STAFF" 
            mainText="-" 
            subText="" 
            bgColor="bg-orange-400"
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;