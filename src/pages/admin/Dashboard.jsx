import "../../styles/dashbord.css";
import "./AdminDashboard.css";

import {
  FaUsers,
  FaClipboardList,
  FaBuilding,
  FaUserCog,
  FaChartLine,
  FaFileAlt,
  FaBell,
  FaCog,
  FaArrowRight
} from "react-icons/fa";

function Dashboard() {

  const recentComplaints = [
    { id: "CMP-1001", category: "Road Damage", status: "Pending" },
    { id: "CMP-1002", category: "Garbage", status: "Assigned" },
    { id: "CMP-1003", category: "Water Leakage", status: "Resolved" },
    { id: "CMP-1004", category: "Street Light", status: "Pending" }
  ];

  return (

    <div className="admin-dashboard">

      <div className="welcome-card">

        <div>

          <h1>Welcome Back, Administrator 👋</h1>

          <p>
            Monitor complaints, departments, engineers and system analytics from one place.
          </p>

          <div className="system-status">

            <span className="status-dot"></span>

            <span>System Status : Online</span>

          </div>

        </div>

        <button className="dashboard-btn">
          Generate Report
        </button>

      </div>

      <div className="stats-grid">

        <div className="stats-card">

          <div className="stats-icon">
            <FaClipboardList />
          </div>

          <h2>2,156</h2>

          <p>Total Complaints</p>

        </div>

        <div className="stats-card">

          <div className="stats-icon">
            <FaUsers />
          </div>

          <h2>12,458</h2>

          <p>Total Users</p>

        </div>

        <div className="stats-card">

          <div className="stats-icon">
            <FaBuilding />
          </div>

          <h2>12</h2>

          <p>Departments</p>

        </div>

        <div className="stats-card">

          <div className="stats-icon">
            <FaUserCog />
          </div>

          <h2>48</h2>

          <p>Engineers</p>

        </div>

      </div>

      <div className="admin-dashboard-grid">

        <div className="left-panel">

          <div className="dashboard-box">

            <h2>
              <FaChartLine />
              {" "}Monthly Complaint Analytics
            </h2>

            <div className="chart-placeholder">
              📈 Analytics Chart
            </div>

          </div>

          <div className="dashboard-box">

            <h2>
              <FaFileAlt />
              {" "}Recent Complaints
            </h2>

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {recentComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.category}</td>

                    <td>

                      <span
                        className={`status ${
                          item.status === "Pending"
                            ? "pending"
                            : item.status === "Assigned"
                            ? "assigned"
                            : "completed"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
                <div className="right-panel">

          <div className="dashboard-box">

            <h2>Department Performance</h2>

            <div className="department-progress">

              <div className="progress-header">
                <span>Road Department</span>
                <span>95%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "95%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Water Department</span>
                <span>82%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "82%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Electric Department</span>
                <span>69%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "69%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Garbage Department</span>
                <span>91%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "91%" }}
                ></div>
              </div>

            </div>

          </div>

          {/* <div className="dashboard-box">

            <h2>Quick Actions</h2>

            <div className="quick-action-grid">

              <div className="quick-action-card">

                <FaUsers className="quick-icon" />

                <h4>Manage Users</h4>

                <p>Add, edit or remove users.</p>

                <button className="action-btn">
                  Open
                </button>

              </div>

              <div className="quick-action-card">

                <FaBuilding className="quick-icon" />

                <h4>Departments</h4>

                <p>Create and manage departments.</p>

                <button className="action-btn">
                  Open
                </button>

              </div>

              <div className="quick-action-card">

                <FaUserCog className="quick-icon" />

                <h4>Engineers</h4>

                <p>Assign and monitor engineers.</p>

                <button className="action-btn">
                  Open
                </button>

              </div>

              <div className="quick-action-card">

                <FaChartLine className="quick-icon" />

                <h4>Reports</h4>

                <p>View reports and analytics.</p>

                <button className="action-btn">
                  Open
                </button>

              </div>

            </div>

          </div> */}

          {/* <div className="dashboard-box">

            <h2>Pending Approvals</h2>

            <ul className="approval-list">

              <li>Department Admin Registration</li>

              <li>Engineer Account Request</li>

              <li>Complaint Escalation Request</li>

              <li>Department Creation Request</li>

            </ul>

          </div> */}

          <div className="dashboard-box">

            <h2>Recent Activities</h2>

            <ul className="activity-list">

              <li>
                <FaBell />
                <span>New user registered.</span>
              </li>

              <li>
                <FaClipboardList />
                <span>Complaint assigned to engineer.</span>
              </li>

              <li>
                <FaCog />
                <span>Department settings updated.</span>
              </li>

              <li>
                <FaFileAlt />
                <span>Monthly report generated.</span>
              </li>

              <li>
                <FaArrowRight />
                <span>Complaint resolved successfully.</span>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;