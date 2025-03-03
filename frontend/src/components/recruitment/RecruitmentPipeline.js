// import React, { useState } from "react";
// import { Search, Edit, Trash2, Save, Filter, Plus, LayoutGrid, List } from "lucide-react";
// import jsPDF from 'jspdf';
//   const RecruitmentPipeline = () => {
//     const [darkMode, setDarkMode] = useState(false);
//     const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'
//     const [candidates, setCandidates] = useState([
//       { candidate: "John Doe", email: "john@example.com", job: "SW Developer", contact: "123-456-7890", interviews: "2", rating: "4.5", stage: "Technical Round" },
//       { candidate: "Jane Smith", email: "jane@example.com", job: "Tester", contact: "987-654-3210", interviews: "1", rating: "4.0", stage: "HR Round" },
//     ]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [newCandidate, setNewCandidate] = useState({
//       candidate: "",
//       email: "",
//       job: "",
//       contact: "",
//       interviews: "",
//       rating: "",
//       stage: ""
//     });
//     const [editingIndex, setEditingIndex] = useState(null);
//     const [editingCandidate, setEditingCandidate] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const toggleDarkMode = () => {
//       setDarkMode(!darkMode);
//     };

//     const toggleViewMode = () => {
//       const Modal = () => (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           {/* Modal content */}
//         </div>
//       );
//     return (
//       // ... rest of the component ...
//     );
//   };
//     setViewMode(viewMode === 'list' ? 'card' : 'list');
//   };

//   const handleAddCandidate = () => {
//     setCandidates([...candidates, newCandidate]);
//     setNewCandidate({
//       candidate: "",
//       email: "",
//       job: "",
//       contact: "",
//       interviews: "",
//       rating: "",
//       stage: ""
//     });
//     setShowAddForm(false);
//   };

//   const handleDeleteCandidate = (index) => {
//     const updatedCandidates = candidates.filter((_, i) => i !== index);
//     setCandidates(updatedCandidates);
//   };

//   const generatePDF = (candidate) => {
//     const doc = new jsPDF();
//     doc.text(`Candidate Details`, 20, 20);
//     doc.text(`Name: ${candidate.candidate}`, 20, 40);
//     doc.text(`Email: ${candidate.email}`, 20, 50);
//     doc.text(`Job Position: ${candidate.job}`, 20, 60);
//     doc.text(`Contact: ${candidate.contact}`, 20, 70);
//     doc.text(`Interviews: ${candidate.interviews}`, 20, 80);
//     doc.text(`Rating: ${candidate.rating}`, 20, 90);
//     doc.text(`Stage: ${candidate.stage}`, 20, 100);
//     doc.save(`${candidate.candidate}_details.pdf`);
//   };

//   const handleEditClick = (index, candidate) => {
//     setEditingIndex(index);
//     setEditingCandidate({...candidate});
//   };

//   const handleSaveEdit = (index) => {
//     const updatedCandidates = [...candidates];
//     updatedCandidates[index] = editingCandidate;
//     setCandidates(updatedCandidates);
//     setEditingIndex(null);
//     setEditingCandidate(null);
//   };
//     const CandidateCard = ({ candidate, index }) => (
//       <div style={{ 
//         backgroundColor: 'white', 
//         padding: '16px', 
//         borderRadius: '8px', 
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         margin: '8px'
//       }}>
//         <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{candidate.candidate}</h3>
//         <p>📧 {candidate.email}</p>
//         <p>💼 {candidate.job}</p>
//         <p>📱 {candidate.contact}</p>
//         <p>🎯 Stage: {candidate.stage}</p>
//         <p>⭐ Rating: {candidate.rating}</p>
//         <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
//           <button onClick={() => handleEditClick(index, candidate)} style={{ color: 'blue' }}><Edit size={16} /></button>
//           <button onClick={() => handleDeleteCandidate(index)} style={{ color: 'red' }}><Trash2 size={16} /></button>
//           <button onClick={() => generatePDF(candidate)} style={{ color: 'green' }}><Save size={16} /></button>
//         </div>
//       </div>
//     );

  
//   return (
//     <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: darkMode ? '#1a202c' : '#f3f4f6', color: darkMode ? 'white' : 'black' }}>
//       {/* Header Section */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h1 style={{ fontSize: '20px', fontWeight: '600' }}>Recruitments</h1>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//           <div style={{ position: 'relative' }}>
//             <Search size={16} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
//             <input 
//               type="text" 
//               placeholder="Search candidates..." 
//               style={{ 
//                 padding: '8px 16px 8px 32px', 
//                 border: '1px solid #ccc', 
//                 borderRadius: '6px',
//                 width: '250px'
//               }} 
//             />
//           </div>
//           <button onClick={toggleViewMode} style={{ backgroundColor: '#d1d5db', color: 'black', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
//             {viewMode === 'list' ? <LayoutGrid size={16} /> : <List size={16} />}
//             {viewMode === 'list' ? 'Grid View' : 'List View'}
//           </button>
//           <button style={{ backgroundColor: '#d1d5db', color: 'black', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
//             <Filter size={16} /> Filter
//           </button>
//           <button 
//             onClick={() => setShowModal(true)} 
//             style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
//           >
//             <Plus size={16} /> Recruitment
//           </button>
//         </div>
//       </div>

