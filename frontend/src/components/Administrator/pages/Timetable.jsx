import React, { useState, useEffect } from 'react';
import './Timetable.css';
import axios from 'axios';
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const availableSubjects = [
  'Math',
  'Science',
  'English',
  'History',
  'Art',
  'Music',
  'Physical Education',
];

const availableTeachers = [
  'Mr. Perera',
  'Ms. Kamali',
  'Mrs. Amali',
  'Mr. Sara',
  'Ms. Dayana',
  'Mr. Dias',
  'Mrs. Roshini',
];

const grades = [
  
  {
    name: 'Grade 1',
    
    timetable: [
      
      ['8:00 AM', { subject: 'Math', teacher: 'Mr. Perera' }, { subject: 'Science', teacher: 'Ms. Kamali' }, { subject: 'English', teacher: 'Mrs. Amali' }, { subject: 'History', teacher: 'Mr. Sara' }, { subject: 'Art', teacher: 'Ms. Dayana' }],
      ['8:30 AM', { subject: 'Math', teacher: 'Mr. Perera' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['9:00 AM', { subject: 'Math', teacher: 'Mr. Perera' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['9:30 AM', { subject: 'Math', teacher: 'Mr. Perera' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['10:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['11:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['11:30 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['12:00 AM', { subject: 'Math', teacher: 'Mr. Perera' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
     
    ],
  },
  {
    name: 'Grade 2',
    timetable: [
      ['8:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: 'Math', teacher: 'Mrs. Roshini' }, { subject: 'English', teacher: 'Ms. Kamali' }, { subject: 'Art', teacher: 'Mr. Dias' }, { subject: 'Physical Education', teacher: 'Ms. Dayana' }],
      ['8:30 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['9:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['9:30 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['9:30 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['10:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['10:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
      ['10:00 AM', { subject: 'Science', teacher: 'Mr. Dias' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }, { subject: '', teacher: '' }],
    ],
  },
];

const Timetable = () => {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [timetableData, setTimetableData] = useState(selectedGrade.timetable);
  const [showModal, setShowModal] = useState(false);
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await axios.get('/api/timetable');
      if (response.data && response.data.length > 0) {
        setSelectedGrade(response.data[0]);
        setTimetableData(response.data[0].timetable);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const handleCellUpdate = async () => {
    try {
      const updatedTimetableData = [...timetableData];
      updatedTimetableData[selectedCellData.timeIndex][daysOfWeek.indexOf(selectedCellData.day) + 1] = {
        subject: selectedCellData.subject,
        teacher: selectedCellData.teacher,
      };
      setTimetableData(updatedTimetableData);
      setShowModal(false);
      setPopupMessage('Timetable updated successfully!');
      setShowPopup(true);

      await axios.post('/api/timetable', {
        grade: selectedGrade.name,
        timetable: updatedTimetableData,
      });
    } catch (error) {
      console.error('Error updating timetable data:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleGradeSelect = (e) => {
    const selectedGradeName = e.target.value;
    const grade = grades.find((grade) => grade.name === selectedGradeName);
    setSelectedGrade(grade);
    setTimetableData(grade.timetable);
  };

  const handleCellClick = (cellData, rowIndex, colIndex) => {
    setSelectedCellData({
      subject: cellData.subject,
      teacher: cellData.teacher,
      day: daysOfWeek[colIndex - 1],
      timeIndex: rowIndex,
    });
    setShowModal(true);
  };

  return (
    <div className="timetable-container">
      <h1>
        <center>Timetable</center>
      </h1>
      <div className="grade-selection">
        <label htmlFor="grade">Select Grade:</label>
        <select id="grade" value={selectedGrade.name} onChange={handleGradeSelect}>
          {grades.map((grade) => (
            <option key={grade.name} value={grade.name}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>
      <div className="timetable-header">
        <div className="timetable-cell empty">Time</div>
        {daysOfWeek.map((day) => (
          <div key={day} className="timetable-cell header">
            {day}
          </div>
        ))}
      </div>
      {timetableData.map((rowData, rowIndex) => (
        <div key={rowIndex} className="timetable-row">
          <div className="timetable-cell time">{rowData[0]}</div>
          {rowData.map((cellData, colIndex) =>
            colIndex !== 0 ? (
              <div
                key={colIndex}
                className="timetable-cell"
                onClick={() => handleCellClick(cellData, rowIndex, colIndex)}
              >
                <div className="cell-content">
                  <div className="subject">{cellData.subject}</div>
                  <div className="teacher">{cellData.teacher}</div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Edit Subject and Teacher</p>
            <div className="select-container">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                value={selectedCellData.subject}
                onChange={(e) =>
                  setSelectedCellData({
                    ...selectedCellData,
                    subject: e.target.value,
                  })
                }
              >
                <option value="">-- Select Subject --</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-container">
              <label htmlFor="teacher">Teacher:</label>
              <select
                id="teacher"
                value={selectedCellData.teacher}
                onChange={(e) =>
                  setSelectedCellData({
                    ...selectedCellData,
                    teacher: e.target.value,
                  })
                }
              >
                <option value="">-- Select Teacher --</option>
                {availableTeachers.map((teacher) => (
                  <option key={teacher} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleCellUpdate}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;