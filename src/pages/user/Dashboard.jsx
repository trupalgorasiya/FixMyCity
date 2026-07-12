import "../../styles/dashbord.css";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaPlusCircle,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaBell,
  FaArrowRight
} from "react-icons/fa";

function Dashboard() {

  const recentComplaints = [
    {
      id: "CMP-1001",
      category: "Road Damage",
      location: "MG Road",
      status: "Pending",
      date: "10 Jul 2026"
    },
    {
      id: "CMP-1002",
      category: "Garbage",
      location: "Nikol",
      status: "In Progress",
      date: "09 Jul 2026"
    },
    {
      id: "CMP-1003",
      category: "Street Light",
      location: "Satellite",
      status: "Resolved",
      date: "08 Jul 2026"
    }
  ];

  return (

    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>Welcome Back 👋</h1>

          <p>
            Manage your complaints, track their progress and support your community.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="dashboard-body">

        <div className="dashboard-card">

          <FaClipboardList size={35} color="#2563EB" />

          <h2>18</h2>

          <p>Total Complaints</p>

        </div>

        <div className="dashboard-card">

          <FaClock size={35} color="#F59E0B" />

          <h2>5</h2>

          <p>Pending</p>

        </div>

        <div className="dashboard-card">

          <FaSpinner size={35} color="#3B82F6" />

          <h2>7</h2>

          <p>In Progress</p>

        </div>

        <div className="dashboard-card">

          <FaCheckCircle size={35} color="#10B981" />

          <h2>6</h2>

          <p>Resolved</p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="dashboard-section">

        <h2>Quick Actions</h2>

        <div className="quick-actions">

          <div className="action-card">

            <FaPlusCircle size={32} color="#2563EB" />

            <h3>Report Complaint</h3>

            <p>Create a new complaint.</p>

            <button className="dashboard-btn">

              Open

            </button>

          </div>

          <div className="action-card">

            <FaMapMarkerAlt size={32} color="#2563EB" />

            <h3>Track Complaint</h3>

            <p>Track complaint status.</p>

            <button className="dashboard-btn">

              Track

            </button>

          </div>

          <div className="action-card">

            <FaThumbsUp size={32} color="#2563EB" />

            <h3>Support Complaint</h3>

            <p>Support existing complaints.</p>

            <button className="dashboard-btn">

              Support

            </button>

          </div>

        </div>

      </div>

      {/* Recent Complaints */}

      <div className="dashboard-section">

        <h2>Recent Complaints</h2>

        <div className="dashboard-box">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Category</th>

                <th>Location</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {

                recentComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.category}</td>

                    <td>{item.location}</td>

                    <td>

                      <span
                        className={
                          item.status === "Pending"
                            ? "status pending"
                            : item.status === "In Progress"
                            ? "status progress"
                            : "status completed"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>{item.date}</td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* Notifications */}

      <div className="dashboard-section">

        <h2>Latest Notifications</h2>

        <div className="dashboard-box">

          <p>

            <FaBell color="#2563EB" />

            &nbsp;&nbsp;
            Engineer has been assigned to your Road Damage complaint.

          </p>

          <br />

          <p>

            <FaBell color="#2563EB" />

            &nbsp;&nbsp;
            Your Street Light complaint has been resolved.

          </p>

          <br />

          <p>

            <FaBell color="#2563EB" />

            &nbsp;&nbsp;
            32 citizens supported your Garbage complaint.

          </p>

        </div>

      </div>

      {/* Complaint Timeline */}

      <div className="dashboard-section">

        <h2>Complaint Timeline</h2>

        <div className="dashboard-box">

          <p>✔ Complaint Submitted</p>

          <p>↓</p>

          <p>✔ Department Verified</p>

          <p>↓</p>

          <p>✔ Engineer Assigned</p>

          <p>↓</p>

          <p>⏳ Work In Progress</p>

          <p>↓</p>

          <p>⬜ Resolution Pending</p>

        </div>

      </div>

      {/* View All */}

      <div
        style={{
          marginTop: "35px",
          display: "flex",
          justifyContent: "center"
        }}
      >

        <button className="dashboard-btn">

          View All Complaints

          &nbsp;

          <FaArrowRight />

        </button>

      </div>

    </div>

  );

}

export default Dashboard;