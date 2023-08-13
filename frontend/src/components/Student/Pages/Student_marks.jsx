import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Student_marks.css";
import LoadingSpinner from "../../Loading/Loading";

function Marks() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const student_id = user?.id;

  useEffect(() => {
    if (selectedYear && selectedTerm) {
      setLoading(true);

      axios
        .get(`/api/marks/${selectedYear}/${selectedTerm}/${student_id}`)
        .then((response) => {
          setMarksData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching marks:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedYear, selectedTerm, student_id]);

  const totalAndCount = marksData.reduce(
    (result, mark) => {
      if (mark.score !== "AB") {
        result.total += parseFloat(mark.score);
        result.count++;
      }
      return result;
    },
    { total: 0, count: 0 }
  );

  const totalMarks = totalAndCount.total;
  const Count = totalAndCount.count;

  const average = totalMarks / Count;

  return (
    <div>
      <div className="filterMarksStu">
        <div className="filterStu">
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
        <div className="filterStu">
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
        {loading ? (
          <LoadingSpinner />
        ) : marksData.length > 0 ? (
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
              <tr className="total">
                <td>Total</td>
                <td>{totalMarks}</td>
              </tr>
              <tr className="average">
                <td>Average</td>
                <td>{average}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h1 className="p-error">No student marks found.</h1>
        )}
      </div>
    </div>
  );
}

export default Marks;
