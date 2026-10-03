import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/axios";
import {
  FaEnvelope,
  FaUser,
  FaTrash,
  FaEye,
  FaTimes,
  FaSyncAlt,
} from "react-icons/fa";
import "./Messages.css";

const API_URL = `${API_BASE_URL}/contact`;

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Messages API Response:", response.data);

      const data = response.data;

      if (Array.isArray(data)) {
        setMessages(data);
      } else if (Array.isArray(data.content)) {
        setMessages(data.content);
      } else {
        setMessages([]);
        console.log("Unexpected API response:", data);
      }
    } catch (err) {
      console.error("Fetch Messages Error:", err);

      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to view messages.");
      } else if (err.response?.status === 404) {
        setError("Contact API endpoint not found.");
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to load messages."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Load messages when page opens
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Messages API Response:", response.data);

        const data = response.data;

        if (Array.isArray(data)) {
          setMessages(data);
        } else if (Array.isArray(data.content)) {
          setMessages(data.content);
        } else {
          setMessages([]);
          console.log("Unexpected API response:", data);
        }
      } catch (err) {
        console.error("Fetch Messages Error:", err);

        if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else if (err.response?.status === 403) {
          setError("You do not have permission to view messages.");
        } else if (err.response?.status === 404) {
          setError("Contact API endpoint not found.");
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to load messages."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Delete message
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((previousMessages) =>
        previousMessages.filter(
          (message) => message.getInTouchId !== id
        )
      );

      setSelectedMessage(null);
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="messages-page">

      {/* ================= HEADER ================= */}
      <div className="messages-header">
        <div>
          <h1>
            <FaEnvelope />
            Messages
          </h1>

          <p>
            Messages received from citizens.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchMessages}
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* ================= TOTAL MESSAGES ================= */}
      {/* <div className="message-stat">
        <div className="stat-icon">
          <FaEnvelope />
        </div>

        <div>
          <span>Total Messages</span>
          <strong>{messages.length}</strong>
        </div>
      </div> */}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="message-error">
          {error}
        </div>
      )}

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="messages-loading">
          <div className="loader"></div>
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        /* ================= EMPTY ================= */
        <div className="messages-empty">
          <FaEnvelope />

          <h2>No Messages Found</h2>

          <p>
            There are currently no messages available.
          </p>
        </div>
      ) : (
        /* ================= TABLE ================= */
        <div className="messages-card">

          <div className="card-header">
            <div>
              <h2>Received Messages</h2>
              <p>
                View and manage messages received from citizens.
              </p>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="messages-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Citizen</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((message) => (
                  <tr key={message.getInTouchId}>

                    {/* ID */}
                    <td>
                      <strong>
                        #{message.getInTouchId}
                      </strong>
                    </td>

                    {/* CITIZEN */}
                    <td>
                      <div className="citizen-info">

                        <div className="user-icon">
                          <FaUser />
                        </div>

                        <span>
                          {message.name}
                        </span>

                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>
                      {message.email}
                    </td>

                    {/* SUBJECT */}
                    <td>
                      <strong>
                        {message.subject}
                      </strong>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="action-buttons">

                        {/* VIEW */}
                        <button
                          className="view-btn"
                          onClick={() =>
                            setSelectedMessage(message)
                          }
                          title="View Message"
                        >
                          <FaEye />
                        </button>

                        {/* DELETE */}
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              message.getInTouchId
                            )
                          }
                          title="Delete Message"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MESSAGE DETAILS MODAL */}
      {/* ================================================= */}

      {selectedMessage && (
        <div
          className="message-modal-overlay"
          onClick={() =>
            setSelectedMessage(null)
          }
        >

          <div
            className="message-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>
                <h2>
                  Message Details
                </h2>

                <span>
                  Message #
                  {selectedMessage.getInTouchId}
                </span>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedMessage(null)
                }
              >
                <FaTimes />
              </button>

            </div>

            {/* MODAL BODY */}
            <div className="modal-body">

              {/* NAME */}
              <div className="detail-item">

                <label>
                  Name
                </label>

                <p>
                  <FaUser />
                  {selectedMessage.name}
                </p>

              </div>

              {/* EMAIL */}
              <div className="detail-item">

                <label>
                  Email
                </label>

                <p>
                  <FaEnvelope />
                  {selectedMessage.email}
                </p>

              </div>

              {/* SUBJECT */}
              <div className="detail-item">

                <label>
                  Subject
                </label>

                <p>
                  {selectedMessage.subject}
                </p>

              </div>

              {/* FULL MESSAGE */}
              <div className="detail-item">

                <label>
                  Message
                </label>

                <div className="full-message">
                  {selectedMessage.message}
                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer">

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedMessage(null)
                }
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

export default Messages;