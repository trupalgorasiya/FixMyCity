import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCity,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
} from "react-icons/fa";

import {
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
} from "../api/authApi";

import CustomPopup from "../configure/CustomPopup";

import "../styles/Authentication.css";

function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

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

  // =========================
  // OTP INPUT
  // =========================

  const handleOTPChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const newOTP = [...otp];

    newOTP[index] = value;

    setOtp(newOTP);

    if (value && index < 5) {

      const nextInput =
        document.getElementById(`otp-${index + 1}`);

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOTPKeyDown = (e, index) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      const previousInput =
        document.getElementById(`otp-${index - 1}`);

      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  // =========================
  // STEP 1 VALIDATION
  // =========================

  const validateEmail = () => {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      showError("Please enter your email address.");
      return false;
    }

    if (!emailRegex.test(cleanEmail)) {
      showError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // =========================
  // SEND OTP
  // =========================

  const sendOTP = async (e) => {

    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setLoading(true);

    try {

      const cleanEmail = email.trim();

      const response =
        await forgotPassword(cleanEmail);

      console.log(
        "Forgot Password Response:",
        response.data
      );

      setStep(2);

    } catch (error) {

      console.error(
        "Forgot Password Error:",
        error
      );

      let message =
        "Unable to send OTP. Please try again.";

      if (error.response?.data?.message) {

        message =
          error.response.data.message;

      } else if (
        typeof error.response?.data === "string"
      ) {

        message =
          error.response.data;

      } else if (error.request) {

        message =
          "Unable to connect to the server.";
      }

      showError(message);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const verifyOTP = async (e) => {

    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {

      showError(
        "Please enter the complete 6-digit OTP."
      );

      return;
    }

    setLoading(true);

    try {

      const response =
        await verifyForgotOtp(
          email.trim(),
          otpValue
        );

      console.log(
        "Forgot OTP Verification:",
        response.data
      );

      setStep(3);

    } catch (error) {

      console.error(
        "OTP Verification Error:",
        error
      );

      let message =
        "Invalid OTP. Please try again.";

      if (error.response?.data?.message) {

        message =
          error.response.data.message;

      } else if (
        typeof error.response?.data === "string"
      ) {

        message =
          error.response.data;
      }

      showError(message);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const validatePassword = () => {

    if (!password) {

      showError(
        "Please enter your new password."
      );

      return false;
    }

    if (password.length < 8) {

      showError(
        "Password must contain at least 8 characters."
      );

      return false;
    }

    if (!/[A-Z]/.test(password)) {

      showError(
        "Password must contain at least one uppercase letter."
      );

      return false;
    }

    if (!/[a-z]/.test(password)) {

      showError(
        "Password must contain at least one lowercase letter."
      );

      return false;
    }

    if (!/[0-9]/.test(password)) {

      showError(
        "Password must contain at least one number."
      );

      return false;
    }

    if (!/[@$!%*?&]/.test(password)) {

      showError(
        "Password must contain at least one special character."
      );

      return false;
    }

    if (!confirmPassword) {

      showError(
        "Please confirm your password."
      );

      return false;
    }

    if (password !== confirmPassword) {

      showError(
        "Passwords do not match."
      );

      return false;
    }

    return true;
  };

  // =========================
  // RESET PASSWORD
  // =========================

  const updatePassword = async (e) => {

    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setLoading(true);

    try {

      const response =
        await resetPassword(
          email.trim(),
          password,
          confirmPassword
        );

      console.log(
        "Reset Password Response:",
        response.data
      );

      setStep(4);

    } catch (error) {

      console.error(
        "Reset Password Error:",
        error
      );

      let message =
        "Unable to reset password. Please try again.";

      if (error.response?.data?.message) {

        message =
          error.response.data.message;

      } else if (
        typeof error.response?.data === "string"
      ) {

        message =
          error.response.data;
      }

      showError(message);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Popup */}

        {popup.show && (
          <CustomPopup
            message={popup.message}
            type={popup.type}
            onClose={closePopup}
          />
        )}

        {/* Logo */}

        <div className="logo-section">

          <div className="logo-circle">
            <FaCity />
          </div>

          <h1>FixMyCity</h1>

          <p>Password Recovery</p>

        </div>

        {/* Progress */}

        {step !== 4 && (

          <div className="progress">

            <div
              className={`step ${
                step >= 1 ? "active" : ""
              }`}
            >

              <div className="circle">

                {step > 1 ? (
                  <FaCheck />
                ) : (
                  1
                )}

              </div>

              <p>Email</p>

            </div>

            <div
              className={`step ${
                step >= 2 ? "active" : ""
              }`}
            >

              <div className="circle">

                {step > 2 ? (
                  <FaCheck />
                ) : (
                  2
                )}

              </div>

              <p>OTP</p>

            </div>

            <div
              className={`step ${
                step >= 3 ? "active" : ""
              }`}
            >

              <div className="circle">
                3
              </div>

              <p>Password</p>

            </div>

          </div>

        )}

        {/* =========================
            STEP 1
        ========================= */}

        {step === 1 && (

          <form onSubmit={sendOTP}>

            <div className="title-section">

              <h2>
                Forgot Password
              </h2>

              <p>
                Enter your registered email.
              </p>

            </div>

            <div className="input-group">

              <FaEnvelope className="input-icon" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
              />

            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : "Send OTP"}

            </button>

          </form>

        )}

        {/* =========================
            STEP 2
        ========================= */}

        {step === 2 && (

          <form onSubmit={verifyOTP}>

            <div className="title-section">

              <h2>
                Verify OTP
              </h2>

              <p>
                Enter the OTP sent to
              </p>

              <strong>
                {email}
              </strong>

            </div>

            <div className="otp-container">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOTPChange(
                      e.target.value,
                      index
                    )
                  }
                  onKeyDown={(e) =>
                    handleOTPKeyDown(
                      e,
                      index
                    )
                  }
                  autoComplete={
                    index === 0
                      ? "one-time-code"
                      : "off"
                  }
                />

              ))}

            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

          </form>

        )}

        {/* =========================
            STEP 3
        ========================= */}

        {step === 3 && (

          <form onSubmit={updatePassword}>

            <div className="title-section">

              <h2>
                Create New Password
              </h2>

              <p>
                Enter your new password.
              </p>

            </div>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </span>

            </div>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
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

        )}

        {/* =========================
            SUCCESS
        ========================= */}

        {step === 4 && (

          <div className="success-box">

            <h2>
              Password Updated Successfully
            </h2>

            <p>
              Your password has been reset successfully.
            </p>

            <button
              type="button"
              className="auth-btn"
              onClick={() =>
                navigate("/login")
              }
            >
              Back To Login
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ForgotPassword;