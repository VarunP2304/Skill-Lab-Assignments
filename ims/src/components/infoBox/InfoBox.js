import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ icon, title, count, bgColor }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon">{icon}</span>
      <div className="info-details">
        <h4>{title}</h4>
        <span>{count}</span>
      </div>
    </div>
  );
};

export default InfoBox;
