import React, { useState } from "react";
import './Profile.css';




function Profile({ staff }) {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={staff.picture} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{staff.fullname}</h2>
        <div className="profile-table">
          <div className="profile-row">
            <div className="profile-label">Employee ID:</div>
            <div className="profile-value">{staff.employee_id}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Date of Birth:</div>
            <div className="profile-value">{staff.dateOfBirth}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Phone:</div>
            <div className="profile-value">{staff.phone}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Gender:</div>
            <div className="profile-value">{staff.gender}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Email:</div>
            <div className="profile-value">{staff.email}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">EPF No:</div>
            <div className="profile-value">{staff.epf_No}</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Subjects Taught:</div>
            <div className="profile-value">{staff.subjects_taught}</div>
          </div>
        </div>
        <p>Profile Picture</p>
      </div>
    </div>
  );
}
export default Profile;