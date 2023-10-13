import React from "react";

export const Project = () => {
  let title = "Project title"
  let company = "Facebook"
  let start_date = new Date("Jan 01 2021");
  let end_date = new Date("Feb 01 2021");
  let description = "This is a description of the project"
  let faculty = ["Gasko", "Thornton", "Jerry"]
  let imageURL = "https://m.media-amazon.com/images/M/MV5BMGZiZmNkZWMtMjE0OS00NzBmLWIwNjMtZmZjMWE1MjE1MTM2XkEyXkFqcGdeQXVyMTQzNTA5MzYz._V1_.jpg"
  let team = ["Bobby Joe", "Neiman Schwartz", "Brittany Spheres"]
  let videoName = "Video"
  let videoURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  return (
    <div className=" min-h-[32px] m-4 border-2 border-black">
      <h1>{title}</h1>
      <img className=" h-48 w-48" src = {imageURL}></img>
      <h3>sponsored by {company}</h3>
      
      Instructors: {faculty.map((member)=> <a className=" underline m-2" href="https://google.com" target = "_blank">{member}</a>)}
      
      <h2 className="">Duration: {start_date.toUTCString()} - {end_date.toUTCString()}</h2>
      Team members: {team.map((member) => <a className = "underline m-2">{member}</a>)}

      <p className=" mt-4">{description}</p>

    </div>
  );
};
