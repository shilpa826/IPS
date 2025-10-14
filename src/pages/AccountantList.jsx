// import React, { useEffect, useState } from 'react';
// // import axios, { Axios } from 'axios';
// import axios from 'axios';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';
// import { toast } from 'react-toastify';

// const AccountantList = () => {
//   const [accountants, setAccountants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccountants = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('No token found. Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           'https://school-billing-app.onrender.com/api/users/accountants',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = Array.isArray(response.data.accountants)
//           ? response.data.accountants
//           : [];

//         setAccountants(data);
//       } catch (error) {
//         console.error('Error fetching accountants:', error);
//         toast.error('Failed to load accountants.');
//         setAccountants([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountants();
//   }, []);

//   const toggleStatus = async (id, currentStatus) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('No token found. Please log in.');
//       return;
//     }

//     try {
//       await axios.patch(
//         `https://school-billing-app.onrender.com/api/users/${id}/status`,
//         { isActive: !currentStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(`Accountant ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
//       setAccountants((prev) =>
//         prev.map((acc) =>
//           acc._id === id ? { ...acc, isActive: !currentStatus } : acc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//       toast.error('Failed to update status.');
//     }
//   };

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="p-6 mb-100">
//         <h2 className="text-2xl font-bold mb-4">Accountant List</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : accountants.length === 0 ? (
//           <p>No accountants found.</p>
//         ) : (
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Name</th>
//                 <th className="border px-4 py-2">Email</th>
//                 <th className="border px-4 py-2">Contact</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {accountants.map((acc) => (
//                 <tr key={acc._id}>
//                   <td className="border px-4 py-2">{acc.name}</td>
//                   <td className="border px-4 py-2">{acc.email}</td>
//                   <td className="border px-4 py-2">{acc.contact}</td>
//                   <td className="border px-4 py-2">
//                     {acc.isActive ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => toggleStatus(acc._id, acc.isActive)}
//                       className={`px-3 py-1 rounded ${
//                         acc.isActive ? 'bg-red-500' : 'bg-green-500'
//                       } text-white`}
//                     >
//                       {acc.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//          )} 
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };
// export default AccountantList;



// import React, { useEffect, useState } from 'react';
// // import axios, { Axios } from 'axios';
// import axios from 'axios';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';
// import { toast } from 'react-toastify';

// const AccountantList = () => {
//   const [accountants, setAccountants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAccountants = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('No token found. Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           'https://school-billing-app.onrender.com/api/users/accountants',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = Array.isArray(response.data.accountants)
//           ? response.data.accountants
//           : [];

//         setAccountants(data);
//       } catch (error) {
//         console.error('Error fetching accountants:', error);
//         toast.error('Failed to load accountants.');
//         setAccountants([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAccountants();
//   }, []);

//   const toggleStatus = async (id, currentStatus) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error('No token found. Please log in.');
//       return;
//     }

//     try {
//       await axios.patch(
//         `https://school-billing-app.onrender.com/api/users/${id}/status`,
//         { isActive: !currentStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(`Accountant ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
//       setAccountants((prev) =>
//         prev.map((acc) =>
//           acc._id === id ? { ...acc, isActive: !currentStatus } : acc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//       toast.error('Failed to update status.');
//     }
//   };

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="p-6 mb-100">
//         <h2 className="text-2xl font-bold mb-4">Accountant List</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : accountants.length === 0 ? (
//           <p>No accountants found.</p>
//         ) : (
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Name</th>
//                 <th className="border px-4 py-2">Email</th>
//                 <th className="border px-4 py-2">Contact</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {accountants.map((acc) => (
//                 <tr key={acc._id}>
//                   <td className="border px-4 py-2">{acc.name}</td>
//                   <td className="border px-4 py-2">{acc.email}</td>
//                   <td className="border px-4 py-2">{acc.contact}</td>
//                   <td className="border px-4 py-2">
//                     {acc.isActive ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => toggleStatus(acc._id, acc.isActive)}
//                       className={`px-3 py-1 rounded ${
//                         acc.isActive ? 'bg-red-500' : 'bg-green-500'
//                       } text-white`}
//                     >
//                       {acc.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//          )} 
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };
// export default AccountantList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import LoginFooter from '../components/LoginFooter';
// import BlueHeaderBar from '../components/BlueHeadBar';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AccountantList = () => {
//   const [accountants, setAccountants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     const token = localStorage.getItem('token');

