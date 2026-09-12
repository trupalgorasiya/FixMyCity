import { useEffect, useMemo, useState } from "react";
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
     API
  ========================================================== */

  const API_URL = "http://localhost:8085";

  /* ==========================================================
     GET JWT
  ========================================================== */

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    );
  };

  /* ==========================================================
     STATES
  ========================================================== */

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  /* ==========================================================
     ADD FORM
  ========================================================== */

  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    contact: "",
    description: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  /* ==========================================================
     EDIT FORM
  ========================================================== */

  const [editFormData, setEditFormData] = useState({
    name: "",
    contact: "",
    description: "",
    address: "",
    profileImage: null,
  });

  /* ==========================================================
     GET ALL DEPARTMENTS
  ========================================================== */

  const fetchDepartments = async () => {

    try {

      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "JWT token not found. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/departments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        data = {};
      }

      if (!response.ok) {

        console.error(
          "Department API Error:",
          response.status,
          data
        );

        throw new Error(
          data.message ||
          `Failed to load departments: ${response.status}`
        );
      }

      console.log(
        "Department Response:",
        data
      );

      setDepartments(
        Array.isArray(data.content)
          ? data.content
          : []
      );

    } catch (error) {

      console.error(
        "Error loading departments:",
        error
      );

      setDepartments([]);

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };

  /* ==========================================================
     LOAD DEPARTMENTS
  ========================================================== */

  useEffect(() => {

    fetchDepartments();

  }, []);

  /* ==========================================================
     SEARCH
  ========================================================== */

  const filteredDepartments = useMemo(() => {

    const keyword = search
      .toLowerCase()
      .trim();

    if (!keyword) {
      return departments;
    }

    return departments.filter(
      (department) => {

        const departmentId =
          String(
            department.departmentId ?? ""
          ).toLowerCase();

        const name =
          String(
            department.name ?? ""
          ).toLowerCase();

        const email =
          String(
            department.email ?? ""
          ).toLowerCase();

        const contact =
          String(
            department.contact ?? ""
          ).toLowerCase();

        const description =
          String(
            department.description ?? ""
          ).toLowerCase();

        return (
          departmentId.includes(keyword) ||
          name.includes(keyword) ||
          email.includes(keyword) ||
          contact.includes(keyword) ||
          description.includes(keyword)
        );

      }
    );

  }, [departments, search]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredDepartments.length /
    rowsPerPage
  );

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentDepartments =
    filteredDepartments.slice(
      indexOfFirstRow,
      indexOfLastRow
    );

  const paginate = (pageNumber) => {

    if (
      pageNumber < 1 ||
      pageNumber > totalPages
    ) {
      return;
    }

    setCurrentPage(pageNumber);

  };

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };

  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };

  /* ==========================================================
     SUMMARY
  ========================================================== */

  const totalDepartments =
    departments.length;

  const activeDepartments =
    departments.filter(
      (department) =>
        department.isActive === true
    ).length;

  const inactiveDepartments =
    departments.filter(
      (department) =>
        department.isActive === false
    ).length;

  /* ==========================================================
     OPEN ADD MODAL
  ========================================================== */

  const openAddModal = () => {

    setAddFormData({
      name: "",
      email: "",
      contact: "",
      description: "",
      address: "",
      password: "",
      confirmPassword: "",
    });

    setShowAddModal(true);

  };

  /* ==========================================================
     ADD FORM CHANGE
  ========================================================== */

  const handleAddChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setAddFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

  };

  /* ==========================================================
     ADD DEPARTMENT
  ========================================================== */

  const addDepartment = async (e) => {

    e.preventDefault();

    try {

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "JWT token not found. Please login again."
        );
      }

      if (
        addFormData.password !==
        addFormData.confirmPassword
      ) {

        alert(
          "Password and Confirm Password do not match."
        );

        return;

      }

      const response = await fetch(
        `${API_URL}/api/departments`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name:
              addFormData.name,

            email:
              addFormData.email,

            contact:
              addFormData.contact,

            description:
              addFormData.description,

            address:
              addFormData.address,

            password:
              addFormData.password,

            confirmPassword:
              addFormData.confirmPassword,

          }),

        }
      );

      const responseText =
        await response.text();

      let data = {};

      try {

        data = responseText
          ? JSON.parse(responseText)
          : {};

      } catch {

        data = {};

      }

      if (!response.ok) {

        console.error(
          "Add Department Error:",
          response.status,
          data
        );

        throw new Error(
          data.message ||
          `Failed to add department: ${response.status}`
        );

      }

      console.log(
        "Department Added:",
        data
      );

      alert(
        data.message ||
        "Department added successfully."
      );

      setShowAddModal(false);

      setAddFormData({
        name: "",
        email: "",
        contact: "",
        description: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      await fetchDepartments();

    } catch (error) {

      console.error(
        "Error adding department:",
        error
      );

      alert(
        error.message ||
        "Failed to add department."
      );

    }

  };

  /* ==========================================================
     OPEN EDIT MODAL
  ========================================================== */

  const openEditModal = (department) => {
console.log("EDIT DEPARTMENT:", department);
  console.log("EDIT ADDRESS:", department.address);
    setSelectedDepartment(
      department
    );

    setEditFormData({

      name:
        department.name || "",

      contact:
        department.contact || "",

      description:
        department.description || "",

      address:
        department.address || "",

      profileImage:
        null,

    });

    setShowEditModal(true);

  };

  /* ==========================================================
     EDIT FORM CHANGE
  ========================================================== */

  const handleEditChange = (e) => {

    const {
      name,
      value,
      type,
      files,
    } = e.target;

    setEditFormData(
      (prev) => ({
        ...prev,

        [name]:
          type === "file"
            ? files[0]
            : value,
      })
    );

  };

  /* ==========================================================
     UPDATE DEPARTMENT
     
     NEW API:
     PUT /api/departments/update/{departmentId}
  ========================================================== */

  const updateDepartment = async (e) => {

    e.preventDefault();

    try {

      setError("");

      const token = getToken();

      if (!token) {

        throw new Error(
          "JWT token not found. Please login again."
        );

      }

      if (
        !selectedDepartment ||
        !selectedDepartment.departmentId
      ) {

        throw new Error(
          "Department ID not found."
        );

      }

      const departmentId =
        selectedDepartment.departmentId;

      console.log(
        "Updating Department ID:",
        departmentId
      );

      console.log(
        "Update Data:",
        editFormData
      );

      const response = await fetch(
        `${API_URL}/api/departments/update/${departmentId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name:
              editFormData.name,

            contact:
              editFormData.contact,

            description:
              editFormData.description,

            address:
              editFormData.address,

            profileImage:
              null,

          }),

        }
      );

      const responseText =
        await response.text();

      console.log(
        "Update Department Status:",
        response.status
      );

      console.log(
        "Update Department Response:",
        responseText
      );

      let data = {};

      try {

        data = responseText
          ? JSON.parse(responseText)
          : {};

      } catch {

        data = {};

      }

      if (!response.ok) {

        console.error(
          "Update Department Error:",
          response.status,
          data
        );

        throw new Error(
          data.message ||
          `Failed to update department: ${response.status}`
        );

      }

      console.log(
        "Department Updated Successfully:",
        data
      );

      alert(
        data.message ||
        "Department updated successfully."
      );

      setShowEditModal(false);

      setSelectedDepartment(null);

      setEditFormData({
        name: "",
        contact: "",
        description: "",
        address: "",
        profileImage: null,
      });

      await fetchDepartments();

    } catch (error) {

      console.error(
        "Error updating department:",
        error
      );

      alert(
        error.message ||
        "Failed to update department."
      );

    }

  };

  /* ==========================================================
     OPEN DELETE MODAL
  ========================================================== */

  const openDeleteModal = (
    department
  ) => {

    setSelectedDepartment(
      department
    );

    setShowDeleteModal(true);

  };

  /* ==========================================================
     DELETE DEPARTMENT
  ========================================================== */

  const deleteDepartment = async () => {

    if (!selectedDepartment) {
      return;
    }

    try {

      setError("");

      const token = getToken();

      if (!token) {

        throw new Error(
          "JWT token not found. Please login again."
        );

      }

      const departmentId =
        selectedDepartment.departmentId;

      const response = await fetch(
        `${API_URL}/api/departments/${departmentId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }
      );

      const responseText =
        await response.text();

      let data = {};

      try {

        data = responseText
          ? JSON.parse(responseText)
          : {};

      } catch {

        data = {};

      }

      if (!response.ok) {

        console.error(
          "Delete Department Error:",
          response.status,
          data
        );

        throw new Error(
          data.message ||
          `Failed to delete department: ${response.status}`
        );

      }

      console.log(
        "Department Deleted:",
        data
      );

      alert(
        data.message ||
        "Department deleted successfully."
      );

      setShowDeleteModal(false);

      setSelectedDepartment(null);

      await fetchDepartments();

    } catch (error) {

      console.error(
        "Error deleting department:",
        error
      );

      alert(
        error.message ||
        "Failed to delete department."
      );

    }

  };

  /* ==========================================================
     FORMAT DATE
  ========================================================== */

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };

  /* ==========================================================
     JSX
  ========================================================== */

  return (

    <div className="user-page">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-header">

        <div>

          <h1>
            Department Management
          </h1>

          <p>
            Manage all departments and
            update department information.
          </p>

        </div>

      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="user-summary">

        <div className="summary-card">

          <span>
            Total Departments
          </span>

          <h3>
            {totalDepartments}
          </h3>

        </div>

        <div className="summary-card">

          <span>
            Active Departments
          </span>

          <h3>
            {activeDepartments}
          </h3>

        </div>

        <div className="summary-card">

          <span>
            Inactive Departments
          </span>

          <h3>
            {inactiveDepartments}
          </h3>

        </div>

        <div className="summary-card">

          <span>
            Registered Departments
          </span>

          <h3>
            {departments.length}
          </h3>

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (

        <div
          style={{
            padding: "12px",
            marginBottom: "15px",
            background: "#ffe5e5",
            color: "#c62828",
            borderRadius: "6px",
          }}
        >

          {error}

        </div>

      )}

      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search department..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />

        </div>

        <button
          className="add-btn"
          onClick={openAddModal}
        >

          <FaPlus />

          <span>
            Add Department
          </span>

        </button>

      </div>

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>

            <h2>
              Departments
            </h2>

            <p>
              Showing{" "}
              {currentDepartments.length}{" "}
              of{" "}
              {filteredDepartments.length}{" "}
              departments.
            </p>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  No.
                </th>

                <th>
                  Department
                </th>

                <th>
                  Email
                </th>

                <th>
                  Contact
                </th>

                <th>
                  Created On
                </th>

                <th className="text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >
                    Loading departments...
                  </td>

                </tr>

              ) : currentDepartments.length > 0 ? (

                currentDepartments.map(
                  (department, index) => (

                    <tr
                      key={
                        department.departmentId
                      }
                    >

                      <td>
                        
                          {indexOfFirstRow + index + 1}
                        
                      </td>

                      <td>

                        <strong>
                          {department.name}
                        </strong>

                      </td>

                      <td>
                        {
                          department.email ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          department.contact ||
                          "-"
                        }
                      </td>

                      <td>
                        {formatDate(
                          department.createdAt
                        )}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              openEditModal(
                                department
                              )
                            }
                          >

                            <FaEdit />

                            Edit

                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              openDeleteModal(
                                department
                              )
                            }
                          >

                            <FaTrash />

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >

                    No department found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 0 && (

        <div className="pagination-wrapper">

          <button
            onClick={previousPage}
            disabled={
              currentPage === 1
            }
          >

            <FaChevronLeft />

            Previous

          </button>

          <div className="page-numbers">

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    paginate(
                      index + 1
                    )
                  }
                  className={
                    currentPage ===
                    index + 1
                      ? "active-page"
                      : ""
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>

          <button
            onClick={nextPage}
            disabled={
              currentPage ===
                totalPages ||
              totalPages === 0
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      )}

      {/* ======================================================
          ADD DEPARTMENT MODAL
      ====================================================== */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Add Department
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={addDepartment}
            >

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Department Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      addFormData.name
                    }
                    onChange={
                      handleAddChange
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      addFormData.email
                    }
                    onChange={
                      handleAddChange
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Contact
                  </label>

                  <input
                    type="text"
                    name="contact"
                    value={
                      addFormData.contact
                    }
                    onChange={
                      handleAddChange
                    }
                    maxLength="10"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={
                      addFormData.address
                    }
                    onChange={
                      handleAddChange
                    }
                    placeholder="Ahmedabad"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      addFormData.description
                    }
                    onChange={
                      handleAddChange
                    }
                    rows="3"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={
                      addFormData.password
                    }
                    onChange={
                      handleAddChange
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      addFormData.confirmPassword
                    }
                    onChange={
                      handleAddChange
                    }
                    required
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowAddModal(false)
                  }
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

      {/* ======================================================
          EDIT DEPARTMENT MODAL
      ====================================================== */}

      {showEditModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowEditModal(false)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Edit Department
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                updateDepartment
              }
            >

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Department Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      editFormData.name
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Contact
                  </label>

                  <input
                    type="text"
                    name="contact"
                    value={
                      editFormData.contact
                    }
                    onChange={
                      handleEditChange
                    }
                    maxLength="10"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={
                      editFormData.address
                    }
                    onChange={
                      handleEditChange
                    }
                    
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      editFormData.description
                    }
                    onChange={
                      handleEditChange
                    }
                    rows="4"
                  />

                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowEditModal(false)
                  }
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

      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      {showDeleteModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowDeleteModal(false)
          }
        >

          <div
            className="delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h2>
              Delete Department
            </h2>

            <p>

              Are you sure you want to
              delete

              <strong>
                {" "}
                {selectedDepartment?.name}
              </strong>

              ?

            </p>

            <div className="delete-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={
                  deleteDepartment
                }
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