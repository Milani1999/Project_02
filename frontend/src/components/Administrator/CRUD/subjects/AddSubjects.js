import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Popup from "reactjs-popup";
import { fetchSubjects } from "./FetchSubjects";

function AddSubjects({ setSubjectList }) {
  const [formData, setFormData] = useState({
    subject_id: "",
    subject_name: "",
    staff_name: [],
  });

  const [staffOptions, setStaffOptions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await axios.get("/api/staff");
        setStaffOptions(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    }

    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddToSelected = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      staff_name: [
        ...new Set([...prevFormData.staff_name, ...selectedOptions]),
      ],
    }));
  };

  const handleRemoveStaff = (staffName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      staff_name: prevFormData.staff_name.filter((name) => name !== staffName),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post("/api/subjects/create", formData, config);

      alert("Subject added successfully!");
      setFormData({
        subject_id: "",
        subject_name: "",
        staff_name: [],
      });
      setIsPopupOpen(false);
      const updatedSubjects = await fetchSubjects();
      setSubjectList(updatedSubjects);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      subject_id: "",
      subject_name: "",
      staff_name: [],
    });
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setIsPopupOpen(true)}>
        Add Subject
      </Button>

      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="popup-background">
          <div
            className="PopupAddSubjects"
            style={{
              backgroundColor: "white",
              border: "2px solid green",
              padding: "25px",
            }}
          >
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="subject_id">
                <Form.Label>Subject ID</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_id"
                  value={formData.subject_id}
                  placeholder="Enter Subject ID"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="subject_name">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_name"
                  value={formData.subject_name}
                  placeholder="Enter Subject Name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="staff_name">
                <Form.Label>Assign Staff</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="staff_name"
                  value={formData.staff_name}
                  onChange={handleAddToSelected}
                >
                  {staffOptions.map((staff) => (
                    <option key={staff.value} value={staff.fullname}>
                      {staff.employee_id} - {staff.fullname}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="selected_staff">
                <Form.Label>Selected Staff</Form.Label>
                <div>
                  {formData.staff_name.map((name) => (
                    <span key={name}>
                      {name}
                      <button
                        type="button"
                        onClick={() => handleRemoveStaff(name)}
                        className="remove-button"
                      >
                        -
                      </button>
                      <br />
                    </span>
                  ))}
                </div>
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
            </Form>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default AddSubjects;
