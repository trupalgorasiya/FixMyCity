import { useEffect, useMemo, useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSearch,
    FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCitizenComplaints } from "../../api/citizenApi";
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

        </div>

    );

}

export default MyComplaints;