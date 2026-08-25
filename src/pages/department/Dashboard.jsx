import { useEffect, useState } from "react";
import "./Dashboard.css";

import {
  FaClipboardList,
  FaUserCog,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";


/*
=====================================================
CUSTOM MAP MARKER
=====================================================
*/

const createMarkerIcon = (color) =>
  new L.DivIcon({
    html: `
      <div
        class="complaint-marker"
        style="background:${color};"
      ></div>
    `,
    className: "custom-marker",
  });


/*
=====================================================
COMPLAINT MARKER ICONS
=====================================================
*/

const complaintIcons = {

  CREATED:
    createMarkerIcon("#ef4444"),

  ASSIGNED:
    createMarkerIcon("#f59e0b"),

  IN_PROGRESS:
    createMarkerIcon("#8b5cf6"),

  RESOLVED:
    createMarkerIcon("#22c55e"),

};


/*
=====================================================
DASHBOARD
=====================================================
*/

function Dashboard() {

  /*
  =====================================================
  STATE
  =====================================================
  */

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /*
  =====================================================
  FETCH DEPARTMENT DASHBOARD
  =====================================================
  */

  useEffect(() => {

    const fetchDepartmentDashboard = async () => {

      try {

        setLoading(true);

        setError("");


        /*
        Get JWT token
        */

        const token =
          localStorage.getItem("token");


        if (!token) {

          throw new Error(
            "Authentication token not found."
          );

        }


        /*
        API CALL
        */

        const response =
          await fetch(
            "http://localhost:8085/api/department/dashboard",
            {
              method: "GET",

              headers: {
                "Authorization":
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },
            }
          );


        /*
        CHECK RESPONSE
        */

        if (!response.ok) {

          let errorMessage =
            `Failed to load department dashboard. Status: ${response.status}`;


          try {

            const errorData =
              await response.json();

            console.error(
              "Department Dashboard Error:",
              errorData
            );

          } catch (error) {

            console.error(
              "Could not read error response:",
              error
            );

          }


          throw new Error(
            errorMessage
          );

        }


        /*
        JSON RESPONSE
        */

        const data =
          await response.json();


        console.log(
          "Department Dashboard Response:",
          data
        );


        setDashboard(data);

      } catch (error) {

        console.error(
          "Error loading department dashboard:",
          error
        );


        setError(
          error.message ||
          "Unable to load department dashboard."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDepartmentDashboard();

  }, []);


  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {

    return (

      <div className="department-dashboard">

        <div className="dashboard-box">

          <div className="card-header">

            <h2>
              Loading Department Dashboard...
            </h2>

          </div>

          <p>
            Please wait while we load
            department information.
          </p>

        </div>

      </div>

    );

  }


  /*
  =====================================================
  ERROR
  =====================================================
  */

  if (error) {

    return (

      <div className="department-dashboard">

        <div className="dashboard-box">

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


  /*
  =====================================================
  SAFETY CHECK
  =====================================================
  */

  if (!dashboard) {

    return (

      <div className="department-dashboard">

        <div className="dashboard-box">

          <p>
            No department dashboard
            information found.
          </p>

        </div>

      </div>

    );

  }


  /*
  =====================================================
  COMPLAINTS FROM BACKEND
  =====================================================
  */

  const departmentComplaints =
    dashboard.complaints || [];


  /*
  =====================================================
  MAP COMPLAINTS
  =====================================================
  */

  const mapComplaints =
    departmentComplaints.filter(
      (item) =>
        item.latitude !== null &&
        item.latitude !== undefined &&
        item.latitude !== "" &&
        item.longitude !== null &&
        item.longitude !== undefined &&
        item.longitude !== ""
    );


  /*
  =====================================================
  MAP CENTER
  =====================================================
  */

  const firstComplaint =
    mapComplaints[0];


  const mapCenter =
    firstComplaint
      ? [
          Number(
            firstComplaint.latitude
          ),
          Number(
            firstComplaint.longitude
          ),
        ]
      : [
          23.0225,
          72.5714
        ];


  /*
  =====================================================
  FORMAT STATUS
  =====================================================
  */

  const formatStatus = (status) => {

    if (!status) {

      return "Unknown";

    }


    switch (
      status.toUpperCase()
    ) {

      case "CREATED":

        return "Pending";


      case "ASSIGNED":

        return "Assigned";


      case "IN_PROGRESS":

        return "In Progress";


      case "RESOLVED":

        return "Resolved";


      default:

        return status
          .replace(
            /_/g,
            " "
          )
          .replace(
            /\b\w/g,
            (letter) =>
              letter.toUpperCase()
          );

    }

  };


  /*
  =====================================================
  FORMAT PRIORITY
  =====================================================
  */

  const formatPriority = (
    priority
  ) => {

    if (!priority) {

      return "-";

    }


    return priority
      .replace(
        /_/g,
        " "
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  };


  /*
  =====================================================
  DASHBOARD STATISTICS
  =====================================================
  */

  const dashboardStats = [

    {
      title:
        "Total Complaints",

      value:
        dashboard.totalComplaints || 0,

      icon:
        <FaClipboardList />,

      color:
        "#2563eb",

      bg:
        "#eff6ff",
    },


    {
      title:
        "Pending",

      value:
        dashboard.pendingComplaints || 0,

      icon:
        <FaClock />,

      color:
        "#f59e0b",

      bg:
        "#fff7ed",
    },


    {
      title:
        "Assigned",

      value:
        dashboard.assignedComplaints || 0,

      icon:
        <FaUserCog />,

      color:
        "#8b5cf6",

      bg:
        "#f3e8ff",
    },


    {
      title:
        "In Progress",

      value:
        dashboard.inProgressComplaints || 0,

      icon:
        <FaSpinner />,

      color:
        "#6366f1",

      bg:
        "#eef2ff",
    },


    {
      title:
        "Resolved",

      value:
        dashboard.resolvedComplaints || 0,

      icon:
        <FaCheckCircle />,

      color:
        "#16a34a",

      bg:
        "#ecfdf5",
    },

  ];


  /*
  =====================================================
  RETURN
  =====================================================
  */

  return (

    <div className="department-dashboard">


      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <div className="welcome-card">

        <div className="welcome-content">

          <h1>
            Welcome Back Department Officer 👨‍💼
          </h1>


          <p>
            Monitor your department activities,
            track complaint locations, view engineer
            performance and overall department
            statistics from one dashboard.
          </p>


          <div className="system-status">

            <span className="status-dot"></span>


            <span>

              Department :

              <strong>
                {" "}
                {dashboard.departmentName}
              </strong>

            </span>

          </div>

        </div>


        <button
          className="dashboard-btn"
          type="button"
        >
          Generate Report
        </button>

      </div>



      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">

        {dashboardStats.map(
          (card) => (

            <div
              key={card.title}
              className="stats-card"
            >

              <div
                className="stats-icon"
                style={{
                  background:
                    card.bg,

                  color:
                    card.color,
                }}
              >

                {card.icon}

              </div>


              <div
                className="stats-content"
              >

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
          COMPLAINT LOCATION MAP
      ================================================= */}

      <div className="left-panel">

        <div className="dashboard-box">


          {/* HEADER */}

          <div className="card-header">

            <div>

              <h2>

                <FaMapMarkerAlt />

                {" "}
                Complaint Locations

              </h2>


              <p>

                Showing complaints belonging
                to{" "}

                <strong>
                  {dashboard.departmentName}
                </strong>

              </p>

            </div>

          </div>



          {/* MAP */}

          <div className="complaint-map">

            <MapContainer

              center={
                mapCenter
              }

              zoom={12}

              scrollWheelZoom={false}

              style={{
                height: "450px",
                width: "100%",
                borderRadius: "16px",
              }}

            >


              <TileLayer

                attribution=
                  "&copy; OpenStreetMap contributors"

                url=
                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

              />


              {/* =================================================
                  MAP MARKERS
              ================================================= */}

              {mapComplaints.map(
                (item) => (

                  <Marker

                    key={
                      item.complaintId
                    }

                    position={[
                      Number(
                        item.latitude
                      ),

                      Number(
                        item.longitude
                      ),
                    ]}

                    icon={
                      complaintIcons[
                        item.status
                      ] ||
                      complaintIcons.CREATED
                    }

                  >

                    <Popup>

                      <div
                        className="popup-content"
                      >


                        <h3>
                          {
                            item.complaintNumber
                          }
                        </h3>


                        <p>

                          <strong>
                            Citizen :
                          </strong>{" "}

                          {
                            item.citizen ||
                            "Unknown"
                          }

                        </p>


                        <p>

                          <strong>
                            Category :
                          </strong>{" "}

                          {
                            item.category ||
                            "-"
                          }

                        </p>


                        <p>

                          <strong>
                            Priority :
                          </strong>{" "}

                          {
                            formatPriority(
                              item.priority
                            )
                          }

                        </p>


                        <p>

                          <strong>
                            Status :
                          </strong>{" "}

                          {
                            formatStatus(
                              item.status
                            )
                          }

                        </p>


                        <p>

                          <strong>
                            Engineer :
                          </strong>{" "}

                          {
                            item.engineer ||
                            "Not Assigned"
                          }

                        </p>


                        <p>

                          <strong>
                            Location :
                          </strong>{" "}

                          {
                            item.address ||
                            "Location not available"
                          }

                        </p>


                        <p>

                          <strong>
                            Latitude :
                          </strong>{" "}

                          {
                            item.latitude
                          }

                        </p>


                        <p>

                          <strong>
                            Longitude :
                          </strong>{" "}

                          {
                            item.longitude
                          }

                        </p>


                      </div>

                    </Popup>

                  </Marker>

                )
              )}

            </MapContainer>

          </div>



          {/* =================================================
              NO LOCATION
          ================================================= */}

          {mapComplaints.length === 0 && (

            <div
              className="empty-map-message"
            >

              <FaMapMarkerAlt />

              <p>
                No complaint locations
                are available.
              </p>

            </div>

          )}



          {/* =================================================
              MAP LEGENDS
          ================================================= */}

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

          </div>


        </div>

      </div>



      {/* =================================================
          DEPARTMENT COMPLAINTS TABLE
      ================================================= */}

      <div className="dashboard-box">


        <div className="card-header">

          <div>

            <h2>
              Department Complaints
            </h2>

            <p>
              All complaints assigned to this
              department.
            </p>

          </div>


          <FaClipboardList />

        </div>



        <div className="table-wrapper">

          <table
            className="dashboard-table"
          >

            <thead>

              <tr>

                <th>
                  Complaint ID
                </th>

                <th>
                  Citizen
                </th>

                <th>
                  Category
                </th>

                <th>
                  Priority
                </th>

                <th>
                  Engineer
                </th>

                <th>
                  Status
                </th>

                <th>
                  Location
                </th>

              </tr>

            </thead>


            <tbody>

              {departmentComplaints.length >
              0 ? (

                departmentComplaints.map(
                  (item) => (

                    <tr
                      key={
                        item.complaintId
                      }
                    >

                      <td>

                        <strong>
                          {
                            item.complaintNumber
                          }
                        </strong>

                      </td>


                      <td>
                        {
                          item.citizen ||
                          "-"
                        }
                      </td>


                      <td>
                        {
                          item.category ||
                          "-"
                        }
                      </td>


                      <td>
                        {
                          formatPriority(
                            item.priority
                          )
                        }
                      </td>


                      <td>
                        {
                          item.engineer ||
                          "Not Assigned"
                        }
                      </td>


                      <td>

                        <span
                          className={
                            `status ${
                              (
                                item.status ||
                                ""
                              )
                                .toLowerCase()
                                .replace(
                                  /_/g,
                                  "-"
                                )
                            }`
                          }
                        >

                          {
                            formatStatus(
                              item.status
                            )
                          }

                        </span>

                      </td>


                      <td>

                        {
                          item.address ||
                          "Location unavailable"
                        }

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >

                    No complaints found
                    for this department.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


    </div>

  );

}


export default Dashboard;
