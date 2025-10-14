import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import BackgroundImage from '../components/BackgroundImage';
import LoginFooter from '../components/LoginFooter';
import LoginNavbar from '../components/LoginNavbar';
import BlueHeaderBar from '../components/BlueHeadBar';

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const allSessionsResponse = await fetch('https://school-billing-app.onrender.com/api/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!allSessionsResponse.ok) {
        const errorData = await allSessionsResponse.json();
        throw new Error(errorData.message || 'Failed to fetch sessions.');
      }
      const allSessionsData = await allSessionsResponse.json();
      setSessions(allSessionsData);

      const activeSessionResponse = await fetch('https://school-billing-app.onrender.com/api/sessions/active', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (activeSessionResponse.status === 200) {
        const activeSessionData = await activeSessionResponse.json();
        setActiveSession(activeSessionData);
      } else if (activeSessionResponse.status === 404) {
        setActiveSession(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    fetchSessions();
  }, []);

  const handleActivate = async (sessionId) => {
    if (userRole !== 'admin') {
      alert('Permission denied. Only administrators can activate sessions.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://school-billing-app.onrender.com/api/sessions/${sessionId}/activate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to activate session.');
      }
      await fetchSessions();
      alert('Session activated successfully!');
    } catch (err) {
      console.error('Activation Error:', err);
      alert(err.message);
    }
  };

  const handleDelete = async (sessionId) => {
    if (userRole !== 'admin') {
      alert('Permission denied. Only administrators can delete sessions.');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this session?');
    if (!isConfirmed) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://school-billing-app.onrender.com/api/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete session.');
      }
      await fetchSessions();
      alert('Session deleted successfully!');
    } catch (err) {
      console.error('Delete Error:', err);
      alert(err.message);
    }
  };

  const handleCreateSessionClick = () => {
    navigate('/create-session');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading sessions...</div>
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
          <div className="bg-[#002147] text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-500">Sessions List</h1>
            {userRole === 'admin' && (
              <button
                onClick={handleCreateSessionClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                title="Create New Session"
              >
                +
              </button>
            )}
          </div>

          {activeSession && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold mb-2 text-gray-700">Current Active Session</h2>
              <div className="flex justify-between items-center bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm">
                <div>
                  <p className="font-semibold text-lg">{activeSession.name}</p>
                  <p className="text-sm">
                    <span className="font-bold">Dates:</span> {formatDate(activeSession.startDate)} - {formatDate(activeSession.endDate)}
                  </p>
                </div>
                <span className="bg-green-600 text-white py-1 px-3 rounded-full text-xs font-bold">Active</span>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Session Name</th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                    <th className="py-3 px-6 text-left">End Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    {userRole === 'admin' && <th className="py-3 px-6 text-center">Actions</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {sessions.map((session) => (
                    <tr key={session._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{session.name}</td>
                      <td className="py-3 px-6 text-left">{formatDate(session.startDate)}</td>
                      <td className="py-3 px-6 text-left">{formatDate(session.endDate)}</td>
                      <td className="py-3 px-6 text-left">
                        <span className={`py-1 px-3 rounded-full text-xs font-bold ${session.isActive ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                          {session.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {userRole === 'admin' && (
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center space-x-2">
                            {!session.isActive && (
                              <button
                                onClick={() => handleActivate(session._id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-xs"
                              >
                                Activate
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(session._id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
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

export default SessionList;