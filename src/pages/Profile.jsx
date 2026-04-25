import React from 'react';
import { Box, Paper, Typography, Button, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Username:</strong> {user?.username}
        </Typography>
        <Typography variant="body1">
          <strong>User ID:</strong> {user?.userId}
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
