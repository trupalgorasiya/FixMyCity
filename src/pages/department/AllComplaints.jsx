import { useMemo, useState } from "react";
import "./AllComplaints.css";

import {
  FaSearch,
  FaFilter,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function AllComplaints() {

  /* ==========================================================
     DUMMY COMPLAINT HISTORY DATA
     (Only Complaints of Logged-in Department)
  ========================================================== */

  const complaintData = [

    {
      id: "CMP-1009",
      citizen: "Rahul Patel",
      email: "rahul@gmail.com",
      mobile: "9876543210",

      category: "Water Leakage",
      location: "Satellite, Ahmedabad",

      priority: "High",

      engineer: "Amit Patel",

      assignedDate: "20 Jul 2026",
      resolvedDate: "24 Jul 2026",

      resolutionTime: "4 Days",

      status: "Completed",

      description:
        "Water pipeline leakage near society entrance causing continuous water wastage.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before+Repair",

      afterImage:
        "https://via.placeholder.com/350x220?text=After+Repair",

      engineerRemark:
        "Damaged pipeline replaced successfully and leakage stopped.",

      citizenFeedback:
        "Problem solved quickly. Excellent work.",

      rating: 5,
    },
    {
      id: "CMP-1001",
      citizen: "Rahul Patel",
      email: "rahul@gmail.com",
      mobile: "9876543210",

      category: "Water Leakage",
      location: "Satellite, Ahmedabad",

      priority: "High",

      engineer: "Amit Patel",

      assignedDate: "20 Jul 2026",
      resolvedDate: "24 Jul 2026",

      resolutionTime: "4 Days",

      status: "Completed",

      description:
        "Water pipeline leakage near society entrance causing continuous water wastage.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before+Repair",

      afterImage:
        "https://via.placeholder.com/350x220?text=After+Repair",

      engineerRemark:
        "Damaged pipeline replaced successfully and leakage stopped.",

      citizenFeedback:
        "Problem solved quickly. Excellent work.",

      rating: 5,
    },
    {
      id: "CMP-1002",
      citizen: "Jeel Bhalani",
      email: "jeel@gmail.com",
      mobile: "9876543211",

      category: "Water Supply",

      location: "Nikol, Ahmedabad",

      priority: "Medium",

      engineer: "Jay Mehta",

      assignedDate: "18 Jul 2026",

      resolvedDate: "21 Jul 2026",

      resolutionTime: "3 Days",

      status: "Completed",

      description:
        "Low water pressure reported in the residential area.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before",

      afterImage:
        "https://via.placeholder.com/350x220?text=After",

      engineerRemark:
        "Pressure valve replaced successfully.",

      citizenFeedback:
        "Water supply restored.",

      rating: 4,
    },

    {
      id: "CMP-1003",
      citizen: "Amit Shah",
      email: "amit@gmail.com",
      mobile: "9876543212",

      category: "Pipeline Damage",

      location: "Bopal, Ahmedabad",

      priority: "High",

      engineer: "Hardik Shah",

      assignedDate: "16 Jul 2026",

      resolvedDate: "19 Jul 2026",

      resolutionTime: "3 Days",

      status: "Completed",

      description:
        "Underground water pipeline damaged during construction.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before",

      afterImage:
        "https://via.placeholder.com/350x220?text=After",

      engineerRemark:
        "Pipeline joint replaced and tested.",

      citizenFeedback:
        "Satisfied with repair work.",

      rating: 5,
    },

    {
      id: "CMP-1004",
      citizen: "Priya Patel",
      email: "priya@gmail.com",
      mobile: "9876543213",

      category: "Water Leakage",

      location: "Gota",

      priority: "Low",

      engineer: "Amit Patel",

      assignedDate: "17 Jul 2026",

      resolvedDate: "20 Jul 2026",

      resolutionTime: "3 Days",

      status: "Completed",

      description:
        "Minor leakage near residential pipeline.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before",

      afterImage:
        "https://via.placeholder.com/350x220?text=After",

      engineerRemark:
        "Leakage sealed successfully.",

      citizenFeedback:
        "Thank you.",

      rating: 4,
    },

    {
      id: "CMP-1005",
      citizen: "Harsh Patel",
      email: "harsh@gmail.com",
      mobile: "9876543214",

      category: "Water Tank",

      location: "Naroda",

      priority: "Medium",

      engineer: "Jay Mehta",

      assignedDate: "19 Jul 2026",

      resolvedDate: "22 Jul 2026",

      resolutionTime: "3 Days",

      status: "Completed",

      description:
        "Water tank overflow issue.",

      complaintImage:
        "https://via.placeholder.com/600x350",

      beforeImage:
        "https://via.placeholder.com/350x220?text=Before",

      afterImage:
        "https://via.placeholder.com/350x220?text=After",

      engineerRemark:
        "Float valve replaced.",

      citizenFeedback:
        "Overflow stopped.",

      rating: 5,
    },

  ];

  /* ==========================================================
     STATES
  ========================================================== */

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const complaintsPerPage = 5;

  /* ==========================================================
     SEARCH & FILTER
  ========================================================== */

  const filteredComplaints = useMemo(() => {

    return complaintData.filter((item) => {

      const keyword =
        search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(keyword) ||
        item.citizen.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.engineer.toLowerCase().includes(keyword);

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );

    });

  }, [
    search,
    priorityFilter,
    statusFilter,
  ]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredComplaints.length /
      complaintsPerPage
  );

  const indexOfLastComplaint =
    currentPage * complaintsPerPage;

  const indexOfFirstComplaint =
    indexOfLastComplaint -
    complaintsPerPage;

  const currentComplaints =
    filteredComplaints.slice(
      indexOfFirstComplaint,
      indexOfLastComplaint
    );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  /* ==========================================================
     JSX START
  ========================================================== */

  return (

    <div className="assigned-page">

      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}

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

      {/* ==========================================================
          SEARCH & FILTER
      ========================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen or Engineer..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              setCurrentPage(1);

            }}
          />

        </div>

        <div className="toolbar-right">

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

              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>

            </select>

          </div>

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

              <option>All</option>
              <option>Completed</option>
              <option>Closed</option>

            </select>

          </div>

        </div>

      </div>

      {/* ==========================================================
          COMPLAINT HISTORY TABLE
      ========================================================== */}
            <div className="assigned-card">

        <div className="card-header">

          <h2>Complaint History</h2>

        </div>

        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>Complaint ID</th>

                <th>Citizen</th>

                <th>Category</th>

                <th>Priority</th>

                <th>Engineer</th>

                <th>Resolved Date</th>

                <th>Status</th>

                <th>Action</th>

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

                currentComplaints.map((item) => (

                  <tr key={item.id}>

                    {/* Complaint ID */}

                    <td className="complaint-id">

                      {item.id}

                    </td>

                    {/* Citizen */}

                    <td>

                      <strong>
                        {item.citizen}
                      </strong>

                      <br />

                      <small>
                        {item.email}
                      </small>

                    </td>

                    {/* Category */}

                    <td>

                      {item.category}

                    </td>

                    {/* Priority */}

                    <td>

                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>

                    </td>

                    {/* Engineer */}

                    <td>

                      {item.engineer}

                    </td>

                    {/* Resolve Date */}

                    <td>

                      <strong>
                        {item.resolvedDate}
                      </strong>

                      <br />

                      <small>
                        {item.resolutionTime}
                      </small>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`status ${item.status
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    {/* Action */}

                    <td>

                      <button
                        className="view-btn"
                        onClick={() =>
                          setSelectedComplaint(item)
                        }
                      >

                        <FaEye />

                        View

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================================
          VIEW COMPLAINT MODAL
      ========================================================== */}
            {selectedComplaint && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >

          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ==========================================
                MODAL HEADER
            ========================================== */}

            <div className="modal-header">

              <h2>Complaint Details</h2>

              <button
                className="close-btn"
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >
                ✕
              </button>

            </div>

            {/* ==========================================
                MODAL BODY
            ========================================== */}

            <div className="modal-body">

              {/* Complaint Information */}

              <div className="location-info">

                <div className="location-item">
                  <label>Complaint ID</label>
                  <span>{selectedComplaint.id}</span>
                </div>

                <div className="location-item">
                  <label>Citizen</label>
                  <span>{selectedComplaint.citizen}</span>
                </div>

                <div className="location-item">
                  <label>Email</label>
                  <span>{selectedComplaint.email}</span>
                </div>

                <div className="location-item">
                  <label>Mobile</label>
                  <span>{selectedComplaint.mobile}</span>
                </div>

                <div className="location-item">
                  <label>Category</label>
                  <span>{selectedComplaint.category}</span>
                </div>

                <div className="location-item">
                  <label>Location</label>
                  <span>{selectedComplaint.location}</span>
                </div>

                <div className="location-item">
                  <label>Priority</label>
                  <span>{selectedComplaint.priority}</span>
                </div>

                <div className="location-item">
                  <label>Engineer</label>
                  <span>{selectedComplaint.engineer}</span>
                </div>

                <div className="location-item">
                  <label>Assigned Date</label>
                  <span>{selectedComplaint.assignedDate}</span>
                </div>

                <div className="location-item">
                  <label>Resolved Date</label>
                  <span>{selectedComplaint.resolvedDate}</span>
                </div>

                <div className="location-item">
                  <label>Resolution Time</label>
                  <span>{selectedComplaint.resolutionTime}</span>
                </div>

                <div className="location-item">
                  <label>Status</label>
                  <span>{selectedComplaint.status}</span>
                </div>

              </div>

              {/* Description */}

              <div className="address-box">

                <h4>Complaint Description</h4>

                <p>
                  {selectedComplaint.description}
                </p>

              </div>

              {/* Complaint Image */}

              <div className="image-section">

                <h4>Complaint Image</h4>

                <img
                  src={selectedComplaint.complaintImage}
                  alt="Complaint"
                  className="complaint-image"
                />

              </div>

              {/* Before & After Images */}

              <div className="repair-images">

                <div className="repair-card">

                  <h4>Before Repair</h4>

                  <img
                    src={selectedComplaint.beforeImage}
                    alt="Before Repair"
                  />

                </div>

                <div className="repair-card">

                  <h4>After Repair</h4>

                  <img
                    src={selectedComplaint.afterImage}
                    alt="After Repair"
                  />

                </div>

              </div>

              {/* Engineer Notes */}

              <div className="address-box">

                <h4>Engineer Work Notes</h4>

                <p>
                  {selectedComplaint.engineerRemark}
                </p>

              </div>

              {/* Citizen Feedback */}

              <div className="address-box">

                <h4>Citizen Rating</h4>

                <p style={{ fontSize: "22px" }}>
                  {"⭐".repeat(selectedComplaint.rating)}
                </p>

                <h4 style={{ marginTop: "15px" }}>
                  Citizen Feedback
                </h4>

                <p>
                  {selectedComplaint.citizenFeedback}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ==========================================
          PAGINATION
      ========================================== */}

      {filteredComplaints.length > complaintsPerPage && (

        <div className="pagination-wrapper">

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
            Previous
          </button>

          <div className="page-numbers">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>

            ))}

          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
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