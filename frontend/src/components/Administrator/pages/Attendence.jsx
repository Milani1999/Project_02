import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import QRScanner from "../../QrCode/QRScanner";
import "reactjs-popup/dist/index.css";
import Chart from "chart.js/auto";
import Clock from "../../Clock/Clock";
import "./Attendence.css";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [deleteName, setDeleteName] = useState("");

  const handleDelete = () => {
    setShowDeletePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };
  const confirmDelete = async () => {
    try {
      await fetch(`/api/attendance/${deleteID}`, {
        method: "DELETE",
      });
      setShowDeletePopup(false);
      fetchStudentAttendance();

      // alert("Student attendance deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student attendance");
    }
  };

  const fetchStudentAttendance = async () => {
    try {
      const response = await fetch(
        `/api/attendance/getByDate?date=${selectedDate.toISOString()}&grade=${selectedGrade}`
      );
      const attendanceData = await response.json();

      setAttendanceData(attendanceData);
    } catch (error) {
      console.error("Error fetching student attendance:", error);
    }
  };

  useEffect(() => {
    fetchStudentAttendance();
  }, [selectedDate, selectedGrade]);

  const handleAttendanceChange = async (studentId, attendance) => {
    try {
      if (attendance) {
        handleDelete();
        setDeleteID(attendance._id);
        setDeleteName(attendance.admission_no);
      } else {
        // // Create new attendance record
        // const response = await fetch("/api/attendance/take", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     admission_no: studentId,
        //   }),
        // });
        // const data = await response.json();
        // console.log(data);
        alert("Error in deleting. No record found.");
      }

      // Refresh attendance data after the change
      fetchStudentAttendance();
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const PieChart = ({ data, width, height }) => {
    const chartRef = useRef();

    useEffect(() => {
      if (chartRef.current) {
        new Chart(chartRef.current, {
          type: "pie",
          data: data,
        });
      }
    }, [data]);

    return <canvas ref={chartRef} width={width} height={height} />;
  };

  const calculateAttendancePercentage = () => {
    const totalStudents = attendanceData.length;
    let presentCount = 0;
    attendanceData.forEach((entry) => {
      if (entry.attendance && entry.attendance.present) {
        presentCount++;
      }
    });

    const absentCount = totalStudents - presentCount;
    const presentPercentage = ((presentCount / totalStudents) * 100).toFixed(2);
    const absentPercentage = ((absentCount / totalStudents) * 100).toFixed(2);

    return {
      presentPercentage,
      absentPercentage,
    };
  };

  const calculateOnTimeLatePercentage = () => {
    let onTimeCount = 0;
    let lateCount = 0;

    attendanceData.forEach((entry) => {
      if (entry.attendance && entry.attendance.onTimeLate) {
        if (entry.attendance.onTimeLate === "On-Time") {
          onTimeCount++;
        } else {
          lateCount++;
        }
      }
    });

    const totalStudents = onTimeCount + lateCount;
    const onTimePercentage = ((onTimeCount / totalStudents) * 100).toFixed(2);
    const latePercentage = ((lateCount / totalStudents) * 100).toFixed(2);

    return {
      onTimePercentage,
      latePercentage,
    };
  };

  const attendancePercentage = calculateAttendancePercentage();
  const onTimeLatePercentage = calculateOnTimeLatePercentage();

  return (
    <Container>
      <h1>Student Attendance</h1>
      <Row className="mb-3">
        <Col md={5}>
          <label htmlFor="datePicker">Select Date: </label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate.toISOString().substr(0, 10)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </Col>
        <br />

        <Col md={3}>
          <label htmlFor="gradeSelect">Select Grade: </label>
          <select
            id="gradeSelect"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(parseInt(e.target.value))}
          >
            {[...Array(11).keys()].map((grade) => (
              <option key={grade} value={grade + 1}>
                Grade {grade + 1}
              </option>
            ))}
          </select>
        </Col>
        <Col md={4}>
          <QRScanner fetchStudentAttendance={fetchStudentAttendance} />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <PieChart
            data={{
              labels: ["Present", "Absent"],
              datasets: [
                {
                  data: [
                    parseFloat(attendancePercentage.presentPercentage),
                    parseFloat(attendancePercentage.absentPercentage),
                  ],
                  backgroundColor: ["#36A2EB", "#d9534f"],
                },
              ],
            }}
            width={100} // Adjust the width as needed
            height={100} // Adjust the height as needed
          />
        </Col>
        <Col md={6}>
          <Clock />
        </Col>
        <Col md={3}>
          {/* Display the on-time/late pie chart */}
          <PieChart
            data={{
              labels: ["On-Time", "Late"],
              datasets: [
                {
                  data: [
                    parseFloat(onTimeLatePercentage.onTimePercentage),
                    parseFloat(onTimeLatePercentage.latePercentage),
                  ],
                  backgroundColor: ["#5cb85c", "#d9534f"],
                },
              ],
            }}
            width={100} // Adjust the width as needed
            height={100} // Adjust the height as needed
          />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Admission No</th>
            <th>Full Name</th>
            <th>Grade</th>
            <th>Arrived Time</th>
            <th>On-Time/Late</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => {
            const student = entry.student;
            const attendance = entry.attendance;

            return (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.admission_no}</td>
                <td>{student.fullname}</td>
                <td>{student.grade}</td>
                <td>
                  {attendance && attendance.arrivedTime
                    ? new Date(attendance.arrivedTime).toLocaleTimeString(
                        "en-US"
                      )
                    : "-"}
                </td>
                <td>
                  {attendance &&
                  attendance.onTimeLate &&
                  attendance.onTimeLate === "On-Time" ? (
                    <span className="label label-success">
                      {attendance.onTimeLate}
                    </span>
                  ) : attendance ? (
                    <span className="label label-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;{attendance.onTimeLate}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  {attendance && attendance.present ? (
                    <input
                      type="checkbox"
                      checked={attendance.present}
                      onChange={() =>
                        handleAttendanceChange(student._id, attendance)
                      }
                    />
                  ) : (
                    <input type="checkbox" checked={false} disabled />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background">
          <div className="popup-container-delete">
            <h3>Delete Attendance</h3>
            <p>Are you sure you want to delete this student attendance?</p>
            {
              <div>
                <p>{deleteName}</p>
              </div>
            }
            <Button variant="danger" onClick={confirmDelete} className="mx-2">
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={handleCloseDeletePopup}
              className="mx-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Popup>
    </Container>
  );
};

export default Attendance;
