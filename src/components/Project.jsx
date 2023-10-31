import React from "react";

export const Project = (props) => {
  /* Render only: 
  Title
  Company Logo
  Description
  Sponsor Name
 */
  const id = props.projectID;
  const data = props.projectData;


  return (
      <a href = {`/view/${id}`} target = "_blank" className="xs:w-[80%] sm:w-[38%] lg:w-[25%] m-8 border-[2px] rounded-lg p-6 border-transparent shadow-none hover:shadow-[-1px_13px_74px_9px_rgba(3,10,40,0.28)] duration-300">
        {!data && <p> Error: Could not load data</p>}

        <h1 className=" text-right text-lg font-bold leading-relaxed">{data?.company}</h1>

        {
          <div className="  rounded-xl overflow-hidden aspect-square">
            <img
              className=" object-cover w-full h-full"
              src={data?.logoURL}
            ></img>
          </div>
        }
        
        <h2 className=" text-center text-3xl font-extrabold">{data?.name}</h2>
        <p className="">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." + data?.description}</p>
    </a>
  );
};
