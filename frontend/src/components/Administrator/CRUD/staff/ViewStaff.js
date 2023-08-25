import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table, Col, Row } from "react-bootstrap";
import Popup from "reactjs-popup";
import AddStaff from "./AddStaff";
import "./staff.css";
import QrGenerator from "../../../QrCode/QrGenerator";
import LoadingSpinner from "../../../Loading/Loading";

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStaffData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/staff");
      setStaffList(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setSelectedStaff({});
    setShowViewPopup(false);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setSelectedStaff({});
    setShowEditPopup(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { _id, picture, ...staffData } = selectedStaff;

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
        staffData.picture = cloudinaryData.url.toString();
      } else {
        staffData.picture = selectedStaff.picture;
      }

      await axios.put(`/api/staff/${_id}`, staffData);
      setShowEditPopup(false);
      fetchStaffData();
      alert("Staff member updated successfully.");
      setImageFile(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("Please fill all the fields");
    }
  };

  const handleDelete = (staff) => {
    setSelectedStaff(staff);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedStaff({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedStaff;
      await axios.delete(`/api/staff/${_id}`);
      setShowDeletePopup(false);
      fetchStaffData();
      alert("Staff member deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete staff member.");
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Table striped hover className="mt-5">
            <thead>
              <tr>
                <th colSpan={7}></th>
                <th style={{ textAlign: "center", width: "100px" }}>
                  <AddStaff fetchStaffData={fetchStaffData} />
                </th>
              </tr>

              <tr className="colname">
                <th style={{ textAlign: "center" }}>Profile</th>
                <th style={{ textAlign: "center" }}>Employee ID</th>
                <th style={{ textAlign: "center" }}>Full Name</th>
                <th style={{ textAlign: "center" }}>First Name</th>
                <th style={{ textAlign: "center" }}>Last Name</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>Phone</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id}>
                  <td style={{ verticalAlign: "middle" }}>
                    <img
                      src={staff.picture}
                      alt="Profile"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {staff.employee_id}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{staff.fullname}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {staff.first_name}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{staff.last_name}</td>
                  <td style={{ verticalAlign: "middle" }}>{staff.address}</td>
                  <td style={{ verticalAlign: "middle" }}>{staff.phone}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Button
                      variant="info"
                      onClick={() => handleView(staff)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      View
                    </Button>
                    <br />
                    <Button
                      variant="success"
                      onClick={() => handleEdit(staff)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      Edit
                    </Button>
                    <br />
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(staff)}
                      className="m-1"
                      style={{ width: "100px" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
            <div className="popup-background-staff">
              {selectedStaff && (
                <div className="popup-container-view-staff">
                  <table className="viewTableStaff">
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <img
                          src={selectedStaff.picture}
                          alt="Profile"
                          width="100"
                          height="100"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Employee ID</td>
                      <td>{selectedStaff.employee_id}</td>
                    </tr>
                    <tr>
                      <td>Full Name</td>
                      <td>{selectedStaff.fullname}</td>
                    </tr>
                    <tr>
                      <td>First Name</td>
                      <td>{selectedStaff.first_name}</td>
                    </tr>
                    <tr>
                      <td>Last Name</td>
                      <td>{selectedStaff.last_name}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{selectedStaff.address}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>
                        {new Date(
                          selectedStaff.dateOfBirth
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{selectedStaff.phone}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{selectedStaff.gender}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{selectedStaff.username}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td>{selectedStaff.role}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{selectedStaff.email}</td>
                    </tr>
                    <tr>
                      <td>EPF No</td>
                      <td>{selectedStaff.epf_No}</td>
                    </tr>
                    <tr>
                      <td>Subjects Taught</td>
                      <td>{selectedStaff.subjects_taught}</td>
                    </tr>
                    {/*--------Start--------QR Generator for each staffs according to their Employee ID */}
                    <tr>
                      <td colSpan={2}>
                        <div>
                          {<QrGenerator userID={selectedStaff.employee_id} />}
                        </div>
                      </td>
                    </tr>
                    {/*--------End--------QR Generator */}
                    <tr>
                      <td colSpan={2} style={{ textAlign: "center" }}>
                        <Button
                          variant="secondary"
                          onClick={handleCloseViewPopup}
                          className="mt-0"
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

          <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
            <div className="popup-background-staff">
              {selectedStaff && (
                <div className="popup-container-edit-staff">
                  <form onSubmit={handleEditSubmit}>
                    <Row>
                      <Col md={6}>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            {selectedStaff.picture && (
                              <img
                                src={selectedStaff.picture}
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
                        </div>
                        <div>
                          <Form.Label>Employee ID</Form.Label>
                          <Form.Control
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            value={selectedStaff.employee_id}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                employee_id: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={selectedStaff.fullname}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                fullname: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={selectedStaff.first_name}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                first_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={selectedStaff.last_name}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            id="address"
                            name="address"
                            value={selectedStaff.address}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={
                              selectedStaff.dateOfBirth
                                ? selectedStaff.dateOfBirth.slice(0, 10)
                                : ""
                            }
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                dateOfBirth: e.target.value,
                              })
                            }
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
                            value={selectedStaff.phone}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                phone: e.target.value,
                              })
                            }
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
                            value={selectedStaff.gender}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                gender: e.target.value,
                              })
                            }
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
                            value={selectedStaff.username}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                username: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            value={selectedStaff.password}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            id="role"
                            name="role"
                            value={selectedStaff.role}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                role: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={selectedStaff.email}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Form.Label>EPF No</Form.Label>
                          <Form.Control
                            type="text"
                            id="epf_No"
                            name="epf_No"
                            value={selectedStaff.epf_No}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                epf_No: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <Form.Label>Subjects Taught</Form.Label>
                          <Form.Control
                            type="text"
                            id="subjects_taught"
                            name="subjects_taught"
                            value={selectedStaff.subjects_taught}
                            onChange={(e) =>
                              setSelectedStaff({
                                ...selectedStaff,
                                subjects_taught: e.target.value,
                              })
                            }
                          />
                        </div>

                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-5"
                        >
                          Update
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={handleCloseEditPopup}
                          className="mx-3 mt-5"
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
            <div className="popup-background-staff">
              {selectedStaff && (
                <div className="popup-container-delete">
                  <h5>Are you sure you want to delete this staff member?</h5>
                  Employee ID : {selectedStaff.employee_id}
                  <br />
                  Full Name : {selectedStaff.fullname}
                  <br />
                  <Button
                    variant="danger"
                    onClick={confirmDelete}
                    className="mx-3 mt-3"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCloseDeletePopup}
                    className="ml-3 mt-3"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
};

export default ViewStaff;
