import { useState } from "react";
import "./EngineerManagement.css";
import {
  FaUserCog,
  FaUserCheck,
  FaBuilding,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
function EngineerManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  const engineersPerPage = 5;

  const [departments, setDepartments] = useState([
    "Road Department",
    "Water Department",
    "Garbage Department",
    "Street Light Department"
  ]);

  const [newDepartment, setNewDepartment] = useState("");

  const [engineers, setEngineers] = useState([
    {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
    {
      id: "ENG002",
      name: "Amit Patel",
      email: "amit@gmail.com",
      mobile: "9876543211",
      department: "Water Department",
      role: "Senior Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
     {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    }
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    department: "Road Department",
    role: "Engineer"
  });


  const handleAddDepartment = () => {
  const dept = newDepartment.trim();

  if (!dept) {
    alert("Please enter a department name.");
    return;
  }

  // Prevent duplicate departments
  if (
    departments.some(
      (item) => item.toLowerCase() === dept.toLowerCase()
    )
  ) {
    alert("Department already exists.");
    return;
  }

  setDepartments((prev) => [...prev, dept]);

  setNewDepartment("");

  alert("Department added successfully!");
};

  // Input Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Open Add Modal

  const openAddModal = () => {

    setIsEditMode(false);

    setFormData({
      id: "",
      name: "",
      email: "",
      mobile: "",
      department: departments[0],
      role: "Engineer"
    });

    setShowModal(true);
  };

  // Open Edit Modal

  const openEditModal = (engineer) => {

    setIsEditMode(true);

    setFormData(engineer);

    setShowModal(true);
  };

  // Save Engineer

  const handleSave = () => {

    if (isEditMode) {

      setEngineers(
        engineers.map((eng) =>
          eng.id === formData.id
            ? {
                ...eng,
                department: formData.department,
                role: formData.role
              }
            : eng
        )
      );

    } else {

      const newEngineer = {
        ...formData,
        id: `ENG${Date.now()}`
      };

      setEngineers([
        ...engineers,
        newEngineer
      ]);
    }

    setShowModal(false);
  };

  // Delete Engineer

  const handleDelete = (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this engineer?"
      )
    ) {

      setEngineers(
        engineers.filter(
          (eng) => eng.id !== id
        )
      );

    }
  };

  const filteredEngineers = engineers.filter((eng) => {
  const value = search.toLowerCase();

  return (
    eng.id.toLowerCase().includes(value) ||
    eng.name.toLowerCase().includes(value) ||
    eng.email.toLowerCase().includes(value) ||
    eng.mobile.includes(value) ||
    eng.department.toLowerCase().includes(value)
  );
});
const totalPages = Math.ceil(
  filteredEngineers.length / engineersPerPage
);

const indexOfLast =
  currentPage * engineersPerPage;

const indexOfFirst =
  indexOfLast - engineersPerPage;

const currentEngineers =
  filteredEngineers.slice(
    indexOfFirst,
    indexOfLast
  );

const paginate = (page) =>
  setCurrentPage(page);

const previousPage = () => {
  if (currentPage > 1)
    setCurrentPage((prev) => prev - 1);
};

const nextPage = () => {
  if (currentPage < totalPages)
    setCurrentPage((prev) => prev + 1);
};

  return (

    <div className="engineer-page">

      {/* Header */}

      <div className="page-header">
        <div>
        <h1>
          Engineer Management
        </h1>
        
        <p>
          Manage engineers, departments and roles
        </p>
    </div>
      </div>

      {/* Stats */}

      <div className="summary-grid">

  <div className="summary-card">
    <div className="summary-info">
      <h4>Total Engineers</h4>
      <h2>{engineers.length}</h2>
    </div>

    <div className="summary-icon">
      <FaUserCog />
    </div>
  </div>

  <div className="summary-card">
    <div className="summary-info">
      <h4>Active Engineers</h4>
      <h2>18</h2>
    </div>

    <div className="summary-icon">
      <FaUserCheck />
    </div>
  </div>

  <div className="summary-card">
    <div className="summary-info">
      <h4>Total Departments</h4>
      <h2>{departments.length}</h2>
    </div>

    <div className="summary-icon">
      <FaBuilding />
    </div>
  </div>

  <div className="summary-card">
    <div className="summary-info">
      <h4>Assigned Complaints</h4>
      <h2>245</h2>
    </div>

    <div className="summary-icon">
      <FaClipboardList />
    </div>
  </div>

</div>

      {/* Top Bar */}

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Engineer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          className="add-btn"
          onClick={openAddModal}
        >
          + Add Engineer
        </button>

      </div>

     

      {/* Table */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

           {currentEngineers.length > 0 ? (

    currentEngineers.map((eng) => (

              <tr key={eng.id}>

                <td>{eng.id}</td>
                <td>{eng.name}</td>
                <td>{eng.email}</td>
                <td>{eng.mobile}</td>
                <td>{eng.department}</td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      openEditModal(eng)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(eng.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
            ) : (

    <tr>
      <td
        colSpan="6"
        className="empty-row"
      >
        No engineers found.
      </td>
    </tr>

  )}

          </tbody>

        </table>
       

      </div>
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
      onClick={nextPage}
      disabled={currentPage === totalPages}
    >
      Next
      <FaChevronRight />
    </button>

  </div>

)}

      {/* Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {isEditMode
                ? "Update Engineer"
                : "Add Engineer"}
            </h2>

            {/* Name */}

            <input
              type="text"
              name="name"
              placeholder="Engineer Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Mobile */}

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Department */}

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >

              {departments.map((dept) => (

                <option
                  key={dept}
                  value={dept}
                >
                  {dept}
                </option>

              ))}

            </select>

            {/* Role */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option>
                Engineer
              </option>

              {/* <option>
                Senior Engineer
              </option>

              <option>
                Team Lead
              </option>

              <option>
                Supervisor
              </option> */}

            </select>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                {isEditMode
                  ? "Update"
                  : "Add Engineer"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default EngineerManagement;