import { useState } from "react";

function EmailOtpModal({
  email,
  onVerify,
  onClose,
}) {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    // API Call Here

    // const res = await verify(email, otp);

    if (otp === "123456") {
      onVerify();
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">

        {/* Email Icon */}
        <div className="otp-icon">
          📧
        </div>

        <h2>Email Verification</h2>

        <p>
          We've sent a <strong>6-digit OTP</strong> to
          <br />
          <strong>{email}</strong>
        </p>

        <input
          className="otp-input"
          type="text"
          placeholder="------"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* Timer */}
        <div className="otp-timer">
          OTP expires in <span>02:00</span>
        </div>

        {/* Resend */}
        <button
          type="button"
          className="resend-btn"
        >
          Resend OTP
        </button>

        {/* Buttons */}
        <div className="otp-buttons">
          <button
            type="button"
            className="verify-btn"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default EmailOtpModal;