import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

function InputAlert() {
  const [inputValue, setInputValue] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleResetLink = async () => {
    try {
      if (!inputValue) {
        alert("Please fill all the fields");
      } else {
        const response = await fetch("/api/users/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: inputValue }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          setShowCancel(false);
          setInputValue("");
        } else {
          const errorData = await response.json();
          alert(errorData.message);
          setInputValue("");
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setShowCancel(false);
      setInputValue("");
    }
  };

  const handleClose = () => {
    setShowCancel(false);
    setInputValue("");
  };

  return (
    <div>
      <Link onClick={() => setShowCancel(true)}>Forgot password?</Link>

      <Popup open={showCancel} onClose={handleClose}>
        <div className="forgot-passsword-popup">
          <div className="forgot-passsword-popup-content">
            <h2>Reset your Password</h2>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Enter your registered Email"
                value={inputValue}
                className="form-control rounded-0"
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <Button
              onClick={() => handleResetLink()}
              className="btn btn-success w-100 rounded-0"
            >
              Send Link
            </Button>{" "}
            <Button
              onClick={handleClose}
              className="btn btn-danger w-100 rounded-0 mt-3"
            >
              Cancel
            </Button>{" "}
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default InputAlert;
