import { useMemo, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./DepartmentManagement.css";

function DepartmentManagement() {

  /* ==========================================================
      DUMMY DATA
  ========================================================== */

  const [departments, setDepartments] = useState([
    {
      id: "D001",
      name: "Road Department",
      email: "road@gov.in",
      contact: "9876543210",
      createdOn: "12 Jul 2026",
    },
    {
      id: "D002",
      name: "Water Department",
      email: "water@gov.in",
      contact: "9898989898",
      createdOn: "15 Jul 2026",
    },
    {
      id: "D003",
      name: "Electricity Department",
      email: "electricity@gov.in",
      contact: "9988776655",
      createdOn: "10 Jul 2026",
    },
    {
      id: "D004",
      name: "Drainage Department",
      email: "drainage@gov.in",
      contact: "9090909090",
      createdOn: "08 Jul 2026",
    },
    {
      id: "D005",
      name: "Street Light Department",
      email: "streetlight@gov.in",
      contact: "9812345678",
      createdOn: "18 Jul 2026",
    },
    {
      id: "D006",
      name: "Sanitation Department",
      email: "sanitation@gov.in",
      contact: "9871234560",
      createdOn: "20 Jul 2026",
    },
  ]);

  /* ==========================================================
      STATES
  ========================================================== */

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
  });

  /* ==========================================================
      SEARCH FILTER
  ========================================================== */

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {

      const value = search.toLowerCase();

      return (
        dept.id.toLowerCase().includes(value) ||
        dept.name.toLowerCase().includes(value) ||
        dept.email.toLowerCase().includes(value) ||
        dept.contact.includes(value) ||
        dept.status.toLowerCase().includes(value)
      );

    });
  }, [departments, search]);

  /* ==========================================================
      SUMMARY
  ========================================================== */

  const totalDepartments = departments.length;

  const activeDepartments = departments.filter(
    (dept) => dept.status === "Active"
  ).length;

  const inactiveDepartments = departments.filter(
    (dept) => dept.status === "Inactive"
  ).length;

  const pendingDepartments = departments.filter(
    (dept) => dept.status === "Pending"
  ).length;

  /* ==========================================================
      PAGINATION
  ========================================================== */

  const rowsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    filteredDepartments.length / rowsPerPage
  );

  const indexOfLastRow = currentPage * rowsPerPage;

  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentDepartments = filteredDepartments.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      FORM INPUT
  ========================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  /* ==========================================================
      OPEN ADD MODAL
  ========================================================== */

  const openAddModal = () => {

    setFormData({
      id: `D00${departments.length + 1}`,
      name: "",
      email: "",
      contact: "",
    });

    setShowAddModal(true);

  };

  /* ==========================================================
      OPEN EDIT MODAL
  ========================================================== */

  const openEditModal = (department) => {

    setSelectedDepartment(department);

    setFormData(department);

    setShowEditModal(true);

  };

  /* ==========================================================
      OPEN DELETE MODAL
  ========================================================== */

  const openDeleteModal = (department) => {

    setSelectedDepartment(department);

    setShowDeleteModal(true);

  };
  const addDepartment = (e) => {
    e.preventDefault();

    const newDepartment = {
      ...formData,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setDepartments([...departments, newDepartment]);

    setShowAddModal(false);

    setFormData({
      id: "",
      name: "",
      email: "",
      contact: "",

    });
  };

  /* ==========================================================
      UPDATE DEPARTMENT
  ========================================================== */

  const updateDepartment = (e) => {
    e.preventDefault();

    const updatedDepartments = departments.map((department) =>
      department.id === selectedDepartment.id
        ? {
            ...department,
            ...formData,
          }
        : department
    );

    setDepartments(updatedDepartments);

    setShowEditModal(false);

    setSelectedDepartment(null);
  };

  /* ==========================================================
      DELETE DEPARTMENT
  ========================================================== */

  const deleteDepartment = () => {
    const updatedDepartments = departments.filter(
      (department) => department.id !== selectedDepartment.id
    );

    setDepartments(updatedDepartments);

    setShowDeleteModal(false);

    setSelectedDepartment(null);
  };

  return (
    <div className="user-page">

      <div className="page-header">

        <div>
          <h1>Department Management</h1>
          <p>
            Manage all departments, update department information,
            and monitor their current status.
          </p>
        </div>

       

      </div>

      {/* ==========================================================
            SUMMARY CARDS
      ========================================================== */}

      <div className="user-summary">

        <div className="summary-card">
          <span>Total Departments</span>
          <h3>{totalDepartments}</h3>
        </div>

        <div className="summary-card">
          <span>Active Departments</span>
          <h3>{activeDepartments}</h3>
        </div>

        <div className="summary-card">
          <span>Inactive Departments</span>
          <h3>{inactiveDepartments}</h3>
        </div>

        <div className="summary-card">
          <span>Pending Departments</span>
          <h3>{pendingDepartments}</h3>
        </div>

      </div>

      {/* ==========================================================
            TOOLBAR
      ========================================================== */}

      <div className="toolbar">

  <div className="search-box">
    <FaSearch />

    <input
      type="text"
      placeholder="Search department..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <button
    className="add-btn"
    onClick={openAddModal}
  >
    <FaPlus />
    <span>Add Department</span>
  </button>

</div>

      {/* ==========================================================
            TABLE CARD
      ========================================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>
            <h2>Departments</h2>
            <p>
              Showing all registered departments in the system.
            </p>
          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Department</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Created On</th>
                <th className="text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {currentDepartments.length > 0 ? (

                currentDepartments.map((department) => (

                  <tr key={department.id}>

                    <td>{department.id}</td>

                    <td>{department.name}</td>

                    <td>{department.email}</td>

                    <td>{department.contact}</td>

                    

                    <td>{department.createdOn}</td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            openEditModal(department)
                          }
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            openDeleteModal(department)
                          }
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr className="empty-row">

                  <td colSpan="8">
                    No department found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================================
            PAGINATION
      ========================================================== */}

      <div className="pagination-wrapper">

  <button
    onClick={previousPage}
    disabled={currentPage === 1}
  >
    <FaChevronLeft />
    Previous
  </button>

  <div className="page-numbers">

    {Array.from({ length: totalPages }, (_, index) => (

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
    disabled={
      currentPage === totalPages ||
      totalPages === 0
    }
  >
    Next
    <FaChevronRight />
  </button>

</div>
       
      {/* ==========================================================
            ADD DEPARTMENT MODAL
      ========================================================== */}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h2>Add Department</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={addDepartment}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Department ID</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Department Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Add Department
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==========================================================
            EDIT MODAL
      ========================================================== */}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h2>Edit Department</h2>

              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={updateDepartment}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Department Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact</label>

                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department Head</label>

                  <input
                    type="text"
                    name="head"
                    value={formData.head}
                    onChange={handleChange}
                    required
                  />
                </div>

                

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Update Department
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==========================================================
            DELETE MODAL
      ========================================================== */}

      {showDeleteModal && (
        <div className="modal-overlay">

          <div className="delete-modal">

            <h2>Delete Department</h2>

            <p>
              Are you sure you want to delete
              <strong> {selectedDepartment?.name}</strong> ?
            </p>

            <div className="delete-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={deleteDepartment}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default DepartmentManagement;