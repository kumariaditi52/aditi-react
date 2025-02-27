import React, { useState } from "react";
import { FaSearch, FaFilter, FaThLarge, FaList, FaEllipsisV } from 'react-icons/fa';

const Candidates = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const candidates = [

    { name: "Amrish Puri", email: "fdtest.liugong@gmail.com", role: "Training and Development Coordinator - (Hr Dept)", status: "Converted", initials: "AP", bgColor: "gray" },
    { name: "Ahmad Saeed", email: "ahmadsaeedwd@gmail.com", role: "Odoo Dev - (S/W Dept)", status: "Converted", initials: "AS", bgColor: "brown" },
    { name: "Sarah Johnson", email: "sarah.j@horilla.com", role: "UI/UX Designer - (Design Dept)", status: "Converted", initials: "SJ", bgColor: "purple" },
    { name: "Mike Zhang", email: "mike.z@pazl.info", role: "Project Manager - (PM Dept)", status: "Not-Hired", initials: "MZ", bgColor: "teal" },
    { name: "Emma Wilson", email: "emma.w@horilla.com", role: "Marketing Lead - (Marketing Dept)", status: "Canceled", initials: "EW", bgColor: "indigo" },
    { name: "David Kumar", email: "david.k@pazl.info", role: "Data Analyst - (Analytics Dept)", status: "Converted", initials: "DK", bgColor: "maroon" },
    { name: "Lisa Chen", email: "lisa.c@horilla.com", role: "HR Manager - (Hr Dept)", status: "Not-Hired", initials: "LC", bgColor: "darkblue" },
    { name: "Ryan Smith", email: "ryan.s@pazl.info", role: "Frontend Developer - (S/W Dept)", status: "Converted", initials: "RS", bgColor: "darkgreen" },
    { name: "Julia Patel", email: "julia.p@horilla.com", role: "Content Writer - (Marketing Dept)", status: "Canceled", initials: "JP", bgColor: "crimson" }
  ];
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1600px",
      margin: "20px auto",
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "25px",
        padding: "10px 0"
      }}>Candidates</h2>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        gap: "15px"
      }}>
        <div style={{ position: "relative", flex: 1 }}>
          <FaSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#666" }} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 35px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none"
            }}
          />
        </div>
        <button style={buttonStyle}>
          <FaList /> list
        </button>
        <button style={buttonStyle}>
          <FaThLarge /> card
        </button>
        <button style={buttonStyle}>
          <FaFilter /> Filter
        </button>
        <button style={buttonStyle}>
          <FaThLarge /> Group By
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#f0f0f0" }}>
          Actions
        </button>
        <button style={{ ...buttonStyle, backgroundColor: "#dc3545", color: "white" }}>
          + Create
        </button>
      </div>

      {isVisible && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", gap: "15px" }}>
          {filteredCandidates.map((candidate, index) => (
            <div
              key={index}
              style={{
                width: "280px",
                padding: "15px",
                borderRadius: "10px",
                borderLeft: `5px solid ${candidate.status === "Converted" ? "green"
                  : candidate.status === "Canceled" ? "red"
                    : candidate.status === "Not-Hired" ? "gray"
                      : "blue"
                  }`,
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                backgroundColor: "white",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.querySelector('.action-menu').style.display = "block";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.querySelector('.action-menu').style.display = "none";
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: candidate.bgColor,
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {candidate.initials}
              </div>

              <strong style={{ fontSize: "16px" }}>{candidate.name}</strong>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>{candidate.email}</p>
              <p style={{ fontSize: "14px", color: "#999" }}>{candidate.role}</p>

              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                zIndex: "1"
              }}>
                <FaEllipsisV />
                <div style={{
                  position: "absolute",
                  right: "0",
                  top: "100%",
                  backgroundColor: "white",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  padding: "8px 0",
                  display: "none",
                  minWidth: "200px",
                  zIndex: "2"
                }} className="action-menu">
                  <div style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s"
                  }}>Edit Rejected Candidate</div>

                  <div style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s"
                  }}>Request Document</div>
                  <div style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s"
                  }}>Edit Profile</div>
                  <div style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s"
                  }}>Archive</div>
                  <div style={{
                    padding: "8px 15px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s",
                    color: "#dc3545"
                  }}>Delete</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "8px 15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  backgroundColor: "white",
  fontWeight: "bold"
};

export default Candidates;