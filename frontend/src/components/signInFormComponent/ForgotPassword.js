import React, { useState } from 'react';

function InputAlert() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleApiRequest = async () => {
    try {
      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputValue }),
      });

      const data = await response.json();

      // Handle the API response as needed
      console.log(data);
      // You can display a success message, update state, etc.
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, display an error message, etc.
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter email..."
      />
      <button onClick={handleApiRequest}>Send POST Request</button>
    </div>
  );
}

export default InputAlert;
