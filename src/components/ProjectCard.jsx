import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

const cardStyles = {
  padding: "20px",
  margin: "0px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
};


const ProjectCard = ({ project }) => {
  //Information about other projects
  const [otherProjectsByDepartment, setOtherProjectsByDepartment] = useState([]);
  const [otherProjectsByCompany, setOtherProjectsByCompany] = useState([]);


  //Information about this project
  //TO ADD(cesar): separate summary & description, project liaisons, course
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
  const logoURL = project.logoURL || "N/A";
  const videoURL = project.videoURL || "";
  const companyLogoURL = project.companyLogo || "";
  const miscURL = project.misc || "";
  const posterURL = project.poster || "";
  const slidesURL = project.slide || "";
  console.log(teamMembers);

  //Finds projects within the same department
  useEffect(() => {
    const fetchProjects = async () => {
      //First, query projects by department
      const q = query(
        collection(firestore, "projects"),
        where("department", "==", department), //TODO(backend): build indexing to filter out the actual project
        limit(10)
      );

      try {
        const querySnapshot = await getDocs(q);
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        setOtherProjectsByDepartment(projects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }

      const q2 = query(
        collection(firestore, "projects"),
        where("company", "==", companyName), //TODO(backend): build indexing to filter out the actual project
        limit(10)
      );

      try {
        const querySnapshot = await getDocs(q2);
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        setOtherProjectsByCompany(projects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);



  return (
    <div style={cardStyles} className="project-card flex flex-col">

      <div>
        {/* back button */}
        <button onClick={() => window.history.back()} className=" ml-12 mb-2  text-[#78B6FF] text-med  font-bold  alex-font tracking-wide hover:text-blue-800 duration-300 ">
          &lt; BACK
        </button>
      </div>

      <div className=" border-0 border-gray-300 mt-8">
        <div className=" flex flex-row justify-start flex-wrap mb-4">
          <div className="flex flex-row justify-start w-8">
          </div>
          <div className="aspect-w-4 aspect-h-3 w-72 bg-white border-2 rounded-xl border-gray-300 overflow-hidden">
            {imageURL ? (
              <img src={imageURL} alt="Project Image" className="object-contain h-full w-full" />
            ) : (
              <div className="flex items-center justify-center h-full">
                No image available
              </div>
            )}
          </div>

              {/*Discription and Video*/}
          <div className=" flex flex-col ">
            <h1 className=" text-sky-900 text-2xl  uppercase font-bold alex-font leading-7 tracking-wide ml-8 ">{projectName}</h1>
            {companyName && companyName !== "N/A" && (
              <div className=" text-[#78B6FF] text-xl  font-bold uppercase alex-font leading-7 tracking-wide ml-8 ">
                <span className="text-[#456386] alex-font text-lg">PARTNER:</span> {companyName}
              </div>
            )}
            <p className=" text-xl ml-8 mt-3 font-sans font-normal tracking-tighter max-w-xl h-10 text-justify">
              {description + " " + description + " " + description + " " + description + " " + description + " " + description + " "}
            </p>
            
          </div>

          <div className=" flex flex-col">

            {/* other content */}
            <h1 className="text-sky-900 text-sm uppercase alex-font leading-7 tracking-wide ml-8 -mb-1 break-before-auto">
              Other projects in "{department}"
            </h1>


            {otherProjectsByDepartment.length > 0 ? (
              otherProjectsByDepartment.map((data) => {
                return (
                  <a key={data.id} href={`/view/${data.id}`}
                    className="ml-8 text-[#78B6FF] text-sm uppercase font-normal alex-font hover:text-blue-800 duration-300 whitespace-normal ">
                    {data.name}
                  </a>
                );
              })
            ) : (
              <p>No project data available</p>
            )}
            <h1 className="text-sky-900 text-sm uppercase font-bold alex-font leading-7 tracking-wide ml-8 -mb-1 mt-2">
              Other projects partnered with "{companyName}"
            </h1>
            {otherProjectsByCompany.length > 0 ? (
              otherProjectsByCompany.map((data) => {
                return (
                  <a key={data.id} href={`/view/${data.id}`}
                    className="ml-8 text-[#78B6FF] text-sm uppercase font-thin alex-font tracking-wide hover:text-blue-800 duration-300 whitespace-normal">
                    {data.name}
                  </a>
                );
              })
            ) : (
              <p>No project data available</p>
            )}
          </div>



        </div>
      </div>


      <div className=" border-0 flex justify-start ml-4 -mt-3">
        {miscURL && (
          <a href={miscURL} target="_self" className=" py-0 px-5   text-[#78B6FF] text-lg  font-bold  alex-font tracking-wide hover:text-blue-800 duration-300 ">
            MISC
          </a>

        )}
        {posterURL && (
          <a href={posterURL} target="_self" className=" py-0 px-5   text-[#78B6FF] text-lg  font-bold  alex-font tracking-wide hover:text-blue-800 duration-300">
            POSTER
          </a>
        )}
        {slidesURL && (
          <a href={slidesURL} target="_self" className=" py-0 px-5  text-[#78B6FF] text-lg  font-bold  alex-font tracking-wide hover:text-blue-800 duration-300">
            SLIDES
          </a>

        )}
      </div>

      {/*div to make sure videos arent next to photos*/}
      {/*<div className=" border-2 border-slate-50 flex justify-center"></div>*/}

      <div className=" border-slate-300 border-0 flex flex-col justify-start ml-8 mt-2">
        <h1 className="text-[#456386] alex-font uppercase text-med -mb-1">Team Members</h1>
        {teamMembers.map((member) => {
          return <span className=" text-sm uppercase font-sans font-semibold tracking-tighter">{member}</span>;
        })}
        <h1 className="text-[#456386] alex-font uppercase text-med -mb-1 mt-1"> Faculty Advisor</h1>
        {faculty.map((member) => {
          return <span className=" text-sm uppercase font-sans font-semibold tracking-tighter">{member}</span>;
        })}
        <h1 className=" text-[#456386] alex-font uppercase text-med -mb-1 mt-1">Department Name</h1>
        <h2 className=" text-sm uppercase font-sans font-semibold tracking-tighter">{department}</h2>
        <h1 className=" text-[#456386] alex-font uppercase text-med -mb-1 mt-1">Course</h1>
        <h2 className=" text-sm uppercase font-sans font-semibold tracking-tighter">{course}</h2>

      </div>

      <div className=" flex justify-center flex-wrap my-8 ml-24">
        <div className=" mb-8">
          {videoURL !== "N/A" ? (
            <div className=" mx-8">
              <p className=" font-bold text-2xl">{videoName}</p>
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
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
