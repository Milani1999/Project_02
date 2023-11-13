import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import QRScanner from "../../QrCode/StuQRScanner";
import "reactjs-popup/dist/index.css";
import Chart from "chart.js/auto";
import Clock from "../../Clock/Clock";
import "./StudentAttendance.css";
import LoadingSpinner from "../../Loading/Loading";

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setShowDeletePopup(true);
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
  };
  const confirmDelete = async () => {
    try {
      await fetch(`/api/studentattendance/${deleteID}`, {
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
      setIsLoading(true);
      const response = await fetch(
        `/api/studentattendance/getByDate?date=${selectedDate.toISOString()}&grade=${selectedGrade}`
      );
      const attendanceData = await response.json();

      setAttendanceData(attendanceData);
      setIsLoading(false);
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
        const chart = new Chart(chartRef.current, {
          type: "pie",
          data: data,
          options: {
            plugins: {
              legend: {
                display: true,
              },
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = data.labels[tooltipItem.dataIndex];
                  const value = data.datasets[0].data[tooltipItem.dataIndex];
                  return `${label}: ${value}`;
                },
              },
            },
          },
        });

        chart.update(); // Force the chart to update
      }
    }, [data]);

    return <canvas ref={chartRef} width={width} height={height} />;
  };

  const presentCount = attendanceData.reduce((count, entry) => {
    if (entry.attendance && entry.attendance.present) {
      return count + 1;
    }
    return count;
  }, 0);

  const absentCount = attendanceData.length - presentCount;
  const calculateOnTimeLateCounts = () => {
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

    return {
      onTimeCount,
      lateCount,
    };
  };

  const onTimeLateCounts = calculateOnTimeLateCounts();

  const getFormattedMaxDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Container>
      <div class="nine">
        <h1>
          STUDENTS<span>Attendance Record</span>
        </h1>
      </div>
      <Row className="mb-3">
        <Col md={5}>
          <label className="label_selectdate" htmlFor="datePicker">
            Select Date:{" "}
          </label>
          <input
            className="datepicker_attendance"
            type="date"
            id="datePicker"
            min=""
            max={getFormattedMaxDate()}
            value={selectedDate.toISOString().substr(0, 10)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </Col>

        <br />

        <Col md={3}>
          <label className="label_selectgrade" htmlFor="gradeSelect">
            Select Grade:{" "}
          </label>
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Row>
            <Col md={3}>
              <PieChart
                data={{
                  labels: ["Present", "Absent"],
                  datasets: [
                    {
                      data: [presentCount, absentCount],
                      backgroundColor: ["#36A2EB", "#d9534f"],
                    },
                  ],
                }}
                width={100}
                height={100}
              />
            </Col>
            <Col md={6}>
              <Clock />
            </Col>
            <Col md={3}>
              <PieChart
                data={{
                  labels: ["On-Time", "Late"],
                  datasets: [
                    {
                      data: [
                        onTimeLateCounts.onTimeCount,
                        onTimeLateCounts.lateCount,
                      ],
                      backgroundColor: ["#5cb85c", "#d9534f"],
                    },
                  ],
                }}
                width={100}
                height={100}
              />
            </Col>
          </Row>
          <Table className="styled-table" striped bordered hover>
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
        </div>
      )}
      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background-staff">
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

export default StudentAttendance;
