import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "./StatusPopup.css";

function StatusPopup({
  type = "success",
  title,
  message,
  details,
  buttonText = "Continue",
  onClose,
}) {
  const icons = {
    success: <FaCheckCircle />,
    error: <FaTimesCircle />,
    warning: <FaExclamationCircle />,
    info: <FaInfoCircle />,
  };

  return (
    <div className="status-popup-overlay">

      <div className={`status-popup status-${type}`}>

        <button
          type="button"
          className="status-popup-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className="status-popup-icon">
          {icons[type]}
        </div>

        <h2>
          {title}
        </h2>

        <p className="status-popup-message">
          {message}
        </p>

        {details && (
          <div className="status-popup-details">
            {details}
          </div>
        )}

        <button
          type="button"
          className="status-popup-button"
          onClick={onClose}
        >
          {buttonText}
        </button>

      </div>

    </div>
  );
}

export default StatusPopup;