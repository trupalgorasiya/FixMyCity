import { useState } from "react";
import "../styles/ComplaintTracking.css";
import { useNavigate } from "react-router-dom";
import { getComplaintByNumber } from "../api/citizenApi";

function MediaCard({ file }) {

    const mediaUrl =
        `http://localhost:8085/api/citizen/media/${file.mediaId}`;

    const fileType =
        file.fileType?.toLowerCase() || "";

    const isImage =
        fileType.startsWith("image/");

    const isVideo =
        fileType.startsWith("video/");

    const isPdf =
        fileType === "application/pdf";

    return (

        <div className="media-card">

            {/* =====================================
                MEDIA PREVIEW
            ====================================== */}

            <div className="media-preview">

                {isImage && (

                    <img
                        src={mediaUrl}
                        alt={file.fileName}
                        className="media-image"
                    />

                )}

                {isVideo && (

                    <video
                        controls
                        className="media-video"
                    >

                        <source
                            src={mediaUrl}
                            type={file.fileType}
                        />

                        Your browser does not support
                        video playback.

                    </video>

                )}

                {isPdf && (

                    <iframe
                        src={mediaUrl}
                        title={file.fileName}
                        className="media-pdf"
                    />

                )}

                {!isImage &&
                    !isVideo &&
                    !isPdf && (

                    <div className="unknown-media">

                        <div className="unknown-icon">
                            📄
                        </div>

                        <p>
                            Preview not available
                        </p>

                    </div>

                )}

            </div>


            {/* =====================================
                MEDIA INFORMATION
            ====================================== */}

            <div className="media-info">

                <div className="media-file-icon">

                    {isImage && "🖼️"}

                    {isVideo && "🎥"}

                    {isPdf && "📄"}

                    {!isImage &&
                        !isVideo &&
                        !isPdf &&
                        "📎"}

                </div>


                <div className="media-details">

                    <h4 title={file.fileName}>
                        {file.fileName}
                    </h4>

                    <span>
                        {fileType
                            ? fileType
                                .split("/")[1]
                                ?.toUpperCase()
                            : "FILE"}
                    </span>

                </div>

            </div>


            {/* =====================================
                VIEW BUTTON
            ====================================== */}

            <div className="media-actions">

                <button
                    type="button"
                    className="view-attachment"
                    onClick={() =>
                        window.open(
                            mediaUrl,
                            "_blank"
                        )
                    }
                >
                    View
                </button>

            </div>

        </div>

    );
}


function MediaSection({
    title,
    subtitle,
    media
}) {

    if (!media || media.length === 0) {
        return null;
    }

    return (

        <div className="media-section">

            <div className="media-section-header">

                <div>

                    <h3>
                        {title}
                    </h3>

                    <p>
                        {subtitle}
                    </p>

                </div>

                <span className="media-section-count">
                    {media.length}
                </span>

            </div>


            <div className="media-grid">

                {media.map((file) => (

                    <MediaCard
                        key={file.mediaId}
                        file={file}
                    />

                ))}

            </div>

        </div>

    );
}


