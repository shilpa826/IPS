import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import BlueHeaderBar from '../components/BlueHeadBar';
import LoginFooter from '../components/LoginFooter';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://school-billing-app.onrender.com/api/session', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(response.data);
      if (response.data.length > 0) {
        setSelectedSessionId(response.data[0]._id);
      }
    } catch (err) {
      setError('Failed to fetch sessions.');
      toast.error('Failed to load sessions.');
      console.error(err);
    }
  };

  const fetchClasses = async (sessionId) => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://school-billing-app.onrender.com/api/class/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(response.data);
    } catch (err) {
      setError('Failed to fetch classes.');
      toast.error('Failed to load classes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classId) => {
    if (userRole !== 'admin') {
      toast.error('Permission denied. Only admins can delete classes.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this class and its sections?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://school-billing-app.onrender.com/api/classe/${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message || 'Class deleted successfully!');
      fetchClasses(selectedSessionId);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error deleting class. Please try again.';
      toast.error(errorMsg);
      console.error(err);
    }
  };

  const handleCreateClassClick = () => {
    navigate('/create-class');
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchClasses(selectedSessionId);
    }
  }, [selectedSessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* ✅ Added the button with the plus symbol and conditional rendering */}
          <div className="bg-[#002147] text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl text-red-500 font-bold">Class List</h1>
            {userRole === 'admin' && (
              <button
                onClick={handleCreateClassClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                title="Create New Class"
              >
                +
              </button>
            )}
          </div>
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="session-select" className="block text-gray-700 font-bold mb-2">
                Select Academic Session:
              </label>
              <select
                id="session-select"
                value={selectedSessionId}
                onChange={(e) => setSelectedSessionId(e.target.value)}
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sessions.map(session => (
                  <option key={session._id} value={session._id}>
                    {session.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Class Name</th>
                    <th className="py-3 px-6 text-left">Session ID</th>
                    <th className="py-3 px-6 text-left">Created At</th>
                    {userRole === 'admin' && <th className="py-3 px-6 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {classes.length > 0 ? (
                    classes.map((cls) => (
                      <tr key={cls._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{cls.name}</td>
                        <td className="py-3 px-6 text-left">{cls.sessionId}</td>
                        <td className="py-3 px-6 text-left">{new Date(cls.createdAt).toLocaleDateString()}</td>
                        {userRole === 'admin' && (
                          <td className="py-3 px-6 text-center">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleDelete(cls._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-300"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={userRole === 'admin' ? "4" : "3"} className="py-3 px-6 text-center">No classes found for this session.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default ClassList;