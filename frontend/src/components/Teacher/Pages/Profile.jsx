import React, { useEffect, useState } from "react";
import { fetchStaffData } from "../../Count/Data";
import './Profile.css';
import LoadingSpinner from '../../Loading/Loading'
import { Card } from 'antd';
import { AiOutlineUser } from "react-icons/ai";
const { Meta } = Card;

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
    
    <div className="profile-container-teacher">

<Card
    hoverable
    style={{
      width: 300,
    }}
    cover={  <img src={picture} alt="Profile" />}
  >
    <Meta title={fullname} description="Staff member" />
  </Card>
  
      <div className="profile-divider"></div>
      <div className="profile-container-2">
      <div className="profile-details">
     <AiOutlineUser  className="proficon"  />
        <h2 className="stffname">{fullname}</h2>
        <table className="detail-table">
          <tbody>
            <tr>
              <td>Employee ID     :</td>
              <td>{employee_id}</td>
            </tr>
            <tr>
              <td>Date of Birth  :</td>
              <td>{new Date(dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
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
              <td>Subjects Taught:</td>
              <td>{subjects_taught}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div></div>
  );
};

export default StaffProfile;
