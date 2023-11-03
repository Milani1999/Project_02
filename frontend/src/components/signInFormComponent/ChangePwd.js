import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      const id = user.id;

      try {
        const response = await axios.put(`/api/users/change-password/${id}`, {
          password,
          confirmPassword,
        });

        if (response.data.Status === "Password Changed Successfully") {
          alert("Password Changed Successfully.");
          navigate("/login");
        } else {
          alert("An error occurred while changing the password.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while changing the password.");
      }
    } else {
      alert("User information not found. Please login again.");
      navigate("/login");
    }
  };

  return (
    <div className="change-passsword-popup">
      <div className="reset-passsword-popup-content">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Re-Enter Password"
              autoComplete="off"
              name="confirmPassword"
              className="form-control rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
