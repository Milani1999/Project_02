import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";
import Popup from "reactjs-popup";
import AddSubjects from "./AddSubjects";
import "./subject.css";
import { fetchSubjects } from "./FetchSubjects";

const SubjectList = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [staffOptions, setStaffOptions] = useState([]);
  const [formData, setFormData] = useState({
    subject_id: "",
    subject_name: "",
    staff_name: [],
  });

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/staff");
      return response.data;
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjectList(data);
      })
      .catch((error) => {
        alert(error);
      });

    const fetchData = async () => {
      try {
        const staffResponse = await fetchStaff();
        setStaffOptions(staffResponse);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setSelectedSubject({});
    setShowEditPopup(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/subjects/${selectedSubject._id}`, selectedSubject);
      alert("Subject updated successfully.");
      setShowEditPopup(false);
      const updatedSubjects = await fetchSubjects();
      setSubjectList(updatedSubjects);
    } catch (error) {
      alert("Failed to update Subject");
    }
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setShowDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setSelectedSubject({});
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      const { _id } = selectedSubject;
      await axios.delete(`/api/subjects/${_id}`);
      setShowDeletePopup(false);
      alert("Subject deleted successfully.");
      const updatedSubjects = await fetchSubjects();
      setSubjectList(updatedSubjects);
    } catch (error) {
      alert("Failed to delete subject.");
    }
  };

  return (
    <div className="subject-view">
      <Table striped hover className="mt-4">
        <thead>
          <tr>
            <th colSpan={3}></th>
            <th>
              <AddSubjects setSubjectList={setSubjectList} />
            </th>
          </tr>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Assigned Staff</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjectList.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.subject_id}</td>
              <td>{subject.subject_name}</td>
              <td>
                {subject.staff_name ? (
                  subject.staff_name.map((staffName, index) => (
                    <div key={index}>{staffName}</div>
                  ))
                ) : (
                  <div>No assigned staff</div>
                )}
              </td>

              <td>
                <Button
                  variant="success"
                  onClick={() => handleEdit(subject)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  Edit
                </Button>
                <br />
                <Button
                  variant="danger"
                  onClick={() => handleDelete(subject)}
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

      <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
        <div className="popup-background">
          {selectedSubject._id && (
            <div
              className="popup-container-subjects"
              style={{
                backgroundColor: "white",
                border: "2px solid green",
                padding: "25px",
              }}
            >
              <form onSubmit={handleEditSubmit}>
                <div>
                  <Form.Label>Subject ID</Form.Label>
                  <Form.Control
                    type="text"
                    id="subject_id"
                    name="subject_id"
                    value={selectedSubject.subject_id}
                    onChange={(e) =>
                      setSelectedSubject({
                        ...selectedSubject,
                        subject_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="subject_name"
                    name="subject_name"
                    value={selectedSubject.subject_name}
                    onChange={(e) =>
                      setSelectedSubject({
                        ...selectedSubject,
                        subject_name: e.target.value,
                      })
                    }
                  />
                </div>
                <Form.Control
                  as="select"
                  multiple
                  name="staff_name"
                  value={selectedSubject.staff_name}
                  onChange={(e) => {
                    const selectedStaffNames = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setSelectedSubject((prevSelectedSubject) => ({
                      ...prevSelectedSubject,
                      staff_name: [
                        ...prevSelectedSubject.staff_name,
                        ...selectedStaffNames,
                      ],
                    }));
                  }}
                >
                  {staffOptions.map((staff) => (
                    <option
                      key={staff.value}
                      value={staff.fullname}
                      disabled={selectedSubject.staff_name.includes(
                        staff.fullname
                      )}
                    >
                      {staff.employee_id} - {staff.fullname}
                    </option>
                  ))}
                </Form.Control>

                <div>
                  <Form.Label>Existing Assigned Staff</Form.Label>
                  {selectedSubject.staff_name &&
                    selectedSubject.staff_name.map((staff, index) => (
                      <div key={index}>
                        {staff}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSubject((prevSelectedSubject) => ({
                              ...prevSelectedSubject,
                              staff_name: prevSelectedSubject.staff_name.filter(
                                (s) => s !== staff
                              ),
                            }))
                          }
                          className="remove-button"
                        >
                          -
                        </button>
                      </div>
                    ))}
                </div>

                <Button variant="primary" type="submit" className="mt-5">
                  Update
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCloseEditPopup}
                  className="mx-3 mt-5"
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
        </div>
      </Popup>

      <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
        <div className="popup-background">
          {selectedSubject && (
            <div className="popup-container-delete">
              <h5>Are you sure you want to delete this Subject?</h5>
              Subject ID : {selectedSubject.subject_id}
              <br />
              Subject Name : {selectedSubject.subject_name}
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
  );
};

export default SubjectList;
