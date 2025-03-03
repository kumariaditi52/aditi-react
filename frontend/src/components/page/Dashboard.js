import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const themeColors = {
    dark: {
      background: "#0A192F",
      cardBackground: "#122543",
      text: "#fff"
    },
    light: {
      background: "#f5f5f5",
      cardBackground: "#ffffff",
      text: "#000"
    }
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeButton = (
    <IconButton 
      onClick={toggleTheme} 
      sx={{ 
        position: 'fixed', 
        right: 20, 
        top: 20,
        color: currentTheme.text,
        bgcolor: currentTheme.cardBackground,
        '&:hover': {
          bgcolor: isDarkMode ? '#1a365d' : '#e0e0e0'
        }
      }}
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );

  // Dynamic card data
  const cardData = [
    { title: "Total Revenue", value: "$236,000", change: "+15%" },
    { title: "Total Orders", value: "1,234", change: "+8%" },
    { title: "Total Products", value: "456", change: "+12%" },
    { title: "Total Customers", value: "789", change: "+5%" }
  ];

  const yieldChart = {
    title: { text: "Monthly Yield and Accumulated Yield", left: "center" },
    xAxis: { type: "category", data: Array.from({ length: 12 }, (_, i) => i + 1) },
    yAxis: { type: "value" },
    series: [
      { name: "Yield", type: "line", data: [5000, 10000, 12000, 15000, 17000, 18000, 20000, 22000, 25000, 27000, 30000, 35000] },
      { name: "Accumulated Yield", type: "line", data: [5000, 15000, 27000, 42000, 59000, 77000, 97000, 119000, 144000, 171000, 201000, 236000] }
    ]
  };

  const materialPurchaseChart = {
    title: { text: "Monthly Material Purchase", left: "center" },
    tooltip: {},
    legend: { data: ["Steel", "Resin", "Rubber"], bottom: 0 },
    xAxis: { type: "category", data: Array.from({ length: 12 }, (_, i) => i + 1) },
    yAxis: { type: "value" },
    series: [
      { name: "Steel", type: "bar", stack: "materials", data: [200, 180, 160, 170, 150, 140, 160, 170, 180, 190, 200, 210] },
      { name: "Resin", type: "bar", stack: "materials", data: [50, 55, 45, 50, 48, 42, 46, 48, 50, 52, 55, 58] },
      { name: "Rubber", type: "bar", stack: "materials", data: [40, 45, 38, 42, 40, 35, 38, 40, 42, 45, 47, 50] }
    ]
  };

  const option1 = {
    title: { text: "Category Distribution", left: "center", textStyle: { color: "#fff" } },
    tooltip: { trigger: "item" },
    legend: { bottom: 0, textStyle: { color: "#fff" } },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 40, name: "Education" },
          { value: 30, name: "Food" },
          { value: 20, name: "Internet" },
          { value: 10, name: "Retail" },
        ],
      },
    ],
  };

  const option2 = {
    title: { text: "Revenue Distribution", left: "center", textStyle: { color: "#fff" } },
    tooltip: { trigger: "item" },
    legend: { bottom: 0, textStyle: { color: "#fff" } },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 50, name: "50M" },
          { value: 100, name: "50-100M" },
          { value: 150, name: "100-150M" },
          { value: 200, name: "150-200M" },
        ],
      },
    ],
  };



      const lineChart = {
        title: { text: "Weekly Data", left: "center", textStyle: { color: "#fff" } },
        xAxis: {
          type: "category",
          data: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
          axisLabel: { color: "#fff" },
        },
        yAxis: { type: "value", axisLabel: { color: "#fff" } },
        series: [
          {
            data: [120, 90, 180, 200, 160, 80, 100],
            type: "line",
            smooth: true,
            areaStyle: {},
          },
        ],
      };

      const funnelChart = {
        title: { text: "Skills Analysis", left: "center", textStyle: { color: "#fff" } },
        tooltip: { trigger: "item" },
        legend: { bottom: 0, textStyle: { color: "#fff" } },
        series: [
          {
            type: "funnel",
            left: "center",
            width: "80%",
            label: { show: true, position: "inside", color: "#fff" },
            data: [
              { value: 100, name: "Hardworking" },
              { value: 80, name: "Responsibilities" },
              { value: 60, name: "Environment" },
              { value: 40, name: "Professional" },
              { value: 20, name: "Smart" },
            ],
          },
        ],
      };

      const extraDivStyle = {
        height: "200px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
  
  return (
    <div style={{ 
      background: currentTheme.background, 
      color: currentTheme.text, 
      padding: "20px",
      minHeight: "100vh",
      transition: "all 0.3s ease"
    }}>
      {themeButton}
      {/* Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              bgcolor: currentTheme.cardBackground, 
              color: currentTheme.text,
              transition: "all 0.3s ease"
            }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ my: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color={card.change.includes('+') ? '#4caf50' : '#f44336'}>
                  {card.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#122543' }}>
            <ReactECharts option={yieldChart} style={{ height: "400px" }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#122543' }}>
            <ReactECharts option={materialPurchaseChart} style={{ height: "400px" }} />
          </Card>
        </Grid>
      </Grid>
      <div style={{ display: "flex", justifyContent: "center", background: "#0A192F", padding: "20px" }}>
        <div style={{ width: "45%", margin: "10px" }}>
          <ReactECharts option={option1} style={{ height: "300px" }} />
        </div>
        <div style={{ width: "45%", margin: "10px" }}>
          <ReactECharts option={option2} style={{ height: "300px" }} />
        </div>
      </div>

      <div style={{ background: "#0A192F", color: "#fff", padding: "20px" }}>
      {/* Line Chart */}
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <ReactECharts option={lineChart} style={{ height: "300px" }} />
      </div>

      {/* Funnel Chart */}
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <ReactECharts option={funnelChart} style={{ height: "300px" }} />
      </div>

      {/* Additional Section */}
      <div style={extraDivStyle}>
        <h2>🚀 Add More Data Here</h2>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;