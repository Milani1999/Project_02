import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Col, Row } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import AddStudents from './AddStudents'
import './students.css'

const ViewStudents = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [imageFile, setImageFile] = useState(null);


  const fetchStudentsData = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudentsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const handleView = (students) => {
    setSelectedStudents(students);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setSelectedStudents({});
    setShowViewPopup(false);
  };

  const handleEdit = (students) => {
    setSelectedStudents(students);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setSelectedStudents({});
    setShowEditPopup(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, picture, ...studentsData } = selectedStudents;

      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "edutrack");
        data.append("cloud_name", "dprnxaqxi");
        const response = await fetch("https://api.cloudinary.com/v1_1/dprnxaqxi/image/upload", {
          method: "post",
          body: data,
        });
        const cloudinaryData = await response.json();
        studentsData.picture = cloudinaryData.url.toString();
      }

      await axios.put(`/api/students/${_id}`, studentsData);
      setShowEditPopup(false);
      fetchStudentsData();
      alert('Student updated successfully.');
    } catch (error) {
      console.error(error);
      alert("Please fill all the fields");
    }
  };

  const handleDelete = (students) => {
    setSelectedStudents(students);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedStudents({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedStudents;
      await axios.delete(`/api/students/${_id}`);
      setShowDeletePopup(false);
      fetchStudentsData();
      alert('Student deleted successfully.');
    } catch (error) {
      console.error(error);
      alert('Failed to delete student');
    }
  };



  return (
    <div>
      <Table striped hover className="mt-5">
        <thead>
          <tr>
            <th colSpan={7}>
            </th>
            <th style={{ textAlign: 'center', width: '100px' }}>
              <AddStudents />
            </th>
          </tr>

          <tr>
            <th style={{ textAlign: 'center' }}>Profile</th>
            <th style={{ textAlign: 'center' }}>Admission No</th>
            <th style={{ textAlign: 'center' }}>Full Name</th>
            <th style={{ textAlign: 'center' }}>First Name</th>
            <th style={{ textAlign: 'center' }}>Last Name</th>
            <th style={{ textAlign: 'center' }}>Address</th>
            <th style={{ textAlign: 'center' }}>Phone</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsList.map((students) => (
            <tr key={students._id}>
              <td style={{ verticalAlign: 'middle' }}>
                <img src={students.picture} alt="Profile" width="100" height="100" />
              </td>
              <td style={{ verticalAlign: 'middle' }}>{students.admission_no}</td>
              <td style={{ verticalAlign: 'middle' }}>{students.fullname}</td>
              <td style={{ verticalAlign: 'middle' }}>{students.first_name}</td>
              <td style={{ verticalAlign: 'middle' }}>{students.last_name}</td>
              <td style={{ verticalAlign: 'middle' }}>{students.address}</td>
              <td style={{ verticalAlign: 'middle' }}>{students.phone}</td>
              <td style={{ verticalAlign: 'middle' }}>
                <Button variant="info" onClick={() => handleView(students)} className="m-1" style={{ width: '100px' }}>
                  View
                </Button><br />
                <Button variant="success" onClick={() => handleEdit(students)} className="m-1" style={{ width: '100px' }}>
                  Edit
                </Button><br />
                <Button variant="danger" onClick={() => handleDelete(students)} className="m-1" style={{ width: '100px' }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
        {selectedStudents && (
          <div className="popup-container-view">
            <table className="viewTableStudents">
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  <img src={selectedStudents.picture} alt="Profile" width="100" height="100" />
                </td>
              </tr>
              <tr>
                <td>Admission No</td>
                <td>{selectedStudents.admission_no}</td>
              </tr>
              <tr>
                <td>Full Name</td>
                <td>{selectedStudents.fullname}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{selectedStudents.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{selectedStudents.last_name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{selectedStudents.address}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{new Date(selectedStudents.dateOfBirth).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{selectedStudents.phone}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{selectedStudents.gender}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{selectedStudents.username}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>{selectedStudents.role}</td>
              </tr>
              <tr>
                <td>Grade</td>
                <td>{selectedStudents.grade}</td>
              </tr>
              <tr>
                <td>Admission Date</td>
                <td>{new Date(selectedStudents.admission_year).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Parent Name</td>
                <td>{selectedStudents.parent_Name}</td>
              </tr>
              <tr>
                <td>Parent Occupation</td>
                <td>{selectedStudents.parent_occupation}</td>
              </tr>
              <tr>
                <td>Extra Activities</td>
                <td>{selectedStudents.extra_activities}</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: 'center' }}>
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
        {selectedStudents && (
          <div className="popup-container">
            <form onSubmit={handleEditSubmit}>
              <Row>
                <Col md={6}>
                  <div>
                    {/* <Form.Label>Profile Picture</Form.Label> */}
                    {selectedStudents.picture && <img src={selectedStudents.picture} alt="Profile" width="100px" height="100px" />}
                    <Form.Control
                      type="file"
                      accept="image/jpeg, image/png"
                      id="picture"
                      name="picture"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>                                    <div>
                    <Form.Label>Admission No</Form.Label>
                    <Form.Control
                      type="text"
                      id="admission_no"
                      name="admission_no"
                      value={selectedStudents.admission_no}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, admission_no: e.target.value })}
                    />
                  </div>

                  <div>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={selectedStudents.fullname}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, fullname: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={selectedStudents.first_name}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, first_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={selectedStudents.last_name}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, last_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      value={selectedStudents.address}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedStudents.dateOfBirth ? selectedStudents.dateOfBirth.slice(0, 10) : ""}
                      onChange={(date) => setSelectedStudents({ ...selectedStudents, dateOfBirth: date })}
                      className="form-control"
                      placeholderText="Select Date of Birth"
                    />
                  </div>

                  <div>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      id="phone"
                      name="phone"
                      value={selectedStudents.phone}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, phone: e.target.value })}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      id="gender"
                      name="gender"
                      value={selectedStudents.gender}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Control>
                  </div>

                  <div>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      name="username"
                      value={selectedStudents.username}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      value={selectedStudents.password}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, password: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      id="role"
                      name="role"
                      value={selectedStudents.role}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      type="number"
                      id="grade"
                      name="grade"
                      value={selectedStudents.grade}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, grade: e.target.value })}
                    />
                  </div>
                  <div>

                    <Form.Label>Parent Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="parent_Name"
                      name="parent_Name"
                      value={selectedStudents.parent_Name}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, parent_Name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Form.Label>Parent Occupation</Form.Label>
                    <Form.Control
                      type="text"
                      id="parent_occupation"
                      name="parent_occupation"
                      value={selectedStudents.parent_occupation}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, parent_occupation: e.target.value })}
                    />
                  </div>
                  <div>
                    <Form.Label>Admission Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedStudents.admission_year ? selectedStudents.admission_year.slice(0, 10) : ""}
                      onChange={(date) => setSelectedStudents({ ...selectedStudents, admission_year: date })}
                      className="form-control"
                    />
                  </div>

                  <div>
                    <Form.Label>Extra Activities</Form.Label>
                    <Form.Control
                      type="text"
                      id="extra_activities"
                      name="extra_activities"
                      value={selectedStudents.extra_activities}
                      onChange={(e) => setSelectedStudents({ ...selectedStudents, extra_activities: e.target.value })}
                    />
                  </div>

                  <Button variant="primary" type="submit" className='mt-3'>
                    Update
                  </Button>
                  <Button variant="secondary" onClick={handleCloseEditPopup} className="mx-3 mt-3">
                    Cancel
                  </Button>
                </Col>
              </Row>

            </form>
          </div>
        )}
      </Popup>


      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        {selectedStudents && (
          <div className="popup-container-delete">
            <h5>Are you sure you want to delete this student?</h5>
            Admission No : {selectedStudents.admission_no}<br />
            Full Name   : {selectedStudents.fullname}<br />
            <Button variant="danger" onClick={confirmDelete} className='mx-3 mt-3'>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleCloseDeletePopup} className="ml-3 mt-3">
              Cancel
            </Button>
          </div>
        )}
      </Popup>

    </div>
  );
};

export default ViewStudents;