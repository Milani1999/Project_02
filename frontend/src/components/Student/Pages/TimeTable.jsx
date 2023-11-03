import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimeTable.css";
import LoadingSpinner from "../../Loading/Loading";
import { fetchStudentData } from "../../Count/Data";

const TimeTable = () => {
  const weekdays = 5;

  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.id;

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await fetchStudentData(studentId);
        const grade = data.grade;
        const timetableData = await fetchStaffTimeTableData(grade);
        setTimetableData(timetableData);
      } catch (error) {
        setLoading(false);
        setTimetableData([]);
      }
    };

    fetchStudentDetails();
    fetchStaff();
  }, [studentId]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/staff");
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchStaffTimeTableData = async (grade) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/timetable/grade/${grade}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching timetable details");
    }
  };

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );

    if (matchingCell) {
      const staffID = matchingCell.staff;
      const staff = staffData.find((record) => record._id === staffID);

      return (
        <div className="cell-data-time-table-student">
          <span style={{ fontWeight: "bolder" }}>{matchingCell.subject}</span>
          <br />({staff.fullname})
        </div>
      );
    } else {
      return "-";
    }
  };

  const times = [
    "07:45 am",
    "08:25 am",
    "09:10 am",
    "09:50 am",
    "10:45 am",
    "11:25 am",
    "12:10 pm",
    "12:50 pm",
  ];

  return (
    <div className="time-table-student">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="timeTable-student">
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, period) => (
              <tr key={period}>
                <td>{time}</td>
                {Array.from({ length: weekdays }).map((_, weekday) => (
                  <td key={weekday}>{getCellData(weekday + 1, period + 1)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeTable;
