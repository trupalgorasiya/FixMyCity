import { useState, useEffect, useMemo } from "react";
import "./ViewFeedback.css";
import { API_BASE_URL } from "../../api/axios";

import {
  FaComments,
  FaStar,
  FaRegStar,
  FaSmile,
  FaMeh,
  FaFrown,
  FaSearch,
  FaEye,
  FaAward
} from "react-icons/fa";

function ViewFeedbackDept() {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 6;

  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    averageRating: 0.0,
    count5Star: 0,
    count4Star: 0,
    count3Star: 0,
    count2Star: 0,
    count1Star: 0
  });
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [engineerFilter, setEngineerFilter] = useState("All");
  const [rating, setRating] = useState("All");

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken") ||
      ""
    );
  };

  /* ==========================================================
     FETCH DEPARTMENT FEEDBACK & STATS
  ========================================================== */
  const loadData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        setFeedbacks([]);
        setLoading(false);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };

      const [deptRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/feedback/department`, { headers }),
        fetch(`${API_BASE_URL}/feedback/department/stats`, { headers })
      ]);

      if (deptRes.ok) {
        const data = await deptRes.json();
        setFeedbacks(Array.isArray(data) ? data : []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Failed to load department feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ==========================================================
     UNIQUE ENGINEERS
  ========================================================== */
  const engineersList = useMemo(() => {
    const set = new Set();
    feedbacks.forEach((f) => {
      if (f.engineerName && f.engineerName.trim() && f.engineerName !== "Unassigned") {
        set.add(f.engineerName.trim());
      }
    });
    return Array.from(set).sort();
  }, [feedbacks]);

  /* ==========================================================
     FILTERING
  ========================================================== */
  const filteredFeedback = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return feedbacks.filter((item) => {
      const idMatch = (item.feedbackId ? String(item.feedbackId) : "").toLowerCase().includes(keyword);
      const cNumMatch = (item.complaintNumber || "").toLowerCase().includes(keyword);
      const cTitleMatch = (item.complaintTitle || "").toLowerCase().includes(keyword);
      const citMatch = (item.citizenName || "").toLowerCase().includes(keyword);
      const engMatch = (item.engineerName || "").toLowerCase().includes(keyword);
      const textMatch = (item.comments || "").toLowerCase().includes(keyword);

      const matchSearch =
        !keyword ||
        idMatch ||
        cNumMatch ||
        cTitleMatch ||
        citMatch ||
        engMatch ||
        textMatch;

      const matchEngineer =
        engineerFilter === "All" || item.engineerName === engineerFilter;

      const matchRating =
        rating === "All" || item.rating === Number(rating);

      return matchSearch && matchEngineer && matchRating;
    });
  }, [feedbacks, search, engineerFilter, rating]);

  /* ==========================================================
     PAGINATION
  ========================================================== */
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage) || 1;
  const indexOfLast = currentPage * feedbackPerPage;
  const indexOfFirst = indexOfLast - feedbackPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirst, indexOfLast);

  /* ==========================================================
     HELPERS
  ========================================================== */
  const renderStars = (starCount) => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((star) =>
          star <= starCount ? (
            <FaStar key={star} style={{ color: "#f59e0b" }} />
          ) : (
            <FaRegStar key={star} style={{ color: "#cbd5e1" }} />
          )
        )}
      </>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="complaint-page">
      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}
      <div className="page-header">
        <div>
          <h1>Department Feedback & Ratings</h1>
          <p>
            Review citizen ratings and feedback received for resolved complaints handled
            by your department.
          </p>
        </div>
      </div>

      {/* ==========================================================
          SUMMARY CARDS (INCLUDING AVERAGE RATING)
      ========================================================== */}
      <div className="summary-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {/* TOTAL FEEDBACK */}
        <div className="summary-card">
          <div className="summary-info">
            <h4>Total Feedback</h4>
            <h2>{stats.totalFeedbacks}</h2>
          </div>
          <div className="summary-icon">
            <FaComments />
          </div>
        </div>

        {/* AVERAGE RATING */}
        <div className="summary-card" style={{ borderLeft: "4px solid #f59e0b" }}>
          <div className="summary-info">
            <h4>Department Average</h4>
            <h2>
              {stats.averageRating > 0 ? `${stats.averageRating} / 5` : "0.0 / 5"}
            </h2>
          </div>
          <div className="summary-icon" style={{ color: "#f59e0b" }}>
            <FaAward />
          </div>
        </div>

        {/* 5 STARS */}
        <div className="summary-card">
          <div className="summary-info">
            <h4>Excellent (5★)</h4>
            <h2>{stats.count5Star}</h2>
          </div>
          <div className="summary-icon">
            <FaStar style={{ color: "#f59e0b" }} />
          </div>
        </div>

        {/* 4 STARS */}
        <div className="summary-card">
          <div className="summary-info">
            <h4>Good (4★)</h4>
            <h2>{stats.count4Star}</h2>
          </div>
          <div className="summary-icon">
            <FaSmile style={{ color: "#10b981" }} />
          </div>
        </div>

        {/* 3 STARS */}
        <div className="summary-card">
          <div className="summary-info">
            <h4>Average (3★)</h4>
            <h2>{stats.count3Star}</h2>
          </div>
          <div className="summary-icon">
            <FaMeh style={{ color: "#f59e0b" }} />
          </div>
        </div>

        {/* POOR (1-2 STARS) */}
        <div className="summary-card">
          <div className="summary-info">
            <h4>Needs Attention (1-2★)</h4>
            <h2>{stats.count2Star + stats.count1Star}</h2>
          </div>
          <div className="summary-icon">
            <FaFrown style={{ color: "#ef4444" }} />
          </div>
        </div>
      </div>

      {/* ==========================================================
          TOOLBAR / FILTERS
      ========================================================== */}
      <div className="toolbar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by complaint #, citizen, engineer, comment..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {engineersList.length > 0 && (
          <select
            value={engineerFilter}
            onChange={(e) => {
              setEngineerFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Assigned Engineers</option>
            {engineersList.map((eng) => (
              <option key={eng} value={eng}>
                {eng}
              </option>
            ))}
          </select>
        )}

        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Ratings</option>
          <option value="5">★★★★★ (5 Stars)</option>
          <option value="4">★★★★☆ (4 Stars)</option>
          <option value="3">★★★☆☆ (3 Stars)</option>
          <option value="2">★★☆☆☆ (2 Stars)</option>
          <option value="1">★☆☆☆☆ (1 Star)</option>
        </select>
      </div>

      {/* ==========================================================
          FEEDBACK TABLE
      ========================================================== */}
      <div className="table-card">
        <div className="card-header">
          <div>
            <h2>Citizen Feedback List ({filteredFeedback.length})</h2>
            <p>
              Citizen reviews and satisfaction ratings on completed works.
            </p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Complaint #</th>
                <th>Citizen</th>
                <th>Assigned Engineer</th>
                <th>Rating</th>
                {/* <th>Feedback Message</th> */}
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    Loading department feedbacks...
                  </td>
                </tr>
              ) : currentFeedback.length > 0 ? (
                currentFeedback.map((item) => (
                  <tr key={item.feedbackId}>
                    <td><strong>#{item.feedbackId}</strong></td>
                    <td style={{ fontWeight: 600, color: "#2563eb" }}>
                      {item.complaintNumber}
                    </td>
                    <td>{item.citizenName}</td>
                    <td>{item.engineerName}</td>
                    <td>
                      <div className="rating-stars" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {renderStars(item.rating)}
                        <span className="rating-number">({item.rating}/5)</span>
                      </div>
                    </td>
                    {/* <td>
                      <div className="feedback-message" title={item.comments}>
                        {item.comments && item.comments.length > 50
                          ? `${item.comments.substring(0, 50)}...`
                          : item.comments || "-"}
                      </div>
                    </td> */}
                    <td>{formatDate(item.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => {
                            setSelectedFeedback(item);
                            setShowViewModal(true);
                          }}
                        >
                          <FaEye /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No feedback received yet for this department.
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
      {filteredFeedback.length > feedbackPerPage && (
        <div className="pagination-wrapper">
          <button
            onClick={() => {
              if (currentPage > 1) setCurrentPage((prev) => prev - 1);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active-page" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* ==========================================================
          VIEW FEEDBACK MODAL
      ========================================================== */}
      {showViewModal && selectedFeedback && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Feedback Details</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFeedback(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="details-section">
              <h3>Complaint Information</h3>
              <div className="details-grid">
                <div>
                  <label>Complaint Number</label>
                  <p><strong>{selectedFeedback.complaintNumber}</strong></p>
                </div>
                <div>
                  <label>Complaint Title</label>
                  <p>{selectedFeedback.complaintTitle || "-"}</p>
                </div>
                <div>
                  <label>Department</label>
                  <p>{selectedFeedback.departmentName}</p>
                </div>
                <div>
                  <label>Assigned Engineer</label>
                  <p>{selectedFeedback.engineerName}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Citizen & Rating Information</h3>
              <div className="details-grid">
                <div>
                  <label>Citizen Name</label>
                  <p>{selectedFeedback.citizenName}</p>
                </div>
                <div>
                  <label>Citizen Email</label>
                  <p>{selectedFeedback.citizenEmail}</p>
                </div>
                <div>
                  <label>Rating</label>
                  <div className="rating-stars" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    {renderStars(selectedFeedback.rating)}
                    {/* <strong style={{ marginLeft: "6px", color: "#0f172a" }}>
                      ({selectedFeedback.rating} out of 5 Stars)
                    </strong> */}
                  </div>
                </div>
                <div>
                  <label>Submitted Date</label>
                  <p>{formatDate(selectedFeedback.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="feedback-box" style={{ marginTop: "16px", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <label style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                Citizen Feedback Message
              </label>
              <p style={{ marginTop: "8px", fontSize: "15px", color: "#1e293b", lineHeight: 1.6 }}>
                "{selectedFeedback.comments || "No written comments provided."}"
              </p>
            </div>

            <div className="modal-footer" style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                className="view-btn"
                style={{ padding: "10px 24px", cursor: "pointer" }}
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFeedback(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewFeedbackDept;