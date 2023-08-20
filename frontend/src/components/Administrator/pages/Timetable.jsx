import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";

const TimeTable = () => {
  const periods = 8;
  const weekdays = 5;

  const [timetableData, setTimetableData] = useState([]);
  const [grade, setGrade] = useState("");

  useEffect(() => {
    if (grade !== "") {
      axios
        .get(`/api/timetable/grade/${grade}`)
        .then((response) => {
          setTimetableData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching timetable data:", error);
        });
    }
  }, [grade]); // Include 'grade' as a dependency here

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );
    if (matchingCell) {
      return `${matchingCell.subject} - ${matchingCell.staff_name.join(", ")}`;
    }
    return "";
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <div className="time-table">
      <div>
        <label>Select Grade:</label>
        <select value={grade} onChange={handleGradeChange}>
          <option value="">Select</option>
          {Array.from({ length: 11 }, (_, index) => (
            <option key={index} value={index + 1}>
              Grade {index + 1}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: periods }).map((_, period) => (
            <tr key={period}>
              <td>Period : {period + 1}</td>
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
