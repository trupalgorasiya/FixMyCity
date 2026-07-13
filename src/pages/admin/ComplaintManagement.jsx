import { useState } from "react";
import "./ComplaintManagement.css";

function ComplaintManagement() {

  const [search, setSearch] = useState("");

  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      citizen: "Jeel Bhalani",
      category: "Garbage Issue",
      department: "Sanitation",
      engineer: "Rahul Sharma",
      status: "Pending",
      date: "12-Jul-2026"
    },
    {
      id: "CMP002",
      citizen: "Amit Patel",
      category: "Road Damage",
      department: "Road Department",
      engineer: "Karan Patel",
      status: "Assigned",
      date: "10-Jul-2026"
    },
    {
      id: "CMP003",
      citizen: "Priya Shah",
      category: "Water Leakage",
      department: "Water Department",
      engineer: "Rakesh Singh",
      status: "Resolved",
      date: "08-Jul-2026"
    }
  ]);

  const handleStatusChange = (id, status) => {

    setComplaints(
      complaints.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  const filteredComplaints =
    complaints.filter(
      (item) =>
        item.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.citizen
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (c) => c.status === "Pending"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (c) => c.status === "In Progress"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (c) => c.status === "Resolved"
    ).length;

  return (

    <div className="complaint-management">

      <div className="page-header">

        <h1>
          Complaint Management
        </h1>

        <p>
          Manage complaints, departments
          and engineers.
        </p>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{totalComplaints}</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>{pendingComplaints}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>{inProgressComplaints}</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>{resolvedComplaints}</h2>
          <p>Resolved</p>
        </div>

      </div>

      {/* Search */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search Complaint ID or Citizen Name"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Complaint Table */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Department</th>
              <th>Engineer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredComplaints.map(
              (complaint) => (

              <tr
                key={complaint.id}
              >

                <td>
                  {complaint.id}
                </td>

                <td>
                  {complaint.citizen}
                </td>

                <td>
                  {complaint.category}
                </td>

                <td>
                  {complaint.department}
                </td>

                <td>
                  {complaint.engineer}
                </td>

                <td>
                  {complaint.date}
                </td>

                <td>

                  <select
                    value={
                      complaint.status
                    }
                    onChange={(e) =>
                      handleStatusChange(
                        complaint.id,
                        e.target.value
                      )
                    }
                  >

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

                    <option>
                      Rejected
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Recent Complaints */}

      <div className="recent-section">

        <h2>
          Recent Complaints
        </h2>

        <div className="recent-list">

          {complaints.map(
            (complaint) => (

            <div
              key={complaint.id}
              className="recent-card"
            >

              <h4>
                {complaint.id}
              </h4>

              <p>
                {complaint.citizen}
              </p>

              <span>
                {complaint.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ComplaintManagement;