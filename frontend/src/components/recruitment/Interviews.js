import React from "react";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const interviews = [
  { id: 1, candidate: "Noah Anderson", interviewers: 1, date: "28.02.2025", time: "22:51", description: "adsf", status: "Scheduled" },
  { id: 2, candidate: "dsa", interviewers: 1, date: "27.02.2025", time: "12:02", description: "None", status: "Completed" },
  { id: 3, candidate: "Liam", interviewers: 1, date: "27.02.2025", time: "18:00", description: "None", status: "Pending" },
  { id: 4, candidate: "Noah Anderson", interviewers: 1, date: "27.02.2025", time: "20:56", description: "welcome", status: "Cancelled" },
  { id: 5, candidate: "Sarah Jane", interviewers: 0, date: "26.02.2025", time: "09:00", description: "None", status: "Scheduled" },
];

const Interviews = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Scheduled Interviews</h2>

      {/* Search, Filter, Create Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", alignItems: "center" }}>
        <div style={{ position: "relative", width: "250px" }}>
          <FaSearch style={{ position: "absolute", top: "10px", left: "10px", color: "#888" }} />
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "100%",
              padding: "8px 10px 8px 30px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              outline: "none",
            }}
          />
        </div>
        <button style={{ background: "#f3f3f3", padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
          <FaFilter style={{ marginRight: "5px" }} /> Filter
        </button>
        <button style={{ background: "#E74C3C", color: "#fff", padding: "8px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
          + Create
        </button>
      </div>

      {/* Table */}
      <div style={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "5px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f3f3", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Candidate</th>
              <th style={{ padding: "10px" }}>Interviewer</th>
              <th style={{ padding: "10px" }}>Interview Date</th>
              <th style={{ padding: "10px" }}>Interview Time</th>
              <th style={{ padding: "10px" }}>Description</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, index) => (
              <tr key={interview.id} style={{ background: index % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{interview.candidate}</td>
                <td style={{ padding: "10px" }}>{interview.interviewers} Interviewers</td>
                <td style={{ padding: "10px" }}>{interview.date}</td>
                <td style={{ padding: "10px" }}>{interview.time}</td>
                <td style={{ padding: "10px" }}>{interview.description}</td>
                <td style={{ padding: "10px", fontWeight: "bold", color: interview.status === "Scheduled" ? "green" : interview.status === "Completed" ? "blue" : interview.status === "Pending" ? "orange" : "red" }}>
                  {interview.status}
                </td>
                <td style={{ padding: "10px", display: "flex", gap: "10px" }}>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3498DB" }}>
                    <FaEdit />
                  </button>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#E74C3C" }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Interviews;
