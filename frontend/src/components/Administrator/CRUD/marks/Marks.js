import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setSubjects(response.data.map((grade) => grade.subject_name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleMarksChange = (event, studentId) => {
    const updatedMarks = { ...marks, [studentId]: event.target.value };
    setMarks(updatedMarks);
  };

  const handleSaveMarks = async () => {
    try {
      // Prepare marks data to be saved
      const marksData = Object.keys(marks).map((studentId) => ({
        studentId,
        marks: marks[studentId],
      }));

      // Save marks to the database
      await axios.post("/api/saveMarks", marksData);

      // Clear marks state
      setMarks({});

      // Display success message or perform any other action
      console.log("Marks saved successfully!");
    } catch (error) {
      console.error(error);
      // Display error message or perform any other action
    }
  };

  const filteredStudents = students.filter((student) => {
    const isGradeMatched = selectedGrade ? student.grade?.toString() === selectedGrade : true;
    return isGradeMatched;
  });

  return (
    <Container>
      <div>
        <label htmlFor="yearSelect">Select Year: </label>
        <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          <option value="">All Years</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 2023}>
              {i + 2023}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="termSelect">Select Term: </label>
        <select id="termSelect" value={selectedTerm} onChange={handleTermChange}>
          <option value="">All Terms</option>
          <option value="1">Term 1</option>
          <option value="2">Term 2</option>
          <option value="3">Term 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="gradeSelect">Select Grade: </label>
        <select id="gradeSelect" value={selectedGrade} onChange={handleGradeChange}>
          <option value="">All Grades</option>
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i + 1}>
              Grade {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subjectSelect">Select Subject: </label>
        <select id="subjectSelect">
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <Table striped hover className="mt-5">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Admission No</th>
            <th style={{ textAlign: 'center' }}>Full Name</th>
            <th style={{ textAlign: 'center' }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td style={{ verticalAlign: 'middle' }}>{student.admission_no}</td>
              <td style={{ verticalAlign: 'middle' }}>{student.fullname}</td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={marks[student._id] || ""}
                  onChange={(event) => handleMarksChange(event, student._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSaveMarks}>Save Marks</Button>
    </Container>
  );
};

export default Marks;
