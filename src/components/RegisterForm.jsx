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
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

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
      setLocalError('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
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
        }}
      >
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Register
          </Typography>

          {localError && (
            <Alert severity={localError.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {localError}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;
