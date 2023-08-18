import React, { useState } from 'react';

function AssignStaff() {
  // Sample list of staff members
  const staffOptions = [
    { value: 'staff1', label: 'Staff 1' },
    { value: 'staff2', label: 'Staff 2' },
    { value: 'staff3', label: 'Staff 3' },
    // Add more staff members here
  ];

  const [selectedStaff, setSelectedStaff] = useState([]);
  const [savedStaff, setSavedStaff] = useState([]);

  const handleAddToSelected = (staff) => {
    if (!selectedStaff.find((selected) => selected.value === staff.value)) {
      setSelectedStaff([...selectedStaff, staff]);
    }
  };

  const handleSaveStaff = () => {
    setSavedStaff(selectedStaff);
    setSelectedStaff([]);
  };

  return (
    <div>
      <h2>Assign Staff</h2>
      <div>
        <p>Select Staff:</p>
        {staffOptions.map((staff) => (
          <div key={staff.value}>
            {staff.label}
            <button onClick={() => handleAddToSelected(staff)}>+</button>
          </div>
        ))}
      </div>
      <div>
        <p>Selected Staff:</p>
        <input
          type="text"
          value={selectedStaff.map((staff) => staff.label).join(', ')}
          readOnly
        />
        <button onClick={handleSaveStaff}>Save</button>
      </div>
      <div>
        <p>Saved Staff:</p>
        {savedStaff.map((staff) => (
          <div key={staff.value}>{staff.label}</div>
        ))}
      </div>
    </div>
  );
}

export default AssignStaff;
