import React from "react";

export const Welcome = () => {
  return (
    <div className=" w-full h-[100vh] flex flex-row justify-center">
      <div className="m-auto flex flex-col place-self-center border-2 ">
        <h2 className="text-center text-4xl font-semibold">Welcome to the</h2>
        <h1 className="text-center text-6xl font-extrabold hover:text-violet-700 hover:text-8xl duration-300">
          Capstone Project Archive
        </h1>

        <div className=" m-auto font-bold m-4">
          <a href="/submit">
            <button className=" border-2 border-slate-800 text-slate-800 p-2 rounded-md m-4 hover:text-white hover:bg-slate-900 text-lg duration-300 relative top-0 hover:top-2">
              Submit a project
            </button>
          </a>
          <a href="/view">
            <button className=" border-2 border-slate-800 text-slate-800 p-2 rounded-md m-4 hover:text-white hover:bg-slate-900 text-lg duration-300 relative top-0 hover:top-2">
              Find a project
            </button>
          </a>
          
        </div>
      </div>
    </div>
  );
};
