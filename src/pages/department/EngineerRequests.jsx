import { useMemo, useState } from "react";
import {
    FaSearch,
    FaEye,
    FaCheck,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaUserTie,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaBuilding,
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaBriefcase,
    FaFileAlt,
    FaDownload,
} from "react-icons/fa";
import "./EngineerRequests.css";

const EngineerRequests = () => {

    /* ==========================================================
       ENGINEER APPLICATION DATA
    ========================================================== */

    const [applications, setApplications] = useState([
        {
            id: "REQ-1001",
            engineerId: "ENG-2001",
            firstName: "Amit",
            lastName: "Patel",
            email: "amit.patel@gmail.com",
            mobile: "9876543210",
            branch: "Civil Engineering",
            qualification: "B.E.",
            experience: "3",
            department: "Road & Infrastructure Department",
            appliedDate: "07 Aug 2026",
            status: "Pending",
            photo: "/FixMyCity/public/amit.jpg",
            degree: "/FixMyCity/public/amit-degree.jpeg",
            experienceCertificate: "/FixMyCity/public/experienceLatter.png",
        },
        {
            id: "REQ-1002",
            engineerId: "ENG-2002",
            firstName: "Jay",
            lastName: "Mehta",
            email: "jay.mehta@gmail.com",
            mobile: "9876543211",
            branch: "Mechanical Engineering",
            qualification: "B.Tech",
            experience: "2",
            department: "Water Department",
            appliedDate: "06 Aug 2026",
            status: "Pending",
            photo: "jay.jpg",
            degree: "jay-degree.pdf",
            experienceCertificate: null,
        },
        {
            id: "REQ-1003",
            engineerId: "ENG-2003",
            firstName: "Priya",
            lastName: "Shah",
            email: "priya.shah@gmail.com",
            mobile: "9876543212",
            branch: "Electrical Engineering",
            qualification: "M.Tech",
            experience: "4",
            department: "Electricity Department",
            appliedDate: "05 Aug 2026",
            status: "Approved",
            photo: "priya.jpg",
            degree: "priya-degree.pdf",
            experienceCertificate: "priya-experience.pdf",
        },
        {
            id: "REQ-1004",
            engineerId: "ENG-2004",
            firstName: "Rakesh",
            lastName: "Patel",
            email: "rakesh.patel@gmail.com",
            mobile: "9876543213",
            branch: "Environmental Engineering",
            qualification: "M.E.",
            experience: "5",
            department: "Environment Department",
            appliedDate: "04 Aug 2026",
            status: "Rejected",
            photo: "rakesh.jpg",
            degree: "rakesh-degree.pdf",
            experienceCertificate: "rakesh-experience.pdf",
            rejectionReason: "Experience certificate could not be verified.",
        },
        {
            id: "REQ-1005",
            engineerId: "ENG-2005",
            firstName: "Hardik",
            lastName: "Shah",
            email: "hardik.shah@gmail.com",
            mobile: "9876543214",
            branch: "Computer Engineering",
            qualification: "B.Tech",
            experience: "1",
            department: "IT & Smart City Department",
            appliedDate: "03 Aug 2026",
            status: "Pending",
            photo: "hardik.jpg",
            degree: "hardik-degree.pdf",
            experienceCertificate: null,
        },
        {
            id: "REQ-1006",
            engineerId: "ENG-2006",
            firstName: "Nilesh",
            lastName: "Patel",
            email: "nilesh.patel@gmail.com",
            mobile: "9876543215",
            branch: "Civil Engineering",
            qualification: "Diploma",
            experience: "6",
            department: "Road & Infrastructure Department",
            appliedDate: "02 Aug 2026",
            status: "Approved",
            photo: "nilesh.jpg",
            degree: "nilesh-degree.pdf",
            experienceCertificate: "nilesh-experience.pdf",
        },
    ]);

    /* ==========================================================
       STATES
    ========================================================== */

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [departmentFilter, setDepartmentFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 5;

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    /* ==========================================================
       STATISTICS
    ========================================================== */

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (item) => item.status === "Pending"
    ).length;

    const approvedApplications = applications.filter(
        (item) => item.status === "Approved"
    ).length;

    const rejectedApplications = applications.filter(
        (item) => item.status === "Rejected"
    ).length;

    /* ==========================================================
       DEPARTMENT LIST
    ========================================================== */

    const departments = [
        ...new Set(applications.map((item) => item.department)),
    ];

    /* ==========================================================
       FILTER APPLICATIONS
    ========================================================== */

    const filteredApplications = useMemo(() => {

        const keyword = search.toLowerCase();

        return applications.filter((item) => {

            const matchesSearch =
                item.id.toLowerCase().includes(keyword) ||
                item.engineerId.toLowerCase().includes(keyword) ||
                `${item.firstName} ${item.lastName}`
                    .toLowerCase()
                    .includes(keyword) ||
                item.email.toLowerCase().includes(keyword) ||
                item.mobile.includes(keyword);

            const matchesStatus =
                statusFilter === "All" ||
                item.status === statusFilter;

            const matchesDepartment =
                departmentFilter === "All" ||
                item.department === departmentFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesDepartment
            );
        });

    }, [
        applications,
        search,
        statusFilter,
        departmentFilter,
    ]);

    /* ==========================================================
       PAGINATION
    ========================================================== */

    const totalPages = Math.ceil(
        filteredApplications.length / applicationsPerPage
    );

    const indexOfLastApplication =
        currentPage * applicationsPerPage;

    const indexOfFirstApplication =
        indexOfLastApplication - applicationsPerPage;

    const currentApplications =
        filteredApplications.slice(
            indexOfFirstApplication,
            indexOfLastApplication
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
       OPEN REVIEW
    ========================================================== */

    const openReview = (application) => {

        setSelectedApplication(application);
        setShowReviewModal(true);

    };

    /* ==========================================================
       APPROVE APPLICATION
    ========================================================== */

    const approveApplication = () => {

        if (!selectedApplication) {
            return;
        }

        setApplications((prev) =>
            prev.map((application) =>
                application.id === selectedApplication.id
                    ? {
                        ...application,
                        status: "Approved",
                    }
                    : application
            )
        );

        setSelectedApplication((prev) => ({
            ...prev,
            status: "Approved",
        }));

    };

    /* ==========================================================
       OPEN REJECT MODAL
    ========================================================== */

    const openRejectModal = () => {

        setRejectionReason("");
        setShowRejectModal(true);

    };

    /* ==========================================================
       REJECT APPLICATION
    ========================================================== */

    const rejectApplication = () => {

        if (!selectedApplication || !rejectionReason.trim()) {
            return;
        }

        setApplications((prev) =>
            prev.map((application) =>
                application.id === selectedApplication.id
                    ? {
                        ...application,
                        status: "Rejected",
                        rejectionReason:
                            rejectionReason.trim(),
                    }
                    : application
            )
        );

        setSelectedApplication((prev) => ({
            ...prev,
            status: "Rejected",
            rejectionReason:
                rejectionReason.trim(),
        }));

        setShowRejectModal(false);

    };

    /* ==========================================================
       RESET PAGE WHEN FILTER CHANGES
    ========================================================== */

    const resetPage = () => {
        setCurrentPage(1);
    };

    /* ==========================================================
       JSX
    ========================================================== */

    return (
        <div className="engineer-request-pages">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="engineer-request-header">

                <div className="header-content">

                    <div className="header-icon">
                        <FaUserTie />
                    </div>

                    <div>
                        <h1>Engineer Applications</h1>

                        <p>
                            Review engineer applications submitted
                            for department assignment.
                        </p>
                    </div>

                </div>

            </div>

            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="request-stat-grid">

                <div className="request-stat-card">

                    <div className="request-stat-icon total">
                        <FaUserTie />
                    </div>

                    <div>
                        <span>Total Applications</span>
                        <strong>{totalApplications}</strong>
                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon pending">
                        <FaClock />
                    </div>

                    <div>
                        <span>Pending Review</span>
                        <strong>{pendingApplications}</strong>
                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon approved">
                        <FaCheckCircle />
                    </div>

                    <div>
                        <span>Approved</span>
                        <strong>{approvedApplications}</strong>
                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon rejected">
                        <FaTimesCircle />
                    </div>

                    <div>
                        <span>Rejected</span>
                        <strong>{rejectedApplications}</strong>
                    </div>

                </div>

            </div>

            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <div className="request-toolbar">

                <div className="request-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search ID, name, email or mobile..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            resetPage();
                        }}
                    />

                </div>

                <div className="request-filters">

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            resetPage();
                        }}
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Approved">
                            Approved
                        </option>

                        <option value="Rejected">
                            Rejected
                        </option>

                    </select>

                    <select
                        value={departmentFilter}
                        onChange={(e) => {
                            setDepartmentFilter(e.target.value);
                            resetPage();
                        }}
                    >

                        <option value="All">
                            All Departments
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department}
                                value={department}
                            >
                                {department}
                            </option>
                        ))}

                    </select>

                </div>

            </div>

            {/* ==================================================
                APPLICATION TABLE
            ================================================== */}

            <div className="request-card">

                <div className="request-card-header">

                    <div>
                        <h2>Engineer Request List</h2>

                        <p>
                            Review and manage submitted engineer
                            applications.
                        </p>
                    </div>

                    <span className="result-count">
                        {filteredApplications.length} Applications
                    </span>

                </div>

                <div className="request-table-wrapper">

                    <table className="request-table">

                        <thead>

                            <tr>

                                <th>Request ID</th>

                                <th>Engineer</th>

                                <th>Department</th>

                                <th>Qualification</th>

                                <th>Experience</th>

                                <th>Applied Date</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentApplications.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="request-empty"
                                    >
                                        No engineer applications
                                        found.
                                    </td>

                                </tr>

                            ) : (

                                currentApplications.map(
                                    (application) => (

                                        <tr
                                            key={
                                                application.id
                                            }
                                        >

                                            <td>

                                                <span className="request-id">
                                                    {
                                                        application.id
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                                <div className="engineer-name-cell">

                                                    <div className="engineer-avatar">
                                                        {
                                                            application.firstName.charAt(
                                                                0
                                                            )
                                                        }
                                                        {
                                                            application.lastName.charAt(
                                                                0
                                                            )
                                                        }
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                application.firstName
                                                            }{" "}
                                                            {
                                                                application.lastName
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                application.engineerId
                                                            }
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                <div className="department-cell">

                                                    <FaBuilding />

                                                    <span>
                                                        {
                                                            application.department
                                                        }
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {
                                                    application.qualification
                                                }
                                            </td>

                                            <td>
                                                {
                                                    application.experience
                                                }{" "}
                                                Years
                                            </td>

                                            <td>
                                                {
                                                    application.appliedDate
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`request-status ${application.status.toLowerCase()}`}
                                                >
                                                    {application.status}
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="review-btn"
                                                    onClick={() =>
                                                        openReview(
                                                            application
                                                        )
                                                    }
                                                >
                                                    <FaEye />
                                                    Review
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ==================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (

                <div className="request-pagination">

                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft />
                        Previous
                    </button>

                    <div>

                        {[...Array(totalPages)].map(
                            (_, index) => (

                                <button
                                    key={index}
                                    className={
                                        currentPage ===
                                        index + 1
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            index + 1
                                        )
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
                            currentPage === totalPages
                        }
                    >
                        Next
                        <FaChevronRight />
                    </button>

                </div>

            )}

            {/* ==================================================
                REVIEW APPLICATION MODAL
            ================================================== */}

            {showReviewModal &&
                selectedApplication && (

                    <div
                        className="review-overlay"
                        onClick={() =>
                            setShowReviewModal(false)
                        }
                    >

                        <div
                            className="review-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* MODAL HEADER */}

                            <div className="review-header">

                                <div>

                                    <span>
                                        Engineer Application
                                    </span>

                                    <h2>
                                        Review Application
                                    </h2>

                                </div>

                                <button
                                    className="review-close"
                                    onClick={() =>
                                        setShowReviewModal(
                                            false
                                        )
                                    }
                                >
                                    <FaTimes />
                                </button>

                            </div>

                            {/* MODAL BODY */}

                            <div className="review-body">

                                {/* APPLICATION STATUS */}

                                <div
                                    className={`application-status-banner ${selectedApplication.status.toLowerCase()}`}
                                >

                                    {selectedApplication.status ===
                                        "Pending" && (
                                        <>
                                            <FaClock />
                                            <div>
                                                <strong>
                                                    Application
                                                    Pending
                                                </strong>
                                                <span>
                                                    This application
                                                    is waiting for
                                                    admin review.
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {selectedApplication.status ===
                                        "Approved" && (
                                        <>
                                            <FaCheckCircle />
                                            <div>
                                                <strong>
                                                    Application
                                                    Approved
                                                </strong>
                                                <span>
                                                    This engineer
                                                    has been approved.
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {selectedApplication.status ===
                                        "Rejected" && (
                                        <>
                                            <FaTimesCircle />
                                            <div>
                                                <strong>
                                                    Application
                                                    Rejected
                                                </strong>
                                                <span>
                                                    This engineer
                                                    application was
                                                    rejected.
                                                </span>
                                            </div>
                                        </>
                                    )}

                                </div>

                                {/* BASIC INFORMATION */}

                                <div className="review-section">

                                    <div className="section-title">

                                        <FaUserTie />

                                        <div>
                                            <h3>
                                                Personal Information
                                            </h3>

                                            <p>
                                                Engineer's basic
                                                application details
                                            </p>
                                        </div>

                                    </div>

                                    <div className="profile-review">

                                        <div className="profile-photo">

                                            {selectedApplication.firstName.charAt(
                                                0
                                            )}
                                            {selectedApplication.lastName.charAt(
                                                0
                                            )}

                                        </div>

                                        <div className="profile-name">

                                            <h2>
                                                {
                                                    selectedApplication.firstName
                                                }{" "}
                                                {
                                                    selectedApplication.lastName
                                                }
                                            </h2>

                                            <span>
                                                {
                                                    selectedApplication.engineerId
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    <div className="detail-grid">

                                        <div className="detail-item">

                                            <FaEnvelope />

                                            <div>
                                                <label>
                                                    Email Address
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.email
                                                    }
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaPhone />

                                            <div>
                                                <label>
                                                    Mobile Number
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.mobile
                                                    }
                                                </strong>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* PROFESSIONAL INFORMATION */}

                                <div className="review-section">

                                    <div className="section-title">

                                        <FaGraduationCap />

                                        <div>
                                            <h3>
                                                Professional
                                                Information
                                            </h3>

                                            <p>
                                                Engineering and
                                                qualification details
                                            </p>
                                        </div>

                                    </div>

                                    <div className="detail-grid">

                                        <div className="detail-item">

                                            <FaGraduationCap />

                                            <div>
                                                <label>
                                                    Engineering Branch
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.branch
                                                    }
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaGraduationCap />

                                            <div>
                                                <label>
                                                    Highest Qualification
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.qualification
                                                    }
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaBriefcase />

                                            <div>
                                                <label>
                                                    Experience
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.experience
                                                    }{" "}
                                                    Years
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaBuilding />

                                            <div>
                                                <label>
                                                    Requested Department
                                                </label>

                                                <strong>
                                                    {
                                                        selectedApplication.department
                                                    }
                                                </strong>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* DOCUMENTS */}

                                <div className="review-section">

                                    <div className="section-title">

                                        <FaFileAlt />

                                        <div>
                                            <h3>
                                                Submitted Documents
                                            </h3>

                                            <p>
                                                Review documents
                                                submitted by the
                                                engineer.
                                            </p>
                                        </div>

                                    </div>

                                    <div className="documents-grid">

                                        <div className="document-card">

                                            <div className="document-icon">
                                                <FaUserTie />
                                            </div>

                                            <div className="document-info">

                                                <strong>
                                                    Passport Photo
                                                </strong>

                                                <span>
                                                    {
                                                        selectedApplication.photo
                                                    }
                                                </span>

                                            </div>

                                            <button
                                                className="document-btn"
                                                type="button"
                                            >
                                                <FaEye />
                                                View
                                            </button>

                                        </div>

                                        <div className="document-card">

                                            <div className="document-icon">
                                                <FaFileAlt />
                                            </div>

                                            <div className="document-info">

                                                <strong>
                                                    Degree Certificate
                                                </strong>

                                                <span>
                                                    {
                                                        selectedApplication.degree
                                                    }
                                                </span>

                                            </div>

                                            <button
                                                className="document-btn"
                                                type="button"
                                            >
                                                <FaDownload />
                                                View
                                            </button>

                                        </div>

                                        <div className="document-card">

                                            <div className="document-icon">
                                                <FaBriefcase />
                                            </div>

                                            <div className="document-info">

                                                <strong>
                                                    Experience
                                                    Certificate
                                                </strong>

                                                <span>
                                                    {
                                                        selectedApplication.experienceCertificate ||
                                                        "Not Provided"
                                                    }
                                                </span>

                                            </div>

                                            {selectedApplication.experienceCertificate && (
                                                <button
                                                    className="document-btn"
                                                    type="button"
                                                >
                                                    <FaDownload />
                                                    View
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>

                                {/* REJECTION REASON */}

                                {selectedApplication.status ===
                                    "Rejected" &&
                                    selectedApplication.rejectionReason && (

                                        <div className="rejection-display">

                                            <FaTimesCircle />

                                            <div>

                                                <strong>
                                                    Rejection Reason
                                                </strong>

                                                <p>
                                                    {
                                                        selectedApplication.rejectionReason
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    )}

                            </div>

                            {/* MODAL FOOTER */}

                            <div className="review-footer">

                                <button
                                    className="close-review-btn"
                                    onClick={() =>
                                        setShowReviewModal(
                                            false
                                        )
                                    }
                                >
                                    Close
                                </button>

                                {selectedApplication.status ===
                                    "Pending" && (

                                    <div className="review-actions">

                                        <button
                                            className="reject-application-btn"
                                            onClick={
                                                openRejectModal
                                            }
                                        >
                                            <FaTimes />
                                            Reject Application
                                        </button>

                                        <button
                                            className="approve-application-btn"
                                            onClick={
                                                approveApplication
                                            }
                                        >
                                            <FaCheck />
                                            Approve Application
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}

            {/* ==================================================
                REJECT MODAL
            ================================================== */}

            {showRejectModal &&
                selectedApplication && (

                    <div
                        className="reject-overlay"
                        onClick={() =>
                            setShowRejectModal(false)
                        }
                    >

                        <div
                            className="reject-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div className="reject-icon">
                                <FaTimesCircle />
                            </div>

                            <h2>
                                Reject Application?
                            </h2>

                            <p>
                                Please provide a reason for
                                rejecting this engineer
                                application.
                            </p>

                            <textarea
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter rejection reason..."
                                rows="5"
                            />

                            <div className="reject-actions">

                                <button
                                    className="cancel-reject-btn"
                                    onClick={() =>
                                        setShowRejectModal(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="confirm-reject-btn"
                                    onClick={
                                        rejectApplication
                                    }
                                    disabled={
                                        !rejectionReason.trim()
                                    }
                                >
                                    <FaTimes />
                                    Reject Application
                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </div>
    );
};

export default EngineerRequests;