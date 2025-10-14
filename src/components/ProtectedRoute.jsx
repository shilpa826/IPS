
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If a token exists, the user is authenticated, so we render the child component.
  // Otherwise, we redirect them to the login page.
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


