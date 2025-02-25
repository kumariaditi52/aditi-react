import React, { useState } from "react";
import {
  Menu,
  Settings,
  Notifications,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
              <Avatar sx={{ bgcolor: '#37474F' }}>AL</Avatar>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Adam
              </Typography>
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