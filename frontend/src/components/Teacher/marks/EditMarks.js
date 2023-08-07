import React from "react";

const EditPopup = ({ score, onChangeScore, onSave, onCancel }) => {
  const handleSaveClick = async () => {
    onSave();
  };

  return (
    <div className="marks-popup-container">
      <div className="marks-popup" style={{textAlign:'center'}}>
        <h3>Edit Marks</h3>
        <input
          type="text"
          value={score}
          onChange={(e) => onChangeScore(e.target.value)}
        />
        <div className="popup-buttons">
          <button className="btn btn-success" onClick={handleSaveClick}>Update</button>
          <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
