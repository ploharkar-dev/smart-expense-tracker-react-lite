import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Container,
  Card,
  Typography,
  Link,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    if (!username.trim()) {
      setLocalError('Username is required');
      return;
    }
    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }
    if (!password.trim()) {
      setLocalError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await register(username, email, password, confirmPassword);
      setSuccessMessage('✓ Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setLocalError(error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        {/* Animated background elements */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255, 0, 110, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        <Card
          elevation={0}
          sx={{
            padding: 4,
            background: 'linear-gradient(135deg, rgba(21, 29, 59, 0.95) 0%, rgba(21, 29, 59, 0.85) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.1)',
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
              mb: 2,
              fontSize: '1.5rem',
            }}>
              ◆
            </Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FinTrack Pro
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#a0a0c0', mt: 1, letterSpacing: '0.05em' }}
            >
              JOIN THE FUTURE OF FINANCE
            </Typography>
          </Box>

          {localError && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(255, 23, 68, 0.1)',
                borderColor: 'rgba(255, 23, 68, 0.3)',
                color: '#ff6b9d',
                border: '1px solid',
              }}
            >
              {localError}
            </Alert>
          )}
          {successMessage && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                borderColor: 'rgba(0, 255, 136, 0.3)',
                color: '#00ff88',
                border: '1px solid',
              }}
              icon={<CheckCircleIcon />}
            >
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#a0a0c0', mb: 2.5, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: 600 }}
            >
              Create your account
            </Typography>

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#00d4ff', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f0f0ff',
                },
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#00d4ff', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f0f0ff',
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#00d4ff', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f0f0ff',
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CheckCircleIcon sx={{ color: password === confirmPassword && confirmPassword ? '#00ff88' : '#00d4ff', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f0f0ff',
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #ff006e 0%, #ff3385 100%)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 20px rgba(255, 0, 110, 0.4)',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(255, 0, 110, 0.6)',
                  transform: 'translateY(-2px)',
                },
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register Now'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0, 212, 255, 0.1)', textAlign: 'center' }}>
            <Typography sx={{ color: '#a0a0c0' }}>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { color: '#ff006e' },
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterForm;
