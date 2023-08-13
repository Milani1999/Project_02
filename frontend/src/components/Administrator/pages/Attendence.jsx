import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import QRScanner from "../../QrCode/QRScanner";

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

  return (
    <Container>
      <h1>Student Attendance Dashboard</h1>
      <Row className="mb-3">
        <Col md={4}>
          <h3>Filter Options</h3>
          <label htmlFor="datePicker">Select Date: </label>
          <input
            type="date"
            id="datePicker"
            value={selectedDate.toISOString().substr(0, 10)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
          <br />
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
        <Col md={8}>
          <QRScanner fetchStudentAttendance={fetchStudentAttendance} />
        </Col>
      </Row>
      <h3>Attendance Records</h3>
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
                      {attendance.onTimeLate}{" "}
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
