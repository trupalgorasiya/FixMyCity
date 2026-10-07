import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaCheckCircle,
  FaSyncAlt,
  FaClock,
  FaBullhorn,
  FaExclamationTriangle,
  FaTools,
  FaInfoCircle,
  FaCalendarAlt,
  FaBell,
  FaArrowRight
} from "react-icons/fa";
import { API_BASE_URL } from "../api/axios";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  // Dynamic Statistics
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolved: 0,
    inProgress: 0,
    pending: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Dynamic Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcementFilter, setAnnouncementFilter] = useState("ALL");

  // Dynamic Citizen Feedback & Ratings
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackStats, setFeedbackStats] = useState({ totalFeedbacks: 0, averageRating: 0.0 });
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch live complaint counters
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await fetch(`${API_BASE_URL}/public/stats`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStats({
              totalComplaints: data.totalComplaints ?? 0,
              resolved: data.resolved ?? 0,
              inProgress: data.inProgress ?? 0,
              pending: data.pending ?? 0
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch public stats:", error);
      } finally {
        if (isMounted) setStatsLoading(false);
      }
    };

    // 2. Fetch live announcements
    const fetchAnnouncements = async () => {
      try {
        setAnnouncementsLoading(true);
        const res = await fetch(`${API_BASE_URL}/public/announcements`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setAnnouncements(Array.isArray(data) ? data : []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch public announcements:", error);
      } finally {
        if (isMounted) setAnnouncementsLoading(false);
      }
    };

    // 3. Fetch live citizen feedbacks & average rating
    const fetchFeedbacks = async () => {
      try {
        setFeedbackLoading(true);
        const [allRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/feedback/admin/all`),
          fetch(`${API_BASE_URL}/feedback/admin/stats`)
        ]);

        if (allRes.ok) {
          const allData = await allRes.json();
          if (isMounted && Array.isArray(allData)) {
            setFeedbacks(allData);
          }
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (isMounted && statsData) {
            setFeedbackStats(statsData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch feedbacks for home page:", error);
      } finally {
        if (isMounted) setFeedbackLoading(false);
      }
    };

    fetchStats();
    fetchAnnouncements();
    fetchFeedbacks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReportComplaint = () => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("jwt");

    // No login
    if (!token) {
      navigate("/com");
      return;
    }

    // Get logged-in user
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/com");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      // Only Citizen can directly access citizen report page
      if (user?.role === "CITIZEN") {
        navigate("/user/report");
      } else {
        navigate("/com");
      }
    } catch (error) {
      console.error("Invalid user data:", error);
      navigate("/com");
    }
  };

  // Helper: Format Dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  // Helper: Get Icon & Class by Type
  const getTypeMeta = (type) => {
    switch (type) {
      case "ALERT":
        return {
          icon: <FaExclamationTriangle />,
          label: "Alert",
          badgeClass: "badge-alert",
          cardClass: "ann-type-alert"
        };
      case "MAINTENANCE":
        return {
          icon: <FaTools />,
          label: "Maintenance",
          badgeClass: "badge-maintenance",
          cardClass: "ann-type-maintenance"
        };
      case "EVENT":
        return {
          icon: <FaCalendarAlt />,
          label: "Civic Event",
          badgeClass: "badge-event",
          cardClass: "ann-type-event"
        };
      case "NOTICE":
      default:
        return {
          icon: <FaInfoCircle />,
          label: "Notice",
          badgeClass: "badge-notice",
          cardClass: "ann-type-notice"
        };
    }
  };

  // Filtered Announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    if (announcementFilter === "ALL") return true;
    return ann.type === announcementFilter;
  });

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>FixMyCity</h1>
          <h2>Building Smarter Cities Together</h2>
          <p>
            Report civic issues like potholes, garbage, street lights,
            water leakage, drainage problems and track their resolution
            in real time.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={handleReportComplaint}
            >
              Report Complaint
            </button>

            <Link to="tracking">
              <button className="secondary-btn">
                Track Complaint
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC COUNTERS ================= */}
      <section className="counter-section">
        {/* Total Complaints */}
        <div className="counter-card counter-card-total">
          <div className="counter-icon-wrap icon-total">
            <FaClipboardList />
          </div>
          <div className="counter-info">
            <h1>
              {statsLoading ? (
                <span className="counter-skeleton">---</span>
              ) : (
                stats.totalComplaints.toLocaleString()
              )}
            </h1>
            <p>Total Complaints</p>
            <span className="counter-pill pill-total">Recorded to Date</span>
          </div>
        </div>

        {/* Resolved */}
        <div className="counter-card counter-card-resolved">
          <div className="counter-icon-wrap icon-resolved">
            <FaCheckCircle />
          </div>
          <div className="counter-info">
            <h1>
              {statsLoading ? (
                <span className="counter-skeleton">---</span>
              ) : (
                stats.resolved.toLocaleString()
              )}
            </h1>
            <p>Resolved</p>
            <span className="counter-pill pill-resolved">Successfully Fixed</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="counter-card counter-card-progress">
          <div className="counter-icon-wrap icon-progress">
            <FaSyncAlt />
          </div>
          <div className="counter-info">
            <h1>
              {statsLoading ? (
                <span className="counter-skeleton">---</span>
              ) : (
                stats.inProgress.toLocaleString()
              )}
            </h1>
            <p>In Progress</p>
            <span className="counter-pill pill-progress">Active Field Work</span>
          </div>
        </div>

        {/* Pending */}
        <div className="counter-card counter-card-pending">
          <div className="counter-icon-wrap icon-pending">
            <FaClock />
          </div>
          <div className="counter-info">
            <h1>
              {statsLoading ? (
                <span className="counter-skeleton">---</span>
              ) : (
                stats.pending.toLocaleString()
              )}
            </h1>
            <p>Pending</p>
            <span className="counter-pill pill-pending">Under Verification</span>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC ANNOUNCEMENTS ================= */}
      <section className="announcement-section">
        <div className="announcement-header-area">
          <div className="announcement-header-badge">
            <FaBell /> <span>Live Civic Broadcasts</span>
          </div>
          <h2>Official Announcements & City Notices</h2>
          <p>
            Stay informed with real-time updates from municipal authorities,
            emergency alerts, and scheduled maintenance work.
          </p>

          {/* Filter Chips */}
          <div className="announcement-filter-tabs">
            <button
              className={`filter-tab-btn ${announcementFilter === "ALL" ? "active" : ""}`}
              onClick={() => setAnnouncementFilter("ALL")}
            >
              All ({announcements.length})
            </button>
            <button
              className={`filter-tab-btn ${announcementFilter === "NOTICE" ? "active" : ""}`}
              onClick={() => setAnnouncementFilter("NOTICE")}
            >
              <FaInfoCircle /> Notices (
              {announcements.filter((a) => a.type === "NOTICE").length})
            </button>
            <button
              className={`filter-tab-btn ${announcementFilter === "ALERT" ? "active" : ""}`}
              onClick={() => setAnnouncementFilter("ALERT")}
            >
              <FaExclamationTriangle /> Alerts (
              {announcements.filter((a) => a.type === "ALERT").length})
            </button>
            <button
              className={`filter-tab-btn ${announcementFilter === "MAINTENANCE" ? "active" : ""}`}
              onClick={() => setAnnouncementFilter("MAINTENANCE")}
            >
              <FaTools /> Maintenance (
              {announcements.filter((a) => a.type === "MAINTENANCE").length})
            </button>
            <button
              className={`filter-tab-btn ${announcementFilter === "EVENT" ? "active" : ""}`}
              onClick={() => setAnnouncementFilter("EVENT")}
            >
              <FaCalendarAlt /> Events (
              {announcements.filter((a) => a.type === "EVENT").length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        {announcementsLoading ? (
          <div className="announcement-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="announcement-card skeleton-card">
                <div className="skeleton-line line-sm"></div>
                <div className="skeleton-line line-title"></div>
                <div className="skeleton-line line-desc"></div>
                <div className="skeleton-line line-desc"></div>
              </div>
            ))}
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="announcement-empty">
            <div className="empty-icon-circle">
              <FaBullhorn />
            </div>
            <h3>No Announcements in this Category</h3>
            <p>
              There are currently no active public announcements posted under{" "}
              {announcementFilter === "ALL" ? "any category" : announcementFilter.toLowerCase()}.
              Check back later for fresh updates!
            </p>
            {announcementFilter !== "ALL" && (
              <button
                className="clear-filter-btn"
                onClick={() => setAnnouncementFilter("ALL")}
              >
                View All Announcements
              </button>
            )}
          </div>
        ) : (
          <div className="announcement-grid">
            {filteredAnnouncements.map((item) => {
              const meta = getTypeMeta(item.type);
              const isUrgent =
                item.priority === "URGENT" || item.priority === "HIGH";

              return (
                <article
                  key={item.announcementId || item.id}
                  className={`announcement-card ${meta.cardClass}`}
                >
                  <div className="ann-card-top">
                    <span className={`ann-type-badge ${meta.badgeClass}`}>
                      {meta.icon}
                      <span>{meta.label}</span>
                    </span>

                    {isUrgent && (
                      <span className="ann-urgent-badge">
                        <span className="urgent-dot"></span>
                        {item.priority}
                      </span>
                    )}

                    <span className="ann-date">
                      {formatDate(item.createdAt || item.startDate)}
                    </span>
                  </div>

                  <h3 className="ann-card-title">{item.title}</h3>

                  <p className="ann-card-message">{item.message}</p>

                  <div className="ann-card-footer">
                    {item.startDate && item.endDate ? (
                      <span className="ann-duration">
                        <FaCalendarAlt /> Valid: {formatDate(item.startDate)} - {formatDate(item.endDate)}
                      </span>
                    ) : item.createdBy ? (
                      <span className="ann-issuer">
                        Issued by: <strong>{item.createdBy}</strong>
                      </span>
                    ) : (
                      <span className="ann-issuer">
                        Official Municipal Broadcast
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <span className="service-icon">🚧</span>
            <h3>Road Damage</h3>
          </div>

          <div className="service-card">
            <span className="service-icon">💡</span>
            <h3>Street Lights</h3>
          </div>

          <div className="service-card">
            <span className="service-icon">🚮</span>
            <h3>Garbage</h3>
          </div>

          <div className="service-card">
            <span className="service-icon">💧</span>
            <h3>Water Leakage</h3>
          </div>

          <div className="service-card">
            <span className="service-icon">🌳</span>
            <h3>Parks</h3>
          </div>

          <div className="service-card">
            <span className="service-icon">🚰</span>
            <h3>Drainage</h3>
          </div>
        </div>
      </section>

      {/* ================= NEWS ================= */}
     

      {/* ================= HOW IT WORKS ================= */}
      <section className="steps">
        <h2>How It Works</h2>
        <div className="step-grid">
          <div className="step-card">
            <h1>1</h1>
            <p>Register</p>
          </div>

          <div className="step-card">
            <h1>2</h1>
            <p>Report Complaint</p>
          </div>

          <div className="step-card">
            <h1>3</h1>
            <p>Track Progress</p>
          </div>

          <div className="step-card">
            <h1>4</h1>
            <p>Issue Resolved</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL / CITIZEN FEEDBACK ================= */}
      <section className="testimonial">
        <div className="testimonial-header-wrap">
          <h2>Citizen Feedback & Ratings</h2>
          <p className="testimonial-subhead">
            Hear directly from citizens whose complaints were resolved by our municipal teams
          </p>

          {feedbackStats.totalFeedbacks > 0 && (
            <div className="home-rating-summary-pill">
              <span className="home-rating-pill-star">★</span>
              <span className="home-rating-pill-avg">{feedbackStats.averageRating?.toFixed(1) || "5.0"}</span>
              <span className="home-rating-pill-scale">/ 5.0</span>
              <span className="home-rating-pill-sep">•</span>
              <span className="home-rating-pill-count">{feedbackStats.totalFeedbacks} Verified Review{feedbackStats.totalFeedbacks > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {feedbackLoading ? (
          <div className="testimonial-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card skeleton-card">
                <div className="skeleton-line line-sm" />
                <div className="skeleton-line line-desc" />
                <div className="skeleton-line line-desc" />
              </div>
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="testimonial-card">
            <h3>⭐⭐⭐⭐⭐</h3>
            <p>
              "My street light complaint was resolved within 24 hours. Excellent
              service and prompt response from the department."
            </p>
            <strong>- Rahul Patel</strong>
          </div>
        ) : (
          <div className="testimonial-grid">
            {feedbacks.slice(0, 3).map((fb) => (
              <div key={fb.feedbackId} className="testimonial-card feedback-item-card">
                <div className="feedback-stars-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= fb.rating ? "star-gold" : "star-gray"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="feedback-rating-num">{fb.rating}.0</span>
                </div>
                <p className="feedback-card-comment">
                  "{fb.comments || "Issue resolved swiftly by the municipal staff. Very satisfied with the outcome!"}"
                </p>
                <div className="feedback-card-footer">
                  <div className="feedback-author-info">
                    <strong>{fb.citizenName || "Citizen"}</strong>
                    {fb.departmentName && (
                      <span className="feedback-dept-tag">🏛️ {fb.departmentName}</span>
                    )}
                  </div>
                  {fb.complaintNumber && (
                    <span className="feedback-cmp-tag">{fb.complaintNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= EMERGENCY ================= */}
      <section className="emergency">
        <h2>Emergency Contacts</h2>
        <div className="emergency-grid">
          <div>🚓 Police<br />100</div>
          <div>🚑 Ambulance<br />108</div>
          <div>🔥 Fire<br />101</div>
          <div>🏢 Municipal<br />155303</div>
        </div>
      </section>

    </div>
  );
}

export default Home;