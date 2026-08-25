import { useState } from "react";
import {
  FaTimes,
  FaShieldAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import "./OtpPopup.css";

function OtpPopup({ email, loading, onVerify, onClose }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must contain 6 digits.");
      return;
    }

    try {
      await onVerify(otp);
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);

    if (error) {
      setError("");
    }
  };

  return (
    <div className="otp-overlay">

      <div className="otp-popup">

        <button
          type="button"
          className="otp-close"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes />
        </button>

        <div className="otp-icon">
          <FaShieldAlt />
        </div>

        <h2>Verify Your Email</h2>

        <p>
          We have sent a verification OTP to
        </p>

        <strong>{email}</strong>

        {error && (
          <div className="otp-error">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            inputMode="numeric"
            autoComplete="one-time-code"
            disabled={loading}
            required
          />

          <button
            type="submit"
            className="otp-verify-btn"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default OtpPopup;