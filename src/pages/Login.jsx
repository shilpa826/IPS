import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import WelcomHeader from '../components/WelcomeHeader';
import LoginFooter from '../components/LoginFooter';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://school-billing-app.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store token and role explicitly
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role?.toLowerCase()); // Normalize role

        // Optional debug logs
        console.log('Logged in as:', data.user.role);
        console.log('Token:', data.token);

        const userName = data.user.name || data.user.email;
        localStorage.setItem('adminName', userName);

        console.log('Logged in as:', userName);

        window.location.href = '/dashboard';
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImage>
      <LoginNavbar />
      <WelcomHeader />
      <div className="bg-white px-4 py-6 sm:px-8 sm:py-10 shadow-md w-full max-w-md sm:max-w-2xl mx-auto mb-45 mt-20">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-red-500">
          ---- Login Here ----
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your Email"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-center text-sm text-red-600 mt-2">
            <Link to="/forget-password" className="text-blue-500 hover:text-red-500">
              Forget Password?
            </Link>
          </p>
        </form>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default Login;
