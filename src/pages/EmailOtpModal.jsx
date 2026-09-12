import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EmailOtpModel.css";

function EmailOtpModal({
  email,
  attachments = [],
  onVerify,
  onClose,
  onResend,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Backend OTP expires after 5 minutes
  const [timeLeft, setTimeLeft] = useState(300);

  // =========================================================
  // OTP TIMER
  // =========================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // =========================================================
  // OTP INPUT
  // =========================================================

  const handleOtpChange = (event) => {
    const value = event.target.value;

    // Only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Maximum 6 digits
    if (value.length > 6) {
      return;
    }

    setOtp(value);
  };

  // =========================================================
  // VERIFY OTP
  // =========================================================

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP.");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    if (timeLeft <= 0) {
      alert("OTP has expired.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // CREATE MULTIPART FORM DATA
      // =====================================================

      const formData = new FormData();

      formData.append("email", email);
      formData.append("otp", otp);

      // =====================================================
      // ADD COMPLAINT MEDIA
      // =====================================================

      if (attachments && attachments.length > 0) {
        attachments.forEach((file) => {
          formData.append("media", file);
        });
      }

      // =====================================================
      // CALL BACKEND
      // =====================================================

      const response = await axios.post(
        "http://localhost:8085/api/guest-complaint/verify-otp",
        formData
      );

      console.log("Guest complaint verification response:");
      console.log(response.data);

      // =====================================================
      // SEND RESPONSE TO REPORT COMPLAINT
      // =====================================================

      if (onVerify) {
        onVerify(response.data);
      }

    } catch (error) {
      console.error(
        "Guest complaint OTP verification failed:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid or expired OTP.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // VERIFY BUTTON
  // =========================================================

  const handleVerifyButton = (event) => {
    event.preventDefault();

    verifyOtp();
  };

  // =========================================================
  // RESEND OTP
  // =========================================================

  const handleResend = async () => {
    if (!onResend) return;
    try {
      setResending(true);
      await onResend();
      setTimeLeft(300);
      setOtp("");
      alert("New OTP has been sent to your email.");
    } catch (err) {
      console.error("Resend OTP Error:", err);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // =========================================================
  // CLOSE
  // =========================================================

  const handleClose = (event) => {
    event.preventDefault();

    if (onClose) {
      onClose();
    }
  };

  // =========================================================
  // TIMER FORMAT
  // =========================================================

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="otp-overlay">

      <div className="otp-modal">

        <div className="otp-icon">
          ✉️
        </div>

        <h2>Verify Email</h2>

        <p>
          OTP has been sent to:<br />
          <strong>{email}</strong>
        </p>

        <div>
          <label
            htmlFor="otp"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: "#334155",
              fontSize: "14px",
            }}
          >
            Enter 6-digit OTP
          </label>

          <input
            id="otp"
            className="otp-input"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            maxLength={6}
            placeholder="· · · · · ·"
            onChange={handleOtpChange}
            disabled={loading || resending}
            autoFocus
          />
        </div>

        <div className="otp-timer">
          {timeLeft > 0 ? (
            <p>
              OTP expires in <span>{formattedTime}</span>
            </p>
          ) : (
            <p style={{ color: "#e53935", fontWeight: 600 }}>
              OTP Expired.{" "}
              {onResend && (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResend}
                  disabled={resending}
                >
                  {resending ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </p>
          )}
        </div>

        <div className="otp-buttons">
          <button
            type="button"
            className="verify-btn"
            onClick={handleVerifyButton}
            disabled={loading || resending || timeLeft <= 0}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleClose}
            disabled={loading || resending}
          >
            Cancel
          </button>
        </div>

      </div>

    </div>
  );
}

export default EmailOtpModal;