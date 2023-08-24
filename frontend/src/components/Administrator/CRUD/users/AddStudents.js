import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";

function AddStudents({ fetchStudents }) {
  const [formData, setFormData] = useState({
    fullname: "",
    first_name: "",
    last_name: "",
    address: "",
    dateOfBirth: null,
    gender: "",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    admission_no: "",
    username: "",
    password: "",
    role: "student",
    grade: "",
    admission_year: null,
    admitted_grade: "",
    details: "",
    parent_Name: "",
    parent_occupation: "",
    phone: "",
  });

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
      alert("Please Select an Image");
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

      await axios.post("/api/students/create", formData, config);

      alert("Student added successfully!");
      setIsPopupOpen(false);
      setFormData({
        fullname: "",
        first_name: "",
        last_name: "",
        address: "",
        dateOfBirth: null,
        gender: "",
        picture:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        admission_no: "",
        username: "",
        password: "",
        role: "",
        grade: "",
        admission_year: null,
        admitted_grade: "",
        details: "",
        parent_Name: "",
        parent_occupation: "",
        phone: "",
      });
      setError();
      fetchStudents();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setError("");
  };

  const firstCol = [
    {
      label: "Full name",
      type: "text",
      name: "fullname",
      value: formData.fullname,
      placeholder: "Enter full name",
    },
    {
      label: "First name",
      type: "text",
      name: "first_name",
      value: formData.first_name,
      placeholder: "Enter first name",
    },
    {
      label: "Last name",
      type: "text",
      name: "last_name",
      value: formData.last_name,
      placeholder: "Enter last name",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      value: formData.address,
      placeholder: "Enter home address",
    },
  ];

  const secondCol = [
    {
      label: "Admission No",
      type: "text",
      name: "admission_no",
      value: formData.admission_no,
      placeholder: "Enter admission number",
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      value: formData.username,
      placeholder: "Enter username",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      placeholder: "Enter password",
    },
    {
      label: "Role",
      type: "text",
      name: "role",
      value: formData.role,
      placeholder: "Enter role",
    },
  ];

  const thirdCol = [
    {
      label: "Parent/Guardian Name",
      type: "text",
      name: "parent_Name",
      value: formData.parent_Name,
      placeholder: "Enter Parent Name",
    },
    {
      label: "Parent/Guardian Occupation",
      type: "text",
      name: "parent_occupation",
      value: formData.parent_occupation,
      placeholder: "Enter paren occupation",
    },
    {
      label: "Phone No",
      type: "text",
      name: "phone",
      value: formData.phone,
      placeholder: "Enter Phone No",
    },
  ];

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setIsPopupOpen(true)}
        style={{ textAlign: "center" }}
      >
        Add Student
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="popup-background">
          <div className="Popup">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={4}>
                  <h3>Personal Details</h3>

                  {firstCol.map((std) => (
                    <Form.Group controlId={std.name}>
                      <Form.Label className="label-add-students">
                        {std.label}
                      </Form.Label>
                      <Form.Control
                        type={std.type}
                        name={std.name}
                        value={std.value}
                        placeholder={std.placeholder}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}

                  <Form.Group controlId="dateOfBirth">
                    <Form.Label className="label-add-students">
                      Date of Birth
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleDateChange(e.target.value, "dateOfBirth")
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="gender">
                    <Form.Label className="label-add-students">
                      Gender
                    </Form.Label>
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
                    <Form.Label className="label-add-students">
                      Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <h3>Academic Details</h3>
                  {secondCol.map((std) => (
                    <Form.Group controlId={std.name}>
                      <Form.Label className="label-add-students">
                        {std.label}
                      </Form.Label>
                      <Form.Control
                        type={std.type}
                        name={std.name}
                        value={std.value}
                        placeholder={std.placeholder}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group controlId="admission_year">
                    <Form.Label className="label-add-students">
                      Admission Date
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      name="admission_year"
                      value={formData.admission_year}
                      onChange={(e) =>
                        handleDateChange(e.target.value, "admission_year")
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="grade">
                    <Form.Label className="label-add-students">
                      Current Grade
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={11}
                      name="grade"
                      value={formData.grade}
                      placeholder="Enter Grade"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="admitted_grade">
                    <Form.Label className="label-add-students">
                      Admitted Grade
                    </Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      max={11}
                      name="admitted_grade"
                      value={formData.admitted_grade}
                      placeholder="Enter admitted grade"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <h3>Parent/Guardian details</h3>
                  <Form.Group controlId="details">
                    <Form.Label className="label-add-students">
                      Details of{" "}
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                    >
                      <option value="">Select Details</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                    </Form.Control>
                  </Form.Group>

                  {thirdCol.map((std) => (
                    <Form.Group controlId={std.name}>
                      <Form.Label className="label-add-students">
                        {std.label}
                      </Form.Label>
                      <Form.Control
                        type={std.type}
                        name={std.name}
                        value={std.value}
                        placeholder={std.placeholder}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}

                  <p className="std-msg">
                    * Extra curricular activities, conduct and remarks can be
                    added in the edit option
                  </p>

                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-5"
                    style={{ width: "100px" }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="danger"
                    className="mt-5 mx-3"
                    onClick={handleCancel}
                    style={{ width: "100px" }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default AddStudents;
