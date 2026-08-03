import { useState } from "react";
import "./ViewFeedback.css";

import {
  FaComments,
  FaStar,
  FaRegStar,
  FaSmile,
  FaMeh,
  FaFrown,
  FaSearch,
//   FaFilter,
  FaEye,
} from "react-icons/fa";

function ViewFeedbackDept() {
  /* ==========================================================
     PAGINATION
  ========================================================== */

  const [currentPage, setCurrentPage] = useState(1);

  const feedbackPerPage = 5;

  /* ==========================================================
     SAMPLE DATA
  ========================================================== */

  const [feedbacks] = useState([
    {
      id: "FDB001",
      complaintId: "CMP001",
      citizen: "Rahul Patel",
      department: "Road Department",
      rating: 5,
      status: "Resolved",
      engineer: "Rahul",
      feedback:
        "The road repair work was completed quickly. Excellent service from the department.",
      date: "20 Jul 2026",
    },

    {
      id: "FDB002",
      complaintId: "CMP002",
      citizen: "Neha Shah",
      department: "Water Department",
      rating: 4,
      status: "Resolved",
      engineer: "Mahmad",
      feedback:
        "Water leakage was fixed successfully. Good support from the engineer.",
      date: "19 Jul 2026",
    },

    {
      id: "FDB003",
      complaintId: "CMP003",
      citizen: "Amit Patel",
      department: "Garbage Department",
      rating: 3,
      status: "Resolved",
      engineer: "Krushal",
      feedback:
        "Problem was solved but took longer than expected.",
      date: "18 Jul 2026",
    },

    {
      id: "FDB004",
      complaintId: "CMP004",
      citizen: "Priya Mehta",
      department: "Street Light Department",
      rating: 2,
      status: "Resolved",
      engineer: "Kamlesh",
      feedback:
        "Work quality was acceptable but response time was slow.",
      date: "17 Jul 2026",
    },

    {
      id: "FDB005",
      complaintId: "CMP005",
      citizen: "Rohit Sharma",
      department: "Road Department",
      rating: 1,
      status: "Resolved",
      engineer: "Kamlesh",
      feedback:
        "Complaint remained unresolved for many days. Very disappointed.",
      date: "16 Jul 2026",
    },

    {
      id: "FDB006",
      complaintId: "CMP006",
      citizen: "Karan Joshi",
      department: "Water Department",
      rating: 5,
      status: "Resolved",
      engineer: "Kamlesh",
      feedback:
        "Very satisfied with the quick response and professional work.",
      date: "15 Jul 2026",
    },
  ]);

  /* ==========================================================
     STATES
  ========================================================== */

  const [search, setSearch] = useState("");

  const [engineer, setEngineer] = useState("All");

  const [rating, setRating] = useState("All");

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  /* ==========================================================
     FILTERING
  ========================================================== */

  const filteredFeedback = feedbacks.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.citizen.toLowerCase().includes(search.toLowerCase()) ||
      item.complaintId.toLowerCase().includes(search.toLowerCase());

    const matchEngineer =
      engineer === "All" ||
      item.engineer === engineer;

    const matchRating =
      rating === "All" ||
      item.rating === Number(rating);

    return (
      matchSearch &&
      matchEngineer &&
      matchRating
    );
  });

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredFeedback.length / feedbackPerPage
  );

  const indexOfLast =
    currentPage * feedbackPerPage;

  const indexOfFirst =
    indexOfLast - feedbackPerPage;

  const currentFeedback =
    filteredFeedback.slice(
      indexOfFirst,
      indexOfLast
    );

  /* ==========================================================
     RATING RENDER
  ========================================================== */

  const renderStars = (rating) => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <FaStar key={star} />
          ) : (
            <FaRegStar key={star} />
          )
        )}
      </>
    );
  };

  return (
    <div className="complaint-page">

      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="page-header">

        <div>

          <h1>Department Feedback</h1>

          <p>
            Review citizen feedback received for complaints handled by your department.</p>
            <p> Monitor service quality and citizen satisfaction. </p>

        </div>

      </div>

      {/* ==========================================================
          SUMMARY CARDS
      ========================================================== */}

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-info">

            <h4>Total Feedback</h4>

            <h2>248</h2>

          </div>

          <div className="summary-icon">

            <FaComments />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Excellent (5★)</h4>

            <h2>84</h2>

          </div>

          <div className="summary-icon">

            <FaStar />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Good (4★)</h4>

            <h2>67</h2>

          </div>

          <div className="summary-icon">

            <FaSmile />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Average (3★)</h4>

            <h2>42</h2>

          </div>

          <div className="summary-icon">

            <FaMeh />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Poor (2★)</h4>

            <h2>31</h2>

          </div>

          <div className="summary-icon">

            <FaFrown />

          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Very Poor (1★)</h4>

            <h2>24</h2>

          </div>

          <div className="summary-icon">

            <FaRegStar />

          </div>

        </div>

      </div>

      {/* ==========================================================
          TOOLBAR
      ========================================================== */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

        <select
          value={engineer}
          onChange={(e) => {
            setEngineer(e.target.value);
            setCurrentPage(1);
          }}
        >

          <option>All</option>
          <option value={"Rahul"}>Rahul</option>
          <option value={"Mahmad"}>Mahmad</option>
          <option value={"Krushal"}>Krushal</option>
          <option value={"Kamlesh"}>Kamlesh</option>

        </select>

        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setCurrentPage(1);
          }}
        >

          <option value="All">All Ratings</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>

        </select>

        {/* <button className="filter-btn">

          <FaFilter />

          Filter

        </button> */}

      </div>
            {/* ==========================================================
          FEEDBACK TABLE
      ========================================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>

            <h2>Citizen Feedback List</h2>

            <p>
              Review ratings and feedback submitted by citizens
              after complaint resolution.
            </p>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Feedback ID</th>

                <th>Complaint ID</th>

                <th>Citizen</th>

                <th>Engineer</th>

                {/* <th>Department</th> */}

                <th>Rating</th>

                {/* <th>Feedback</th> */}

                <th>Date</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentFeedback.length > 0 ? (

                currentFeedback.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.complaintId}</td>

                    <td>{item.citizen}</td>

                    <td>{item.engineer}</td>

                    {/* <td>{item.department}</td> */}

                    <td>

                      <div className="rating-stars">

                        {renderStars(item.rating)}

                        <span className="rating-number">

                          ({item.rating}/5)

                        </span>

                      </div>

                    </td>
{/* 
                    <td>

                      <div className="feedback-message">

                        {item.feedback.length > 60
                          ? `${item.feedback.substring(0, 60)}...`
                          : item.feedback}

                      </div>

                    </td> */}

                    <td>{item.date}</td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="view-btn"
                          onClick={() => {

                            setSelectedFeedback(item);

                            setShowViewModal(true);

                          }}
                        >

                          <FaEye />

                          View

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr className="empty-row">

                  <td colSpan="8">

                    No feedback found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {filteredFeedback.length > feedbackPerPage && (

        <div className="pagination-wrapper">

          <button
            onClick={() => {

              if (currentPage > 1) {

                setCurrentPage((prev) => prev - 1);

              }

            }}
            disabled={currentPage === 1}
          >

            Previous

          </button>

          <div className="page-numbers">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? "active-page"
                    : ""
                }
              >

                {index + 1}

              </button>

            ))}

          </div>

          <button
            onClick={() => {

              if (currentPage < totalPages) {

                setCurrentPage((prev) => prev + 1);

              }

            }}
            disabled={currentPage === totalPages}
          >

            Next

          </button>

        </div>

      )}
            {/* ==========================================================
          VIEW FEEDBACK MODAL
      ========================================================== */}

      {showViewModal && selectedFeedback && (

        <div className="modal-overlay">

          <div className="modal">

            {/* ==========================================================
                MODAL HEADER
            ========================================================== */}

            <div className="modal-header">

              <h2>Feedback Details</h2>

              <button
                className="close-btn"
                onClick={() => {

                  setShowViewModal(false);

                  setSelectedFeedback(null);

                }}
              >

                ×

              </button>

            </div>

            {/* ==========================================================
                FEEDBACK INFORMATION
            ========================================================== */}

            <div className="details-section">

              <h3>Feedback Information</h3>

              <div className="details-grid">

                <div>

                  <label>Feedback ID</label>

                  <p>{selectedFeedback.id}</p>

                </div>

                <div>

                  <label>Date</label>

                  <p>{selectedFeedback.date}</p>

                </div>

                <div>

                  <label>Complaint ID</label>

                  <p>{selectedFeedback.complaintId}</p>

                </div>

                <div>

                  <label>Department</label>

                  <p>{selectedFeedback.department}</p>

                </div>

              </div>

            </div>

            {/* ==========================================================
                CITIZEN INFORMATION
            ========================================================== */}

            <div className="details-section">

              <h3>Citizen Information</h3>

              <div className="details-grid">

                <div>

                  <label>Citizen Name</label>

                  <p>{selectedFeedback.citizen}</p>

                </div>

                <div>

                  <label>Mobile Number</label>

                  <p>9876543210</p>

                </div>

                <div>

                  <label>Email Address</label>

                  <p>citizen@gmail.com</p>

                </div>

                <div>

                  <label>Location</label>

                  <p>Ahmedabad, Gujarat</p>

                </div>

              </div>

            </div>

            {/* ==========================================================
                COMPLAINT INFORMATION
            ========================================================== */}

            <div className="details-section">

              <h3>Complaint Information</h3>

              <div className="details-grid">

                <div>

                  <label>Complaint ID</label>

                  <p>{selectedFeedback.complaintId}</p>

                </div>

                <div>

                  <label>Department</label>

                  <p>{selectedFeedback.department}</p>

                </div>

                <div>

                  <label>Status</label>

                  <p>

                    <span className="status resolved">

                      Resolved

                    </span>

                  </p>

                </div>

                <div>

                  <label>Resolution Date</label>

                  <p>{selectedFeedback.date}</p>

                </div>

              </div>

            </div>

            {/* ==========================================================
                FEEDBACK RATING
            ========================================================== */}

            <div className="details-section">

              <h3>Citizen Rating</h3>

              <div className="rating-details">

                <div className="rating-stars large-stars">

                  {renderStars(selectedFeedback.rating)}

                </div>

                <h2>{selectedFeedback.rating} / 5</h2>

              </div>

            </div>

            {/* ==========================================================
                FEEDBACK MESSAGE
            ========================================================== */}

            <div className="details-section">

              <h3>Citizen Feedback</h3>

              <div className="feedback-box">

                <p>

                  {selectedFeedback.feedback}

                </p>

              </div>

            </div>

            {/* ==========================================================
                ADMIN REMARKS
            ========================================================== */}

            <div className="details-section">

              <h3>Admin Remarks</h3>

              <div className="feedback-box">

                <p>

                  This feedback has been successfully recorded and
                  will be considered during future service quality
                  evaluation and department performance analysis.

                </p>

              </div>

            </div>

            {/* ==========================================================
                MODAL FOOTER
            ========================================================== */}

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => {

                  setShowViewModal(false);

                  setSelectedFeedback(null);

                }}
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default ViewFeedbackDept;