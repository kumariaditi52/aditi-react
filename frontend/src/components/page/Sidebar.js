import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography
} from '@mui/material';import {
  Dashboard as DashboardIcon,
  People as RecruitmentIcon,
  PersonAdd as OnboardingIcon,
  Group as EmployeeIcon,
  AccessTime as AttendanceIcon,
  EventBusy as LeaveIcon,
  Payment as PayrollIcon,
  ExpandLess,
  ExpandMore,
  Work as ContractIcon
} from '@mui/icons-material';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    text: 'Recruitment',
    icon: <RecruitmentIcon />,
    path: '/recruitment',
    subItems: ['Job Postings', 'Candidates', 'Interviews']
  },
  {
    text: 'Onboarding',
    icon: <OnboardingIcon />,
    path: '/onboarding',
    subItems: ['New Hires', 'Documentation', 'Training']
  },
  {
    text: 'Employee',
    icon: <EmployeeIcon />,
    path: '/employee',
    subItems: ['Directory', 'Performance', 'Benefits']
  },
  {
    text: 'Attendance',
    icon: <AttendanceIcon />,
    path: '/attendance',
    subItems: ['Daily Log', 'Reports', 'Overtime']
  },
  {
    text: 'Leave',
    icon: <LeaveIcon />,
    path: '/leave',
    subItems: ['Applications', 'Balance', 'Calendar']
  },
  {
    text: 'Payroll',
    icon: <PayrollIcon />,
    path: '/payroll',
    subItems: ['Salary', 'Deductions', 'Tax']
  },
  {
    text: 'Contract',
    icon: <ContractIcon />,
    path: '/contract',
    subItems: ['Templates', 'Active', 'Archive']
  }
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (text, path) => {
    if (path) {
      navigate(path);
      onClose(); // Close sidebar after navigation
    }
    setExpandedItem(expandedItem === text ? null : text);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          bgcolor: '#f8f9fa'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: '#1565C0', fontWeight: 'bold' }}>
          HR Management
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItem button onClick={() => handleItemClick(item.text, item.path)}>
              <ListItemIcon sx={{ color: '#1565C0' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems && (
                expandedItem === item.text ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItem>
            
            {item.subItems && (
              <Collapse in={expandedItem === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem button key={subItem} sx={{ pl: 4 }}>
                      <ListItemText primary={subItem} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
