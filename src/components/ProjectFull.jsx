import React, { useState } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ProjectCard from './ProjectCard';

export const ProjectFull = () => {
  const [searchedProject, setSearchedProject] = useState(null);
  const [searchProjectId, setSearchProjectId] = useState('');

  const handleSearch = async () => {
    if (searchProjectId === '') {
      // Don't perform a search if the input is empty
      return;
    }

    const projectDoc = doc(firestore, 'projects', searchProjectId);
    const docSnapshot = await getDoc(projectDoc);

    if (docSnapshot.exists()) {
      const projectData = docSnapshot.data();
      setSearchedProject(projectData);
    } else {
      setSearchedProject(null);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Document ID"
          value={searchProjectId}
          onChange={(e) => setSearchProjectId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchedProject && <ProjectCard key={searchProjectId} project={searchedProject} />}
    </div>
  );
};
