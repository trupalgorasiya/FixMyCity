
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/axios";
import "./AdminDashboard.css";

import {
  FaUsers,
  FaClipboardList,
  FaBuilding,
  FaUserCog,
  FaChartLine,
  FaMapMarkerAlt,
  FaCheckCircle,
  // FaClock
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";


/*
=========================================================
CUSTOM MAP MARKER
=========================================================
*/

const createMarkerIcon = (color) => {

  return new L.DivIcon({

    html: `
      <div
        class="complaint-marker"
        style="background:${color};"
      ></div>
    `,

    className: "custom-marker",

    iconSize: [30, 30],

    iconAnchor: [15, 15]

  });

};


/*
=========================================================
COMPLAINT STATUS ICONS
=========================================================
*/

const complaintIcons = {

  CREATED: createMarkerIcon("#ef4444"),

  ASSIGNED: createMarkerIcon("#f59e0b"),

  IN_PROGRESS: createMarkerIcon("#8b5cf6"),

  RESOLVED: createMarkerIcon("#22c55e"),

  REJECTED: createMarkerIcon("#6b7280")

};


/*
=========================================================
STATUS FORMATTER
=========================================================
*/

const formatStatus = (status) => {

  if (!status) {
    return "Unknown";
  }

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

};


/*
=========================================================
MONTH FORMATTER
=========================================================
*/

const formatMonth = (month) => {

  if (!month) {
    return "";
  }

  return month
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

};


/*
=========================================================
MAIN DASHBOARD
=========================================================
*/

function Dashboard() {

  /*
  ========================================================
  STATES
  ========================================================
  */

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /*
  ========================================================
  LOAD ADMIN DASHBOARD
  ========================================================
  */

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await axios.get(
          `${API_BASE_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(
          "Admin Dashboard Response:",
          response.data
        );

        setDashboardData(response.data);

      } catch (error) {

        console.error(
          "Admin Dashboard Error:",
          error
        );

        setError(
          "Unable to load admin dashboard."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  /*
  ========================================================
  LOADING
  ========================================================
  */

  if (loading) {

    return (

      <div className="admin-dashboard">

        <div className="dashboard-box">

          <h2>
            Loading Admin Dashboard...
          </h2>

        </div>

      </div>

    );

  }


  /*
  ========================================================
  ERROR
  ========================================================
  */

  if (error) {

    return (

      <div className="admin-dashboard">

        <div className="dashboard-box">

          <h2>
            {error}
          </h2>

        </div>

      </div>

    );

  }


  /*
  ========================================================
  SAFETY DEFAULTS
  ========================================================
  */

  const complaintLocations =
    dashboardData?.complaintLocations || [];


  const departmentPerformance =
    dashboardData?.departmentPerformance || [];


  const monthlyComplaints =
    dashboardData?.monthlyComplaints || [];


  /*
  ========================================================
  SUMMARY CARDS
  ========================================================
  */

  const dashboardStats = [

    {
      title: "Total Complaints",

      value:
        dashboardData?.totalComplaints ?? 0,

      icon: <FaClipboardList />,

      color: "#2563eb",

      bg: "#eff6ff"

    },

    {
      title: "Total Users",

      value:
        dashboardData?.totalUsers ?? 0,

      icon: <FaUsers />,

      color: "#16a34a",

      bg: "#ecfdf5"

    },

    {
      title: "Departments",

      value:
        dashboardData?.totalDepartments ?? 0,

      icon: <FaBuilding />,

      color: "#9333ea",

      bg: "#f3e8ff"

    },

    {
      title: "Engineers",

      value:
        dashboardData?.totalEngineers ?? 0,

      icon: <FaUserCog />,

      color: "#ea580c",

      bg: "#fff7ed"

    }

  ];


  /*
  ========================================================
  MONTHLY MAX VALUE
  Used for progress bar width
  ========================================================
  */

  const maximumMonthlyComplaints =
    Math.max(
      ...monthlyComplaints.map(
        (item) => Number(item.complaints) || 0
      ),
      1
    );


  /*
  ========================================================
  TOTAL RESOLVED COMPLAINTS
  ========================================================
  */

  const totalResolved =
    departmentPerformance.reduce(
      (total, department) =>
        total +
        (Number(
          department.resolvedComplaints
        ) || 0),
      0
    );


  return (

    <div className="admin-dashboard">


      {/* ==================================================
          WELCOME CARD
      ================================================== */}

      <div className="welcome-card">

        <div>

          <h1>
            Welcome Back, Administrator 👋
          </h1>

          <p>
            Monitor complaints, departments,
            engineers and system analytics
            from one place.
          </p>

          <div className="system-status">

            <span className="status-dot"></span>

            <span>
              System Status : Online
            </span>

          </div>

        </div>


        <Link
  to="/admin/report"
  className="dashboard-btn"
>
  Generate Report
</Link>

      </div>



      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="stats-grid">

        {dashboardStats.map(
          (card, index) => (

            <div
              className="stats-card"
              key={index}
            >

              <div
                className="stats-icon"

                style={{
                  background: card.bg,
                  color: card.color
                }}
              >

                {card.icon}

              </div>


              <div className="stats-content">

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



      {/* ==================================================
          MAIN GRID
      ================================================== */}

      <div className="admin-dashboard-grid">


        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <div className="left-panel">


          {/* ===============================================
              COMPLAINT LOCATION MAP
          =============================================== */}

          <div className="dashboard-box">

            <h2>

              <FaMapMarkerAlt />

              {" "}Complaint Location Map

            </h2>


            <div className="admin-map">


              <MapContainer

                center={[
                  23.0225,
                  72.5714
                ]}

                zoom={12}

                scrollWheelZoom={false}

                style={{
                  height: "400px",
                  width: "100%",
                  borderRadius: "15px"
                }}

              >


                <TileLayer

                  attribution="&copy; OpenStreetMap"

                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

                />


                {complaintLocations.map(
                  (item) => {

                    const latitude =
                      Number(item.latitude);

                    const longitude =
                      Number(item.longitude);


                    if (
                      Number.isNaN(latitude) ||
                      Number.isNaN(longitude)
                    ) {

                      return null;

                    }


                    return (

                      <Marker

                        key={
                          item.complaintId
                        }

                        position={[
                          latitude,
                          longitude
                        ]}

                        icon={
                          complaintIcons[
                            item.status
                          ] ||
                          complaintIcons.CREATED
                        }

                      >

                        <Popup>

                          <div className="popup-content">

                            <h3>
                              {item.complaintNumber &&
                              item.complaintNumber !== "null"
                                ? item.complaintNumber
                                : `Complaint #${item.complaintId}`}
                            </h3>


                            <p>

                              <strong>
                                Category :
                              </strong>

                              {" "}

                              {item.category ||
                                "N/A"}

                            </p>


                            <p>

                              <strong>
                                Department :
                              </strong>

                              {" "}

                              {item.department ||
                                "N/A"}

                            </p>


                            <p>

                              <strong>
                                Priority :
                              </strong>

                              {" "}

                              {item.priority ||
                                "N/A"}

                            </p>


                            <p>

                              <strong>
                                Status :
                              </strong>

                              {" "}

                              {formatStatus(
                                item.status
                              )}

                            </p>


                            <p>

                              <strong>
                                Location :
                              </strong>

                              {" "}

                              {item.address ||
                                "N/A"}

                            </p>

                          </div>

                        </Popup>

                      </Marker>

                    );

                  }
                )}


              </MapContainer>


            </div>


            {/* MAP LEGENDS */}

            <div className="map-legends">


              <div>

                <span
                  className="legend-dot pending"
                ></span>

                Pending

              </div>


              <div>

                <span
                  className="legend-dot assigned"
                ></span>

                Assigned

              </div>


              <div>

                <span
                  className="legend-dot progress"
                ></span>

                In Progress

              </div>


              <div>

                <span
                  className="legend-dot resolved"
                ></span>

                Resolved

              </div>


              <div>

                <span
                  className="legend-dot rejected"
                ></span>

                Rejected

              </div>


            </div>


          </div>



          {/* ===============================================
              MONTHLY COMPLAINT ANALYTICS
          =============================================== */}

          <div className="dashboard-box">

            


            <div className="dashboard-box">
  <div className="card-header">
    <div className="card-title">
      <h2>
        <FaChartLine />
        Monthly Complaint Analytics
      </h2>

      <p>Complaint distribution across the year</p>
    </div>

    <div className="monthly-total">
      <span>Total</span>
      <strong>{dashboardData?.totalComplaints ?? 0}</strong>
    </div>
  </div>

  <div className="monthly-grid">
    {monthlyComplaints.map((item, index) => {
      const complaintCount = Number(item.complaints) || 0;

      const percentage =
        maximumMonthlyComplaints === 0
          ? 0
          : (complaintCount / maximumMonthlyComplaints) * 100;

      return (
        <div
          className="month-card"
          key={item.month || index}
        >
          <div className="month-card-header">
            <span>{formatMonth(item.month)}</span>
            <strong>{complaintCount}</strong>
          </div>

          <div className="month-progress">
            <div
              className="month-progress-fill"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <small>
            {complaintCount === 1
              ? "1 Complaint"
              : `${complaintCount} Complaints`}
          </small>
        </div>
      );
    })}
  </div>
