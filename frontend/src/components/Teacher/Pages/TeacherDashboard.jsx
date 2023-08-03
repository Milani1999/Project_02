import React, {useState, useEffect} from "react";
import { FcCollaboration, FcBusinesswoman, FcKindle } from "react-icons/fc";
import { Column } from "@ant-design/plots";
import "./TeachDashboard.css";
import { Calendar, theme } from "antd";
import {
  fetchStaffCount,
  fetchStudentCount,
} from "../../Count/Count";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
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
      console.log(staffCount)
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
