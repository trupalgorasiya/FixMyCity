import { useState } from "react";
import "./Notification.css";

function Notification() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Complaint Assigned",
      message:
        "Your complaint CMP001 has been assigned to Road Department.",
      time: "10 Minutes Ago",
      read: false,
      type: "assigned",
    },
    {
      id: 2,
      title: "Status Updated",
      message:
        "Complaint CMP002 status changed to In Progress.",
      time: "1 Hour Ago",
      read: false,
      type: "progress",
    },
    {
      id: 3,
      title: "Complaint Resolved",
      message:
        "Complaint CMP003 has been successfully resolved.",
      time: "Yesterday",
      read: true,
      type: "resolved",
    },
  ]);

  const markAllRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      read: true,
    }));
    setNotifications(updated);
  };

  return (
    <div className="notification-page">

      <div className="notification-header">

        <div>
          <h1>Notifications</h1>
          <p>
            Stay updated with your complaint activities
          </p>
        </div>

        <button
          className="read-btn"
          onClick={markAllRead}
        >
          Mark All Read
        </button>

      </div>

      <div className="notification-list">

        {notifications.map((item) => (

          <div
            key={item.id}
            className={`notification-card ${
              item.read ? "read" : "unread"
            }`}
          >

            <div className="notification-icon">

              {item.type === "assigned" && "📋"}
              {item.type === "progress" && "⏳"}
              {item.type === "resolved" && "✅"}

            </div>

            <div className="notification-content">

              <h3>{item.title}</h3>

              <p>{item.message}</p>

              <span>{item.time}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notification;