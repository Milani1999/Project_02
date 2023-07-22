import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddStudents() {
  const [formData, setFormData] = useState({
    fullname: "",
    first_name: "",
    last_name: "",
    address: "",
    dateOfBirth: null,
    phone: "",
    gender: "",
    picture:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    username: "",
    password: "",
    role: "",
    admission_no: "",
    parent_Name: "",
    parent_occupation: "",
    admission_year: null,
    grade: null,
    extra_activities: "",
  });


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
        "/api/students/create",
        formData,
        config
      );

      setMessage("Student added successfully!");
      setFormData({
        fullname: "",
        first_name: "",
        last_name: "",
        address: "",
        dateOfBirth: null,
        phone: "",
        gender: "",
        picture:
          "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
        username: "",
        password: "",
        role: "",
        admission_no: "",
        parent_Name: "",
        parent_occupation: "",
        admission_year: null,
        grade: "",
        extra_activities: "",
      });
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };


  return (
    <div>
      <Button variant="primary" onClick={() => setIsPopupOpen(true)} style={{textAlign:'center'}}>
        Add Student
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="Popup">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="admission_no">
                  <Form.Label>Admission No</Form.Label>
                  <Form.Control
                    type="text"
                    name="admission_no"
                    value={formData.admission_no}
                    placeholder="Enter Admission No"
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
                  <Form.Label>Date of Birth</Form.Label>
                  <br />
                  <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) =>
                      handleDateChange(date, "dateOfBirth")
                    }
                    className="form-control"
                    placeholderText="Select Date of Birth"
                  />
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter Phone"
                    onChange={handleChange}
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
                <Form.Group controlId="picture">
                  <Form.Label>Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>

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
                    <option value="student">student</option>
                  </Form.Control>
                </Form.Group>


                <Form.Group controlId="parent_Name">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parent_Name"
                    value={formData.parent_Name}
                    placeholder="Enter Parent Name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="parent_occupation">
                  <Form.Label>Parent Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    name="parent_occupation"
                    value={formData.parent_occupation}
                    placeholder="Enter Parent Occupation"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="admission_year">
                  <Form.Label>Admission Date</Form.Label>
                  <br />
                  <DatePicker
                    selected={formData.admission_year}
                    onChange={(date) =>
                      handleDateChange(date, "admission_year")
                    }
                    className="form-control"
                    placeholderText="Select Admission Year"
                  />
                </Form.Group>
                <Form.Group controlId="grade">
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    type="number"
                    name="grade"
                    value={formData.grade}
                    placeholder="Enter Grade"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="extra_activities">
                  <Form.Label>Extra Activities</Form.Label>
                  <Form.Control
                    as="select"
                    name="extra_activities"
                    value={formData.extra_activities}
                    onChange={handleChange}
                  >
                    <option value="">Select Extra Activities</option>
                    <option value="games">Games</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="gardening">Gardening</option>
                  </Form.Control>
                </Form.Group>
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

export default AddStudents;