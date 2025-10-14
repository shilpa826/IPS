import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import LoginFooter from '../components/LoginFooter';
import BlueHeaderBar from '../components/BlueHeadBar';
import LoginNavbar from '../components/LoginNavbar';

const ResetPassword = () => {
const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);


   const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://school-billing-app.onrender.com/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      toast.success(res.data.message || 'Password reset successful');
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImage>
      <LoginNavbar></LoginNavbar>
    <BlueHeaderBar></BlueHeaderBar>
    <div className="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-none shadow-md w-full max-w-md sm:max-w-2xl mx-auto mb-60 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Reset Password
      </h2>
      <form className="space-y-4" onSubmit={handleReset}>
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
         
          <div>
          <label className="block text-sm font-medium text-gray-700"> Enter OTP</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700"> Enter New Password</label>
          <input
            type="password"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter New Password"
             value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
          />
        </div>
        
        <button
          type="submit" disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          {/* Create */}
            {loading ? 'Resetting...' : 'Reset Password'}

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

export default ResetPassword;