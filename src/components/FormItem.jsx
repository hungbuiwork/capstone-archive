import React from "react";

export const FormItem = ({ label, tooltip, children }) => {
  return (
    <div className=" flex flex-col ">
      <div className=" tooltip tooltip-left flex" data-tip = {tooltip}>
        <label className=" font-bold border ">{label}<span className=" text-red-500"> * </span></label>
      </div>
      {children}
    </div>
  );
};
