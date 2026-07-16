import { useState } from "react";
import "./Notify.css";

function Notification() {
  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Complaint Received",
      message: "Road damage complaint reported in Nikol.",
      time: "5 mins ago",
      priority: "High",
      read: false,
    },
    {
      id: 2,
      title: "Engineer Assigned",
      message: "Rahul Sharma assigned to water leakage complaint.",
      time: "20 mins ago",
      priority: "Medium",
      read: false,
    },
    {
      id: 3,
      title: "Complaint Resolved",
      message: "Streetlight issue resolved successfully.",
      time: "1 hour ago",
      priority: "Low",
      read: true,
    },
    {
      id: 4,
      title: "Urgent Complaint",
      message: "Garbage overflow complaint requires immediate action.",
      time: "2 hours ago",
      priority: "High",
      read: false,
    },
  ]);

  const markRead = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications = notifications.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.message
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="notification-page">

      <div className="page-header">
        <h1>Notifications</h1>
        <p>
          Manage department alerts and complaint updates
        </p>
      </div>

      <div className="top-cards">

        <div className="summary-card">
          <h2>{notifications.length}</h2>
          <p>Total Notifications</p>
        </div>

        <div className="summary-card">
          <h2>
            {
              notifications.filter(
                (n) => !n.read
              ).length
            }
          </h2>
          <p>Unread</p>
        </div>

      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="notification-list">

        {filteredNotifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card ${
              item.read ? "read" : "unread"
            }`}
          >

            <div className="notification-left">

              <div className="icon-box">
                🔔
              </div>

              <div className="notification-details">

                <div className="title-row">
                  <h3>{item.title}</h3>

                  <span
                    className={`badge ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <p>{item.message}</p>

                <small>{item.time}</small>

              </div>

            </div>

            <div className="actions">

              {!item.read && (
                <button
                  className="read-btn"
                  onClick={() =>
                    markRead(item.id)
                  }
                >
                  Mark Read
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() =>
                  deleteNotification(item.id)
                }
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notification;