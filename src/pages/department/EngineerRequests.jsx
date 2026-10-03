import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, BASE_URL } from "../../api/axios";
import "./EngineerRequest.css";

import {
    FaUserTie,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle,
    FaPowerOff,
    FaEye,
    FaSyncAlt,
    FaTimes,
    FaBuilding,
    FaGraduationCap,
    FaBriefcase,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFileAlt
} from "react-icons/fa";

const ENGINEER_REQUEST_API =
    `${API_BASE_URL}/admin/engineers/requests`;

const getToken = () => {
    return (
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("jwt") ||
        ""
    );
};

const formatDate = (date) => {
    if (!date) {
        return "Not Available";
    }

    try {
        return new Date(date).toLocaleDateString("en-IN");
    } catch {
        return date;
    }
};

const getFullName = (engineer) => {
    const firstName =
        engineer.firstName ||
        engineer.user?.firstName ||
        "";

    const lastName =
        engineer.lastName ||
        engineer.user?.lastName ||
        "";

    const fullName =
        `${firstName} ${lastName}`.trim();

    return fullName || "Unknown Engineer";
};

const getDepartmentName = (engineer) => {
    return (
        engineer.department ||
        engineer.departmentName ||
        engineer.department?.name ||
        engineer.department?.departmentName ||
        engineer.user?.department ||
        "Unknown Department"
    );
};

const getEngineerId = (engineer) => {
    return (
        engineer.engineerId ||
        engineer.id ||
        engineer.user?.engineerId ||
        null
    );
};

const getUserId = (engineer) => {
    return (
        engineer.userId ||
        engineer.user?.userId ||
        null
    );
};

const getActiveStatus = (engineer) => {
    if (
        engineer.isActive !== undefined &&
        engineer.isActive !== null
    ) {
        return Boolean(engineer.isActive);
    }

    if (
        engineer.user?.isActive !== undefined &&
        engineer.user?.isActive !== null
    ) {
        return Boolean(engineer.user.isActive);
    }

    return false;
};

const getRejectedStatus = (engineer) => {
    if (
        engineer.isRejected !== undefined &&
        engineer.isRejected !== null
    ) {
        return Boolean(engineer.isRejected);
    }

    return false;
};

