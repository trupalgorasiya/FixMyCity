import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import "./CustomPopup.css";

function CustomPopup({ message, type = "error", onClose }) {
  return (
    <div className="popup-overlay">
      <div className={`custom-popup ${type}`}>

        <button className="popup-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="popup-icon">
          {type === "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
        </div>

        <h3>
          {type === "success" ? "Success" : "Login Failed"}
        </h3>

        <p>{message}</p>

        <button className="popup-button" onClick={onClose}>
          OK
        </button>

      </div>
    </div>
  );
}

export default CustomPopup;