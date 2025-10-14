import React, { useState, useEffect } from 'react';
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

  // --- 1. Fetch all available classes ---
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      // Assuming you have an endpoint to fetch all classes (e.g., /api/class/all or similar)
      // For simplicity, we'll try to use the session endpoint and grab a session first,
      // then fetch classes based on that session (similar to ClassList logic).
      // A dedicated /api/class endpoint would be better here, but we'll adapt.
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
        // Automatically select the first class found
        setSelectedClassId(classResponse.data[0]._id);
      }
    } catch (err) {
      setError('Failed to fetch classes/sessions.');
      toast.error('Failed to load classes.');
      console.error(err);
    }
  };

  // --- 2. Fetch sections based on selected Class ID ---
  const fetchSections = async (classId) => {
    if (!classId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // The required endpoint: GET /api/section/class/:classId
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
  };

  // Run on mount to fetch initial data
  useEffect(() => {
    fetchClasses();
  }, []);

  // Re-run whenever selectedClassId changes
  useEffect(() => {
    if (selectedClassId) {
      fetchSections(selectedClassId);
    }
  }, [selectedClassId]);

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
          <div className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">Section List</h1>
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
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {sections.length > 0 ? (
                    sections.map((section) => (
                      <tr key={section._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{section.name}</td>
                        <td className="py-3 px-6 text-left">{section.classId}</td>
                        <td className="py-3 px-6 text-left">{new Date(section.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-3 px-6 text-center">No sections found for this class.</td>
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