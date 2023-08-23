import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import moment from "moment";
import LoadingSpinner from "../../Loading/Loading";

const ViewStaffAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const staffEmployeeId = user?.employee_id;

  const fetchStaffAttendance = async () => {
    try {
      setIsLoading(true);

      if (!staffEmployeeId) {
        console.error("Invalid staff employee ID.");
        setIsLoading(false);
        return;
      }

      const formattedMonth = (selectedMonth + 1).toString().padStart(2, "0");
      const query = `/api/staffattendance/getByMonthYear?employee_id=${staffEmployeeId}&date=${selectedYear}-${formattedMonth}`;

      const response = await fetch(query);
      const attendanceRecords = await response.json();

      if (!attendanceRecords || attendanceRecords.length === 0) {
        setAttendanceData([]);
      } else {
        setAttendanceData(attendanceRecords);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching staff attendance:", error);
    }
  };

  useEffect(() => {
    fetchStaffAttendance();
  }, [selectedMonth, selectedYear]);

  return (
    <Container>
      <h1>View Staff Attendance</h1>
      <div className="mb-3">
        <label htmlFor="monthSelect">Select Month: </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {moment.months().map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => moment().year() - i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Arrived Time</th>
              <th>On-Time/Late</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          {/* <tbody>
            {Array.from(
              {
                length: moment(
                  `${selectedYear}-${selectedMonth + 1}`,
                  "YYYY-MM"
                ).daysInMonth(),
              },
              (_, day) => day + 1
            ).map((day) => {
              const date = moment(
                `${selectedYear}-${selectedMonth + 1}-${day}`,
                "YYYY-MM-DD"
              ).format("YYYY-MM-DD");

              const attendanceEntry = attendanceData.find((entry) =>
                moment(entry.date).isSame(moment(date, "YYYY-MM-DD"), "day")
              );

              return (
                <tr key={day}>
                  <td>{date}</td>
                  <td>
                    {attendanceEntry
                      ? moment(attendanceEntry.arrivedTime).format("HH:mm:ss")
                      : "-"}
                  </td>
                  <td>
                    {attendanceEntry ? (
                      attendanceEntry.onTimeLate === "On-Time" ? (
                        <span className="label label-success">
                          {attendanceEntry.onTimeLate}
                        </span>
                      ) : (
                        <span className="label label-danger">
                          &nbsp;&nbsp;&nbsp;&nbsp;{attendanceEntry.onTimeLate}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {attendanceEntry ? (
                      attendanceEntry.present ? (
                        <input type="checkbox" checked />
                      ) : (
                        <input type="checkbox" />
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody> */}
          <tbody>
  {Array.from(
    {
      length: moment(
        `${selectedYear}-${selectedMonth + 1}`,
        "YYYY-MM"
      ).daysInMonth(),
    },
    (_, day) => day + 1
  ).map((day) => {
    const date = moment(
      `${selectedYear}-${selectedMonth + 1}-${day}`,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");

    const currentDate = moment().format("YYYY-MM-DD");

    if (moment(date).isSameOrBefore(currentDate, "day")) {
      const attendanceEntry = attendanceData.find((entry) =>
        moment(entry.date).isSame(moment(date, "YYYY-MM-DD"), "day")
      );

      return (
        <tr key={day}>
          <td>{date}</td>
          <td>
            {attendanceEntry
              ? moment(attendanceEntry.arrivedTime).format("HH:mm:ss")
              : "-"}
          </td>
          <td>
            {attendanceEntry ? (
              attendanceEntry.onTimeLate === "On-Time" ? (
                <span className="label label-success">
                  {attendanceEntry.onTimeLate}
                </span>
              ) : (
                <span className="label label-danger">
                  &nbsp;&nbsp;&nbsp;&nbsp;{attendanceEntry.onTimeLate}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              )
            ) : (
              "-"
            )}
          </td>
          <td>
            {attendanceEntry ? (
              attendanceEntry.present ? (
                <input type="checkbox" checked />
              ) : (
                <input type="checkbox" />
              )
            ) : (
              "-"
            )}
          </td>
        </tr>
      );
    } else {
      return null; // Don't render upcoming dates
    }
  })}
</tbody>

        </Table>
      )}
    </Container>
  );
};

export default ViewStaffAttendance;
