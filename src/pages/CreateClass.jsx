// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';

// const CreateClass = () => {
//   const [form, setForm] = useState({ name: '', sessionId: '' });
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     setUserRole(role);
//     if (role !== 'admin') {
//       toast.error('Access denied. Only admins can create classes.');
//       navigate('/class-list');
//     }
    
//     const fetchSessions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('https://school-billing-app.onrender.com/api/session', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSessions(response.data);
//         if (response.data.length > 0) {
//           // Set the default session to the first one in the list
//           setForm((prevForm) => ({ ...prevForm, sessionId: response.data[0]._id }));
//         }
//       } catch (err) {
//         toast.error('Failed to load sessions. Please try again.');
//         console.error(err);
//       }
//     };
//     fetchSessions();
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const token = localStorage.getItem('token');

//     if (userRole !== 'admin' || !token) {
//       toast.error('Access denied. Please log in as an administrator.');
//       setLoading(false);
//       return;
//     }

//     if (!form.sessionId) {
//       toast.error('Please select an academic session.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://school-billing-app.onrender.com/api/class',
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success('Class created successfully!');
//       setForm({ name: '', sessionId: form.sessionId }); // Keep the selected session
//       console.log('Class created:', response.data);
//       navigate('/class-list');
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || 'Error creating class. Please try again.';
//       toast.error(errorMsg);
//       console.error('Axios Error:', err.response?.data || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="flex flex-col items-center justify-center min-h-screen mb-45 mt-10">
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl max-w-xl w-full">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Class</h2>
          
//           <div className="mb-4">
//             <label htmlFor="sessionId" className="block text-gray-700 font-semibold mb-2">Academic Session</label>
//             <select
//               id="sessionId"
//               name="sessionId"
//               value={form.sessionId}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select a Session</option>
//               {sessions.map((session) => (
//                 <option key={session._id} value={session._id}>
//                   {session.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Class Name</label>
//             <input
//               id="name"
//               type="text"
//               name="name"
//               placeholder="e.g., Class 1"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Class'}
//           </button>
//         </form>
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };

// export default CreateClass;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import LoginFooter from '../components/LoginFooter';
import BlueHeaderBar from '../components/BlueHeadBar';

const CreateClass = () => {
  const [form, setForm] = useState({ name: '', sessionId: '' });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    if (role !== 'admin') {
      toast.error('Access denied. Only admins can create classes.');
      navigate('/class-list');
    }
    
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://school-billing-app.onrender.com/api/session', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(response.data);
        if (response.data.length > 0) {
          setForm((prevForm) => ({ ...prevForm, sessionId: response.data[0]._id }));
        }
      } catch (err) {
        toast.error('Failed to load sessions. Please try again.');
        console.error(err);
      }
    };
    fetchSessions();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    if (userRole !== 'admin' || !token) {
      toast.error('Access denied. Please log in as an administrator.');
      setLoading(false);
      return;
    }

    if (!form.sessionId) {
      toast.error('Please select an academic session.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://school-billing-app.onrender.com/api/class',
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Class created successfully!');
      setForm({ name: '', sessionId: form.sessionId });
      console.log('Class created:', response.data);
      navigate('/class-list');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error creating class. Please try again.';
      toast.error(errorMsg);
      console.error('Axios Error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />
      {/* ✅ Container updated for wider width and less top margin */}
      <div className="flex flex-col items-center justify-center min-h-screen my-5">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl max-w-6xl w-full mb-45 mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Create New Class</h2>
          
          <div className="mb-4">
            <label htmlFor="sessionId" className="block text-gray-700 font-semibold mb-2">Academic Session</label>
            <select
              id="sessionId"
              name="sessionId"
              value={form.sessionId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a Session</option>
              {sessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Class Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g., Class 1"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Class'}
          </button>
        </form>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default CreateClass;