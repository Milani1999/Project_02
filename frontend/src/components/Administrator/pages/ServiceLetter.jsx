import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "./LeavingCertificate.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ServiceLetter() {
  const location = useLocation();

  const selectedStaff = location.state?.selectedStaff;
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    const options = {
      filename: "ServiceLetter.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 10 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf(input, options);
  };

  const [editStaff, setEditStaff] = useState(selectedStaff);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedStaff } = editStaff;

      await axios.put(`/api/oldStaff/${selectedStaff._id}`, updatedStaff);
      alert("Service letter updated successfully.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/administrator/StaffLeaving");
  };

  useEffect(() => {}, [editStaff]);

  return (
    <div className="leaving-certificate">
      <div className="pdf1">
        <div className="pdf1_content">
          <div className="form">
            <label className="pdf-label">Service Letter</label>
            <br />
            <textarea
              cols={55}
              rows={23}
              className="pdf-input"
              name="service_letter"
              value={editStaff.service_letter}
              onChange={(e) =>
                setEditStaff({
                  ...editStaff,
                  service_letter: e.target.value,
                })
              }
              style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
            />
          </div>
          <div className="pdf1-1">
            <button
              className="btn btn-secondary rounded-0"
              onClick={handleEditSubmit}
            >
              Save
            </button>
            <button className="btn btn-success rounded-0" onClick={downloadPDF}>
              Generate PDF
            </button>
            <button className="btn btn-danger rounded-0" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="pdf2">
        <div ref={pdfRef}>
          <div className="page">
            <div
              className="subpage"
              style={{ padding: "0px 50px" }}
            >
              <h2>TO WHO IT MAY CONCERN</h2>

              <p>{editStaff.service_letter}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceLetter;
