import React, { useState } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProjectCard from "./ProjectCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const ProjectFull = () => {
  const [searchedProject, setSearchedProject] = useState(null);
  let {projectID} = useParams();

  useEffect(() => {
    const handleSearch = async () => {
      if (projectID === "") {
        // Don't perform a search if the input is empty
        return;
      }

      const projectDoc = doc(firestore, "projects", projectID);
      const docSnapshot = await getDoc(projectDoc);

      if (docSnapshot.exists()) {
        const projectData = docSnapshot.data();
        setSearchedProject(projectData);
      } else {
        setSearchedProject(null);
      }
    };
    handleSearch();
  }, []);

  return (
    <div>
      {searchedProject && (
        <ProjectCard key={projectID} project={searchedProject} />
      )}
    </div>
  );
};
