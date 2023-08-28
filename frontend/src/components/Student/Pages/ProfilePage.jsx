import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { fetchStudentData } from "../../Count/Data";
import LoadingSpinner from "../../Loading/Loading";

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.id;

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await fetchStudentData(studentId);
        setStudentData(data);
      } catch (error) {
        alert("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (!studentData) {
    return <div><LoadingSpinner/></div>;
  }

  const {
    admission_no,
    fullname,
    // first_name,
    // last_name,
    dateOfBirth,
    phone,
    address,
    // gender,
    picture,
    parent_Name,
    parent_occupation,
    admission_year,
    grade,
    extra_activities,
  } = studentData;

  const rows = [
    { label: "Name In Full", value: fullname },
    { label: "Date Of Birth", value: dateOfBirth},
    { label: "Address", value: address },
    { label: "Admission Number", value: admission_no },
    { label: "Class of Admission", value: "Grade 1" },
    { label: "Current Grade", value: grade },
    {label:"Extra-curricular activities",value:extra_activities},
  ];

  const parentDetails = [
    { label: "Father's name", value: parent_Name },
    { label: "Occupation", value: parent_occupation },
    { label: "Address", value: address },
    // { label: "NIC Number", value: "123456789" },
    { label: "Telephone Number", value: phone },
    // { label: "Mother's name", value: parent_Name },
    // { label: "Occupation", value: parent_occupation },
    { label: "Telephone Number", value: phone },
  ];

  // const emergencyRight = [
  //   { label: "Guardian's Name", value: "Mrs. Ivans" },
  //   { label: "Telephone Number", value: "0772332020" },
  // ];

  // const emergencyLeft = [
  //   { label: "Relationship To Student", value: "Aunt" },
  //   { label: "Occupation", value: "Data Analyst" },
  // ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img src={picture} alt="Profile" height={100} />
        </div>
        <div className="profile-details">
          <h2>{fullname}</h2>
          <p>Grade {grade}</p>
        </div>
      </div>

      <div className="profile-columns">
        <div className="mothers-details">
          <h3 className='student-head'>Student Details</h3>

          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.value}
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>

        <div className="vertical-line"></div>

        <div className="students-details">
          <h3>Parent's Details</h3>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {parentDetails.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* 
      <div>
        <h3>In Case Of Emergency</h3>
      </div> */}

      <div className="profile-columns">
        <div className="mothers-details">
          {/* <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {emergencyRight.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
        <div className="students-details">
          {/* <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {emergencyRight.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "8px", textAlign: "left" }}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
