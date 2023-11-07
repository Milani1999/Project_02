import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardUser,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { Progress, Space } from "antd";
import { fetchStaffCount, fetchStudentCount } from "../../Count/Count";
import { fetchStudentData } from "../../Count/Data";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import LoadingSpinner from "../../Loading/Loading";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [numOfClass, setNumOfClass] = useState(0);
  const [todayAtt, setTodayAttendance] = useState(0);
  const [grade, setGrade] = useState(null);
  const [genderData, setGenderData] = useState(null);

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

    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);

  useEffect(() => {
    if (studentData) {
      setGrade(studentData.grade);
    }
  }, [studentData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffCount = await fetchStaffCount();
        const studentCount = await fetchStudentCount();

        setStaffCount(staffCount);
        setStudentCount(studentCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const classTotal = async () => {
    try {
      const response = await axios.get(`/api/students/grade/${grade}`);
      setGenderData(response.data);
      setNumOfClass((prevNum) => response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const todayAttendance = async () => {
    try {
      const current = new Date().toISOString().substr(0, 10);

      const response = await axios.get(
        `/api/studentattendance/getByDate?date=${current}&grade=${grade}`
      );
      const studentattendance = response.data;
      const filteredAttendance = studentattendance.filter(
        (row) => row.attendance !== null
      );
      setTodayAttendance(filteredAttendance.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    classTotal();
    todayAttendance();
  }, [grade]);

  if (!genderData) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  let gTotal = 0;
  let bTotal = 0;

  if (genderData) {
    genderData.map((g) => {
      if (g.gender === "Male") {
        bTotal++;
      } else {
        gTotal++;
      }
    });
  }

  const data01 = [
    { name: "Girls", value: gTotal },
    { name: "Boys", value: bTotal },
  ];

  const data02 = [
    { name: "Present", value: todayAtt },
    { name: "Absent", value: numOfClass - todayAtt },
  ];

  const COLORS = ["#062925", "#044a42"];
  const COLORS_1 = ["#004a2f", "#45171d"];

  return (
    <div className="stu-dashboard">
      <h2>School Details</h2>
      <div className="d-flex justify-content-between align-items-center gap-3 mt-2">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Students</h3>
            <h4 className="count">{studentCount}</h4>
          </div>
          <FontAwesomeIcon icon={faUserGraduate} beat className="font-img" />
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Teachers</h3>
            <h4 className="count">{staffCount}</h4>
          </div>
          <FontAwesomeIcon icon={faChalkboardUser} beat className="font-img" />
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Classes</h3>
            <h4 className="count">11</h4>
          </div>
          <FontAwesomeIcon icon={faSchool} beat className="font-img" />
        </div>
      </div>

      <h2>Grade {grade}</h2>
      <div className="container">
        <div className="row" style={{ width: "700px" }}>
          <div className="col-6">
            <h3 className="desc_stu">Total Students : {numOfClass}</h3>
            <PieChart width={280} height={280}>
              <Pie
                dataKey="value"
                data={data01}
                cx={140}
                cy={140}
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {data01.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="col-6">
            <h3 className="desc_stu">Total Attendance</h3>
            <PieChart width={280} height={280}>
              <Pie
                dataKey="value"
                data={data02}
                cx={140}
                cy={140}
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {data01.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_1[index % COLORS_1.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
