import React from "react";
import { useState, useRef, useEffect } from "react";
import { Project } from "../components/Project";
import { collection, doc, getDocs, query } from "@firebase/firestore";
import { firestore } from "../firebase";

export const ProjectView = () => {
  const [projectData, setProjectData] = useState({}); 
  /* Dictionary of documentID: data*/
  /* Load all project IDs into a list, and update the state of projectIDs */

  useEffect(() => {
    const handleLoad = async (e) => {
      const documentSnapshot = getDocs(
        query(collection(firestore, "projects"))
      );
      const hashMap = {};

      (await documentSnapshot).forEach((doc) => {
        const data = doc.data();
        hashMap[doc.id] = data; // Use doc.id as the key
      });

      setProjectData(hashMap);
      console.log(hashMap);
    };

    handleLoad().catch(console.error);
  }, []);

  return (
    <div className=" text-[#313144]">
      {/* Search/filters here*/}
      <form className=" flex justify-center flex-wrap mt-12" action="#">
        <div className="m-2 flex flex-col">
          <label className=" font-bold"> SPONSORS </label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            name="languages"
            id="lang"
          >
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">Biomedical</option>
            <option value="php">Game development</option>
            <option value="java">Etc.</option>
          </select>
        </div>

        <div className="m-2 flex flex-col">
          <label className=" font-bold"> DEPARTMENTS </label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            name="languages"
            id="lang"
          >
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="m-2 flex flex-col">
          <label className=" font-bold"> YEAR </label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            name="languages"
            id="lang"
          >
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className=" m-2 flex flex-col justify-end">
          <input
            className="rounded-md border-[1.5px] border-blue-600 bg-blue-600 hover:bg-transparent hover:text-blue-600 duration-300 w-48 p-2 font-semibold text-white cursor-pointer"
            type="submit"
            value="SEARCH"
          />
        </div>
      </form>

      {/*Load projects dynamically based on form information */}

      <div className=" m-4 border-2  rounded-2xl flex flex-wrap justify-center">
        {Object.entries(projectData).map(([projectID, projectData], i) => (
          <Project projectID={projectID} projectData = {projectData} key={i}></Project>
        ))}
      </div>
    </div>
  );
};
