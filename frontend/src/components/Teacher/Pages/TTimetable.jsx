import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TTimetable.css";
import LoadingSpinner from "../../Loading/Loading";

const TimeTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const staffId = user?.id;

  const weekdays = 5;

  const fetchStaffTimeTableData = async (staffId) => {
    try {
      const response = await axios.get(`/api/timetable/staff/${staffId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching timetable details");
    }
  };

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const data = await fetchStaffTimeTableData(staffId);
        setTimetableData(data);
      } catch (error) {
        alert("Error fetching staff details:", error);
      }
    };

    fetchStaffDetails();
  }, [staffId]);

  if (!timetableData) {
    return <LoadingSpinner />;
  }

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );

    if (matchingCell) {
      const Relief = matchingCell.temp;

      return Relief === "Relief" ? (
        <div className="cell-data-time-table-staff">
          <span style={{color:"red",fontWeight:"bold"}}>Relief<br/></span>
          <span className="staff-subject">{matchingCell.subject}</span>
          <br />
          Grade {matchingCell.grade}
        </div>
      ) : (
        <div className="cell-data-time-table-staff">
          <span className="staff-subject">{matchingCell.subject}</span>
          <br />
          Grade {matchingCell.grade}
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
    <div className="time-table-staff">
      <table className="timeTable-staff">
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
    </div>
  );
};

export default TimeTable;
