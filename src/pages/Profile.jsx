import React from 'react';
import { Box, Card, Typography, Button, Container, Grid, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const ProfileField = ({ icon: Icon, label, value }) => (
    <Box sx={{ py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Icon sx={{ color: '#00d4ff', fontSize: 28 }} />
      <Box>
        <Typography variant="body2" sx={{ color: '#a0a0c0', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#f0f0ff' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: '2.5rem' }} />
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ color: '#a0a0c0', fontSize: '1.1rem' }}>
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Profile Information */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              borderRadius: '16px',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: 'rgba(0, 212, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <VerifiedUserIcon sx={{ color: '#00ff88', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Account Information
              </Typography>
            </Box>

            <ProfileField icon={PersonIcon} label="Username" value={user?.username || 'N/A'} />
            <Divider sx={{ borderColor: 'rgba(0, 212, 255, 0.1)', my: 2 }} />
            <ProfileField icon={EmailIcon} label="User ID" value={user?.userId || 'N/A'} />
          </Card>
        </Grid>

        {/* Account Settings */}
        <Grid item xs={12}>
          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%)',
              border: '1px solid rgba(255, 0, 110, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              🔐 Account Settings
            </Typography>

            <Typography variant="body2" sx={{ color: '#a0a0c0', mb: 3 }}>
              Manage your account security and preferences
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                sx={{
                  py: 1.5,
                  px: 3,
                  background: 'linear-gradient(135deg, #ff1744 0%, #ff6b6b 100%)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 20px rgba(255, 23, 68, 0.4)',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(255, 23, 68, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout Account
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255, 165, 0, 0.1)', borderRadius: '8px', border: '1px solid rgba(255, 165, 0, 0.2)' }}>
              <Typography variant="caption" sx={{ color: '#ffb74d', display: 'block' }}>
                ℹ️ You will be redirected to the login page after logout
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%)',
              border: '1px solid rgba(0, 255, 136, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              📊 Profile Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}>
                  <Typography variant="caption" sx={{ color: '#a0a0c0', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 600 }}>
                    Account Status
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00ff88', fontWeight: 700, mt: 0.5 }}>
                    ✓ Active
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                }}>
                  <Typography variant="caption" sx={{ color: '#a0a0c0', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 600 }}>
                    Member Since
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00d4ff', fontWeight: 700, mt: 0.5 }}>
                    2024
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
