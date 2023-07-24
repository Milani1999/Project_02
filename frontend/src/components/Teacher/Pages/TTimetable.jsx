import React, { useState } from 'react';
import './TTimetable.css';

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

  const handleGradeSelect = (e) => {
    const selectedGradeName = e.target.value;
    const grade = grades.find((grade) => grade.name === selectedGradeName);
    setSelectedGrade(grade);
    setTimetableData(grade.timetable);
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
              <div key={colIndex} className="timetable-cell">
                <div className="cell-content">
                  <div className="subject">{cellData.subject}</div>
                  <div className="teacher">{cellData.teacher}</div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
};

export default Timetable;

