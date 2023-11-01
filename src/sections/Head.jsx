import React from "react";

export const Head = () => {
  return (
    <div className="">
      <div className="border-2 border-white h-32 flex flex-col justify-center">
        <div className=" flex justify-between border-2 border-white">
          <div className=" flex border-2">
            <h1 className="alex-font spaceLetters3 " style={{ color: '#0064a4', marginLeft: '50px', marginTop: '18px', fontSize: '80px' }}>UCI</h1>
            <div className=" flex flex-col justify-center ">
              <h2 className="  alex-font closer-vertically" style={{ color: '#79B7FF', marginLeft: '50px', marginTop: '15px', fontSize: '35px' }}>CAPSTONE</h2>
              <h2 className=" text-3xl alex-font closer-vertically" style={{ color: '#AED3FF', marginLeft: '50px', marginTop: '-9px' }} >ARCHIVE</h2>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className="yellow-box">
      </div>
    </div>
  );
};