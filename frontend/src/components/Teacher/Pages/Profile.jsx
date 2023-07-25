import React, { useEffect, useState } from "react";
import { fetchStaffData } from "../StaffData";

const StaffProfile = () => {
  const [staffData, setStaffData] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const staffId = user?.id;

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await fetchStaffData(staffId);
        setStaffData(data);
      } catch (error) {
        alert("Error fetching staff details:", error);
      }
    };

    fetchStaffDetails();
  }, [staffId]);

  if (!staffData) {
    return <div>Loading...</div>;
  }

  const {
    fullname,
    employee_id,
    dateOfBirth,
    phone,
    address,
    gender,
    email,
    epf_No,
    subjects_taught,
    picture,
  } = staffData;

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={picture} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{fullname}</h2>
        <p>Employee ID: {employee_id}</p>
        <p>Date of Birth: {dateOfBirth}</p>
        <p>Address: {address}</p>
        <p>Phone: {phone}</p>
        <p>Gender: {gender}</p>
        <p>Email: {email}</p>
        <p>EPF No: {epf_No}</p>
        <p>Subjects Taught: {subjects_taught}</p>
      </div>
    </div>
  );
};

export default StaffProfile;