</div>

          </div>


        </div>



        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div className="right-panel">


          {/* ===============================================
              DEPARTMENT PERFORMANCE
          =============================================== */}

          <div className="dashboard-box">

            <div className="card-header">

              <div>

                <h2>
                  <FaBuilding />

                  {" "}Department Performance
                </h2>

                <p>
                  Resolution performance
                  by department
                </p>

              </div>

            </div>


            {/* SUMMARY */}

            <div className="department-summary">


              <div className="department-summary-card">
                <FaBuilding /> 
                  <strong>
                     {departmentPerformance.length}
                  </strong>   Departments
              </div>
            </div>

            {/* PERFORMANCE LIST */}

            <div className="department-performance-list">

              {departmentPerformance.length === 0 ? (

                <p>
                  No department performance
                  data available.
                </p>

              ) : (

                departmentPerformance.map(
                  (department) => {

                    const performance =
                      Number(
                        department.performance
                      ) || 0;


                    const safePerformance =
                      Math.min(
                        Math.max(
                          performance,
                          0
                        ),
                        100
                      );


                    let progressColor;


                    if (
                      safePerformance < 25
                    ) {

                      progressColor =
                        "#ef4444";

                    } else if (
                      safePerformance < 70
                    ) {

                      progressColor =
                        "#f59e0b";

                    } else {

                      progressColor =
                        "#22c55e";

                    }


                    return (

                      <div
                        className="department-progress"
                        key={
                          department.departmentId
                        }
                      >


                        <div className="progress-header">

                          <span
                            title={
                              department.departmentName
                            }
                          >

                            {
                              department.departmentName
                            }

                          </span>


                          <strong>

                            {safePerformance}%

                          </strong>

                        </div>


                        <div className="progress-bar">

                          <div

                            className="progress-fill"

                            style={{
                              width:
                                `${safePerformance}%`,

                              backgroundColor:
                                progressColor
                            }}

                          ></div>

                        </div>


                        {/* <div className="department-details">

                          <span>

                            Total :

                            {" "}

                            {
                              department.totalComplaints
                            }

                          </span>


                          <span>

                            Resolved :

                            {" "}

                            {
                              department.resolvedComplaints
                            }

                          </span>

                        </div> */}


                      </div>

                    );

                  }
                )

              )}

            </div>


          </div>


        </div>


      </div>


    </div>

  );

}


export default Dashboard;

