import React from "react";
import './Loading.css'

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <div className="spinner-grow text-success"role="status">
      </div>
      <div className="spinner-grow text-success" role="status">
      </div>
      <div className="spinner-grow text-success" role="status">
      </div>
      <div className="spinner-grow text-success"role="status">
      </div>
      <div className="spinner-grow text-success" role="status">
      </div>
      <div className="spinner-grow text-success" role="status">
      </div>
    </div>
  );
};

export default LoadingSpinner;
