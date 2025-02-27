import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa'; // Make sure to install react-icons

const Candidates = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const candidates = [
    {
      name: "Liam",
      email: "ananda.s@pazl.info",
      role: "Odoo Dev - (S/W Dept)",
      status: "Canceled",
      initials: "LI",
      bgColor: "green",
    },
    {
      name: "Noah Anderson",
      email: "noah.anderson@horilla.com",
      role: "Odoo Dev - (S/W Dept)",
      status: "Converted",
      initials: "NA",
      bgColor: "lightblue",
    },
    {
      name: "Lucas Rogers",
      email: "lucas.rogers@horilla.com",
      role: "Sales Man - (Sales Dept)",
      status: "Not-Hired",
      initials: "LR",
      bgColor: "orange",
    },
    {
      name: "Amrish Puri",
      email: "fdtest.liugong@gmail.com",
      role: "Training and Development Coordinator - (Hr Dept)",
      status: "Converted",
      initials: "AP",
      bgColor: "gray",
    },
  ];

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Candidates</h2>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {isVisible ? "Hide" : "Show"} Candidates
        </button>
      </div>

      {/* Search Bar with Icon */}
      <div style={{ position: "relative", marginTop: "10px" }}>
        <FaSearch style={{ 
          position: "absolute", 
          left: "10px", 
          top: "50%", 
          transform: "translateY(-50%)",
          color: "#666" 
        }} />
        <input
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 35px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Candidates List */}
      {isVisible && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {filteredCandidates.map((candidate, index) => (
            <div
              key={index}
              style={{
                width: "300px",
                padding: "15px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                borderLeft: `5px solid ${
                  candidate.status === "Converted"
                    ? "green"
                    : candidate.status === "Canceled"
                    ? "red"
                    : candidate.status === "Not-Hired"
                    ? "gray"
                    : "blue"
                }`,
                position: "relative",
                transition: "all 0.3s ease",
                cursor: "pointer",
                ":hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                }
              }}
            >
              {/* Profile Circle */}
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
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                {candidate.email}
              </p>
              <p style={{ fontSize: "14px", color: "#999" }}>{candidate.role}</p>

              {/* Status Badge */}
              {candidate.status === "Converted" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Converted
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;