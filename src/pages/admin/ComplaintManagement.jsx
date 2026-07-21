import { useState } from "react";
import "./ComplaintManagement.css";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserCog,
  FaSearch,
  FaFilter
} from "react-icons/fa";

function ComplaintManagement() {

  const [complaints] = useState([

    {
      id: "CMP001",
      citizen: "Rahul Patel",
      title: "Large pothole on main road",
      department: "Road Department",
      priority: "High",
      status: "Pending",
      engineer: "Not Assigned",
      date: "19 Jul 2026"
    },

    {
      id: "CMP002",
      citizen: "Amit Shah",
      title: "Water leakage near society",
      department: "Water Department",
      priority: "Medium",
      status: "Assigned",
      engineer: "Rahul Sharma",
      date: "18 Jul 2026"
    },

    {
      id: "CMP003",
      citizen: "Neha Patel",
      title: "Street light not working",
      department: "Street Light Department",
      priority: "Low",
      status: "Resolved",
      engineer: "Amit Patel",
      date: "17 Jul 2026"
    }

  ]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredComplaints = complaints.filter((item) => {

    const matchSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.citizen.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase());

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

  return (

    <div className="complaint-page">

      {/* ============================
            PAGE HEADER
      ============================ */}

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

      {/* ============================
            SUMMARY CARDS
      ============================ */}

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-info">

            <h4>Total Complaints</h4>

            <h2>248</h2>

          </div>

          <div className="summary-icon">

            <FaClipboardList />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Pending</h4>

            <h2>38</h2>

          </div>

          <div className="summary-icon">

            <FaClock />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Assigned</h4>

            <h2>54</h2>

          </div>

          <div className="summary-icon">

            <FaUserCog />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>In Progress</h4>

            <h2>42</h2>

          </div>

          <div className="summary-icon">

            <FaSpinner />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Resolved</h4>

            <h2>101</h2>

          </div>

          <div className="summary-icon">

            <FaCheckCircle />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Rejected</h4>

            <h2>7</h2>

          </div>

          <div className="summary-icon">

            <FaExclamationTriangle />

          </div>

        </div>

      </div>

      {/* ============================
            FILTER TOOLBAR
      ============================ */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search complaint..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        >

          <option>All</option>
          <option>Road Department</option>
          <option>Water Department</option>
          <option>Garbage Department</option>
          <option>Street Light Department</option>

        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option>All</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>

        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >

          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>

        </select>

        <button className="filter-btn">

          <FaFilter />

          Filter

        </button>

      </div>
            {/* ==========================================
                 COMPLAINT TABLE
      ========================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>

            <h2>
              Complaint List
            </h2>

            <p>
              Monitor and manage all registered complaints.
            </p>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Citizen</th>
                <th>Complaint</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Engineer</th>
                <th>Date</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredComplaints.length > 0 ? (

                filteredComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.id}
                    </td>

                    <td>
                      {item.citizen}
                    </td>

                    <td>
                      {item.title}
                    </td>

                    <td>
                      {item.department}
                    </td>

                    <td>

                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`status ${item.status
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {item.engineer}

                    </td>

                    <td>

                      {item.date}

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="view-btn"
                          onClick={() => {

                            setSelectedComplaint(item);

                            setShowViewModal(true);

                          }}
                        >
                          View
                        </button>

                        <button
                          className="assign-btn"
                          onClick={() => {

                            setSelectedComplaint(item);

                            setShowAssignModal(true);

                          }}
                        >
                          Assign
                        </button>

                        <button
                          className="edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr className="empty-row">

                  <td
                    colSpan="9"
                  >

                    No complaints found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

       {/* ==========================================
                    PAGINATION
      ========================================== */}

      <div className="pagination-wrapper">

        <div className="pagination-info">

          Showing

          <strong>

            {" "}
            {filteredComplaints.length}

          </strong>

          {" "}complaints

        </div>

        <div className="pagination">

          <button>

            Previous

          </button>

          <button className="active">

            1

          </button>

          <button>

            2

          </button>

          <button>

            3

          </button>

          <button>

            Next

          </button>

        </div>

      </div>
      </div>

     
            {/* ==========================================
              VIEW COMPLAINT MODAL
      ========================================== */}

      {showViewModal && selectedComplaint && (

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


            {/* Complaint Information */}

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
                    {selectedComplaint.id}
                  </p>
                </div>


                <div>
                  <label>
                    Date
                  </label>

                  <p>
                    {selectedComplaint.date}
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
                      className={`priority ${selectedComplaint.priority.toLowerCase()}`}
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
                      className={`status ${selectedComplaint.status
                        .toLowerCase()
                        .replace(/\s/g,"-")}`}
                    >

                      {selectedComplaint.status}

                    </span>

                  </p>

                </div>


              </div>


            </div>



            {/* Citizen Information */}


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
                    {selectedComplaint.citizen}
                  </p>

                </div>


                <div>

                  <label>
                    Mobile
                  </label>

                  <p>
                    9876543210
                  </p>

                </div>


                <div>

                  <label>
                    Email
                  </label>

                  <p>
                    citizen@gmail.com
                  </p>

                </div>


                <div>

                  <label>
                    Location
                  </label>

                  <p>
                    Ahmedabad, Gujarat
                  </p>

                </div>


              </div>


            </div>



            {/* Engineer Information */}


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
                    {selectedComplaint.engineer}
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




            {/* Timeline */}


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
                      Citizen submitted complaint
                    </p>

                  </div>

                </div>



                <div className="timeline-item">

                  <span></span>

                  <div>

                    <h4>
                      Verification Pending
                    </h4>

                    <p>
                      Admin review required
                    </p>

                  </div>

                </div>



                <div className="timeline-item">

                  <span></span>

                  <div>

                    <h4>
                      Engineer Assignment
                    </h4>

                    <p>
                      Waiting for engineer allocation
                    </p>

                  </div>

                </div>


              </div>


            </div>



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






      {/* ==========================================
              ASSIGN ENGINEER MODAL
      ========================================== */}


      {showAssignModal && selectedComplaint && (


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
                  value={selectedComplaint.id}
                  disabled
                />


              </div>



              <div className="form-group">


                <label>
                  Department
                </label>


                <select>


                  <option>
                    Road Department
                  </option>


                  <option>
                    Water Department
                  </option>


                  <option>
                    Garbage Department
                  </option>


                  <option>
                    Street Light Department
                  </option>


                </select>


              </div>




              <div className="form-group">


                <label>
                  Select Engineer
                </label>


                <select>


                  <option>
                    Rahul Sharma
                  </option>


                  <option>
                    Amit Patel
                  </option>


                  <option>
                    Raj Mehta
                  </option>


                </select>


              </div>





              <div className="form-group">


                <label>
                  Priority
                </label>


                <select>


                  <option>
                    High
                  </option>


                  <option>
                    Medium
                  </option>


                  <option>
                    Low
                  </option>


                </select>


              </div>





              <div className="form-group">


                <label>
                  Due Date
                </label>


                <input
                  type="date"
                />


              </div>



              <div className="form-group">


                <label>
                  Remarks
                </label>


                <input
                  type="text"
                  placeholder="Add assignment note"
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

                Cancel

              </button>



              <button
                className="save-btn"
              >

                Assign Engineer

              </button>



            </div>



          </div>


        </div>


      )}
      
      {/* ==========================================
              DELETE CONFIRMATION MODAL
      ========================================== */}


      {false && (

        <div className="modal-overlay">


          <div className="delete-modal">


            <h2>
              Delete Complaint?
            </h2>


            <p>

              Are you sure you want to delete this complaint?
              This action cannot be undone.

            </p>



            <div className="delete-actions">


              <button
                className="cancel-btn"
              >

                Cancel

              </button>



              <button
                className="delete-confirm-btn"
              >

                Delete

              </button>


            </div>



          </div>


        </div>

      )}






      {/* ==========================================
              EDIT COMPLAINT MODAL
      ========================================== */}


      {false && (

        <div className="modal-overlay">


          <div className="modal">


            <div className="modal-header">


              <h2>
                Update Complaint
              </h2>



              <button
                className="close-btn"
              >

                ×

              </button>



            </div>




            <div className="form-grid">



              <div className="form-group">


                <label>
                  Complaint Title
                </label>


                <input
                  type="text"
                  placeholder="Complaint title"
                />


              </div>




              <div className="form-group">


                <label>
                  Department
                </label>


                <select>


                  <option>
                    Road Department
                  </option>


                  <option>
                    Water Department
                  </option>


                  <option>
                    Garbage Department
                  </option>


                </select>


              </div>





              <div className="form-group">


                <label>
                  Priority
                </label>


                <select>


                  <option>
                    High
                  </option>


                  <option>
                    Medium
                  </option>


                  <option>
                    Low
                  </option>


                </select>


              </div>





              <div className="form-group">


                <label>
                  Status
                </label>


                <select>


                  <option>
                    Pending
                  </option>


                  <option>
                    Assigned
                  </option>


                  <option>
                    In Progress
                  </option>


                  <option>
                    Resolved
                  </option>


                </select>


              </div>



            </div>





            <div className="modal-footer">


              <button
                className="cancel-btn"
              >

                Cancel

              </button>



              <button
                className="save-btn"
              >

                Update

              </button>



            </div>




          </div>


        </div>

      )}



    </div>

  );

}


export default ComplaintManagement;