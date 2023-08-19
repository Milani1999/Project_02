import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";

const TimeTable = () => {
  const [timeTableData, setTimeTableData] = useState([]);

  useEffect(() => {
    fetchTimeTable();
  }, []);

  const fetchTimeTable = async () => {
    try {
      const response = await axios.get("/api/timetable");
      setTimeTableData(response.data);
    } catch (error) {
      console.error("Error fetching time table data:", error);
    }
  };

  return (
    <div className="time-table">
      <table>
        <thead>
          <tr>
            <th>Periods</th>
            {timeTableData.map((rowData, index) => (
              <th key={index}>Day {rowData.weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }, (_, periodIndex) => (
            <tr key={periodIndex}>
              <td>Period {periodIndex + 1}</td>
              {timeTableData.map((rowData, index) => {
                const staffData = rowData.staff.find(
                  (staff) => staff.period === periodIndex + 1
                );
                return (
                  <td key={index}>
                    {staffData
                      ? `${staffData.subject} - ${staffData.staff_name}`
                      : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
