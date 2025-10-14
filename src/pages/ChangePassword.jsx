import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import LoginFooter from '../components/LoginFooter';
import BlueHeaderBar from '../components/BlueHeadBar';
import LoginNavbar from '../components/LoginNavbar';
const ChangePassword = () => {

   const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


const handleChange = async (e) => {
    e.preventDefault();

     if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await axios.post('https://school-billing-app.onrender.com/api/auth/change-password', {
        oldPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
     <BackgroundImage>
     <LoginNavbar></LoginNavbar>
     <BlueHeaderBar></BlueHeaderBar>

      <div className="bg-white px-4 py-6 sm:px-8 sm:py-10 rounded-none shadow-md w-full max-w-md sm:max-w-2xl mx-auto mb-60 mt-20">
       <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Change Password?
       </h2>
        <form className="space-y-4" onSubmit={handleChange}>

        <div>
          {/* <label className="block text-sm font-medium text-gray-700"> Enter Email Address</label> */}
          <input
            type="password"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Old Password"
             value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
          />

           <input
            type="password"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="New Password"
             value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
          />

              <input
        type="password"
         className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

        </div>
  
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Update Password
        </button>
      </form>

  {/* <p className="mt-3 text-lg text-center text-red-500">
  Back to? <Link to="/" className="text-indigo-500 hover:text-red-500">Log in</Link>
  </p> */}
    </div>
    <LoginFooter></LoginFooter>
    </BackgroundImage>

  );
};

export default ChangePassword;