import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

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
      alert(error);
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
    const { value } = event.target;
    const studentIndex = marks.findIndex((item) => item.student === studentId);

    if (studentIndex !== -1) {
      const updatedMarks = [...marks];
      updatedMarks[studentIndex] = {
        ...updatedMarks[studentIndex],
        score: parseInt(value) || 0,
      };
      setMarks(updatedMarks);
    } else {
      setMarks((prevMarks) => [
        ...prevMarks,
        { student: studentId, score: parseInt(value) || 0 },
      ]);
    }
  };

  const handleSaveMarks = async () => {
    try {
      const marksData = {
        year: parseInt(selectedYear),
        term: selectedTerm,
        subject: selectedSubject,
        grade: parseInt(selectedGrade),
        students: marks.map((item) => ({
          student: item.student,
          score: parseInt(item.score),
        })),
      };

      await axios.post("/api/marks/create", marksData);

      setMarks([]);
      alert("Marks saved successfully!");
    } catch (error) {
      alert(error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const isGradeMatched = selectedGrade
      ? student.grade?.toString() === selectedGrade
      : true;
    return isGradeMatched;
  });

  return (
    <div>
      <div>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {/* <option value="">All Years</option> */}
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i + 2023}>
              {i + 2023}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="termSelect">Select Term: </label>
        <select
          id="termSelect"
          value={selectedTerm}
          onChange={handleTermChange}
        >
          {/* <option value="">All Terms</option> */}
          <option value="1">Term 1</option>
          <option value="2">Term 2</option>
          <option value="3">Term 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="gradeSelect">Select Grade: </label>
        <select
          id="gradeSelect"
          value={selectedGrade}
          onChange={handleGradeChange}
        >
          {/* <option value="">All Grades</option> */}
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i + 1}>
              Grade {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subjectSelect">Select Subject: </label>
        <select
          id="subjectSelect"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {/* <option value="">All Subjects</option> */}
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
            <th style={{ textAlign: "center" }}>Admission No</th>
            <th style={{ textAlign: "center" }}>Full Name</th>
            <th style={{ textAlign: "center" }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => {
            const studentMark = marks.find(
              (item) => item.student === student._id
            ) || {
              student: student._id,
              score: "",
            };
            return (
              <tr key={student._id}>
                <td style={{ verticalAlign: "middle" }}>
                  {student.admission_no}
                </td>
                <td style={{ verticalAlign: "middle" }}>{student.fullname}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={studentMark.score}
                    onChange={(event) => handleMarksChange(event, student._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSaveMarks}>
        Save Marks
      </Button>
    </div>
  );
};

export default Marks;
