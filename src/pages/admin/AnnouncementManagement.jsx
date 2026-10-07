import { useEffect, useMemo, useState } from "react";
import {
  FaBullhorn,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaTools,
  FaInfoCircle,
  FaCalendarAlt,
  FaToggleOn,
  FaToggleOff,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaBell
} from "react-icons/fa";
import { API_BASE_URL } from "../../api/axios";
import "./AnnouncementManagement.css";

function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const initialForm = {
    title: "",
    message: "",
    type: "NOTICE",
    priority: "MEDIUM",
    isActive: true,
    startDate: "",
    endDate: ""
  };
  const [formData, setFormData] = useState(initialForm);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("jwt") ||
      ""
    );
  };

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /* ==========================================================
     LOAD ANNOUNCEMENTS
  ========================================================== */
  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/admin/announcements`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load announcements: ${response.status}`);
      }

      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading announcements:", err);
      showToast("Unable to load announcements. Please check backend connection.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  /* ==========================================================
     FILTER & SEARCH
  ========================================================== */
  const filteredList = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return announcements.filter((item) => {
      const matchSearch =
        !keyword ||
        (item.title && item.title.toLowerCase().includes(keyword)) ||
        (item.message && item.message.toLowerCase().includes(keyword)) ||
        (item.createdBy && item.createdBy.toLowerCase().includes(keyword));

      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && item.isActive === true) ||
        (statusFilter === "Inactive" && item.isActive === false);

      const matchType =
        typeFilter === "All" ||
        (item.type && item.type.toUpperCase() === typeFilter.toUpperCase());

      const matchPriority =
        priorityFilter === "All" ||
        (item.priority && item.priority.toUpperCase() === priorityFilter.toUpperCase());

      return matchSearch && matchStatus && matchType && matchPriority;
    });
  }, [announcements, search, statusFilter, typeFilter, priorityFilter]);

  /* ==========================================================
     PAGINATION
  ========================================================== */
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentList = filteredList.slice(indexOfFirst, indexOfLast);

  /* ==========================================================
     OPEN CREATE / EDIT MODAL
  ========================================================== */
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      message: item.message || "",
      type: item.type || "NOTICE",
      priority: item.priority || "MEDIUM",
      isActive: item.isActive !== false,
      startDate: item.startDate ? item.startDate.substring(0, 16) : "",
      endDate: item.endDate ? item.endDate.substring(0, 16) : ""
    });
    setShowModal(true);
  };

  /* ==========================================================
     SAVE (CREATE / UPDATE)
  ========================================================== */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.message.trim()) {
      showToast("Please provide both Title and Message content.", true);
      return;
    }

    try {
      setSaving(true);
      const token = getToken();

      const payload = {
        title: formData.title.trim(),
        message: formData.message.trim(),
        type: formData.type.toUpperCase(),
        priority: formData.priority.toUpperCase(),
        isActive: Boolean(formData.isActive),
        startDate: formData.startDate ? formData.startDate : null,
        endDate: formData.endDate ? formData.endDate : null
      };

      const url = editingItem
        ? `${API_BASE_URL}/admin/announcements/${editingItem.announcementId}`
        : `${API_BASE_URL}/admin/announcements`;

      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save announcement.");
      }

      showToast(
        editingItem
          ? "Announcement updated successfully!"
          : "New announcement published successfully!"
      );

      setShowModal(false);
      setEditingItem(null);
      await loadAnnouncements();
    } catch (err) {
      console.error("Save Announcement Error:", err);
      showToast(err.message || "Failed to save announcement.", true);
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================================
     TOGGLE ACTIVE STATUS
  ========================================================== */
  const handleToggleStatus = async (item) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${API_BASE_URL}/admin/announcements/${item.announcementId}/toggle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update announcement status.");
      }

      const updated = await response.json();
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.announcementId === item.announcementId
            ? { ...a, isActive: updated.isActive }
            : a
        )
      );

      showToast(
        `Announcement marked as ${updated.isActive ? "Active" : "Inactive"}.`
      );
    } catch (err) {
      console.error("Toggle Status Error:", err);
      showToast("Unable to toggle status.", true);
    }
  };

  /* ==========================================================
     DELETE
  ========================================================== */
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      const token = getToken();
      const response = await fetch(
        `${API_BASE_URL}/admin/announcements/${deleteTarget.announcementId}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete announcement.");
      }

      setAnnouncements((prev) =>
        prev.filter((a) => a.announcementId !== deleteTarget.announcementId)
      );
      showToast("Announcement deleted successfully.");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete Error:", err);
      showToast("Unable to delete announcement.", true);
    }
  };

  /* ==========================================================
     STATISTICS
  ========================================================== */
  const stats = useMemo(() => {
    const total = announcements.length;
    const active = announcements.filter((a) => a.isActive).length;
    const alerts = announcements.filter(
      (a) => a.type === "ALERT" || a.priority === "HIGH"
    ).length;
    const maintenance = announcements.filter(
      (a) => a.type === "MAINTENANCE"
    ).length;
    return { total, active, alerts, maintenance };
  }, [announcements]);

  const getTypeIcon = (type) => {
    switch ((type || "").toUpperCase()) {
      case "ALERT":
        return <FaExclamationTriangle className="type-icon alert" />;
      case "MAINTENANCE":
        return <FaTools className="type-icon maintenance" />;
      case "EVENT":
        return <FaCalendarAlt className="type-icon event" />;
      case "UPDATE":
        return <FaBell className="type-icon update" />;
      default:
        return <FaInfoCircle className="type-icon notice" />;
    }
  };

  return (
    <div className="announcement-page">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          className={`announcement-toast ${
            toastMessage.isError ? "error" : "success"
          }`}
        >
          {toastMessage.isError ? <FaTimesCircle /> : <FaCheckCircle />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="announcement-header">
        <div className="header-left">
          <div className="title-icon-wrap">
            <FaBullhorn />
          </div>
          <div>
            <h1>Announcement Management</h1>
            <p>
              Create, update, publish and manage civic alerts and public
              announcements displayed on the home page.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="create-announcement-btn"
          onClick={handleOpenCreate}
        >
          <FaPlus />
          <span>New Announcement</span>
        </button>
      </div>

      {/* SUMMARY METRICS */}
      <div className="announcement-stats-grid">
        <div className="ann-stat-card">
          <div className="stat-content">
            <span className="stat-label">Total Announcements</span>
            <h2>{stats.total}</h2>
          </div>
          <div className="stat-icon-badge total">
            <FaBullhorn />
          </div>
        </div>

        <div className="ann-stat-card">
          <div className="stat-content">
            <span className="stat-label">Active on Home Page</span>
            <h2>{stats.active}</h2>
          </div>
          <div className="stat-icon-badge active">
            <FaCheckCircle />
          </div>
        </div>

        <div className="ann-stat-card">
          <div className="stat-content">
            <span className="stat-label">High Priority / Alerts</span>
            <h2>{stats.alerts}</h2>
          </div>
          <div className="stat-icon-badge alert">
            <FaExclamationTriangle />
          </div>
        </div>

        <div className="ann-stat-card">
          <div className="stat-content">
            <span className="stat-label">Scheduled Maintenance</span>
            <h2>{stats.maintenance}</h2>
          </div>
          <div className="stat-icon-badge maintenance">
            <FaTools />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="announcement-toolbar">
        <div className="announcement-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by title, message or creator..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="toolbar-filters">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            <option value="NOTICE">Notice</option>
            <option value="ALERT">Alert</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="UPDATE">Update</option>
            <option value="EVENT">Event</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="announcement-table-card">
        <div className="table-header-info">
          <h3>Published Announcements ({filteredList.length})</h3>
          <p>
            Showing {currentList.length} of {filteredList.length} items
          </p>
        </div>

        <div className="table-wrapper">
          <table className="announcement-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title & Message</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="empty-table-state">
                    <div className="loading-spinner"></div>
                    <p>Loading announcements...</p>
                  </td>
                </tr>
              ) : currentList.length > 0 ? (
                currentList.map((item, idx) => (
                  <tr key={item.announcementId}>
                    <td>
                      <span className="row-id">
                        #{indexOfFirst + idx + 1}
                      </span>
                    </td>
                    <td>
                      <div className="ann-title-cell">
                        <strong>{item.title}</strong>
                        <p>{item.message}</p>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`type-tag ${(item.type || "NOTICE").toLowerCase()}`}
                      >
                        {getTypeIcon(item.type)}
                        <span>{item.type || "NOTICE"}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`priority-tag ${(item.priority || "MEDIUM").toLowerCase()}`}
                      >
                        {item.priority || "MEDIUM"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`status-toggle-btn ${
                          item.isActive ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(item)}
                        title="Click to toggle status"
                      >
                        {item.isActive ? (
                          <>
                            <FaToggleOn className="toggle-icon on" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="toggle-icon off" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <div className="date-cell">
                        <span>
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                              })
                            : "-"}
                        </span>
                        <small>{item.createdBy || "Admin"}</small>
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          type="button"
                          className="action-edit-btn"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Announcement"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="action-delete-btn"
                          onClick={() => setDeleteTarget(item)}
                          title="Delete Announcement"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-table-state">
                    <FaBullhorn className="empty-icon" />
                    <h4>No Announcements Found</h4>
                    <p>
                      {search || statusFilter !== "All" || typeFilter !== "All"
                        ? "Try adjusting your search query or filter options."
                        : "Click 'New Announcement' above to publish your first civic notice."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="announcement-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <FaChevronLeft /> Previous
            </button>

            <div className="page-indicators">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="ann-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ann-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ann-modal-header">
              <div className="modal-header-title">
                <FaBullhorn />
                <h3>
                  {editingItem
                    ? "Edit Announcement"
                    : "Create Public Announcement"}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="ann-modal-form">
              <div className="form-group">
                <label>
                  Announcement Title <span className="req">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Water Supply Maintenance, Heavy Rain Alert..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category / Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="NOTICE">📢 General Notice</option>
                    <option value="ALERT">🚨 Emergency / Alert</option>
                    <option value="MAINTENANCE">🛠️ Civic Maintenance</option>
                    <option value="UPDATE">🔔 City Update</option>
                    <option value="EVENT">🎉 Public Campaign / Event</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                  >
                    <option value="HIGH">High Priority (Urgent)</option>
                    <option value="MEDIUM">Medium Priority (Standard)</option>
                    <option value="LOW">Low Priority (Informational)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Message Content <span className="req">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Provide clear details about the civic update, affected areas, timing, helpline numbers..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start / Effective Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>End / Expiry Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    <strong>Display on Home Page</strong>
                    <small>
                      When enabled, this notice will be visible to all public
                      visitors on the portal.
                    </small>
                  </span>
                </label>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={saving}
                >
                  {saving ? (
                    "Publishing..."
                  ) : editingItem ? (
                    "Save Changes"
                  ) : (
                    "Publish Announcement"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div
          className="ann-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="ann-modal-card delete-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-icon-wrap">
              <FaTrash />
            </div>
            <h3>Delete Announcement?</h3>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>"{deleteTarget.title}"</strong>? This announcement will
              immediately be removed from the public Home page.
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnouncementManagement;