function EngineerRequest() {

    const [engineers, setEngineers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [selectedEngineer, setSelectedEngineer] =
        useState(null);

    const [showDetails, setShowDetails] =
        useState(false);

    const [showRejectModal, setShowRejectModal] =
        useState(false);

    const [rejectReason, setRejectReason] =
        useState("");

    const [processingId, setProcessingId] =
        useState(null);


    /*
    ==========================================================
    LOAD ENGINEER REQUESTS
    ==========================================================
    */

    useEffect(() => {
        loadEngineerRequests();
    }, []);


    const loadEngineerRequests = async () => {

        try {

            setLoading(true);

            const token = getToken();

            if (!token) {
                alert(
                    "You are not logged in. Please login again."
                );
                return;
            }

            const response =
                await fetch(
                    ENGINEER_REQUEST_API,
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";

                let message =
                    "Unable to load engineer requests.";

                try {

                    if (
                        contentType.includes(
                            "application/json"
                        )
                    ) {

                        const error =
                            await response.json();

                        message =
                            error.message ||
                            error.error ||
                            message;

                    } else {

                        const text =
                            await response.text();

                        if (text) {
                            message = text;
                        }

                    }

                } catch {
                    // Ignore parsing error
                }

                throw new Error(message);
            }


            const data =
                await response.json();


            /*
             * Backend may return:
             *
             * [
             *   {...},
             *   {...}
             * ]
             *
             * OR
             *
             * {
             *   content: [...]
             * }
             */

            let requestList = [];

            if (Array.isArray(data)) {

                requestList = data;

            } else if (
                data &&
                Array.isArray(data.content)
            ) {

                requestList =
                    data.content;

            } else if (
                data &&
                Array.isArray(data.engineers)
            ) {

                requestList =
                    data.engineers;

            } else if (
                data &&
                Array.isArray(data.data)
            ) {

                requestList =
                    data.data;

            }


            setEngineers(requestList);


        } catch (error) {

            console.error(
                "Engineer Request Error:",
                error
            );

            alert(
                error.message ||
                "Unable to load engineer requests."
            );

        } finally {

            setLoading(false);
        }
    };


    /*
    ==========================================================
    SEARCH + FILTER
    ==========================================================
    */

    const filteredEngineers =
        useMemo(() => {

            return engineers.filter(
                engineer => {

                    const search =
                        searchTerm
                            .toLowerCase()
                            .trim();

                    const name =
                        getFullName(
                            engineer
                        ).toLowerCase();

                    const email =
                        (
                            engineer.email ||
                            engineer.user?.email ||
                            ""
                        ).toLowerCase();

                    const department =
                        getDepartmentName(
                            engineer
                        ).toLowerCase();

                    const contact =
                        (
                            engineer.contact ||
                            engineer.user?.contact ||
                            ""
                        ).toLowerCase();


                    const matchesSearch =
                        !search ||
                        name.includes(search) ||
                        email.includes(search) ||
                        department.includes(search) ||
                        contact.includes(search);


                    const rejected =
                        getRejectedStatus(
                            engineer
                        );

                    const active =
                        getActiveStatus(
                            engineer
                        );


                    let matchesStatus = true;


                    if (
                        statusFilter ===
                        "PENDING"
                    ) {

                        matchesStatus =
                            !rejected &&
                            !active;

                    } else if (
                        statusFilter ===
                        "ACTIVE"
                    ) {

                        matchesStatus =
                            !rejected &&
                            active;

                    } else if (
                        statusFilter ===
                        "REJECTED"
                    ) {

                        matchesStatus =
                            rejected;

                    } else if (
                        statusFilter ===
                        "INACTIVE"
                    ) {

                        matchesStatus =
                            !rejected &&
                            !active;

                    }


                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            engineers,
            searchTerm,
            statusFilter
        ]);


    /*
    ==========================================================
    SUMMARY
    ==========================================================
    */

    const totalRequests =
        engineers.length;

    const pendingRequests =
        engineers.filter(
            engineer =>
                !getRejectedStatus(
                    engineer
                ) &&
                !getActiveStatus(
                    engineer
                )
        ).length;

    const activeEngineers =
        engineers.filter(
            engineer =>
                !getRejectedStatus(
                    engineer
                ) &&
                getActiveStatus(
                    engineer
                )
        ).length;

    const rejectedRequests =
        engineers.filter(
            engineer =>
                getRejectedStatus(
                    engineer
                )
        ).length;


    /*
    ==========================================================
    OPEN DETAILS
    ==========================================================
    */

    const handleViewDetails = (
        engineer
    ) => {

        setSelectedEngineer(
            engineer
        );

        setShowDetails(true);
    };


    /*
    ==========================================================
    CLOSE DETAILS
    ==========================================================
    */

    const handleCloseDetails = () => {

        setShowDetails(false);

        setSelectedEngineer(null);
    };


    /*
    ==========================================================
    ACCEPT ENGINEER
    ==========================================================
    */

    const handleAccept = async (
        engineer
    ) => {

        const engineerId =
            getEngineerId(
                engineer
            );

        if (!engineerId) {

            alert(
                "Engineer ID not found."
            );

            return;
        }


        const confirmed =
            window.confirm(
                `Are you sure you want to accept ${getFullName(
                    engineer
                )}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(
                engineerId
            );

            const token =
                getToken();


            const response =
                await fetch(
                    `${ENGINEER_REQUEST_API}/${engineerId}/accept`,
                    {
                        method: "PUT",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";

                let message =
                    "Unable to accept engineer.";

                try {

                    if (
                        contentType.includes(
                            "application/json"
                        )
                    ) {

                        const data =
                            await response.json();

                        message =
                            data.message ||
                            data.error ||
                            message;

                    } else {

                        const text =
                            await response.text();

                        if (text) {
                            message = text;
                        }

                    }

                } catch {
                    // Ignore
                }

                throw new Error(message);
            }


            alert(
                "Engineer accepted successfully."
            );


            await loadEngineerRequests();


        } catch (error) {

            console.error(
                "Accept Engineer Error:",
                error
            );

            alert(
                error.message ||
                "Unable to accept engineer."
            );

        } finally {

            setProcessingId(null);
        }
    };


    /*
    ==========================================================
    OPEN REJECT MODAL
    ==========================================================
    */

    const handleOpenReject = (
        engineer
    ) => {

        setSelectedEngineer(
            engineer
        );

        setRejectReason("");

        setShowRejectModal(true);
    };


    /*
    ==========================================================
    CLOSE REJECT MODAL
    ==========================================================
    */

    const handleCloseReject = () => {

        setShowRejectModal(false);

        setSelectedEngineer(null);

        setRejectReason("");
    };


    /*
    ==========================================================
    REJECT ENGINEER
    ==========================================================
    */

    const handleReject = async () => {

        if (!selectedEngineer) {
            return;
        }


        if (
            !rejectReason.trim()
        ) {

            alert(
                "Please enter rejection reason."
            );

            return;
        }


        const engineerId =
            getEngineerId(
                selectedEngineer
            );


        if (!engineerId) {

            alert(
                "Engineer ID not found."
            );

            return;
        }


        try {

            setProcessingId(
                engineerId
            );


            const token =
                getToken();


            const response =
                await fetch(
                    `${ENGINEER_REQUEST_API}/${engineerId}/reject`,
                    {
                        method: "PUT",

                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                reason:
                                    rejectReason.trim()
                            })
                    }
                );


            if (!response.ok) {

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";

                let message =
                    "Unable to reject engineer.";

                try {

                    if (
                        contentType.includes(
                            "application/json"
                        )
                    ) {

                        const data =
                            await response.json();

                        message =
                            data.message ||
                            data.error ||
                            message;

                    } else {

                        const text =
                            await response.text();

                        if (text) {
                            message = text;
                        }

                    }

                } catch {
                    // Ignore
                }

                throw new Error(message);
            }


            alert(
                "Engineer request rejected."
            );


            handleCloseReject();


            await loadEngineerRequests();


        } catch (error) {

            console.error(
                "Reject Engineer Error:",
                error
            );

            alert(
                error.message ||
                "Unable to reject engineer."
            );

        } finally {

            setProcessingId(null);
        }
    };


    /*
    ==========================================================
    ACTIVATE / DEACTIVATE ENGINEER
    ==========================================================
    */

    const handleToggleActive = async (
        engineer
    ) => {

        const engineerId =
            getEngineerId(
                engineer
            );

        if (!engineerId) {

            alert(
                "Engineer ID not found."
            );

            return;
        }


        const currentlyActive =
            getActiveStatus(
                engineer
            );


        const action =
            currentlyActive
                ? "deactivate"
                : "activate";


        const confirmed =
            window.confirm(
                `Are you sure you want to ${action} ${getFullName(
                    engineer
                )}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(
                engineerId
            );


            const token =
                getToken();


            const response =
                await fetch(
                    `${ENGINEER_REQUEST_API}/${engineerId}/active`,
                    {
                        method: "PUT",

                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                active:
                                    !currentlyActive
                            })
                    }
                );


            if (!response.ok) {

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";

                let message =
                    `Unable to ${action} engineer.`;

                try {

                    if (
                        contentType.includes(
                            "application/json"
                        )
                    ) {

                        const data =
                            await response.json();

                        message =
                            data.message ||
                            data.error ||
                            message;

                    } else {

                        const text =
                            await response.text();

                        if (text) {
                            message = text;
                        }

                    }

                } catch {
                    // Ignore
                }

                throw new Error(message);
            }


            alert(
                currentlyActive
                    ? "Engineer deactivated successfully."
                    : "Engineer activated successfully."
            );


            await loadEngineerRequests();


        } catch (error) {

            console.error(
                "Active Status Error:",
                error
            );

            alert(
                error.message ||
                "Unable to update engineer status."
            );

        } finally {

            setProcessingId(null);
        }
    };


    /*
    ==========================================================
    DOCUMENT URL
    ==========================================================
    */

    const getDocumentUrl = (
        path
    ) => {

        if (!path) {
            return null;
        }

        if (
            path.startsWith("http://") ||
            path.startsWith("https://")
        ) {
            return path;
        }

        if (path.startsWith("/")) {
            return `${BASE_URL}${path}`;
        }

        return `${BASE_URL}/${path}`;
    };


    /*
    ==========================================================
    RENDER
    ==========================================================
    */

    return (

        <div className="engineer-request-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="page-header">

                <div className="page-title-section">

                    <div className="page-title-icon">
                        <FaUserTie />
                    </div>

                    <div>

                        <h1>
                            Engineer Requests
                        </h1>

                        <p>
                            Review, approve, reject and
                            manage engineer registrations.
                        </p>

                    </div>

                </div>


                <button
                    className="refresh-btn"
                    onClick={
                        loadEngineerRequests
                    }
                    disabled={loading}
                >

                    <FaSyncAlt />

                    {loading
                        ? "Loading..."
                        : "Refresh"}

                </button>

            </div>


            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div className="summary-grid">

                <div className="summary-card">

                    <div className="summary-icon">
                        <FaUserTie />
                    </div>

                    <div>

                        <span>
                            Total Requests
                        </span>

                        <strong>
                            {totalRequests}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaBriefcase />
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingRequests}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaCheckCircle />
                    </div>

                    <div>

                        <span>
                            Active
                        </span>

                        <strong>
                            {activeEngineers}
                        </strong>

                    </div>

                </div>


                <div className="summary-card">

                    <div className="summary-icon">
                        <FaTimesCircle />
                    </div>

                    <div>

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {rejectedRequests}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                FILTER CARD
            ================================================== */}

            <div className="filter-card">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search engineer, email, contact or department..."
                        value={
                            searchTerm
                        }
                        onChange={
                            event =>
                                setSearchTerm(
                                    event.target.value
                                )
                        }
                    />

                </div>


                <select
                    value={
                        statusFilter
                    }
                    onChange={
                        event =>
                            setStatusFilter(
                                event.target.value
                            )
                    }
                >

                    <option value="ALL">
                        All Requests
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="ACTIVE">
                        Active
                    </option>

                    <option value="INACTIVE">
                        Inactive
                    </option>

                    <option value="REJECTED">
                        Rejected
                    </option>

                </select>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="request-card">

                <div className="card-header">

                    <div>

                        <h2>
                            Engineer Registration Requests
                        </h2>

                        <p>
                            Review engineer information
                            before approving the request.
                        </p>

                    </div>

                    <span>
                        {filteredEngineers.length}
                        {" "}
                        Records
                    </span>

                </div>


                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Engineer
                                </th>

                                <th>
                                    Contact
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
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                loading ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="empty-row"
                                        >
                                            Loading engineer requests...
                                        </td>

                                    </tr>

                                ) : filteredEngineers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="empty-row"
                                        >

                                            No engineer requests
                                            found.

                                        </td>

                                    </tr>

                                ) : (

                                    filteredEngineers.map(
                                        engineer => {

                                            const engineerId =
                                                getEngineerId(
                                                    engineer
                                                );

                                            const rejected =
                                                getRejectedStatus(
                                                    engineer
                                                );

                                            const active =
                                                getActiveStatus(
                                                    engineer
                                                );

                                            return (

                                                <tr
                                                    key={
                                                        engineerId ||
                                                        getUserId(
                                                            engineer
                                                        )
                                                    }
                                                >

                                                    {/* ENGINEER */}

                                                    <td>

                                                        <div className="engineer-info">

                                                            <div className="engineer-avatar">
                                                                <FaUserTie />
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {
                                                                        getFullName(
                                                                            engineer
                                                                        )
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    {
                                                                        engineer.email ||
                                                                        engineer.user?.email ||
                                                                        "No email"
                                                                    }
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* CONTACT */}

                                                    <td>

                                                        {
                                                            engineer.contact ||
                                                            engineer.user?.contact ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    {/* DEPARTMENT */}

                                                    <td>

                                                        <span className="department-badge">

                                                            <FaBuilding />

                                                            {
                                                                getDepartmentName(
                                                                    engineer
                                                                )
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* QUALIFICATION */}

                                                    <td>

                                                        {
                                                            engineer.highestQualification ||
                                                            "N/A"
                                                        }

                                                    </td>


                                                    {/* EXPERIENCE */}

                                                    <td>

                                                        {
                                                            engineer.experience !==
                                                            undefined &&
                                                            engineer.experience !==
                                                            null
                                                                ? `${engineer.experience} Years`
                                                                : "N/A"
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        {
                                                            rejected ? (

                                                                <span className="status rejected">
                                                                    <FaTimesCircle />
                                                                    Rejected
                                                                </span>

                                                            ) : active ? (

                                                                <span className="status active">
                                                                    <FaCheckCircle />
                                                                    Active
                                                                </span>

                                                            ) : (

                                                                <span className="status pending">
                                                                    Pending
                                                                </span>

                                                            )
                                                        }

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>

                                                        <div className="action-buttons">

                                                            <button
                                                                className="view-btn"
                                                                title="View Details"
                                                                onClick={() =>
                                                                    handleViewDetails(
                                                                        engineer
                                                                    )
                                                                }
                                                            >

                                                                <FaEye />

                                                            </button>


                                                            {
                                                                !rejected &&
                                                                !active && (

                                                                    <>

                                                                        <button
                                                                            className="accept-btn"
                                                                            title="Accept Engineer"
                                                                            onClick={() =>
                                                                                handleAccept(
                                                                                    engineer
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                processingId ===
                                                                                engineerId
                                                                            }
                                                                        >

                                                                            <FaCheckCircle />

                                                                        </button>


                                                                        <button
                                                                            className="reject-btn"
                                                                            title="Reject Engineer"
                                                                            onClick={() =>
                                                                                handleOpenReject(
                                                                                    engineer
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                processingId ===
                                                                                engineerId
                                                                            }
                                                                        >

                                                                            <FaTimesCircle />

                                                                        </button>

                                                                    </>

                                                                )
                                                            }


                                                            {
                                                                !rejected && (

                                                                    <button
                                                                        className={
                                                                            active
                                                                                ? "deactivate-btn"
                                                                                : "activate-btn"
                                                                        }
                                                                        title={
                                                                            active
                                                                                ? "Deactivate Engineer"
                                                                                : "Activate Engineer"
                                                                        }
                                                                        onClick={() =>
                                                                            handleToggleActive(
                                                                                engineer
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            processingId ===
                                                                            engineerId
                                                                        }
                                                                    >

                                                                        <FaPowerOff />

                                                                    </button>

                                                                )
                                                            }

                                                        </div>

                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ==================================================
                DETAILS MODAL
            ================================================== */}

            {
                showDetails &&
                selectedEngineer && (

                    <div className="modal-overlay">

                        <div className="engineer-modal">

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        Engineer Details
                                    </h2>

                                    <p>
                                        Complete registration
                                        information.
                                    </p>

                                </div>


                                <button
                                    onClick={
                                        handleCloseDetails
                                    }
                                >

                                    <FaTimes />

                                </button>

                            </div>


                            <div className="modal-body">

                                {/* PERSONAL */}

                                <div className="detail-section">

                                    <h3>
                                        <FaUserTie />
                                        Personal Information
                                    </h3>


                                    <div className="detail-grid">

                                        <div>

                                            <label>
                                                Full Name
                                            </label>

                                            <strong>
                                                {
                                                    getFullName(
                                                        selectedEngineer
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Email
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.email ||
                                                    selectedEngineer.user?.email ||
                                                    "N/A"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Contact
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.contact ||
                                                    selectedEngineer.user?.contact ||
                                                    "N/A"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Address
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.address ||
                                                    "N/A"
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* PROFESSIONAL */}

                                <div className="detail-section">

                                    <h3>
                                        <FaBriefcase />
                                        Professional Information
                                    </h3>


                                    <div className="detail-grid">

                                        <div>

                                            <label>
                                                Department
                                            </label>

                                            <strong>
                                                {
                                                    getDepartmentName(
                                                        selectedEngineer
                                                    )
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Branch
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.engineer_branch ||
                                                    "N/A"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Highest Qualification
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.highestQualification ||
                                                    "N/A"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Experience
                                            </label>

                                            <strong>
                                                {
                                                    selectedEngineer.experience !==
                                                    undefined &&
                                                    selectedEngineer.experience !==
                                                    null
                                                        ? `${selectedEngineer.experience} Years`
                                                        : "N/A"
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <label>
                                                Joining Date
                                            </label>

                                            <strong>
                                                {
                                                    formatDate(
                                                        selectedEngineer.joiningDate
                                                    )
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* DOCUMENTS */}

                                <div className="detail-section">

                                    <h3>
                                        <FaFileAlt />
                                        Documents
                                    </h3>


                                    <div className="document-list">

                                        {
                                            selectedEngineer.profileImage && (

                                                <a
                                                    href={
                                                        getDocumentUrl(
                                                            selectedEngineer.profileImage
                                                        )
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="document-link"
                                                >

                                                    <FaUserTie />

                                                    Passport Image

                                                </a>

                                            )
                                        }


                                        {
                                            selectedEngineer.degree_Certificate && (

                                                <a
                                                    href={
                                                        getDocumentUrl(
                                                            selectedEngineer.degree_Certificate
                                                        )
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="document-link"
                                                >

                                                    <FaGraduationCap />

                                                    Degree Certificate

                                                </a>

                                            )
                                        }


                                        {
                                            selectedEngineer.experience_Certificate && (

                                                <a
                                                    href={
                                                        getDocumentUrl(
                                                            selectedEngineer.experience_Certificate
                                                        )
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="document-link"
                                                >

                                                    <FaBriefcase />

                                                    Experience Certificate

                                                </a>

                                            )
                                        }


                                        {
                                            !selectedEngineer.profileImage &&
                                            !selectedEngineer.degree_Certificate &&
                                            !selectedEngineer.experience_Certificate && (

                                                <p>
                                                    No documents available.
                                                </p>

                                            )
                                        }

                                    </div>

                                </div>


                                {/* REJECTION */}

                                {
                                    getRejectedStatus(
                                        selectedEngineer
                                    ) && (

                                        <div className="rejection-box">

                                            <strong>
                                                Rejection Reason
                                            </strong>

                                            <p>
                                                {
                                                    selectedEngineer.rejectedReason ||
                                                    "No reason provided."
                                                }
                                            </p>

                                        </div>

                                    )
                                }

                            </div>


                            <div className="modal-footer">

                                {
                                    !getRejectedStatus(
                                        selectedEngineer
                                    ) &&
                                    !getActiveStatus(
                                        selectedEngineer
                                    ) && (

                                        <>

                                            <button
                                                className="accept-large-btn"
                                                onClick={() => {

                                                    handleCloseDetails();

                                                    handleAccept(
                                                        selectedEngineer
                                                    );

                                                }}
                                            >

                                                <FaCheckCircle />

                                                Accept Engineer

                                            </button>


                                            <button
                                                className="reject-large-btn"
                                                onClick={() => {

                                                    handleCloseDetails();

                                                    handleOpenReject(
                                                        selectedEngineer
                                                    );

                                                }}
                                            >

                                                <FaTimesCircle />

                                                Reject Engineer

                                            </button>

                                        </>

                                    )
                                }


                                {
                                    !getRejectedStatus(
                                        selectedEngineer
                                    ) && (

                                        <button
                                            className={
                                                getActiveStatus(
                                                    selectedEngineer
                                                )
                                                    ? "deactivate-large-btn"
                                                    : "activate-large-btn"
                                            }
                                            onClick={() => {

                                                handleCloseDetails();

                                                handleToggleActive(
                                                    selectedEngineer
                                                );

                                            }}
                                        >

                                            <FaPowerOff />

                                            {
                                                getActiveStatus(
                                                    selectedEngineer
                                                )
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }

                                        </button>

                                    )
                                }

                            </div>

                        </div>

                    </div>

                )
            }


            {/* ==================================================
                REJECT MODAL
            ================================================== */}

            {
                showRejectModal &&
                selectedEngineer && (

                    <div className="modal-overlay">

                        <div className="reject-modal">

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        Reject Engineer
                                    </h2>

                                    <p>
                                        Please provide a reason
                                        for rejecting this request.
                                    </p>

                                </div>


                                <button
                                    onClick={
                                        handleCloseReject
                                    }
                                >

                                    <FaTimes />

                                </button>

                            </div>


                            <div className="reject-body">

                                <div className="reject-engineer">

                                    <div className="engineer-avatar">
                                        <FaUserTie />
                                    </div>

                                    <div>

                                        <strong>
                                            {
                                                getFullName(
                                                    selectedEngineer
                                                )
                                            }
                                        </strong>

                                        <span>
                                            {
                                                getDepartmentName(
                                                    selectedEngineer
                                                )
                                            }
                                        </span>

                                    </div>

                                </div>


                                <label>
                                    Rejection Reason
                                </label>

                                <textarea
                                    rows="5"
                                    placeholder="Enter reason for rejecting this engineer request..."
                                    value={
                                        rejectReason
                                    }
                                    onChange={
                                        event =>
                                            setRejectReason(
                                                event.target.value
                                            )
                                    }
                                />

                            </div>


                            <div className="modal-footer">

                                <button
                                    className="cancel-btn"
                                    onClick={
                                        handleCloseReject
                                    }
                                >

                                    <FaTimes />

                                    Cancel

                                </button>


                                <button
                                    className="reject-large-btn"
                                    onClick={
                                        handleReject
                                    }
                                    disabled={
                                        !rejectReason.trim() ||
                                        processingId ===
                                        getEngineerId(
                                            selectedEngineer
                                        )
                                    }
                                >

                                    <FaTimesCircle />

                                    {
                                        processingId ===
                                        getEngineerId(
                                            selectedEngineer
                                        )
                                            ? "Rejecting..."
                                            : "Reject Engineer"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
}

export default EngineerRequest;
