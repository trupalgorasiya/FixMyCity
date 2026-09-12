import { useEffect, useState } from "react";
import axios from "axios";

function EmailOtpModal({
  email,
  attachments = [],
  onVerify,
  onClose,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="otp-modal">

      <div className="otp-modal-content">

        <h2>Verify Email</h2>

        <p>
          OTP has been sent to:
        </p>

        <p>
          <strong>{email}</strong>
        </p>

        <div>
          <label htmlFor="otp">
            Enter 6-digit OTP
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            maxLength={6}
            placeholder="Enter OTP"
            onChange={handleOtpChange}
            disabled={loading}
          />
        </div>

        <p>
          {timeLeft > 0 ? (
            <>
              OTP expires in{" "}
              <strong>{formattedTime}</strong>
            </>
          ) : (
            <strong>OTP Expired</strong>
          )}
        </p>

        <button
          type="button"
          onClick={handleVerifyButton}
          disabled={loading || timeLeft <= 0}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default EmailOtpModal;