import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { ThemeProvider } from './Contexts/ThemeContext';
import { Box } from '@mui/material';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';

// Dashboard Pages
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <ThemeProvider>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;