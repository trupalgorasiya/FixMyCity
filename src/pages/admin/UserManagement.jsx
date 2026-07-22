import { useState } from "react";
import "./UserManagement.css";
import {
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaClipboardList,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function UserInformation() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const users = [
    {
      id: "U001",
      name: "Jeel Bhalani",
      email: "jeel@gmail.com",
      mobile: "9876543210",
      city: "Ahmedabad",
      registered: "10-Jul-2026",
      complaints: 12,
      resolved: 10
    },
    {
      id: "U002",
      name: "Riya Patel",
      email: "riya@gmail.com",
      mobile: "9876543211",
      city: "Surat",
      registered: "12-Jul-2026",
      complaints: 8,
      resolved: 6
    },
    {
      id: "U003",
      name: "Amit Shah",
      email: "amit@gmail.com",
      mobile: "9876543212",
      city: "Rajkot",
      registered: "15-Jul-2026",
      complaints: 5,
      resolved: 4
    },
    {
      id: "U004",
      name: "Rahul Patel",
      email: "rahul@gmail.com",
      mobile: "9876543213",
      city: "Vadodara",
      registered: "17-Jul-2026",
      complaints: 18,
      resolved: 15
    },
    {
      id: "U005",
      name: "Krisha Shah",
      email: "krisha@gmail.com",
      mobile: "9876543214",
      city: "Bhavnagar",
      registered: "18-Jul-2026",
      complaints: 3,
      resolved: 2
    },
    {
      id: "U006",
      name: "Mehul Joshi",
      email: "mehul@gmail.com",
      mobile: "9876543215",
      city: "Jamnagar",
      registered: "19-Jul-2026",
      complaints: 7,
      resolved: 6
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.city.toLowerCase().includes(search.toLowerCase())
  );

  const usersPerPage = 5;

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="user-page">

      {/* ===================================================== */}
      {/* PAGE HEADER */}
      {/* ===================================================== */}

      <div className="page-header">
        <div>
          <h1>Citizen Information</h1>
          <p>
            View, search and monitor all registered citizens along with their
            complaint activities.
          </p>
        </div>
      </div>

      {/* ===================================================== */}
      {/* SUMMARY */}
      {/* ===================================================== */}

      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-info">
            <h4>Total Citizens</h4>
            <h2>150</h2>
          </div>

          <div className="summary-icon">
            <FaUsers />
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-info">
            <h4>Active Citizens</h4>
            <h2>138</h2>
          </div>

          <div className="summary-icon">
            <FaUserCheck />
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-info">
            <h4>Total Complaints</h4>
            <h2>520</h2>
          </div>

          <div className="summary-icon">
            <FaClipboardList />
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-info">
            <h4>Resolved Complaints</h4>
            <h2>450</h2>
          </div>

          <div className="summary-icon">
            <FaCheckCircle />
          </div>
        </div>

      </div>

      {/* ===================================================== */}
      {/* SEARCH */}
      {/* ===================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search citizen by name, email or city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

      </div>
            {/* ===================================================== */}
      {/* CITIZEN TABLE */}
      {/* ===================================================== */}

      <div className="dashboard-box">
          
        <div className="card-header">
          <div>
            <h2>Registered Citizens</h2>
            <p>
              Showing {currentUsers.length} of {filteredUsers.length} registered
              citizens.
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table className="dashboard-table">

            <thead>
              <tr>
                <th>User ID</th>
                <th>Citizen Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Registered On</th>
                <th>Total Complaints</th>
                <th>Resolved</th>
              </tr>
            </thead>

            <tbody>

              {currentUsers.length > 0 ? (

                currentUsers.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.mobile}</td>

                    <td>{user.registered}</td>

                    <td>{user.complaints}</td>

                    <td>{user.resolved}</td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="10"
                    className="empty-row"
                  >
                    No citizens found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

       

      </div>
 {/* ===================================================== */}
        {/* PAGINATION */}
        {/* ===================================================== */}

        {filteredUsers.length > usersPerPage && (

          <div className="pagination-wrapper">

            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
              Previous
            </button>

            <div className="page-numbers">

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                >
                  {index + 1}
                </button>

              ))}

            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
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

export default UserInformation;