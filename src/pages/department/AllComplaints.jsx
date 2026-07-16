import  { useState } from "react";
import "./AllComplaints.css";

function AllComplaints() {

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      id: "CMP001",
      citizen: "Jeel Bhalani",
      category: "Garbage Collection",
      location: "Nikol, Ahmedabad",
      date: "15 Jul 2026",
      status: "Pending",
      description:
        "Garbage has not been collected for several days in this area. Residents are facing hygiene issues.",
      engineer: "Not Assigned"
    },
    {
      id: "CMP002",
      citizen: "Rahul Patel",
      category: "Road Damage",
      location: "Bopal, Ahmedabad",
      date: "14 Jul 2026",
      status: "Assigned",
      description:
        "Large potholes on the road causing traffic problems and accidents.",
      engineer: "Amit Sharma"
    },
    {
      id: "CMP003",
      citizen: "Priya Shah",
      category: "Street Light",
      location: "Satellite, Ahmedabad",
      date: "13 Jul 2026",
      status: "Resolved",
      description:
        "Street lights are not working during the night.",
      engineer: "Karan Patel"
    }
  ];

  const filteredComplaints = complaints.filter((item) => {

    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.citizen.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="all-complaints">

      <div className="page-header">
        <h1>All Complaints</h1>
        <p>View and manage all complaints of your department</p>
      </div>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Complaint ID or Citizen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      <div className="table-wrapper">

        <table className="complaints-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredComplaints.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>
                <td>{item.citizen}</td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.date}</td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedComplaint(item)}
                  >
                    View Details
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedComplaint && (

        <div className="modal-overlay">

          <div className="complaint-modal">

            <div className="modal-header">

              <h2>Complaint Details</h2>

              <button
                className="close-icon"
                onClick={() => setSelectedComplaint(null)}
              >
                ✕
              </button>

            </div>

            <div className="modal-content">

              <div className="detail-section">

                <h3>Complaint Information</h3>

                <div className="detail-grid">

                  <div>
                    <label>Complaint ID</label>
                    <p>{selectedComplaint.id}</p>
                  </div>

                  <div>
                    <label>Category</label>
                    <p>{selectedComplaint.category}</p>
                  </div>

                  <div>
                    <label>Status</label>
                    <p>{selectedComplaint.status}</p>
                  </div>

                  <div>
                    <label>Date</label>
                    <p>{selectedComplaint.date}</p>
                  </div>

                </div>

              </div>

              <div className="detail-section">

                <h3>Citizen Information</h3>

                <div className="detail-grid">

                  <div>
                    <label>Citizen Name</label>
                    <p>{selectedComplaint.citizen}</p>
                  </div>

                  <div>
                    <label>Location</label>
                    <p>{selectedComplaint.location}</p>
                  </div>

                  <div>
                    <label>Assigned Engineer</label>
                    <p>{selectedComplaint.engineer}</p>
                  </div>

                </div>

              </div>

              <div className="detail-section">

                <h3>Description</h3>

                <div className="description-box">
                  {selectedComplaint.description}
                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="close-btn"
                onClick={() => setSelectedComplaint(null)}
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

export default AllComplaints;