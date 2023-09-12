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
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const {
    admission_no,
    fullname,
    dateOfBirth,
    phone,
    address,
    gender,
    picture,
    parent_Name,
    parent_occupation,
    admission_year,
    admitted_grade,
    grade,
    extra_activities,
    conduct,
    remark,
    special_aptitudes,
  } = studentData;

  const rows = [
    { label: "Name In Full", value: fullname },
    { label: "Date Of Birth", value: dateOfBirth.substring(0, 10) },
    { label: "Address", value: address },
    { label: "Gender", value: gender },
  ];

  const parentDetails = [
    { label: "Name", value: parent_Name },
    { label: "Occupation", value: parent_occupation },
    { label: "Telephone Number", value: phone },
  ];

  const academicDetails = [
    { label: "Admission Number", value: admission_no },
    { label: "Admission Year", value: admission_year.substring(0, 10) },
    { label: "Class of Admission", value: admitted_grade },
    { label: "Current Grade", value: grade },
    { label: "Extra-curricular activities", value: extra_activities },
    { label: "Conduct", value: conduct },
    { label: "Remark", value: remark },
    { label: "Special Aptitudes", value: special_aptitudes },
  ];

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
          <h3 className="student-head">Student Details</h3>

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

          <h3>Details of {studentData.details}</h3>
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

        <div className="vertical-line"></div>

        <div className="students-details">
          <h3>Academic Details</h3>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {academicDetails.map((row, index) => (
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
    </div>
  );
};

export default ProfilePage;
