import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "./LeavingCertificate.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function LeavingCertificate() {
  const location = useLocation();

  const selectedStudent = location.state?.selectedStudent;
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    const options = {
      filename: "LeavingCertificate.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 10 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf(input, options);
  };

  const [editStudent, setEditStudent] = useState(selectedStudent);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatedStudent } = editStudent;

      await axios.put(
        `/api/oldStudents/${selectedStudent._id}`,
        updatedStudent
      );
      alert("Leaving certificate updated successfully.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  let view_std = [];
  if (selectedStudent) {
    view_std = [
      {
        label: "Date of Admission",
        type: "date",
        name: "admission_year",
        value: editStudent.admission_year.slice(0, 10),
      },
      {
        label: "Admission No",
        type: "text",
        name: "admission_no",
        value: editStudent.admission_no,
      },
      {
        label: "Name of Student",
        type: "text",
        name: "fullname",
        value: editStudent.fullname,
      },
      {
        label: "Date of Birth",
        type: "date",
        name: "dateOfBirth",
        value: editStudent.dateOfBirth.slice(0, 10),
      },
      {
        label: "Name of Parent / Guardian",
        type: "text",
        name: "parent_Name",
        value: editStudent.parent_Name,
      },
      {
        label: "Address",
        type: "text",
        name: "address",
        value: editStudent.address,
      },
      {
        label: "Medium of Instruction",
        type: "text",
        name: "medium",
        value: editStudent.medium,
      },
      {
        label: "Last Grade Promoted To",
        type: "text",
        name: "c_grade",
        value: editStudent.c_grade,
      },
      {
        label: "Subjects Followed",
        type: "text",
        name: "subjects_followed",
        value: editStudent.subjects_followed,
      },
      {
        label: "Conduct",
        type: "text",
        name: "conduct",
        value: editStudent.conduct,
      },
      {
        label: "Sports & Co-Curricular Activities",
        type: "text",
        name: "extra_activities",
        value: editStudent.extra_activities,
      },
      {
        label: "Special aptitudes",
        type: "text",
        value: editStudent.special_aptitudes,
        name: "special_aptitudes",
      },
      {
        label: "Remark",
        type: "text",
        name: "remark",
        value: editStudent.remark,
      },
      {
        label: "Reason for Leaving",
        name: "leaving_reason",
        value: editStudent.leaving_reason,
      },
      {
        label: "Date of Leaving",
        type: "date",
        name: "leaving_date",
        value: editStudent.leaving_date.slice(0, 10),
      },
    ];
  }
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/administrator/StudentLeaving");
  };

  useEffect(() => {}, [editStudent]);

  return (
    <div className="leaving-certificate">
      <div className="pdf1">
        <div className="pdf1_content">
          <div className="form">
            <table>
              <tbody>
                {view_std.map((std, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      <label className="pdf-label">{std.label}</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type={std.type}
                        className="pdf-input"
                        name={std.name}
                        value={std.value}
                        onChange={(e) =>
                          setEditStudent({
                            ...editStudent,
                            [std.name]: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div className="subpage">
              <h2>SCHOOL LEAVING CERTIFICATE</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Date of Admission</td>
                    <td>
                      {" "}
                      {new Date(
                        selectedStudent.admission_year
                      ).toLocaleDateString()}
                    </td>
                    <td style={{ fontWeight: "bold", paddingRight: "10px" }}>
                      ADMISSION NO
                    </td>
                    <td>{selectedStudent.admission_no}</td>
                  </tr>
                  <tr>
                    <td>Name of Student</td>
                    <td>{selectedStudent.fullname}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>
                      {new Date(
                        selectedStudent.dateOfBirth
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td>Name of Parent / Guardian</td>
                    <td>{selectedStudent.parent_Name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{selectedStudent.address}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <td>Medium of Instruction</td>
                    <td>English</td>
                  </tr>
                  <tr>
                    <td>Last Grade Promoted To</td>
                    <td>{selectedStudent.c_grade}</td>
                  </tr>
                  <tr>
                    <td>Subjects Followed</td>
                    <td>{selectedStudent.subjects_followed}</td>
                  </tr>
                  <tr>
                    <td>Conduct</td>
                    <td>{selectedStudent.conduct}</td>
                  </tr>
                  <tr>
                    <td>Sports & Co-Curricular Activities</td>
                    <td>{selectedStudent.extra_activities}</td>
                  </tr>
                  <tr>
                    <td>Special Aptitudes</td>
                    <td>{selectedStudent.special_aptitudes}</td>
                  </tr>
                  <tr>
                    <td>Remarks</td>
                    <td>{selectedStudent.remark}</td>
                  </tr>
                  <tr>
                    <td>Reason for Leaving</td>
                    <td>{selectedStudent.leaving_reason}</td>
                  </tr>
                  <tr>
                    <td>Date of Leaving</td>
                    <td>
                      {new Date(
                        selectedStudent.leaving_date
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pdf-f">
                <table className="pdf-footer">
                  <tbody>
                    <tr>
                      <td className="left-footer">_______________________</td>
                      <td className="right-footer">_______________________</td>
                    </tr>
                    <tr>
                      <td className="left-footer">Date</td>
                      <td className="right-footer">Administrator</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="hr-container">
                        <hr className="hr-fixed" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeavingCertificate;
