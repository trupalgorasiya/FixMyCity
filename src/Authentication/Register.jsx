import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCity,
} from "react-icons/fa";

import { registerUser, verifyOtp } from "../api/authApi";
import CustomPopup from "../configure/CustomPopup";
import OtpPopup from "../configure/OtpPopup";

import "../styles/Authentication.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const [otpPopup, setOtpPopup] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (password.length === 0) {
      return "";
    }

    if (password.length < 8) {
      return "Weak";
    }

    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@$!%*?&]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const showError = (message) => {
    setPopup({
      show: true,
      message: message,
      type: "error",
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      message: "",
      type: "error",
    });
  };

  const validateForm = () => {

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!firstName) {
      showError("Please enter your first name.");
      return false;
    }

    if (firstName.length < 2) {
      showError("First name must contain at least 2 characters.");
      return false;
    }

    if (!nameRegex.test(firstName)) {
      showError("First name can contain only letters and spaces.");
      return false;
    }

    if (!lastName) {
      showError("Please enter your last name.");
      return false;
    }

    if (lastName.length < 2) {
      showError("Last name must contain at least 2 characters.");
      return false;
    }

    if (!nameRegex.test(lastName)) {
      showError("Last name can contain only letters and spaces.");
      return false;
    }

    if (!email) {
      showError("Please enter your email address.");
      return false;
    }

    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address.");
      return false;
    }

    if (!phone) {
      showError("Please enter your mobile number.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      showError("Mobile number must contain exactly 10 digits.");
      return false;
    }

    if (!formData.password) {
      showError("Please enter a password.");
      return false;
    }

    if (formData.password.length < 8) {
      showError("Password must contain at least 8 characters.");
      return false;
    }

    if (!/[A-Z]/.test(formData.password)) {
      showError("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!/[a-z]/.test(formData.password)) {
      showError("Password must contain at least one lowercase letter.");
      return false;
    }

    if (!/[0-9]/.test(formData.password)) {
      showError("Password must contain at least one number.");
      return false;
    }

    if (!/[@$!%*?&]/.test(formData.password)) {
      showError("Password must contain at least one special character.");
      return false;
    }

    if (!formData.confirmPassword) {
      showError("Please confirm your password.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return false;
    }

    if (!formData.terms) {
      showError("Please accept Terms & Conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      const response = await registerUser(formData);

      console.log("Registration Response:", response.data);

      setOtpPopup(true);

    } catch (error) {

      console.error("Registration Error:", error);

      let message = "Registration failed. Please try again.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (typeof error.response?.data === "string") {
        message = error.response.data;
      } else if (error.request) {
        message = "Unable to connect to the server.";
      }

      showError(message);
    }
  };

 const handleVerifyOtp = async (otp) => {
  setOtpLoading(true);

  try {
    const response = await verifyOtp(formData.email, otp);

    console.log("OTP Verification Response:", response.data);

    setOtpPopup(false);

    setPopup({
      show: true,
      message: "Registration verified successfully. Redirecting to login...",
      type: "success",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {

    console.error("OTP Verification Error:", error);

    let message = "Invalid OTP. Please try again.";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (typeof error.response?.data === "string") {
      message = error.response.data;
    }

    throw new Error(message);

  } finally {
    setOtpLoading(false);
  }
};

  return (
    <div className="auth-container">

      <div className="auth-overlay"></div>

      {popup.show && (
        <CustomPopup
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}

      {otpPopup && (
        <OtpPopup
          email={formData.email}
          loading={otpLoading}
          onVerify={handleVerifyOtp}
          onClose={() => setOtpPopup(false)}
        />
      )}

      <div className="auth-card">

        <div className="logo-section">

          <div className="logo-circle">
            <FaCity />
          </div>

        </div>

        <div className="title-section">

          <h2>Citizen Registration</h2>

          <p>
            Join our smart city community and help build a cleaner,
            safer city.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="two-column">

            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />

            </div>

            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />

            </div>

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

          </div>

          <div className="input-group">

            <FaPhone className="input-icon" />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              maxLength="10"
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <div className="password-strength">

            Password Strength :
            <strong> {getPasswordStrength()}</strong>

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
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

          <div className="terms">

            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />

            <label>
              I agree to the Terms & Conditions and Privacy Policy.
            </label>

          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Create Account
          </button>

        </form>

        <div className="divider">

          <span>OR</span>

        </div>

        <div className="bottom-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;