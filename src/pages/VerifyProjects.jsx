import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Assuming you have the appropriate imports
import { firestore } from "../firebase";
import ProjectCard from "../components/ProjectCard";

export const VerifyProjects = () => {
  const [projectsToReview, setProjectsToReview] = useState([]);
  const [currentProject, setCurrentProject] = useState();

  
  //Load Projects
  useEffect(() => {
    // Function to load all documents from the "projects" collection
    const loadProjects = async () => {
      try {
        // Query all documents from the "projects" collection
        // TODO: Only filter projects that are not yet approved
        const projectCollection = collection(firestore, "projects");
        const querySnapshot = await getDocs(projectCollection);
        let projects = [];
        // Store documents in the projectsToReview list
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        setProjectsToReview(projects);
        setCurrentProject(projectsToReview[0]);
      } catch (error) {
        console.error("Error loading projects: ", error);
      }
    };

    // Call the function to load projects
    loadProjects();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount



  const handleApprove = () => {
    //TODO: Handle the approve by doing a firebase update
    //Remove the project from the queue
    let projects = projectsToReview;
    projects.shift();
    setProjectsToReview(projects);
    //Update the currentproject
    setCurrentProject(projectsToReview[0]);
  }
  const handleDeny = () => {
    //TODO: Handle the approve by doing a firebase update
    //Remove the project from the queue
    let projects = projectsToReview;
    projects.shift();
    setProjectsToReview(projects);
    //Update the currentproject
    setCurrentProject(projectsToReview[0]);
  }
  const handleSkip = () => {
    //TODO: Handle the approve by doing a firebase update
    //Remove the project from the queue
    let projects = projectsToReview;
    projects.shift();
    setProjectsToReview(projects);
    //Update the currentproject
    setCurrentProject(projectsToReview[0]);
  }

  if (projectsToReview.length < 1){
    return <div className=" font-bold text-center"> There are no more pending projects to review! You're all up to date</div>
  }
  return (
    <div>
      <div className=" flex justify-center">
        <button className=" btn btn-success" onClick={handleApprove}>Approve</button>
        <button className=" btn btn-error" onClick={handleDeny}>Deny</button>
        <a className=" btn btn-warning" href = "www.google.com" target = "_blank">Modify </a>
        <button className=" btn btn-ghost">Skip</button>
      </div>
      <ProjectCard project={currentProject} />
    </div>
  );
};