//       {/* Candidates Content */}
      
//       {showModal && <Modal />}

//       const [showModal, setShowModal] = useState(false)

//       const Modal = () => (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '24px',
//             borderRadius: '8px',
//             width: '500px',
//             position: 'relative'
//           }}>
//             <button 
//               onClick={() => setShowModal(false)}
//               style={{
//                 position: 'absolute',
//                 right: '12px',
//                 top: '12px',
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '20px',
//                 cursor: 'pointer'
//               }}
//             >
//               ✕
//             </button>
            
//             <h2 style={{ marginBottom: '20px' }}>Add New Candidate</h2>
            
//             <div style={{ display: 'grid', gap: '12px' }}>
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Candidate Name"
//                 value={newCandidate.candidate}
//                 onChange={(e) => setNewCandidate({...newCandidate, candidate: e.target.value})}
//               />
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Email"
//                 value={newCandidate.email}
//                 onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
//               />
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Job Position"
//                 value={newCandidate.job}
//                 onChange={(e) => setNewCandidate({...newCandidate, job: e.target.value})}
//               />
              
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Contact"
//                 value={newCandidate.contact}
//                 onChange={(e) => setNewCandidate({...newCandidate, contact: e.target.value})}
//               />
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Scheduled Interviews"
//                 value={newCandidate.interviews}
//                 onChange={(e) => setNewCandidate({...newCandidate, interviews: e.target.value})}
//               />
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Rating"
//                 value={newCandidate.rating}
//                 onChange={(e) => setNewCandidate({...newCandidate, rating: e.target.value})}
//               />
//               <input
//                 style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 placeholder="Stage"
//                 value={newCandidate.stage}
//                 onChange={(e) => setNewCandidate({...newCandidate, stage: e.target.value})}
//               />
              
//               <button 
//                 onClick={() => {
//                   handleAddCandidate()
//                   setShowModal(false)
//                 }}
//                 style={{
//                   backgroundColor: '#22c55e',
//                   color: 'white',
//                   padding: '10px',
//                   borderRadius: '6px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   marginTop: '10px'
//                 }}
//               >
//                 Add Candidate
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//       <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//         <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <span style={{ backgroundColor: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '50%', fontSize: '14px' }}>{candidates.length}</span>
//           Applied
//         </h2>

//         {viewMode === 'list' ? (
//           // List View
//           <div style={{ overflowX: 'auto', marginTop: '16px' }}>
//             <table style={{ width: '100%', backgroundColor: 'white', borderRadius: '6px' }}>
//               <thead>
//                 <tr style={{ backgroundColor: '#f3f4f6' }}>
//                   <th style={{ padding: '12px' }}>Candidate</th>
//                   <th style={{ padding: '12px' }}>Email</th>
//                   <th style={{ padding: '12px' }}>Job Position</th>
//                   <th style={{ padding: '12px' }}>Contact</th>
//                   <th style={{ padding: '12px' }}>Scheduled Interviews</th>
//                   <th style={{ padding: '12px' }}>Rating</th>
//                   <th style={{ padding: '12px' }}>Stage</th>
//                   <th style={{ padding: '12px' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {candidates.map((candidate, index) => (
//                   <tr key={index}>
//                     <td>{candidate.candidate}</td>
//                     <td>{candidate.email}</td>
//                     <td>{candidate.job}</td>
//                     <td>{candidate.contact}</td>
//                     <td>{candidate.interviews}</td>
//                     <td>{candidate.rating}</td>
//                     <td>{candidate.stage}</td>
//                     <td style={{ display: 'flex', gap: '8px' }}>
//                       <button onClick={() => generatePDF(candidate)}><Save size={16} /></button>
//                       <button onClick={() => handleDeleteCandidate(index)}><Trash2 size={16} /></button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           // Card View
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
//             gap: '16px',
//             marginTop: '16px' 
//           }}>
//             {candidates.map((candidate, index) => (
//               <CandidateCard key={index} candidate={candidate} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecruitmentPipeline;


