import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import BlueHeadBar from '../components/BlueHeadBar';
import LoginFooter from '../components/LoginFooter';
const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://school-billing-app.onrender.com/api/auth/forgot-password', { email });
      toast.success('OTP sent to your email');
      localStorage.setItem('resetEmail', email);
      window.location.href = '/reset-password';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (
    <BackgroundImage>
      <LoginNavbar></LoginNavbar>
    <BlueHeadBar></BlueHeadBar>
    <div className="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-none shadow-md w-full max-w-md sm:max-w-2xl mx-auto mb-60 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Forget Password?
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="block text-sm font-medium text-gray-700"> Enter Email Address</label>
          <input
            type="email"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Send OTP
        </button>
      </form>
  <p className="mt-3 text-lg text-center text-red-500">
  Back to? <Link to="/" className="text-indigo-500 hover:text-red-500">Log in</Link>
  </p>
    </div>
    <LoginFooter></LoginFooter>
    </BackgroundImage>

  );
};

export default ForgetPassword;