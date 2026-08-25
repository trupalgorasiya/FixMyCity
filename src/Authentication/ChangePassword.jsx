import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import {
  FaCity,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { changePassword } from "../api/authApi";
import CustomPopup from "../configure/CustomPopup";

import "../styles/Authentication.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showError = (message) => {
    setPopup({
      show: true,
      message: message,
      type: "error",
    });
  };

  const showSuccess = (message) => {
    setPopup({
      show: true,
      message: message,
      type: "success",
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      message: "",
      type: "error",
    });
  };

  const getPasswordStrength = () => {
    const password = formData.newPassword;

    if (password.length === 0) {
      return "";
    }

    if (password.length < 6) {
      return "Weak";
    }

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

  const validateForm = () => {
    if (!formData.currentPassword) {
      showError("Please enter your current password.");
      return false;
    }

    if (!formData.newPassword) {
      showError("Please enter your new password.");
      return false;
    }

    if (formData.newPassword.length < 8) {
      showError(
        "New password must contain at least 8 characters."
      );
      return false;
    }

    if (!/[A-Z]/.test(formData.newPassword)) {
      showError(
        "New password must contain at least one uppercase letter."
      );
      return false;
    }

    if (!/[a-z]/.test(formData.newPassword)) {
      showError(
        "New password must contain at least one lowercase letter."
      );
      return false;
    }

    if (!/[0-9]/.test(formData.newPassword)) {
      showError(
        "New password must contain at least one number."
      );
      return false;
    }

    if (!/[@$!%*?&]/.test(formData.newPassword)) {
      showError(
        "New password must contain at least one special character."
      );
      return false;
    }

    if (!formData.confirmPassword) {
      showError(
        "Please confirm your new password."
      );
      return false;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      showError(
        "New Password and Confirm Password do not match."
      );
      return false;
    }

    if (
      formData.currentPassword ===
      formData.newPassword
    ) {
      showError(
        "New password must be different from your current password."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      showError(
        "Your session has expired. Please login again."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      console.log(
        "Change Password Response:",
        response.data
      );

      showSuccess(
        response.data?.message ||
        "Password changed successfully."
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      let message =
        "Unable to change password. Please try again.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (
        typeof error.response?.data === "string"
      ) {
        message = error.response.data;
      } else if (error.response?.status === 401) {
        message =
          "Your session has expired. Please login again.";
      } else if (error.request) {
        message =
          "Unable to connect to the server.";
      }

      showError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {popup.show && (
        <CustomPopup
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}

      <div className="auth-card">

        {/* Logo */}

        <div className="logo-section">

          <div className="logo-circle">
            <FaCity />
          </div>

          <h1>FixMyCity</h1>

          <p>
            Smart City Complaint Management System
          </p>

        </div>

        {/* Title */}

        <div className="title-section">

          <h2>Change Password</h2>

          <p>
            Update your account password securely.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              placeholder="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowCurrentPassword(
                  !showCurrentPassword
                )
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
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowNewPassword(
                  !showNewPassword
                )
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
            <strong>
              {" "}
              {getPasswordStrength()}
            </strong>
          </div>

          {/* Confirm Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
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