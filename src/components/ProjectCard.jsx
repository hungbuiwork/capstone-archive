import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

const ProjectCard = ({ project }) => {
  //Information about other projects
  const [otherProjects, setOtherProjects] = useState([]);

  //Information about this project
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

  //Finds projects within the same department
  useEffect(() => {
    const fetchProjects = async () => {
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
        setOtherProjects(projects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);



  return (
    <div className="project-card flex flex-col">

      {/*Render Other Projects*/}
      <div className=" flex flex-col">
        <h1 className=" font-bold">Other "{department}" Projects</h1>
        {otherProjects.length > 0 ? (
          otherProjects.map((data) => 
          {
            return <a key = {data.id} href = {`/view/${data.id}`} className=" text-blue-400 font-semibold hover:text-black">{data.name}</a>
          })
        ) : (
          <p>No project data available</p>
        )}
      </div>

      {/*Title Info*/}
      <div className=" justify-between flex flex-col border-0 border-gray-300">
        <h2 className=" m-auto text-center font-extrabold text-6xl leading-relaxed">
          {projectName}
        </h2>
        <h2 className=" m-auto font-bold text-xl">
          {startQuarter} {schoolYear.split("-")[0]} - {endQuarter}{" "}
          {schoolYear.split("-")[1]}
        </h2>
      </div>

      {/*Images and description*/}
      <div className=" border-0 border-gray-300 mt-8">
        <div className=" flex flex-row-reverse justify-center flex-wrap mb-4">
          <div className="flex flex-col justify-center w-64">
            <h1 className=" font-semibold text-center text-slate-700 text-2xl">
              partnered with
            </h1>
            {logoURL && (
              <img
                src={logoURL}
                alt="Project Image"
                className=" p-2 border-2"
              />
            )}
            <h1 className=" font-extrabold text-center text-4xl">
              {companyName}
            </h1>
          </div>
          <div className=" w-[50%] ml-8">
            {imageURL && (
              <img src={imageURL} alt="Project Image" className="" />
            )}
          </div>
        </div>
        <hr className=" border-[1px] border-slate-300 my-4"></hr>
        <p className=" text-2xl indent-8">
          {description + description + description}
        </p>
        <hr className=" border-[1px] border-slate-300 my-4"></hr>
      </div>

      {/*External Buttons*/}
      <div className=" border-2 flex justify-center">
        {miscURL && (
          <a
            href={miscURL}
            target="_blank"
            rel="noopener noreferrer"
            className=" py-3 px-8 border-2 border-slate-800 rounded-md m-4 text-2xl font-bold text-slate-900 hover:text-white hover:bg-blue-600 duration-300 hover:border-transparent"
          >
            Misc
          </a>
        )}
        {posterURL && (
          <a
            href={posterURL}
            target="_blank"
            rel="noopener noreferrer"
            className=" py-3 px-8 border-2 border-slate-800 rounded-md m-4 text-2xl font-bold text-slate-900 hover:text-white hover:bg-blue-600 duration-300 hover:border-transparent"
          >
            Poster
          </a>
        )}
        {slidesURL && (
          <a
            href={slidesURL}
            target="_blank"
            rel="noopener noreferrer"
            className=" py-3 px-8 border-2 border-slate-800 rounded-md m-4 text-2xl font-bold text-slate-900 hover:text-white hover:bg-blue-600 duration-300 hover:border-transparent"
          >
            Slides
          </a>
        )}
      </div>

      {/*Video & Project Info */}

      <div className=" flex justify-center flex-wrap my-8">
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

        <div className=" border-slate-300 border-2 p-6 rounded-3xl">
          <h2 className=" font-semibold">{department}</h2>
          <h1 className="font-extrabold text-5xl">CS114</h1>
          <h1 className="font-bold text-xl mt-2"> Faculty</h1>
          {faculty.map((member, i) => {
            return <h2 key={i}>{member}</h2>;
          })}
          <h1 className="font-bold text-xl mt-2">Team Members</h1>
          {teamMembers.map((member, i) => {
            return <h2 key={i}>{member}</h2>;
          })}
          <p className=" mt-9 text-slate-400">More Project Info Soon ...</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
