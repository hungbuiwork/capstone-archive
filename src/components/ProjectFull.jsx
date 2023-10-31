import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component

export const ProjectFull = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectCollection = collection(firestore, 'projects');
      const querySnapshot = await getDocs(projectCollection);
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

