
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
    
    FaPowerOff
} from "react-icons/fa";
import "./ReviewEngineer.css"

const ReviewEngineerRequest = () => {

    /* ==========================================================
       ENGINEER APPLICATION DATA
    ========================================================== */

    const [engineers, setEngineers] = useState([
        {
            applicationId: "REQ-1001",
            engineerId: "ENG-2001",

            firstName: "Amit",
            lastName: "Patel",

            email: "amit.patel@gmail.com",
            mobile: "9876543210",

            branch: "Civil Engineering",
            qualification: "B.E.",
            experience: "3",

            department: "Road & Infrastructure Department",
            role: "Engineer",

            photo: "/documents/amit.jpg",
            degreeCertificate: "/documents/amit-degree.pdf",
            experienceCertificate: "/documents/amit-experience.pdf",

            applicationStatus: "Pending",
            accountStatus: "Inactive",

            appliedDate: "07 Aug 2026",
            reviewedDate: null,
            reviewedBy: null,

            rejectionReason: ""
        },

        {
            applicationId: "REQ-1002",
            engineerId: "ENG-2002",

            firstName: "Jay",
            lastName: "Mehta",

            email: "jay.mehta@gmail.com",
            mobile: "9876543211",

            branch: "Mechanical Engineering",
            qualification: "B.Tech",
            experience: "2",

            department: "Water Department",
            role: "Engineer",

            photo: "/documents/jay.jpg",
            degreeCertificate: "/documents/jay-degree.pdf",
            experienceCertificate: "",

            applicationStatus: "Pending",
            accountStatus: "Inactive",

            appliedDate: "06 Aug 2026",
            reviewedDate: null,
            reviewedBy: null,

            rejectionReason: ""
        },

        {
            applicationId: "REQ-1003",
            engineerId: "ENG-2003",

            firstName: "Priya",
            lastName: "Shah",

            email: "priya.shah@gmail.com",
            mobile: "9876543212",

            branch: "Electrical Engineering",
            qualification: "M.Tech",
            experience: "4",

            department: "Electricity Department",
            role: "Engineer",

            photo: "/documents/priya.jpg",
            degreeCertificate: "/documents/priya-degree.pdf",
            experienceCertificate: "/documents/priya-experience.pdf",

            applicationStatus: "Approved",
            accountStatus: "Active",

            appliedDate: "05 Aug 2026",
            reviewedDate: "05 Aug 2026",
            reviewedBy: "Super Admin",

            rejectionReason: ""
        },

        {
            applicationId: "REQ-1004",
            engineerId: "ENG-2004",

            firstName: "Rakesh",
            lastName: "Patel",

            email: "rakesh.patel@gmail.com",
            mobile: "9876543213",

            branch: "Environmental Engineering",
            qualification: "M.E.",
            experience: "5",

            department: "Environment Department",
            role: "Engineer",

            photo: "/documents/rakesh.jpg",
            degreeCertificate: "/documents/rakesh-degree.pdf",
            experienceCertificate: "/documents/rakesh-experience.pdf",

            applicationStatus: "Rejected",
            accountStatus: "Inactive",

            appliedDate: "04 Aug 2026",
            reviewedDate: "04 Aug 2026",
            reviewedBy: "Super Admin",

            rejectionReason:
                "Experience certificate could not be verified."
        },

        {
            applicationId: "REQ-1005",
            engineerId: "ENG-2005",

            firstName: "Hardik",
            lastName: "Shah",

            email: "hardik.shah@gmail.com",
            mobile: "9876543214",

            branch: "Computer Engineering",
            qualification: "B.Tech",
            experience: "1",

            department: "IT & Smart City Department",
            role: "Engineer",

            photo: "/documents/hardik.jpg",
            degreeCertificate: "/documents/hardik-degree.pdf",
            experienceCertificate: "",

            applicationStatus: "Pending",
            accountStatus: "Inactive",

            appliedDate: "03 Aug 2026",
            reviewedDate: null,
            reviewedBy: null,

            rejectionReason: ""
        },

        {
            applicationId: "REQ-1006",
            engineerId: "ENG-2006",

            firstName: "Nilesh",
            lastName: "Patel",

            email: "nilesh.patel@gmail.com",
            mobile: "9876543215",

            branch: "Civil Engineering",
            qualification: "Diploma",
            experience: "6",

            department: "Road & Infrastructure Department",
            role: "Engineer",

            photo: "/documents/nilesh.jpg",
            degreeCertificate: "/documents/nilesh-degree.pdf",
            experienceCertificate: "/documents/nilesh-experience.pdf",

            applicationStatus: "Approved",
            accountStatus: "Active",

            appliedDate: "02 Aug 2026",
            reviewedDate: "02 Aug 2026",
            reviewedBy: "Super Admin",

            rejectionReason: ""
        }
    ]);

    /* ==========================================================
       STATES
    ========================================================== */

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [departmentFilter, setDepartmentFilter] =
        useState("All");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [selectedEngineer, setSelectedEngineer] =
        useState(null);

    const [showReviewModal, setShowReviewModal] =
        useState(false);

    const [showRejectModal, setShowRejectModal] =
        useState(false);

    const [rejectionReason, setRejectionReason] =
        useState("");

    const applicationsPerPage = 5;

    /* ==========================================================
       STATISTICS
    ========================================================== */

    const totalApplications =
        engineers.length;

    const pendingApplications =
        engineers.filter(
            (engineer) =>
                engineer.applicationStatus === "Pending"
        ).length;

    const approvedApplications =
        engineers.filter(
            (engineer) =>
                engineer.applicationStatus === "Approved"
        ).length;

    const rejectedApplications =
        engineers.filter(
            (engineer) =>
                engineer.applicationStatus === "Rejected"
        ).length;

    // const activeEngineers =
    //     engineers.filter(
    //         (engineer) =>
    //             engineer.accountStatus === "Active"
    //     ).length;

    /* ==========================================================
       DEPARTMENTS
    ========================================================== */

    const departments = [
        ...new Set(
            engineers.map(
                (engineer) =>
                    engineer.department
            )
        )
    ];

    /* ==========================================================
       SEARCH + FILTER
    ========================================================== */

    const filteredEngineers = useMemo(() => {

        const keyword =
            search.toLowerCase().trim();

        return engineers.filter(
            (engineer) => {

                const fullName =
                    `${engineer.firstName} ${engineer.lastName}`
                        .toLowerCase();

                const matchesSearch =
                    engineer.applicationId
                        .toLowerCase()
                        .includes(keyword) ||

                    engineer.engineerId
                        .toLowerCase()
                        .includes(keyword) ||

                    fullName.includes(keyword) ||

                    engineer.email
                        .toLowerCase()
                        .includes(keyword) ||

                    engineer.mobile
                        .includes(keyword);

                const matchesStatus =
                    statusFilter === "All" ||
                    engineer.applicationStatus ===
                        statusFilter;

                const matchesDepartment =
                    departmentFilter === "All" ||
                    engineer.department ===
                        departmentFilter;

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesDepartment
                );
            }
        );

    }, [
        engineers,
        search,
        statusFilter,
        departmentFilter
    ]);

    /* ==========================================================
       PAGINATION
    ========================================================== */

    const totalPages =
        Math.ceil(
            filteredEngineers.length /
                applicationsPerPage
        );

    const lastIndex =
        currentPage *
        applicationsPerPage;

    const firstIndex =
        lastIndex -
        applicationsPerPage;

    const currentEngineers =
        filteredEngineers.slice(
            firstIndex,
            lastIndex
        );

    const goToNextPage = () => {

        if (currentPage < totalPages) {
            setCurrentPage(
                (previous) =>
                    previous + 1
            );
        }

    };

    const goToPreviousPage = () => {

        if (currentPage > 1) {
            setCurrentPage(
                (previous) =>
                    previous - 1
            );
        }

    };

    /* ==========================================================
       RESET PAGE
    ========================================================== */

    const resetPage = () => {
        setCurrentPage(1);
    };

    /* ==========================================================
       OPEN APPLICATION
    ========================================================== */

    const openReview = (engineer) => {

        setSelectedEngineer(engineer);
        setShowReviewModal(true);

    };

    /* ==========================================================
       CLOSE REVIEW
    ========================================================== */

    const closeReview = () => {

        setShowReviewModal(false);
        setSelectedEngineer(null);

    };

    /* ==========================================================
       OPEN DOCUMENT
    ========================================================== */

    const openDocument = (fileUrl) => {

        if (!fileUrl) {
            return;
        }

        window.open(
            fileUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };

    /* ==========================================================
       APPROVE APPLICATION
    ========================================================== */

    const approveApplication = () => {

        if (!selectedEngineer) {
            return;
        }

        const reviewedDate =
            new Date().toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        setEngineers(
            (previousEngineers) =>
                previousEngineers.map(
                    (engineer) =>
                        engineer.applicationId ===
                        selectedEngineer.applicationId
                            ? {
                                ...engineer,

                                applicationStatus:
                                    "Approved",

                                accountStatus:
                                    "Active",

                                reviewedDate,

                                reviewedBy:
                                    "Super Admin",

                                rejectionReason:
                                    ""
                            }
                            : engineer
                )
        );

        setSelectedEngineer(
            (previous) => ({
                ...previous,

                applicationStatus:
                    "Approved",

                accountStatus:
                    "Active",

                reviewedDate,

                reviewedBy:
                    "Super Admin",

                rejectionReason:
                    ""
            })
        );

    };

    /* ==========================================================
       OPEN REJECT MODAL
    ========================================================== */

    const openRejectModal = () => {

        setRejectionReason("");
        setShowRejectModal(true);

    };

    /* ==========================================================
       CLOSE REJECT MODAL
    ========================================================== */

    const closeRejectModal = () => {

        setShowRejectModal(false);
        setRejectionReason("");

    };

    /* ==========================================================
       REJECT APPLICATION
    ========================================================== */

    const rejectApplication = () => {

        if (
            !selectedEngineer ||
            !rejectionReason.trim()
        ) {
            return;
        }

        const reviewedDate =
            new Date().toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        const reason =
            rejectionReason.trim();

        setEngineers(
            (previousEngineers) =>
                previousEngineers.map(
                    (engineer) =>
                        engineer.applicationId ===
                        selectedEngineer.applicationId
                            ? {
                                ...engineer,

                                applicationStatus:
                                    "Rejected",

                                accountStatus:
                                    "Inactive",

                                reviewedDate,

                                reviewedBy:
                                    "Super Admin",

                                rejectionReason:
                                    reason
                            }
                            : engineer
                )
        );

        setSelectedEngineer(
            (previous) => ({
                ...previous,

                applicationStatus:
                    "Rejected",

                accountStatus:
                    "Inactive",

                reviewedDate,

                reviewedBy:
                    "Super Admin",

                rejectionReason:
                    reason
            })
        );

        closeRejectModal();

    };

    /* ==========================================================
       ACTIVATE / DEACTIVATE APPROVED ENGINEER
    ========================================================== */

    const toggleAccountStatus = () => {

        if (!selectedEngineer) {
            return;
        }

        if (
            selectedEngineer.applicationStatus !==
            "Approved"
        ) {
            return;
        }

        const newStatus =
            selectedEngineer.accountStatus ===
            "Active"
                ? "Inactive"
                : "Active";

        setEngineers(
            (previousEngineers) =>
                previousEngineers.map(
                    (engineer) =>
                        engineer.applicationId ===
                        selectedEngineer.applicationId
                            ? {
                                ...engineer,
                                accountStatus:
                                    newStatus
                            }
                            : engineer
                )
        );

        setSelectedEngineer(
            (previous) => ({
                ...previous,
                accountStatus:
                    newStatus
            })
        );

    };

    /* ==========================================================
       JSX
    ========================================================== */

    return (
        <div className="engineer-request-page">

            {/* ==================================================
               PAGE HEADER
            ================================================== */}

            <div className="engineer-request-header">

                <div className="header-content">

                    <div className="header-icon">
                        <FaUserTie />
                    </div>

                    <div>

                        <h1>
                            Engineers Applications
                        </h1>

                        <p>
                            Review engineer applications,
                            manage approvals and control
                            engineer access.
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

                        <span>
                            Total Applications
                        </span>

                        <strong>
                            {totalApplications}
                        </strong>

                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon pending">
                        <FaClock />
                    </div>

                    <div>

                        <span>
                            Pending Review
                        </span>

                        <strong>
                            {pendingApplications}
                        </strong>

                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon approved">
                        <FaCheckCircle />
                    </div>

                    <div>

                        <span>
                            Approved
                        </span>

                        <strong>
                            {approvedApplications}
                        </strong>

                    </div>

                </div>

                <div className="request-stat-card">

                    <div className="request-stat-icon rejected">
                        <FaTimesCircle />
                    </div>

                    <div>

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {rejectedApplications}
                        </strong>

                    </div>

                </div>

            </div>

            {/* ==================================================
               ACTIVE ENGINEER SUMMARY
            ================================================== */}

            {/* <div className="active-engineer-summary">

                <div>

                    <div className="active-summary-icon">
                        <FaCheckCircle />
                    </div>

                    <div>

                       
                        <strong>
                            {activeEngineers}
                        </strong>

                    </div>

                </div>

                <p>
                    Approved engineers can receive
                    department complaints and work
                    assignments.
                </p>

            </div> */}

            {/* ==================================================
               SEARCH + FILTER
            ================================================== */}

            <div className="request-toolbar">

                <div className="request-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search request ID, engineer name, email or mobile..."
                        value={search}
                        onChange={(event) => {

                            setSearch(
                                event.target.value
                            );

                            resetPage();

                        }}
                    />

                </div>

                <div className="request-filters">

                    <select
                        value={statusFilter}
                        onChange={(event) => {

                            setStatusFilter(
                                event.target.value
                            );

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
                        onChange={(event) => {

                            setDepartmentFilter(
                                event.target.value
                            );

                            resetPage();

                        }}
                    >

                        <option value="All">
                            All Departments
                        </option>

                        {departments.map(
                            (department) => (

                                <option
                                    key={department}
                                    value={department}
                                >
                                    {department}
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>

            {/* ==================================================
               APPLICATION TABLE
            ================================================== */}

            <div className="request-card">

                <div className="request-card-header">

                    <div>

                        <h2>
                            Engineer Applications
                        </h2>

                        <p>
                            Review submitted applications
                            before assigning engineers
                            to departments.
                        </p>

                    </div>

                    <span className="result-count">
                        {filteredEngineers.length} Applications
                    </span>

                </div>

                <div className="request-table-wrapper">

                    <table className="request-table">

                        <thead>

                            <tr>

                                <th>
                                    Request ID
                                </th>

                                <th>
                                    Engineer
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Qualification
                                </th>

                                <th>
                                    Experience
                                </th>

                                <th>
                                    Applied Date
                                </th>

                                <th>
                                    Application
                                </th>

                                <th>
                                    Account
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentEngineers.length ===
                            0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="request-empty"
                                    >
                                        No engineer applications
                                        found.
                                    </td>

                                </tr>

                            ) : (

                                currentEngineers.map(
                                    (engineer) => (

                                        <tr
                                            key={
                                                engineer.applicationId
                                            }
                                        >

                                            <td>

                                                <span className="request-id">
                                                    {
                                                        engineer.applicationId
                                                    }
                                                </span>

                                                <small className="table-secondary-id">
                                                    {
                                                        engineer.engineerId
                                                    }
                                                </small>

                                            </td>

                                            <td>

                                                <div className="engineer-name-cell">

                                                    <div className="engineer-avatar">

                                                        {
                                                            engineer.firstName.charAt(
                                                                0
                                                            )
                                                        }

                                                        {
                                                            engineer.lastName.charAt(
                                                                0
                                                            )
                                                        }

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                engineer.firstName
                                                            }{" "}
                                                            {
                                                                engineer.lastName
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                engineer.email
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
                                                            engineer.department
                                                        }
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {
                                                    engineer.qualification
                                                }
                                            </td>

                                            <td>
                                                {
                                                    engineer.experience
                                                }{" "}
                                                Years
                                            </td>

                                            <td>
                                                {
                                                    engineer.appliedDate
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`request-status ${engineer.applicationStatus.toLowerCase()}`}
                                                >
                                                    {
                                                        engineer.applicationStatus
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                                {engineer.applicationStatus ===
                                                    "Approved" ? (

                                                    <span
                                                        className={`account-status ${engineer.accountStatus.toLowerCase()}`}
                                                    >
                                                        {
                                                            engineer.accountStatus
                                                        }
                                                    </span>

                                                ) : (

                                                    <span className="account-status inactive">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <button
                                                    className="review-btn"
                                                    onClick={() =>
                                                        openReview(
                                                            engineer
                                                        )
                                                    }
                                                >

                                                    <FaEye />

                                                    {engineer.applicationStatus ===
                                                    "Pending"
                                                        ? "Review"
                                                        : "View"}

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
          <div className="pagination-wrapper">
            {totalPages > 1 && (

                <div className="pagination">

                    <button
                        onClick={
                            goToPreviousPage
                        }
                        disabled={
                            currentPage === 1
                        }
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
                        onClick={
                            goToNextPage
                        }
                        disabled={
                            currentPage ===
                            totalPages
                        }
                    >

                        Next

                        <FaChevronRight />

                    </button>

                </div>

            )}
</div>
            {/* ==================================================
               REVIEW MODAL
            ================================================== */}

            {showReviewModal &&
                selectedEngineer && (

                    <div
                        className="review-overlay"
                        onClick={
                            closeReview
                        }
                    >

                        <div
                            className="review-modal"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* MODAL HEADER */}

                            <div className="review-header">

                                <div>

                                    <span>
                                        Engineer Application
                                    </span>

                                    <h2>
                                        Application Review
                                    </h2>

                                </div>

                                <button
                                    className="review-close"
                                    onClick={
                                        closeReview
                                    }
                                >
                                    <FaTimes />
                                </button>

                            </div>

                            {/* MODAL BODY */}

                            <div className="review-body">

                                {/* APPLICATION STATUS */}

                                <div
                                    className={`application-status-banner ${selectedEngineer.applicationStatus.toLowerCase()}`}
                                >

                                    {selectedEngineer.applicationStatus ===
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
                                                    administrator
                                                    review.
                                                </span>

                                            </div>
                                        </>
                                    )}

                                    {selectedEngineer.applicationStatus ===
                                        "Approved" && (
                                        <>
                                            <FaCheckCircle />

                                            <div>

                                                <strong>
                                                    Application
                                                    Approved
                                                </strong>

                                                <span>
                                                    This engineer has
                                                    been approved for
                                                    department work.
                                                </span>

                                            </div>
                                        </>
                                    )}

                                    {selectedEngineer.applicationStatus ===
                                        "Rejected" && (
                                        <>
                                            <FaTimesCircle />

                                            <div>

                                                <strong>
                                                    Application
                                                    Rejected
                                                </strong>

                                                <span>
                                                    This application
                                                    was rejected by
                                                    the administrator.
                                                </span>

                                            </div>
                                        </>
                                    )}

                                </div>

                                {/* PERSONAL INFORMATION */}

                                <div className="review-section">

                                    <div className="section-title">

                                        <FaUserTie />

                                        <div>

                                            <h3>
                                                Personal Information
                                            </h3>

                                            <p>
                                                Applicant identity
                                                and contact details
                                            </p>

                                        </div>

                                    </div>

                                    <div className="profile-review">

                                        <div className="profile-photo">

                                            {
                                                selectedEngineer.firstName.charAt(
                                                    0
                                                )
                                            }

                                            {
                                                selectedEngineer.lastName.charAt(
                                                    0
                                                )
                                            }

                                        </div>

                                        <div className="profile-name">

                                            <h2>

                                                {
                                                    selectedEngineer.firstName
                                                }{" "}

                                                {
                                                    selectedEngineer.lastName
                                                }

                                            </h2>

                                            <span>

                                                Engineer ID:{" "}

                                                {
                                                    selectedEngineer.engineerId
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
                                                        selectedEngineer.email
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
                                                        selectedEngineer.mobile
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
                                                Engineering,
                                                qualification and
                                                department details
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
                                                        selectedEngineer.branch
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaGraduationCap />

                                            <div>

                                                <label>
                                                    Qualification
                                                </label>

                                                <strong>
                                                    {
                                                        selectedEngineer.qualification
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
                                                        selectedEngineer.experience
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
                                                        selectedEngineer.department
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaUserTie />

                                            <div>

                                                <label>
                                                    Requested Role
                                                </label>

                                                <strong>
                                                    {
                                                        selectedEngineer.role
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="detail-item">

                                            <FaClock />

                                            <div>

                                                <label>
                                                    Applied Date
                                                </label>

                                                <strong>
                                                    {
                                                        selectedEngineer.appliedDate
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
                                                Verify all uploaded
                                                documents before
                                                approving the
                                                application.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="documents-grid">

                                        {/* PHOTO */}

                                        <div className="document-card">

                                            <div className="document-icon">

                                                <FaUserTie />

                                            </div>

                                            <div className="document-info">

                                                <strong>
                                                    Profile Photo
                                                </strong>

                                                <span>

                                                    {
                                                        selectedEngineer.photo ||
                                                        "Not Provided"
                                                    }

                                                </span>

                                            </div>

                                            {selectedEngineer.photo && (

                                                <button
                                                    className="document-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        openDocument(
                                                            selectedEngineer.photo
                                                        )
                                                    }
                                                >

                                                    <FaEye />

                                                    View

                                                </button>

                                            )}

                                        </div>

                                        {/* DEGREE */}

                                        <div className="document-card">

                                            <div className="document-icon">

                                                <FaGraduationCap />

                                            </div>

                                            <div className="document-info">

                                                <strong>
                                                    Degree Certificate
                                                </strong>

                                                <span>

                                                    {
                                                        selectedEngineer.degreeCertificate ||
                                                        "Not Provided"
                                                    }

                                                </span>

                                            </div>

                                            {selectedEngineer.degreeCertificate && (

                                                <button
                                                    className="document-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        openDocument(
                                                            selectedEngineer.degreeCertificate
                                                        )
                                                    }
                                                >

                                                    <FaEye />

                                                    View

                                                </button>

                                            )}

                                        </div>

                                        {/* EXPERIENCE */}

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
                                                        selectedEngineer.experienceCertificate ||
                                                        "Not Provided"
                                                    }

                                                </span>

                                            </div>

                                            {selectedEngineer.experienceCertificate && (

                                                <button
                                                    className="document-btn"
                                                    type="button"
                                                    onClick={() =>
                                                        openDocument(
                                                            selectedEngineer.experienceCertificate
                                                        )
                                                    }
                                                >

                                                    <FaEye />

                                                    View

                                                </button>

                                            )}

                                        </div>

                                    </div>

                                </div>

                                {/* REVIEW INFORMATION */}

                                {selectedEngineer.reviewedDate && (

                                    <div className="review-section">

                                        <div className="section-title">

                                            <FaCheckCircle />

                                            <div>

                                                <h3>
                                                    Review Information
                                                </h3>

                                                <p>
                                                    Administrator
                                                    decision details
                                                </p>

                                            </div>

                                        </div>

                                        <div className="detail-grid">

                                            <div className="detail-item">

                                                <FaClock />

                                                <div>

                                                    <label>
                                                        Reviewed Date
                                                    </label>

                                                    <strong>
                                                        {
                                                            selectedEngineer.reviewedDate
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="detail-item">

                                                <FaUserTie />

                                                <div>

                                                    <label>
                                                        Reviewed By
                                                    </label>

                                                    <strong>
                                                        {
                                                            selectedEngineer.reviewedBy
                                                        }
                                                    </strong>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )}

                                {/* REJECTION REASON */}

                                {selectedEngineer.applicationStatus ===
                                    "Rejected" &&
                                    selectedEngineer.rejectionReason && (

                                        <div className="rejection-display">

                                            <FaTimesCircle />

                                            <div>

                                                <strong>
                                                    Rejection Reason
                                                </strong>

                                                <p>
                                                    {
                                                        selectedEngineer.rejectionReason
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    )}

                                {/* ACTIVE ACCOUNT */}

                                {selectedEngineer.applicationStatus ===
                                    "Approved" && (

                                    <div className="account-control-section">

                                        <div>

                                            <strong>
                                                Engineer Account
                                            </strong>

                                            <span>
                                                Control whether this
                                                approved engineer can
                                                access the system.
                                            </span>

                                        </div>

                                        <button
                                            className={
                                                selectedEngineer.accountStatus ===
                                                "Active"
                                                    ? "deactivate-btn"
                                                    : "activate-btn"
                                            }
                                            onClick={
                                                toggleAccountStatus
                                            }
                                        >

                                            <FaPowerOff />

                                            {selectedEngineer.accountStatus ===
                                            "Active"
                                                ? "Deactivate"
                                                : "Activate"}

                                        </button>

                                    </div>

                                )}

                            </div>

                            {/* MODAL FOOTER */}

                            <div className="review-footer">

                                <button
                                    className="close-review-btn"
                                    onClick={
                                        closeReview
                                    }
                                >
                                    Close
                                </button>

                                {selectedEngineer.applicationStatus ===
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
                selectedEngineer && (

                    <div
                        className="reject-overlay"
                        onClick={
                            closeRejectModal
                        }
                    >

                        <div
                            className="reject-modal"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            <div className="reject-icon">

                                <FaTimesCircle />

                            </div>

                            <h2>
                                Reject Application?
                            </h2>

                            <p>

                                Please provide a clear reason
                                for rejecting this engineer
                                application.

                            </p>

                            <textarea
                                value={
                                    rejectionReason
                                }
                                onChange={(event) =>
                                    setRejectionReason(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter rejection reason..."
                                rows="5"
                            />

                            <div className="reject-actions">

                                <button
                                    className="cancel-reject-btn"
                                    onClick={
                                        closeRejectModal
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

export default ReviewEngineerRequest;

