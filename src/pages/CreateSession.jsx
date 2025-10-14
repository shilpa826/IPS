// // import { useState } from "react";
// // import axios from "axios";
// // import BackgroundImage from "../components/BackgroundImage";
// // import LoginNavbar from '../components/LoginNavbar';
// // import LoginFooter from '../components/LoginFooter';
// // import BlueHeaderBar from '../components/BlueHeadBar';


// // export default function CreateSession({ token }) {
// //   const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("https://school-billing-app.onrender.com/session", form, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       alert("Session created!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error creating session");
// //     }
// //   };

// //   return (
// //     <BackgroundImage>
// //       <LoginNavbar />
// //       <BlueHeaderBar />
// //     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-45 mt-20">
// //       <h2 className="text-xl font-bold mb-4">Create Academic Session</h2>
// //       <input
// //         type="text"
// //         placeholder="Session Name"
// //         value={form.name}
// //         onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         className="w-full mb-3 p-2 border rounded"
// //         required
// //       />
// //       <input
// //         type="date"
// //         value={form.startDate}
// //         onChange={(e) => setForm({ ...form, startDate: e.target.value })}
// //         className="w-full mb-3 p-2 border rounded"
// //         required
// //       />
// //       <input
// //         type="date"
// //         value={form.endDate}
// //         onChange={(e) => setForm({ ...form, endDate: e.target.value })}
// //         className="w-full mb-3 p-2 border rounded"
// //         required
// //       />
// //       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
// //         Create
// //       </button>
// //     </form>
// //      <LoginFooter />
// //     </BackgroundImage>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import BackgroundImage from "../components/BackgroundImage";
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';

// const CreateSession = () => {
//   const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     setUserRole(role);
//     // Optional: Redirect non-admin users if necessary
//     if (role !== 'admin') {
//       alert('You do not have permission to create a session.');
//       navigate('/session-list'); // Redirect to session list or another appropriate page
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (userRole !== 'admin' || !token) {
//       alert('Permission denied. Please log in as an administrator.');
//       return;
//     }

//     try {
//       // Corrected API endpoint from documentation: /api/session
//       const response = await axios.post("https://school-billing-app.onrender.com/api/session", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Session created successfully:', response.data);
//       alert("Session created!");
//       // Redirect to the session list page after successful creation
//       navigate('/session-list'); 
//     } catch (err) {
//       console.error('Error creating session:', err.response || err);
//       // Check for specific error message from the backend
//       const errorMessage = err.response?.data?.message || 'Error creating session. Please try again.';
//       alert(errorMessage);
//     }
//   };

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="flex flex-col items-center justify-center h-full py-20">
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Academic Session</h2>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Session Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="e.g., 2025-26"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date</label>
//             <input
//               id="startDate"
//               type="date"
//               value={form.startDate}
//               onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">End Date</label>
//             <input
//               id="endDate"
//               type="date"
//               value={form.endDate}
//               onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Create
//           </button>
//         </form>
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };

// export default CreateSession;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BackgroundImage from "../components/BackgroundImage";
import LoginNavbar from '../components/LoginNavbar';
import LoginFooter from '../components/LoginFooter';
import BlueHeaderBar from "../components/BlueHeadBar";

const CreateSession = () => {
  const [form, setForm] = useState({ name: "", startDate: "", endDate: "" });
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    // Optional: Redirect non-admin users if necessary
    if (role !== 'admin') {
      alert('You do not have permission to create a session.');
      navigate('/session-list'); // Redirect to session list or another appropriate page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (userRole !== 'admin' || !token) {
      alert('Permission denied. Please log in as an administrator.');
      return;
    }

    try {
      const response = await axios.post("https://school-billing-app.onrender.com/api/session", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Session created successfully:', response.data);
      alert("Session created!");
      navigate('/session-list'); 
    } catch (err) {
      console.error('Error creating session:', err.response || err);
      const errorMessage = err.response?.data?.message || 'Error creating session. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />
      <div className="flex flex-col items-center justify-center h-full mb-45 mt-10">
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl max-w-6xl w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Create Academic Session</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Session Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., 2025-26"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">End Date</label>
            <input
              id="endDate"
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Create
          </button>
        </form>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default CreateSession;