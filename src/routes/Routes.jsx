import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import Dashboard from '../pages/table-models/Visualizer';
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoutes';


const App = () => {
  return (

      <Routes>
      <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>

  );
};

export default App;
