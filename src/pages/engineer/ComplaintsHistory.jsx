import { useEffect, useState } from "react";
import axios from "axios";
import "./ComplaintsHistory.css";

import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function ComplaintsHistory() {

  /* ==========================================================
     STATES
  ========================================================== */

  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const complaintsPerPage = 5;

  /* ==========================================================
     GET ENGINEER COMPLAINTS
  ========================================================== */

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError(
            "You are not logged in. Please login again."
          );
          setLoading(false);
          return;
        }

        const params = {
          page: currentPage - 1,
          size: complaintsPerPage,
          sortBy: "createdAt",
          direction: "desc",
        };

        /*
         * Only send search when user actually entered
         * something.
         *
         * This avoids:
         * search=
         */

        if (search.trim()) {
          params.search = search.trim();
        }

        const response = await axios.get(
          "http://localhost:8085/api/engineer/complaints",
          {
            params: params,

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Engineer Complaint Response:",
          response.data
        );

        /*
         * Spring Boot Page response
         */

        setComplaints(
          response.data?.content || []
        );

        setTotalPages(
          response.data?.totalPages || 0
        );

        setTotalElements(
          response.data?.totalElements || 0
        );

      } catch (err) {

        console.error(
          "Engineer Complaint Fetch Error:",
          err
        );

        console.error(
          "Backend Error:",
          err.response?.data
        );

        if (err.response?.status === 401) {

          setError(
            "Your session has expired. Please login again."
          );

        } else if (err.response?.status === 403) {

          setError(
            "You do not have permission to view complaints."
          );

        } else {

          setError(
            err.response?.data?.message ||
            "Unable to load complaints."
          );
        }

        setComplaints([]);

      } finally {

        setLoading(false);

      }

    };

    fetchComplaints();

  }, [currentPage, search]);


  /* ==========================================================
     PRIORITY FILTER
  ========================================================== */

  const filteredComplaints = complaints.filter((item) => {

    if (priorityFilter === "All") {
      return true;
    }

    return item.priority === priorityFilter;

  });


  /* ==========================================================
     SEARCH CHANGE
  ========================================================== */

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

    /*
     * Whenever search changes,
     * start from page 1.
     */

    setCurrentPage(1);

  };


  /* ==========================================================
     PRIORITY CHANGE
  ========================================================== */

  const handlePriorityChange = (e) => {

    setPriorityFilter(e.target.value);

    setCurrentPage(1);

  };


  /* ==========================================================
     NEXT PAGE
  ========================================================== */

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };


  /* ==========================================================
     PREVIOUS PAGE
  ========================================================== */

  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };


  /* ==========================================================
     FORMAT DATE
  ========================================================== */

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const dateObject = new Date(date);

    if (isNaN(dateObject.getTime())) {
      return date;
    }

    return dateObject.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  /* ==========================================================
     FORMAT RESOLUTION TIME
  ========================================================== */

  const formatResolutionTime = (date) => {

    if (!date) {
      return "N/A";
    }

    const dateObject = new Date(date);

    if (isNaN(dateObject.getTime())) {
      return date;
    }

    return dateObject.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {

    return (

      <div className="assigned-page">

        <div className="assigned-header">

          <div>

            <h1>
              Complaint History
            </h1>

            <p>
              Loading complaint history...
            </p>

          </div>

        </div>

        <div className="assigned-card">

          <div
            className="empty-row"
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >

            Loading complaints...

          </div>

        </div>

      </div>

    );

  }


  /* ==========================================================
     PAGE
  ========================================================== */

  return (

    <div className="assigned-page">

      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            Complaint History
          </h1>

          <p>
            Browse all completed complaints, resolution history,
            engineer details and complaint records.
          </p>

        </div>

      </div>


      {/* ==========================================================
          ERROR
      ========================================================== */}

      {error && (

        <div className="error-message">

          <p>
            {error}
          </p>

        </div>

      )}


      {/* ==========================================================
          SEARCH & FILTER
      ========================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen or Category..."
            value={search}
            onChange={handleSearchChange}
          />

        </div>


        <div className="toolbar-right">

          <div className="filter-box">

            <FaFilter />

            <select
              value={priorityFilter}
              onChange={handlePriorityChange}
            >

              <option value="All">
                All
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="LOW">
                Low
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ==========================================================
          COMPLAINT HISTORY TABLE
      ========================================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>
            Complaint History
          </h2>

          <span>
            Total: {totalElements}
          </span>

        </div>


        <div className="table-wrapper">

          <table className="assigned-table">

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
                  Status
                </th>

                <th>
                  Engineer
                </th>

                <th>
                  Resolved On
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredComplaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >

                    No complaint history found.

                  </td>

                </tr>

              ) : (

                filteredComplaints.map(
                  (item) => (

                    <tr
                      key={item.complaintId}
                      onClick={() =>
                        setSelectedLocation(item)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >

                      {/* ====================================
                          COMPLAINT ID
                      ===================================== */}

                      <td className="complaint-id">

                        {item.complaintNumber}

                      </td>


                      {/* ====================================
                          CITIZEN
                      ===================================== */}

                      <td>

                        <strong>

                          {item.firstName}{" "}
                          {item.lastName}

                        </strong>

                        <br />

                        <small>

                          {item.email}

                        </small>

                      </td>


                      {/* ====================================
                          CATEGORY
                      ===================================== */}

                      <td>

                        {item.category}

                      </td>


                      {/* ====================================
                          PRIORITY
                      ===================================== */}

                      <td>

                        <span
                          className={`priority ${
                            item.priority
                              ?.toLowerCase()
                          }`}
                        >

                          {item.priority}

                        </span>

                      </td>


                      {/* ====================================
                          STATUS
                      ===================================== */}

                      <td>

                        <span
                          className={`status ${
                            item.status
                              ?.toLowerCase()
                              .replace(
                                /\s/g,
                                "-"
                              )
                          }`}
                        >

                          {item.status}

                        </span>

                      </td>


                      {/* ====================================
                          ENGINEER
                      ===================================== */}

                      <td>

                        {item.engineerFirstName}{" "}

                        {item.engineerLastName}

                      </td>


                      {/* ====================================
                          RESOLVED DATE
                      ===================================== */}

                      <td>

                        <strong>

                          {formatDate(
                            item.resolveAt
                          )}

                        </strong>

                        <br />

                        <small>

                          {item.resolutionTime
                            ? formatResolutionTime(
                                item.resolutionTime
                              )
                            : "Resolution"}

                        </small>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==========================================================
          LOCATION / COMPLAINT DETAILS MODAL
      ========================================================== */}

      {selectedLocation && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedLocation(null)
          }
        >

          <div
            className="location-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ==========================================
                MODAL HEADER
            =========================================== */}

            <div className="modal-header">

              <h2>

                <FaMapMarkerAlt />

                Complaint Details

              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setSelectedLocation(null)
                }
              >

                <FaTimes />

              </button>

            </div>


            {/* ==========================================
                MODAL BODY
            =========================================== */}

            <div className="modal-body">

              <div className="location-info">


                {/* Complaint ID */}

                <div className="location-item">

                  <label>
                    Complaint ID
                  </label>

                  <span>
                    {selectedLocation.complaintNumber}
                  </span>

                </div>


                {/* Citizen */}

                <div className="location-item">

                  <label>
                    Citizen
                  </label>

                  <span>

                    {selectedLocation.firstName}{" "}

                    {selectedLocation.lastName}

                  </span>

                </div>


                {/* Email */}

                <div className="location-item">

                  <label>
                    Email
                  </label>

                  <span>
                    {selectedLocation.email}
                  </span>

                </div>


                {/* Phone */}

                <div className="location-item">

                  <label>
                    Phone
                  </label>

                  <span>
                    {selectedLocation.contact || "N/A"}
                  </span>

                </div>


                {/* Category */}

                <div className="location-item">

                  <label>
                    Category
                  </label>

                  <span>
                    {selectedLocation.category}
                  </span>

                </div>


                {/* Department */}

                <div className="location-item">

                  <label>
                    Department
                  </label>

                  <span>
                    {selectedLocation.department}
                  </span>

                </div>


                {/* Priority */}

                <div className="location-item">

                  <label>
                    Priority
                  </label>

                  <span>
                    {selectedLocation.priority}
                  </span>

                </div>


                {/* Status */}

                <div className="location-item">

                  <label>
                    Status
                  </label>

                  <span>
                    {selectedLocation.status}
                  </span>

                </div>


                {/* Engineer */}

                <div className="location-item">

                  <label>
                    Engineer
                  </label>

                  <span>

                    {selectedLocation.engineerFirstName}{" "}

                    {selectedLocation.engineerLastName}

                  </span>

                </div>


                {/* Created */}

                <div className="location-item">

                  <label>
                    Created On
                  </label>

                  <span>
                    {formatDate(
                      selectedLocation.createdAt
                    )}
                  </span>

                </div>


                {/* Assigned */}

                <div className="location-item">

                  <label>
                    Assigned On
                  </label>

                  <span>
                    {formatDate(
                      selectedLocation.assignedAt
                    )}
                  </span>

                </div>


                {/* Resolved */}

                <div className="location-item">

                  <label>
                    Resolved On
                  </label>

                  <span>
                    {formatDate(
                      selectedLocation.resolveAt
                    )}
                  </span>

                </div>

              </div>


              {/* ==========================================
                  TITLE
              =========================================== */}

              <div className="address-box">

                <h4>
                  Complaint Title
                </h4>

                <p>
                  {selectedLocation.title}
                </p>

              </div>


              {/* ==========================================
                  DESCRIPTION
              =========================================== */}

              <div className="address-box">

                <h4>
                  Complaint Description
                </h4>

                <p>
                  {selectedLocation.description}
                </p>

              </div>


              {/* ==========================================
                  ADDRESS
              =========================================== */}

              <div className="address-box">

                <h4>

                  <FaMapMarkerAlt />

                  Address

                </h4>

                <p>
                  {selectedLocation.address}
                </p>

                <small>
                  Pincode:{" "}
                  {selectedLocation.pincode}
                </small>

              </div>


              {/* ==========================================
                  ENGINEER WORK NOTE
              =========================================== */}

              {selectedLocation.engineerWorkNote && (

                <div className="address-box">

                  <h4>
                    Resolution Summary
                  </h4>

                  <p>
                    {selectedLocation.engineerWorkNote}
                  </p>

                </div>

              )}


              {/* ==========================================
                  LOCATION MAP
              =========================================== */}

              <div className="map-placeholder">

                <FaMapMarkerAlt />

                <h3>
                  Complaint Location
                </h3>

                <p>

                  Latitude:{" "}
                  {selectedLocation.latitude}

                </p>

                <p>

                  Longitude:{" "}
                  {selectedLocation.longitude}

                </p>

                <p>

                  Integrate Google Maps or React
                  Leaflet here to display the
                  complaint location.

                </p>

              </div>


              {/* ==========================================
                  MEDIA
              =========================================== */}

              {selectedLocation.media &&
                selectedLocation.media.length > 0 && (

                <div className="address-box">

                  <h4>
                    Complaint Media
                  </h4>

                  <p>

                    {selectedLocation.media.length}{" "}
                    file(s) attached.

                  </p>

                  {selectedLocation.media.map(
                    (media) => (

                      <div
                        key={media.mediaId}
                        style={{
                          marginTop: "8px",
                        }}
                      >

                        <small>

                          {media.fileName}{" "}

                          {media.mediaType
                            ? `(${media.mediaType})`
                            : ""}

                        </small>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      )}


      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {totalPages > 1 && (

        <div className="pagination-wrapper">

          {/* PREVIOUS */}

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
          >

            <FaChevronLeft />

            Previous

          </button>


          {/* PAGE NUMBERS */}

          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          {/* NEXT */}

          <button
            onClick={nextPage}
            disabled={
              currentPage === totalPages
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      )}

    </div>

  );

}

export default ComplaintsHistory;