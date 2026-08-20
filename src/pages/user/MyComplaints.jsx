import { useMemo, useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSearch,
    FaTimes
} from "react-icons/fa";
import "./MyComplaints.css";
import { useNavigate } from "react-router-dom";

function MyComplaints() {

    const navigate = useNavigate();

    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // ==========================================================
    // COMPLAINT DATA
    // ==========================================================

    const complaints = [
        {
            id: "CMP001",
            department: "Sanitation",
            date: "15 Jul 2026",
            res_date: "17 Jul 2026",
            status: "Pending"
        },
        {
            id: "CMP002",
            department: "Road Department",
            date: "13 Jul 2026",
            res_date: "17 Jul 2026",
            status: "In Progress"
        },
        {
            id: "CMP003",
            department: "Electrical",
            date: "10 Jul 2026",
            res_date: "17 Jul 2026",
            status: "Resolved"
        },
        {
            id: "CMP004",
            department: "Water Department",
            date: "08 Jul 2026",
            res_date: "17 Jul 2026",
            status: "Pending"
        },
        {
            id: "CMP005",
            department: "Drainage",
            date: "05 Jul 2026",
            res_date: "17 Jul 2026",
            status: "Resolved"
        }
    ];

    // ==========================================================
    // SEARCH + STATUS FILTER
    // ==========================================================

    const filteredComplaints = useMemo(() => {

        const search = searchTerm
            .trim()
            .toLowerCase();

        return complaints.filter((complaint) => {

            // --------------------------------------------------
            // STATUS FILTER
            // --------------------------------------------------

            const statusMatch =
                statusFilter === "All" ||
                String(complaint.status || "")
                    .toLowerCase()
                    .trim() ===
                statusFilter.toLowerCase().trim();

            // --------------------------------------------------
            // SEARCH ALL FIELDS
            // --------------------------------------------------

            const searchMatch =
                search === "" ||
                Object.values(complaint).some((value) =>
                    String(value ?? "")
                        .toLowerCase()
                        .trim()
                        .includes(search)
                );

            return statusMatch && searchMatch;
        });

    }, [statusFilter, searchTerm]);

    // ==========================================================
    // SUMMARY COUNTS
    // ==========================================================

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(
        (item) => item.status === "Pending"
    ).length;

    const inProgressComplaints = complaints.filter(
        (item) => item.status === "In Progress"
    ).length;

    const resolvedComplaints = complaints.filter(
        (item) => item.status === "Resolved"
    ).length;

    // ==========================================================
    // TRACK COMPLAINT
    // ==========================================================

    const handleTrack = (id) => {
        navigate(`/user/complaint-tracking/${id}`);
    };

    // ==========================================================
    // CLEAR SEARCH
    // ==========================================================

    const clearSearch = () => {
        setSearchTerm("");
    };

    // ==========================================================
    // RESET SEARCH + FILTER
    // ==========================================================

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
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
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
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
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
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
                            for "
                            <strong>
                                {searchTerm}
                            </strong>
                            "
                        </span>

                    )}

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

                            {filteredComplaints.length > 0 ? (

                                filteredComplaints.map(
                                    (complaint) => (

                                        <tr key={complaint.id}>

                                            {/* ID */}

                                            <td className="complaint-id">
                                                {complaint.id}
                                            </td>


                                            {/* DEPARTMENT */}

                                            <td>
                                                {complaint.department}
                                            </td>


                                            {/* COMPLAINT DATE */}

                                            <td>
                                                {complaint.date}
                                            </td>


                                            {/* RESOLVE DATE */}

                                            <td>
                                                {complaint.res_date || "-"}
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        String(
                                                            complaint.status || ""
                                                        )
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                    }`}
                                                >
                                                    {complaint.status}
                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <button
                                                    type="button"
                                                    className="track-btn"
                                                    onClick={() =>
                                                        handleTrack(
                                                            complaint.id
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

                <div className="pagination">

                    <span className="pagination-info">

                        Showing{" "}
                        {filteredComplaints.length}{" "}
                        of{" "}
                        {complaints.length}{" "}
                        complaints

                    </span>


                    <div className="pagination-buttons">

                        <button
                            type="button"
                            className="page-btn active"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="page-btn"
                        >
                            2
                        </button>

                        <button
                            type="button"
                            className="page-btn"
                        >
                            3
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MyComplaints;