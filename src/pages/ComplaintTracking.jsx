import { useState } from "react";
import "../styles/ComplaintTracking.css";
import { useNavigate } from "react-router-dom";

function ComplaintTracking() {
  const navigate = useNavigate();

  const [complaintId, setComplaintId] = useState("");
  const [showComplaint, setShowComplaint] = useState(false);

  const [complaint, setComplaint] = useState({
    id: "FXM-2026-001",

    title: "Large pothole near main road",

    description:
      "A large pothole has developed near the main road. It is causing difficulty for vehicles and can be dangerous for two-wheelers, especially during night time and rainy conditions.",

    status: "In Progress",

    priority: "High",

    department: "Roads & Infrastructure",

    category: "Pothole",

    submittedDate: "09 July 2026",
    assignedDate: "11 July 2026",
    expectedDate: "15 July 2026",

    citizen: {
      firstName: "Trupal",
      lastName: "Patel",
      email: "citizen@example.com",
      contact: "+91 9876543210",
    },

    location: {
      address:
        "Near C.G. Road, Navrangpura, Ahmedabad, Gujarat",
      pincode: "380009",
      latitude: "23.0365",
      longitude: "72.5660",
    },

    engineer: {
      firstName: "Rahul",
      lastName: "Sharma",
      designation: "Civil Engineer",
      department: "Roads & Infrastructure",
      contact: "+91 9876543211",
      email: "rahul.sharma@fixmycity.com",
    },

    attachments: [
      {
        name: "road-damage.jpg",
        type: "image",
      },
      {
        name: "pothole-video.mp4",
        type: "video",
      },
    ],

    latestUpdate: {
      title: "Repair Work Started",
      date: "12 July 2026",
      time: "11:00 AM",
      message:
        "The assigned engineer has inspected the location and repair work has started. The damaged road section is currently being repaired.",
    },

    resolution: {
      status: "Pending",
      date: null,
      message: null,
    },
  });

  const handleTrack = () => {
    if (!complaintId.trim()) {
      alert("Please enter Complaint ID");
      return;
    }

    setShowComplaint(true);
  };

  return (
    <div className="tracking-page">

      <div className="tracking-container">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="tracking-header">

          <h1>Track Complaint</h1>

          <p>
            Track the complete progress of your complaint
            from registration to final resolution. View
            complaint details, assigned engineer, status
            updates and resolution information.
          </p>

        </div>

        {/* =========================================
            SEARCH
        ========================================== */}

        <div className="search-card">

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter Complaint ID (Example : FXM-2026-001)"
              value={complaintId}
              onChange={(e) =>
                setComplaintId(e.target.value)
              }
            />

            <button onClick={handleTrack}>
              🔍 Track Complaint
            </button>

          </div>

        </div>

        {/* =========================================
            COMPLAINT DETAILS
        ========================================== */}

        {showComplaint && (
          <div className="tracking-content">

            {/* =====================================
                COMPLAINT INFORMATION
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <div>
                  <h2>Complaint Information</h2>

                  <p className="card-subtitle">
                    Complaint #{complaint.id}
                  </p>
                </div>

                <span className="status progress">
                  {complaint.status}
                </span>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Complaint ID</label>
                  <h4>{complaint.id}</h4>
                </div>

                <div className="detail-item">
                  <label>Complaint Title</label>
                  <h4>{complaint.title}</h4>
                </div>

                <div className="detail-item">
                  <label>Department</label>
                  <h4>{complaint.department}</h4>
                </div>

                <div className="detail-item">
                  <label>Category</label>
                  <h4>{complaint.category}</h4>
                </div>

                <div className="detail-item">
                  <label>Priority</label>

                  <h4 className="priority high">
                    {complaint.priority}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Submitted On</label>
                  <h4>{complaint.submittedDate}</h4>
                </div>

                <div className="detail-item">
                  <label>Assigned On</label>
                  <h4>{complaint.assignedDate}</h4>
                </div>

                <div className="detail-item">
                  <label>Expected Resolution</label>
                  <h4>{complaint.expectedDate}</h4>
                </div>

              </div>

            </div>

            {/* =====================================
                CITIZEN INFORMATION
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Citizen Information</h2>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <label>First Name</label>
                  <h4>
                    {complaint.citizen.firstName}
                  </h4>
                </div>

                <div className="detail-item">
                  <label>Last Name</label>
                  <h4>
                    {complaint.citizen.lastName}
                  </h4>
                </div>

                <div className="detail-item">
                  <label>Email Address</label>
                  <h4>
                    {complaint.citizen.email}
                  </h4>
                </div>

                <div className="detail-item">
                  <label>Contact Number</label>
                  <h4>
                    {complaint.citizen.contact}
                  </h4>
                </div>

              </div>

            </div>

            {/* =====================================
                COMPLAINT DESCRIPTION
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Complaint Description</h2>

              </div>

              <div className="description-box">

                <h3>
                  {complaint.title}
                </h3>

                <p>
                  {complaint.description}
                </p>

              </div>

            </div>

            {/* =====================================
                LOCATION
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Complaint Location</h2>

              </div>

              <div className="details-grid">

                <div className="detail-item full-width">
                  <label>Address</label>

                  <h4>
                    {complaint.location.address}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Pincode</label>

                  <h4>
                    {complaint.location.pincode}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Latitude</label>

                  <h4>
                    {complaint.location.latitude}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Longitude</label>

                  <h4>
                    {complaint.location.longitude}
                  </h4>

                </div>

              </div>

            </div>

            {/* =====================================
                ASSIGNED ENGINEER
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <div>
                  <h2>Assigned Engineer</h2>

                  <p className="card-subtitle">
                    Engineer responsible for resolving
                    this complaint
                  </p>
                </div>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <label>First Name</label>

                  <h4>
                    {complaint.engineer.firstName}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Last Name</label>

                  <h4>
                    {complaint.engineer.lastName}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Designation</label>

                  <h4>
                    {complaint.engineer.designation}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Department</label>

                  <h4>
                    {complaint.engineer.department}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Contact Number</label>

                  <h4>
                    {complaint.engineer.contact}
                  </h4>

                </div>

                <div className="detail-item">
                  <label>Email Address</label>

                  <h4>
                    {complaint.engineer.email}
                  </h4>

                </div>

              </div>

            </div>

            {/* =====================================
                STATUS PROGRESS
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Status Progress</h2>

              </div>

              <div className="status-progress">

                <div className="progress-line"></div>

                <div className="progress-step completed-ok">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>Submitted</h4>

                  <span>
                    09 Jul 2026
                  </span>

                </div>

                <div className="progress-step completed-ok">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>Under Review</h4>

                  <span>
                    10 Jul 2026
                  </span>

                </div>

                <div className="progress-step completed-ok">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>Assigned</h4>

                  <span>
                    11 Jul 2026
                  </span>

                </div>

                <div className="progress-step current">

                  <div className="progress-circle">
                    ⏳
                  </div>

                  <h4>In Progress</h4>

                  <span>
                    Current
                  </span>

                </div>

                <div className="progress-step">

                  <div className="progress-circle">
                    5
                  </div>

                  <h4>Resolved</h4>

                  <span>
                    Pending
                  </span>

                </div>

              </div>

            </div>

            {/* =====================================
                LATEST UPDATE
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Latest Update</h2>

                <span className="status progress">
                  Current
                </span>

              </div>

              <div className="update-box">

                <h3>
                  {complaint.latestUpdate.title}
                </h3>

                <p className="update-date">
                  {complaint.latestUpdate.date}
                  {" • "}
                  {complaint.latestUpdate.time}
                </p>

                <p>
                  {complaint.latestUpdate.message}
                </p>

              </div>

            </div>

            {/* =====================================
                ATTACHMENTS
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Complaint Evidence</h2>

              </div>

              <div className="attachment-list">

                {complaint.attachments.map(
                  (file, index) => (

                    <div
                      className="attachment-item"
                      key={index}
                    >

                      <div className="attachment-icon">

                        {file.type === "image" && "🖼️"}

                        {file.type === "video" && "🎥"}

                        {file.type === "pdf" && "📄"}

                      </div>

                      <div className="attachment-info">

                        <h4>
                          {file.name}
                        </h4>

                        <span>
                          {file.type.toUpperCase()}
                        </span>

                      </div>

                      <button
                        type="button"
                        className="view-attachment"
                      >
                        View
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =====================================
                STATUS HISTORY
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Status History</h2>

              </div>

              <div className="history-container">

                {/* Submitted */}

                <div className="history-item">

                  <div className="history-icon completed-ok">
                    ✓
                  </div>

                  <div className="history-box">

                    <h4>
                      Complaint Submitted
                    </h4>

                    <p>
                      09 July 2026 • 10:30 AM
                    </p>

                    <span>
                      Your complaint has been
                      successfully submitted and
                      registered in the system.
                    </span>

                  </div>

                </div>

                {/* Under Review */}

                <div className="history-item">

                  <div className="history-icon completed-ok">
                    ✓
                  </div>

                  <div className="history-box">

                    <h4>
                      Complaint Under Review
                    </h4>

                    <p>
                      10 July 2026 • 09:15 AM
                    </p>

                    <span>
                      The Roads & Infrastructure
                      Department verified your
                      complaint details.
                    </span>

                  </div>

                </div>

                {/* Assigned */}

                <div className="history-item">

                  <div className="history-icon completed-ok">
                    ✓
                  </div>

                  <div className="history-box">

                    <h4>
                      Engineer Assigned
                    </h4>

                    <p>
                      11 July 2026 • 03:20 PM
                    </p>

                    <span>
                      Rahul Sharma has been assigned
                      to inspect and resolve this issue.
                    </span>

                  </div>

                </div>

                {/* In Progress */}

                <div className="history-item active">

                  <div className="history-icon current">
                    ⏳
                  </div>

                  <div className="history-box">

                    <h4>
                      Repair Work Started
                    </h4>

                    <p>
                      12 July 2026 • 11:00 AM
                    </p>

                    <span>
                      Repair work is currently in
                      progress. Further updates will
                      appear here automatically.
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================
                RESOLUTION
            ====================================== */}

            <div className="card">

              <div className="card-title">

                <h2>Resolution Details</h2>

                <span className="status progress">
                  {complaint.resolution.status}
                </span>

              </div>

              {complaint.resolution.status ===
              "Pending" ? (

                <div className="resolution-pending">

                  <p>
                    Your complaint has not been
                    resolved yet. The assigned engineer
                    is currently working on the issue.
                  </p>

                </div>

              ) : (

                <div className="resolution-complete">

                  <p>
                    {complaint.resolution.message}
                  </p>

                  <span>
                    Resolved on{" "}
                    {complaint.resolution.date}
                  </span>

                </div>

              )}

            </div>

            {/* =====================================
                CITIZEN FEEDBACK
            ====================================== */}

            <div className="card feedback-card">

              <div className="card-title">

                <h2>Citizen Feedback</h2>

              </div>

              <p className="feedback-text">

                After your complaint is resolved,
                you can share your experience and
                provide feedback about the service.

              </p>

              {complaint.status === "Resolved" ? (

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
                    Feedback will be available after
                    your complaint is resolved.
                  </p>

                </div>

              )}

            </div>

            {/* =====================================
                ACTIONS
            ====================================== */}

            {/* <div className="tracking-actions">

              <button
                type="button"
                onClick={() =>
                  navigate("/report-complaint")
                }
                className="secondary-button"
              >
                Report Another Complaint
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowComplaint(false);
                  setComplaintId("");
                }}
                className="secondary-button"
              >
                Track Another Complaint
              </button>

            </div> */}

          </div>
        )}

      </div>

    </div>
  );
}

export default ComplaintTracking;