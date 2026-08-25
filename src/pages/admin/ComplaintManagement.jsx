import { useEffect, useState } from "react";
import "./ComplaintManagement.css";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCog,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function ComplaintManagement() {

  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);


  /* =====================================================
     GET JWT TOKEN
  ===================================================== */

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    );

  };


  /* =====================================================
     GET ASSIGNED COMPLAINTS
  ===================================================== */

  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        setLoading(true);

        const token = getToken();

        if (!token) {

          console.error("JWT token not found");

          setComplaints([]);

          return;

        }


        const response = await fetch(
          "http://localhost:8085/api/complaint/assigned",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );


        if (!response.ok) {

          const errorText = await response.text();

          console.error(
            "Failed to load complaints:",
            response.status,
            errorText
          );

          throw new Error(
            `Failed to load complaints: ${response.status}`
          );

        }


        const data = await response.json();

        console.log(
          "Assigned Complaint Response:",
          data
        );


        setComplaints(
          (data.content || []).map((item) => ({

            ...item,

            id: item.complaintNumber,

            citizen:
              `${item.firstName || ""} ${item.lastName || ""}`
                .trim() || "Unknown Citizen",

            title:
              item.title || "Untitled Complaint",

            department:
              item.department || "Not Assigned",

            priority:
              item.priority || "UNKNOWN",

            status:
              item.status || "UNKNOWN",

            engineer:
              item.engineerFirstName
                ? `${item.engineerFirstName} ${item.engineerLastName || ""}`.trim()
                : "Not Assigned",

            date:
              item.createdAt
                ? new Date(item.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }
                  )
                : "N/A"

          }))
        );


      } catch (error) {

        console.error(
          "Error loading complaints:",
          error
        );

        setComplaints([]);

      } finally {

        setLoading(false);

      }

    };


    fetchComplaints();

  }, []);


  /* =====================================================
     SUMMARY
  ===================================================== */

  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (item) => item.status === "PENDING"
    ).length;

  const assignedComplaints =
    complaints.filter(
      (item) => item.status === "ASSIGNED"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (item) => item.status === "IN_PROGRESS"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (item) => item.status === "RESOLVED"
    ).length;

  const rejectedComplaints =
    complaints.filter(
      (item) => item.status === "REJECTED"
    ).length;


  /* =====================================================
     DEPARTMENT OPTIONS
  ===================================================== */

  const departments = [
    ...new Set(
      complaints
        .map((item) => item.department)
        .filter(Boolean)
    )
  ];


  /* =====================================================
     SEARCH + FILTER
  ===================================================== */

  const filteredComplaints =
    complaints.filter((item) => {

      const keyword =
        search.toLowerCase().trim();


      const matchSearch =

        (item.complaintNumber || "")
          .toLowerCase()
          .includes(keyword)

        ||

        (item.firstName || "")
          .toLowerCase()
          .includes(keyword)

        ||

        (item.lastName || "")
          .toLowerCase()
          .includes(keyword)

        ||

        (item.email || "")
          .toLowerCase()
          .includes(keyword)

        ||

        (item.title || "")
          .toLowerCase()
          .includes(keyword)

        ||

        (item.description || "")
          .toLowerCase()
          .includes(keyword);


      const matchDepartment =
        department === "All" ||
        item.department === department;


      const matchStatus =
        status === "All" ||
        item.status === status;


      const matchPriority =
        priority === "All" ||
        item.priority === priority;


      return (
        matchSearch &&
        matchDepartment &&
        matchStatus &&
        matchPriority
      );

    });


  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages =
    Math.ceil(
      filteredComplaints.length /
      complaintsPerPage
    );


  const indexOfLast =
    currentPage * complaintsPerPage;


  const indexOfFirst =
    indexOfLast - complaintsPerPage;


  const currentComplaints =
    filteredComplaints.slice(
      indexOfFirst,
      indexOfLast
    );


  const paginate = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

  };


  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };


  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };


  /* =====================================================
     SEARCH RESET PAGE
  ===================================================== */

  const handleSearch = (value) => {

    setSearch(value);

    setCurrentPage(1);

  };


  /* =====================================================
     DEPARTMENT FILTER
  ===================================================== */

  const handleDepartment = (value) => {

    setDepartment(value);

    setCurrentPage(1);

  };


  /* =====================================================
     STATUS FILTER
  ===================================================== */

  const handleStatus = (value) => {

    setStatus(value);

    setCurrentPage(1);

  };


  /* =====================================================
     PRIORITY FILTER
  ===================================================== */

  const handlePriority = (value) => {

    setPriority(value);

    setCurrentPage(1);

  };


  return (

    <div className="complaint-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div>

          <h1>
            Complaint Management
          </h1>

          <p>
            Manage, assign, monitor and resolve
            citizen complaints efficiently.
          </p>

        </div>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="summary-grid">


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Total Complaints
            </h4>

            <h2>
              {totalComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaClipboardList />

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Pending
            </h4>

            <h2>
              {pendingComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaClock />

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Assigned
            </h4>

            <h2>
              {assignedComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaUserCog />

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              In Progress
            </h4>

            <h2>
              {inProgressComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaSpinner />

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Resolved
            </h4>

            <h2>
              {resolvedComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaCheckCircle />

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Rejected
            </h4>

            <h2>
              {rejectedComplaints}
            </h2>

          </div>

          <div className="summary-icon">

            <FaExclamationTriangle />

          </div>

        </div>


      </div>


      {/* =====================================================
          FILTER TOOLBAR
      ===================================================== */}

      <div className="toolbar">


        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search complaint..."
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

        </div>


        <select
          value={department}
          onChange={(e) =>
            handleDepartment(e.target.value)
          }
        >

          <option value="All">
            All Departments
          </option>

          {departments.map(
            (dept) => (

              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>

            )
          )}

        </select>


        <select
          value={status}
          onChange={(e) =>
            handleStatus(e.target.value)
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="ASSIGNED">
            Assigned
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="RESOLVED">
            Resolved
          </option>

          <option value="REJECTED">
            Rejected
          </option>

        </select>


        <select
          value={priority}
          onChange={(e) =>
            handlePriority(e.target.value)
          }
        >

          <option value="All">
            All Priority
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


        <button className="filter-btn">

          <FaFilter />

          Filter

        </button>


      </div>


      {/* =====================================================
          COMPLAINT TABLE
      ===================================================== */}

      <div className="table-card">


        <div className="card-header">

          <div>

            <h2>
              Complaint List
            </h2>

            <p>

              Showing{" "}
              {currentComplaints.length}
              {" "}of{" "}
              {filteredComplaints.length}
              {" "}complaints.

            </p>

          </div>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Citizen
                </th>

                <th>
                  Complaint
                </th>

                <th>
                  Department
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
                  Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>


              {loading ? (

                <tr className="empty-row">

                  <td colSpan="9">

                    Loading complaints...

                  </td>

                </tr>

              ) : currentComplaints.length > 0 ? (

                currentComplaints.map(
                  (item) => (

                    <tr
                      key={item.complaintId}
                    >


                      <td>

                        {item.complaintNumber}

                      </td>


                      <td>

                        {item.firstName}{" "}
                        {item.lastName}

                      </td>


                      <td>

                        {item.title}

                      </td>


                      <td>

                        {item.department}

                      </td>


                      <td>

                        <span
                          className={`priority ${
                            (item.priority || "")
                              .toLowerCase()
                          }`}
                        >

                          {item.priority}

                        </span>

                      </td>


                      <td>

                        <span
                          className={`status ${
                            (item.status || "")
                              .toLowerCase()
                              .replace(/\s/g, "-")
                          }`}
                        >

                          {item.status}

                        </span>

                      </td>


                      <td>

                        {item.engineerFirstName
                          ? `${item.engineerFirstName} ${
                              item.engineerLastName || ""
                            }`
                          : "Not Assigned"}

                      </td>


                      <td>

                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                              }
                            )
                          : "N/A"}

                      </td>


                      <td>

                        <div className="action-buttons">


                          <button
                            className="view-btn"
                            onClick={() => {

                              setSelectedComplaint(
                                item
                              );

                              setShowViewModal(
                                true
                              );

                            }}
                          >

                            View

                          </button>


                          <button
                            className="assign-btn"
                            onClick={() => {

                              setSelectedComplaint(
                                item
                              );

                              setShowAssignModal(
                                true
                              );

                            }}
                          >

                            Assign

                          </button>


                        </div>

                      </td>


                    </tr>

                  )
                )

              ) : (

                <tr className="empty-row">

                  <td colSpan="9">

                    No complaints found.

                  </td>

                </tr>

              )}


            </tbody>

          </table>

        </div>


      </div>


      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {filteredComplaints.length >
        complaintsPerPage && (

        <div className="pagination-wrapper">


          <button
            onClick={previousPage}
            disabled={currentPage === 1}
          >

            <FaChevronLeft />

            Previous

          </button>


          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    paginate(index + 1)
                  }
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


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


      {/* =====================================================
          VIEW COMPLAINT MODAL
      ===================================================== */}

      {showViewModal &&
        selectedComplaint && (

        <div className="modal-overlay">

          <div className="modal complaint-view-modal">


            <div className="modal-header">

              <h2>
                Complaint Details
              </h2>


              <button
                className="close-btn"
                onClick={() => {

                  setShowViewModal(false);

                  setSelectedComplaint(null);

                }}
              >

                ×

              </button>

            </div>


            {/* COMPLAINT INFORMATION */}

            <div className="details-section">

              <h3>
                Complaint Information
              </h3>


              <div className="details-grid">


                <div>

                  <label>
                    Complaint ID
                  </label>

                  <p>
                    {selectedComplaint.complaintNumber}
                  </p>

                </div>


                <div>

                  <label>
                    Complaint ID
                  </label>

                  <p>
                    {selectedComplaint.complaintId}
                  </p>

                </div>


                <div>

                  <label>
                    Date
                  </label>

                  <p>

                    {selectedComplaint.createdAt
                      ? new Date(
                          selectedComplaint.createdAt
                        ).toLocaleString(
                          "en-IN"
                        )
                      : "N/A"}

                  </p>

                </div>


                <div>

                  <label>
                    Title
                  </label>

                  <p>
                    {selectedComplaint.title}
                  </p>

                </div>


                <div>

                  <label>
                    Category
                  </label>

                  <p>
                    {selectedComplaint.category}
                  </p>

                </div>


                <div>

                  <label>
                    Department
                  </label>

                  <p>
                    {selectedComplaint.department}
                  </p>

                </div>


                <div>

                  <label>
                    Priority
                  </label>

                  <p>

                    <span
                      className={`priority ${
                        (
                          selectedComplaint.priority ||
                          ""
                        ).toLowerCase()
                      }`}
                    >

                      {selectedComplaint.priority}

                    </span>

                  </p>

                </div>


                <div>

                  <label>
                    Status
                  </label>

                  <p>

                    <span
                      className={`status ${
                        (
                          selectedComplaint.status ||
                          ""
                        )
                          .toLowerCase()
                          .replace(/\s/g, "-")
                      }`}
                    >

                      {selectedComplaint.status}

                    </span>

                  </p>

                </div>


                <div>

                  <label>
                    Description
                  </label>

                  <p>
                    {selectedComplaint.description}
                  </p>

                </div>


                <div>

                  <label>
                    Engineer Work Note
                  </label>

                  <p>
                    {selectedComplaint.engineerWorkNote ||
                      "No work note available"}
                  </p>

                </div>


              </div>

            </div>


            {/* CITIZEN INFORMATION */}

            <div className="details-section">

              <h3>
                Citizen Information
              </h3>


              <div className="details-grid">


                <div>

                  <label>
                    Citizen Name
                  </label>

                  <p>

                    {selectedComplaint.firstName}{" "}
                    {selectedComplaint.lastName}

                  </p>

                </div>


                <div>

                  <label>
                    Mobile
                  </label>

                  <p>
                    {selectedComplaint.contact ||
                      "N/A"}
                  </p>

                </div>


                <div>

                  <label>
                    Email
                  </label>

                  <p>
                    {selectedComplaint.email ||
                      "N/A"}
                  </p>

                </div>


                <div>

                  <label>
                    Address
                  </label>

                  <p>
                    {selectedComplaint.address ||
                      "N/A"}
                  </p>

                </div>


                <div>

                  <label>
                    Pincode
                  </label>

                  <p>
                    {selectedComplaint.pincode ||
                      "N/A"}
                  </p>

                </div>


                <div>

                  <label>
                    Latitude
                  </label>

                  <p>
                    {selectedComplaint.latitude ||
                      "N/A"}
                  </p>

                </div>


                <div>

                  <label>
                    Longitude
                  </label>

                  <p>
                    {selectedComplaint.longitude ||
                      "N/A"}
                  </p>

                </div>


              </div>

            </div>


            {/* ENGINEER INFORMATION */}

            <div className="details-section">

              <h3>
                Assigned Engineer
              </h3>


              <div className="details-grid">


                <div>

                  <label>
                    Engineer
                  </label>

                  <p>

                    {selectedComplaint.engineerFirstName
                      ? `${selectedComplaint.engineerFirstName} ${
                          selectedComplaint.engineerLastName ||
                          ""
                        }`
                      : "Not Assigned"}

                  </p>

                </div>


                <div>

                  <label>
                    Department
                  </label>

                  <p>
                    {selectedComplaint.department}
                  </p>

                </div>


              </div>

            </div>


            {/* TIMELINE */}

            <div className="details-section">

              <h3>
                Complaint Timeline
              </h3>


              <div className="timeline">


                <div className="timeline-item">

                  <span></span>

                  <div>

                    <h4>
                      Complaint Registered
                    </h4>

                    <p>

                      {selectedComplaint.createdAt
                        ? new Date(
                            selectedComplaint.createdAt
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "N/A"}

                    </p>

                  </div>

                </div>


                {selectedComplaint.assignedAt && (

                  <div className="timeline-item">

                    <span></span>

                    <div>

                      <h4>
                        Engineer Assigned
                      </h4>

                      <p>

                        {new Date(
                          selectedComplaint.assignedAt
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  </div>

                )}


                {selectedComplaint.updateAt && (

                  <div className="timeline-item">

                    <span></span>

                    <div>

                      <h4>
                        Complaint Updated
                      </h4>

                      <p>

                        {new Date(
                          selectedComplaint.updateAt
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  </div>

                )}


                {selectedComplaint.resolveAt && (

                  <div className="timeline-item">

                    <span></span>

                    <div>

                      <h4>
                        Complaint Resolved
                      </h4>

                      <p>

                        {new Date(
                          selectedComplaint.resolveAt
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  </div>

                )}


              </div>

            </div>


            {/* MEDIA */}

            {selectedComplaint.media &&
              selectedComplaint.media.length > 0 && (

              <div className="details-section">

                <h3>
                  Complaint Media
                </h3>


                <div className="details-grid">

                  {selectedComplaint.media.map(
                    (media) => (

                      <div
                        key={media.mediaId}
                      >

                        <label>
                          {media.mediaType === "AFTER"
                            ? "After Image"
                            : "Complaint Image"}
                        </label>

                        <p>
                          {media.fileName}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => {

                  setShowViewModal(false);

                  setSelectedComplaint(null);

                }}
              >

                Close

              </button>

            </div>


          </div>

        </div>

      )}


      {/* =====================================================
          ASSIGN ENGINEER MODAL
      ===================================================== */}

      {showAssignModal &&
        selectedComplaint && (

        <div className="modal-overlay">

          <div className="modal">


            <div className="modal-header">

              <h2>
                Assign Engineer
              </h2>


              <button
                className="close-btn"
                onClick={() =>
                  setShowAssignModal(false)
                }
              >

                ×

              </button>

            </div>


            <div className="form-grid">


              <div className="form-group">

                <label>
                  Complaint ID
                </label>

                <input
                  value={
                    selectedComplaint.complaintNumber
                  }
                  disabled
                />

              </div>


              <div className="form-group">

                <label>
                  Department
                </label>

                <input
                  value={
                    selectedComplaint.department ||
                    ""
                  }
                  disabled
                />

              </div>


              <div className="form-group">

                <label>
                  Current Engineer
                </label>

                <input
                  value={
                    selectedComplaint.engineerFirstName
                      ? `${selectedComplaint.engineerFirstName} ${
                          selectedComplaint.engineerLastName ||
                          ""
                        }`
                      : "Not Assigned"
                  }
                  disabled
                />

              </div>


              <div className="form-group">

                <label>
                  Priority
                </label>

                <input
                  value={
                    selectedComplaint.priority ||
                    ""
                  }
                  disabled
                />

              </div>


              <div className="form-group">

                <label>
                  Status
                </label>

                <input
                  value={
                    selectedComplaint.status ||
                    ""
                  }
                  disabled
                />

              </div>


            </div>


            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowAssignModal(false)
                }
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


export default ComplaintManagement;