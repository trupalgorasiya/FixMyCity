import { useState } from "react";
import "../../styles/ComplaintTracking.css";

import { useNavigate, useParams } from "react-router-dom";
function TrackComplaints() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaintId, setComplaintId] = useState(id || "");

  const complaint = {
    id: complaintId,
    status: "In Progress",
    category: "Road Damage",
    priority: "High",
    assigneDate: "09 July 2026",
    expectedDate: "15 July 2026",
    location: "Navrangpura, Ahmedabad",

    officer: {
      name: "Rahul Sharma",
      department: "Road Maintenance",
      contact: "+91 9876543210",
      email: "officer@fixmycity.com",
    },
  };

  const handleTrack = () => {

    if (!complaintId.trim()) {
      alert("Please enter Complaint ID");
      return;
    }

    navigate(`/user/complaint-tracking/${complaintId}`);
  };

  return (

    <div className="tracking-page">

      <div className="tracking-container">

        {/* ================= HEADER ================= */}

        <div className="tracking-header">

          <h1>Track Complaint</h1>

          <p>
            Track the real-time progress of your complaint using the Complaint
            ID provided during registration. Stay informed with every update
            from submission to final resolution.
          </p>

        </div>

        {/* ================= SEARCH ================= */}
{!id && (
        <div className="search-card">

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter Complaint ID (Example : FXM-2026-001)"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
            />

            <button onClick={handleTrack}>
              🔍 Track Complaint
            </button>

          </div>

        </div>
)}
        {/* ================= DETAILS ================= */}

        {id && (

          <div className="tracking-content">

            {/* ================================================= */}
            {/* Complaint Information */}
            {/* ================================================= */}

            <div className="card">

              <div className="card-title">

                <h2>Complaint Information</h2>

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
                  <label>Assigned On</label>
                  <h4>{complaint.assigneDate}</h4>
                </div>

                <div className="detail-item">
                  <label>Expected Resolution</label>
                  <h4>{complaint.expectedDate}</h4>
                </div>

                <div className="detail-item">
                  <label>Location</label>
                  <h4>{complaint.location}</h4>
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* Assigned Officer */}
            {/* ================================================= */}

            <div className="card">

              <div className="card-title">

                <h2>Assigned Officer</h2>

              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <label>Officer Name</label>
                  <h4>{complaint.officer.name}</h4>
                </div>

                <div className="detail-item">
                  <label>Department</label>
                  <h4>{complaint.officer.department}</h4>
                </div>

                <div className="detail-item">
                  <label>Contact Number</label>
                  <h4>{complaint.officer.contact}</h4>
                </div>

                <div className="detail-item">
                  <label>Email Address</label>
                  <h4>{complaint.officer.email}</h4>
                </div>

              </div>

            </div>
            
            {/* ================================================= */}
            {/* STATUS PROGRESS */}
            {/* ================================================= */}

            <div className="card">

              <div className="card-title">

                <h2>Status Progress</h2>

              </div>


              <div className="status-progress">


                <div className="progress-line"></div>


                <div className="progress-step completed">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>
                    Submitted
                  </h4>

                  <span>
                    09 Jul 2026
                  </span>

                </div>



                <div className="progress-step completed">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>
                    Under Review
                  </h4>

                  <span>
                    10 Jul 2026
                  </span>

                </div>



                <div className="progress-step completed">

                  <div className="progress-circle">
                    ✓
                  </div>

                  <h4>
                    Assigned
                  </h4>

                  <span>
                    11 Jul 2026
                  </span>

                </div>



                <div className="progress-step current">

                  <div className="progress-circle">
                    ⏳
                  </div>

                  <h4>
                    In Progress
                  </h4>

                  <span>
                    Current
                  </span>

                </div>



                <div className="progress-step">

                  <div className="progress-circle">
                    5
                  </div>

                  <h4>
                    Resolved
                  </h4>

                  <span>
                    Pending
                  </span>

                </div>


              </div>


            </div>





            {/* ================================================= */}
            {/* STATUS HISTORY */}
            {/* ================================================= */}


            <div className="card">


              <div className="card-title">

                <h2>
                  Status History
                </h2>

              </div>



              <div className="history-container">



                <div className="history-item">


                  <div className="history-icon completed">
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
                      Your complaint has been successfully submitted and
                      registered in the system.
                    </span>


                  </div>


                </div>






                <div className="history-item">


                  <div className="history-icon completed">
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
                      The Road Maintenance Department verified your complaint
                      details.
                    </span>


                  </div>


                </div>







                <div className="history-item">


                  <div className="history-icon completed">
                    ✓
                  </div>


                  <div className="history-box">


                    <h4>
                      Officer Assigned
                    </h4>


                    <p>
                      11 July 2026 • 03:20 PM
                    </p>


                    <span>
                      Rahul Sharma has been assigned to inspect and resolve
                      this issue.
                    </span>


                  </div>


                </div>







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
                      Repair work is currently in progress. Further updates
                      will appear here automatically.
                    </span>


                  </div>


                </div>



              </div>


            </div>

            <div className="card feedback-card">


              <div className="card-title">
                <h2>
                  Citizen Feedback
                </h2>
              </div>


              <p className="feedback-text">
                After your complaint is resolved, you can share your
                experience and feedback.
              </p>



              <div className="rating">
                ★ ★ ★ ★ ★
              </div>



              <textarea
                placeholder="Write your feedback here..."
              ></textarea>



              <button className="feedback-button">
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default TrackComplaints;