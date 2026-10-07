import {
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import "./CustomPopup.css";

function CustomPopup({
  isOpen = true,
  show = true,
  title,
  message,
  type = "error",
  onClose,
  buttonText = "OK",
  showCancel = false,
  cancelText = "Cancel",
  onConfirm,
}) {
  if (isOpen === false || show === false) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "warning":
        return <FaExclamationTriangle />;
      case "info":
        return <FaInfoCircle />;
      default:
        return <FaExclamationCircle />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case "success":
        return "Success";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
      default:
        return "Notice";
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`custom-popup ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup-close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="popup-icon">{getIcon()}</div>

        <h3>{getTitle()}</h3>

        {message && <p>{message}</p>}

        <div className="popup-actions">
          {showCancel && (
            <button
              type="button"
              className="popup-button popup-button-secondary"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            className="popup-button popup-button-primary"
            onClick={handleConfirm}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomPopup;