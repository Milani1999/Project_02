import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../Loading/Loading";
import "./TClassMarks.css";

const TClassMarks = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(`/api/students/${studentId}`);
      return {
        fullname: response.data.fullname,
        admission_no: response.data.admission_no,
      };
    } catch (error) {
      console.error(error);
      return {
        fullname: "Unknown Student",
        admission_no: "Unknown",
      };
    }
  };

  const handleFetchMarks = async () => {
    try {
      if (selectedYear && selectedTerm && selectedGrade) {
        setLoading(true);
        const response = await axios.get(
          `/api/marks/class/${selectedYear}/${selectedTerm}/${selectedGrade}`
        );

        if (Array.isArray(response.data) && response.data.length > 0) {
          const updatedMarks = await Promise.all(
            response.data.map(async (subject) => {
              const updatedStudents = await Promise.all(
                subject.students.map(async (student) => {
                  const studentData = await fetchStudentDetails(
                    student.student
                  );
                  return { ...student, ...studentData };
                })
              );
              return { ...subject, students: updatedStudents };
            })
          );
          setMarks(updatedMarks);
        } else {
          setMarks([]);
        }
      } else {
        setMarks([]);
      }
    } catch (error) {
      console.error(error);
      setMarks([]);
    } finally {
      setLoading(false);
    }
  };

  const grades = [];
  for (let i = 1; i <= 11; i++) {
    grades.push(
      <option key={i} value={i}>
        Grade {i}
      </option>
    );
  }

  const years = [];
  for (let i = 2023; i <= 2030; i++) {
    years.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const calculateTotal = (studentMarks) => {
    let total = 0;
    let validCount = 0;

    studentMarks.forEach((mark) => {
      if (mark !== "AB") {
        total += parseFloat(mark);
        validCount++;
      }
    });

    return { total, validCount };
  };

  const calculateAverage = (total, validCount) => {
    if (validCount === 0) {
      return "-";
    }
    return (total / validCount).toFixed(2);
  };

  return (
    <div>
      <div className="filterMarks">
        <div className="filter">
          <label htmlFor="yearSelect">Select Year: </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="termSelect">Select Term: </label>
          <select
            id="termSelect"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select Term</option>
            <option value="1">Term 1</option>
            <option value="2">Term 2</option>
            <option value="3">Term 3</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="gradeSelect">Select Grade: </label>
          <select
            id="gradeSelect"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">Select Grade</option>
            {grades}
          </select>
        </div>
      </div>

      <div className="marks-buttons">
        <button className="btn btn-success" onClick={handleFetchMarks}>
          View Marks
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : marks.length > 0 ? (
        <div className="view-mclass-table">
          <table>
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                {marks.map((subject) => (
                  <th key={subject.subject}>{subject.subject}</th>
                ))}
                <th>Total</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {marks[0].students.map((student) => (
                <tr key={student.student}>
                  <td>{student.admission_no}</td>
                  <td>{student.fullname}</td>
                  {marks.map((subject) => (
                    <td key={subject.subject}>
                      {subject.students.find(
                        (s) => s.student === student.student
                      )?.score || "-"}
                    </td>
                  ))}
                  <td>
                    {calculateTotal(
                      marks.map((subject) =>
                        subject.students.find(
                          (s) => s.student === student.student
                        )?.score || "-"
                      )
                    ).total}
                  </td>
            
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="p-error">No student marks found.</h1>
      )}
    </div>
  );
};

export default TClassMarks;
    