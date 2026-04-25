import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Reports', path: '/reports', icon: <ReceiptIcon /> },
    { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center', pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FinTrack Pro
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon sx={{ color: '#00d4ff' }} />
        </IconButton>
      </Box>
      <List>
        {isAuthenticated ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: 'left',
                    py: 1.5,
                    px: 2,
                    mx: 1,
                    borderRadius: '8px',
                    color: '#a0a0c0',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      color: '#00d4ff',
                      transform: 'translateX(4px)',
                    },
                  }}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleDrawerToggle}
                >
                  <Box sx={{ mr: 2, display: 'flex', color: 'inherit' }}>{item.icon}</Box>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                sx={{
                  textAlign: 'left',
                  py: 1.5,
                  px: 2,
                  mx: 1,
                  borderRadius: '8px',
                  color: '#ff1744',
                  backgroundColor: 'rgba(255, 23, 68, 0.1)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 23, 68, 0.2)',
                  },
                }}
                onClick={handleLogout}
              >
                <Box sx={{ mr: 2, display: 'flex' }}><LogoutIcon /></Box>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', py: 1.5 }} component={RouterLink} to="/login" onClick={handleDrawerToggle}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', py: 1.5 }} component={RouterLink} to="/register" onClick={handleDrawerToggle}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              fontSize: '1.3rem',
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            ◆ FinTrack Pro
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      textTransform: 'uppercase',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      color: '#a0a0c0',
                      '&:hover': {
                        color: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    ml: 1,
                    background: 'linear-gradient(135deg, #ff1744 0%, #ff6b6b 100%)',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(255, 23, 68, 0.4)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register" variant="contained" sx={{ ml: 1 }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      <Box sx={{ flex: 1, py: 3 }}>{children}</Box>

      <Box component="footer" sx={{ bgcolor: 'rgba(21, 29, 59, 0.8)', py: 4, mt: 'auto', borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
            © 2024 FinTrack Pro - Smart Expense Tracker with Predictive Insights
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" sx={{ display: 'block' }}>
            Advanced Financial Intelligence powered by AI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
