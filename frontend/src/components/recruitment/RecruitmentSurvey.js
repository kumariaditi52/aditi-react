import React, { useState } from "react";
import { Search, Filter, Plus, Minus, Edit, Trash } from "lucide-react";

const surveyTemplates = [
  {
    id: 1,
    name: "Python Question Template",
    count: 2,
    questions: [
      { id: 1, text: "What are Python's built-in data types?", type: "Choices", initials: "PD" },
      { id: 2, text: "How does Python handle memory management?", type: "Text", initials: "PM" },
    ],
  },
  {
    id: 2,
    name: "Odoo Developer Template",
    count: 7,
    questions: [
      { id: 1, text: "What is the Odoo framework?", type: "Choices", initials: "OF" },
      { id: 2, text: "How do you create a module in Odoo?", type: "Text", initials: "OM" },
    ],
  },
  {
    id: 3,
    name: "Django Developer Template",
    count: 4,
    questions: [
      { id: 1, text: "Have you implemented class-based views (CBVs) in Django?", type: "Yes/No", initials: "HD" },
      { id: 2, text: "Which ORM-related tasks have you most frequently used in Django?", type: "Choices", initials: "WD" },
      { id: 3, text: "Which of the following are key components of Django's architecture?", type: "Choices", initials: "W?" },
      { id: 4, text: "How do you handle user authentication in Django?", type: "Text", initials: "HP" },
    ],
  },
];

const RecruitmentSurvey = () => {
  const [expanded, setExpanded] = useState(null);

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    marginBottom: "10px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
    fontWeight: "600",
  };

  const templateStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "8px",
    backgroundColor: "#fff",
    transition: "background 0.3s",
  };

  const activeTemplateStyle = {
    ...templateStyle,
    backgroundColor: "#f0f0f0",
  };

  const badgeStyle = {
    backgroundColor: "#e53e3e",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    marginRight: "8px",
  };

  const questionRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px" }}>Survey Templates</h1>

      {/* Templates List */}
      {surveyTemplates.map((template) => (
        <div key={template.id} style={cardStyle}>
          <div
            style={expanded === template.id ? activeTemplateStyle : templateStyle}
            onClick={() => setExpanded(expanded === template.id ? null : template.id)}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <button style={buttonStyle}>
                {expanded === template.id ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {template.name}
            </span>
            <span style={badgeStyle}>{template.count}</span>
          </div>

          {/* Render Questions When Expanded */}
          {expanded === template.id && (
            <div style={{ padding: "10px", backgroundColor: "#fff", borderTop: "1px solid #ddd" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ddd" }}>Question</th>
                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Type</th>
                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {template.questions.map((question) => (
                    <tr key={question.id} style={questionRowStyle}>
                      {/* Question Column */}
                      <td style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                        <span
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#fff",
                            backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                            marginRight: "10px",
                          }}
                        >
                          {question.initials}
                        </span>
                        {question.text}
                      </td>

                      {/* Type Column */}
                      <td style={{ textAlign: "center", padding: "10px" }}>{question.type}</td>

                      {/* Actions Column */}
                      <td style={{ textAlign: "center", padding: "10px", display: "flex", gap: "8px" }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <Edit size={18} color="#555" />
                        </button>
                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <Trash size={18} color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecruitmentSurvey;
