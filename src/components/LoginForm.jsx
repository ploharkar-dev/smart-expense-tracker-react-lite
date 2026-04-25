import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Link,
  Alert,
  InputAdornment,
  Card,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim()) {
      setLocalError('Username is required');
      return;
    }
    if (!password.trim()) {
      setLocalError('Password is required');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setLocalError(error || 'Login failed');
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
              INTELLIGENT EXPENSE MANAGEMENT
            </Typography>
          </Box>

          {(localError || error) && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(255, 23, 68, 0.1)',
                borderColor: 'rgba(255, 23, 68, 0.3)',
                color: '#ff6b9d',
                border: '1px solid',
              }}
            >
              {localError || error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="subtitle2"
              sx={{ color: '#a0a0c0', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: 600 }}
            >
              Login to your account
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
                '& .MuiInputBase-input::placeholder': {
                  color: '#7a7a9e',
                  opacity: 0.7,
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
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
                '& .MuiInputBase-input::placeholder': {
                  color: '#7a7a9e',
                  opacity: 0.7,
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 212, 255, 0.6)',
                  transform: 'translateY(-2px)',
                },
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Login Now'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0, 212, 255, 0.1)', textAlign: 'center' }}>
            <Typography sx={{ color: '#a0a0c0', mb: 2 }}>
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { color: '#ff006e' },
                }}
              >
                Create one now
              </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
