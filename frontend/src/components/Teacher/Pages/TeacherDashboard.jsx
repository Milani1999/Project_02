import React, { useState, useEffect } from "react";
import { FcCollaboration, FcBusinesswoman, FcKindle } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import "./TeachDashboard.css";
import { Calendar, theme } from "antd";
import {
  fetchStaffCount,
  fetchStudentCount,
  processData,
} from "../../Count/Count";
import { StudentData } from "../../Count/Data";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [classWise, setClassWise] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffCount = await fetchStaffCount();
        const studentCount = await fetchStudentCount();
        const studentData = await StudentData();
        const processedData = processData(studentData);

        setClassWise(processedData);
        setStaffCount(staffCount);
        setStudentCount(studentCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const data = classWise.map(({ name, grade, students }) => ({
    name,
    grade,
    students,
  }));

  const config = {
    data,
    isGroup: true,
    xField: "grade",
    yField: "students",
    seriesField: "name",

    label: {
      position: "middle",

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div>
      <h3 className="mb-4 title">Welcome to UCS Family!!</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3  ">
          <div>
            <h3 className="desc">Students</h3>
            <h4 className="mb-0 sub-title">{studentCount}</h4>
          </div>

          <h6 className="stu">
            <FcCollaboration />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Teachers</h3>
            <h4 className="mb-0 sub-title">{staffCount}</h4>
          </div>

          <h6 className="red">
            <FcBusinesswoman />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <h3 className="desc">Classes</h3>
            <h4 className="mb-0 sub-title">11</h4>
          </div>

          <h6 className="green">
            <FcKindle />
          </h6>
        </div>
      </div>
      <div className="d-flex">
        <div className="mt-4  custombar-width  ">
          <h3 className="mb-5 title">No of Students in Each class</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="d-flex=2  flex-grow-1 custom1 roudned-3 ">
          <div style={wrapperStyle}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
