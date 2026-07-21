import { useMemo } from "react";
import "./Dashboard.css";

import {
  FaClipboardList,
  FaUserCog,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ==========================================================
   CUSTOM MAP MARKER
========================================================== */

const createMarkerIcon = (color) =>
  new L.DivIcon({
    html: `<div class="complaint-marker" style="background:${color};"></div>`,
    className: "custom-marker",
  });

const complaintIcons = {
  Pending: createMarkerIcon("#ef4444"),
  Assigned: createMarkerIcon("#f59e0b"),
  "In Progress": createMarkerIcon("#8b5cf6"),
  Resolved: createMarkerIcon("#22c55e"),
};

function Dashboard() {

  /* ==========================================================
     LOGGED DEPARTMENT
  ========================================================== */

  const loggedDepartment = "Road Department";

  /* ==========================================================
     DUMMY COMPLAINT DATA
  ========================================================== */

  const complaintData = [
    {
      id: "CMP001",
      citizen: "Rahul Patel",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Amit Patel",
      priority: "High",
      status: "Pending",
      address: "Satellite",
      latitude: 23.0225,
      longitude: 72.5714,
    },

    {
      id: "CMP002",
      citizen: "Jeel Bhalani",
      category: "Road Crack",
      department: "Road Department",
      engineer: "Jay Shah",
      priority: "Medium",
      status: "Assigned",
      address: "Nikol",
      latitude: 23.0488,
      longitude: 72.6726,
    },

    {
      id: "CMP003",
      citizen: "Priya Shah",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Ravi Kumar",
      priority: "High",
      status: "Resolved",
      address: "Bopal",
      latitude: 23.0396,
      longitude: 72.4651,
    },

    {
      id: "CMP004",
      citizen: "Harsh Patel",
      category: "Road Damage",
      department: "Road Department",
      engineer: "",
      priority: "Low",
      status: "Pending",
      address: "Gota",
      latitude: 23.0911,
      longitude: 72.5304,
    },

    {
      id: "CMP005",
      citizen: "Amit Shah",
      category: "Road Crack",
      department: "Road Department",
      engineer: "Karan Patel",
      priority: "Medium",
      status: "In Progress",
      address: "Navrangpura",
      latitude: 23.0375,
      longitude: 72.566,
    },
  ];

  /* ==========================================================
     ENGINEERS
  ========================================================== */

  const engineers = [
    {
      id: 1,
      name: "Amit Patel",
      assigned: 8,
      performance: 94,
    },

    {
      id: 2,
      name: "Jay Shah",
      assigned: 6,
      performance: 88,
    },

    {
      id: 3,
      name: "Ravi Kumar",
      assigned: 5,
      performance: 81,
    },

    {
      id: 4,
      name: "Karan Patel",
      assigned: 7,
      performance: 91,
    },

    {
      id: 5,
      name: "Nilesh Joshi",
      assigned: 4,
      performance: 78,
    },
  ];

  /* ==========================================================
     DEPARTMENT COMPLAINTS
  ========================================================== */

  const departmentComplaints = useMemo(() => {

    return complaintData.filter(
      (item) => item.department === loggedDepartment
    );

  }, []);

  /* ==========================================================
     DASHBOARD STATS
  ========================================================== */

  const dashboardStats = useMemo(() => {

    return [

      {
        title: "Total Complaints",
        value: departmentComplaints.length,
        icon: <FaClipboardList />,
        color: "#2563eb",
        bg: "#eff6ff",
      },

      {
        title: "Pending",
        value: departmentComplaints.filter(
          (item) => item.status === "Pending"
        ).length,
        icon: <FaClock />,
        color: "#f59e0b",
        bg: "#fff7ed",
      },

      {
        title: "Assigned",
        value: departmentComplaints.filter(
          (item) => item.status === "Assigned"
        ).length,
        icon: <FaUserCog />,
        color: "#8b5cf6",
        bg: "#f3e8ff",
      },

      {
        title: "Resolved",
        value: departmentComplaints.filter(
          (item) => item.status === "Resolved"
        ).length,
        icon: <FaCheckCircle />,
        color: "#16a34a",
        bg: "#ecfdf5",
      },

    ];

  }, [departmentComplaints]);

  /* ==========================================================
     MAP DATA
  ========================================================== */

  const mapComplaints = useMemo(() => {

    return departmentComplaints.filter(
      (item) => item.latitude && item.longitude
    );

  }, [departmentComplaints]);

  return (

    <div className="department-dashboard">

      {/* ==========================================================
          WELCOME SECTION
      ========================================================== */}

      <div className="welcome-card">

        <div className="welcome-content">

          <h1>
            Welcome Back Department Officer 👨‍💼
          </h1>

          <p>
            Monitor your department activities, track complaint
            locations, view engineer performance and overall
            department statistics from one dashboard.
          </p>

          <div className="system-status">

            <span className="status-dot"></span>

            <span>
              Department :
              <strong> {loggedDepartment}</strong>
            </span>

          </div>

        </div>

        <button className="dashboard-btn">
          Generate Report
        </button>

      </div>

      {/* ==========================================================
          STATISTICS
      ========================================================== */}

      <div className="stats-grid">

        {dashboardStats.map((card) => (

          <div
            key={card.title}
            className="stats-card"
          >

            <div
              className="stats-icon"
              style={{
                background: card.bg,
                color: card.color,
              }}
            >
              {card.icon}
            </div>

            <div className="stats-content">

              <h2>{card.value}</h2>

              <p>{card.title}</p>

            </div>

          </div>

        ))}

      </div>

      {/* ==========================================================
          MAIN GRID START
      ========================================================== */}

      <div className="department-dashboard-grid">

        {/* LEFT PANEL START */}

        <div className="left-panel">
                  {/* ======================================================
              COMPLAINT LOCATION MAP
          ====================================================== */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaMapMarkerAlt />

                {" "}Complaint Locations

              </h2>

            </div>

            <div className="complaint-map">

              <MapContainer
                center={[23.0225, 72.5714]}
                zoom={12}
                scrollWheelZoom={false}
                style={{
                  height: "450px",
                  width: "100%",
                  borderRadius: "16px",
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapComplaints.map((item) => (

                  <Marker
                    key={item.id}
                    position={[
                      item.latitude,
                      item.longitude,
                    ]}
                    icon={complaintIcons[item.status]}
                  >

                    <Popup>

                      <div className="popup-content">

                        <h3>{item.id}</h3>

                        <p>

                          <strong>Citizen :</strong>{" "}

                          {item.citizen}

                        </p>

                        <p>

                          <strong>Category :</strong>{" "}

                          {item.category}

                        </p>

                        <p>

                          <strong>Priority :</strong>{" "}

                          {item.priority}

                        </p>

                        <p>

                          <strong>Status :</strong>{" "}

                          {item.status}

                        </p>

                        <p>

                          <strong>Engineer :</strong>{" "}

                          {item.engineer || "Not Assigned"}

                        </p>

                        <p>

                          <strong>Location :</strong>{" "}

                          {item.address}

                        </p>

                      </div>

                    </Popup>

                  </Marker>

                ))}

              </MapContainer>

            </div>

            {/* ======================================================
                MAP LEGEND
            ====================================================== */}

            <div className="map-legends">

              <div>

                <span className="legend-dot pending"></span>

                Pending

              </div>

              <div>

                <span className="legend-dot assigned"></span>

                Assigned

              </div>

              <div>

                <span className="legend-dot progress"></span>

                In Progress

              </div>

              <div>

                <span className="legend-dot resolved"></span>

                Resolved

              </div>

            </div>

          </div>

        </div>

        {/* ======================================================
            RIGHT PANEL
        ====================================================== */}

        <div className="right-panel">

          {/* ======================================================
              DEPARTMENT SUMMARY
          ====================================================== */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaBuilding />

                {" "}Department Summary

              </h2>

            </div>

            <div className="summary-list">

              <div className="summary-item">

                <span>Total Engineers</span>

                <strong>{engineers.length}</strong>

              </div>

              <div className="summary-item">

                <span>Available Engineers</span>

                <strong>3</strong>

              </div>

              <div className="summary-item">

                <span>Busy Engineers</span>

                <strong>2</strong>

              </div>

              <div className="summary-item">

                <span>Pending Complaints</span>

                <strong>

                  {
                    departmentComplaints.filter(
                      (item) => item.status === "Pending"
                    ).length
                  }

                </strong>

              </div>

              <div className="summary-item">

                <span>Assigned Complaints</span>

                <strong>

                  {
                    departmentComplaints.filter(
                      (item) => item.status === "Assigned"
                    ).length
                  }

                </strong>

              </div>

              <div className="summary-item">

                <span>Resolved Complaints</span>

                <strong>

                  {
                    departmentComplaints.filter(
                      (item) => item.status === "Resolved"
                    ).length
                  }

                </strong>

              </div>

            </div>

          </div>
                    {/* ======================================================
              ENGINEER PERFORMANCE
          ====================================================== */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaUserCog />

                {" "}Engineer Performance

              </h2>

            </div>

            <div className="engineer-performance-list">

              {engineers.map((engineer) => (

                <div
                  key={engineer.id}
                  className="engineer-performance-card"
                >

                  <div className="engineer-info">

                    <div className="engineer-avatar">

                      <FaUsers />

                    </div>

                    <div>

                      <h4>{engineer.name}</h4>

                      <span>

                        {engineer.assigned} Assigned Complaints

                      </span>

                    </div>

                  </div>

                  <div className="performance-progress">

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${engineer.performance}%`,
                        }}
                      ></div>

                    </div>

                    <span className="performance-score">

                      {engineer.performance}%

                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ======================================================
              QUICK DEPARTMENT INFO (Optional)
          ====================================================== */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaClipboardList />

                {" "}Quick Overview

              </h2>

            </div>

            <div className="summary-list">

              <div className="summary-item">

                <span>Today's New Complaints</span>

                <strong>4</strong>

              </div>

              <div className="summary-item">

                <span>Complaints In Progress</span>

                <strong>

                  {
                    departmentComplaints.filter(
                      (item) =>
                        item.status === "In Progress"
                    ).length
                  }

                </strong>

              </div>

              <div className="summary-item">

                <span>Average Resolution</span>

                <strong>2.8 Days</strong>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL END */}

      </div>

      {/* ==========================================================
          MAIN GRID END
      ========================================================== */}

    </div>

  );

}

export default Dashboard;