import React from 'react';
import logo from "../assets/irislogo.svg";

const LoginNavbar = () => {
  return (
    <header className="bg-pink-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Left: Logo and School Info */}
        <div className="flex items-center space-x-4">
          <img className="w-16 h-16 md:w-20 md:h-20" src={logo} alt="IRIS Logo" />
          <div className="text-blue-900">
            <h1 className="text-lg md:text-xl font-bold leading-tight text-center md:text-left">
              IRIS PUBLIC SCHOOL
            </h1>
            <hr className="border-2 my-1" />
            <p className="text-sm md:text-lg text-center md:text-left">
              Bankipur Fatuha, Patna-803201
            </p>
          </div>
        </div>

        {/* Center: Website */}
        <div className="text-blue-900 text-center md:text-right text-sm md:text-lg font-semibold">
          <a href="https://irispublicschoolfatuha.in/" className='hover:text-gray-400'>Visit Our Website: https://irispublicschoolfatuha.in/</a>
        </div>

        {/* Right: Contact */}
        <div className="text-blue-900 text-center md:text-right text-sm md:text-lg font-semibold">
          Tel: +91 9472955663
        </div>
      </div>
    </header>
  );
};

export default LoginNavbar;