//     if (role === 'admin' && token) {
//       setIsAdmin(true);
//       fetchAccountants(token);
//     } else {
//       toast.error('Access denied. Only admins can view this page.');
//       navigate('/unauthorized');
//     }
//   }, [navigate]);

//   const fetchAccountants = async (token) => {
//     try {
//       const response = await axios.get(
//         'https://school-billing-app.onrender.com/api/users/accountants',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = Array.isArray(response.data.accountants)
//         ? response.data.accountants
//         : [];

//       setAccountants(data);
//     } catch (error) {
//       console.error('Error fetching accountants:', error.response?.data || error.message);
//       toast.error('Failed to load accountants.');
//       setAccountants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token || role !== 'admin') {
//       toast.error('Unauthorized. Only admins can perform this action.');
//       return;
//     }

//     try {
//       const response = await axios.patch(
//         `https://school-billing-app.onrender.com/api/users/${id}/status`,
//         { isActive: !currentStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(response.data.message || 'Status updated successfully');
//       setAccountants((prev) =>
//         prev.map((acc) =>
//           acc._id === id ? { ...acc, isActive: !currentStatus } : acc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error.response?.data || error.message);
//       toast.error(error.response?.data?.message || 'Failed to update status.');
//     }
//   };

//   if (!isAdmin) return null;

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//       <div className="p-6 mb-100">
//         <h2 className="text-2xl font-bold mb-4">Accountant List</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : accountants.length === 0 ? (
//           <p>No accountants found.</p>
//         ) : (
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border px-4 py-2">Name</th>
//                 <th className="border px-4 py-2">Email</th>
//                 <th className="border px-4 py-2">Contact</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {accountants.map((acc) => (
//                 <tr key={acc._id}>
//                   <td className="border px-4 py-2">{acc.name}</td>
//                   <td className="border px-4 py-2">{acc.email}</td>
//                   <td className="border px-4 py-2">{acc.contact}</td>
//                   <td className="border px-4 py-2">
//                     {acc.isActive ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="border px-4 py-2">
//                     <button
//                       onClick={() => toggleStatus(acc._id, acc.isActive)}
//                       className={`px-3 py-1 rounded ${
//                         acc.isActive ? 'bg-red-500' : 'bg-green-500'
//                       } text-white`}
//                     >
//                       {acc.isActive ? 'Deactivate' : 'Activate'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <LoginFooter />
//     </BackgroundImage>
//   );
// };
// export default AccountantList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import BackgroundImage from '../components/BackgroundImage';
// import LoginNavbar from '../components/LoginNavbar';
// import BlueHeaderBar from '../components/BlueHeadBar';
// import LoginFooter from '../components/LoginFooter';
// // Removed useNavigate as it requires a Router context

// const API_BASE_URL = 'https://school-billing-app.onrender.com/api/users';

// const AccountantList = () => {
//   const [accountants, setAccountants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   // Removed useNavigate() hook

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     const token = localStorage.getItem('token');

//     if (role === 'admin' && token) {
//       setIsAdmin(true);
//       fetchAccountants(token);
//     } else {
//       // Replaced navigate('/unauthorized') with a message and setting isAdmin to false
//       setIsAdmin(false);
//     }
//   }, []); // Empty dependency array to run once on mount

//   const fetchAccountants = async (token) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/accountants`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = Array.isArray(response.data.accountants)
//         ? response.data.accountants
//         : [];

//       setAccountants(data);
//     } catch (error) {
//       console.error('Error fetching accountants:', error.response?.data || error.message);
//       toast.error('Failed to load accountants. Please check your network connection and try again.');
//       setAccountants([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token || role !== 'admin') {
//       toast.error('Unauthorized. Only admins can perform this action.');
//       return;
//     }

//     try {
//       const newStatus = !currentStatus;
//       // This is the correct PATCH request for a RESTful API.
//       // The 404 error is a backend issue. The backend server must have a
//       // route defined for PATCH /api/users/:id/status
//       const response = await axios.patch(
//         `${API_BASE_URL}/${id}/status`,
//         { isActive: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(response.data.message || 'Status updated successfully');
//       setAccountants((prev) =>
//         prev.map((acc) =>
//           acc._id === id ? { ...acc, isActive: newStatus } : acc
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || 'Failed to update status. Please ensure the backend PATCH route is correct.';
//       toast.error(errorMessage);
//     }
//   };

