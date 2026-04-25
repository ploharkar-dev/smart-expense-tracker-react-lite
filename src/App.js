import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import './animations.css';

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
    mode: 'dark',
    background: {
      default: '#0a0e27',
      paper: '#151d3b',
    },
    primary: {
      main: '#00d4ff',
      light: '#33e0ff',
      dark: '#00a8cc',
    },
    secondary: {
      main: '#ff006e',
      light: '#ff4d9e',
      dark: '#cc0056',
    },
    success: {
      main: '#00ff88',
    },
    warning: {
      main: '#ffa500',
    },
    error: {
      main: '#ff1744',
    },
    info: {
      main: '#00d4ff',
    },
    text: {
      primary: '#f0f0ff',
      secondary: '#a0a0c0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.1)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(255, 0, 110, 0.08) 100%)',
            borderColor: 'rgba(0, 212, 255, 0.2)',
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600,
          borderRadius: '12px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 212, 255, 0.6)',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 212, 255, 0.5)',
          color: '#00d4ff',
          '&:hover': {
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s',
            '& fieldset': {
              borderColor: 'rgba(0, 212, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 212, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d4ff',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(21, 29, 59, 0.95) 0%, rgba(21, 29, 59, 0.85) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        },
      },
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
