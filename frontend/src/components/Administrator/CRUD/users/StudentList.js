import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Alert, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import "react-datepicker/dist/react-datepicker.css";
import AddStudents from "./AddStudents";
import './students.css';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setSelectedStudent(null);
    setShowEditPopup(false);
    setErrorMessage("");
    setSuccessMessage("");
  };



  const handleEditSubmit = async () => {
    try {
      const { _id, admission_no, ...updatedStudentData } = selectedStudent;
      const existingStudent = students.find((student) => student.admission_no === admission_no);

      if (existingStudent && existingStudent._id !== _id) {
        setErrorMessage("Admission number already exists. Please choose a different admission number.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(`/api/students/${_id}`, updatedStudentData, config);
      if (data.success) {
        const updatedStudents = students.map((student) =>
          student._id === _id ? { ...student, ...updatedStudentData } : student
        );
        setStudents(updatedStudents);
        setSelectedStudent(null);
        setShowEditPopup(false);
        setSuccessMessage("Student details updated successfully.");
        setShowSuccessMessage(true);
      } else {
        setErrorMessage("Error updating student details. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error updating student details. Please try again.");
    }
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedStudent(null);
    setShowDeletePopup(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedStudent;
      const { data } = await axios.delete(`/api/students/${_id}`);
      if (data.success) {
        const updatedStudents = students.filter((student) => student._id !== _id);
        setStudents(updatedStudents);
        setSelectedStudent(null);
        setShowDeletePopup(false);
        setSuccessMessage("Student deleted successfully.");
        setErrorMessage("");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error deleting student. Please try again.");
    }
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const filteredStudents = selectedGrade
    ? students.filter((student) => student.grade.toString() === selectedGrade)
    : students;

  return (
    <div>
      {showSuccessMessage && (
        <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
          {successMessage}
        </Alert>
      )}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Table striped hover className="mt-5" responsive="sm">
        <thead>
          <tr>
            <th colSpan={6}>
              <div>
                <label htmlFor="gradeSelect">Select Grade: </label>
                <select id="gradeSelect" value={selectedGrade} onChange={handleGradeChange}>
                  <option value="">All Grades</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th style={{ textAlign: 'center', width: '100px' }}>
              <AddStudents />
            </th>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}>Picture</th>
            <th style={{ textAlign: 'center' }}>Admission No</th>
            <th style={{ textAlign: 'center' }}>Admission Date</th>
            <th style={{ textAlign: 'center' }}>Full Name</th>
            <th style={{ textAlign: 'center' }}>Address</th>
            <th style={{ textAlign: 'center' }}>Phone No</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td style={{ verticalAlign: 'middle' }}>
                <img src={student.picture} alt="Profile" width="100" height="100" />
              </td>
              <td style={{ verticalAlign: 'middle' }}>{student.admission_no}</td>
              <td style={{ verticalAlign: 'middle' }}>{new Date(student.admission_year).toLocaleDateString()}</td>
              <td style={{ verticalAlign: 'middle' }}>{student.fullname}</td>
              <td style={{ verticalAlign: 'middle' }}>{student.address}</td>
              <td style={{ verticalAlign: 'middle' }}>{student.phone}</td>
              <td style={{ verticalAlign: 'middle' }}>
                <Button variant="info" onClick={() => handleView(student)} className="m-1" style={{ width: '100px' }}>
                  View
                </Button><br />
                <Button variant="success" onClick={() => handleEdit(student)} className="m-1" style={{ width: '100px' }}>
                  Edit
                </Button><br />
                <Button variant="danger" onClick={() => handleDelete(student)} className="m-1" style={{ width: '100px' }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
        {selectedStudent && (
          <div className="popup-container-view">
            <table style={{ textAlign: 'right' }} className="viewTable">
              <tr>
                <td colSpan={2}>
                  <img src={selectedStudent.picture} alt="Profile" width="100" height="100" />
                </td>
              </tr>
              <tr>
                <td>Admission No</td>
                <td>{selectedStudent.admission_no}</td>
              </tr>
              <tr>
                <td>Full Name</td><td>{selectedStudent.fullname}</td></tr>
              <tr><td>First Name</td><td>{selectedStudent.first_name}</td></tr>
              <tr><td>Last Name</td><td>{selectedStudent.last_name}</td></tr>
              <tr><td>Address</td><td>{selectedStudent.address}</td></tr>
              <tr><td>Date of Birth</td><td>{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</td></tr>
              <tr><td>Phone</td><td>{selectedStudent.phone}</td></tr>
              <tr><td>Gender</td><td>{selectedStudent.gender}</td></tr>
              <tr><td>Username</td><td>{selectedStudent.username}</td></tr>
              <tr><td>Role</td><td>{selectedStudent.role}</td></tr>
              <tr><td>Parent Name</td><td>{selectedStudent.parent_Name}</td></tr>
              <tr><td>Parent Occupation</td><td>{selectedStudent.parent_occupation}</td></tr>
              <tr><td>Admission Date</td><td>{new Date(selectedStudent.admission_year).toLocaleDateString()}</td></tr>
              <tr><td>Grade</td><td>{selectedStudent.grade}</td></tr>
              <tr><td>Extra Activities</td><td>{selectedStudent.extra_activities}</td></tr>
              <tr>
                <td colSpan={2}>
                  <Button variant="secondary" onClick={handleCloseViewPopup} className="mt-3">
                    Close
                  </Button>
                </td>
              </tr>
            </table>
          </div>
        )}
      </Popup>

      <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
        {selectedStudent && (
          <div className="popup-container">
            <form onSubmit={handleEditSubmit}>
              <Row>
                <Col md={6}>
                  <div>
                    <Form.Label>Admission No</Form.Label>
                    <Form.Control
                      type="text"
                      id="admission_no"
                      name="admission_no"
                      value={selectedStudent.admission_no}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, admission_no: e.target.value })}
                    />
                  </div>

                  {/* <div>
                    <label htmlFor="picture">Picture</label>
                    <Form.Control
                      type="file"
                      id="picture"
                      name="picture"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setSelectedStudent({ ...selectedStudent, picture: file });
                      }}
                    />
                  </div> */}

                  <div>
                    <label htmlFor="fullname">Full Name</label>
                    <Form.Control
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={selectedStudent.fullname}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, fullname: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <Form.Control
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={selectedStudent.first_name}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, first_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Form.Control
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={selectedStudent.last_name}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, last_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="address">Address</label>
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      value={selectedStudent.address}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Form.Control
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={selectedStudent.dateOfBirth ? selectedStudent.dateOfBirth.slice(0, 10) : ""}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          dateOfBirth: e.target.value ? e.target.value : null,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone</label>
                    <Form.Control
                      type="text"
                      id="phone"
                      name="phone"
                      value={selectedStudent.phone}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <Form.Control
                      type="text"
                      id="gender"
                      name="gender"
                      value={selectedStudent.gender}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <Form.Control
                      type="text"
                      id="username"
                      name="username"
                      value={selectedStudent.username}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      value={selectedStudent.password}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, password: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="role">Role</label>
                    <Form.Control
                      type="text"
                      id="role"
                      name="role"
                      value={selectedStudent.role}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="parent_Name">Parent Name</label>
                    <Form.Control
                      type="text"
                      id="parent_Name"
                      name="parent_Name"
                      value={selectedStudent.parent_Name}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, parent_Name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="parent_occupation">Parent Occupation</label>
                    <Form.Control
                      type="text"
                      id="parent_occupation"
                      name="parent_occupation"
                      value={selectedStudent.parent_occupation}
                      onChange={(e) =>
                        setSelectedStudent({ ...selectedStudent, parent_occupation: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="admission_year">Admission Year</label>
                    <Form.Control
                      type="date"
                      id="admission_year"
                      name="admission_year"
                      value={selectedStudent.admission_year ? selectedStudent.admission_year.slice(0, 10) : ""}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          admission_year: e.target.value ? e.target.value : null,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="grade">Grade</label>
                    <Form.Control
                      type="text"
                      id="grade"
                      name="grade"
                      value={selectedStudent.grade}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="extra_activities">Extra Activities</label>
                    <Form.Control
                      type="text"
                      id="extra_activities"
                      name="extra_activities"
                      value={selectedStudent.extra_activities}
                      onChange={(e) =>
                        setSelectedStudent({ ...selectedStudent, extra_activities: e.target.value })
                      }
                    />
                  </div>
                  <Button variant="success" type="submit" className="mt-5">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCloseEditPopup} className="mt-5 mx-3">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </form>
          </div>

        )}
      </Popup>

      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-container-delete">
          <h3>Delete Student</h3>
          <p>Are you sure you want to delete this student?</p>
          {selectedStudent && (
            <div>
              <p>Admission No: {selectedStudent.admission_no}</p>
              <p>Full Name: {selectedStudent.fullname}</p>
            </div>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Button variant="secondary" onClick={handleCloseDeletePopup} className="mx-2">
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} className="mx-2">
            Delete
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default ViewStudents;