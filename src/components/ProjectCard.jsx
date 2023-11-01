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
  const companyName = project.company || 'N/A';
  const department = project.department || 'N/A';
  const projectName = project.name || 'N/A';
  const teamMembers = project.teamMembers || 'N/A';
  const faculty = project.faculty || 'N/A';
  const course = project.course || 'N/A';
  const schoolYear = project.schoolYear || 'N/A';
  const startQuarter = project.startQuarter || 'N/A';
  const endQuarter = project.endQuarter || 'N/A';
  const description = project.description || 'N/A';
  const awards = project.awards || 'N/A';
  const imageURL = project.imageURL || '';
  const videoName = project.videoName || 'N/A';
  const videoURL = project.videoURL || '';
  const companyLogoURL = project.companyLogo || '';
  const miscURL = project.miscURL || '';
  const posterURL = project.posterURL || '';
  const slidesURL = project.slidesURL || '';

  return (
    <div style={cardStyles} className="project-card">
      <h2 style={titleStyles}>{projectName}</h2>
      <p style={dateStyles}>Company: {companyName}</p>
      <p style={dateStyles}>Department: {department}</p>
      <p style={dateStyles}>Start Date: {startDate ? startDate.toDateString() : 'N/A'}</p>
      <p style={dateStyles}>End Date: {endDate ? endDate.toDateString() : 'N/A'}</p>
      <p style={dateStyles}>Team Members: {teamMembers}</p>
      <p style={dateStyles}>Faculty: {faculty}</p>
      <p style={dateStyles}>Course: {course}</p>
      <p style={dateStyles}>School Year: {schoolYear}</p>
      <p style={dateStyles}>Start Quarter: {startQuarter}</p>
      <p style={dateStyles}>End Quarter: {endQuarter}</p>
      <p style={dateStyles}>Description: {description}</p>
      <p style={dateStyles}>Awards: {awards}</p>
      {videoURL !== 'N/A' ? (
        <div>
          <p style={dateStyles}>Video Name: {videoName}</p>
          <p style={dateStyles}>Video:</p>
          <iframe
            title="Embedded Video"
            width="560"
            height="315"
            src={videoURL}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p style={dateStyles}>Video: N/A</p>
      )}
      {imageURL && <img src={imageURL} alt="Project Image" style={{ maxWidth: '100%', height: 'auto' }} />}
      {companyLogoURL && <img src={companyLogoURL} alt="Company Logo" style={{ maxWidth: '100%', height: 'auto' }} />}
      {miscURL && (
        <div>
          <p style={dateStyles}>Misc URL:</p>
          <a href={miscURL} target="_blank" rel="noopener noreferrer">
            {miscURL}
          </a>
        </div>
      )}
      {posterURL && (
        <div>
          <p style={dateStyles}>Poster URL:</p>
          <a href={posterURL} target="_blank" rel="noopener noreferrer">
            {posterURL}
          </a>
        </div>
      )}
      {slidesURL && (
        <div>
          <p style={dateStyles}>Slides URL:</p>
          <a href={slidesURL} target="_blank" rel="noopener noreferrer">
            {slidesURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
