import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";

function AddStaff() {
  const [formData, setFormData] = useState({
    employee_id: "",
    fullname: "",
    first_name: "",
    last_name: "",
    address: "",
    dateOfBirth: null,
    phone: "",
    gender: "",
    username: "",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    password: "",
    role: "staff",
    email: "",
    epf_No: "",
    subjects_taught: "",
    // assigned_classes: "",

  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length !== 10) {
      setError("Phone number should contain exactly 10 digits");
    } else {
      setError("");
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

  };


  const handleDateChange = (date, name) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: date }));
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      setError("Please Select an Image");
      return;
    }
    setError("");
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "edutrack");
      data.append("cloud_name", "dprnxaqxi");
      fetch("https://api.cloudinary.com/v1_1/dprnxaqxi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            picture: data.url.toString(),
          }));
          console.log("Cloudinary URL:", data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Please Select an Image");
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "/api/staff/create",
        formData,
        config
      );

      alert("Staff added successfully!");
      setFormData({
        employee_id: "",
        fullname: "",
        first_name: "",
        last_name: "",
        address: "",
        dateOfBirth: null,
        phone: "",
        gender: "",
        username: "",
        picture:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        password: "",
        role: "",
        email: "",
        epf_No: "",
        subjects_taught: "",
        // assigned_classes: "",
      });
      setError("");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }

  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.target.name === 'phone' && e.target.value.length >= 10) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setIsPopupOpen(true)}>
        Add Staff
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="Popup">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="employee_id">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="employee_id"
                    value={formData.employee_id}
                    placeholder="Enter Employee ID"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    placeholder="Enter Full Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    placeholder="Enter First Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    placeholder="Enter Last Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Enter Address"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label><br />
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    placeholder="Enter date of birth"
                    onChange={(e) => handleDateChange(e.target.value, "dateOfBirth")}
                  />

                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter Phone"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                  />
                </Form.Group>


                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Enter Username"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="picture">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="staff">staff</option>
                  </Form.Control>
                </Form.Group>


                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="epf_No">
                  <Form.Label>EPF No</Form.Label>
                  <Form.Control
                    type="text"
                    name="epf_No"
                    value={formData.epf_No}
                    placeholder="Enter EPF No"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="subjects_taught">
                  <Form.Label>Subjects Taught</Form.Label>
                  <Form.Control
                    type="text"
                    name="subjects_taught"
                    value={formData.subjects_taught}
                    placeholder="Ex : Science,English,History"
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* <Form.Group controlId="assigned_classes">
                  <Form.Label>Assigned Classes</Form.Label>
                  <Form.Control
                    type="text"
                    name="assigned_classes"
                    value={formData.assigned_classes}
                    placeholder="Enter Assigned Classes"
                    onChange={handleChange}
                  />
                </Form.Group> */}
                <Button variant="primary" type="submit" className="mt-5 mx-3">
                  Add
                </Button>
                <Button
                  variant="danger"
                  className="mt-5 mx-3"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>


          </Form>
        </div>
      </Popup>
    </div>
  );
}

export default AddStaff;
