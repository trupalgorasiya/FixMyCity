import  { useState } from "react";
import "./UserManagement.css";

function UserInformation() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: "U001",
      name: "Jeel Bhalani",
      email: "jeel@gmail.com",
      mobile: "9876543210",
      gender: "Male",
      city: "Ahmedabad",
      registered: "10-Jul-2026",
      complaints: 12,
      resolved: 10,
      status: "Active"
    },
    {
      id: "U002",
      name: "Riya Patel",
      email: "riya@gmail.com",
      mobile: "9876543211",
      gender: "Female",
      city: "Surat",
      registered: "12-Jul-2026",
      complaints: 8,
      resolved: 6,
      status: "Active"
    },
    {
      id: "U003",
      name: "Amit Shah",
      email: "amit@gmail.com",
      mobile: "9876543212",
      gender: "Male",
      city: "Rajkot",
      registered: "15-Jul-2026",
      complaints: 5,
      resolved: 4,
      status: "Inactive"
    }
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-page">

      <div className="page-header">
        <h1>Citizen Information</h1>
        <p>View all registered citizens and complaint activity</p>
      </div>

      {/* Stats Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>150</h2>
          <p>Total Citizens</p>
        </div>

        <div className="stat-card">
          <h2>138</h2>
          <p>Active Citizens</p>
        </div>

        <div className="stat-card">
          <h2>520</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>450</h2>
          <p>Resolved Complaints</p>
        </div>

      </div>

      {/* Search */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Citizen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>User ID</th>
              <th>Citizen Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>City</th>
              <th>Registered On</th>
              <th>Total Complaints</th>
              <th>Resolved</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.gender}</td>
                <td>{user.city}</td>
                <td>{user.registered}</td>
                <td>{user.complaints}</td>
                <td>{user.resolved}</td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserInformation;