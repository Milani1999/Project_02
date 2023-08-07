import React, { useEffect, useState } from "react";
import axios from "axios";
import './Student_marks.css'

function Marks() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [marksData, setMarksData] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const student_id = user?.id;

  useEffect(() => {
    if (selectedYear && selectedTerm) {
      axios
        .get(`/api/marks/${selectedYear}/${selectedTerm}/${student_id}`)
        .then((response) => {
          setMarksData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks:", error);
        });
    }
  }, [selectedYear, selectedTerm, student_id]);

  return (
    <div>
      <div className="filterMarks">
        <div className="filter">
          <label>Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="filter">
          <label>Select Term:</label>
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select Term</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      <div className="marks-view-student">
        <table className="marks-table-student">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map((mark, index) => (
              <tr key={index}>
                <td>{mark.subject}</td>
                <td>{mark.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Marks;
