import { useMemo, useState } from "react";
import "./Dashboard.css";

import {
  FaClipboardList,
  FaUsers,
  FaUserCog,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaEye,
  FaMapMarkerAlt,
  FaBuilding,
  FaFileAlt,
  FaUserPlus,
  FaTimes,
  FaCamera,
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
   Custom Complaint Marker
========================================================== */

const createMarkerIcon = (color) =>
  new L.DivIcon({
    html: `<div class="complaint-marker" style="background:${color};"></div>`,
    className: "custom-marker",
  });

const complaintIcons = {
  Pending: createMarkerIcon("#ef4444"),
  Assigned: createMarkerIcon("#f59e0b"),
  "In Progress": createMarkerIcon("#9333ea"),
  Resolved: createMarkerIcon("#22c55e"),
};

function Dashboard() {
  /* ==========================================================
      Logged Department
  ========================================================== */

  const loggedDepartment = "Road Department";

  /* ==========================================================
      Complaint Data
  ========================================================== */

  const complaintData = [
    {
      id: "CMP-1001",
      citizen: "Rahul Patel",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Amit Patel",
      priority: "High",
      status: "Pending",
      date: "18 Jul 2026",
      address: "Satellite, Ahmedabad",
      latitude: 23.0225,
      longitude: 72.5714,
      description:
        "Large potholes causing accidents near the overbridge.",
    },

    {
      id: "CMP-1002",
      citizen: "Amit Shah",
      category: "Road Crack",
      department: "Road Department",
      engineer: "Jay Shah",
      priority: "Medium",
      status: "Assigned",
      date: "18 Jul 2026",
      address: "Navrangpura",
      latitude: 23.0358,
      longitude: 72.5618,
      description:
        "Major cracks visible across the main road.",
    },

    {
      id: "CMP-1003",
      citizen: "Priya Desai",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Amit Patel",
      priority: "High",
      status: "In Progress",
      date: "17 Jul 2026",
      address: "Maninagar",
      latitude: 22.995,
      longitude: 72.603,
      description:
        "Road sinking after heavy rainfall causing traffic issues.",
    },

    {
      id: "CMP-1004",
      citizen: "Neha Joshi",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Ravi Kumar",
      priority: "Low",
      status: "Resolved",
      date: "17 Jul 2026",
      address: "Bopal",
      latitude: 23.0396,
      longitude: 72.4651,
      description:
        "Broken divider repaired successfully.",
    },

    {
      id: "CMP-1005",
      citizen: "Karan Mehta",
      category: "Road Damage",
      department: "Road Department",
      engineer: "",
      priority: "High",
      status: "Pending",
      date: "16 Jul 2026",
      address: "Gota",
      latitude: 23.0911,
      longitude: 72.5304,
      description:
        "Huge pothole near the traffic signal.",
    },
  ];

  /* ==========================================================
      Engineers
  ========================================================== */

  const engineers = [
    {
      id: 1,
      name: "Amit Patel",
      assigned: 7,
      performance: 92,
    },
    {
      id: 2,
      name: "Jay Shah",
      assigned: 5,
      performance: 88,
    },
    {
      id: 3,
      name: "Ravi Kumar",
      assigned: 4,
      performance: 84,
    },
    {
      id: 4,
      name: "Nilesh Patel",
      assigned: 6,
      performance: 90,
    },
    {
      id: 5,
      name: "Hardik Joshi",
      assigned: 3,
      performance: 79,
    },
  ];

  /* ==========================================================
      React States
  ========================================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  /* ==========================================================
      Department Complaints
  ========================================================== */

  const departmentComplaints = useMemo(() => {
    return complaintData.filter(
      (item) => item.department === loggedDepartment
    );
  }, []);

  /* ==========================================================
      Dashboard Statistics
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
          (c) => c.status === "Pending"
        ).length,
        icon: <FaClock />,
        color: "#d97706",
        bg: "#fff7ed",
      },

      {
        title: "Assigned",
        value: departmentComplaints.filter(
          (c) => c.status === "Assigned"
        ).length,
        icon: <FaUserCog />,
        color: "#9333ea",
        bg: "#f3e8ff",
      },

      {
        title: "Resolved",
        value: departmentComplaints.filter(
          (c) => c.status === "Resolved"
        ).length,
        icon: <FaCheckCircle />,
        color: "#16a34a",
        bg: "#ecfdf5",
      },
    ];
  }, [departmentComplaints]);

  /* ==========================================================
      Filter Complaints
  ========================================================== */

  const filteredComplaints = useMemo(() => {
    return departmentComplaints.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.citizen.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    departmentComplaints,
    search,
    statusFilter,
    priorityFilter,
  ]);

  /* ==========================================================
      Complaint Map Data
  ========================================================== */

  const mapComplaints = useMemo(() => {
    return departmentComplaints.filter(
      (item) => item.latitude && item.longitude
    );
  }, [departmentComplaints]);

  return (
    <div className="department-dashboard">
              {/* ==========================================================
          Welcome Section
      ========================================================== */}

      <div className="welcome-card">

        <div className="welcome-content">

          <h1>
            Welcome Back, Department Officer 👨‍💼
          </h1>

          <p>
            Manage complaints assigned to your department, allocate
            engineers, monitor ongoing work, and track overall
            department performance from one centralized dashboard.
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
          Statistics
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
          Main Dashboard
      ========================================================== */}

      <div className="department-dashboard-grid">

        {/* ======================================================
            LEFT PANEL
        ======================================================= */}

        <div className="left-panel">

          {/* ======================================================
              Complaint Location Map
          ======================================================= */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaMapMarkerAlt />

                {" "}Department Complaint Locations

              </h2>

            </div>

            <div className="complaint-map">

              <MapContainer
                center={[23.0225, 72.5714]}
                zoom={12}
                scrollWheelZoom={false}
                style={{
                  height: "400px",
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
                        <strong>Status :</strong>{" "}
                        {item.status}
                      </p>

                      <p>
                        <strong>Engineer :</strong>{" "}
                        {item.engineer || "Not Assigned"}
                      </p>

                      <p>
                        <strong>Address :</strong>{" "}
                        {item.address}
                      </p>

                    </Popup>

                  </Marker>

                ))}

              </MapContainer>

            </div>

            {/* ======================================================
                Map Legend
            ======================================================= */}

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

                <span className="legend-dot in-progress"></span>

                In Progress

              </div>

              <div>

                <span className="legend-dot completed"></span>

                Resolved

              </div>

            </div>

          </div>

          {/* ======================================================
              Search & Filters
          ======================================================= */}

          <div className="complaint-toolbar">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search by Complaint ID, Citizen or Category..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="toolbar-right">

              <div className="filter-box">

                <FaFilter />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Assigned">
                    Assigned
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>

              </div>

              <div className="filter-box">

                <FaFilter />

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                >

                  <option value="All">
                    All Priority
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

              </div>

            </div>

          </div>
                    {/* ======================================================
              Department Complaints Table
          ======================================================= */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                <FaClipboardList />

                {" "}Department Complaints

              </h2>

              <button className="view-all-btn">
                View All
              </button>

            </div>

            <div className="table-wrapper">

              <table className="dashboard-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Citizen</th>

                    <th>Category</th>

                    <th>Priority</th>

                    <th>Status</th>

                    <th>Engineer</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredComplaints.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="empty-row"
                      >

                        No complaints found.

                      </td>

                    </tr>

                  ) : (

                    filteredComplaints.map((item) => (

                      <tr key={item.id}>

                        <td className="complaint-id">

                          {item.id}

                        </td>

                        <td>

                          <div className="citizen-info">

                            <div className="citizen-avatar">

                              {item.citizen.charAt(0)}

                            </div>

                            <span>

                              {item.citizen}

                            </span>

                          </div>

                        </td>

                        <td>

                          {item.category}

                        </td>

                        <td>

                          <span
                            className={`priority-badge ${item.priority
                              .toLowerCase()}`}
                          >

                            {item.priority}

                          </span>

                        </td>

                        <td>

                          <span
                            className={`status-badge ${item.status
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                          >

                            {item.status}

                          </span>

                        </td>

                        <td>

                          {item.engineer ? (

                            <div className="assigned-engineer">

                              <FaUsers />

                              <span>

                                {item.engineer}

                              </span>

                            </div>

                          ) : (

                            <button
                              className="assign-btn"
                            >

                              <FaUserPlus />

                              Assign

                            </button>

                          )}

                        </td>

                        <td>

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedComplaint(item)
                            }
                          >

                            <FaEye />

                            <span>

                              View

                            </span>

                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
                {/* ======================================================
            RIGHT PANEL
        ======================================================= */}

        <div className="right-panel">

          {/* ======================================================
              Engineer Performance
          ======================================================= */}

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

                    <span>

                      {engineer.performance}%

                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ======================================================
              Department Summary
          ======================================================= */}

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
              Quick Actions
          ======================================================= */}

          <div className="dashboard-box">

            <div className="card-header">

              <h2>

                Quick Actions

              </h2>

            </div>

            <div className="quick-actions">

              <button className="quick-action-btn">

                <FaClipboardList />

                Complaint Report

              </button>

              <button className="quick-action-btn">

                <FaUsers />

                Manage Engineers

              </button>

              <button className="quick-action-btn">

                <FaBuilding />

                Department Overview

              </button>

              <button className="quick-action-btn">

                <FaMapMarkerAlt />

                View Complaint Map

              </button>

            </div>

          </div>

        </div>

      </div>
            {/* ==========================================================
          Complaint Details Modal
      ========================================================== */}

      {selectedComplaint && (

        <div className="modal-overlay">

          <div className="complaint-modal">

            {/* ================= Header ================= */}

            <div className="modal-header">

              <div>

                <h2>Complaint Details</h2>

                <p>
                  View complete information about the selected complaint.
                </p>

              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                <FaTimes />
              </button>

            </div>

            {/* ================= Summary ================= */}

            <div className="detail-grid">

              <div className="detail-card">

                <span>Complaint ID</span>

                <h4>{selectedComplaint.id}</h4>

              </div>

              <div className="detail-card">

                <span>Citizen</span>

                <h4>{selectedComplaint.citizen}</h4>

              </div>

              <div className="detail-card">

                <span>Category</span>

                <h4>{selectedComplaint.category}</h4>

              </div>

              <div className="detail-card">

                <span>Date</span>

                <h4>{selectedComplaint.date}</h4>

              </div>

              <div className="detail-card">

                <span>Priority</span>

                <span
                  className={`priority-badge ${selectedComplaint.priority
                    .toLowerCase()}`}
                >
                  {selectedComplaint.priority}
                </span>

              </div>

              <div className="detail-card">

                <span>Status</span>

                <span
                  className={`status-badge ${selectedComplaint.status
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {selectedComplaint.status}
                </span>

              </div>

              <div className="detail-card">

                <span>Assigned Engineer</span>

                <h4>
                  {selectedComplaint.engineer || "Not Assigned"}
                </h4>

              </div>

              <div className="detail-card">

                <span>Department</span>

                <h4>{selectedComplaint.department}</h4>

              </div>

            </div>

            {/* ================= Address ================= */}

            <div className="info-section">

              <h3>

                <FaMapMarkerAlt />

                {" "}Complaint Address

              </h3>

              <p>{selectedComplaint.address}</p>

            </div>

            {/* ================= Description ================= */}

            <div className="info-section">

              <h3>

                <FaFileAlt />

                {" "}Description

              </h3>

              <p>{selectedComplaint.description}</p>

            </div>

            {/* ================= Image ================= */}

            <div className="info-section">

              <h3>

                <FaCamera />

                {" "}Complaint Image

              </h3>

              <div className="complaint-image">

                <img
                  src="https://placehold.co/900x400?text=Complaint+Image"
                  alt="Complaint"
                />

              </div>

            </div>

            {/* ================= Footer ================= */}

            <div className="modal-footer">

              <button
                className="dashboard-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Dashboard;