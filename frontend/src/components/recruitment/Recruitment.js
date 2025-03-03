import React from "react";
import { FaSearch, FaFilter, FaEdit, FaTrash, FaShareAlt, FaDownload, FaRegClone } from "react-icons/fa";

const recruitments = [
  { id: 1, role: "SW developer", managers: 1, jobs: 1, vacancy: 2, status: "Open" },
  { id: 2, role: "tester", managers: 1, jobs: 1, vacancy: 2, status: "Open" },
  { id: 3, role: "HR", managers: 1, jobs: 1, vacancy: 1, status: "Closed" },
  { id: 4, role: "Business Analyst position need", managers: 1, jobs: 1, vacancy: 5, status: "Open" },
];

const Recruitment = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Recruitment</h2>

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

      {/* Status Legend */}
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", background: "red", borderRadius: "50%" }}></span> Closed
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", background: "green", borderRadius: "50%" }}></span> Open
        </span>
      </div>

      {/* Table */}

      {/* <div style={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "5px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f3f3", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Recruitment</th>
              <th style={{ padding: "10px" }}>Managers</th>
              <th style={{ padding: "10px" }}>Open Jobs</th>
              <th style={{ padding: "10px" }}>Vacancy</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruitments.map((item, index) => (
              <tr key={item.id} style={{ background: index % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", borderLeft: `5px solid ${item.status === "Open" ? "green" : "red"}` }}>{item.role}</td>
                <td style={{ padding: "10px", fontStyle: "italic" }}>{item.managers} Managers</td>
                <td style={{ padding: "10px", fontStyle: "italic" }}>{item.jobs} Jobs</td>
                <td style={{ padding: "10px" }}>{item.vacancy}</td>
                <td style={{ padding: "10px", display: "flex", gap: "10px" }}>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3498DB" }}>
                    <FaShareAlt />
                  </button>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3498DB" }}>
                    <FaEdit />
                  </button>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#333" }}>
                    <FaRegClone />
                  </button>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#333" }}>
                    <FaDownload />
                  </button>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#E74C3C" }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
<div style={{ 
  marginTop: "20px", 
  border: "1px solid #e0e0e0", 
  borderRadius: "12px", 
  overflow: "hidden",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
}}>
  <table style={{ 
    width: "100%", 
    borderCollapse: "collapse",
    backgroundColor: "#ffffff"
  }}>
    <thead>
      <tr style={{ 
        background: "linear-gradient(to right, #f8f9fa, #e9ecef)", 
        textAlign: "left",
        borderBottom: "2px solid #dee2e6"
      }}>
        <th style={{ padding: "18px", fontSize: "16px", fontWeight: "700", color: "#495057" }}>Recruitment</th>
        <th style={{ padding: "18px", fontSize: "16px", fontWeight: "700", color: "#495057" }}>Managers</th>
        <th style={{ padding: "18px", fontSize: "16px", fontWeight: "700", color: "#495057" }}>Open Jobs</th>
        <th style={{ padding: "18px", fontSize: "16px", fontWeight: "700", color: "#495057" }}>Vacancy</th>
        <th style={{ padding: "18px", fontSize: "16px", fontWeight: "700", color: "#495057" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {recruitments.map((item, index) => (
        <tr key={item.id} style={{ 
          background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
          transition: "all 0.3s ease",
          ':hover': {
            backgroundColor: "#f1f3f5",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)"
          }
        }}>
          <td style={{ 
            padding: "18px", 
            borderLeft: `5px solid ${item.status === "Open" ? "#40c057" : "#fa5252"}`,
            fontWeight: "500",
            color: "#212529"
          }}>{item.role}</td>
          <td style={{ 
            padding: "18px", 
            fontStyle: "italic",
            color: "#495057"
          }}>{item.managers} Managers</td>
          <td style={{ 
            padding: "18px", 
            fontStyle: "italic",
            color: "#495057"
          }}>{item.jobs} Jobs</td>
          <td style={{ 
            padding: "18px",
            fontWeight: "600",
            color: "#212529"
          }}>{item.vacancy}</td>
          <td style={{ 
            padding: "18px", 
            display: "flex", 
            gap: "18px",
            alignItems: "center"
          }}>
            <button style={{ 
              background: "#f8f9fa", 
              border: "1px solid #dee2e6", 
              cursor: "pointer", 
              color: "#228be6",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              ':hover': {
                transform: "scale(1.1)",
                backgroundColor: "#e7f5ff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }
            }}>
              <FaShareAlt />
            </button>
            <button style={{ 
              background: "#f8f9fa", 
              border: "1px solid #dee2e6", 
              cursor: "pointer", 
              color: "#12b886",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              ':hover': {
                transform: "scale(1.1)",
                backgroundColor: "#e6fcf5",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }
            }}>
              <FaEdit />
            </button>
            <button style={{ 
              background: "#f8f9fa", 
              border: "1px solid #dee2e6", 
              cursor: "pointer", 
              color: "#7950f2",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              ':hover': {
                transform: "scale(1.1)",
                backgroundColor: "#f3f0ff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }
            }}>
              <FaRegClone />
            </button>
            <button style={{ 
              background: "#f8f9fa", 
              border: "1px solid #dee2e6", 
              cursor: "pointer", 
              color: "#fd7e14",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              ':hover': {
                transform: "scale(1.1)",
                backgroundColor: "#fff4e6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }
            }}>
              <FaDownload />
            </button>
            <button style={{ 
              background: "#f8f9fa", 
              border: "1px solid #dee2e6", 
              cursor: "pointer", 
              color: "#fa5252",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
              ':hover': {
                transform: "scale(1.1)",
                backgroundColor: "#fff5f5",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }
            }}>
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

export default Recruitment;
