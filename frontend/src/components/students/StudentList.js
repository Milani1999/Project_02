import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import AddStudents from "./AddStudents";
import "./students.css";
import QrGenerator from "../QrCode/QrGenerator";
import LoadingSpinner from "../Loading/Loading";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/students");
      setStudents(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedStudentData } = selectedStudent;

      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "edutrack");
        data.append("cloud_name", "dprnxaqxi");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dprnxaqxi/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const cloudinaryData = await response.json();
        updatedStudentData.picture = cloudinaryData.url.toString();
      }

      await axios.put(`/api/students/${_id}`, updatedStudentData);
      setShowEditPopup(false);
      setIsLoading(true);
      fetchStudents();
      alert("Student updated successfully.");
      setImageFile(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("Please fill all the fields");
    }
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedStudent({});
    setShowDeletePopup(false);
  };

  const confirmLeave = async () => {
    try {
      const { _id } = selectedStudent;
      await axios.delete(`/api/oldstudents/${_id}`);
      setShowDeletePopup(false);
      fetchStudents();
      alert("Student moved to old students' list successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to move student");
    }
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedStudent;
      await axios.delete(`/api/students/${_id}`);
      setShowDeletePopup(false);
      fetchStudents();
      alert("Student deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const filteredStudents = selectedGrade
    ? students.filter((student) => student.grade.toString() === selectedGrade)
    : students;

  let view_std_1 = [];
  let view_std_2 = [];
  let view_std_3 = [];

  if (selectedStudent) {
    view_std_1 = [
      { label: "Full Name", value: selectedStudent.fullname },
      { label: "First Name", value: selectedStudent.first_name },
      { label: "Last Name", value: selectedStudent.last_name },
      { label: "Address", value: selectedStudent.address },
      {
        label: "Date of Birth",
        value: new Date(selectedStudent.dateOfBirth).toLocaleDateString(),
      },
      { label: "Gender", value: selectedStudent.gender },
    ];

    view_std_2 = [
      { label: "Admission No", value: selectedStudent.admission_no },
      { label: "Email", value: selectedStudent.email },
      { label: "Current Grade", value: selectedStudent.grade },
      {
        label: "Admission Year",
        value: new Date(selectedStudent.admission_year).toLocaleDateString(),
      },
      { label: "Admitted Grade", value: selectedStudent.admitted_grade },
      {
        label: "Extra curricular activities",
        value: selectedStudent.extra_activities,
      },
      { label: "Conduct", value: selectedStudent.conduct },
      { label: "Special aptitudes", value: selectedStudent.special_aptitudes },
      { label: "Remark", value: selectedStudent.remark },
    ];

    view_std_3 = [
      { label: "Name", value: selectedStudent.parent_Name },
      {
        label: "Occupation",
        value: selectedStudent.parent_occupation,
      },
      { label: "Phone", value: selectedStudent.phone },
    ];
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                <th style={{ textAlign: "center", width: "100px" }}>
                  <AddStudents fetchStudents={fetchStudents} />
                </th>
              </tr>
              <tr className="colname">
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
                  <td style={{ verticalAlign: "middle" }}>
                    {student.fullname}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{student.address}</td>
                  <td style={{ verticalAlign: "middle" }}>{student.phone}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Button
                      variant="info"
                      onClick={() => handleView(student)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      View
                    </Button>
                    <br />
                    <Button
                      variant="success"
                      onClick={() => handleEdit(student)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      Edit
                    </Button>
                    <br />
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(student)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
            <div className="popup-background-student">
              {selectedStudent && (
                <div className="popup-container-view-std">
                  <table className="viewTableStudents">
                    <div style={{ textAlign: "right" }}>
                      <button
                        onClick={handleCloseViewPopup}
                        className="button-close-view-std"
                      >
                        X
                      </button>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <img
                          src={selectedStudent.picture}
                          alt="Profile"
                          width="100"
                          height="100"
                        />
                        <h3>Personal Details</h3>
                        <div className="row1">
                          {view_std_1.map((std, index) => (
                            <tr key={index}>
                              <td>{std.label}</td>
                              <td>{std.value}</td>
                            </tr>
                          ))}
                        </div>
                        <h3>Parent/Guardian details</h3>
                        <div className="row1">
                          {view_std_3.map((std, index) => (
                            <tr key={index}>
                              <td>{std.label}</td>
                              <td>{std.value}</td>
                            </tr>
                          ))}
                        </div>
                      </div>
                      <div className="col-7">
                        <h3>Academic Details</h3>
                        <div className="row2">
                          {view_std_2.map((std, index) => (
                            <tr key={index}>
                              <td>{std.label}</td>
                              <td>{std.value}</td>
                            </tr>
                          ))}
                        </div>

                        {/*--------Start--------QR Generator for each students according to their Ad_No */}
                        <div className="QR">
                          {
                            <QrGenerator
                              userID={selectedStudent.admission_no}
                            />
                          }
                        </div>

                        {/*--------End--------QR Generator */}
                      </div>{" "}
                    </div>
                  </table>
                </div>
              )}
            </div>
          </Popup>

          <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
            <div className="popup-background-student">
              {selectedStudent && (
                <div className="popup-container-edit-std">
                  <form onSubmit={handleEditSubmit}>
                    <Row>
                      <Col md={4}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "20px",
                          }}
                        >
                          {selectedStudent.picture && (
                            <img
                              src={selectedStudent.picture}
                              alt="Profile"
                              width="100px"
                              height="100px"
                            />
                          )}
                        </div>{" "}
                        <Form.Control
                          type="file"
                          accept="image/jpeg, image/png"
                          id="picture"
                          name="picture"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                        <div>
                          <label htmlFor="fullname">Full Name</label>
                          <Form.Control
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={selectedStudent.fullname}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                fullname: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="first_name">First Name</label>
                          <Form.Control
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={selectedStudent.first_name}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                first_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="last_name">Last Name</label>
                          <Form.Control
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={selectedStudent.last_name}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="address">Address</label>
                          <Form.Control
                            type="text"
                            id="address"
                            name="address"
                            value={selectedStudent.address}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="dateOfBirth">Date of Birth</label>
                          <Form.Control
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={
                              selectedStudent.dateOfBirth
                                ? selectedStudent.dateOfBirth.slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                dateOfBirth: e.target.value
                                  ? e.target.value
                                  : null,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="gender">Gender</label>
                          <Form.Control
                            type="text"
                            id="gender"
                            name="gender"
                            value={selectedStudent.gender}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                gender: e.target.value,
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
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div>
                          <Form.Label>Admission No</Form.Label>
                          <Form.Control
                            type="text"
                            id="admission_no"
                            name="admission_no"
                            value={selectedStudent.admission_no}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                admission_no: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="email">Email</label>
                          <Form.Control
                            type="text"
                            id="email"
                            name="email"
                            value={selectedStudent.email}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="password">Password</label>
                          <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            value={selectedStudent.password}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="admission_year">Admission Year</label>
                          <Form.Control
                            type="date"
                            id="admission_year"
                            name="admission_year"
                            value={
                              selectedStudent.admission_year
                                ? selectedStudent.admission_year.slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                admission_year: e.target.value
                                  ? e.target.value
                                  : null,
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
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                grade: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="grade">Admitted Grade</label>
                          <Form.Control
                            type="text"
                            id="admitted_grade"
                            name="admitted_grade"
                            value={selectedStudent.admitted_grade}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                admitted_grade: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="details">Details of</label>
                          <Form.Control
                            as="select"
                            id="details"
                            name="details"
                            value={selectedStudent.details}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                details: e.target.value,
                              })
                            }
                          >
                            <option value="">Select an option</option>
                            <option value="father">father</option>
                            <option value="mother">mother</option>
                            <option value="guardian">guardian</option>
                          </Form.Control>
                        </div>

                        <div>
                          <label htmlFor="parent_Name">Parent Name</label>
                          <Form.Control
                            type="text"
                            id="parent_Name"
                            name="parent_Name"
                            value={selectedStudent.parent_Name}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                parent_Name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="parent_occupation">
                            Parent Occupation
                          </label>
                          <Form.Control
                            type="text"
                            id="parent_occupation"
                            name="parent_occupation"
                            value={selectedStudent.parent_occupation}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                parent_occupation: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div>
                          <label htmlFor="extra_activities">
                            Extra Activities
                          </label>
                          <Form.Control
                            as="textarea"
                            id="extra_activities"
                            name="extra_activities"
                            value={selectedStudent.extra_activities}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                extra_activities: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div>
                          <label htmlFor="conduct">Conduct</label>
                          <Form.Control
                            as="textarea"
                            id="conduct"
                            name="conduct"
                            value={selectedStudent.conduct}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                conduct: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div>
                          <label htmlFor="conduct">Special Aptitudes</label>
                          <Form.Control
                            as="textarea"
                            id="special_aptitudes"
                            name="special_aptitudes"
                            value={selectedStudent.special_aptitudes}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                special_aptitudes: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div>
                          <label htmlFor="conduct">Remark</label>
                          <Form.Control
                            as="textarea"
                            id="remark"
                            name="remark"
                            value={selectedStudent.remark}
                            onChange={(e) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                remark: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <Button
                          variant="success"
                          type="submit"
                          className="mt-3"
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={handleCloseEditPopup}
                          className="mt-3 mx-3"
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </div>
          </Popup>

          <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
            <div className="popup-background-student">
              <div className="popup-container-delete">
                <h3>Delete Student</h3>
                <p>Are you sure you want to delete this student?</p>
                {selectedStudent && (
                  <div>
                    <p>Admission No: {selectedStudent.admission_no}</p>
                    <p>Full Name: {selectedStudent.fullname}</p>
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={confirmLeave}
                  className="mx-2"
                >
                  Leave
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDelete}
                  className="mx-2"
                >
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
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
