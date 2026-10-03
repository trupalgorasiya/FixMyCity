import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../../api/axios";
import "./AllComplaints.css";

import {
  FaSearch,
  FaFilter,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaSpinner,
  FaFilePdf,
  FaVideo,
  FaImage
} from "react-icons/fa";

function AllComplaints() {

  /* ==========================================================
     STATES
  ========================================================== */

  const [complaintData, setComplaintData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const complaintsPerPage = 5;


  /* ==========================================================
     GET COMPLAINTS FROM API
  ========================================================== */

  const fetchComplaints = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setError(
        "You are not logged in. Please login again."
      );

      return;
    }


    try {

      setLoading(true);

      setError("");


      const response =
        await axios.get(
          `${API_BASE_URL}/department/assigned`,
          {
            params: {
              page: 0,
              size: 100,
              sortBy: "createdAt",
              direction: "desc"
            },

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      console.log(
        "Department Complaints:",
        response.data
      );


      const complaints =
        response.data?.content || [];


      const formattedComplaints =
        complaints.map((item) => {

          const media =
            item.media || [];


          /*
           * Complaint media
           */
          const complaintMedia =
            media.filter(
              (file) =>
                !file.mediaType ||
                file.mediaType === "COMPLAINT"
            );


          /*
           * Before work media
           */
          const beforeMedia =
            media.filter(
              (file) =>
                file.mediaType === "BEFORE"
            );


          /*
           * After work media
           */
          const afterMedia =
            media.filter(
              (file) =>
                file.mediaType === "AFTER"
            );


          /*
           * Engineer name
           */
          const engineerName =
            `${item.engineerFirstName || ""} ${
              item.engineerLastName || ""
            }`.trim();


          return {

            id:
              item.complaintNumber ||
              `CMP-${item.complaintId}`,

            complaintId:
              item.complaintId,

            citizen:
              `${item.firstName || ""} ${
                item.lastName || ""
              }`.trim(),

            email:
              item.email || "-",

            mobile:
              item.contact || "-",

            category:
              item.category || "-",

            department:
              item.department || "-",

            location:
              item.address || "Address not available",

            address:
              item.address || "Address not available",

            pincode:
              item.pincode || "-",

            latitude:
              item.latitude || "-",

            longitude:
              item.longitude || "-",

            priority:
              item.priority || "-",

            engineer:
              engineerName ||
              "Not Assigned",

            assignedDate:
              formatDate(item.assignedAt),

            resolvedDate:
              formatDate(item.resolveAt),

            createdDate:
              formatDate(item.createdAt),

            updatedDate:
              formatDate(item.updateAt),

            resolutionTime:
              formatResolutionTime(
                item.assignedAt,
                item.resolveAt
              ),

            status:
              formatStatus(item.status),

            description:
              item.description ||
              "No complaint description available.",

            title:
              item.title || "-",

            engineerRemark:
              item.engineerWorkNote ||
              "No engineer work note available.",

            citizenFeedback:
              item.citizenFeedback ||
              "No citizen feedback available.",

            rating:
              item.rating || 0,

            complaintMedia,

            beforeMedia,

            afterMedia,

            media

          };

        });


      setComplaintData(
        formattedComplaints
      );


      setCurrentPage(1);


    } catch (err) {

      console.error(
        "Fetch Complaints Error:",
        err
      );


      if (
        err.response?.status === 401
      ) {

        setError(
          "Your session has expired. Please login again."
        );

      } else if (
        err.response?.status === 403
      ) {

        setError(
          "You are not authorized to view department complaints."
        );

      } else {

        setError(
          err.response?.data?.message ||
          "Unable to load complaint history."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  /* ==========================================================
     LOAD DATA
  ========================================================== */

  useEffect(() => {

    fetchComplaints();

  }, []);


  /* ==========================================================
     FORMAT DATE
  ========================================================== */

  function formatDate(dateValue) {

    if (!dateValue) {
      return "-";
    }


    try {

      const date =
        new Date(dateValue);


      if (isNaN(date.getTime())) {
        return "-";
      }


      return date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );

    } catch {

      return "-";

    }

  }


  /* ==========================================================
     CALCULATE RESOLUTION TIME
  ========================================================== */

  function formatResolutionTime(
    assignedAt,
    resolveAt
  ) {

    if (!assignedAt || !resolveAt) {
      return "-";
    }


    const assigned =
      new Date(assignedAt);

    const resolved =
      new Date(resolveAt);


    if (
      isNaN(assigned.getTime()) ||
      isNaN(resolved.getTime())
    ) {

      return "-";

    }


    const difference =
      resolved.getTime() -
      assigned.getTime();


    if (difference < 0) {
      return "-";
    }


    const totalMinutes =
      Math.floor(
        difference / (1000 * 60)
      );


    const days =
      Math.floor(
        totalMinutes / (60 * 24)
      );


    const hours =
      Math.floor(
        (totalMinutes % (60 * 24)) / 60
      );


    const minutes =
      totalMinutes % 60;


    if (days > 0) {

      return `${days} ${
        days === 1 ? "Day" : "Days"
      }`;

    }


    if (hours > 0) {

      return `${hours} ${
        hours === 1 ? "Hour" : "Hours"
      }`;

    }


    return `${minutes} ${
      minutes === 1 ? "Minute" : "Minutes"
    }`;

  }


  /* ==========================================================
     FORMAT STATUS
  ========================================================== */

  function formatStatus(status) {

    if (!status) {
      return "-";
    }


    const formatted =
      status
        .toLowerCase()
        .replace(/_/g, " ");


    return formatted
      .charAt(0)
      .toUpperCase() +
      formatted.slice(1);

  }


  /* ==========================================================
     FORMAT PRIORITY
  ========================================================== */

  function formatPriority(priority) {

    if (!priority) {
      return "-";
    }


    const formatted =
      priority.toLowerCase();


    return formatted
      .charAt(0)
      .toUpperCase() +
      formatted.slice(1);

  }


  /* ==========================================================
     SEARCH & FILTER
  ========================================================== */

  const filteredComplaints =
    useMemo(() => {

      return complaintData.filter(
        (item) => {

          const keyword =
            search
              .toLowerCase()
              .trim();


          const matchesSearch =
            !keyword ||

            item.id
              .toLowerCase()
              .includes(keyword) ||

            item.citizen
              .toLowerCase()
              .includes(keyword) ||

            item.category
              .toLowerCase()
              .includes(keyword) ||

            item.engineer
              .toLowerCase()
              .includes(keyword) ||

            item.department
              .toLowerCase()
              .includes(keyword) ||

            item.title
              .toLowerCase()
              .includes(keyword);


          const matchesPriority =
            priorityFilter === "All" ||
            item.priority ===
              priorityFilter.toUpperCase();


          const matchesStatus =
            statusFilter === "All" ||
            item.status.toLowerCase() ===
              statusFilter.toLowerCase();


          return (
            matchesSearch &&
            matchesPriority &&
            matchesStatus
          );

        }
      );

    }, [
      complaintData,
      search,
      priorityFilter,
      statusFilter
    ]);


  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages =
    Math.ceil(
      filteredComplaints.length /
      complaintsPerPage
    );


  const indexOfLastComplaint =
    currentPage *
    complaintsPerPage;


  const indexOfFirstComplaint =
    indexOfLastComplaint -
    complaintsPerPage;


  const currentComplaints =
    filteredComplaints.slice(
      indexOfFirstComplaint,
      indexOfLastComplaint
    );


  /* ==========================================================
     NEXT PAGE
  ========================================================== */

  const nextPage = () => {

    if (
      currentPage < totalPages
    ) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };


  /* ==========================================================
     PREVIOUS PAGE
  ========================================================== */

  const previousPage = () => {

    if (
      currentPage > 1
    ) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };


  /* ==========================================================
     MEDIA URL
  ========================================================== */

  const getMediaUrl = (file) => {

    if (!file?.fileUrl) {
      return "";
    }


    /*
     * Backend returns:
     *
     * uploads\complaints\CMP-...\after\file.jpg
     *
     * Browser needs:
     *
     * /uploads/complaints/CMP-.../after/file.jpg
     */

    const normalizedPath =
      file.fileUrl
        .replace(/\\/g, "/");


    return `${BASE_URL}/${normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath}`;

  };


  /* ==========================================================
     MEDIA PREVIEW
  ========================================================== */

  const renderMedia = (
    file,
    index
  ) => {

    const url =
      getMediaUrl(file);


    if (!url) {
      return null;
    }


    const fileType =
      file.fileType || "";


    /* IMAGE */

    if (
      fileType.startsWith("image/")
    ) {

      return (

        <div
          className="repair-card"
          key={
            file.mediaId ||
            `${file.fileName}-${index}`
          }
        >

          <h4>
            {file.fileName ||
              `Image ${index + 1}`}
          </h4>

          <img
            src={url}
            alt={
              file.fileName ||
              "Complaint media"
            }
          />

        </div>

      );

    }


    /* VIDEO */

    if (
      fileType.startsWith("video/")
    ) {

      return (

        <div
          className="repair-card"
          key={
            file.mediaId ||
            `${file.fileName}-${index}`
          }
        >

          <h4>
            <FaVideo />
            {" "}
            {file.fileName ||
              `Video ${index + 1}`}
          </h4>

          <video
            controls
            src={url}
            style={{
              width: "100%",
              maxHeight: "300px"
            }}
          />

        </div>

      );

    }


    /* PDF */

    if (
      fileType ===
      "application/pdf"
    ) {

      return (

        <div
          className="repair-card"
          key={
            file.mediaId ||
            `${file.fileName}-${index}`
          }
        >

          <h4>

            <FaFilePdf />

            {" "}

            {file.fileName ||
              "PDF File"}

          </h4>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
          >

            Open PDF

          </a>

        </div>

      );

    }


    return null;

  };


  /* ==========================================================
     JSX
  ========================================================== */

  return (

    <div className="assigned-page">


      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            Department Complaint History
          </h1>

          <p>
            View all resolved complaints
            handled by your department.
          </p>

        </div>

      </div>


      {/* ======================================================
          SEARCH & FILTER
      ====================================================== */}

      <div className="complaint-toolbar">


        {/* SEARCH */}

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen or Engineer..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />

        </div>


        {/* FILTER */}

        <div className="toolbar-right">


          {/* PRIORITY */}

          <div className="filter-box">

            <FaFilter />

            <select
              value={priorityFilter}
              onChange={(e) => {

                setPriorityFilter(
                  e.target.value
                );

                setCurrentPage(1);

              }}
            >

              <option value="All">
                All
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


          {/* STATUS */}

          <div className="filter-box">

            <FaFilter />

            <select
              value={statusFilter}
              onChange={(e) => {

                setStatusFilter(
                  e.target.value
                );

                setCurrentPage(1);

              }}
            >

              <option value="All">
                All
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Closed">
                Closed
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ======================================================
          LOADING
      ====================================================== */}

      {loading && (

        <div className="loading-container">

          <FaSpinner
            className="loading-spinner"
          />

          <p>
            Loading complaint history...
          </p>

        </div>

      )}


      {/* ======================================================
          ERROR
      ====================================================== */}

      {!loading && error && (

        <div className="error-container">

          <p>
            {error}
          </p>

          <button
            onClick={fetchComplaints}
          >
            Try Again
          </button>

        </div>

      )}


      {/* ======================================================
          COMPLAINT TABLE
      ====================================================== */}

      {!loading && !error && (

        <div className="assigned-card">

          <div className="card-header">

            <h2>
              Complaint History
            </h2>

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
                    Engineer
                  </th>

                  <th>
                    Resolved Date
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {currentComplaints.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="empty-row"
                    >

                      No complaint history found.

                    </td>

                  </tr>

                ) : (

                  currentComplaints.map(
                    (item) => (

                      <tr
                        key={
                          item.complaintId ||
                          item.id
                        }
                      >


                        {/* COMPLAINT ID */}

                        <td
                          className="complaint-id"
                        >

                          {item.id}

                        </td>


                        {/* CITIZEN */}

                        <td>

                          <strong>
                            {item.citizen}
                          </strong>

                          <br />

                          <small>
                            {item.email}
                          </small>

                        </td>


                        {/* CATEGORY */}

                        <td>

                          {item.category}

                        </td>


                        {/* PRIORITY */}

                        <td>

                          <span
                            className={`priority ${
                              item.priority
                                .toLowerCase()
                            }`}
                          >

                            {formatPriority(
                              item.priority
                            )}

                          </span>

                        </td>


                        {/* ENGINEER */}

                        <td>

                          {item.engineer}

                        </td>


                        {/* RESOLVED DATE */}

                        <td>

                          <strong>
                            {item.resolvedDate}
                          </strong>

                          <br />

                          <small>
                            {item.resolutionTime}
                          </small>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`status ${
                              item.status
                                .toLowerCase()
                                .replace(
                                  /\s/g,
                                  "-"
                                )
                            }`}
                          >

                            {item.status}

                          </span>

                        </td>


                        {/* ACTION */}

                        <td>

                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedComplaint(
                                item
                              )
                            }
                          >

                            <FaEye />

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* ======================================================
          VIEW COMPLAINT MODAL
      ====================================================== */}

      {selectedComplaint && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedComplaint(null)
          }
        >

          <div
            className="history-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="modal-header">

              <h2>
                Complaint Details
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="modal-body">


              {/* =================================================
                  COMPLAINT INFORMATION
              ================================================= */}

              <div className="location-info">


                <div className="location-item">

                  <label>
                    Complaint ID
                  </label>

                  <span>
                    {selectedComplaint.id}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Complaint Title
                  </label>

                  <span>
                    {selectedComplaint.title}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Citizen
                  </label>

                  <span>
                    {selectedComplaint.citizen}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Email
                  </label>

                  <span>
                    {selectedComplaint.email}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Mobile
                  </label>

                  <span>
                    {selectedComplaint.mobile}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Category
                  </label>

                  <span>
                    {selectedComplaint.category}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Department
                  </label>

                  <span>
                    {selectedComplaint.department}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Location
                  </label>

                  <span>
                    {selectedComplaint.location}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Pincode
                  </label>

                  <span>
                    {selectedComplaint.pincode}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Priority
                  </label>

                  <span
                    className={`priority ${
                      selectedComplaint.priority
                        .toLowerCase()
                    }`}
                  >

                    {formatPriority(
                      selectedComplaint.priority
                    )}

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Engineer
                  </label>

                  <span>
                    {selectedComplaint.engineer}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Assigned Date
                  </label>

                  <span>
                    {selectedComplaint.assignedDate}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Resolved Date
                  </label>

                  <span>
                    {selectedComplaint.resolvedDate}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Resolution Time
                  </label>

                  <span>
                    {selectedComplaint.resolutionTime}
                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Status
                  </label>

                  <span
                    className={`status ${
                      selectedComplaint.status
                        .toLowerCase()
                        .replace(
                          /\s/g,
                          "-"
                        )
                    }`}
                  >

                    {selectedComplaint.status}

                  </span>

                </div>

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="address-box">

                <h4>
                  Complaint Description
                </h4>

                <p>
                  {selectedComplaint.description}
                </p>

              </div>


              {/* =================================================
                  COMPLAINT MEDIA
              ================================================= */}

              {selectedComplaint
                .complaintMedia
                ?.length > 0 && (

                <div className="image-section">

                  {/* <h4>
                    Complaint Media
                  </h4>

                  <div className="repair-images">

                    {selectedComplaint
                      .complaintMedia
                      .map(
                        renderMedia
                      )}

                  </div> */}

                </div>

              )}


              {/* =================================================
                  BEFORE WORK
              ================================================= */}

              {selectedComplaint
                .beforeMedia
                ?.length > 0 && (

                <div className="image-section">

                  <h4>
                    Before Work
                  </h4>

                  <div className="repair-images">

                    {selectedComplaint
                      .beforeMedia
                      .map(
                        renderMedia
                      )}

                  </div>

                </div>

              )}


              {/* =================================================
                  AFTER WORK
              ================================================= */}

              {selectedComplaint
                .afterMedia
                ?.length > 0 && (

                <div className="image-section">

                  <h4>
                    After Work
                  </h4>

                  <div className="repair-images">

                    {selectedComplaint
                      .afterMedia
                      .map(
                        renderMedia
                      )}

                  </div>

                </div>

              )}


              {/* =================================================
                  ENGINEER NOTES
              ================================================= */}

              <div className="address-box">

                <h4>
                  Engineer Work Notes
                </h4>

                <p>
                  {selectedComplaint.engineerRemark}
                </p>

              </div>


              {/* =================================================
                  CITIZEN FEEDBACK
              ================================================= */}

              {/* <div className="address-box">

                <h4>
                  Citizen Rating
                </h4>

                {selectedComplaint.rating > 0 ? (

                  <p
                    style={{
                      fontSize: "22px"
                    }}
                  >

                    {"⭐".repeat(
                      selectedComplaint.rating
                    )}

                  </p>

                ) : (

                  <p>
                    No rating available.
                  </p>

                )}


                <h4
                  style={{
                    marginTop: "15px"
                  }}
                >

                  Citizen Feedback

                </h4>

                <p>

                  {selectedComplaint
                    .citizenFeedback}

                </p>

              </div> */}


              {/* =================================================
                  LOCATION COORDINATES
              ================================================= */}

              <div className="address-box">

                <h4>
                  Complaint Coordinates
                </h4>

                <p>

                  <strong>
                    Latitude:
                  </strong>

                  {" "}

                  {selectedComplaint.latitude}

                </p>

                <p>

                  <strong>
                    Longitude:
                  </strong>

                  {" "}

                  {selectedComplaint.longitude}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {!loading &&
        !error &&
        filteredComplaints.length >
          complaintsPerPage && (

        <div className="pagination-wrapper">


          {/* PREVIOUS */}

          <button
            onClick={previousPage}
            disabled={
              currentPage === 1
            }
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
                    currentPage ===
                    index + 1
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
              currentPage ===
              totalPages
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

export default AllComplaints;