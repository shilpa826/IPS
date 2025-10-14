import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#002147] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-gray-400 text-sm">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400 text-sm">Terms of Service</a>
          <a href="https://irispublicschoolfatuha.in/contact" className="hover:text-gray-400 text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;