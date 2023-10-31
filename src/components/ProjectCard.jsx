import React from 'react';

const cardStyles = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
  margin: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
};

const titleStyles = {
  fontSize: '24px',
  margin: '0',
};

const dateStyles = {
  fontSize: '16px',
  color: '#555',
};

const ProjectCard = ({ project }) => {
  if (!project) {
    return <div style={cardStyles}>No project data available</div>;
  }

  const startDate = project.startDate?.toDate();
  const endDate = project.endDate?.toDate();
  const projectName = project.name || 'N/A';
  const description = project.description || 'N/A';
  const partners = project.partners || 'N/A';

  return (
    <div style={cardStyles} className="project-card">
      <h2 style={titleStyles}>{projectName}</h2>
      <p style={dateStyles}>Start Date: {startDate ? startDate.toDateString() : 'N/A'}</p>
      <p style={dateStyles}>End Date: {endDate ? endDate.toDateString() : 'N/A'}</p>
      <p style={dateStyles}>Description: {description}</p>
      <p style={dateStyles}>Partners: {partners}</p>
    </div>
  );
};

export default ProjectCard;
