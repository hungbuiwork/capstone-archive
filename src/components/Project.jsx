import React from "react";
import { Link } from "react-router-dom";
export const Project = (props) => {
  /* Render only: 
  Title
  Company Logo
  Description
  Sponsor Name
 */
  const id = props.projectID;
  const data = props.projectData;
  if (data?.partner) {
    console.log(data);
  }

  return (
    <Link
      to={`/view/${id}`}
      className="xs:w-[80%] sm:w-[38%] lg:w-[25%] m-8 border-[2px] rounded-lg p-6 border-transparent shadow-none hover:shadow-[-1px_13px_74px_9px_rgba(3,10,40,0.28)] duration-300"
    >
      {!data && <p> Error: Could not load data</p>}

      {
        <div className=" indicator flex-none w-auto">
          <div className=" tooltip tooltip-left" data-tip = {data?.company || data?.companyName}>
            <div className="indicator-item indicator-top indicator-start border-2 rounded-lg border-gray-600 aspect-square w-16 hover:w-20 lg:w-24 lg:hover:w-28 duration-300 overflow-hidden bg-white p-0">
              <img
                className=" object-cover w-full h-full"
                src={data?.logoURL || require("../assets/default.jpg")}
                on
              ></img>
            </div>
          </div>
          <div className=" rounded-xl overflow-hidden aspect-square border-2 border-gray-300">
            <img
              className=" object-cover w-full h-full"
              src={data?.imageURL || require("../assets/default.jpg")}
              on
            ></img>
          </div>
        </div>
      }

      <h2 className=" text-center text-3xl font-extrabold">{data?.name || data?.projectName}</h2>
      <p className="">{data?.summary || data?.description}</p>
    </Link>
  );
};
