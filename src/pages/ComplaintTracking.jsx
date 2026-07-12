import { useState } from "react";
import "../styles/ComplaintTracking.css";

function ComplaintTracking() {
  const [complaintId, setComplaintId] = useState("");
  const [showData, setShowData] = useState(false);
  // const [feedback, setFeedback] = useState("");

  const handleTrack = () => {
    if (!complaintId.trim()) {
      alert("Please enter Complaint ID");
      return;
    }

    setShowData(true);
  };

  return (
    <div className="tracking-page">
      <div className="tracking-card">
        <div className="tracking-header">
          <h1>Track Your Complaint</h1>
          <p>
            Enter your Complaint ID to view the latest progress, assigned
            officer details, and complete status history.
          </p>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter Complaint ID (Example: FXM-2026-001)"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
          />

          <button onClick={handleTrack}>
            🔍 Track Complaint
          </button>
        </div>

        {showData && (
          <div className="complaint-details">

            {/* Complaint Information */}

            <div className="detail-card">
              <div className="card-header">
                <h2>Complaint Information</h2>
                <span className="status-badge progress">
                  In Progress
                </span>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span>Complaint ID</span>
                  <strong>FXM-2026-001</strong>
                </div>

                <div className="info-item">
                  <span>Category</span>
                  <strong>Road Damage</strong>
                </div>

                {/* <div className="info-item">
                  <span>Priority</span>
                  <strong className="priority high">High</strong>
                </div> */}

                <div className="info-item">
                  <span>Date Submitted</span>
                  <strong>09 July 2026</strong>
                </div>

                <div className="info-item">
                  <span>Location</span>
                  <strong>Navrangpura, Ahmedabad</strong>
                </div>

                {/* <div className="info-item">
                  <span>Expected Resolution</span>
                  <strong>15 July 2026</strong>
                </div> */}
              </div>
            </div>

            {/* Assigned Officer */}

            <div className="detail-card">
              <div className="card-header">
                <h2>Assigned Officer</h2>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span>Name</span>
                  <strong>Rahul Sharma</strong>
                </div>

                <div className="info-item">
                  <span>Department</span>
                  <strong>Road Maintenance</strong>
                </div>

                <div className="info-item">
                  <span>Contact</span>
                  <strong>+91 9876543210</strong>
                </div>

                <div className="info-item">
                  <span>Email</span>
                  <strong>officer@fixmycity.com</strong>
                </div>
              </div>
            </div>

            {/* Progress */}

            <div className="detail-card">
              <div className="card-header">
                <h2>Status Progress</h2>
              </div>

              <div className="timeline">

                <div className="step completed">
                  <div className="step-circle">✓</div>
                  <p>Submitted</p>
                </div>

                <div className="step completed">
                  <div className="step-circle">✓</div>
                  <p>Under Review</p>
                </div>

                <div className="step completed">
                  <div className="step-circle">✓</div>
                  <p>Assigned</p>
                </div>

                <div className="step current">
                  <div className="step-circle">⏳</div>
                  <p>In Progress</p>
                </div>

                <div className="step">
                  <div className="step-circle">○</div>
                  <p>Resolved</p>
                </div>

              </div>
            </div>

            {/* Status History */}

            <div className="detail-card">
              <div className="card-header">
                <h2>Status History</h2>
              </div>

              <div className="history-timeline">

                <div className="history-item">
                  <div className="history-dot"></div>

                  <div className="history-content">
                    <h4>Complaint Submitted</h4>
                    <p>09 Jul 2026 • 10:30 AM</p>
                    <span>
                      Your complaint has been successfully submitted and is
                      awaiting department review.
                    </span>
                  </div>
                </div>

                <div className="history-item">
                  <div className="history-dot"></div>

                  <div className="history-content">
                    <h4>Under Review</h4>
                    <p>10 Jul 2026 • 09:15 AM</p>
                    <span>
                      Complaint verified by the Road Maintenance Department.
                    </span>
                  </div>
                </div>

                <div className="history-item">
                  <div className="history-dot"></div>

                  <div className="history-content">
                    <h4>Officer Assigned</h4>
                    <p>11 Jul 2026 • 03:20 PM</p>
                    <span>
                      Rahul Sharma has been assigned to inspect and resolve the
                      issue.
                    </span>
                  </div>
                </div>

                <div className="history-item">
                  <div className="history-dot active"></div>

                  <div className="history-content">
                    <h4>Repair Work Started</h4>
                    <p>12 Jul 2026 • 11:00 AM</p>
                    <span>
                      Repair work is currently in progress. Updates will appear
                      here automatically.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Feedback */}

            {/* <div className="detail-card">
              <div className="card-header">
                <h2>Citizen Feedback</h2>
              </div>

              <div className="rating">
                ★★★★★
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience after your complaint is resolved..."
              />

              <button className="feedback-btn">
                Submit Feedback
              </button>
            </div> */}

          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintTracking;