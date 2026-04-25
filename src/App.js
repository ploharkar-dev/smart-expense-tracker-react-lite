import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

import Layout from './components/Layout.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Home from './pages/Home.jsx';
import Reports from './pages/Reports.jsx';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedHomeRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterForm />}
        />
        <Route path="/" element={<ProtectedRoute component={ProtectedHomeRoute} />} />
        <Route path="/reports" element={<ProtectedRoute component={Reports} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <TransactionProvider>
            <AppRoutes />
          </TransactionProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
