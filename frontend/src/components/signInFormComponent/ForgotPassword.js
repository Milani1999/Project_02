import './ForgotPassword.css';

const ForgotPassword = ({ onClose }) => {
    return (
        <div className="forgot-passsword-popup">
          <div className="forgot-passsword-popup-content">
            <h2>Forgot Password</h2>
            <div>
            <label>Enter your username : </label>
            <input type='text'/>
            </div>
            <div>
            <label>Enter your registered phone number : </label>
            <input type='text'/>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );
}

export default ForgotPassword;