import React, { useState, useEffect } from "react";
import { FcCollaboration, FcBusinesswoman, FcKindle } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import { Progress, Space } from "antd";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import "./Dashboard.css";
import {
  fetchStaffCount,
  fetchStudentCount,
  processData,
} from "../../Count/Count";
import { StudentData } from "../../Count/Data";

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

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Students</h3>
            <h4 className="count">{studentCount}</h4>
          </div>

          <h6 className="stu">
            <FcCollaboration />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Teachers</h3>
            <h4 className="count">{staffCount}</h4>
          </div>

          <h6 className="red">
            <FcBusinesswoman />
          </h6>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
          <div>
            <h3 className="desc">Classes</h3>
            <h4 className="count">11</h4>
          </div>

          <h6 className="green">
            <FcKindle />
          </h6>
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex=2  flex-grow-1 custom roudned-3 ">
          <div>
            <h3 className="desc">Today Attendence</h3>

            <Space wrap>
              <h4>Teachers</h4>
              <Progress type="dashboard" percent={75} />
              <br></br> <h4>Students</h4>
              <Progress type="dashboard" percent={20} gapDegree={30} />
            </Space>
          </div>
        </div>
        <div className="mt-4  custombar-width  ">
          <h3 className="mb-5 title">No of Students in Each class</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
      </div>
      <div className="mt-4 custombar-width  d-flex   flex-grow-1 gap-3 roudned-3">
        {/* YouTube Followers Card */}
        <div className="followers-card">
          <AiFillYoutube className="icon youtube-icon" />
          <h3>YouTube</h3>
          <div className="followers-count">1000+ Followers</div>
        </div>
        <div className="followers-card">
          <AiFillFacebook className="icon facebook-icon" />
          <h3>Facebook</h3>
          <div className="followers-count">500+ Followers</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
