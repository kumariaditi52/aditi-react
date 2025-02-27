import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Dashboard = () => {
  const offerLetterData = [
    { name: "Not Sent", value: 60, color: "#BEBEBE" },
    { name: "Sent", value: 10, color: "#FFD700" },
    { name: "Accepted", value: 20, color: "#1E90FF" },
    { name: "Rejected", value: 10, color: "#FF4500" },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      {/* Top Stats Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
        <StatCard title="Total Vacancies" value="65" borderColor="#FFA500" />
        <StatCard title="Ongoing Recruitments" value="18" borderColor="#FF4500" />
        <StatCard title="Hired Candidates" value="4" borderColor="#008000" />
        <StatCard title="Conversion Rate" value="26.7%" borderColor="#4682B4" />
        <StatCard title="Offer Acceptance Rate (OAR)" value="50.0%" borderColor="#008000" />
      </div>

      {/* Skill Zone Status & Offer Letter Status */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {/* Skill Zone Status */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Skill Zone Status</h2>
          <SkillItem label="Test Planning" count="1" color="#4169E1" />
          <SkillItem label="MS-Office" count="0" color="#BEBEBE" />
          <SkillItem label="Designer" count="1" color="#FF4500" />
          <SkillItem label="Social Media Influencer" count="0" color="#008080" />
        </div>

        {/* Candidate Offer Letter Status (Pie Chart) */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Candidate Offer Letter Status</h2>
          <PieChart width={250} height={250}>
            <Pie data={offerLetterData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
              {offerLetterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Candidates Onboard */}
      <div style={{ backgroundColor: "#fff", padding: "20px", marginTop: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Candidates on Onboard</h2>
        <CandidateItem name="Ahmad Saeed" role="Odoo Dev" color="#FFD700" />
        <CandidateItem name="Naveen" role="Odoo Dev" color="#008080" />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, borderColor }) => (
  <div style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)", borderTop: `4px solid ${borderColor}` }}>
    <h3 style={{ fontSize: "14px", color: "#6C757D" }}>{title}</h3>
    <p style={{ fontSize: "28px", fontWeight: "700" }}>{value}</p>
  </div>
);

// Skill Item Component
const SkillItem = ({ label, count, color }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color, color: "#fff", borderRadius: "50%", marginRight: "10px" }}>
        {label[0]}
      </span>
      <span style={{ color: "#343A40" }}>{label}</span>
    </div>
    <span style={{ color: "#343A40" }}>{count} Candidate{count !== "1" && "s"}</span>
  </div>
);

// Candidate Item Component
const CandidateItem = ({ name, role, color }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: color, color: "#fff", borderRadius: "50%", marginRight: "10px" }}>
        {name[0]}
      </span>
      <span style={{ color: "#343A40" }}>{name}</span>
    </div>
    <span style={{ color: "#6C757D" }}>{role}</span>
  </div>
);

export default Dashboard;
