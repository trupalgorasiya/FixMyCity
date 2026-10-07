import { useEffect, useMemo, useState } from "react";
import {
    FaUserTie,
    FaSearch,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaFilePdf,
    FaTimes
} from "react-icons/fa";

import "./EngineerRequest.css";
import { API_BASE_URL, BASE_URL } from "../../api/axios";


/* ==========================================================
   TOKEN
========================================================== */

const getToken = () => {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("jwt") ||
        ""
    );

};


/* ==========================================================
   LOGIN USER
========================================================== */

const getLoggedInUser = () => {

    try {

        const user =
            localStorage.getItem("user");

        if (!user) {
            return null;
        }

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Unable to read logged in user:",
            error
        );

        return null;
    }

};


/* ==========================================================
   STATUS
========================================================== */

const getApplicationStatus = (engineer) => {

    if (engineer.isRejected === null ||
        engineer.isRejected === undefined) {

        return "Pending";
    }

    if (engineer.isRejected === true) {

        return "Rejected";
    }

    return "Approved";
};


const getAccountStatus = (engineer) => {

    return engineer.isActive
        ? "Active"
        : "Inactive";

};


/* ==========================================================
   COMPONENT
========================================================== */

function EngineerManagement() {

    const [engineers, setEngineers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("Pending");

    const [selectedEngineer, setSelectedEngineer] =
        useState(null);

    const [showDetails, setShowDetails] =
        useState(false);

    const [showRejectModal, setShowRejectModal] =
        useState(false);

    const [rejectionReason, setRejectionReason] =
        useState("");

    const [processing, setProcessing] =
        useState(false);

    const [previewDoc, setPreviewDoc] =
        useState(null);


    /* ======================================================
       LOGIN USER
    ====================================================== */

    const loggedInUser =
        getLoggedInUser();


    const isDepartment =
        loggedInUser?.role === "DEPARTMENT";


    const isAdmin =
        loggedInUser?.role === "ADMIN" ||
        loggedInUser?.role === "SUPER_ADMIN";


    const departmentId =
        loggedInUser?.departmentId;


    /* ======================================================
       LOAD ENGINEERS
    ====================================================== */

    useEffect(() => {

        loadEngineers();

    }, []);


    const loadEngineers = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                getToken();

            if (!token) {

                throw new Error(
                    "Authentication token not found."
                );

            }


            let url;


            /*
             * ADMIN
             */

            if (isAdmin) {

                url =
                    `${API_BASE_URL}/admin/engineers`;

            }

            /*
             * DEPARTMENT
             */

            else if (isDepartment) {

                if (!departmentId) {

                    throw new Error(
                        "Department ID not found in login information."
                    );

                }

                url =
                    `${API_BASE_URL}/department/engineers?departmentId=${departmentId}`;

            }

            else {

                throw new Error(
                    "Unauthorized role."
                );

            }


            const response =
                await fetch(
                    url,
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

                const errorData =
                    await response.json()
                        .catch(() => ({}));

                throw new Error(
                    errorData.message ||
                    `Failed to load engineers (${response.status})`
                );

            }


            const data =
                await response.json();


            console.log(
                "Engineers:",
                data
            );


            setEngineers(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (error) {

            console.error(
                "Engineer Load Error:",
                error
            );

            setError(
                error.message ||
                "Unable to load engineers."
            );

        } finally {

            setLoading(false);

        }

    };


    /* ======================================================
       FILTER
    ====================================================== */

    const filteredEngineers =
        useMemo(() => {

            const keyword =
                search
                    .toLowerCase()
                    .trim();


            return engineers.filter(
                engineer => {

                    const fullName =
                        `${engineer.firstName || ""} ${engineer.lastName || ""}`
                            .toLowerCase();


                    const applicationStatus =
                        getApplicationStatus(
                            engineer
                        );


                    const matchesSearch =
                        !keyword ||

                        fullName.includes(
                            keyword
                        ) ||

                        (engineer.email || "")
                            .toLowerCase()
                            .includes(keyword) ||

                        (engineer.contact || "")
                            .toLowerCase()
                            .includes(keyword) ||

                        String(
                            engineer.engineerId || ""
                        ).includes(keyword);


                    const matchesStatus =
                        statusFilter === "All" ||

                        applicationStatus ===
                            statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            engineers,
            search,
            statusFilter
        ]);


    /* ======================================================
       STATISTICS
    ====================================================== */

    const total =
        engineers.length;


    const pending =
        engineers.filter(
            engineer =>
                getApplicationStatus(
                    engineer
                ) === "Pending"
        ).length;


    const approved =
        engineers.filter(
            engineer =>
                getApplicationStatus(
                    engineer
                ) === "Approved"
        ).length;


    const rejected =
        engineers.filter(
            engineer =>
                getApplicationStatus(
                    engineer
                ) === "Rejected"
        ).length;


    const active =
        engineers.filter(
            engineer =>
                engineer.isActive === true
        ).length;


    /* ======================================================
       VIEW DETAILS
    ====================================================== */

    const openDetails = (engineer) => {

        setSelectedEngineer(
            engineer
        );

        setShowDetails(true);

    };


    /* ======================================================
       APPROVE
    ====================================================== */

    const approveEngineer =
        async () => {

            if (!selectedEngineer) {
                return;
            }


            try {

                setProcessing(true);


                const token =
                    getToken();


                const response =
                    await fetch(
                        `${API_BASE_URL}/${
                            isAdmin
                                ? "admin"
                                : "department"
                        }/engineers/${
                            selectedEngineer.engineerId
                        }/approve`,
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


                const data =
                    await response.json()
                        .catch(() => ({}));


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to approve engineer."
                    );

                }


                alert(
                    "Engineer approved successfully."
                );


                setShowDetails(false);

                setSelectedEngineer(null);

                await loadEngineers();


            } catch (error) {

                console.error(
                    "Approve Error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to approve engineer."
                );

            } finally {

                setProcessing(false);

            }

        };


    /* ======================================================
       OPEN REJECT
    ====================================================== */

    const openRejectModal =
        () => {

            setRejectionReason("");

            setShowRejectModal(true);

        };


    /* ======================================================
       REJECT
    ====================================================== */

    const rejectEngineer =
        async () => {

            if (!selectedEngineer) {
                return;
            }


            if (
                !rejectionReason.trim()
            ) {

                alert(
                    "Please enter rejection reason."
                );

                return;

            }


            try {

                setProcessing(true);


                const token =
                    getToken();


                const response =
                    await fetch(
                        `${API_BASE_URL}/${
                            isAdmin
                                ? "admin"
                                : "department"
                        }/engineers/${
                            selectedEngineer.engineerId
                        }/reject`,
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
                                        rejectionReason
                                })

                        }
                    );


                const data =
                    await response.json()
                        .catch(() => ({}));


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to reject engineer."
                    );

                }


                alert(
                    "Engineer request rejected."
                );


                setShowRejectModal(false);

                setShowDetails(false);

                setSelectedEngineer(null);

                setRejectionReason("");

                await loadEngineers();


            } catch (error) {

                console.error(
                    "Reject Error:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to reject engineer."
                );

            } finally {

                setProcessing(false);

            }

        };




    /* ======================================================
       OPEN DOCUMENT
    ====================================================== */

    const openDocument =
        (path) => {

            if (!path) {

                alert(
                    "Document not available."
                );

                return;

            }


            const url =
                path.startsWith("http")
                    ? path
                    : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        };


    /* ======================================================
       RENDER
    ====================================================== */

    return (

        <div className="engineer-management-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="engineer-page-header">

                <div>

                    <div className="header-title">

                        <FaUserTie />

                        <h1>
                            Engineer Management
                        </h1>

                    </div>

                    <p>
                        Review engineer applications
                        and manage engineer accounts.
                    </p>

                </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="engineer-stats">


                <div className="engineer-stat">

                    <span>
                        Total
                    </span>

                    <strong>
                        {total}
                    </strong>

                </div>


                <div className="engineer-stat pending">

                    <span>
                        Pending
                    </span>

                    <strong>
                        {pending}
                    </strong>

                </div>


                <div className="engineer-stat approved">

                    <span>
                        Approved
                    </span>

                    <strong>
                        {approved}
                    </strong>

                </div>


                <div className="engineer-stat rejected">

                    <span>
                        Rejected
                    </span>

                    <strong>
                        {rejected}
                    </strong>

                </div>


                <div className="engineer-stat active">

                    <span>
                        Active
                    </span>

                    <strong>
                        {active}
                    </strong>

                </div>

            </div>


            {/* ==================================================
                TOOLBAR
            ================================================== */}

            <div className="engineer-toolbar">


                <div className="engineer-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search engineer..."
                        value={search}
                        onChange={
                            event =>
                                setSearch(
                                    event.target.value
                                )
                        }
                    />

                </div>


                <select
                    value={statusFilter}
                    onChange={
                        event =>
                            setStatusFilter(
                                event.target.value
                            )
                    }
                >

                    <option value="All">
                        All Applications
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

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {
                error && (

                    <div className="engineer-error">

                        {error}

                    </div>

                )
            }


            {/* ==================================================
                LOADING
            ================================================== */}

            {
                loading ? (

                    <div className="engineer-loading">

                        Loading engineers...

                    </div>

                ) : (

                    <div className="engineer-table-card">

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

                                {

                                    filteredEngineers.map(
                                        (engineer, index) => {

                                            const applicationStatus =
                                                getApplicationStatus(
                                                    engineer
                                                );


                                            const accountStatus =
                                                getAccountStatus(
                                                    engineer
                                                );


                                            return (

                                                <tr
                                                    key={
                                                        engineer.engineerId
                                                    }
                                                >

                                                    <td>

                                                        <div className="engineer-name">

                                                            <strong>
                                                                {
                                                                    engineer.firstName
                                                                }{" "}
                                                                {
                                                                    engineer.lastName
                                                                }
                                                            </strong>

                                                            <small>
                                                                No: ENG-
                                                                {index + 1}
                                                            </small>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        <div>

                                                            <div>
                                                                {
                                                                    engineer.email
                                                                }
                                                            </div>

                                                            <small>
                                                                {
                                                                    engineer.contact
                                                                }
                                                            </small>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        {
                                                            engineer.department
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                `status-badge ${applicationStatus.toLowerCase()}`
                                                            }
                                                        >

                                                            {
                                                                applicationStatus ===
                                                                "Approved"
                                                                    ? <FaCheckCircle />
                                                                    : applicationStatus ===
                                                                      "Rejected"
                                                                        ? <FaTimesCircle />
                                                                        : <FaUserTie />
                                                            }

                                                            {
                                                                applicationStatus
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                `account-badge ${accountStatus.toLowerCase()}`
                                                            }
                                                        >

                                                            {
                                                                accountStatus
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <button
                                                            className="view-engineer-btn"
                                                            onClick={() =>
                                                                openDetails(
                                                                    engineer
                                                                )
                                                            }
                                                        >

                                                            <FaEye />

                                                            View

                                                        </button>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )

                                }


                                {
                                    filteredEngineers.length ===
                                    0 && (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="empty-engineers"
                                            >

                                                No engineers found.

                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                )

            }


            {/* ==================================================
                DETAILS MODAL
            ================================================== */}

            {
                showDetails &&
                selectedEngineer && (

                    <div className="engineer-modal-overlay">

                        <div className="engineer-modal">


                            <div className="engineer-modal-header">

                                <div>

                                    <h2>

                                        {
                                            selectedEngineer.firstName
                                        }{" "}

                                        {
                                            selectedEngineer.lastName
                                        }

                                    </h2>

                                    <p>
                                        Engineer ID: ENG-
                                        {
                                            selectedEngineer.engineerId
                                        }
                                    </p>

                                </div>


                                <button
                                    onClick={() => {

                                        setShowDetails(false);

                                        setSelectedEngineer(
                                            null
                                        );

                                    }}
                                >

                                    <FaTimes />

                                </button>

                            </div>


                            <div className="engineer-details-grid">


                                <div>

                                    <strong>
                                        Email
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.email
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Contact
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.contact
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Department
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.department
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Qualification
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.highestQualification
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Experience
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.experience
                                        }{" "}
                                        Years
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Branch
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.engineerBranch
                                        }
                                    </span>

                                </div>


                                <div className="full">

                                    <strong>
                                        Address
                                    </strong>

                                    <span>
                                        {
                                            selectedEngineer.address
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* ==================================================
                                DOCUMENTS
                            ================================================== */}

                            <div className="engineer-documents">

                                <h3>
                                    Submitted Documents & Certificates
                                </h3>

                                <div className="document-cards-grid">

                                    {/* DEGREE CERTIFICATE */}
                                    <div className="doc-card">
                                        <div className="doc-card-header">
                                            <span className="doc-type-badge">Degree Certificate</span>
                                            <button
                                                type="button"
                                                className="doc-open-link"
                                                onClick={() => openDocument(selectedEngineer.degreeCertificate)}
                                                title="Open in new tab"
                                            >
                                                External ↗
                                            </button>
                                        </div>
                                        <div
                                            className="doc-image-wrapper"
                                            onClick={() => setPreviewDoc({
                                                title: "Degree Certificate",
                                                url: `${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/degree`
                                            })}
                                        >
                                            <img
                                                src={`${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/degree`}
                                                alt="Degree Certificate"
                                                className="doc-preview-img"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    if (e.target.nextSibling) {
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                            <div className="doc-fallback-view" style={{ display: 'none' }}>
                                                <FaFilePdf />
                                                <span>Click to View Certificate</span>
                                            </div>
                                            <div className="doc-overlay-hover">
                                                <FaEye /> Click to View Full Size
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXPERIENCE CERTIFICATE */}
                                    {selectedEngineer.experienceCertificate && (
                                        <div className="doc-card">
                                            <div className="doc-card-header">
                                                <span className="doc-type-badge">Experience Certificate</span>
                                                <button
                                                    type="button"
                                                    className="doc-open-link"
                                                    onClick={() => openDocument(selectedEngineer.experienceCertificate)}
                                                    title="Open in new tab"
                                                >
                                                    External ↗
                                                </button>
                                            </div>
                                            <div
                                                className="doc-image-wrapper"
                                                onClick={() => setPreviewDoc({
                                                    title: "Experience Certificate",
                                                    url: `${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/experience`
                                                })}
                                            >
                                                <img
                                                    src={`${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/experience`}
                                                    alt="Experience Certificate"
                                                    className="doc-preview-img"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        if (e.target.nextSibling) {
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="doc-fallback-view" style={{ display: 'none' }}>
                                                    <FaFilePdf />
                                                    <span>Click to View Certificate</span>
                                                </div>
                                                <div className="doc-overlay-hover">
                                                    <FaEye /> Click to View Full Size
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* ==================================================
                                REJECTION REASON
                            ================================================== */}

                            {
                                selectedEngineer.isRejected ===
                                true && (

                                    <div className="rejection-box">

                                        <strong>
                                            Rejection Reason
                                        </strong>

                                        <p>
                                            {
                                                selectedEngineer.rejectedReason
                                            }
                                        </p>

                                    </div>

                                )
                            }


                            {/* ==================================================
                                ACTIONS
                            ================================================== */}

                            <div className="engineer-modal-actions">


                                {/* PENDING */}

                                {
                                    getApplicationStatus(
                                        selectedEngineer
                                    ) === "Pending" && (

                                        <>

                                            <button
                                                className="approve-btn"
                                                onClick={
                                                    approveEngineer
                                                }
                                                disabled={
                                                    processing
                                                }
                                            >

                                                <FaCheckCircle />

                                                {
                                                    processing
                                                        ? "Processing..."
                                                        : "Approve"
                                                }

                                            </button>


                                            <button
                                                className="reject-btn"
                                                onClick={
                                                    openRejectModal
                                                }
                                                disabled={
                                                    processing
                                                }
                                            >

                                                <FaTimesCircle />

                                                Reject

                                            </button>

                                        </>

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

                    <div className="engineer-modal-overlay">

                        <div className="reject-modal">

                            <div className="reject-header">

                                <h2>
                                    Reject Engineer Request
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowRejectModal(
                                            false
                                        )
                                    }
                                >

                                    <FaTimes />

                                </button>

                            </div>


                            <p>

                                Please provide a reason
                                for rejecting this engineer
                                application.

                            </p>


                            <textarea
                                rows="5"
                                placeholder="Enter rejection reason..."
                                value={
                                    rejectionReason
                                }
                                onChange={
                                    event =>
                                        setRejectionReason(
                                            event.target.value
                                        )
                                }
                            />


                            <div className="reject-actions">

                                <button
                                    className="cancel-btn"
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
                                        rejectEngineer
                                    }
                                    disabled={
                                        processing
                                    }
                                >

                                    <FaTimesCircle />

                                    {
                                        processing
                                            ? "Rejecting..."
                                            : "Reject Request"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>
                )
            
            }

            {/* ==================================================
                FULL DOCUMENT ZOOM MODAL
            ================================================== */}
            {previewDoc && (
                <div
                    className="document-zoom-overlay"
                    onClick={() => setPreviewDoc(null)}
                >
                    <div
                        className="document-zoom-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="document-zoom-header">
                            <h3>{previewDoc.title}</h3>
                            <button
                                type="button"
                                className="zoom-close-btn"
                                onClick={() => setPreviewDoc(null)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="document-zoom-body">
                            <img
                                src={previewDoc.url}
                                alt={previewDoc.title}
                                className="document-zoom-img"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) {
                                        e.target.nextSibling.style.display = 'block';
                                    }
                                }}
                            />
                            <div className="zoom-fallback-frame" style={{ display: 'none' }}>
                                <iframe
                                    src={previewDoc.url}
                                    title={previewDoc.title}
                                    className="document-zoom-iframe"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );

}

export default EngineerManagement;
