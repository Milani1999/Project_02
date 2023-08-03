import React from 'react';
import './ProfilePage.css';
// import propic from '../../../assets/ImageResources/im01.jpg'

const ProfilePage = () => {
    const rows = [
        { label: 'Name In Full', value: 'John Doe' },
        { label: 'Date Of Birth', value: '1990-01-01' },
        { label: 'Address', value: '123 Main St, City' },
        { label: 'Admission Number', value: '12345' },
        { label: 'Class of Admission', value: 'Grade 1' },
        { label: 'Current Grade', value: 'Grade 5' },
      ];
    
      // Sample data for the Extra-Curricular Activities dropdown
      const extraCurricularActivities = [
        'Football',
        'Basketball',
        'Chess',
        'Music',
        'Dance',
        'Art',
      ];

      const parentDetails =[
        { label: "Father's name", value: 'John Doe' },
        { label: 'Occupation', value: 'Engineer' },
        { label: 'Address', value: '456 Park Ave, City' },
        { label: 'NIC Number', value: '123456789' },
        { label: 'Telephone Number', value: '+1 555-123-4567' },
        { label: "Mother's name", value: 'Jane Doe' },
        { label: 'Occupation', value: 'Doctor' },
        { label: 'Telephone Number', value: '+1 555-987-6543' },
      ];

      const emergencyRight =[
        {label: "Guardian's Name", value:"Mrs. Ivans"},
        {label: "Telephone Number", value:"0772332020"},
      ]

      const emergencyLeft =[
        {label: "Relationship To Student", value:"Aunt"},
        {label: "Occupation", value:"Data Analyst"},
      ]
    
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img src="##" alt="Profile" />
        </div>
        <div className="profile-details">
          <h2 className='student-head'>Sara Antony Louis</h2>
          <p>Grade 11</p>
        </div>
      </div>

      <div className="profile-columns">
        <div className="mothers-details">
          <h3 className='student-head'>Student Details</h3>

            <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
                {rows.map((row, index) => (
                <tr key={index}>
                    <td style={{ padding: '2px', textAlign: 'left' }}>{row.label}</td>
                    <td style={{ padding: '2px', textAlign: 'left' }}>{row.value}</td>
                </tr>
                ))}
                <tr>
                <td style={{ padding: '2px', textAlign: 'left' }}>Extra-Curricular Activities:</td>
                <td style={{ padding: '2px', textAlign: 'left' }}>
                    <select>
                    {extraCurricularActivities.map((activity, index) => (
                        <option key={index} value={activity}>
                        {activity}
                        </option>
                    ))}
                    </select>
                </td>
                </tr>
            </tbody>
            </table>  
        </div>

        <div className="vertical-line"></div>

        <div className="students-details">
          <h3>Parent's Details</h3>
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    {parentDetails.map((row, index) => (
                    <tr key={index}>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{row.label}</td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>{row.value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
<div><h3>In Case Of Emergency</h3></div>

      <div className="profile-columns">
       
        <div className="mothers-details">
        <table style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                    {emergencyRight.map((row, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', textAlign: 'left' }}>{row.label}</td>
                            <td style={{ padding: '8px', textAlign: 'left' }}>{row.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            
        </div>
        <div className="students-details">
          
        <table style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                    {emergencyRight.map((row, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', textAlign: 'left' }}>{row.label}</td>
                            <td style={{ padding: '8px', textAlign: 'left' }}>{row.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
