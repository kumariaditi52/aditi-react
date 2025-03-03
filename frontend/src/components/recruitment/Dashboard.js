import React, { useState } from "react";
// Add these imports at the top
import { FaSun, FaMoon } from 'react-icons/fa';
import ReactECharts from "echarts-for-react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Your helper functions and data declarations here
const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

// Pie Chart Data akk
const pieChartData1 = [
  { name: "Education", value: 25, color: generateRandomColor() },
  { name: "Food", value: 20, color: generateRandomColor() },
  { name: "Internet", value: 30, color: generateRandomColor() },
  { name: "Retail", value: 25, color: generateRandomColor() },
];

const pieChartData2 = [
  { name: "50M", value: 15, color: generateRandomColor() },
  { name: "50-100M", value: 25, color: generateRandomColor() },
  { name: "100-150M", value: 30, color: generateRandomColor() },
  { name: "150-200M", value: 30, color: generateRandomColor() },
];

const pieChartData3 = [
  { name: "Junior", value: 40, color: generateRandomColor() },
  { name: "Mid-Level", value: 35, color: generateRandomColor() },
  { name: "Senior", value: 25, color: generateRandomColor() }
];

// Your component definitions here
const InfoCard = ({ title, children, isDarkMode }) => (
  <div style={{ 
    backgroundColor: isDarkMode ? "#1F2937" : "#f3f4f6", 
    padding: "20px", 
    borderRadius: "10px", 
    marginBottom: "20px",
    color: isDarkMode ? "#F3F4F6" : "#1f2937"
  }}>
    <h2>{title}</h2>
    {children}
  </div>
);
const Dashboard = () => {
  // Add theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Add existing states...
  const [pieData1, setPieData1] = useState(pieChartData1);
  const [pieData2, setPieData2] = useState(pieChartData2);
  const [pieData3, setPieData3] = useState(pieChartData3);

  // Add theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define the click handler inside the component
  const handlePieClick = (data, index, dataSet) => {
    const newColor = window.prompt("Enter new color (hex format #RRGGBB):", data.color);
    const newValue = parseInt(window.prompt("Enter new value:", data.value));
    
    if (newColor && newValue) {
      let updatedData;
      switch(dataSet) {
        case 1:
          updatedData = [...pieData1];
          updatedData[index] = { ...data, color: newColor, value: newValue };
          setPieData1(updatedData);
          break;
        case 2:
          updatedData = [...pieData2];
          updatedData[index] = { ...data, color: newColor, value: newValue };
          setPieData2(updatedData);
          break;
        case 3:
          updatedData = [...pieData3];
          updatedData[index] = { ...data, color: newColor, value: newValue };
          setPieData3(updatedData);
          break;
        default:
          break;
      }
    }
  };

  // Sample Data
  const data = [
    { name: "13:11:00", value1: 10, value2: 40 },
    { name: "13:11:02", value1: 50, value2: 60 },
    { name: "13:11:04", value1: 20, value2: 90 },
    { name: "13:11:06", value1: 80, value2: 20 },
  ];

  const barData = [
    { name: "5 MB", value: 5, color: "#4C51BF" },
    { name: "10 MB", value: 10, color: "#ED8936" },
    { name: "15 MB", value: 15, color: "#E53E3E" },
  ];

  const offerLetterData = [
    { name: "Not Sent", value: 60, color: generateRandomColor() },
    { name: "Sent", value: 10, color: generateRandomColor() },
    { name: "Accepted", value: 20, color: generateRandomColor() },
    { name: "Rejected", value: 10, color: generateRandomColor() },
  ];

  const topCards = [
    { title: "Users", value: "26K", change: "+2.4%", bgColor: "#1E40AF" },
    { title: "Income", value: "$6,200", change: "+0.8%", bgColor: "#047857" },
    { title: "Conversion Rate", value: "2.49%", change: "-1%", bgColor: "#D97706" },
    { title: "Sessions", value: "44K", change: "+2.8%", bgColor: "#B91C1C" },
  ];

  const trafficChart = {
    backgroundColor: "#1A202C",
    title: { text: "Traffic Analytics", left: "center", textStyle: { color: "#E2E8F0" } },
    tooltip: { trigger: "axis", backgroundColor: "rgba(0,0,0,0.8)" },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisLabel: { color: "#E2E8F0" },
      axisLine: { lineStyle: { color: "#4A5568" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#E2E8F0" },
      axisLine: { lineStyle: { color: "#4A5568" } },
      splitLine: { lineStyle: { color: "#2D3748" } },
    },
    series: [
      {
        name: "Visits",
        type: "line",
        data: [5000, 10000, 12000, 18000, 15000, 19000],
        smooth: true,
        itemStyle: { color: "#4299E1" },
        lineStyle: { width: 3 },
      },
      {
        name: "Pageviews",
        type: "line",
        data: [7000, 15000, 16000, 21000, 17000, 22000],
        smooth: true,
        itemStyle: { color: "#F6AD55" },
        lineStyle: { width: 3 },
      },
    ],
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: isDarkMode ? "#111827" : "#ffffff",
      color: isDarkMode ? "#F3F4F6" : "#1f2937",
      padding: "20px",
      transition: "all 0.3s ease"
    }}>
      {/* Add theme toggle button */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000
      }}>
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDarkMode ? "#F3F4F6" : "#1f2937",
            transition: "all 0.3s ease"
          }}
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Top Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {topCards.map((card, index) => (
          <div key={index} style={{ backgroundColor: card.bgColor, padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>{card.title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{card.value}</p>
            <p>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Traffic Chart */}
      <InfoCard title="Traffic Analytics">
        <ReactECharts option={trafficChart} style={{ height: "400px" }} />
      </InfoCard>

      {/* Pie Charts */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {[pieData1, pieData2, pieData3].map((data, chartIndex) => (
          <div key={chartIndex} style={{ backgroundColor: "#1E293B", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>{["Industry Distribution", "Revenue Range", "Experience Level"][chartIndex]}</h3>
            <PieChart width={300} height={300}>
              <Pie 
                data={data} 
                dataKey="value" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                label 
                onClick={(data, index) => handlePieClick(data, index, chartIndex + 1)}
              >
                {data.map((entry, i) => (
                  <Cell 
                    key={`cell-${i}`} 
                    fill={entry.color} 
                    style={{ cursor: "pointer" }} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        ))}
      </div>

      <div style={{ minHeight: "100vh",  color: "#F3F4F6", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px" }}>Dashboard Overview</h2>

        {/* Last Section with Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
          {/* Horizontal Bar Chart */}
          <div style={{ backgroundColor: "#2D3748", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Storage Usage</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart layout="vertical" data={barData} margin={{ left: 30 }}>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#4C51BF">
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div style={{ backgroundColor: "#2D3748", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Network Activity</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value1" stroke="#38B2AC" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Dual Line Chart */}
          <div style={{ backgroundColor: "#2D3748", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value1" stroke="#3182CE" strokeWidth={2} />
                <Line type="monotone" dataKey="value2" stroke="#9F7AEA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart with Grouped Bars */}
          <div style={{ backgroundColor: "#2D3748", padding: "20px", borderRadius: "10px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Data Transfer</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value1" fill="#38B2AC" />
                <Bar dataKey="value2" fill="#4C51BF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;