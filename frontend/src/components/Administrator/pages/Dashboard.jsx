import React, { useState, useEffect } from "react";
import { FcCollaboration, FcBusinesswoman, FcKindle } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import { Progress, Space } from "antd";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import "./Dashboard.css";
import { fetchStaffCount, fetchStudentCount } from "../../Count/Count";

const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);
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

  const data = [
    {
      name: "Girls",
      Class: "01",
      students: 18,
    },
    {
      name: "Girls",
      Class: "02",
      students: 10,
    },
    {
      name: "Girls",
      Class: "03",
      students: 8,
    },
    {
      name: "Girls",
      Class: "04",
      students: 13,
    },
    {
      name: "Girls",
      Class: "05",
      students: 10,
    },
    {
      name: "Girls",
      Class: "06",
      students: 20,
    },
    {
      name: "Girls",
      Class: "07",
      students: 18,
    },
    {
      name: "Girls",
      Class: "08",
      students: 10,
    },
    {
      name: "Girls",
      Class: "09",
      students: 11,
    },
    {
      name: "Girls",
      Class: "10",
      students: 10,
    },
    {
      name: "Girls",
      Class: "11",
      students: 25,
    },
    {
      name: "Boys",
      Class: "01",
      students: 8,
    },
    {
      name: "Boys",
      Class: "02",
      students: 14,
    },
    {
      name: "Boys",
      Class: "03",
      students: 18,
    },
    {
      name: "Boys",
      Class: "04",
      students: 10,
    },
    {
      name: "Boys",
      Class: "05",
      students: 14,
    },
    {
      name: "Boys",
      Class: "06",
      students: 15,
    },
    {
      name: "Boys",
      Class: "07",
      students: 8,
    },
    {
      name: "Boys",
      Class: "08",
      students: 16,
    },
    {
      name: "Boys",
      Class: "09",
      students: 6,
    },
    {
      name: "Boys",
      Class: "10",
      students: 15,
    },
    {
      name: "Boys",
      Class: "11",
      students: 15,
    },
  ];
  const config = {
    data,
    // classWiseData,
    isGroup: true,
    xField: "Class",
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
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg p-3 roudned-3">
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
