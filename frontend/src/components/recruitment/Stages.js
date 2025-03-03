import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

const Stages = () => {
  const [comments, setComments] = useState({});

  const handleEdit = (stage) => {
    console.log(`Edit ${stage}`);
    // Implement edit functionality here
  };

  const handleDelete = (stage) => {
    console.log(`Delete ${stage}`);
    // Implement delete functionality here
  };

  const handleCommentChange = (stage, value) => {
    setComments({ ...comments, [stage]: value });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Recruitment Stages</h2>
      {['Application', 'Interview', 'Offer'].map((stage, index) => (
        <div key={index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', position: 'relative' }}>
          <h3 style={{ color: '#007bff' }}>{`Stage ${index + 1}: ${stage}`}</h3>
          <p style={{ color: '#555' }}>{`Details about the ${stage} stage.`}</p>
          <input
            type="text"
            placeholder="Add a comment"
            value={comments[stage] || ''}
            onChange={(e) => handleCommentChange(stage, e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={() => handleEdit(stage)} style={{ position: 'absolute', right: '100px', top: '10px' }}>
            <FaEdit /> Edit
          </button>
          <button onClick={() => handleDelete(stage)} style={{ position: 'absolute', right: '10px', top: '10px' }}>
            <FaTrash /> Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Stages;
