import React from "react";

export const Head = () => {
  return (
    <div className="border-2 border-black h-32 flex flex-col justify-center">


      <div className=" flex justify-between border-2 border-black">
        <div className=" flex flex border-2">
          <h1 className=" text-8xl font-extrabold">UCI</h1>
          <div className=" flex flex-col justify-center">
            <h2 className=" text-4xl uppercase font-extrabold ">Capstone</h2>
            <h2 className=" text-3xl uppercase font-extrabold ">Archive</h2>
          </div>
        </div>

        <div>
          <div className=" border-2 border-black m-3">
            Search Bar
          </div>
        </div>
      </div>


    </div>
  );
};
