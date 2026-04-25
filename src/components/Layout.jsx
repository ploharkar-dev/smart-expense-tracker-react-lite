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
    { label: 'Home', path: '/' },
    { label: 'Reports', path: '/reports' },
    { label: 'Profile', path: '/profile' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Smart Expense Tracker
      </Typography>
      <List>
        {isAuthenticated ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  component={RouterLink}
                  to={item.path}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={RouterLink} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={RouterLink} to="/register">
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Smart Expense Tracker
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/">
                  Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/reports">
                  Reports
                </Button>
                <Button color="inherit" component={RouterLink} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
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

      <Box sx={{ flex: 1 }}>{children}</Box>

      <Box component="footer" sx={{ bgcolor: '#f5f5f5', py: 3, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            © 2024 Smart Expense Tracker with Predictive Insights
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
