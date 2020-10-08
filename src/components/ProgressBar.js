import React from "react";

const ProgressBar = ({ progress = 0, target = 0 }) => {
  const result = Math.round((progress / target) * 100);
  return (
    <div style={{ display: "flex", height: 30, position: "relative" }}>
      <span
        style={{ textAlign: "center", width: "100%", position: "absolute" }}
      >{`${result}%`}</span>
      <span
        style={{
          width: `${result}%`,
          backgroundColor: "red",
        }}
      ></span>
    </div>
  );
};
export default ProgressBar;
