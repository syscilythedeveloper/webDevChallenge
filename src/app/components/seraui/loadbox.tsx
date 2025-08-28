import React from "react";

const Loadbox = () => {
  return (
    <div className="w-8 h-8 relative transform rotate-45">
      <div
        className="absolute bg-[#bfd8c2] w-3.5 h-3.5 animate-ping"
        style={{ top: 0, left: 0, animationDuration: "1.2s" }}
      ></div>
      <div
        className="absolute bg-[#bfd8c2] w-3.5 h-3.5 animate-ping"
        style={{
          top: 0,
          right: 0,
          animationDuration: "1.2s",
          animationDelay: "0.15s",
        }}
      ></div>
      <div
        className="absolute bg-[#bfd8c2] w-3.5 h-3.5 animate-ping"
        style={{
          bottom: 0,
          right: 0,
          animationDuration: "1.2s",
          animationDelay: "0.3s",
        }}
      ></div>
      <div
        className="absolute bg-[#bfd8c2] w-3.5 h-3.5 animate-ping"
        style={{
          bottom: 0,
          left: 0,
          animationDuration: "1.2s",
          animationDelay: "0.45s",
        }}
      ></div>
    </div>
  );
};

export default Loadbox;
