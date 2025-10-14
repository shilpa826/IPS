

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';

// const CreateAccountant = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contact: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token || role !== 'admin') {
//       toast.error('Access denied. Only admins can create accountants.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://school-billing-app.onrender.com/api/users/accountant',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success('Accountant created successfully!');
//       setFormData({ name: '', email: '', password: '', contact: '' });
//       navigate('/accountant-list');
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message || 'Error creating accountant. Please try again.';
//       toast.error(errorMsg);
//       console.error('Axios Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mb-45 mt-20">
//         <h2 className="text-xl font-bold sm:text-2xl text-red-500 mb-4">
//           Enter Accountant Details
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="contact"
//             placeholder="Contact"
//             value={formData.contact}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />

//           <p className="text-left text-sm text-red-600 mt-2">
//             <Link to="/accountant-list" className="text-blue-500 hover:text-red-500">
//               See all list of Accountants
//             </Link>
//           </p>

//           <button
//             type="submit"
//             className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Accountant'}
//           </button>
//         </form>
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };

// export default CreateAccountant;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import LoginFooter from '../components/LoginFooter'
import BlueHeaderBar from '../components/BlueHeadBar';

const CreateAccountant = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      toast.error('Access denied. Only admins can create accountants.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://school-billing-app.onrender.com/api/users/accountant',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Accountant created successfully!');
      setFormData({ name: '', email: '', password: '', contact: '' });
      navigate('/accountant-list');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Error creating accountant. Please try again.';
      toast.error(errorMsg);
      console.error('Axios Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />
      {/* ✅ Container updated to be wider */}
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg mb-45 mt-10">
        <h2 className="text-xl font-bold sm:text-2xl text-red-500 mb-6 text-center">
          Enter Accountant Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <p className="text-right text-sm text-red-600 pt-2">
            <Link to="/accountant-list" className="text-blue-500 hover:text-red-500">
              See all list of Accountants
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Accountant'}
          </button>
        </form>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default CreateAccountant;