import React, { useState } from "react";
// import { Menu, Settings, Notifications, Login, Logout, PersonAdd, Home } from "@mui/icons-material";

import {
  Menu,
  Settings,
  Notifications,
  Login,
  Logout,
  PersonAdd,
  Home,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Box,
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
  const Header = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleProfileClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  const handleLogin = () => {
      // Check if user is already logged in
      const token = localStorage.getItem('token');
      if (token) {
          navigate('/dashboard');
      } else {
          navigate('/login');
      }
      handleClose();
  };

    const handleRegister = () => {
      navigate('/');
      handleClose();
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      toast.success("Logged out successfully!");
      navigate('/login');
      handleClose();
    };

    const handleHomeClick = () => {
      navigate('/dashboard');
    };

    return (
      <>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleMenuClick}>
                <Menu />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565C0' }}>
                DB4 Cloud Technologies
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={handleHomeClick}>
                  <Home />
                </IconButton>
                <IconButton>
                  <Settings />
                </IconButton>
                <IconButton>
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Avatar 
                sx={{ bgcolor: '#37474F', cursor: 'pointer' }}
                onClick={handleProfileClick}
              >
                AK
              </Avatar>
              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogin}>
                  <ListItemIcon>
                    <Login fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleRegister}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Register</ListItemText>
                </MenuItem>
              </MuiMenu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar 
        open={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Header;