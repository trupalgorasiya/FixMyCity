import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCity,
} from "react-icons/fa";

import "../styles/Authentication.css";

function Register() {
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

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (password.length === 0) return "";

    if (password.length < 6) return "Weak";

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@$!%*?&]/.test(password)
    )
      return "Strong";

    return "Medium";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    console.log(formData);

    // TODO
    // Call Spring Boot Register API
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
          <h2>Create Account</h2>

          <p>Join our smart city platform</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="two-column">

            <div className="input-group">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
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
                required
              />
            </div>

          </div>

          {/* Email */}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Phone */}

          <div className="input-group">

            <FaPhone className="input-icon" />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              name="confirmPassword"
              placeholder="Confirm Password"
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

          {/* Terms */}

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

          {/* Register */}

          <button className="auth-btn">

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