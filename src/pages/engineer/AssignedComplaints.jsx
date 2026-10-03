import { useEffect, useState } from "react";
import "./AssignedComplaints.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/axios";

import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

function AssignedComplaints() {

  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [complaintData, setComplaintData] = useState([]);

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingStatus, setUpdatingStatus] = useState(null);

  const complaintsPerPage = 5;


  // ==========================================
  // GET ENGINEER COMPLAINTS
  // ==========================================

  const fetchComplaints = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {

        setError(
          "You are not logged in. Please login again."
        );

        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/engineer/complaints`,
        {
          params: {
            page: currentPage,
            size: complaintsPerPage,
            search: search.trim() || undefined,
            sortBy: "createdAt",
            direction: "desc"
          },

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Engineer Complaints Response:",
        response.data
      );

      const data = response.data;

      /*
       * ==========================================
       * ONLY ACTIVE COMPLAINTS
       * ==========================================
       *
       * RESOLVED and CANCELLED complaints
       * should not appear on Assigned Complaints.
       */

      const activeComplaints =
        (data.content || []).filter(
          (item) =>
            item.status !== "RESOLVED" &&
            item.status !== "CANCELLED"
        );

      setComplaintData(
        activeComplaints
      );

      /*
       * Backend pagination information
       */
      setTotalPages(
        data.totalPages || 0
      );

      setTotalElements(
        data.totalElements || 0
      );

    } catch (err) {

      console.error(
        "Engineer Complaint Fetch Error:",
        err
      );

      const backendMessage =
        err.response?.data?.message;

      if (backendMessage) {

        setError(
          backendMessage
        );

      } else if (
        typeof err.response?.data === "string"
      ) {

        setError(
          err.response.data
        );

      } else {

        setError(
          "Unable to load complaints. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FETCH COMPLAINTS
  // ==========================================

  useEffect(() => {

    fetchComplaints();

  }, [
    currentPage,
    search
  ]);


  // ==========================================
  // STATUS ORDER
  // ==========================================

  /*
   * Status workflow:
   *
   * ASSIGNED
   *     ↓
   * ACCEPTED
   *     ↓
   * IN_PROGRESS
   *     ↓
   * RESOLVED
   *
   * OR
   *
   * ASSIGNED
   *     ↓
   * CANCELLED
   *
   */

  const statusOrder = {
    ASSIGNED: 0,
    ACCEPTED: 1,
    IN_PROGRESS: 2,
    RESOLVED: 3,
    CANCELLED: 99
  };


  // ==========================================
  // GET NEXT ALLOWED STATUS
  // ==========================================

  const getAllowedStatuses = (currentStatus) => {

    switch (currentStatus) {

      case "ASSIGNED":

        return [
          "ASSIGNED",
          "ACCEPTED",
          "CANCELLED"
        ];

      case "ACCEPTED":

        return [
          "ACCEPTED",
          "IN_PROGRESS"
        ];

      case "IN_PROGRESS":

        return [
          "IN_PROGRESS",
          "RESOLVED"
        ];

      case "RESOLVED":

        return [
          "RESOLVED"
        ];

      case "CANCELLED":

        return [
          "CANCELLED"
        ];

      default:

        return [
          "ASSIGNED"
        ];

    }

  };


  // ==========================================
  // CHECK STATUS TRANSITION
  // ==========================================

  const isValidStatusChange = (
    currentStatus,
    newStatus
  ) => {

    /*
     * Same status is allowed
     */
    if (
      currentStatus === newStatus
    ) {

      return true;

    }


    /*
     * Cancelled cannot move anywhere
     */
    if (
      currentStatus === "CANCELLED"
    ) {

      return false;

    }


    /*
     * Resolved cannot move anywhere
     */
    if (
      currentStatus === "RESOLVED"
    ) {

      return false;

    }


    /*
     * Cancellation is only possible
     * before resolution.
     */
    if (
      newStatus === "CANCELLED"
    ) {

      return (
        currentStatus === "ASSIGNED"
      );

    }


    /*
     * Normal forward workflow
     */
    return (
      statusOrder[newStatus] >
      statusOrder[currentStatus]
    );

  };


  // ==========================================
  // STATUS UPDATE
  // ==========================================

  const updateStatus = async (
    complaintNumber,
    currentStatus,
    newStatus
  ) => {

    /*
     * Prevent invalid status transition
     */

    if (
      !isValidStatusChange(
        currentStatus,
        newStatus
      )
    ) {

      alert(
        `Invalid status change.\n\n${formatStatus(
          currentStatus
        )} cannot be changed to ${formatStatus(
          newStatus
        )}.`
      );

      return;

    }


    /*
     * Nothing to update
     */

    if (
      currentStatus === newStatus
    ) {

      return;

    }


    /*
     * Confirmation before changing status
     */

    const confirmed = window.confirm(
      `Change complaint ${complaintNumber} from ${formatStatus(
        currentStatus
      )} to ${formatStatus(
        newStatus
      )}?`
    );

    if (!confirmed) {

      return;

    }


    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert(
          "You are not logged in. Please login again."
        );

        return;

      }


      setUpdatingStatus(
        complaintNumber
      );


      /*
       * PUT API
       */

      const response =
        await axios.put(

          `${API_BASE_URL}/engineer/${complaintNumber}/work`,

          {
            status: newStatus
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json"
            }
          }

        );


      console.log(
        "Status Update Response:",
        response.data
      );


      /*
       * ==========================================
       * RESOLVED / CANCELLED
       * ==========================================
       *
       * Remove the complaint from Assigned page.
       */

      if (
        newStatus === "RESOLVED" ||
        newStatus === "CANCELLED"
      ) {

        setComplaintData(
          (previousComplaints) =>
            previousComplaints.filter(
              (item) =>
                item.complaintNumber !==
                complaintNumber
            )
        );


        /*
         * Update total count
         */

        setTotalElements(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );


        /*
         * If current page becomes empty,
         * move to previous page.
         */

        if (
          complaintData.length === 1 &&
          currentPage > 0
        ) {

          setCurrentPage(
            (previous) =>
              previous - 1
          );

        }

      } else {

        /*
         * ==========================================
         * NORMAL STATUS UPDATE
         * ==========================================
         */

        setComplaintData(
          (previousComplaints) =>

            previousComplaints.map(
              (item) =>

                item.complaintNumber ===
                complaintNumber

                  ? {
                      ...item,
                      status:
                        newStatus
                    }

                  : item
            )

        );

      }

    } catch (err) {

      console.error(
        "Status Update Error:",
        err
      );


      const backendMessage =
        err.response?.data?.message;

      let message;


      if (backendMessage) {

        message =
          backendMessage;

      } else if (
        typeof err.response?.data ===
        "string"
      ) {

        message =
          err.response.data;

      } else {

        message =
          "Unable to update complaint status.";

      }


      alert(message);

    } finally {

      setUpdatingStatus(null);

    }

  };


  // ==========================================
  // STATUS FILTER
  // ==========================================

  const filteredComplaints =
    complaintData.filter(
      (item) => {

        const matchesPriority =
          priorityFilter === "All" ||
          item.priority ===
            priorityFilter;


        const matchesStatus =
          statusFilter === "All" ||
          item.status ===
            statusFilter;


        return (
          matchesPriority &&
          matchesStatus
        );

      }
    );


  // ==========================================
  // FORMAT STATUS
  // ==========================================

  const formatStatus = (
    status
  ) => {

    if (!status) {

      return "-";

    }


    return status
      .toLowerCase()
      .replaceAll(
        "_",
        " "
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "-";

    }


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return date;

    }


    return parsedDate.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

  };


  // ==========================================
  // NEXT PAGE
  // ==========================================

  const nextPage = () => {

    if (
      currentPage <
      totalPages - 1
    ) {

      setCurrentPage(
        (previous) =>
          previous + 1
      );

    }

  };


  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const previousPage = () => {

    if (
      currentPage > 0
    ) {

      setCurrentPage(
        (previous) =>
          previous - 1
      );

    }

  };


  // ==========================================
  // PAGE CHANGE
  // ==========================================

  const changePage = (
    page
  ) => {

    setCurrentPage(
      page
    );

  };


  // ==========================================
  // OPEN LOCATION
  // ==========================================

  const openLocation = (
    complaint
  ) => {

    setSelectedLocation(
      complaint
    );

  };


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div className="assigned-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            Assigned Complaints
          </h1>

          <p>
            View assigned complaints, update complaint
            status, and access complaint locations.
          </p>

        </div>

      </div>


      {/* ==========================================
          SEARCH & FILTER
      ========================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search by ID, Username or Email..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(0);

            }}
          />

        </div>


        <div className="toolbar-right">

          {/* ==========================================
              PRIORITY
          ========================================== */}

          <div className="filter-box">

            <FaFilter />

            <select
              value={
                priorityFilter
              }
              onChange={(e) => {

                setPriorityFilter(
                  e.target.value
                );

              }}
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


          {/* ==========================================
              STATUS
          ========================================== */}

          <div className="filter-box">

            <FaFilter />

            <select
              value={
                statusFilter
              }
              onChange={(e) => {

                setStatusFilter(
                  e.target.value
                );

              }}
            >

              <option value="All">
                All
              </option>

              <option value="ASSIGNED">
                Assigned
              </option>

              <option value="ACCEPTED">
                Accepted
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="PENDING">
                Pending
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (

        <div className="error-message">

          {error}

        </div>

      )}


      {/* ==========================================
          COMPLAINT TABLE
      ========================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>
            Assigned Complaint List
          </h2>

          {!loading 
          // && (
          //   <span>
          //     Total: {totalElements}
          //   </span>
          // )
          }

        </div>


        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Username
                </th>

                <th>
                  Email
                </th>

             

                <th>
                  Priority
                </th>

                <th>
                  Date
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

              {/* ==========================================
                  LOADING
              ========================================== */}

              {loading ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-row"
                  >

                    Loading complaints...

                  </td>

                </tr>

              ) : filteredComplaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-row"
                  >

                    No active complaints found.

                  </td>

                </tr>

              ) : (

                filteredComplaints.map(
                  (item) => (

                    <tr
                      key={
                        item.complaintId
                      }
                    >

                      {/* ==================================
                          ID
                      ================================== */}

                      <td className="complaint-id">

                        {item.complaintNumber}

                      </td>


                      {/* ==================================
                          USERNAME
                      ================================== */}

                      <td>

                        <strong>

                          {item.firstName}{" "}

                          {item.lastName}

                        </strong>

                      </td>


                      {/* ==================================
                          EMAIL
                      ================================== */}

                      <td>

                        {item.email}

                      </td>


                      {/* ==================================
                          PHONE
                      ================================== */}



                      {/* ==================================
                          PRIORITY
                      ================================== */}

                      <td>

                        <span
                          className={`priority ${
                            item.priority
                              ?.toLowerCase()
                          }`}
                        >

                          {formatStatus(
                            item.priority
                          )}

                        </span>

                      </td>


                      {/* ==================================
                          DATE
                      ================================== */}

                      <td>

                        {formatDate(
                          item.createdAt
                        )}

                      </td>


                      {/* ==================================
                          STATUS
                      ================================== */}

                      <td>

                        <select
                          className="status-dropdown"

                          value={
                            item.status ||
                            "ASSIGNED"
                          }

                          disabled={
                            updatingStatus ===
                            item.complaintNumber
                          }

                          onChange={(e) => {

                            updateStatus(

                              item.complaintNumber,

                              item.status,

                              e.target.value

                            );

                          }}
                        >

                          {/* ==================================
                              CURRENT / NEXT STATUS OPTIONS
                          ================================== */}

                          {getAllowedStatuses(
                            item.status
                          ).map(
                            (status) => (

                              <option
                                key={
                                  status
                                }
                                value={
                                  status
                                }
                              >

                                {formatStatus(
                                  status
                                )}

                              </option>

                            )
                          )}

                        </select>


                        {updatingStatus ===
                          item.complaintNumber && (

                          <small>

                            Updating...

                          </small>

                        )}

                      </td>


                      {/* ==================================
                          ACTION
                      ================================== */}

                      <td>

                        <button
                          className="work-btn"

                          onClick={() =>

                            navigate(
                              `/engineer/work/${item.complaintNumber}`,
                              {
                                state: item
                              }
                            )

                          }
                        >

                          Open Work

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


      {/* ==========================================
          LOCATION MODAL
      ========================================== */}

      {selectedLocation && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedLocation(
              null
            )
          }
        >

          <div
            className="location-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>

                <FaMapMarkerAlt />

                Complaint Location

              </h2>

              <button
                className="close-btn"

                onClick={() =>
                  setSelectedLocation(
                    null
                  )
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="modal-body">

              <div className="location-info">

                <div className="location-item">

                  <label>
                    Complaint ID
                  </label>

                  <span>

                    {
                      selectedLocation.complaintNumber
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Citizen
                  </label>

                  <span>

                    {
                      selectedLocation.firstName
                    }{" "}

                    {
                      selectedLocation.lastName
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Email
                  </label>

                  <span>

                    {
                      selectedLocation.email
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Phone
                  </label>

                  <span>

                    {
                      selectedLocation.contact
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Priority
                  </label>

                  <span>

                    {
                      formatStatus(
                        selectedLocation.priority
                      )
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Status
                  </label>

                  <span>

                    {
                      formatStatus(
                        selectedLocation.status
                      )
                    }

                  </span>

                </div>

              </div>


              {/* ==================================
                  ADDRESS
              ================================== */}

              <div className="address-box">

                <h4>

                  <FaMapMarkerAlt />

                  Address

                </h4>

                <p>

                  {
                    selectedLocation.address
                  }

                </p>

              </div>


              {/* ==================================
                  PINCODE
              ================================== */}

              <div className="address-box">

                <h4>
                  Pincode
                </h4>

                <p>

                  {
                    selectedLocation.pincode
                  }

                </p>

              </div>


              {/* ==================================
                  COORDINATES
              ================================== */}

              <div className="location-info">

                <div className="location-item">

                  <label>
                    Latitude
                  </label>

                  <span>

                    {
                      selectedLocation.latitude
                    }

                  </span>

                </div>


                <div className="location-item">

                  <label>
                    Longitude
                  </label>

                  <span>

                    {
                      selectedLocation.longitude
                    }

                  </span>

                </div>

              </div>


              {/* ==================================
                  MAP
              ================================== */}

              <div className="map-placeholder">

                <FaMapMarkerAlt />

                <h3>
                  Google Map
                </h3>

                <p>

                  Google Map integration can be
                  added here using Google Maps API
                  or Leaflet.

                </p>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ==========================================
          PAGINATION
      ========================================== */}

      {totalPages > 1 && (

        <div className="pagination-wrapper">

          <button
            onClick={
              previousPage
            }

            disabled={
              currentPage === 0
            }
          >

            <FaChevronLeft />

            Previous

          </button>


          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}

                  className={
                    currentPage === index
                      ? "active-page"
                      : ""
                  }

                  onClick={() =>
                    changePage(index)
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          <button
            onClick={
              nextPage
            }

            disabled={
              currentPage ===
              totalPages - 1
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

export default AssignedComplaints;