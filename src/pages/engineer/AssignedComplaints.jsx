import { useMemo, useState } from "react";
import "./AssignedComplaints.css";
import { useNavigate } from "react-router-dom";
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
  const complaintData = [
    {
      id: "CMP-1001",
      username: "Rahul Patel",
      email: "rahul@gmail.com",
      phone: "9876543210",
      priority: "High",
      date: '21-03-2026',
      status: "Assigned",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1002",
      username: "Amit Shah",
      email: "amit@gmail.com",
      phone: "9876543211",
      priority: "Medium",
      date: '21-03-2026',
      status: "In Progress",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1003",
      username: "Neha Joshi",
      email: "neha@gmail.com",
      phone: "9876543212",
      location: "Navrangpura, Ahmedabad",
      priority: "Low",
      date: '21-03-2026',
      status: "Completed",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1004",
      username: "Karan Mehta",
      email: "karan@gmail.com",
      phone: "9876543213",
      location: "Bopal, Ahmedabad",
      priority: "High",
      date: '21-03-2026',
      status: "Assigned",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1005",
      username: "Priya Desai",
      email: "priya@gmail.com",
      phone: "9876543214",
      location: "Naranpura, Ahmedabad",
      priority: "Medium",
      date: '21-03-2026',
      status: "Pending",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1006",
      username: "Jay Patel",
      email: "jay@gmail.com",
      phone: "9876543215",
      location: "Gota, Ahmedabad",
      priority: "Low",
      date: '21-03-2026',
      status: "Assigned",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1007",
      username: "Riya Shah",
      email: "riya@gmail.com",
      phone: "9876543216",
      location: "Chandkheda, Ahmedabad",
      priority: "High",
      date: '21-03-2026',
      status: "Completed",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1008",
      username: "Vivek Patel",
      email: "vivek@gmail.com",
      phone: "9876543217",
      location: "CG Road, Ahmedabad",
      priority: "Medium",
      date: '21-03-2026',
      status: "Assigned",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1009",
      username: "Harsh Mehta",
      email: "harsh@gmail.com",
      phone: "9876543218",
      location: "Paldi, Ahmedabad",
      priority: "Low",
      date: '21-03-2026',
      status: "Pending",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    },
    {
      id: "CMP-1010",
      username: "Krunal Patel",
      email: "krunal@gmail.com",
      phone: "9876543219",
      location: "Vastrapur, Ahmedabad",
      priority: "High",
      date: '21-03-2026',
      status: "Assigned",
      address:"Satellite, Ahmedabad, Gujarat",
      pincode:"380015",
      latitude:"23.0225",
      longitude:"72.5714"
    }
  ];

  // ==========================================
  // States
  // ==========================================

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  // ==========================================
  // Search + Filter
  // ==========================================

  const filteredComplaints = useMemo(() => {

    return complaintData.filter((item) => {

      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());

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

  }, [search, priorityFilter, statusFilter]);

  // ==========================================
  // Pagination
  // ==========================================

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
      setCurrentPage(currentPage + 1);
    }

  };

  const previousPage = () => {

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

  };

  // ==========================================
  // Status Update
  // ==========================================

  const updateStatus = (id, value) => {

    alert(`Complaint ${id} updated to ${value}`);

  };

  // ==========================================
  // JSX Start
  // ==========================================

  return (

    <div className="assigned-page">
            {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="assigned-header">

        <div>

          <h1>Assigned Complaints</h1>

          <p>
            View assigned complaints, update complaint status,
            and access complaint locations.
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
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

        <div className="toolbar-right">

          {/* Priority */}

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

          {/* Status */}

          <div className="filter-box">

            <FaFilter />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >

              <option>All</option>
              <option>Assigned</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Rejected</option>

            </select>

          </div>

        </div>

      </div>

      {/* ==========================================
          COMPLAINT TABLE
      ========================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>
            Assigned Complaint List
          </h2>

        </div>

        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>ID</th>

                <th>Username</th>

                <th>Email</th>

                <th>Number</th>

                {/* <th>Location</th> */}

                <th>Priority</th>
                <th>Date</th>

                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentComplaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    No complaints found.
                  </td>

                </tr>

              ) : (

                currentComplaints.map((item) => (

                  <tr key={item.id}>

                    <td className="complaint-id">

                      {item.id}

                    </td>

                    <td>

                      {item.username}

                    </td>

                    <td>

                      {item.email}

                    </td>

                    <td>

                      {item.phone}

                    </td>

                    {/* <td>

                      <button
                        className="location-btn"
                        onClick={() =>
                          setSelectedLocation(item)
                        }
                      >

                        <FaMapMarkerAlt />

                        View Location

                      </button>

                    </td> */}

                    <td>

                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >

                        {item.priority}
                    
                      </span>
                     

                    </td>
                    <td>
                        {item.date}
                      </td>
                    <td>

                      <select
                        className="status-dropdown"
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(
                            item.id,
                            e.target.value
                          )
                        }
                      >

                        <option>Assigned</option>

                        <option>Pending</option>

                        <option>Accepted</option>

                        <option>In Progress</option>

                        <option>Completed</option>

                        <option>Rejected</option>

                      </select>

                    </td>
                    <td>
                      <button className="work-btn"
                      onClick={()=>
                      navigate(`/engineer/work/${item.id}`,
                        {
                          state:item
                        }
                      )
                      }
                      >
                      Open Work
                      </button>
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

        <div className="modal-overlay">

          <div className="location-modal">

            <div className="modal-header">

              <h2>
                <FaMapMarkerAlt />
                Complaint Location
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

              </div>

              <div className="address-box">

                <h4>

                  <FaMapMarkerAlt />

                  Address

                </h4>

                <p>

                  {selectedLocation.location}

                </p>

              </div>

              {/* Google Map Placeholder */}

              <div className="map-placeholder">

                <FaMapMarkerAlt />

                <h3>Google Map</h3>

                <p>

                  Google Map integration can be added here
                  using Google Maps API or Leaflet.

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

export default AssignedComplaints;