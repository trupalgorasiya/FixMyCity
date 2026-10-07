import { useEffect, useMemo, useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSearch,
    FaTimes,
    FaStar,
    FaRegStar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCitizenComplaints } from "../../api/citizenApi";
import { API_BASE_URL } from "../../api/axios";
import "./MyComplaints.css";

function MyComplaints() {

    const navigate = useNavigate();

    // ==========================================================
    // STATE
    // ==========================================================

    const [complaints, setComplaints] = useState([]);

    const [statusFilter, setStatusFilter] = useState("All");

    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(0);

    const size = 5;

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // Feedback Modal State
    const [feedbackComplaint, setFeedbackComplaint] = useState(null);
    const [feedbackRating, setFeedbackRating] = useState(5);
    const [feedbackComments, setFeedbackComments] = useState("");
    const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
    const [feedbackStatusMsg, setFeedbackStatusMsg] = useState(null);
    const [existingFeedbackRecord, setExistingFeedbackRecord] = useState(null);

    // ==========================================================
    // FETCH COMPLAINTS
    // ==========================================================

    useEffect(() => {

        let cancelled = false;

        const loadComplaints = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getCitizenComplaints(
                    page,
                    size,
                    searchTerm,
                    "createdAt",
                    "desc"
                );

                if (cancelled) {
                    return;
                }

                const data = response.data;

                setComplaints(data.content || []);

                setTotalPages(data.totalPages || 0);

                setTotalElements(data.totalElements || 0);

            } catch (error) {

                if (cancelled) {
                    return;
                }

                console.error(
                    "Error fetching complaints:",
                    error
                );

                if (error.response?.data?.message) {

                    setError(
                        error.response.data.message
                    );

                } else {

                    setError(
                        "Unable to load complaints."
                    );

                }

                setComplaints([]);

                setTotalPages(0);

                setTotalElements(0);

            } finally {

                if (!cancelled) {

                    setLoading(false);

                }

            }

        };

        loadComplaints();

        return () => {

            cancelled = true;

        };

    }, [page, searchTerm]);

    // ==========================================================
    // STATUS FILTER
    // ==========================================================

    const filteredComplaints = useMemo(() => {

        if (statusFilter === "All") {

            return complaints;

        }

        return complaints.filter((complaint) => {

            return (
                String(complaint.status || "")
                    .toLowerCase()
                    .trim()
                ===
                statusFilter
                    .toLowerCase()
                    .trim()
            );

        });

    }, [complaints, statusFilter]);

    // ==========================================================
    // SUMMARY COUNTS
    // ==========================================================

    const totalComplaints = totalElements;

    const pendingComplaints = complaints.filter(
        (item) =>
            String(item.status || "")
                .toLowerCase()
                .trim() === "pending"
    ).length;

    const inProgressComplaints = complaints.filter(
        (item) =>
            String(item.status || "")
                .toLowerCase()
                .trim() === "in progress"
    ).length;

    const resolvedComplaints = complaints.filter(
        (item) =>
            String(item.status || "")
                .toLowerCase()
                .trim() === "resolved"
    ).length;

    // ==========================================================
    // SEARCH
    // ==========================================================

    const handleSearch = (e) => {

        setSearchTerm(e.target.value);

        setPage(0);

    };

    // ==========================================================
    // STATUS FILTER
    // ==========================================================

    const handleStatusFilter = (e) => {

        setStatusFilter(e.target.value);

        setPage(0);

    };

    // ==========================================================
    // TRACK COMPLAINT
    // ==========================================================

    const handleTrack = (complaintNumber) => {

        navigate(
            `/user/complaint-tracking/${complaintNumber}`
        );

    };

    // ==========================================================
    // FEEDBACK HANDLERS
    // ==========================================================

    const handleOpenFeedback = async (complaint) => {
        setFeedbackComplaint(complaint);
        setFeedbackStatusMsg(null);
        setFeedbackSubmitting(false);
        setFeedbackRating(5);
        setFeedbackComments("");
        setExistingFeedbackRecord(null);

        try {
            const res = await fetch(`${API_BASE_URL}/feedback/complaint/${complaint.complaintNumber}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.rating) {
                    setExistingFeedbackRecord(data);
                    setFeedbackRating(data.rating);
                    setFeedbackComments(data.comments || "");
                }
            }
        } catch {
            // New feedback
        }
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!feedbackComplaint) return;

        try {
            setFeedbackSubmitting(true);
            setFeedbackStatusMsg(null);

            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("jwt") ||
                localStorage.getItem("accessToken") ||
                "";

            const payload = {
                complaintNumber: feedbackComplaint.complaintNumber,
                complaintId: feedbackComplaint.complaintId,
                rating: Number(feedbackRating),
                comments: feedbackComments.trim()
            };

            const res = await fetch(`${API_BASE_URL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to submit feedback");
            }

            const data = await res.json();
            setExistingFeedbackRecord(data);
            setFeedbackStatusMsg({ text: "Feedback submitted successfully! Thank you ⭐", isError: false });
            setTimeout(() => {
                setFeedbackComplaint(null);
                setFeedbackStatusMsg(null);
            }, 1800);
        } catch (err) {
            setFeedbackStatusMsg({ text: err.message || "Unable to save feedback", isError: true });
        } finally {
            setFeedbackSubmitting(false);
        }
    };

    // ==========================================================
    // CLEAR SEARCH
    // ==========================================================

    const clearSearch = () => {

        setSearchTerm("");

        setPage(0);

    };

    // ==========================================================
    // RESET SEARCH + FILTER
    // ==========================================================

    const resetFilters = () => {

        setSearchTerm("");

        setStatusFilter("All");

        setPage(0);

    };

    // ==========================================================
    // PREVIOUS PAGE
    // ==========================================================

    const previousPage = () => {

        if (page > 0) {

            setPage(page - 1);

        }

    };

    // ==========================================================
    // NEXT PAGE
    // ==========================================================

    const nextPage = () => {

        if (page < totalPages - 1) {

            setPage(page + 1);

        }

    };

    // ==========================================================
    // GO TO PAGE
    // ==========================================================

    const goToPage = (pageNumber) => {

        setPage(pageNumber);

    };

    // ==========================================================
    // RETURN
    // ==========================================================

    return (

        <div className="mycomplaints-page">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="page-header">

                <div>

                    <h1>
                        My Complaints
                    </h1>

                    <p>
                        View, monitor and track every complaint that
                        you have submitted. Stay updated with the
                        latest complaint status and department progress.
                    </p>

                </div>

            </div>


            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="summary-grid">

                {/* TOTAL */}

                <div className="summary-card">

                    <div className="summary-content">

                        <span className="summary-title">
                            Total Complaints
                        </span>

                        <span className="summary-value">
                            {totalComplaints}
                        </span>

                    </div>

                    <div className="summary-icon">

                        <FaClipboardList />

                    </div>

                </div>


                {/* PENDING */}

                <div className="summary-card">

                    <div className="summary-content">

                        <span className="summary-title">
                            Pending
                        </span>

                        <span className="summary-value">
                            {pendingComplaints}
                        </span>

                    </div>

                    <div className="summary-icon">

                        <FaExclamationTriangle />

                    </div>

                </div>


                {/* IN PROGRESS */}

                <div className="summary-card">

                    <div className="summary-content">

                        <span className="summary-title">
                            In Progress
                        </span>

                        <span className="summary-value">
                            {inProgressComplaints}
                        </span>

                    </div>

                    <div className="summary-icon">

                        <FaClock />

                    </div>

                </div>


                {/* RESOLVED */}

                <div className="summary-card">

                    <div className="summary-content">

                        <span className="summary-title">
                            Resolved
                        </span>

                        <span className="summary-value">
                            {resolvedComplaints}
                        </span>

                    </div>

                    <div className="summary-icon">

                        <FaCheckCircle />

                    </div>

                </div>

            </div>


            {/* ==================================================
                SEARCH + FILTER
            ================================================== */}

            <div className="complaint-toolbar">

                {/* SEARCH BOX */}

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search by ID, department, date, status..."
                        onChange={handleSearch}
                    />

                    {searchTerm && (

                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={clearSearch}
                            title="Clear Search"
                        >

                            <FaTimes />

                        </button>

                    )}

                </div>


                {/* FILTER */}

                <div className="toolbar-right">

                    <div className="filter-box">

                        <FaSearch />

                        <select
                            value={statusFilter}
                            onChange={handleStatusFilter}
                        >

                            <option value="All">
                                All Complaints
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Resolved">
                                Resolved
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ==================================================
                SEARCH RESULT INFORMATION
            ================================================== */}

            {(searchTerm || statusFilter !== "All") && (

                <div className="search-result-info">

                    <span>

                        Showing{" "}

                        <strong>
                            {filteredComplaints.length}
                        </strong>{" "}

                        matching complaint
                        {filteredComplaints.length !== 1
                            ? "s"
                            : ""}

                    </span>

                    {searchTerm && (

                        <span>

                            {" "}for "

                            <strong>
                                {searchTerm}
                            </strong>

                            "

                        </span>

                    )}

                </div>

            )}


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="search-result-info">

                    <strong>
                        {error}
                    </strong>

                </div>

            )}


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="table-card">

                <div className="table-container">

                    <table className="complaints-table">

                        <thead>

                            <tr>

                                <th>
                                    Complaint ID
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Complaint Date
                                </th>

                                <th>
                                    Resolve Date
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {/* LOADING */}

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-data"
                                    >

                                        Loading complaints...

                                    </td>

                                </tr>

                            ) : filteredComplaints.length > 0 ? (

                                /* DATA */

                                filteredComplaints.map(
                                    (complaint) => (

                                        <tr
                                            key={
                                                complaint.complaintId
                                            }
                                        >

                                            {/* COMPLAINT ID */}

                                            <td className="complaint-id">

                                                {
                                                    complaint.complaintNumber
                                                }

                                            </td>


                                            {/* DEPARTMENT */}

                                            <td>

                                                {
                                                    complaint.department ||
                                                    "-"
                                                }

                                            </td>


                                            {/* COMPLAINT DATE */}

                                            <td>

                                                {complaint.createdAt
                                                    ? new Date(
                                                        complaint.createdAt
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : "-"
                                                }

                                            </td>


                                            {/* RESOLVE DATE */}

                                            <td>

                                                {complaint.resolveAt
                                                    ? new Date(
                                                        complaint.resolveAt
                                                    ).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : "-"
                                                }

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        String(
                                                            complaint.status ||
                                                            ""
                                                        )
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                    }`}
                                                >

                                                    {
                                                        complaint.status ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>
                                                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                                    <button
                                                        type="button"
                                                        className="track-btn"
                                                        onClick={() =>
                                                            handleTrack(
                                                                complaint.complaintNumber
                                                            )
                                                        }
                                                    >
                                                        Track
                                                    </button>

                                                    {complaint.status &&
                                                        complaint.status.toUpperCase() === "RESOLVED" && (
                                                            <button
                                                                type="button"
                                                                className="feedback-action-btn"
                                                                onClick={() =>
                                                                    handleOpenFeedback(complaint)
                                                                }
                                                                style={{
                                                                    background: "#f59e0b",
                                                                    color: "#ffffff",
                                                                    border: "none",
                                                                    borderRadius: "8px",
                                                                    padding: "8px 12px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "600",
                                                                    cursor: "pointer",
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "4px"
                                                                }}
                                                            >
                                                                <FaStar style={{ fontSize: "11px" }} />
                                                                Feedback
                                                            </button>
                                                        )}
                                                </div>
                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                /* NO DATA */

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-data"
                                    >

                                        <div className="no-data-content">

                                            <FaSearch />

                                            <h3>
                                                No Complaints Found
                                            </h3>

                                            <p>
                                                No complaints match
                                                your current search
                                                or filter selection.
                                            </p>

                                            <button
                                                type="button"
                                                className="reset-search-btn"
                                                onClick={resetFilters}
                                            >

                                                Clear Search & Filter

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ==================================================
                    PAGINATION
                ================================================== */}

                {totalPages > 0 && (

                    <div className="pagination">

                        <span className="pagination-info">

                            Showing{" "}

                            {filteredComplaints.length}{" "}

                            of{" "}

                            {totalElements}{" "}

                            complaints

                        </span>


                        <div className="pagination-buttons">

                            {/* PREVIOUS */}

                            <button
                                type="button"
                                className="page-btn"
                                disabled={page === 0}
                                onClick={previousPage}
                            >

                                Previous

                            </button>


                            {/* PAGE NUMBERS */}

                            {Array.from(
                                {
                                    length: totalPages
                                },
                                (_, index) => (

                                    <button
                                        key={index}
                                        type="button"
                                        className={`page-btn ${
                                            page === index
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            goToPage(index)
                                        }
                                    >

                                        {index + 1}

                                    </button>

                                )
                            )}


                            {/* NEXT */}

                            <button
                                type="button"
                                className="page-btn"
                                disabled={
                                    page === totalPages - 1
                                }
                                onClick={nextPage}
                            >

                                Next

                            </button>

                        </div>

                    </div>

                )}

            </div>

            {/* ==========================================================
                FEEDBACK MODAL
            ========================================================== */}
            {feedbackComplaint && (
                <div
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.65)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px"
                    }}
                    onClick={() => setFeedbackComplaint(null)}
                >
                    <div
                        className="feedback-modal-content"
                        style={{
                            background: "#ffffff",
                            borderRadius: "20px",
                            padding: "32px",
                            maxWidth: "520px",
                            width: "100%",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            position: "relative"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HEADER */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                            <div>
                                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                                    {existingFeedbackRecord ? "Update Feedback" : "Complaint Feedback"}
                                </h2>
                                <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
                                    Ticket: <strong>{feedbackComplaint.complaintNumber}</strong>
                                    {feedbackComplaint.title ? ` • ${feedbackComplaint.title}` : ""}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFeedbackComplaint(null)}
                                style={{
                                    background: "#f1f5f9",
                                    border: "none",
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    color: "#64748b",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* STATUS MESSAGE */}
                        {feedbackStatusMsg && (
                            <div
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    marginBottom: "16px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    backgroundColor: feedbackStatusMsg.isError ? "#fef2f2" : "#f0fdf4",
                                    color: feedbackStatusMsg.isError ? "#b91c1c" : "#15803d",
                                    border: `1px solid ${feedbackStatusMsg.isError ? "#fecaca" : "#bbf7d0"}`
                                }}
                            >
                                {feedbackStatusMsg.text}
                            </div>
                        )}

                        {/* FORM */}
                        <form onSubmit={handleFeedbackSubmit}>
                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>
                                    Rate the Resolution Quality (1 - 5 Stars):
                                </label>
                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setFeedbackRating(star)}
                                            style={{
                                                fontSize: "32px",
                                                cursor: "pointer",
                                                color: star <= feedbackRating ? "#f59e0b" : "#cbd5e1",
                                                transition: "transform 0.15s ease",
                                                transform: star <= feedbackRating ? "scale(1.1)" : "scale(1)"
                                            }}
                                            title={`${star} Star`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#475569", marginLeft: "10px" }}>
                                        {feedbackRating === 5 && "5/5 - Excellent ⭐⭐⭐⭐⭐"}
                                        {feedbackRating === 4 && "4/5 - Good ⭐⭐⭐⭐"}
                                        {feedbackRating === 3 && "3/5 - Average ⭐⭐⭐"}
                                        {feedbackRating === 2 && "2/5 - Poor ⭐⭐"}
                                        {feedbackRating === 1 && "1/5 - Very Poor ⭐"}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: "24px" }}>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>
                                    Your Feedback & Comments:
                                </label>
                                <textarea
                                    value={feedbackComments}
                                    onChange={(e) => setFeedbackComments(e.target.value)}
                                    placeholder="Write your feedback regarding the resolution quality, response speed, or engineer service..."
                                    rows={4}
                                    style={{
                                        width: "100%",
                                        padding: "14px",
                                        borderRadius: "12px",
                                        border: "1px solid #cbd5e1",
                                        fontFamily: "inherit",
                                        fontSize: "14px",
                                        outline: "none",
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <button
                                    type="button"
                                    onClick={() => setFeedbackComplaint(null)}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        border: "1px solid #cbd5e1",
                                        background: "#ffffff",
                                        color: "#475569",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={feedbackSubmitting}
                                    style={{
                                        padding: "10px 24px",
                                        borderRadius: "10px",
                                        border: "none",
                                        background: "#2563eb",
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        opacity: feedbackSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {feedbackSubmitting ? "Submitting..." : existingFeedbackRecord ? "Update Feedback" : "Submit Feedback"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>

    );

}

export default MyComplaints;