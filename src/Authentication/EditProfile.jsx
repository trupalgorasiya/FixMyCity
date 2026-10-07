import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../api/axios";
import "../styles/dashbord.css";
import "../styles/EditProfile.css";
import CustomPopup from "../configure/CustomPopup";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSave,
  FaTimes
} from "react-icons/fa";
import updated_imgs from "../assets/default-profile.jpeg";

function EditProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    profileImage: null,
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null
  });

  // =========================================
  // HELPER: PROFILE IMAGE URL
  // =========================================
  const getProfileImageUrl = (img) => {
    if (!img) return updated_imgs;
    if (
      img.startsWith("http://") ||
      img.startsWith("https://") ||
      img.startsWith("data:") ||
      img.startsWith("blob:")
    ) {
      return img;
    }
    const cleanPath = img.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${BASE_URL}/${cleanPath}`;
  };

  // =========================================
  // GET LOGGED-IN USER PROFILE
  // =========================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        const roleData = data.roleData || {};

        setUser({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          contact: data.contact || "",
          address: roleData.address || "",
          profileImage: data.profileImage || null,
          role: data.role || "",
        });

      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load profile information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================================
  // HANDLE TEXT CHANGE
  // =========================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // SUBMIT UPDATE
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    setError("");

    // VALIDATION
    if (!user.firstName.trim()) {
      setPopup({
        isOpen: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your first name."
      });
      return;
    }

    if (!user.lastName.trim()) {
      setPopup({
        isOpen: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your last name."
      });
      return;
    }

    if (!user.contact.trim()) {
      setPopup({
        isOpen: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your contact number."
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Authentication Required",
        message: "You are not logged in. Please login again."
      });
      return;
    }

    try {
      setSaving(true);

      const data = {
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        contact: user.contact.trim(),
        address: (user.address || "").trim(),
        profileImage: user.profileImage,
      };

      if (user.role === "ENGINEER") {
        await axios.put(
          `${API_BASE_URL}/engineers`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.put(
          `${API_BASE_URL}/auth/update-profile`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      setPopup({
        isOpen: true,
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
        onConfirm: () => navigate(-1)
      });

    } catch (err) {
      console.error("Update Profile Error:", err);
      const backendMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        "Unable to update profile. Please try again.";

      setPopup({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: backendMessage
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <h2>Edit Profile</h2>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <h2>Unable to Load Profile</h2>
          <p>{error}</p>
          <button
            type="button"
            className="cancel-btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        {/* HEADER */}
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          {/* <p>Update your personal information below.</p> */}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* PROFILE IMAGE */}
          <div className="profile-image-section">
            <img
              src={getProfileImageUrl(user.profileImage)}
              alt="Profile"
              className="edit-profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = updated_imgs;
              }}
            />
          </div>

          {/* GRID */}
          <div className="edit-profile-grid">
            {/* FIRST NAME */}
            <div className="form-group">
              <label>First Name</label>
              <div className="input-box">
                <FaUser />
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* LAST NAME */}
            <div className="form-group">
              <label>Last Name</label>
              <div className="input-box">
                <FaUser />
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL (READ ONLY) */}
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-box">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            {/* CONTACT */}
            <div className="form-group">
              <label>Mobile Number</label>
              <div className="input-box">
                <FaPhoneAlt />
                <input
                  type="tel"
                  name="contact"
                  value={user.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ADDRESS (FOR ENGINEER) */}
            {user.role === "ENGINEER" && (
              <div className="form-group full-width">
                <label>Address</label>
                <div className="input-box">
                  <FaMapMarkerAlt />
                  <input
                    type="text"
                    name="address"
                    value={user.address || ""}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="edit-profile-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              <FaTimes />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="dashboard-btn"
              disabled={saving}
            >
              <FaSave />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* CUSTOM POPUP */}
      {popup.isOpen && (
        <CustomPopup
          isOpen={popup.isOpen}
          type={popup.type}
          title={popup.title}
          message={popup.message}
          onClose={() => {
            setPopup((p) => ({ ...p, isOpen: false }));
            if (popup.onConfirm) {
              popup.onConfirm();
            }
          }}
          onConfirm={popup.onConfirm}
        />
      )}
    </div>
  );
}

export default EditProfile;