import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import CustomPopup from "../configure/CustomPopup";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCity,
} from "react-icons/fa";
import "../styles/Authentication.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const closePopup = () => {
    setPopup({
      show: false,
      message: "",
      type: "error",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: loginData.email,
        password: loginData.password,
      });

      console.log("Login Response:", response.data);

      const data = response.data;

      if (!data.token) {
        setPopup({
          show: true,
          message: "Login failed. Token was not received.",
          type: "error",
        });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      console.log("Login successful");
      console.log("Role:", data.role);

      if (data.role === "ENGINEER") {
        navigate("/engineer/dashboard");
      } else if (data.role === "CITIZEN") {
        navigate("/user/dashboard");
      } else if (data.role === "DEPARTMENT") {
        navigate("/department/dashboard");
      } else if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setPopup({
          show: true,
          message: "Login successful, but your role is not recognized.",
          type: "error",
        });
      }

    } catch (error) {
      console.error("Login Error:", error);

      let message = "Something went wrong. Please try again.";

      if (error.response) {
        if (error.response.data?.message) {
          message = error.response.data.message;
        } else if (typeof error.response.data === "string") {
          message = error.response.data;
        } else {
          message = "Login failed. Please check your email and password.";
        }
      } else if (error.request) {
        message = "Unable to connect to the server.";
      }

      setPopup({
        show: true,
        message: message,
        type: "error",
      });
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

      <div className="auth-card">

        <div className="logo-section">

          <div className="logo-circle">
            <FaCity />
          </div>

          <h1>FixMyCity</h1>

          <p>
            Your Voice for a Cleaner, Safer, and Smarter City
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

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

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

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