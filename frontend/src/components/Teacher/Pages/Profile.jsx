import React, { useState } from "react";
import './Profile.css';


function StaffProfile({ staff }) {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={staff.picture} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{staff.fullname}</h2>
        <p>Employee ID: {staff.employee_id}</p>
        <p>Date of Birth: {staff.dateOfBirth}</p>
        <p>Phone: {staff.phone}</p>
        <p>Gender: {staff.gender}</p>
        <p>Email: {staff.email}</p>
        <p>EPF No: {staff.epf_No}</p>
        <p>Subjects Taught: {staff.subjects_taught}</p>
       
      </div>
    </div>
  );
}



function App() {
  
  const staffData = {
    employee_id: "EMP123",
    fullname: "John Doe",
    dateOfBirth: "1990-01-01",
    phone: "1234567890",
    gender: "Male",
    email: "john.doe@example.com",
    epf_No: "EPF123",
    subjects_taught: "Science,English,History",
    picture: "" ,
  };

  return (
    <div className="App">
      <h1>Staff Profile</h1>
      <StaffProfile staff={staffData} />
    </div>
  );
}

export default App;
