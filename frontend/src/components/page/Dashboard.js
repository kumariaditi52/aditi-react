// import React from 'react';
// import { Box, Typography, Grid, Paper } from '@mui/material';

// const Dashboard = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 4 }}>
//         Dashboard
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6">Total Employees</Typography>
//             <Typography variant="h3">150</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6">Active Projects</Typography>
//             <Typography variant="h3">12</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h6">Pending Tasks</Typography>
//             <Typography variant="h3">25</Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;



import React from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const lineData = [
    { name: "Jan", lorem: 30, ipsum: 20 },
    { name: "Feb", lorem: 20, ipsum: 35 },
    { name: "Mar", lorem: 50, ipsum: 45 },
    { name: "Apr", lorem: 40, ipsum: 30 },
    { name: "May", lorem: 35, ipsum: 50 },
  ];

  const pieData = [
    { name: "Lorem", value: 30 },
    { name: "Ipsum", value: 70 },
  ];

  const COLORS = ["#8884d8", "#ff7300"];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h3">150</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Active Projects</Typography>
            <Typography variant="h3">12</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Pending Tasks</Typography>
            <Typography variant="h3">25</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Performance Overview</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="lorem" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="ipsum" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Completion Rate</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
              <CircularProgress variant="determinate" value={75} size={100} thickness={5} />
              <Typography sx={{ position: "absolute" }} variant="h5">
                75%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Category Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

