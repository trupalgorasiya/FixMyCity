import  { useState } from "react";
import "./MyComplaints.css";

function MyComplaints() {

  const [statusFilter, setStatusFilter] = useState("All");

  const complaints = [
    {
      id: "CMP001",
      category: "Garbage Collection",
      status: "Pending",
      department: "Sanitation",
      date: "15 Jul 2026",
      location: "Nikol, Ahmedabad"
    },
    {
      id: "CMP002",
      category: "Road Damage",
      status: "In Progress",
      department: "Road Department",
      date: "13 Jul 2026",
      location: "Bopal, Ahmedabad"
    },
    {
      id: "CMP003",
      category: "Street Light Issue",
      status: "Resolved",
      department: "Electrical Department",
      date: "10 Jul 2026",
      location: "Satellite, Ahmedabad"
    }
  ];

  const filteredComplaints =
    statusFilter === "All"
      ? complaints
      : complaints.filter(
          (item) => item.status === statusFilter
        );

  const handleTrack = (id) => {
    alert(`Tracking Complaint: ${id}`);
  };

  return (
    <div className="mycomplaints-page">

      <div className="page-header">
        <h1>My Complaints</h1>
        <p>
          View and track all complaints submitted by you.
        </p>
      </div>

      <div className="filter-section">

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Complaints
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

      </div>

      <div className="complaints-grid">

        {filteredComplaints.map((complaint) => (

          <div
            className="complaint-card"
            key={complaint.id}
          >

            <div className="card-header">

              <h3>{complaint.id}</h3>

              <span
                className={`status-badge ${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </span>

            </div>

            <div className="complaint-info">

              <p>
                <strong>Category:</strong>
                {complaint.category}
              </p>

              <p>
                <strong>Department:</strong>
                {complaint.department}
              </p>

              <p>
                <strong>Date:</strong>
                {complaint.date}
              </p>

              <p>
                <strong>Location:</strong>
                {complaint.location}
              </p>

            </div>

            <button
              className="track-btn"
              onClick={() =>
                handleTrack(complaint.id)
              }
            >
              Track Complaint
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyComplaints;