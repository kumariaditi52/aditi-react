import React from 'react'

const SkillsZone = () => {
  const skills = [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Intermediate' },
    { name: 'CSS', level: 'Expert' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'Python', level: 'Beginner' },
  ];

  const styles = {
    skillsZone: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    skillsTitle: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '15px',
    },
    skillCard: {
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '5px',
      textAlign: 'center',
      transition: 'transform 0.2s',
    },
    skillCardHover: {
      transform: 'scale(1.05)',
    },
  };

  return (
    <div>
      sdfghj
    </div>
  )
}

export default SkillsZone
