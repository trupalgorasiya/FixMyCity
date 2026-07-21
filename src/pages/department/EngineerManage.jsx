import "../engineer/ComplaintsHistory.css";
import "../department/EngineerManage.css"

import { useMemo, useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

function DepartmentManagement() {
  /* ==========================================================
     DUMMY ENGINEER DATA
  ========================================================== */

  const [engineers, setEngineers] = useState([
    {
      id: "ENG-1001",
      firstName: "Amit",
      lastName: "Patel",
      email: "amit@gmail.com",
      mobile: "9876543210",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1002",
      firstName: "Jay",
      lastName: "Mehta",
      email: "jay@gmail.com",
      mobile: "9876543211",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1003",
      firstName: "Priya",
      lastName: "Shah",
      email: "priya@gmail.com",
      mobile: "9876543212",
      department: "Water Department",
      status: "Inactive",
    },

    {
      id: "ENG-1004",
      firstName: "Rakesh",
      lastName: "Patel",
      email: "rakesh@gmail.com",
      mobile: "9876543213",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1005",
      firstName: "Hardik",
      lastName: "Shah",
      email: "hardik@gmail.com",
      mobile: "9876543214",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1006",
      firstName: "Nilesh",
      lastName: "Patel",
      email: "nilesh@gmail.com",
      mobile: "9876543215",
      department: "Water Department",
      status: "Inactive",
    },

    {
      id: "ENG-1007",
      firstName: "Vikas",
      lastName: "Mehta",
      email: "vikas@gmail.com",
      mobile: "9876543216",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1008",
      firstName: "Raj",
      lastName: "Shah",
      email: "raj@gmail.com",
      mobile: "9876543217",
      department: "Water Department",
      status: "Active",
    },

    {
      id: "ENG-1009",
      firstName: "Kunal",
      lastName: "Patel",
      email: "kunal@gmail.com",
      mobile: "9876543218",
      department: "Water Department",
      status: "Inactive",
    },

    {
      id: "ENG-1010",
      firstName: "Sanjay",
      lastName: "Joshi",
      email: "sanjay@gmail.com",
      mobile: "9876543219",
      department: "Water Department",
      status: "Active",
    },
  ]);

  /* ==========================================================
     STATES
  ========================================================== */

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const engineersPerPage = 5;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    department: "Water Department",
    status: "Active",
  });

  /* ==========================================================
     SEARCH
  ========================================================== */

  const filteredEngineers = useMemo(() => {
    return engineers.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.id.toLowerCase().includes(keyword) ||
        item.firstName.toLowerCase().includes(keyword) ||
        item.lastName.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.mobile.includes(keyword)
      );
    });
  }, [engineers,search]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredEngineers.length / engineersPerPage
  );

  const indexOfLastEngineer =
    currentPage * engineersPerPage;

  const indexOfFirstEngineer =
    indexOfLastEngineer - engineersPerPage;

  const currentEngineers =
    filteredEngineers.slice(
      indexOfFirstEngineer,
      indexOfLastEngineer
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
     INPUT CHANGE
  ========================================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleStatus = (id) => {

  const updatedEngineers = engineers.map((engineer) => {

    if (engineer.id === id) {

      return {
        ...engineer,
        status:
          engineer.status === "Active"
            ? "Inactive"
            : "Active",
      };

    }

    return engineer;

  });

  setEngineers(updatedEngineers);

};
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setShowModal(false);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      department: "Water Department",
      status: "Active",
    });
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

          <h1>Engineer Management</h1>

          <p>
            Manage engineers assigned to your department.
            Add new engineers and maintain their records.
          </p>

        </div>

      </div>

      {/* ==========================================================
          TOOLBAR
      ========================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Engineer ID, Name or Email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

        <div className="toolbar-right">

          <button
            className="toolbar-btn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            Add Engineer
          </button>

        </div>

      </div>

      {/* ==========================================================
          ENGINEER TABLE
      ========================================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>Engineer List</h2>

        </div>

        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>Engineer ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Mobile</th>

                <th>Department</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentEngineers.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    No engineer found.
                  </td>

                </tr>

              ) : (

                currentEngineers.map((item) => (

                  <tr key={item.id}>

                    <td className="complaint-id">
                      {item.id}
                    </td>

                    <td>
                      <strong>
                        {item.firstName} {item.lastName}
                      </strong>
                    </td>

                    <td>{item.email}</td>

                    <td>{item.mobile}</td>

                    <td>{item.department}</td>

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
        <button
            onClick={() => toggleStatus(item.id)}
        >
            {item.status === "Active"
                ? "Deactivate"
                : "Activate"}
        </button>
    </td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
            {/* ==========================================================
          ADD ENGINEER MODAL
      ========================================================== */}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="engineer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ======================================================
                MODAL HEADER
            ====================================================== */}

            <div className="modal-header">
              <h2>Add Engineer</h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* ======================================================
                MODAL BODY
            ====================================================== */}

            <form
              className="engineer-form"
              onSubmit={handleSubmit}
            >
              <div className="form-grid">

                {/* First Name */}

                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name */}

                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}

                <div className="form-group">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>

                {/* Department */}

                <div className="form-group">
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    readOnly
                  />
                </div>

                {/* Status */}

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              {/* ======================================================
                  BUTTONS
              ====================================================== */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Add Engineer
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {filteredEngineers.length > engineersPerPage && (

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

export default DepartmentManagement;