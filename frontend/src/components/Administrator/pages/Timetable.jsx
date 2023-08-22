import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";
import LoadingSpinner from "../../Loading/Loading";

const TimeTable = () => {
  const periods = 8;
  const weekdays = 5;

  const [timetableData, setTimetableData] = useState([]);
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedWeekday, setSelectedWeekday] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [subjectStaffMap, setSubjectStaffMap] = useState({});
  const [staffIdMap, setStaffIdMap] = useState({});

  useEffect(() => {
    fetchSubjects();
    fetchStaff();
  }, []);

  useEffect(() => {
    if (grade !== "") {
      const fetchData = async () => {
        const data = await fetchTimetableData(grade);
        setTimetableData(data);
      };
      fetchData();
    }
  }, [grade]);

  const fetchTimetableData = async (grade) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/timetable/grade/${grade}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching timetable data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/subjects");
      const subjectMap = {};
      response.data.forEach((subject) => {
        subjectMap[subject.subject_name] = subject.staff_name;
      });
      setSubjects(response.data);
      setSubjectStaffMap(subjectMap);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleAddClick = (weekday, period) => {
    setSelectedWeekday(weekday);
    setSelectedPeriod(period);
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedStaff("");
    setSelectedSubject("");
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get("/api/staff");
      const staffData = response.data;
      const idMap = {};
      staffData.forEach((staff) => {
        idMap[staff.fullname] = staff._id;
      });
      setStaffIdMap(idMap);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const handlePopupSave = async () => {
    try {
      const selectedStaffId = staffIdMap[selectedStaff];
      await axios.post(
        `/api/timetable/create/${selectedWeekday}/${selectedPeriod}/${grade}`,
        {
          subject: selectedSubject,
          staff: [
            {
              staff_id: selectedStaffId,
              staff_name: selectedStaff,
            },
          ],
        }
      );
      const updatedData = await fetchTimetableData(grade);
      setTimetableData(updatedData);
      alert("Saved successfully!");
      setPopupVisible(false);
      setSelectedStaff("");
      setSelectedSubject("");
    } catch (error) {
      console.error("Error while saving:", error);
    }
  };

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );
    if (matchingCell) {
      return (
        <span>
          {matchingCell.subject}
          <br />({matchingCell.staff_name})
        </span>
      );
    } else {
      return (
        <button
          className="add-period"
          onClick={() => handleAddClick(weekday, period)}
        >
          +
        </button>
      );
    }
  };

  return (
    <div className="time-table-admin">
      <div>
        <label>Select Grade:</label>
        <select value={grade} onChange={handleGradeChange}>
          <option value="">Select Grade</option>
          {Array.from({ length: 11 }, (_, index) => (
            <option key={index} value={index + 1}>
              Grade {index + 1}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="timeTable-admin">
          <thead>
            <tr>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: periods }).map((_, period) => (
              <tr key={period}>
                <td>Period : {period + 1}</td>
                {Array.from({ length: weekdays }).map((_, weekday) => (
                  <td
                    key={weekday}
                    onClick={() => handleAddClick(weekday + 1, period + 1)}
                  >
                    {getCellData(weekday + 1, period + 1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {popupVisible && (
        <div className="popup-background">
          <div className="add-period-popup">
            <div className="select-staff-add-popup">
              <label>Select Subject : </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedStaff("");
                }}
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject.subject_name}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-subject-add-popup">
              <label>Select Staff : </label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">Select a staff</option>
                {subjectStaffMap[selectedSubject]?.map((staffName) => (
                  <option key={staffName} value={staffName}>
                    {staffName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <button className="btn btn-success m-2" onClick={handlePopupSave}>
              Save
            </button>
            <button className="btn btn-danger" onClick={handlePopupClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
