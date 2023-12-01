import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore"; // Assuming you have the appropriate imports
import { firestore } from "../firebase";
import ProjectCard from "../components/ProjectCard";

export const VerifyProjects = () => {
  const [projectsToReview, setProjectsToReview] = useState([]);
  const [currentProject, setCurrentProject] = useState();
  const [feedbackText, setFeedbackText] = useState();

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
          const data = doc.data();

          // Check if the "verified" field exists and its value is not true
          if (
            data.pendingVerification == null ||
            data.pendingVerification == true
          ) {
            projects.push({ id: doc.id, ...data });
          }
        });
        setProjectsToReview((prevProjects) => {
          setCurrentProject(projects[0] || null); // Set currentProject to the first project or null if no projects
          return projects;
        });
      } catch (error) {
        console.error("Error loading projects: ", error);
      }
    };

    // Call the function to load projects
    loadProjects();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleApprove = async () => {
    //TODO: Handle the approve by doing a firebase update
    if (currentProject) {
      try {
        const projectDocRef = doc(firestore, "projects", currentProject.id);
        await updateDoc(projectDocRef, {
          verified: true,
          pendingVerification: false,
        });
        //Remove the project from the queue
        let projects = projectsToReview;
        projects.shift();
        setProjectsToReview(projects);
        //Update the currentproject
        setCurrentProject(projectsToReview[0]);
        setFeedbackText(`✅Successfully APPROVED "${currentProject?.name}"`);
      } 
      catch (error) {
        setFeedbackText(
          `Failed to Approve "${currentProject?.name}"\n${error}`
        );
      }
    }
  };

  const handleDeny = async () => {
    //TODO: Handle the deny by doing a firebase update
    if (currentProject) {
      try {
        const projectDocRef = doc(firestore, "projects", currentProject.id);
        await updateDoc(projectDocRef, {
          verified: false,
          pendingVerification: false,
        });
        //Remove the project from the queue
        let projects = projectsToReview;
        projects.shift();
        setProjectsToReview(projects);
        //Update the currentproject
        setCurrentProject(projectsToReview[0]);
        setFeedbackText(`✅ Successfully DENIED "${currentProject?.name}"`);
      } 
      catch (error) {
        setFeedbackText(
          `Failed to Deny "${currentProject?.name}"\n${error}`
        );
      }
    }
  };

  const handleSkip = () => {
    //TODO: Handle the approve by doing a firebase update
    //Remove the project from the queue
    let projects = projectsToReview;
    let projectToShift = projects.shift();
    projects.push(projectToShift);

    setProjectsToReview(projects);
    //Update the currentproject
    setCurrentProject(projectsToReview[0]);
    setFeedbackText(`Skipped "${currentProject?.name}"`);
  };

  const reloadRejectedProjects = async () => {
    try {
      // Query all documents from the "projects" collection where pendingVerification is false and verified is false
      const projectCollection = collection(firestore, "projects");
      const q = query(projectCollection, where("pendingVerification", "==", false), where("verified", "==", false));
      const querySnapshot = await getDocs(q);
      let projects = [];
      // Store documents in the projectsToReview list
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projects.push({ id: doc.id, ...data });
      });
      setProjectsToReview((prevProjects) => [...prevProjects, ...projects]);
      setCurrentProject(projects[0] || null); // Set currentProject to the first project or null if no projects
    } catch (error) {
      console.error("Error reloading projects: ", error);
    }
  };

  if (projectsToReview.length < 1) {
    return (
      <div>
        <h1 className=" font-bold text-center text-xl text-success">
          {feedbackText}
        </h1>
        <h1 className=" font-bold text-center text-2xl">
          There are no more pending projects to review! You're all up to date 
        </h1>
        <h2 className="text-9xl text-center mb-4">✅</h2>
        <div className=" flex justify-center mt-4">
          <button className="btn btn-primary m-2" onClick={reloadRejectedProjects}>
            Reload Rejected Projects
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className=" flex justify-center">
        <button className=" btn btn-success m-2" onClick={handleApprove}>
          Approve
        </button>
        <button className=" btn btn-error m-2" onClick={handleDeny}>
          Deny
        </button>
        <a
          className=" btn btn-warning m-2"
          href={`https://console.firebase.google.com/u/0/project/capstone-archive/firestore/data/~2Fprojects~2F${currentProject.id}`}
          target="_blank"
        >
          Modify{" "}
        </a>
        {projectsToReview.length > 1 && <button className=" btn btn-ghost m-2" onClick={handleSkip}>
          Skip
        </button>}
      </div>

      <h1 className=" text-center text-xl font-bold text-success">
        {feedbackText}
      </h1>
      <ProjectCard project={currentProject} />
    </div>
  );
};
