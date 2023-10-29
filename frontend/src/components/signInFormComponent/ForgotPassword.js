import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
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
      await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inputValue }),
      });

      alert("Reset Link succeefully sent to your Email address");
      setShowCancel(false);
      setInputValue("");
    } catch (error) {
      alert("User not found : Incorrect email address");
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
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your registered Email"
            />
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
