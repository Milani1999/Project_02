import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";

function LeavingCertificate() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/oldstudents");
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

  let oldStudents = [];

  if (selectedStudent) {
    oldStudents = [
      { label: "Admission No", value: selectedStudent.admission_no },
      { label: "Full Name", value: selectedStudent.fullname },
      { label: "First Name", value: selectedStudent.first_name },
      { label: "Last Name", value: selectedStudent.last_name },
      { label: "Address", value: selectedStudent.address },
      {
        label: "Date of Birth",
        value: new Date(selectedStudent.dateOfBirth).toLocaleDateString(),
      },
      { label: "Phone", value: selectedStudent.phone },
      { label: "Gender", value: selectedStudent.gender },
      { label: "Parent Name", value: selectedStudent.parent_Name },
      { label: "Parent Occupation", value: selectedStudent.parent_occupation },
      {
        label: "Admission Date",
        value: new Date(selectedStudent.admission_year).toLocaleDateString(),
      },
      { label: "Grade", value: selectedStudent.c_grade },
      { label: "Extra Activities", value: selectedStudent.extra_activities },
    ];
  }
  return (
    <div>
      <Table striped hover className="mt-5" responsive="sm">
        <thead>
          <tr>
            <th colSpan={6}></th>
            <th style={{ textAlign: "center", width: "100px" }}></th>
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
          {students.map((student) => (
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
              <td style={{ verticalAlign: "middle" }}>{student.fullname}</td>
              <td style={{ verticalAlign: "middle" }}>{student.address}</td>
              <td style={{ verticalAlign: "middle" }}>{student.phone}</td>
              <td style={{ verticalAlign: "middle" }}>
                <Button
                  variant="secondary"
                  onClick={() => handleView(student)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  View
                </Button>
                <Button variant="primary">Leaving<br/>Certificate</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
        <div className="popup-background">
          {selectedStudent && (
            <div className="popup-container-view">
              <table
                style={{ textAlign: "right" }}
                className="viewTableStudents"
              >
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <img
                      src={selectedStudent.picture}
                      alt="Profile"
                      width="100"
                      height="100"
                    />
                  </td>
                </tr>
                {oldStudents.map((row, index) => (
                  <tr key={index}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <Button
                      variant="secondary"
                      onClick={handleCloseViewPopup}
                      className="mt-2"
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
    </div>
  );
}

export default LeavingCertificate;
