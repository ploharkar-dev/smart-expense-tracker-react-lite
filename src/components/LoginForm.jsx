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

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
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
        }}
      >
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Login
          </Typography>

          {(localError || error) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {localError || error}
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>

          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register">
              Register here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
