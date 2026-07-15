import  { useState } from "react";
import "./MyComplaints.css";

function MyComplaints() {

  const [statusFilter, setStatusFilter] = useState("All");

  const complaints = [
    {
      id: "CMP001",
      category: "Garbage Collection",
      department: "Sanitation",
      date: "15 Jul 2026",
      status: "Pending"
    },
    {
      id: "CMP002",
      category: "Road Damage",
      department: "Road Department",
      date: "13 Jul 2026",
      status: "In Progress"
    },
    {
      id: "CMP003",
      category: "Street Light Issue",
      department: "Electrical",
      date: "10 Jul 2026",
      status: "Resolved"
    },
    {
      id: "CMP004",
      category: "Water Leakage",
      department: "Water Department",
      date: "08 Jul 2026",
      status: "Pending"
    },
    {
      id: "CMP005",
      category: "Drainage Problem",
      department: "Drainage",
      date: "05 Jul 2026",
      status: "Resolved"
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

      <div className="top-bar">

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Complaints</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      <div className="table-container">

        <table className="complaints-table">

          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredComplaints.map((complaint) => (

              <tr key={complaint.id}>

                <td className="complaint-id">
                  {complaint.id}
                </td>

                <td>{complaint.category}</td>

                <td>{complaint.department}</td>

                <td>{complaint.date}</td>

                <td>

                  <span
                    className={`status-badge ${complaint.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyComplaints;