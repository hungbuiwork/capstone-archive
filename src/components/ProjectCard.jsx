import React from "react";

const cardStyles = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "20px",
  margin: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
};

const ProjectCard = ({ project }) => {
  if (!project) {
    return <div style={cardStyles}>No project data available</div>;
  }

  const startDate = project.startDate?.toDate();
  const endDate = project.endDate?.toDate();
  const companyName = project.company || "N/A";
  const department = project.department || "N/A";
  const projectName = project.name || "N/A";
  const teamMembers = project.teamMembers.split(",") || ["N/A"];
  const faculty = project.faculty.split(",") || ["N/A"];
  const course = project.course || "N/A";
  const schoolYear = project.schoolYear || "N/A";
  const startQuarter = project.startQuarter || "N/A";
  const endQuarter = project.endQuarter || "N/A";
  const description = project.description || "N/A";
  const awards = project.awards || "N/A";
  const imageURL = project.imageURL || "";
  const videoName = project.videoName || "N/A";
  const videoURL = project.videoURL || "";
  const companyLogoURL = project.companyLogo || "";
  const miscURL = project.miscURL || "";
  const posterURL = project.posterURL || "";
  const slidesURL = project.slidesURL || "";

  console.log(teamMembers)

  return (
    <div style={cardStyles} className="project-card flex flex-col">
      <div className=" justify-between flex border-2 border-gray-300">
        <button className=" btn btn-primary">Back</button>
        <h2 className=" m-auto font-extrabold text-6xl border-2 border-red-400">
          {projectName}
        </h2>
        <div>
          <h1 className=" font-bold text-right">{schoolYear}</h1>
          <h2 className=" font-bold text-right">
            {startQuarter} - {endQuarter}
          </h2>
        </div>
      </div>

      <div className=" border-2 border-gray-300">
        <div className=" border-2 border-green-400 w-64 mx-auto">
          {imageURL && (
            <img
              src={imageURL}
              alt="Project Image"
              className=" p-8 border-black rounded-full border-2"
            />
          )}
          <h1 className=" font-bold text-center text-lg">{companyName}</h1>
        </div>

        <p className=" text-xl"> { description + description + description}</p>
      </div>

      <div>
        <div>
          <div>
            <h1 className="font-bold text-xl">Team Members</h1>
            {teamMembers.map(member=>
            {
              return <h2>{member}</h2>
            })}
          </div>
        </div>
      </div>
      <p>Department: {department}</p>
      <p>Start Date: {startDate ? startDate.toDateString() : "N/A"}</p>
      <p>End Date: {endDate ? endDate.toDateString() : "N/A"}</p>
      <p>Team Members: {teamMembers}</p>
      <p>Faculty: {faculty}</p>
      <p>Course: {course}</p>
      <p>School Year: {schoolYear}</p>
      <p>Start Quarter: {startQuarter}</p>
      <p>End Quarter: {endQuarter}</p>
      <p>Description: {description}</p>
      <p>Awards: {awards}</p>
      {videoURL !== "N/A" ? (
        <div>
          <p>Video Name: {videoName}</p>
          <p>Video:</p>
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
        <p>Video: N/A</p>
      )}
      {imageURL && (
        <img
          src={imageURL}
          alt="Project Image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      {companyLogoURL && (
        <img
          src={companyLogoURL}
          alt="Company Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      {miscURL && (
        <div>
          <p>Misc URL:</p>
          <a href={miscURL} target="_blank" rel="noopener noreferrer">
            {miscURL}
          </a>
        </div>
      )}
      {posterURL && (
        <div>
          <p>Poster URL:</p>
          <a href={posterURL} target="_blank" rel="noopener noreferrer">
            {posterURL}
          </a>
        </div>
      )}
      {slidesURL && (
        <div>
          <p>Slides URL:</p>
          <a href={slidesURL} target="_blank" rel="noopener noreferrer">
            {slidesURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
