import React, { useState } from "react";
import axios from "axios";
import "./Relief.css";
import LoadingSpinner from "../../Loading/Loading";

function Relief({ triggerRefresh }) {
  const [loading, setLoading] = useState(false);
  const [reliefPopup, setReliefPopup] = useState(false);
  const [resetPopup, setResetPopup] = useState(false);

  const allocateRelief = async () => {
    try {
      setLoading(true);
      await axios.get("/api/reliefAllocation");
      setReliefPopup(false);
      triggerRefresh((prev) => !prev);
    } catch (error) {
      alert("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRelief = () => {
    setReliefPopup(true);
  };

  const handleCancelRelief = () => {
    setReliefPopup(false);
  };

  const allocateReset = async () => {
    try {
      setLoading(true);
      await axios.get("/api/reliefAllocation/reset");
      setResetPopup(false);
      triggerRefresh((prev) => !prev);
    } catch (error) {
      alert("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResetPopup(true);
  };

  const handleCancelReset = () => {
    setResetPopup(false);
  };

  return (
    <div>
      <div className="Relief-div">
        {loading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <button className="btn btn-success" id="relief-btn" onClick={handleRelief}>
            Allocate Relief
          </button>
        )}
      </div>
      <div className="Reset-div">
        {loading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <button className="btn btn-danger" id="reset-btn" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
      {reliefPopup && (
        <div className="popup-background-timetable">
          <div className="popup-container-delete">
            <h2>Relief Allocation</h2>
            <p>Are you sure you want to allocate Relief periods?</p>
            <button className="btn btn-danger m-3" onClick={allocateRelief}>
              Proceed
            </button>
            <button className="btn btn-secondary" onClick={handleCancelRelief}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {resetPopup && (
        <div className="popup-background-timetable">
          <div className="popup-container-delete">
            <h2>Reset Relief Allocation</h2>
            <p>Are you sure you want to reset the time table?</p>
            <button className="btn btn-danger m-3" onClick={allocateReset}>
              Reset
            </button>
            <button className="btn btn-secondary" onClick={handleCancelReset}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Relief;
