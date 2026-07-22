import  { useState, useMemo } from "react";
import "../styles/NotificationPage.css";

import {
  FaBell,
  FaSearch,
  FaCheckDouble,
  FaTrash,
  FaSortAmountDown,
  FaSortAmountUp,
  FaClipboardCheck,
  FaClipboardList,
  FaUserPlus,
  FaExclamationTriangle,
  FaTools,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaCommentDots,
  FaStar,
  FaEye,
} from "react-icons/fa";

// Replace with your login role later
const currentRole = "admin";

/*
Possible Roles

admin
superadmin
department
engineer
citizen

*/

const notificationData = [
  {
    id: 1,
    role: "citizen",
    title: "Complaint Assigned",
    message: "Engineer Rahul Patel has been assigned to your complaint.",
    type: "assignment",
    priority: "High",
    read: false,
    time: "10 min ago",
    date: "Today",
    complaintId: "CMP1001",
  },

  {
    id: 2,
    role: "citizen",
    title: "Complaint Resolved",
    message: "Road repair completed successfully.",
    type: "completed",
    priority: "Medium",
    read: false,
    time: "1 hour ago",
    date: "Today",
    complaintId: "CMP1002",
  },

  {
    id: 3,
    role: "engineer",
    title: "New Complaint Assigned",
    message: "Road damage complaint assigned.",
    type: "assignment",
    priority: "High",
    read: false,
    time: "20 min ago",
    date: "Today",
    complaintId: "CMP2001",
  },

  {
    id: 4,
    role: "engineer",
    title: "Citizen Added Images",
    message: "New complaint evidence uploaded.",
    type: "comment",
    priority: "Low",
    read: true,
    time: "Yesterday",
    date: "Yesterday",
    complaintId: "CMP2002",
  },

  {
    id: 5,
    role: "department",
    title: "Engineer Completed Work",
    message: "Verify complaint completion.",
    type: "verification",
    priority: "High",
    read: false,
    time: "Today",
    date: "Today",
    complaintId: "CMP3001",
  },

  {
    id: 6,
    role: "department",
    title: "Engineer Rejected Assignment",
    message: "Please assign another engineer.",
    type: "warning",
    priority: "Medium",
    read: false,
    time: "Yesterday",
    date: "Yesterday",
    complaintId: "CMP3002",
  },

  {
    id: 7,
    role: "admin",
    title: "New User Registered",
    message: "John Doe created an account.",
    type: "user",
    priority: "Low",
    read: false,
    time: "5 min ago",
    date: "Today",
  },

  {
    id: 8,
    role: "admin",
    title: "Complaint Escalated",
    message: "Complaint pending more than 7 days.",
    type: "warning",
    priority: "High",
    read: false,
    time: "Today",
    date: "Today",
  },

  {
    id: 9,
    role: "superadmin",
    title: "Database Backup Completed",
    message: "Night backup completed successfully.",
    type: "system",
    priority: "Medium",
    read: true,
    time: "2 AM",
    date: "Today",
  },

  {
    id: 10,
    role: "superadmin",
    title: "Server CPU High",
    message: "CPU usage reached 91%.",
    type: "system",
    priority: "High",
    read: false,
    time: "30 min ago",
    date: "Today",
  },
];

const notificationIcons = {
  assignment: <FaClipboardList />,
  completed: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
  warning: <FaExclamationTriangle />,
  verification: <FaClipboardCheck />,
  comment: <FaCommentDots />,
  user: <FaUserPlus />,
  system: <FaTools />,
  info: <FaInfoCircle />,
};