//   // Conditionally render based on isAdmin state
//   if (!isAdmin) {
//     return (
//       <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-700">You must be an admin to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <BackgroundImage>
//       <LoginNavbar />
//       <BlueHeaderBar />
//     <div className="bg-gray-100 min-h-screen font-sans">
//       {/* <div className="bg-blue-800 text-white p-4 text-center">
//         <h1 className="text-xl font-bold">School Billing App</h1>
//       </div> */}
      
//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Accountant List</h2>
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : accountants.length === 0 ? (
//           <p className="text-center text-gray-500">No accountants found.</p>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//             <table className="min-w-full table-auto border-collapse">
//               <thead>
//                 <tr className="bg-[#002147] text-white">
//                   <th className="px-4 py-3 text-left">Name</th>
//                   <th className="px-4 py-3 text-left">Email</th>
//                   <th className="px-4 py-3 text-left">Contact</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                   <th className="px-4 py-3 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {accountants.map((acc, index) => (
//                   <tr key={acc._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                     <td className="border-t border-gray-200 px-4 py-3">{acc.name}</td>
//                     <td className="border-t border-gray-200 px-4 py-3">{acc.email}</td>
//                     <td className="border-t border-gray-200 px-4 py-3">{acc.contact}</td>
//                     <td className="border-t border-gray-200 px-4 py-3">
//                       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${acc.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                         {acc.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="border-t border-gray-200 px-4 py-3">
//                       <button
//                         onClick={() => toggleStatus(acc._id, acc.isActive)}
//                         className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                           acc.isActive ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
//                         }`}
//                       >
//                         {acc.isActive ? 'Deactivate' : 'Activate'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
      
//       {/* <div className="bg-blue-800 text-white p-4 text-center mt-8">
//         <p>&copy; {new Date().getFullYear()} School Billing App. All rights reserved.</p>
//       </div> */}
//     </div>
//     <LoginFooter />
//     </BackgroundImage>
//   );
// };

// export default AccountantList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import BlueHeaderBar from '../components/BlueHeadBar';
import LoginFooter from '../components/LoginFooter';

const API_BASE_URL = 'https://school-billing-app.onrender.com/api/users';

const AccountantList = () => {
  const [accountants, setAccountants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role')?.toLowerCase();
    const token = localStorage.getItem('token');

    if (role === 'admin' && token) {
      setIsAdmin(true);
      fetchAccountants(token);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const fetchAccountants = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accountants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data.accountants)
        ? response.data.accountants
        : [];

      setAccountants(data);
    } catch (error) {
      console.error('Error fetching accountants:', error.response?.data || error.message);
      toast.error('Failed to load accountants. Please check your network connection and try again.');
      setAccountants([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.toLowerCase();

    if (!token || role !== 'admin') {
      toast.error('Unauthorized. Only admins can perform this action.');
      return;
    }

    try {
      const newStatus = !currentStatus;
      const response = await axios.patch(
        `${API_BASE_URL}/${id}/status`,
        { isActive: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Status updated successfully');
      setAccountants((prev) =>
        prev.map((acc) =>
          acc._id === id ? { ...acc, isActive: newStatus } : acc
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        'Failed to update status. Please ensure the backend PATCH route is correct.';
      toast.error(errorMessage);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Accountant List</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : accountants.length === 0 ? (
            <p className="text-center text-gray-500">No accountants found.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#002147] text-white">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accountants.map((acc, index) => (
                    <tr key={acc._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="border-t border-gray-200 px-4 py-3">{acc.name}</td>
                      <td className="border-t border-gray-200 px-4 py-3">{acc.email}</td>
                      <td className="border-t border-gray-200 px-4 py-3">{acc.contact}</td>
                      <td className="border-t border-gray-200 px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            acc.isActive
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {acc.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="border-t border-gray-200 px-4 py-3">
                        <button
                          onClick={() => toggleStatus(acc._id, acc.isActive)}
                          className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            acc.isActive
                              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                              : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                          }`}
                        >
                          {acc.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default AccountantList;

