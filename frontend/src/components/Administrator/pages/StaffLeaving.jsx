import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import "./StaffLeaving.css";

function StaffLeaving() {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/oldstaff");
      setStaff(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setSelectedStaff(null);
    setShowViewPopup(false);
  };

  let oldStaff = [];

  if (selectedStaff) {
    oldStaff = [
      { label: "Full Name", value: selectedStaff.fullname },
      { label: "First Name", value: selectedStaff.first_name },
      { label: "Last Name", value: selectedStaff.last_name },
      { label: "Address", value: selectedStaff.address },
      {
        label: "Date of Birth",
        value: new Date(selectedStaff.dateOfBirth).toLocaleDateString(),
      },
      { label: "Phone", value: selectedStaff.phone },
      { label: "Gender", value: selectedStaff.gender },
      { label: "Employee_ID", value: selectedStaff.employee_id },
      { label: "EPF_No", value: selectedStaff.epf_No },
      { label: "Subjects Taught", value: selectedStaff.subjects_taught },
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
            <th style={{ textAlign: "center" }}>Employee ID</th>
            <th style={{ textAlign: "center" }}>Full Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone No</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staff) => (
            <tr key={staff._id}>
              <td style={{ verticalAlign: "middle" }}>
                <img
                  src={staff.picture}
                  alt="Profile"
                  width="100"
                  height="100"
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>{staff.employee_id}</td>
              <td style={{ verticalAlign: "middle" }}>{staff.fullname}</td>
              <td style={{ verticalAlign: "middle" }}>{staff.address}</td>
              <td style={{ verticalAlign: "middle" }}>{staff.phone}</td>
              <td style={{ verticalAlign: "middle" }}>{staff.email}</td>
              <td style={{ verticalAlign: "middle" }}>
                <Button
                  variant="secondary"
                  onClick={() => handleView(staff)}
                  className="m-1"
                  style={{ width: "100px" }}
                >
                  View
                </Button>
                <Link
                  to="/Staff/ServiceLetter"
                  state={{ selectedStaff: staff }}
                >
                  <Button style={{ width: "100px" }} className="m-1">
                    Letter
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Popup open={showViewPopup} onClose={handleCloseViewPopup}>
        <div className="popup-background-old-staff">
          {selectedStaff && (
            <div className="popup-container-view-old-staff">
              <table style={{ textAlign: "right" }} className="viewTable-Old">
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    <img
                      src={selectedStaff.picture}
                      alt="Profile"
                      width="100"
                      height="100"
                      className="mt-4"
                    />
                  </td>
                </tr>
                {oldStaff.map((row, index) => (
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
                      className="mt-2 mb-4"
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

export default StaffLeaving;
