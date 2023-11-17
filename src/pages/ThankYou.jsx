import React from "react";

export const ThankYou = () => {
  return (
    <div className=" w-full h-[100vh] flex flex-row justify-center">
      <div className="m-auto flex flex-col place-self-center border-2 ">
        <h2 className="text-center text-4xl font-semibold">Thank You For Submitting!</h2>
        <div className=" m-auto font-bold m-4">
          <a href="/">
            <button className=" border-2 border-slate-800 text-slate-800 p-2 rounded-md m-4 hover:text-white hover:bg-slate-900 text-lg duration-300 relative top-0 hover:top-2">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};