const NotificationPage = () => {
  const [notifications, setNotifications] =
    useState(notificationData);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Newest");

  const roleNotifications = useMemo(() => {
    return notifications.filter(
      (item) => item.role === currentRole
    );
  }, [notifications]);

  const totalCount = roleNotifications.length;

  const unreadCount = roleNotifications.filter(
    (item) => !item.read
  ).length;

  const highPriority = roleNotifications.filter(
    (item) => item.priority === "High"
  ).length;

  const filteredNotifications = roleNotifications
    .filter((item) => {
      const keyword =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());

      const status =
        filter === "All"
          ? true
          : filter === "Unread"
          ? !item.read
          : filter === "Read"
          ? item.read
          : filter === item.priority;

      return keyword && status;
    })
    .sort((a, b) => {
      if (sort === "Newest") return b.id - a.id;
      return a.id - b.id;
    });

  /* =======================================================
        Actions
  ======================================================= */

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.role === currentRole
          ? { ...item, read: true }
          : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* =======================================================
        JSX
  ======================================================= */

  return (
    <div className="notification-page">

      {/* ========================= HEADER ====================== */}

      <div className="notification-header">

        <div>

          <h2>
            <FaBell /> Notifications
          </h2>

          <p>
            Welcome, {currentRole.toUpperCase()}
          </p>

        </div>

        <button
          className="mark-btn"
          onClick={markAllRead}
        >
          <FaCheckDouble />
          Mark All Read
        </button>

      </div>

      {/* ========================= STATISTICS ====================== */}

      <div className="notification-stats">

        <div className="stat-card">

          <FaBell />

          <h3>{totalCount}</h3>

          <span>Total</span>

        </div>

        <div className="stat-card">

          <FaClock />

          <h3>{unreadCount}</h3>

          <span>Unread</span>

        </div>

        <div className="stat-card">

          <FaExclamationTriangle />

          <h3>{highPriority}</h3>

          <span>High Priority</span>

        </div>

      </div>

      {/* ========================= FILTER BAR ====================== */}

      <div className="notification-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="toolbar-actions">

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Unread</option>
            <option>Read</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={() =>
              setSort(
                sort === "Newest"
                  ? "Oldest"
                  : "Newest"
              )
            }
          >
            {sort === "Newest"
              ? <FaSortAmountDown />
              : <FaSortAmountUp />}

            {sort}
          </button>

        </div>

      </div>

      {/* ========================= LIST ====================== */}

      <div className="notification-list">
              {filteredNotifications.length === 0 ? (

        <div className="empty-notification">

          <FaBell className="empty-icon" />

          <h3>No Notifications Found</h3>

          <p>
            You're all caught up! There are no notifications
            matching your current search or filter.
          </p>

        </div>

      ) : (

        filteredNotifications.map((item) => (

          <div
            key={item.id}
            className={`notification-card ${
              item.read ? "read" : "unread"
            }`}
          >

            {/* Left Icon */}

            <div className="notification-icon">

              {notificationIcons[item.type] || <FaBell />}

            </div>

            {/* Body */}

            <div className="notification-content">

              <div className="notification-top">

                <div>

                  <h3>{item.title}</h3>

                  <p>{item.message}</p>

                </div>

                {!item.read && (
                  <span className="unread-dot"></span>
                )}

              </div>

              {item.complaintId && (
                <div className="complaint-id">

                  Complaint ID :
                  <strong> {item.complaintId}</strong>

                </div>
              )}

              <div className="notification-meta">

                <span className="time">

                  <FaClock />

                  {item.date} • {item.time}

                </span>

                <span
                  className={`priority ${
                    item.priority.toLowerCase()
                  }`}
                >
                  {item.priority}
                </span>

              </div>

              {/* ===========================
                    Role Based Actions
              ============================ */}

              <div className="notification-actions">

                {/* Citizen */}

                {currentRole === "citizen" && (
                  <>
                    <button className="view-btn">

                      <FaEye />

                      View Complaint

                    </button>

                    <button className="star-btn">

                      <FaStar />

                      Rate

                    </button>
                  </>
                )}

                {/* Engineer */}

                {currentRole === "engineer" && (
                  <>
                    <button className="accept-btn">

                      Accept

                    </button>

                    <button className="view-btn">

                      View

                    </button>
                  </>
                )}

                {/* Department */}

                {currentRole === "department" && (
                  <>
                    <button className="assign-btn">

                      Assign Engineer

                    </button>

                    <button className="verify-btn">

                      Verify

                    </button>
                  </>
                )}

                {/* Admin */}

                {currentRole === "admin" && (
                  <>
                    <button className="view-btn">

                      View

                    </button>

                    <button className="report-btn">

                      Generate Report

                    </button>
                  </>
                )}

                {/* Super Admin */}

                {currentRole === "superadmin" && (
                  <>
                    <button className="view-btn">

                      View Details

                    </button>

                    <button className="system-btn">

                      Open Logs

                    </button>
                  </>
                )}

                {/* Common Buttons */}

                {!item.read && (

                  <button
                    className="read-btn"
                    onClick={() => {

                      setNotifications((prev) =>
                        prev.map((notification) =>
                          notification.id === item.id
                            ? {
                                ...notification,
                                read: true,
                              }
                            : notification
                        )
                      );

                    }}
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

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          </div>

        ))

      )}

      </div>

    </div>

  );
};

export default NotificationPage;