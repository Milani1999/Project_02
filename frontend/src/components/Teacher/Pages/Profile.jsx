import React, { useEffect, useState } from "react";
import { fetchStaffData } from "../../Count/Data";
import './Profile.css';
import LoadingSpinner from '../../Loading/Loading'

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
    return <LoadingSpinner/>;
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
      <div className="profile-divider"></div>
      <div className="profile-container-2">
      <h1>Staff Member</h1>
      <div className="profile-details">
    
        <h2>{fullname}</h2>
        <table className="detail-table">
          <tbody>
            <tr>
              <td>Employee ID  :</td>
              <td>{employee_id}</td>
            </tr>
            <tr>
              <td>Date of Birth  :</td>
              <td>{dateOfBirth}</td>
            </tr>
            <tr>
              <td>Address  :</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>Phone  :</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Gender  :</td>
              <td>{gender}</td>
            </tr>
            <tr>
              <td>Email  :</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>EPF No  :</td>
              <td>{epf_No}</td>
            </tr>
            <tr>
              <td>Subjects Taught  :</td>
              <td>{subjects_taught}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div></div>
  );
};

export default StaffProfile;
