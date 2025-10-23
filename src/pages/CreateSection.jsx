import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BackgroundImage from '../components/BackgroundImage';
import LoginNavbar from '../components/LoginNavbar';
import LoginFooter from '../components/LoginFooter';
import BlueHeaderBar from '../components/BlueHeadBar';

const CreateSection = () => {
  const [form, setForm] = useState({ name: '', classId: '', sessionId: '' });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch all classes and sessions to populate the dropdown
  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    if (role !== 'admin') {
      toast.error('Access denied. Only admins can create sections.');
      navigate('/section-list');
      return;
    }
    
    const fetchClassesAndSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // 1. Fetch Sessions
        const sessionResponse = await axios.get('https://school-billing-app.onrender.com/api/session', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const firstSessionId = sessionResponse.data[0]?._id;
        if (!firstSessionId) {
            toast.error('No academic sessions found.');
            setDataLoading(false);
            return;
        }
        
        // 2. Fetch Classes based on the first session (or adapt if you have a /api/class/all)
        const classResponse = await axios.get(`https://school-billing-app.onrender.com/api/class/session/${firstSessionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setClasses(classResponse.data);
        if (classResponse.data.length > 0) {
          // Set default values for the form
          setForm({ 
            name: '', 
            classId: classResponse.data[0]._id,
            sessionId: firstSessionId // Include sessionId in the form state
          });
        }
      } catch (err) {
        toast.error('Failed to load classes/sessions. Cannot create section.');
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchClassesAndSessions();
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

    if (!form.classId) {
      toast.error('Please select a class.');
      setLoading(false);
      return;
    }

    try {
      // API call to create the section
      const response = await axios.post(
        'https://school-billing-app.onrender.com/api/section',
        { name: form.name, classId: form.classId, sessionId: form.sessionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Section ${response.data.name} created successfully!`);
      // Optionally reset form or navigate back
      setForm((prevForm) => ({ ...prevForm, name: '' })); 
      navigate('/section-list');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error creating section. Please try again.';
      toast.error(errorMsg);
      console.error('Axios Error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If the classId changes, also update the sessionId if you need it in the form
    if (name === 'classId') {
      const selectedClass = classes.find(cls => cls._id === value);
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
        sessionId: selectedClass ? selectedClass.sessionId : prevForm.sessionId
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  if (dataLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading initial data...</div>
      </div>
    );
  }

  return (
    <BackgroundImage>
      <LoginNavbar />
      <BlueHeaderBar />
      <div className="flex flex-col items-center justify-center min-h-screen py-5">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full mb-45 mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Create New Section</h2>
          
          <div className="mb-4">
            <label htmlFor="classId" className="block text-gray-700 font-semibold mb-2">Select Class</label>
            <select
              id="classId"
              name="classId"
              value={form.classId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={classes.length === 0}
            >
              <option value="">Select a Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
            {classes.length === 0 && <p className="text-red-500 text-sm mt-1">Please create a class first.</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Section Name (e.g., A, B, Primary)</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g., A"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
            disabled={loading || classes.length === 0}
          >
            {loading ? 'Creating...' : 'Create Section'}
          </button>
        </form>
      </div>
      <LoginFooter />
    </BackgroundImage>
  );
};

export default CreateSection;