import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCity,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Authentication.css";

function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = () => {
    const password = formData.newPassword;

    if (password.length === 0) return "";

    if (password.length < 6) return "Weak";

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@$!%*?&]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    console.log(formData);

    // TODO
    // Call Spring Boot Change Password API
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Logo */}

        <div className="logo-section">

          <div className="logo-circle">
            <FaCity />
          </div>

          <h1>FixMyCity</h1>

          <p>Smart City Complaint Management System</p>

        </div>

        {/* Title */}

        <div className="title-section">

          <h2>Change Password</h2>

          <p>Update your account password securely.</p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
            >
              {showCurrentPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          {/* New Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
            >
              {showNewPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <div className="password-strength">
            Password Strength :
            <strong> {getPasswordStrength()}</strong>
          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <button className="auth-btn">
            Update Password
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="bottom-text">

          Back to

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ChangePassword;