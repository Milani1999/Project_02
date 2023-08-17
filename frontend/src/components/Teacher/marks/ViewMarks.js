import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPopup from "./EditMarks";
import "./marks.css";
import LoadingSpinner from "../../Loading/Loading";

const ViewMarks = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [editStudentId, setEditStudentId] = useState("");
  const [editScore, setEditScore] = useState("");
  const [studentsForGrade, setStudentsForGrade] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [popupScores, setPopupScores] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    setShowAddButton(marks.length === 0);
  }, [marks]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      if (selectedYear && selectedTerm && selectedSubject && selectedGrade) {
        setIsLoading(true);

        const response = await axios.get(
          `/api/marks/viewmarks/${selectedYear}/${selectedTerm}/${selectedSubject}/${selectedGrade}`
        );

        const updatedMarks = await Promise.all(
          response.data.students.map(async (student) => {
            const studentData = await fetchStudentDetails(student.student);
            return { ...student, ...studentData };
          })
        );

        setMarks(updatedMarks);
        setShowAddButton(false);
      } else {
        setMarks([]);
        setShowAddButton(true);
      }
      setEditPopupOpen(false);
    } catch (error) {
      console.error(error);
      setMarks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (studentId, score) => {
    setEditStudentId(studentId);
    setEditScore(score);
    setEditPopupOpen(true);
  };

  const handleSavePopupScores = async () => {
    try {
      if (
        !selectedYear ||
        !selectedTerm ||
        !selectedSubject ||
        !selectedGrade
      ) {
        alert("Please select year, term, subject, and grade before saving.");
        return;
      }

      const validScores = [];

      Object.entries(popupScores).forEach(([studentId, score]) => {
        if (!isNaN(score)) {
          validScores.push({
            student: studentId,
            score: parseFloat(score),
          });
        } else if (isNaN(score)) {
          validScores.push({
            student: studentId,
            score: "AB",
          });
        }
      });

      if (validScores.length === studentsForGrade.length) {
        const newObject = {
          year: selectedYear,
          term: selectedTerm,
          subject: selectedSubject,
          grade: selectedGrade,
          students: validScores,
        };

        setIsSaving(true);
        console.log(isSaving);
        await axios.post(
          `/api/marks/${selectedYear}/${selectedTerm}/${selectedSubject}/${selectedGrade}/create`,
          newObject
        );

        setIsSaving(false);
        setPopupScores({});
        setStudentsForGrade([]);
        setEditPopupOpen(false);
        handleFetchMarks();

        alert("New scores added successfully!");
      } else {
        alert("Please fill all the fields");
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
      alert("Error saving scores. Please try again.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (editStudentId && editScore !== undefined) {
        let updatedScore = parseFloat(editScore);
        if (isNaN(updatedScore)) {
          updatedScore = "AB";
        }

        const updatedMarks = marks.map((student) =>
          student.student === editStudentId
            ? { ...student, score: updatedScore }
            : student
        );

        setMarks(updatedMarks);

        await axios.put(
          `/api/marks/viewmarks/${selectedYear}/${selectedTerm}/${selectedSubject}/${selectedGrade}`,
          {
            students: updatedMarks,
          }
        );

        alert("Score updated successfully!");
        setEditPopupOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating score. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditPopupOpen(false);
  };

  const handleAddMarks = async () => {
    try {
      const response = await axios.get(`/api/students/grade/${selectedGrade}`);
      setStudentsForGrade(response.data);
      setShowAddButton(false);
      setIsAddPopupOpen(true);
    } catch (error) {
      console.error(error);
      alert("Error fetching students. Please try again.");
    }
  };

  const handleScoreChange = (studentId, newScore) => {
    setPopupScores((prevScores) => ({
      ...prevScores,
      [studentId]: newScore,
    }));
  };

  const handleCancelAddMarks = () => {
    setStudentsForGrade([]);
    setShowAddButton(true);
    setIsAddPopupOpen(false);
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
          <label htmlFor="subjectSelect">Select Subject: </label>
          <select
            id="subjectSelect"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.subject_name}>
                {subject.subject_name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="gradeSelect">Select Grade: </label>
          <select
            id="grade_Select"
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
        {showAddButton && (
          <button className="btn btn-secondary" onClick={handleAddMarks}>
            Add Marks
          </button>
        )}
      </div>
      {studentsForGrade.length > 0 && isAddPopupOpen && (
        <div className="marks-popup-container">
          <div className="marks-popup">
            <h3>
              Year : {selectedYear} | Term : {selectedTerm} | Grade :{" "}
              {selectedGrade} | Subject : {selectedSubject}
            </h3>
            <div className="AddTable">
              <table>
                <thead>
                  <tr>
                    <th>Admission No</th>
                    <th>Student Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsForGrade.map((student) => (
                    <tr key={student._id}>
                      <td>{student.admission_no}</td>
                      <td>{student.fullname}</td>
                      <td>
                        <input
                          type="text"
                          value={popupScores[student._id] || " "}
                          onChange={(e) =>
                            handleScoreChange(student._id, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={handleSavePopupScores}>
              Add
            </button>
            <button className="btn btn-danger" onClick={handleCancelAddMarks}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : marks.length > 0 ? (
        <div className="view-marks-table">
          <table>
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((student) => (
                <tr key={student._id}>
                  <td>{student.admission_no}</td>
                  <td>{student.fullname}</td>
                  <td>{student.score} </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleEditClick(student.student, student.score)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="p-error">No student marks found.</h1>
      )}
      {editPopupOpen && (
        <EditPopup
          score={editScore}
          onChangeScore={(newScore) => setEditScore(newScore)}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default ViewMarks;
