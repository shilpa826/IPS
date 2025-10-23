import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import BlueHeaderBar from '../components/BlueHeadBar';
import LoginFooter from '../components/LoginFooter';

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // --- 1. Fetch all available classes ---
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionResponse = await axios.get('https://school-billing-app.onrender.com/api/session', {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      const firstSessionId = sessionResponse.data[0]?._id;
      if (!firstSessionId) {
          setError('No sessions found.');
          setLoading(false);
          return;
      }

      const classResponse = await axios.get(`https://school-billing-app.onrender.com/api/class/session/${firstSessionId}`, {
          headers: { Authorization: `Bearer ${token}` }
      });

      setClasses(classResponse.data);
      if (classResponse.data.length > 0) {
        setSelectedClassId(classResponse.data[0]._id);
      }
    } catch (err) {
      setError('Failed to fetch classes/sessions.');
      toast.error('Failed to load classes.');
      console.error(err);
    }
  };

  // --- 2. Fetch sections based on selected Class ID (Memoized) ---
  const fetchSections = useCallback(async (classId) => {
    if (!classId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://school-billing-app.onrender.com/api/section/class/${classId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSections(response.data);
    } catch (err) {
      setError('Failed to fetch sections.');
      toast.error('Failed to load sections.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); // Added useCallback for better performance, although not strictly necessary here.

  // --- 3. Delete Section Handler ---
  const handleDeleteSection = async (sectionId, sectionName) => {
    if (!window.confirm(`Are you sure you want to delete section "${sectionName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (userRole !== 'admin') {
        toast.error('Unauthorized: Only admins can delete sections.');
        return;
      }

      setLoading(true);
      
      // The required endpoint: DELETE /api/section/:id
      await axios.delete(`https://school-billing-app.onrender.com/api/section/${sectionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(`Section "${sectionName}" deleted successfully!`);
      
      // Refresh the section list after successful deletion
      fetchSections(selectedClassId); 

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error deleting section. Please ensure it has no associated students/data.';
      toast.error(errorMsg);
      console.error('Axios Error:', err.response?.data || err);
      setLoading(false); // Stop loading even on failure
    }
  };


  // --- 4. Navigation handler for Create Section ---
  const handleCreateSectionClick = () => {
    navigate('/create-section');
  };


  // Run on mount to fetch initial data and user role
  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    fetchClasses();
  }, []);

  // Re-run whenever selectedClassId changes
  useEffect(() => {
    if (selectedClassId) {
      fetchSections(selectedClassId);
    }
  }, [selectedClassId, fetchSections]); // Added fetchSections to dependencies

  if (loading && !selectedClassId) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading initial data...</div>
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
          
          {/* Header with Add Button */}
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Section List</h1>
            {userRole === 'admin' && (
              <button
                onClick={handleCreateSectionClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                title="Create New Section"
              >
                +
              </button>
            )}
          </div>
          
          <div className="p-6">
            
            {/* Class Selection Dropdown */}
            <div className="mb-6">
              <label htmlFor="class-select" className="block text-gray-700 font-bold mb-2">
                Select Class:
              </label>
              <select
                id="class-select"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classes.length > 0 ? (
                    classes.map(cls => (
                        <option key={cls._id} value={cls._id}>
                            {cls.name}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No classes available</option>
                )}
              </select>
            </div>

            {/* Sections Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Section Name</th>
                    <th className="py-3 px-6 text-left">Class ID</th>
                    <th className="py-3 px-6 text-left">Created At</th>
                    {userRole === 'admin' && <th className="py-3 px-6 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {sections.length > 0 ? (
                    sections.map((section) => (
                      <tr key={section._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{section.name}</td>
                        <td className="py-3 px-6 text-left">{section.classId}</td>
                        <td className="py-3 px-6 text-left">{new Date(section.createdAt).toLocaleDateString()}</td>
                        {userRole === 'admin' && (
                          <td className="py-3 px-6 text-center">
                            <button
                              onClick={() => handleDeleteSection(section._id, section.name)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs transition duration-200"
                              disabled={loading}
                              title="Delete Section"
                            >
                              {loading ? '...' : 'Delete'}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={userRole === 'admin' ? 4 : 3} className="py-3 px-6 text-center">No sections found for this class.</td>
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

export default SectionList;