import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/axios";

import "./Dashboard.css";

import {
  FaClipboardList,
  FaCheckCircle,
  FaTools,
  FaClock,
  FaMapMarkerAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


// =========================================================
// CUSTOM MAP MARKER
// =========================================================

const createMarkerIcon = (color) => {

  return new L.DivIcon({

    html: `
      <div
        class="complaint-marker"
        style="background:${color};"
      ></div>
    `,

    className: "custom-marker",

    iconSize: [20, 20],

    iconAnchor: [10, 10],

  });

};


// =========================================================
// STATUS MARKERS
// =========================================================

const complaintIcons = {

  ASSIGNED:
    createMarkerIcon("#f59e0b"),

  IN_PROGRESS:
    createMarkerIcon("#9333ea"),

  CREATED:
    createMarkerIcon("#ef4444"),

  RESOLVED:
    createMarkerIcon("#22c55e"),

};


// =========================================================
// DASHBOARD
// =========================================================

function Dashboard() {

  const navigate = useNavigate();


  // =======================================================
  // STATES
  // =======================================================

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =======================================================
  // FETCH ENGINEER DASHBOARD
  // =======================================================

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true);

        setError("");


        const token =
          localStorage.getItem("token");


        if (!token) {

          throw new Error(
            "Authentication token not found."
          );

        }


        const response =
          await fetch(
            `${API_BASE_URL}/engineer/dashboard`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },
            }
          );


        if (!response.ok) {

          let message =
            `Failed to load dashboard (${response.status})`;


          try {

            const errorData =
              await response.json();

            console.error(
              "Engineer Dashboard Error:",
              errorData
            );

          } catch (error) {

            console.error(
              "Could not read error response:",
              error
            );

          }


          throw new Error(message);
        }


        const data =
          await response.json();


        console.log(
          "Engineer Dashboard Response:",
          data
        );


        setDashboard(data);

      } catch (error) {

        console.error(
          "Engineer Dashboard Error:",
          error
        );


        setError(
          error.message ||
          "Unable to load engineer dashboard."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (

      <div className="engineer-dashboard">

        <div className="engineer-card">

          <div className="card-header">

            <h2>
              Loading Dashboard...
            </h2>

          </div>

          <p>
            Please wait while we load your
            engineer dashboard.
          </p>

        </div>

      </div>

    );

  }


  // =======================================================
  // ERROR
  // =======================================================

  if (error) {

    return (

      <div className="engineer-dashboard">

        <div className="engineer-card">

          <div className="card-header">

            <h2>
              Unable to Load Dashboard
            </h2>

          </div>

          <p>
            {error}
          </p>

        </div>

      </div>

    );

  }


  // =======================================================
  // SAFETY CHECK
  // =======================================================

  if (!dashboard) {

    return (

      <div className="engineer-dashboard">

        <div className="engineer-card">

          <p>
            No dashboard information found.
          </p>

        </div>

      </div>

    );

  }


  // =======================================================
  // ACTIVE COMPLAINTS
  // =======================================================

  const activeComplaints =
    dashboard.activeComplaints || [];


  // =======================================================
  // MAP COMPLAINTS
  // =======================================================

  const mapComplaints =
    activeComplaints.filter(
      (complaint) =>
        complaint.latitude !== null &&
        complaint.latitude !== undefined &&
        complaint.longitude !== null &&
        complaint.longitude !== undefined
    );


  // =======================================================
  // MAP CENTER
  // =======================================================

  const firstLocation =
    mapComplaints[0];


  const mapCenter =
    firstLocation
      ? [
          Number(firstLocation.latitude),
          Number(firstLocation.longitude),
        ]
      : [23.0225, 72.5714];


  // =======================================================
  // FORMAT STATUS
  // =======================================================

  const formatStatus = (status) => {

    if (!status) {

      return "Unknown";

    }


    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );

  };


  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (date) => {

    if (!date) {

      return "-";

    }


    return new Date(date)
      .toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

  };


  // =======================================================
  // STATISTICS
  // =======================================================

  const dashboardStats = [

    {
      title: "Total Assigned",

      value:
        dashboard.totalAssigned || 0,

      icon:
        <FaClipboardList />,

      color:
        "#2563eb",

      bg:
        "#eff6ff",
    },


    {
      title: "Waiting",

      value:
        dashboard.assigned || 0,

      icon:
        <FaClock />,

      color:
        "#d97706",

      bg:
        "#fff7ed",
    },


    {
      title: "In Progress",

      value:
        dashboard.inProgress || 0,

      icon:
        <FaTools />,

      color:
        "#9333ea",

      bg:
        "#f3e8ff",
    },


    {
      title: "Completed",

      value:
        dashboard.completed || 0,

      icon:
        <FaCheckCircle />,

      color:
        "#16a34a",

      bg:
        "#ecfdf5",
    },

  ];


  // =======================================================
  // RETURN
  // =======================================================

  return (

    <div className="engineer-dashboard">


      {/* =================================================
          WELCOME
      ================================================= */}

      <div className="engineer-welcome">

        <div>

          <h1>

            Welcome Back,{" "}

            {dashboard.engineerName}

            {" "}👷

          </h1>


          <p>

            Manage your assigned field work,
            track complaint locations and
            monitor your work progress.

          </p>


          <div className="system-status">

            <span className="status-dot"></span>

            <span>

              {dashboard.assigned || 0}

              {" "}complaints waiting for work

            </span>

          </div>

        </div>

      </div>



      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="engineer-stats">

        {dashboardStats.map(
          (card) => (

            <div
              className="engineer-stat-card"
              key={card.title}
            >

              <div
                className="engineer-stat-icon"
                style={{
                  background:
                    card.bg,

                  color:
                    card.color,
                }}
              >

                {card.icon}

              </div>


              <div>

                <h2>
                  {card.value}
                </h2>

                <p>
                  {card.title}
                </p>

              </div>

            </div>

          )
        )}

      </div>



      {/* =================================================
          ACTIVE WORK
      ================================================= */}

      <div className="engineer-card full-width">

        <div className="card-header">

          <div>

            <h2>

              <FaExclamationTriangle />

              {" "}Active Work

            </h2>

            <p>

              Your latest complaints that
              still require action.

            </p>

          </div>

        </div>


        {activeComplaints.length === 0 ? (

          <div className="empty-row">

            <FaCheckCircle />

            <p>

              Great work! You currently
              have no active complaints.

            </p>

          </div>

        ) : (

          <div className="active-work-list">

            {activeComplaints.map(
              (complaint) => (

                <div
                  className="active-work-card"
                  key={complaint.complaintId}
                >

                  <div className="active-work-info">

                    <div>

                      <span className="complaint-id">

                        {
                          complaint.complaintNumber
                        }

                      </span>


                      <h3>

                        {
                          complaint.category
                        }

                      </h3>


                      <p>

                        <strong>
                          Citizen:
                        </strong>{" "}

                        {
                          complaint.citizen ||
                          "Unknown"
                        }

                      </p>


                      <p>

                        <strong>
                          Location:
                        </strong>{" "}

                        {
                          complaint.address ||
                          "Location unavailable"
                        }

                      </p>

                    </div>


                    <div className="active-work-meta">

                      <span
                        className={
                          `priority-badge ${
                            complaint.priority
                              ?.toLowerCase()
                          }`
                        }
                      >

                        {
                          complaint.priority ||
                          "NORMAL"
                        }

                      </span>


                      <span
                        className={
                          `status-badge ${
                            complaint.status
                              ?.toLowerCase()
                              .replace(
                                /_/g,
                                "-"
                              )
                          }`
                        }
                      >

                        {
                          formatStatus(
                            complaint.status
                          )
                        }

                      </span>

                    </div>

                  </div>


                  <div className="active-work-footer">

                    <span>

                      Registered:

                      {" "}

                      {
                        formatDate(
                          complaint.createdAt
                        )
                      }

                    </span>


                    <button
                      className="work-btn"
                      onClick={() =>
                        navigate(
                          `/engineer/work/${complaint.complaintNumber}`,
                          {
                            state: complaint,
                          }
                        )
                      }
                    >

                      🛠 Open Work

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>



      {/* =================================================
          COMPLAINT MAP
      ================================================= */}

      <div className="engineer-card full-width">

        <div className="card-header">

          <div>

            <h2>

              <FaMapMarkerAlt />

              {" "}Active Complaint Locations

            </h2>

            <p>

              Locations of your unresolved
              assigned complaints.

            </p>

          </div>

        </div>


        <div className="complaint-map">

          <MapContainer

            center={mapCenter}

            zoom={12}

            scrollWheelZoom={false}

            style={{
              height: "450px",
              width: "100%",
              borderRadius: "15px",
            }}

          >

            <TileLayer

              attribution="&copy; OpenStreetMap"

              url={
                "https://{s}.tile.openstreetmap.org/" +
                "{z}/{x}/{y}.png"
              }

            />


            {mapComplaints.map(
              (complaint) => (

                <Marker

                  key={
                    complaint.complaintId
                  }

                  position={[
                    Number(
                      complaint.latitude
                    ),

                    Number(
                      complaint.longitude
                    ),
                  ]}

                  icon={
                    complaintIcons[
                      complaint.status
                    ] ||
                    complaintIcons.ASSIGNED
                  }

                >

                  <Popup>

                    <div className="popup-content">

                      <h3>

                        {
                          complaint.complaintNumber
                        }

                      </h3>


                      <p>

                        <strong>
                          Citizen:
                        </strong>{" "}

                        {
                          complaint.citizen ||
                          "Unknown"
                        }

                      </p>


                      <p>

                        <strong>
                          Category:
                        </strong>{" "}

                        {
                          complaint.category
                        }

                      </p>


                      <p>

                        <strong>
                          Priority:
                        </strong>{" "}

                        {
                          complaint.priority
                        }

                      </p>


                      <p>

                        <strong>
                          Status:
                        </strong>{" "}

                        {
                          formatStatus(
                            complaint.status
                          )
                        }

                      </p>


                      <p>

                        <strong>
                          Location:
                        </strong>{" "}

                        {
                          complaint.address ||
                          "Unavailable"
                        }

                      </p>


                      <button

                        className="work-btn"

                        onClick={() =>
                          navigate(
                            `/engineer/work/${complaint.complaintNumber}`,
                            {
                              state:
                                complaint,
                            }
                          )
                        }

                      >

                        Open Work

                      </button>

                    </div>

                  </Popup>

                </Marker>

              )
            )}

          </MapContainer>

        </div>


        {/* =================================================
            MAP LEGEND
        ================================================= */}

        <div className="map-legends">

          <div>

            <span className="legend-dot assigned"></span>

            Assigned

          </div>


          <div>

            <span className="legend-dot in-progress"></span>

            In Progress

          </div>

        </div>

      </div>


    </div>

  );

}


export default Dashboard;