import React, { useState } from "react";
import { Search, Edit, Trash2, Save, Filter, Plus, LayoutGrid, List } from "lucide-react";
import jsPDF from "jspdf";

const RecruitmentPipeline = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [candidates, setCandidates] = useState([
    { candidate: "John Doe", email: "john@example.com", job: "SW Developer", contact: "123-456-7890", interviews: "2", rating: "4.5", stage: "Technical Round" },
    { candidate: "Jane Smith", email: "jane@example.com", job: "Tester", contact: "987-654-3210", interviews: "1", rating: "4.0", stage: "HR Round" },
  ]);
  const [newCandidate, setNewCandidate] = useState({
    candidate: "", email: "", job: "", contact: "", interviews: "", rating: "", stage: ""
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleViewMode = () => setViewMode(viewMode === "list" ? "card" : "list");

  const handleAddCandidate = () => {
    if (!newCandidate.candidate || !newCandidate.email) {
      alert("Candidate name and email are required!");
      return;
    }
    if (editingIndex !== null) {
      // Update existing candidate
      const updatedCandidates = [...candidates];
      updatedCandidates[editingIndex] = newCandidate;
      setCandidates(updatedCandidates);
      setEditingIndex(null);
    } else {
      // Add new candidate
      setCandidates([...candidates, newCandidate]);
    }
    setNewCandidate({ candidate: "", email: "", job: "", contact: "", interviews: "", rating: "", stage: "" });
    setShowModal(false);
  };

  const handleDeleteCandidate = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditCandidate = (index) => {
    setNewCandidate(candidates[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.candidate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", minHeight: "100vh", backgroundColor: darkMode ? "#1a202c" : "#f3f4f6", color: darkMode ? "white" : "black" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Recruitments</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <input 
            type="text" 
            placeholder="Search candidates..." 
            value={searchQuery} 
            onChange={handleSearch} 
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button onClick={toggleViewMode} style={{ backgroundColor: "#d1d5db", padding: "8px 16px", borderRadius: "6px" }}>
            {viewMode === "list" ? <LayoutGrid size={16} /> : <List size={16} />} View
          </button>
          <button style={{ backgroundColor: "#d1d5db", padding: "8px 16px", borderRadius: "6px" }}>
            <Filter size={16} /> Filter
          </button>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#ef4444", color: "white", padding: "8px 16px", borderRadius: "6px" }}>
            <Plus size={16} /> {editingIndex !== null ? "Edit Candidate" : "Add Candidate"}
          </button>
        </div>
      </div>

      {/* Modal for Adding/Editing Candidate */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", width: "400px", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", right: "12px", top: "12px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
            <h2>{editingIndex !== null ? "Edit Candidate" : "Add New Candidate"}</h2>
            <div>
              {Object.keys(newCandidate).map((key) => (
                <input key={key} placeholder={key} value={newCandidate[key]} onChange={(e) => setNewCandidate({ ...newCandidate, [key]: e.target.value })} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", marginBottom: "10px", width: "100%" }} />
              ))}
              <button onClick={handleAddCandidate} style={{ backgroundColor: "#22c55e", color: "white", padding: "10px", borderRadius: "6px", border: "none", cursor: "pointer" }}>
                {editingIndex !== null ? "Save Changes" : "Add Candidate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Table */}
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "6px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6", textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Candidate</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Job Position</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Contact</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Interviews</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Rating</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Stage</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.candidate}</td>
              <td>{candidate.email}</td>
              <td>{candidate.job}</td>
              <td>{candidate.contact}</td>
              <td>{candidate.interviews}</td>
              <td>{candidate.rating}</td>
              <td>{candidate.stage}</td>
              <td>
                <button onClick={() => handleEditCandidate(index)}><Edit size={16} /></button>
                <button onClick={() => handleDeleteCandidate(index)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitmentPipeline;
