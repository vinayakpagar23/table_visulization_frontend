import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("in Private route Auth ::",isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
