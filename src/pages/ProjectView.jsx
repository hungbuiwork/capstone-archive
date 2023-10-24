import React from "react";
import { useState, useRef, useEffect } from "react";
import { Project } from "../components/Project";
import { collection, doc, getDocs, query } from "@firebase/firestore";
import { firestore } from "../firebase";

export const ProjectView = () => {

  const [projectIDs, setProjectIDs] = useState([]);

  const q = query(collection(firestore, "projects"));

  /* Load all project IDs into a list, and update the state of projectIDs */
  

  useEffect(()=>{
    const handleLoad = async (e) => {
      let docs = getDocs(q);
      let projectsIDs_temp = [];
      (await docs).forEach((doc) => projectsIDs_temp.push(doc.id));
      await setProjectIDs(projectsIDs_temp);
    };

    handleLoad().catch(console.error);
  }, [q, projectIDs, setProjectIDs] )

  return (
    <div className="">
      Project View
      {/* Search/filters here*/}
      <form className=" flex justify-center" action="#">
        <div className="m-2">
          <label> Field: </label>
          <select className=" border-2 border-black" name="languages" id="lang">
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">Biomedical</option>
            <option value="php">Game development</option>
            <option value="java">Etc.</option>
          </select>
        </div>

        <div className="m-2">
          <label> Company: </label>
          <select className=" border-2 border-black" name="languages" id="lang">
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="m-2">
          <label> Year: </label>
          <select className=" border-2 border-black" name="languages" id="lang">
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>

        <input
          className=" border-2 border-black px-2"
          type="submit"
          value="Submit"
        />
      </form>




      {/*Load projects dynamically based on form information */}
      
      <div className=" m-4 border-black border-2">
        <h1>Project Area</h1>
        {projectIDs.map((projectID, i) => (
          <Project projectKey={projectID} key={i}></Project>
        ))}
      </div>
    </div>
  );
};
