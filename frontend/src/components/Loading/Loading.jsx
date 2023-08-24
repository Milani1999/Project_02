import React from "react";
import "./Loading.css";

const LoadingSpinner = () => {
  return (
    <div className="container-loading">
      <div style={{ "--i": "1" }}>
        <div className="ball"></div>
      </div>
      <div style={{ "--i": "2" }}><div className="ball"></div></div>
      <div style={{ "--i": "3" }}><div className="ball"></div></div>
      <div style={{ "--i": "4" }}><div className="ball"></div></div>
      <div style={{ "--i": "5" }}><div className="ball"></div></div>
      <div style={{ "--i": "6" }}><div className="ball"></div></div>
      <div style={{ "--i": "7" }}><div className="ball"></div></div>
      <div style={{ "--i": "8" }}><div className="ball"></div></div>
      <div style={{ "--i": "9" }}><div className="ball"></div></div>
      <div style={{ "--i": "10" }}><div className="ball"></div></div>
    </div>
  );
};

export default LoadingSpinner;
