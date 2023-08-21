import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";
import LoadingSpinner from "../../Loading/Loading";

const TimeTable = () => {
  const periods = 8;
  const weekdays = 5;

  const [timetableData, setTimetableData] = useState([]);
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (grade !== "") {
      setLoading(true);
      axios
        .get(`/api/timetable/grade/${grade}`)
        .then((response) => {
          setTimetableData(response.data);
        })
        .catch((error) => {
          setTimetableData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [grade]);

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );
    if (matchingCell) {
      return `${matchingCell.subject}\n${matchingCell.staff_name.join("\n")}`;
    } else {
      return "";
    }
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <div className="time-table-admin">
      <div>
        <label>Select Grade:</label>
        <select value={grade} onChange={handleGradeChange}>
          <option value="">Select Grade</option>
          {Array.from({ length: 11 }, (_, index) => (
            <option key={index} value={index + 1}>
              Grade {index + 1}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="timeTable-admin">
          <thead>
            <tr>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: periods }).map((_, period) => (
              <tr key={period}>
                <td>Period : {period + 1}</td>
                {Array.from({ length: weekdays }).map((_, weekday) => (
                  <td
                    key={weekday}
                    className={
                      getCellData(weekday + 1, period + 1) === "No records"
                        ? "no-data-cell"
                        : ""
                    }
                  >
                    {getCellData(weekday + 1, period + 1)}
                  </td>
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
