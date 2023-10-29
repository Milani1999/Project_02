import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Password changed. Please Login again");
          navigate("/login");
        } else {
          alert("Reset Link Expired");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <div className="reset-passsword-popup">
      <div className="reset-passsword-popup-content">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          <br/>
          <button
            onClick={handleClose}
            className="btn btn-danger w-100 rounded-0 mt-3"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
