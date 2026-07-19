import { useMemo, useState } from "react";
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
  const complaintData = [
    {
      id: "CMP-1001",
      username: "Rahul Patel",
      email: "rahul@gmail.com",
      phone: "9876543210",
      category: "Road Damage",
      location: "Satellite, Ahmedabad",
      priority: "High",
      assignedEngineer: "Amit Patel",
      completedDate: "24-03-2026",
      resolutionTime: "3 Days",
      status: "Completed",
      feedback: "Road repaired successfully.",
    },

    {
      id: "CMP-1002",
      username: "Amit Shah",
      email: "amit@gmail.com",
      phone: "9876543211",
      category: "Street Light",
      location: "Maninagar, Ahmedabad",
      priority: "Medium",
      assignedEngineer: "Jay Mehta",
      completedDate: "23-03-2026",
      resolutionTime: "2 Days",
      status: "Completed",
      feedback: "Street lights replaced.",
    },

    {
      id: "CMP-1003",
      username: "Neha Joshi",
      email: "neha@gmail.com",
      phone: "9876543212",
      category: "Garbage Collection",
      location: "Navrangpura, Ahmedabad",
      priority: "Low",
      assignedEngineer: "Priya Shah",
      completedDate: "22-03-2026",
      resolutionTime: "1 Day",
      status: "Completed",
      feedback: "Garbage cleared.",
    },

    {
      id: "CMP-1004",
      username: "Karan Mehta",
      email: "karan@gmail.com",
      phone: "9876543213",
      category: "Water Leakage",
      location: "Bopal, Ahmedabad",
      priority: "High",
      assignedEngineer: "Rakesh Patel",
      completedDate: "26-03-2026",
      resolutionTime: "4 Days",
      status: "Completed",
      feedback: "Leakage repaired.",
    },

    {
      id: "CMP-1005",
      username: "Priya Desai",
      email: "priya@gmail.com",
      phone: "9876543214",
      category: "Drainage Issue",
      location: "Naranpura, Ahmedabad",
      priority: "Medium",
      assignedEngineer: "Hardik Shah",
      completedDate: "25-03-2026",
      resolutionTime: "3 Days",
      status: "Completed",
      feedback: "Drainage cleaned.",
    },
        {
      id: "CMP-1006",
      username: "Jay Patel",
      email: "jay@gmail.com",
      phone: "9876543215",
      category: "Road Cleaning",
      location: "Gota, Ahmedabad",
      priority: "Low",
      assignedEngineer: "Sanjay Patel",
      completedDate: "24-03-2026",
      resolutionTime: "2 Days",
      status: "Completed",
      feedback: "Road cleaned successfully.",
    },

    {
      id: "CMP-1007",
      username: "Riya Shah",
      email: "riya@gmail.com",
      phone: "9876543216",
      category: "Electric Pole",
      location: "Chandkheda, Ahmedabad",
      priority: "High",
      assignedEngineer: "Vikas Mehta",
      completedDate: "27-03-2026",
      resolutionTime: "5 Days",
      status: "Completed",
      feedback: "Electric pole repaired safely.",
    },

    {
      id: "CMP-1008",
      username: "Vivek Patel",
      email: "vivek@gmail.com",
      phone: "9876543217",
      category: "Traffic Signal",
      location: "CG Road, Ahmedabad",
      priority: "Medium",
      assignedEngineer: "Nilesh Patel",
      completedDate: "23-03-2026",
      resolutionTime: "2 Days",
      status: "Completed",
      feedback: "Traffic signal restored.",
    },

    {
      id: "CMP-1009",
      username: "Harsh Mehta",
      email: "harsh@gmail.com",
      phone: "9876543218",
      category: "Tree Cutting",
      location: "Paldi, Ahmedabad",
      priority: "Low",
      assignedEngineer: "Raj Shah",
      completedDate: "22-03-2026",
      resolutionTime: "1 Day",
      status: "Completed",
      feedback: "Dangerous tree removed.",
    },

    {
      id: "CMP-1010",
      username: "Krunal Patel",
      email: "krunal@gmail.com",
      phone: "9876543219",
      category: "Road Damage",
      location: "Vastrapur, Ahmedabad",
      priority: "High",
      assignedEngineer: "Amit Desai",
      completedDate: "28-03-2026",
      resolutionTime: "6 Days",
      status: "Completed",
      feedback: "Road resurfaced successfully.",
    },
  ];

  /* ==========================================================
     STATES
  ========================================================== */

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;
    /* ==========================================================
     SEARCH & FILTER
  ========================================================== */

  const filteredComplaints = useMemo(() => {
    return complaintData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(keyword) ||
        item.username.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      const matchesPriority =
        priorityFilter === "All" ||
        item.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [search, priorityFilter]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredComplaints.length / complaintsPerPage
  );

  const indexOfLastComplaint =
    currentPage * complaintsPerPage;

  const indexOfFirstComplaint =
    indexOfLastComplaint - complaintsPerPage;

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

          <h1>Complaint History</h1>

          <p>
            Browse all completed complaints, resolution history,
            engineer details and complaint records.
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
            placeholder="Search Complaint ID, Citizen or Category..."
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
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

        </div>

      </div>
            {/* ==========================================
          COMPLAINT HISTORY TABLE
      ========================================== */}

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

                <th>Status</th>

                <th>Engineer</th>

                <th>Completed On</th>

             

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

                    <td className="complaint-id">
                      {item.id}
                    </td>

                    <td>
                      <strong>{item.username}</strong>
                      <br />
                      <small>{item.email}</small>
                    </td>

                    <td>
                      {item.category}
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
                      {item.assignedEngineer}
                    </td>

                    <td>

                      <strong>{item.completedDate}</strong>

                      <br />

                      <small>{item.resolutionTime}</small>

                    </td>

                    
                  </tr>

                ))

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
          onClick={() => setSelectedLocation(null)}
        >

          <div
            className="location-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <h2>

                <FaMapMarkerAlt />

                Complaint Details

              </h2>

              <button
                className="close-btn"
                onClick={() => setSelectedLocation(null)}
              >

                <FaTimes />

              </button>

            </div>

            <div className="modal-body">

              <div className="location-info">

                <div className="location-item">
                  <label>Complaint ID</label>
                  <span>{selectedLocation.id}</span>
                </div>

                <div className="location-item">
                  <label>Citizen</label>
                  <span>{selectedLocation.username}</span>
                </div>

                <div className="location-item">
                  <label>Email</label>
                  <span>{selectedLocation.email}</span>
                </div>

                <div className="location-item">
                  <label>Phone</label>
                  <span>{selectedLocation.phone}</span>
                </div>

                <div className="location-item">
                  <label>Category</label>
                  <span>{selectedLocation.category}</span>
                </div>

                <div className="location-item">
                  <label>Priority</label>
                  <span>{selectedLocation.priority}</span>
                </div>

                <div className="location-item">
                  <label>Status</label>
                  <span>{selectedLocation.status}</span>
                </div>

                <div className="location-item">
                  <label>Engineer</label>
                  <span>{selectedLocation.assignedEngineer}</span>
                </div>

                <div className="location-item">
                  <label>Completed On</label>
                  <span>{selectedLocation.completedDate}</span>
                </div>

                <div className="location-item">
                  <label>Resolution Time</label>
                  <span>{selectedLocation.resolutionTime}</span>
                </div>

              </div>

              <div className="address-box">

                <h4>

                  <FaMapMarkerAlt />

                  Address

                </h4>

                <p>{selectedLocation.location}</p>

              </div>

              <div className="address-box">

                <h4>Resolution Summary</h4>

                <p>{selectedLocation.feedback}</p>

              </div>

              <div className="map-placeholder">

                <FaMapMarkerAlt />

                <h3>Location Map</h3>

                <p>
                  Integrate Google Maps or React Leaflet here to
                  display the complaint location.
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

export default ComplaintsHistory;