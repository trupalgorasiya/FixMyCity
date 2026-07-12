import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCity,
} from "react-icons/fa";
import "../styles/Authentication.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(loginData);

    // Spring Boot API Call Here
  };

  return (
    <div className="auth-container">

      {/* Background Overlay */}
      <div className="auth-overlay"></div>

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

          <h2>Welcome Back 👋</h2>

          <p>Please login to continue</p>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password}
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

          {/* Remember */}

          <div className="login-options">

            <label>

              <input
                type="checkbox"
                name="remember"
                checked={loginData.remember}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          {/* Button */}

          <button className="auth-btn">

            Login

          </button>

        </form>

        {/* Divider */}

        <div className="divider">

          <span>OR</span>

        </div>

        {/* Register */}

        <div className="bottom-text">

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;