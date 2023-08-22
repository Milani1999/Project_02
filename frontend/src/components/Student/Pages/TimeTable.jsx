import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimeTable.css";
import LoadingSpinner from "../../Loading/Loading";

const TimeTable = () => {
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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedID, setSelectedID] = useState("");

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
      alert("Particular staff has another period in this time");
    }
  };

  const getCellData = (weekday, period) => {
    const matchingCell = timetableData.find(
      (data) => data.weekday === weekday && data.period === period
    );

    if (matchingCell) {
      return (
        <button
          className="cell-data-time-table"
          onClick={() => handleCellClick(matchingCell._id)}
        >
          {matchingCell.subject}
          <br />({matchingCell.staff_name})
        </button>
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

  const handleCellClick = (_id) => {
    setSelectedID(_id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/timetable/${selectedID}`);
      setShowDeletePopup(false);
      alert("Item deleted successfully.");
      const updatedData = await fetchTimetableData(grade);
      setTimetableData(updatedData);
    } catch (error) {
      alert("Failed to delete item.");
    }
  };

  const handleCancelDelete = () => {
    setSelectedID("");
    setShowDeletePopup(false);
  };

  const times = [
    "07:45 am",
    "08:25 am",
    "09:10 am",
    "09:50 am",
    "10:45 am",
    "11:25 am",
    "12:10 pm",
    "12:50 pm",
  ];

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
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, period) => (
              <tr key={period}>
                <td>{time}</td>
                {Array.from({ length: weekdays }).map((_, weekday) => (
                  <td key={weekday}>{getCellData(weekday + 1, period + 1)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {popupVisible && (
        <div className="popup-background-timetable">
          <div className="add-period-popup">
            <h2>Create Time Table</h2>
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

      {showDeletePopup && selectedID && (
        <div className="popup-background-timetable">
          <div className="popup-container-delete">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <button className="btn btn-danger m-3" onClick={confirmDelete}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={handleCancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
