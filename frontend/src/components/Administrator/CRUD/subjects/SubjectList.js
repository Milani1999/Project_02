import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";
import Popup from "reactjs-popup";
import AddSubjects from "./AddSubjects";
import "./subject.css";
import { fetchSubjects } from "./FetchSubjects";

const SubjectList = () => {
  const [SubjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjectList(data);
      })
      .catch((error) => {
        alert(error);
      });
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
      const { _id, ...subjectData } = selectedSubject;
      await axios.put(`/api/subjects/${_id}`, subjectData);
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
    <div>
      <Table striped hover className="mt-4">
        <thead>
          <tr>
            <th colSpan={2}>
            </th>
            <th>
            <AddSubjects setSubjectList={setSubjectList} />
            </th>
          </tr>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {SubjectList.map((subject) => (
            <tr key={subject._id}>
              <td>{subject.subject_id}</td>
              <td>{subject.subject_name}</td>
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
          {selectedSubject && (
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