function ComplaintTracking() {

    const navigate = useNavigate();

    const [complaintId, setComplaintId] =
        useState("");

    const [complaint, setComplaint] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =========================================
    // SEARCH COMPLAINT
    // =========================================

    const handleTrack = async () => {

        if (!complaintId.trim()) {

            setError(
                "Please enter Complaint ID."
            );

            setComplaint(null);

            return;
        }

        try {

            setLoading(true);

            setError("");

            setComplaint(null);


            const response =
                await getComplaintByNumber(
                    complaintId.trim()
                );


            setComplaint(response.data);

        } catch (err) {

            console.error(
                "Complaint Fetch Error:",
                err
            );


            if (err.response?.data?.message) {

                setError(
                    err.response.data.message
                );

            } else if (err.response?.data) {

                setError(
                    typeof err.response.data === "string"
                        ? err.response.data
                        : "Complaint not found."
                );

            } else {

                setError(
                    "Unable to fetch complaint details."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // =========================================
    // FORMAT DATE + TIME
    // =========================================

    const formatDateTime = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (status) => {

        return String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");

    };


    // =========================================
    // MEDIA GROUPING
    // =========================================

    const complaintMedia =
        complaint?.media?.filter(
            file => !file.mediaType
        ) || [];


    const engineerBeforeMedia =
        complaint?.media?.filter(
            file =>
                file.mediaType?.toUpperCase() ===
                "BEFORE"
        ) || [];


    const engineerAfterMedia =
        complaint?.media?.filter(
            file =>
                file.mediaType?.toUpperCase() ===
                "AFTER"
        ) || [];


    return (

        <div className="tracking-page">

            <div className="tracking-container">


                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="tracking-header">

                    <h1>
                        Track Complaint
                    </h1>

                    <p>
                        Track the complete progress of your
                        complaint from registration to final
                        resolution. View complaint details,
                        assigned engineer, media and status
                        updates.
                    </p>

                </div>


                {/* =====================================
                    SEARCH
                ====================================== */}

                <div className="search-card">

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Enter Complaint ID"
                            value={complaintId}
                            onChange={(e) =>
                                setComplaintId(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {
                                    handleTrack();
                                }

                            }}
                        />


                        <button
                            type="button"
                            onClick={handleTrack}
                            disabled={loading}
                        >

                            {loading
                                ? "Loading..."
                                : "🔍 Track Complaint"}

                        </button>

                    </div>

                </div>


                {/* =====================================
                    ERROR
                ====================================== */}

                {error && (

                    <div className="card">

                        <div className="no-data-content">

                            <h3>
                                Complaint Not Found
                            </h3>

                            <p>
                                {error}
                            </p>

                            <button
                                type="button"
                                className="reset-search-btn"
                                onClick={() => {

                                    setError("");
                                    setComplaint(null);
                                    setComplaintId("");

                                }}
                            >
                                Try Again
                            </button>

                        </div>

                    </div>

                )}


                {/* =====================================
                    COMPLAINT DETAILS
                ====================================== */}

                {complaint && (

                    <div className="tracking-content">


                        {/* =====================================
                            COMPLAINT INFORMATION
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <div>

                                    <h2>
                                        Complaint Information
                                    </h2>

                                    <p className="card-subtitle">
                                        Complaint #
                                        {complaint.complaintNumber}
                                    </p>

                                </div>


                                <span
                                    className={`status ${getStatusClass(
                                        complaint.status
                                    )}`}
                                >
                                    {complaint.status || "-"}
                                </span>

                            </div>


                            <div className="details-grid">


                                <div className="detail-item">

                                    <label>
                                        Complaint ID
                                    </label>

                                    <h4>
                                        {
                                            complaint.complaintNumber
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Complaint Title
                                    </label>

                                    <h4>
                                        {
                                            complaint.title ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Department
                                    </label>

                                    <h4>
                                        {
                                            complaint.department ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Category
                                    </label>

                                    <h4>
                                        {
                                            complaint.category ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Priority
                                    </label>

                                    <h4 className="priority high">

                                        {
                                            complaint.priority ||
                                            "-"
                                        }

                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Submitted On
                                    </label>

                                    <h4>
                                        {formatDateTime(
                                            complaint.createdAt
                                        )}
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Assigned On
                                    </label>

                                    <h4>
                                        {formatDateTime(
                                            complaint.assignedAt
                                        )}
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Resolved On
                                    </label>

                                    <h4>
                                        {formatDateTime(
                                            complaint.resolveAt
                                        )}
                                    </h4>

                                </div>


                            </div>

                        </div>


                        {/* =====================================
                            CITIZEN INFORMATION
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <h2>
                                    Citizen Information
                                </h2>

                            </div>


                            <div className="details-grid">


                                <div className="detail-item">

                                    <label>
                                        First Name
                                    </label>

                                    <h4>
                                        {
                                            complaint.firstName ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Last Name
                                    </label>

                                    <h4>
                                        {
                                            complaint.lastName ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Email Address
                                    </label>

                                    <h4>
                                        {
                                            complaint.email ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                                <div className="detail-item">

                                    <label>
                                        Contact Number
                                    </label>

                                    <h4>
                                        {
                                            complaint.contact ||
                                            "-"
                                        }
                                    </h4>

                                </div>


                            </div>

                        </div>


                        {/* =====================================
                            DESCRIPTION
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <h2>
                                    Complaint Description
                                </h2>

                            </div>


                            <div className="description-box">

                                <h3>
                                    {
                                        complaint.title ||
                                        "-"
                                    }
                                </h3>

                                <p>
                                    {
                                        complaint.description ||
                                        "-"
                                    }
                                </p>

                            </div>

                        </div>


                        {/* =====================================
                            ASSIGNED ENGINEER
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <div>

                                    <h2>
                                        Assigned Engineer
                                    </h2>

                                    <p className="card-subtitle">
                                        Engineer responsible for
                                        resolving this complaint
                                    </p>

                                </div>

                            </div>


                            {complaint.engineerFirstName ? (

                                <div className="details-grid">


                                    <div className="detail-item">

                                        <label>
                                            First Name
                                        </label>

                                        <h4>
                                            {
                                                complaint.engineerFirstName
                                            }
                                        </h4>

                                    </div>


                                    <div className="detail-item">

                                        <label>
                                            Last Name
                                        </label>

                                        <h4>
                                            {
                                                complaint.engineerLastName
                                            }
                                        </h4>

                                    </div>


                                    <div className="detail-item">

                                        <label>
                                            Department
                                        </label>

                                        <h4>
                                            {
                                                complaint.department
                                            }
                                        </h4>

                                    </div>


                                </div>

                            ) : (

                                <div className="resolution-pending">

                                    <p>
                                        No engineer has been assigned
                                        to this complaint yet.
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* =====================================
                            LATEST UPDATE
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <h2>
                                    Latest Update
                                </h2>


                                <span
                                    className={`status ${getStatusClass(
                                        complaint.status
                                    )}`}
                                >
                                    {
                                        complaint.status ||
                                        "-"
                                    }
                                </span>

                            </div>


                            <div className="update-box">

                                <h3>
                                    {
                                        complaint.status ||
                                        "Complaint Update"
                                    }
                                </h3>


                                <p className="update-date">

                                    {
                                        formatDateTime(
                                            complaint.updateAt
                                        )
                                    }

                                </p>


                                <p>

                                    {
                                        complaint.engineerWorkNote ||
                                        "No work update has been provided yet."
                                    }

                                </p>

                            </div>

                        </div>


                        {/* =====================================
                            STATUS PROGRESS
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <h2>
                                    Status Progress
                                </h2>

                            </div>


                            <div className="status-progress">

                                <div className="progress-line"></div>


                                {/* SUBMITTED */}

                                <div className="progress-step completed">

                                    <div className="progress-circle">
                                        ✓
                                    </div>

                                    <h4>
                                        Submitted
                                    </h4>

                                    <span>
                                        {formatDate(
                                            complaint.createdAt
                                        )}
                                    </span>

                                </div>


                                {/* ASSIGNED */}

                                <div
                                    className={`progress-step ${
                                        complaint.assignedAt
                                            ? "completed"
                                            : ""
                                    }`}
                                >

                                    <div className="progress-circle">

                                        {
                                            complaint.assignedAt
                                                ? "✓"
                                                : "2"
                                        }

                                    </div>

                                    <h4>
                                        Assigned
                                    </h4>

                                    <span>

                                        {
                                            complaint.assignedAt
                                                ? formatDate(
                                                    complaint.assignedAt
                                                )
                                                : "Pending"
                                        }

                                    </span>

                                </div>


                                {/* IN PROGRESS */}

                                <div
                                    className={`progress-step ${
                                        [
                                            "IN_PROGRESS",
                                            "In Progress"
                                        ].includes(
                                            complaint.status
                                        )
                                            ? "current"
                                            : complaint.status ===
                                              "RESOLVED"
                                            ? "completed"
                                            : ""
                                    }`}
                                >

                                    <div className="progress-circle">

                                        {
                                            complaint.status ===
                                            "RESOLVED"
                                                ? "✓"
                                                : "⏳"
                                        }

                                    </div>

                                    <h4>
                                        In Progress
                                    </h4>

                                    <span>

                                        {
                                            [
                                                "IN_PROGRESS",
                                                "In Progress"
                                            ].includes(
                                                complaint.status
                                            )
                                                ? "Current"
                                                : "-"
                                        }

                                    </span>

                                </div>


                                {/* RESOLVED */}

                                <div
                                    className={`progress-step ${
                                        complaint.status ===
                                            "RESOLVED" ||
                                        complaint.status ===
                                            "Resolved"
                                            ? "completed"
                                            : ""
                                    }`}
                                >

                                    <div className="progress-circle">

                                        {
                                            complaint.status ===
                                                "RESOLVED" ||
                                            complaint.status ===
                                                "Resolved"
                                                ? "✓"
                                                : "4"
                                        }

                                    </div>

                                    <h4>
                                        Resolved
                                    </h4>

                                    <span>

                                        {
                                            complaint.resolveAt
                                                ? formatDate(
                                                    complaint.resolveAt
                                                )
                                                : "Pending"
                                        }

                                    </span>

                                </div>


                            </div>

                        </div>


                        {/* =====================================
                            COMPLAINT MEDIA
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <div>

                                    <h2>
                                        Complaint Media
                                    </h2>

                                    <p className="card-subtitle">
                                        Images, videos and documents
                                        related to this complaint
                                    </p>

                                </div>


                                {complaint.media &&
                                    complaint.media.length > 0 && (

                                    <span className="media-count">

                                        {complaint.media.length}

                                        {" File"}

                                        {complaint.media.length > 1
                                            ? "s"
                                            : ""}

                                    </span>

                                )}

                            </div>


                            {complaint.media &&
                            complaint.media.length > 0 ? (

                                <>

                                    {/* =================================
                                        ORIGINAL COMPLAINT MEDIA
                                    ================================== */}

                                    <MediaSection
                                        title="Complaint Media"
                                        subtitle="Images, videos and documents submitted with the complaint"
                                        media={
                                            complaintMedia
                                        }
                                    />


                                    {/* =================================
                                        ENGINEER BEFORE MEDIA
                                    ================================== */}

                                    <MediaSection
                                        title="Engineer Upload Before"
                                        subtitle="Media uploaded by the engineer before starting the repair work"
                                        media={
                                            engineerBeforeMedia
                                        }
                                    />


                                    {/* =================================
                                        ENGINEER AFTER MEDIA
                                    ================================== */}

                                    <MediaSection
                                        title="Engineer Upload After"
                                        subtitle="Media uploaded by the engineer after completing the repair work"
                                        media={
                                            engineerAfterMedia
                                        }
                                    />


                                    {/* =================================
                                        UNKNOWN MEDIA TYPE
                                    ================================== */}

                                    {complaint.media.filter(
                                        file =>
                                            file.mediaType &&
                                            ![
                                                "BEFORE",
                                                "AFTER"
                                            ].includes(
                                                file.mediaType.toUpperCase()
                                            )
                                    ).length > 0 && (

                                        <MediaSection
                                            title="Other Media"
                                            subtitle="Other files related to this complaint"
                                            media={
                                                complaint.media.filter(
                                                    file =>
                                                        file.mediaType &&
                                                        ![
                                                            "BEFORE",
                                                            "AFTER"
                                                        ].includes(
                                                            file.mediaType.toUpperCase()
                                                        )
                                                )
                                            }
                                        />

                                    )}

                                </>

                            ) : (

                                <div className="no-media">

                                    <div className="no-media-icon">
                                        📎
                                    </div>

                                    <h3>
                                        No Media Available
                                    </h3>

                                    <p>
                                        No images, videos or documents
                                        have been attached to this
                                        complaint.
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* =====================================
                            RESOLUTION
                        ====================================== */}

                        <div className="card">

                            <div className="card-title">

                                <h2>
                                    Resolution Details
                                </h2>


                                <span
                                    className={`status ${getStatusClass(
                                        complaint.status
                                    )}`}
                                >
                                    {
                                        complaint.status ||
                                        "-"
                                    }
                                </span>

                            </div>


                            {complaint.resolveAt ? (

                                <div className="resolution-complete">

                                    <p>
                                        Your complaint has been
                                        resolved successfully.
                                    </p>

                                    <span>

                                        Resolved on{" "}

                                        {
                                            formatDateTime(
                                                complaint.resolveAt
                                            )
                                        }

                                    </span>

                                </div>

                            ) : (

                                <div className="resolution-pending">

                                    <p>
                                        Your complaint has not been
                                        resolved yet. The assigned
                                        engineer is currently working
                                        on the issue.
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* =====================================
                            FEEDBACK
                        ====================================== */}

                        <div className="card feedback-card">

                            <div className="card-title">

                                <h2>
                                    Citizen Feedback
                                </h2>

                            </div>


                            <p className="feedback-text">

                                After your complaint is resolved,
                                you can share your experience and
                                provide feedback about the service.

                            </p>


                            {complaint.status ===
                                "RESOLVED" ||
                            complaint.status ===
                                "Resolved" ? (

                                <>

                                    <div className="rating">
                                        ★ ★ ★ ★ ★
                                    </div>


                                    <textarea
                                        placeholder="Write your feedback here..."
                                    ></textarea>


                                    <button
                                        className="feedback-button"
                                    >
                                        Submit Feedback
                                    </button>

                                </>

                            ) : (

                                <div className="feedback-disabled">

                                    <p>
                                        Feedback will be available
                                        after your complaint is
                                        resolved.
                                    </p>

                                </div>

                            )}

                        </div>


                    </div>

                )}

            </div>

        </div>

    );

}

export default ComplaintTracking;