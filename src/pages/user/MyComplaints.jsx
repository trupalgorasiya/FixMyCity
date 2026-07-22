import { useMemo, useState } from "react";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch
} from "react-icons/fa";
import "./MyComplaints.css";
import { useNavigate } from "react-router-dom";

function MyComplaints() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const complaints = [
    {
      id: "CMP001",
      department: "Sanitation",
      date: "15 Jul 2026",
      res_date:"17 Jul 2026",
      status: "Pending"
    },
    {
      id: "CMP002",
      department: "Road Department",
      date: "13 Jul 2026",
      res_date:"17 Jul 2026",
      status: "In Progress"
    },
    {
      id: "CMP003",
      department: "Electrical",
      res_date:"17 Jul 2026",
      date: "10 Jul 2026",
      status: "Resolved"
    },
    {
      id: "CMP004",
      department: "Water Department",
      res_date:"17 Jul 2026",
      date: "08 Jul 2026",
      status: "Pending"
    },
    {
      id: "CMP005",
      department: "Drainage",
      date: "05 Jul 2026",
      status: "Resolved",
      res_date:"17 Jul 2026"
    }
  ];

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {

      const statusMatch =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const searchMatch =
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.department.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;

    });
  }, [complaints, statusFilter, searchTerm]);

  const totalComplaints = complaints.length;

  const pendingComplaints =
    complaints.filter(
      (item) => item.status === "Pending"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (item) => item.status === "Resolved"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (item) => item.status === "In Progress"
    ).length;

  const handleTrack = (id) => {
    navigate(`/user/complaint-tracking/${id}`);
  };

  return (

    <div className="mycomplaints-page">

      <div className="page-header">

        <div>

          <h1>My Complaints</h1>

          <p>
            View, monitor and track every complaint that you have
            submitted. Stay updated with the latest complaint status
            and department progress.
          </p>

        </div>

      </div>

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-content">
            <span className="summary-title">
              Total Complaints
            </span>

            <span className="summary-value">
              {totalComplaints}
            </span>
          </div>

          <div className="summary-icon">
            <FaClipboardList />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-content">

            <span className="summary-title">
              Pending
            </span>

            <span className="summary-value">
              {pendingComplaints}
            </span>

          </div>

          <div className="summary-icon">
            <FaExclamationTriangle />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-content">

            <span className="summary-title">
              In Progress
            </span>

            <span className="summary-value">
              {inProgressComplaints}
            </span>

          </div>

          <div className="summary-icon">
            <FaClock />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-content">

            <span className="summary-title">
              Resolved
            </span>

            <span className="summary-value">
              {resolvedComplaints}
            </span>

          </div>

          <div className="summary-icon">
            <FaCheckCircle />
          </div>

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
            placeholder="Search Complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>

    <div className="toolbar-right">

        <div className="filter-box">

            <FaSearch />

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">All Complaints</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>

        </div>

    </div>

</div>

      {/* TABLE STARTS IN PART 2 */}

      <div className="table-card">

        <div className="table-container">
                    <table className="complaints-table">

            <thead>

              <tr>
                <th>Complaint ID</th>
                <th>Department</th>
                <th>Complaint Date</th>
                <th>Resolve Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredComplaints.length > 0 ? (

                filteredComplaints.map((complaint) => (

                  <tr key={complaint.id}>

                    <td className="complaint-id">
                      {complaint.id}
                    </td>


                    <td>
                      {complaint.department}
                    </td>

                    <td>
                      {complaint.date}
                    </td>
                    <td>
                      {complaint.res_date}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${complaint.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {complaint.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="track-btn"
                        onClick={() =>
                          handleTrack(complaint.id)
                        }
                      >
                        Track
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-data"
                  >

                    <h3>
                      No Complaints Found
                    </h3>

                    <p>
                      No complaints match your current
                      search or filter selection.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        <div className="pagination">

          <span className="pagination-info">
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </span>

          <div className="pagination-buttons">

            <button className="page-btn active">
              1
            </button>

            <button className="page-btn">
              2
            </button>

            <button className="page-btn">
              3
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MyComplaints;