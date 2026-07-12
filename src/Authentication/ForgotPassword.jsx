import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCity,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck
} from "react-icons/fa";

import "../styles/Authentication.css"

function ForgotPassword() {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOTPChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;

    setOtp(newOTP);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const sendOTP = (e) => {
    e.preventDefault();
    console.log("OTP Sent To :", email);

    // TODO
    // Spring Boot Send OTP API

    setStep(2);
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    console.log("OTP :", otp.join(""));
    // TODO
    // Verify OTP
    setStep(3);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(password);
    // TODO
    // Update Password API

    setStep(4);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
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
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <div className="circle">
                {step > 1 ? <FaCheck /> : 1}
              </div>
              <p>Email</p>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <div className="circle">
                {step > 2 ? <FaCheck /> : 2}
              </div>
              <p>OTP</p>
            </div>

            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <div className="circle">
                3
              </div>
              <p>Password</p>
            </div>
          </div>
        )}

        {/* STEP 1 */}

        {step === 1 && (
          <form onSubmit={sendOTP}>
            <div className="title-section">
              <h2>Forgot Password</h2>
              <p>Enter your registered email.</p>
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="auth-btn"> Send OTP</button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (

          <form onSubmit={verifyOTP}>
            <div className="title-section">
              <h2>Verify OTP</h2>
              <p>Enter the OTP sent to</p>
              <strong>{email}</strong>
            </div>

            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOTPChange(e.target.value, index)
                  }
                />
              ))}

            </div>

            <button className="auth-btn"> Verify OTP </button>
          </form>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <form onSubmit={updatePassword}>
            <div className="title-section">
              <h2>Create New Password</h2>
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(!showPassword)
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
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>

            <button className="auth-btn">

              Update Password

            </button>

          </form>

        )}

        {/* SUCCESS */}

        {step === 4 && (

          <div className="success-box">

            <h2>

              Password Updated Successfully

            </h2>

            <p>

              Your password has been reset successfully.

            </p>

            <Link to="/login">

              <button className="auth-btn">

                Back To Login

              </button>

            </Link>

          </div>

        )}

      </div>

    </div>

  );

}

export default ForgotPassword;