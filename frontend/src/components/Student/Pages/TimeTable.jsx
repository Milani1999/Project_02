import React from 'react';
import './TimeTable.css';

const TimeTable = () => {
  return (
    <div className="timetable-container">
      <div className="grade">Grade: 9</div>
      <div className="day">Day: Monday</div>
      <table className="timetable">
        <thead>
          <tr>
            <th>Time</th>
            <th>Subject</th>
            <th>Subject Teacher</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>08.00-08.30 AM</td>
            <td>Mathematics</td>
            <td>Ms. Jeewa Iddamalgoda</td>
          </tr>
          <tr>
            <td>08.30-09.00 AM</td>
            <td>Science</td>
            <td>Ms.Umeshi Gonakumbura</td>
          </tr>
          <tr>
            <td>09.30-10.00 AM</td>
            <td>English</td>
            <td>Mr.Sujeewa Pushpakumara</td>
          </tr>
          <tr>
            <td>10.00-10.30 AM</td>
            <td>History</td>
            <td>Ms.Renuka Donald</td>
          </tr>
          <tr>
            <td>10.30-11.00 AM</td>
            <td>INTERVAL</td>
            <td></td>
          </tr>
          <tr>
            <td>11.00-11.30 AM</td>
            <td>Sinhala</td>
            <td>Ms.Kosala Lekamge</td>
          </tr>
          <tr>
            <td>11.30-12.00 AM</td>
            <td>English Literature</td>
            <td>Ms. Anoma Rathnayake</td>
          </tr>
          <tr>
            <td>12.00-12.30 AM</td>
            <td>Physical Education</td>
            <td>Mr.Ajith Gunathilake</td>
          </tr>
          <tr>
            <td>12.30-01.00 AM</td>
            <td>Art</td>
            <td>Ms.Dilmi Menik</td>
          </tr>
          <tr>
            <td>01.00-01.30 AM</td>
            <td>Science</td>
            <td>Ms.Umeshi Gonakumbura</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
