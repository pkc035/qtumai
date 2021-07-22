import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ percentage }) => {
  return (
    <div style={{ width: "30px", height: "30px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}`}
        styles={{
          root: {},
          path: {
            stroke: `rgba(62, 152, 199, ${percentage / 100})`,
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s",
            transform: "rotate(0)",
            transformOrigin: "center center",
          },

          text: {
            fill: "#ff5000",
            fontSize: "50px",
            fontWeight: "bold",
            lineHeight: 1.6,
          },
          background: {
            fill: "#3e98c7",
          },
        }}
      />
    </div>
  );
};

export default CircularProgressBar;
