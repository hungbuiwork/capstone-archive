import React from "react";
import { Project } from "../components/Project";

export const Content = () => {
  let demoProjects = [1, 2, 3, 4, 5];
  return (
    <div className=" h-[100vh] border-2 border-black">
      Content here

      
      {/* Search/filters here*/}
      <form className=" flex justify-center" action="#">
        <div className = "m-2">
          <label> Field: </label>
          <select className=" border-2 border-black" name="languages" id="lang">
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">Biomedical</option>
            <option value="php">Game development</option>
            <option value="java">Etc.</option>
          </select>
        </div>

        <div className = "m-2">
          <label> Company: </label>
          <select className=" border-2 border-black" name="languages" id="lang">
            {/* Dynamically load options later on based on the data*/}
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className = "m-2">
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

        {demoProjects.map((projNum) => (
          <Project title={projNum}></Project>
        ))}
      </div>
    </div>
  );
};
