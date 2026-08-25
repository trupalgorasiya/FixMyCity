import { useEffect, useState } from "react";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaUserCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Dashboard.css";


export default function Dashboard() {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /*
  =====================================================
  GET CITIZEN PROFILE
  =====================================================
  */

  useEffect(() => {

    const fetchCitizenProfile = async () => {

      try {

        setLoading(true);

        setError("");


        /*
        =================================================
        GET JWT
        =================================================
        */

        const token = localStorage.getItem("token");


        if (!token) {

          throw new Error(
            "Citizen authentication token not found."
          );

        }


        /*
        =================================================
        API REQUEST
        =================================================
        */

        const response = await fetch(
          "http://localhost:8085/api/citizen/profile",
          {
            method: "GET",

            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );


        /*
        =================================================
        HANDLE ERROR
        =================================================
        */

        if (!response.ok) {

          let errorMessage =
            `Failed to load citizen profile: ${response.status}`;


          try {

            const errorData =
              await response.json();

            console.error(
              "Citizen Profile Error:",
              errorData
            );


            if (
              errorData.message
            ) {

              errorMessage =
                errorData.message;

            }

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
        =================================================
        GET RESPONSE
        =================================================
        */

        const data =
          await response.json();


        console.log(
          "Citizen Profile Response:",
          data
        );


        setProfile(data);


      } catch (error) {

        console.error(
          "Error loading citizen profile:",
          error
        );


        setError(
          error.message ||
          "Unable to load citizen profile."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchCitizenProfile();

  }, []);


  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {

    return (

      <div className="user-dashboard">

        <div className="dashboard-box">

          <div className="box-header">

            <h2>
              Loading Dashboard...
            </h2>

          </div>


          <p>
            Please wait while we load your
            citizen information.
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

      <div className="user-dashboard">

        <div className="dashboard-box">

          <div className="box-header">

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

  if (!profile) {

    return (

      <div className="user-dashboard">

        <div className="dashboard-box">

          <p>
            No citizen information found.
          </p>

        </div>

      </div>

    );

  }


  /*
  =====================================================
  RECENT COMPLAINTS
  =====================================================
  */

  const recentComplaints =
    profile.recentComplaints || [];


  /*
  =====================================================
  ACTIVE / UNRESOLVED COMPLAINTS
  =====================================================

  IMPORTANT:

  This comes from the NEW backend field:

  activeComplaints

  It contains ALL complaints whose status
  is NOT RESOLVED.

  */

  const activeComplaints =
    profile.activeComplaints || [];


  /*
  =====================================================
  ACTIVE COMPLAINT COUNT
  =====================================================
  */

  const activeComplaintCount =
    activeComplaints.length;


  /*
  =====================================================
  MAP CENTER
  =====================================================
  */

  const firstActiveComplaint =
    activeComplaints.find(
      (complaint) =>
        complaint.latitude &&
        complaint.longitude
    );


  const mapCenter =
    firstActiveComplaint
      ? [
          Number(
            firstActiveComplaint.latitude
          ),
          Number(
            firstActiveComplaint.longitude
          ),
        ]
      : [23.0225, 72.5714];


  /*
  =====================================================
  FORMAT STATUS
  =====================================================
  */

  const formatStatus = (status) => {

    if (!status) {

      return "Unknown";

    }


    return status
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  };


  /*
  =====================================================
  FORMAT DATE
  =====================================================
  */

  const formatDate = (date) => {

    if (!date) {

      return "-";

    }


    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (

    <div className="user-dashboard">


      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <div className="welcome-card">

        <div>

          <h1>
            Welcome back, {profile.citizenName} 👋
          </h1>


          <p>
            Thank you for helping keep your city clean
            and safe. Manage your complaints and
            services from one place.
          </p>


          <div className="system-status">

            <span className="status-dot"></span>

            {activeComplaintCount}
            {" "}
            Complaints Currently Active

          </div>


          <div className="citizen-info">

            <span>

              Citizen ID :
              {" "}
              CIT-{profile.citizenId}

            </span>

          </div>

        </div>


        <FaUserCircle
          className="welcome-avatar"
        />

      </div>



      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="stats-grid">


        {/* TOTAL */}

        <div className="stats-card">

          <div className="stats-icon">

            <FaClipboardList />

          </div>


          <h2>
            {profile.totalComplaint}
          </h2>


          <p>
            Total Complaints
          </p>

        </div>



        {/* PENDING */}

        <div className="stats-card">

          <div className="stats-icon warning">

            <FaClock />

          </div>


          <h2>
            {profile.pendingComplaint}
          </h2>


          <p>
            Pending
          </p>

        </div>



        {/* IN PROGRESS */}

        <div className="stats-card">

          <div className="stats-icon progress">

            <FaSpinner />

          </div>


          <h2>
            {profile.inProgressComplaint}
          </h2>


          <p>
            In Progress
          </p>

        </div>



        {/* RESOLVED */}

        <div className="stats-card">

          <div className="stats-icon success">

            <FaCheckCircle />

          </div>


          <h2>
            {profile.resolveComplaint}
          </h2>


          <p>
            Resolved
          </p>

        </div>

      </div>



      {/* =================================================
          RECENT COMPLAINTS
      ================================================= */}

      <div className="dashboard-box">

        <div className="box-header">

          <div>

            <h2>
              Recent Complaints
            </h2>


            <p>
              Your latest registered complaints.
            </p>

          </div>


          <FaClipboardList />

        </div>


        <div className="table-wrapper">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>
                  Complaint ID
                </th>

                <th>
                  Title
                </th>

                <th>
                  Category
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

              </tr>

            </thead>


            <tbody>

              {recentComplaints.length > 0 ? (

                recentComplaints.map(
                  (complaint) => (

                    <tr
                      key={
                        complaint.complaintId
                      }
                    >

                      <td>

                        <strong>
                          {
                            complaint.complaintNumber
                          }
                        </strong>

                      </td>


                      <td>
                        {complaint.title}
                      </td>


                      <td>
                        {complaint.category}
                      </td>


                      <td>

                        <span
                          className={`status ${
                            complaint.status
                              ?.toLowerCase()
                              .replace(
                                /_/g,
                                "-"
                              )
                              .replace(
                                / /g,
                                "-"
                              )
                          }`}
                        >

                          {formatStatus(
                            complaint.status
                          )}

                        </span>

                      </td>


                      <td>

                        {formatDate(
                          complaint.createdAt
                        )}

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-row"
                  >

                    No complaints found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* =================================================
          ALL ACTIVE COMPLAINT LOCATIONS
      ================================================= */}

      <div className="dashboard-box full-map-section">


        <div className="box-header">

          <div>

            <h2>
              Active Complaint Locations
            </h2>


            <p>
              All your complaints that are not
              resolved yet.
            </p>

          </div>


          <FaMapMarkerAlt />

        </div>


        <div className="map-container">


          <MapContainer

            center={mapCenter}

            zoom={13}

            style={{
              height: "100%",
              width: "100%",
            }}

          >


            <TileLayer

              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

              attribution="&copy; OpenStreetMap contributors"

            />


            {/* =================================================
                ACTIVE COMPLAINT MARKERS
            ================================================= */}

            {activeComplaints
              .filter(
                (complaint) => {

                  if (
                    !complaint.latitude ||
                    !complaint.longitude
                  ) {

                    return false;

                  }


                  if (
                    complaint.status
                      ?.toUpperCase() ===
                    "RESOLVED"
                  ) {

                    return false;

                  }


                  return true;

                }
              )
              .map(
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

                  >


                    <Popup>

                      <div>

                        <h4>

                          {
                            complaint.complaintNumber
                          }

                        </h4>


                        <p>

                          <b>
                            Title:
                          </b>{" "}

                          {
                            complaint.title
                          }

                        </p>


                        <p>

                          <b>
                            Category:
                          </b>{" "}

                          {
                            complaint.category
                          }

                        </p>


                        <p>

                          <b>
                            Status:
                          </b>{" "}

                          {
                            formatStatus(
                              complaint.status
                            )
                          }

                        </p>


                        <p>

                          <b>
                            Date:
                          </b>{" "}

                          {
                            formatDate(
                              complaint.createdAt
                            )
                          }

                        </p>


                        <p>

                          <b>
                            Latitude:
                          </b>{" "}

                          {
                            complaint.latitude
                          }

                        </p>


                        <p>

                          <b>
                            Longitude:
                          </b>{" "}

                          {
                            complaint.longitude
                          }

                        </p>

                      </div>

                    </Popup>


                  </Marker>

                )
              )}


          </MapContainer>


        </div>


      </div>


    </div>

  );

}