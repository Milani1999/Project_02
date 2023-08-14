import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import moment from "moment";
import LoadingSpinner from "../../Loading/Loading";

const ViewStudentAttendance = ({}) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const studentId = user?.admissionNo;

  const fetchStudentAttendance = async () => {
    try {
      setIsLoading(true);

      if (!studentId) {
        console.error("Invalid student ID.");
        setIsLoading(false);
        return;
      }

      const formattedMonth = (selectedMonth + 1).toString().padStart(2, "0");
      const query = `/api/studentattendance/getByDateAndAdmissionNo?admission_no=${studentId}&date=${selectedYear}-${formattedMonth}`;

      const response = await fetch(query);
      const attendanceData = await response.json();

      if (
        !attendanceData ||
        attendanceData.message === "Attendance not found."
      ) {
        // No attendance data found for the selected month
        setAttendanceData([]);
      } else {
        setAttendanceData([attendanceData]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching student attendance:", error);
    }
  };

  useEffect(() => {
    fetchStudentAttendance();
  }, [selectedMonth, selectedYear]);

  return (
    <Container>
      <h1>View Student Attendance</h1>
      <div className="mb-3">
        {/* Month and year selection here */}
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
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{moment(entry.date).format("YYYY-MM-DD")}</td>
                <td>{moment(entry.arrivedTime).format("HH:mm:ss")}</td>
                <td>{entry.onTimeLate === "On-Time" ? "On-Time" : "Late"}</td>
                <td>{entry.present ? "Present" : "Absent"}</td>
              </tr>
            ))}
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

              // Check if the current date is after or equal to the loop date
              if (moment().isSameOrAfter(moment(date, "YYYY-MM-DD"), "day")) {
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
                      {attendanceEntry
                        ? attendanceEntry.present
                          ? <input
                          type="checkbox"
                          checked
                        />
                          : <input
                          type="checkbox"
                        />
                        : "-"}
                    </td>
                  </tr>
                );
              } else {
                return null; // Skip rendering rows for dates after the current date
              }
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewStudentAttendance;
