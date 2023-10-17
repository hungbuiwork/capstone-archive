import React from "react";
import { firestore } from "../firebase";
import { collection, doc, getDoc } from "@firebase/firestore";
import { useState } from "react";
export const Project = (props) => {
  /* Render only: 
  Title
  Company Logo
  Description
  Sponsor Name

  projectKey is a prop (str) passed in, which is the document code used to access that project in the database.
  */

  /* Obtain the doc from firestore */
  const handleLoad = async (e) => {
    try {
      await getDoc(docRef).then((projInfo) => setData(projInfo.data()));
    } catch (error) {
      console.log(error);
    }
  };


  /* If given a projectKey as a prop, obtain that projects' information to store into "data" variable */
  let docRef;
  let projectKey = props.projectKey;
  const [data, setData] = useState();
  if (projectKey){
      docRef = doc(firestore, "projects", projectKey);
      handleLoad();
  }





  return <div className=" min-h-[32px] m-4 border-2 border-black">
    {!data && <p> Error: Could not load data</p>}

    {data?.logoURL && <img src = {data.logoURL}></img>}
    <h1>{data?.company}</h1>
    <h2>{data?.name}</h2>
    <p>{data?.description}</p>
  </div>;
};
