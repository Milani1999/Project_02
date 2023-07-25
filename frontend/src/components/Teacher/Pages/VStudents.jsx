import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import './VStudents.css'

function VStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setSelectedStudent(null);
    setShowViewPopup(false);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const filteredStudents = selectedGrade
    ? students.filter((student) => student.grade.toString() === selectedGrade)
    : students;

  return (
    <div>
      <Table striped hover className="mt-5" responsive="sm">
        <thead>
          <tr>
            <th colSpan={6}>
              <div>
                <label htmlFor="gradeSelect">Select Grade: </label>
                <select
                  id="gradeSelect"
                  value={selectedGrade}
                  onChange={handleGradeChange}
                >
                  <option value="">All Grades</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th style={{ textAlign: "center", width: "100px" }}></th>
          </tr>
          <tr>
            <th style={{ textAlign: "center" }}>Picture</th>
            <th style={{ textAlign: "center" }}>Admission No</th>
            <th style={{ textAlign: "center" }}>Admission Date</th>
            <th style={{ textAlign: "center" }}>Full Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone No</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td style={{ verticalAlign: "middle" }}>
                <img
                  src={student.picture}
                  alt="Profile"
                  width="100"
                  height="100"
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {student.admission_no}
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {new Date(student.admission_year).toLocaleDateString()}
              </td>
              <td style={{ verticalAlign: "middle" }}>{student.fullname}</td>
              <td style={{ verticalAlign: "middle" }}>{student.address}</td>
              <td style={{ verticalAlign: "middle" }}>{student.phone}</td>
              <td style={{ verticalAlign: "middle" }}>
                <Button
                  variant="success"
                  onClick={() => handleView(student)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
        <div className="popup-background">
          {selectedStudent && (
            <div className="popup-container-view">
              <table
                style={{ textAlign: "right"}}
                className="viewTableStudentsStaff"
              >
                <tr>
                  <td colSpan={2} style={{ textAlign: "center"}}>
                    <img
                      src={selectedStudent.picture}
                      alt="Profile"
                      width="100"
                      height="100"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Admission No</td>
                  <td>{selectedStudent.admission_no}</td>
                </tr>
                <tr>
                  <td>Full Name</td>
                  <td>{selectedStudent.fullname}</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>{selectedStudent.first_name}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{selectedStudent.last_name}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{selectedStudent.address}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>
                    {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{selectedStudent.phone}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{selectedStudent.gender}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{selectedStudent.username}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{selectedStudent.role}</td>
                </tr>
                <tr>
                  <td>Parent Name</td>
                  <td>{selectedStudent.parent_Name}</td>
                </tr>
                <tr>
                  <td>Parent Occupation</td>
                  <td>{selectedStudent.parent_occupation}</td>
                </tr>
                <tr>
                  <td>Admission Date</td>
                  <td>
                    {new Date(
                      selectedStudent.admission_year
                    ).toLocaleDateString()}
                  </td>
                </tr>
                <tr>
                  <td>Grade</td>
                  <td>{selectedStudent.grade}</td>
                </tr>
                <tr>
                  <td>Extra Activities</td>
                  <td>{selectedStudent.extra_activities}</td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Button
                      variant="secondary"
                      onClick={handleCloseViewPopup}
                      className="mt-3"
                    >
                      Close
                    </Button>
                  </td>
                </tr>
              </table>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
}

export default VStudents;
