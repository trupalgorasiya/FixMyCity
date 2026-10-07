import { useEffect, useState } from "react";
import "../../styles/ComplaintTracking.css";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaintByNumber } from "../../api/citizenApi";
import { API_BASE_URL } from "../../api/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issues if needed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createTrackingMarkerIcon = (color) => {
    return L.divIcon({
        className: "custom-map-marker",
        html: `<div style="
            background: ${color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });
};

const getStatusColor = (status) => {
    switch ((status || "").toUpperCase()) {
        case "CREATED":
        case "PENDING":
            return "#ef4444";
        case "ASSIGNED":
            return "#f59e0b";
        case "IN_PROGRESS":
            return "#8b5cf6";
        case "RESOLVED":
            return "#22c55e";
        case "REJECTED":
            return "#6b7280";
        default:
            return "#3b82f6";
    }
};

function MediaSection({ title, subtitle, media, onPreview }) {
    if (!media || media.length === 0) {
        return null;
    }

    return (
        <div className="media-section">
            <div className="media-section-header">
                <div>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
                <span className="media-section-count">
                    {media.length}
                </span>
            </div>

            <div className="media-grid">
                {media.map((file) => {
                    const mediaUrl =
                        file.fileUrl?.startsWith("http")
                            ? file.fileUrl
                            : `${API_BASE_URL}/citizen/media/${file.mediaId}`;

                    const fileType = file.fileType?.toLowerCase() || "";
                    const isImage = fileType.startsWith("image/");
                    const isVideo = fileType.startsWith("video/");
                    const isPdf = fileType === "application/pdf";

                    return (
                        <div className="media-card" key={file.mediaId}>
                            <div 
                                className="media-preview"
                                onClick={() => onPreview({ ...file, mediaUrl, isImage, isVideo, isPdf })}
                                style={{ cursor: "pointer" }}
                                title="Click to preview"
                            >
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
                                        Your browser does not support video playback.
                                    </video>
                                )}
                                {isPdf && (
                                    <iframe
                                        src={mediaUrl}
                                        title={file.fileName}
                                        className="media-pdf"
                                    />
                                )}
                                {!isImage && !isVideo && !isPdf && (
                                    <div className="unknown-media">
                                        <div className="unknown-icon">📄</div>
                                        <p>Preview not available</p>
                                    </div>
                                )}
                            </div>

                            <div className="media-info">
                                <div className="media-file-icon">
                                    {isImage && "🖼️"}
                                    {isVideo && "🎥"}
                                    {isPdf && "📄"}
                                    {!isImage && !isVideo && !isPdf && "📎"}
                                </div>
                                <div className="media-details">
                                    <h4 title={file.fileName}>{file.fileName}</h4>
                                    <span>
                                        {isImage && "IMAGE"}
                                        {isVideo && "VIDEO"}
                                        {isPdf && "PDF"}
                                        {!isImage && !isVideo && !isPdf && "FILE"}
                                    </span>
                                </div>
                            </div>

                            <div className="media-actions">
                                <button
                                    type="button"
                                    className="view-attachment"
                                    onClick={() => onPreview({ ...file, mediaUrl, isImage, isVideo, isPdf })}
                                >
                                    🔍 Preview
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TrackComplaints() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [complaintId, setComplaintId] = useState(id || "");
    const [activeMedia, setActiveMedia] = useState(null);

    // Feedback State
    const [rating, setRating] = useState(5);
    const [feedbackText, setFeedbackText] = useState("");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [existingFeedback, setExistingFeedback] = useState(null);
    const [submittingFeedback, setSubmittingFeedback] = useState(false);
    const [isEditingFeedback, setIsEditingFeedback] = useState(false);
    const [feedbackError, setFeedbackError] = useState("");

    const fetchExistingFeedback = async (complaintNum) => {
        if (!complaintNum) return;
        try {
            const res = await fetch(`${API_BASE_URL}/feedback/complaint/${complaintNum}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.rating) {
                    setExistingFeedback(data);
                    setRating(data.rating);
                    setFeedbackText(data.comments || "");
                    setFeedbackSubmitted(true);
                }
            } else {
                setExistingFeedback(null);
                setFeedbackSubmitted(false);
            }
        } catch {
            setExistingFeedback(null);
            setFeedbackSubmitted(false);
        }
    };

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchComplaint = async () => {
            try {
                setLoading(true);
                setError("");
                setFeedbackSubmitted(false);
                setExistingFeedback(null);
                setIsEditingFeedback(false);

                const response = await getComplaintByNumber(id);
                const comp = response.data;
                setComplaint(comp);

                if (comp && comp.status && comp.status.toUpperCase() === "RESOLVED") {
                    fetchExistingFeedback(comp.complaintNumber);
                }
            } catch (err) {
                console.error("Complaint Fetch Error:", err);
                if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else if (err.response?.data) {
                    setError(
                        typeof err.response.data === "string"
                            ? err.response.data
                            : "Complaint not found."
                    );
                } else {
                    setError("Unable to fetch complaint details.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchComplaint();
    }, [id]);

    const handleTrack = () => {
        if (!complaintId.trim()) {
            setError("Please enter Complaint ID.");
            return;
        }
        navigate(`/user/complaint-tracking/${complaintId.trim()}`);
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusClass = (status) => {
        const s = (status || "").toLowerCase().replace(/_/g, "-");
        if (s === "in-progress" || s === "progress") return "in-progress";
        if (s === "created" || s === "pending") return "pending";
        if (s === "assigned") return "assigned";
        if (s === "resolved") return "resolved";
        if (s === "rejected") return "rejected";
        return s;
    };

    // Calculate dynamic timeline progression
    const rawStatus = (complaint?.status || "").toUpperCase();
    const isRejected = rawStatus === "REJECTED";
    const isResolved = rawStatus === "RESOLVED";
    const isInProgress = rawStatus === "IN_PROGRESS";
    const isAssigned =
        rawStatus === "ASSIGNED" ||
        isInProgress ||
        isResolved ||
        Boolean(complaint?.assignedAt) ||
        Boolean(complaint?.engineerFirstName);

    let progressPercentage = 0;
    if (isRejected) {
        progressPercentage = 100;
    } else if (isResolved) {
        progressPercentage = 100;
    } else if (isInProgress) {
        progressPercentage = 66;
    } else if (isAssigned) {
        progressPercentage = 33;
    } else {
        progressPercentage = 0;
    }

    const hasCoordinates =
        complaint?.latitude &&
        complaint?.longitude &&
        !isNaN(parseFloat(complaint.latitude)) &&
        !isNaN(parseFloat(complaint.longitude)) &&
        parseFloat(complaint.latitude) !== 0 &&
        parseFloat(complaint.longitude) !== 0;

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!complaint) return;
        try {
            setSubmittingFeedback(true);
            setFeedbackError("");
            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("jwt") ||
                localStorage.getItem("accessToken") ||
                "";

            const payload = {
                complaintNumber: complaint.complaintNumber,
                complaintId: complaint.complaintId,
                rating: Number(rating),
                comments: feedbackText.trim()
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
                throw new Error(errData.message || "Failed to submit feedback.");
            }

            const data = await res.json();
            setExistingFeedback(data);
            setFeedbackSubmitted(true);
            setIsEditingFeedback(false);
        } catch (err) {
            setFeedbackError(err.message || "Unable to save feedback.");
        } finally {
            setSubmittingFeedback(false);
        }
    };

    if (loading) {
        return (
            <div className="tracking-page">
                <div className="tracking-container">
                    <div className="card">
                        <div className="no-data-content">
                            <h3>Loading Complaint...</h3>
                            <p>Please wait while we fetch your complaint details.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tracking-page">
            <div className="tracking-container">
                {/* HEADER */}
                <div className="tracking-header">
                    <h1>Track Complaint</h1>
                    <p>
                        Track the real-time progress of your complaint from submission to final resolution.
                    </p>
                </div>

                {/* SEARCH */}
                {!id && (
                    <div className="search-card">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Enter Complaint ID (e.g. CMP-10082026-31)"
                                value={complaintId}
                                onChange={(e) => setComplaintId(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                            />
                            <button onClick={handleTrack}>
                                🔍 Track Complaint
                            </button>
                        </div>
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="card">
                        <div className="no-data-content">
                            <h3>Complaint Not Found</h3>
                            <p>{error}</p>
                            <button
                                type="button"
                                className="reset-search-btn"
                                onClick={() => {
                                    setError("");
                                    setComplaint(null);
                                }}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* COMPLAINT DETAILS */}
                {complaint && (
                    <div className="tracking-content">
                        {/* COMPLAINT INFORMATION */}
                        <div className="card">
                            <div className="card-title">
                                <div>
                                    <h2>Complaint Information</h2>
                                    <p className="card-subtitle">
                                        Complaint #{complaint.complaintNumber}
                                    </p>
                                </div>
                                <span className={`status ${getStatusClass(complaint.status)}`}>
                                    {complaint.status || "-"}
                                </span>
                            </div>

                            <div className="details-grid">
                                <div className="detail-item">
                                    <label>Complaint ID</label>
                                    <h4>{complaint.complaintNumber}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Complaint Title</label>
                                    <h4>{complaint.title || "-"}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Department</label>
                                    <h4>{complaint.department || "-"}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Category</label>
                                    <h4>{complaint.category || "-"}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Priority</label>
                                    <h4 className={`priority ${String(complaint.priority).toLowerCase()}`}>
                                        {complaint.priority || "NORMAL"}
                                    </h4>
                                </div>
                                <div className="detail-item">
                                    <label>Submitted On</label>
                                    <h4>{formatDateTime(complaint.createdAt)}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Assigned On</label>
                                    <h4>{formatDateTime(complaint.assignedAt)}</h4>
                                </div>
                                <div className="detail-item">
                                    <label>Resolved On</label>
                                    <h4>{formatDateTime(complaint.resolveAt)}</h4>
                                </div>
                            </div>
                        </div>

                        {/* STATUS PROGRESS (DYNAMIC TIMELINE) */}
                        <div className="card">
                            <div className="card-title">
                                <div>
                                    <h2>Status Progress</h2>
                                    <p className="card-subtitle">Live milestone tracking for your ticket</p>
                                </div>
                                <span className={`status ${getStatusClass(complaint.status)}`}>
                                    {complaint.status || "Submitted"}
                                </span>
                            </div>

                            <div className="status-progress">
                                {/* DYNAMIC PROGRESS LINE */}
                                <div
                                    className="progress-line"
                                    style={{
                                        width: `${progressPercentage}%`,
                                        background: isRejected ? "#ef4444" : "#16a34a"
                                    }}
                                ></div>

                                {/* STEP 1: SUBMITTED */}
                                <div className="progress-step completed">
                                    <div className="progress-circle">✓</div>
                                    <h4>Submitted</h4>
                                    <span>{formatDate(complaint.createdAt)}</span>
                                </div>

                                {!isRejected ? (
                                    <>
                                        {/* STEP 2: ASSIGNED */}
                                        <div className={`progress-step ${isAssigned ? "completed" : ""}`}>
                                            <div className="progress-circle">
                                                {isAssigned ? "✓" : "2"}
                                            </div>
                                            <h4>Assigned</h4>
                                            <span>
                                                {complaint.assignedAt
                                                    ? formatDate(complaint.assignedAt)
                                                    : isAssigned
                                                    ? "Assigned"
                                                    : "Pending"}
                                            </span>
                                        </div>

                                        {/* STEP 3: IN PROGRESS */}
                                        <div
                                            className={`progress-step ${
                                                isInProgress
                                                    ? "current"
                                                    : isResolved
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        >
                                            <div className="progress-circle">
                                                {isResolved ? "✓" : isInProgress ? "⚡" : "3"}
                                            </div>
                                            <h4>In Progress</h4>
                                            <span>
                                                {isInProgress
                                                    ? "Work Started"
                                                    : isResolved
                                                    ? "Completed"
                                                    : "Pending"}
                                            </span>
                                        </div>

                                        {/* STEP 4: RESOLVED */}
                                        <div className={`progress-step ${isResolved ? "completed" : ""}`}>
                                            <div className="progress-circle">
                                                {isResolved ? "✓" : "4"}
                                            </div>
                                            <h4>Resolved</h4>
                                            <span>
                                                {complaint.resolveAt
                                                    ? formatDate(complaint.resolveAt)
                                                    : "Pending"}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    /* REJECTED STEP */
                                    <div className="progress-step rejected">
                                        <div className="progress-circle">✕</div>
                                        <h4>Rejected</h4>
                                        <span>Issue Closed</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COMPLAINT LOCATION & INTERACTIVE MAP */}
                        <div className="card">
                            <div className="card-title">
                                <div>
                                    <h2>Complaint Location & Geotag</h2>
                                    <p className="card-subtitle">
                                        Accurate pin and address on the civic map
                                    </p>
                                </div>
                                <span className={`status ${getStatusClass(complaint.status)}`}>
                                    📍 {hasCoordinates ? "GPS Verified" : "Address Recorded"}
                                </span>
                            </div>

                            {hasCoordinates ? (
                                <div className="tracking-map-container">
                                    <MapContainer
                                        center={[parseFloat(complaint.latitude), parseFloat(complaint.longitude)]}
                                        zoom={15}
                                        style={{ width: "100%", height: "100%" }}
                                        scrollWheelZoom={false}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker
                                            position={[parseFloat(complaint.latitude), parseFloat(complaint.longitude)]}
                                            icon={createTrackingMarkerIcon(getStatusColor(complaint.status))}
                                        >
                                            <Popup>
                                                <div style={{ padding: "4px" }}>
                                                    <strong style={{ fontSize: "14px", color: "#0f172a" }}>
                                                        {complaint.title || "Complaint"}
                                                    </strong>
                                                    <p style={{ margin: "4px 0", fontSize: "12px", color: "#475569" }}>
                                                        {complaint.address || "Location"}
                                                    </p>
                                                    <div style={{
                                                        marginTop: "6px",
                                                        fontSize: "11px",
                                                        fontWeight: "bold",
                                                        color: getStatusColor(complaint.status),
                                                        textTransform: "uppercase"
                                                    }}>
                                                        Status: {complaint.status}
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            ) : null}

                            <div className="tracking-location-grid">
                                <div className="tracking-loc-badge">
                                    <label>Street Address</label>
                                    <p>{complaint.address || "Address not provided"}</p>
                                </div>
                                {complaint.landmark && (
                                    <div className="tracking-loc-badge">
                                        <label>Landmark</label>
                                        <p>{complaint.landmark}</p>
                                    </div>
                                )}
                                {complaint.pincode && (
                                    <div className="tracking-loc-badge">
                                        <label>Pincode</label>
                                        <p>{complaint.pincode}</p>
                                    </div>
                                )}
                                {hasCoordinates && (
                                    <div className="tracking-loc-badge">
                                        <label>Coordinates (Lat, Long)</label>
                                        <p>{complaint.latitude}, {complaint.longitude}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="card">
                            <div className="card-title">
                                <h2>Complaint Description</h2>
                            </div>
                            <div className="description-box">
                                <h3>{complaint.title || "-"}</h3>
                                <p>{complaint.description || "No detailed description provided."}</p>
                            </div>
                        </div>

                        {/* ASSIGNED ENGINEER */}
                        <div className="card">
                            <div className="card-title">
                                <div>
                                    <h2>Assigned Engineer</h2>
                                    <p className="card-subtitle">
                                        Engineer responsible for resolving this complaint
                                    </p>
                                </div>
                                {complaint.engineerFirstName && (
                                    <span className="status assigned">Assigned</span>
                                )}
                            </div>

                            {complaint.engineerFirstName ? (
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <label>First Name</label>
                                        <h4>{complaint.engineerFirstName}</h4>
                                    </div>
                                    <div className="detail-item">
                                        <label>Last Name</label>
                                        <h4>{complaint.engineerLastName || "-"}</h4>
                                    </div>
                                    <div className="detail-item">
                                        <label>Department</label>
                                        <h4>{complaint.department || "-"}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="resolution-pending">
                                    <p>No engineer has been assigned to this complaint yet.</p>
                                </div>
                            )}
                        </div>

                        {/* LATEST UPDATE / ENGINEER WORK NOTE */}
                        <div className="card">
                            <div className="card-title">
                                <h2>Latest Update & Field Notes</h2>
                                <span className={`status ${getStatusClass(complaint.status)}`}>
                                    {complaint.status || "-"}
                                </span>
                            </div>

                            <div className="update-box">
                                <h3>{complaint.status || "Complaint Update"}</h3>
                                <p className="update-date">
                                    {formatDateTime(complaint.updateAt || complaint.assignedAt || complaint.createdAt)}
                                </p>
                                <p>
                                    {complaint.engineerWorkNote ||
                                        "No field work notes have been posted yet."}
                                </p>
                            </div>
                        </div>

                        {/* COMPLAINT MEDIA WITH LIGHTBOX */}
                        <div className="card">
                            <div className="card-title">
                                <div>
                                    <h2>Complaint Media & Proofs</h2>
                                    <p className="card-subtitle">
                                        Photos, videos, and documents uploaded by citizen and engineer
                                    </p>
                                </div>
                                {complaint.media && complaint.media.length > 0 && (
                                    <span className="media-count">
                                        {complaint.media.length} File{complaint.media.length > 1 ? "s" : ""}
                                    </span>
                                )}
                            </div>

                            {complaint.media && complaint.media.length > 0 ? (
                                <div className="complaint-media-container">
                                    <MediaSection
                                        title="Citizen Complaint Media"
                                        subtitle="Images and media submitted with the complaint"
                                        media={complaint.media.filter(
                                            (file) => !file.mediaType || file.mediaType.trim() === ""
                                        )}
                                        onPreview={setActiveMedia}
                                    />

                                    <MediaSection
                                        title="Engineer Before-Work Media"
                                        subtitle="Field inspection media uploaded before work started"
                                        media={complaint.media.filter(
                                            (file) => file.mediaType?.toUpperCase() === "BEFORE"
                                        )}
                                        onPreview={setActiveMedia}
                                    />

                                    <MediaSection
                                        title="Engineer After-Work Media"
                                        subtitle="Resolution proof uploaded after completion"
                                        media={complaint.media.filter(
                                            (file) => file.mediaType?.toUpperCase() === "AFTER"
                                        )}
                                        onPreview={setActiveMedia}
                                    />
                                </div>
                            ) : (
                                <div className="no-media">
                                    <div className="no-media-icon">📎</div>
                                    <h3>No Media Available</h3>
                                    <p>No photos or media files have been attached to this ticket.</p>
                                </div>
                            )}
                        </div>

                        {/* RESOLUTION DETAILS */}
                        <div className="card">
                            <div className="card-title">
                                <h2>Resolution Details</h2>
                                <span className={`status ${getStatusClass(complaint.status)}`}>
                                    {complaint.status || "-"}
                                </span>
                            </div>

                            {complaint.resolveAt || isResolved ? (
                                <div className="resolution-complete">
                                    <p>🎉 Your complaint has been marked as resolved.</p>
                                    <span>
                                        Resolved on {formatDateTime(complaint.resolveAt || complaint.updateAt)}
                                    </span>
                                </div>
                            ) : isRejected ? (
                                <div className="resolution-pending" style={{ borderColor: "#fca5a5" }}>
                                    <p style={{ color: "#dc2626", fontWeight: "600" }}>
                                        This complaint has been rejected by the department.
                                    </p>
                                </div>
                            ) : (
                                <div className="resolution-pending">
                                    <p>
                                        Your complaint is currently active. The assigned department team is handling the issue.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* CITIZEN FEEDBACK SECTION */}
                        <div className="card feedback-card">
                            <div className="card-title">
                                <h2>Citizen Feedback</h2>
                                {feedbackSubmitted && (
                                    <span className="status resolved">Feedback Recorded ✓</span>
                                )}
                            </div>

                            {isResolved ? (
                                feedbackSubmitted && !isEditingFeedback ? (
                                    <div className="resolution-complete" style={{ marginTop: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "12px", padding: "18px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                                            <div>
                                                <p style={{ color: "#166534", fontWeight: "700", margin: 0, fontSize: "16px" }}>
                                                    Your Rating: <span style={{ color: "#f59e0b", letterSpacing: "2px" }}>{"★".repeat(existingFeedback?.rating || rating)}</span> ({(existingFeedback?.rating || rating)}/5)
                                                </p>
                                                <small style={{ color: "#65a30d" }}>Submitted after complaint resolution</small>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingFeedback(true)}
                                                style={{
                                                    background: "#ffffff",
                                                    border: "1px solid #16a34a",
                                                    color: "#16a34a",
                                                    padding: "6px 14px",
                                                    borderRadius: "8px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                ✏️ Edit Feedback
                                            </button>
                                        </div>
                                        {existingFeedback?.comments && (
                                            <div style={{ marginTop: "12px", background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                                                <span style={{ color: "#374151", fontStyle: "italic", fontSize: "14px" }}>
                                                    "{existingFeedback.comments}"
                                                </span>
                                            </div>
                                        )}
                                        <span style={{ display: "block", marginTop: "10px", fontSize: "12.5px", color: "#64748b" }}>
                                            Thank you! Your feedback helps the municipality monitor department response and service quality.
                                        </span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFeedbackSubmit} style={{ marginTop: "10px" }}>
                                        <p className="feedback-text">
                                            How satisfied are you with the resolution of this complaint? Give a rating out of 5:
                                        </p>
                                        <div className="rating" style={{ display: "flex", gap: "10px", margin: "14px 0", cursor: "pointer" }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    style={{
                                                        color: star <= rating ? "#f59e0b" : "#cbd5e1",
                                                        fontSize: "32px",
                                                        transition: "transform 0.15s ease",
                                                        transform: star <= rating ? "scale(1.1)" : "scale(1)"
                                                    }}
                                                    title={`${star} Star${star > 1 ? "s" : ""}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#475569", alignSelf: "center", marginLeft: "8px" }}>
                                                {rating} / 5 Stars
                                            </span>
                                        </div>

                                        <textarea
                                            placeholder="Write your feedback or comments here (e.g., quality of repair, timeliness, engineer behavior)..."
                                            value={feedbackText}
                                            onChange={(e) => setFeedbackText(e.target.value)}
                                            style={{
                                                width: "100%",
                                                minHeight: "110px",
                                                padding: "14px",
                                                borderRadius: "12px",
                                                border: "1px solid #cbd5e1",
                                                fontFamily: "inherit",
                                                fontSize: "14px"
                                            }}
                                        ></textarea>

                                        {feedbackError && (
                                            <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>
                                                {feedbackError}
                                            </p>
                                        )}

                                        <div style={{ display: "flex", gap: "10px", marginTop: "14px", alignItems: "center" }}>
                                            <button
                                                type="submit"
                                                className="feedback-button"
                                                disabled={submittingFeedback}
                                                style={{
                                                    padding: "12px 28px",
                                                    borderRadius: "12px",
                                                    background: "#2563eb",
                                                    color: "#fff",
                                                    fontWeight: "600",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    opacity: submittingFeedback ? 0.7 : 1
                                                }}
                                            >
                                                {submittingFeedback
                                                    ? "Saving..."
                                                    : isEditingFeedback
                                                    ? "Update Feedback"
                                                    : "Submit Feedback"}
                                            </button>
                                            {isEditingFeedback && (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditingFeedback(false)}
                                                    style={{
                                                        padding: "12px 20px",
                                                        borderRadius: "12px",
                                                        background: "#f1f5f9",
                                                        color: "#475569",
                                                        fontWeight: "600",
                                                        border: "1px solid #cbd5e1",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                )
                            ) : (
                                <div className="feedback-disabled">
                                    <p>
                                        Feedback will be unlocked once this complaint is marked as Resolved.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* MEDIA LIGHTBOX MODAL */}
            {activeMedia && (
                <div className="media-lightbox-overlay" onClick={() => setActiveMedia(null)}>
                    <div className="media-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <div className="media-lightbox-header">
                            <h3>{activeMedia.fileName || "Media Attachment"}</h3>
                            <button
                                type="button"
                                className="media-lightbox-close"
                                onClick={() => setActiveMedia(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="media-lightbox-body">
                            {activeMedia.isImage && (
                                <img
                                    src={activeMedia.mediaUrl}
                                    alt={activeMedia.fileName}
                                />
                            )}
                            {activeMedia.isVideo && (
                                <video controls autoPlay style={{ width: "100%" }}>
                                    <source src={activeMedia.mediaUrl} type={activeMedia.fileType} />
                                    Your browser does not support video.
                                </video>
                            )}
                            {activeMedia.isPdf && (
                                <iframe
                                    src={activeMedia.mediaUrl}
                                    title={activeMedia.fileName}
                                />
                            )}
                            {!activeMedia.isImage && !activeMedia.isVideo && !activeMedia.isPdf && (
                                <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
                                    <div style={{ fontSize: "50px", marginBottom: "16px" }}>📄</div>
                                    <p>Binary or unsupported file preview.</p>
                                </div>
                            )}
                        </div>
                        <div className="media-lightbox-footer">
                            <button
                                type="button"
                                className="media-close-modal-btn"
                                onClick={() => setActiveMedia(null)}
                            >
                                Close
                            </button>
                            <a
                                href={activeMedia.mediaUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="media-open-btn"
                            >
                                ↗ Open Full Screen
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrackComplaints;