import "../styles/dashbord.css";
import "../styles/Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUserEdit,
  FaLock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api/axios";
import profile from "../assets/default-profile.jpeg";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        console.log("Profile Response:", response.data);

        setUser(response.data);

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
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>Loading Profile...</h2>
        </div>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">

          <div className="profile-header">
            <img
              src={profile}
              alt="Profile"
              className="profile-image"
            />

            <h2>Profile</h2>
          </div>

          <div className="profile-details">

            <div className="profile-row">

              <div className="profile-label">
                <FaUser />
                <span>Status</span>
              </div>

              <div className="profile-value">
                {error}
              </div>

            </div>

          </div>

          <div className="profile-actions">

            <button
              className="change-password-btn"
              onClick={() => navigate("/login")}
            >
              <FaUser />
              <span>Login Again</span>
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =========================================
  // USER NOT FOUND
  // =========================================

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">

          <div className="profile-header">

            <img
              src={profile}
              alt="Profile"
              className="profile-image"
            />

            <h2>User Not Found</h2>

          </div>

        </div>
      </div>
    );
  }

  // =========================================
  // ROLE DISPLAY NAME
  // =========================================

  let roleName = user.role;

  if (user.role === "ADMIN") {
    roleName = "Administrator";
  } else if (user.role === "CITIZEN") {
    roleName = "Citizen";
  }

  // =========================================
  // PROFILE PAGE
  // =========================================

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* =====================================
            PROFILE HEADER
        ====================================== */}

        <div className="profile-header">

          <img
            src={
              user.profileImage
                ? user.profileImage
                : profile
            }
            alt="Profile"
            className="profile-image"
          />

          <h2>
            {user.firstName} {user.lastName}
          </h2>

          <span className="profile-role">
            {roleName}
          </span>

        </div>

        {/* =====================================
            PROFILE DETAILS
        ====================================== */}

        <div className="profile-details">

          {/* FIRST NAME */}

          <div className="profile-row">

            <div className="profile-label">

              <FaUser />

              <span>
                First Name
              </span>

            </div>

            <div className="profile-value">
              {user.firstName}
            </div>

          </div>

          {/* LAST NAME */}

          <div className="profile-row">

            <div className="profile-label">

              <FaUser />

              <span>
                Last Name
              </span>

            </div>

            <div className="profile-value">
              {user.lastName}
            </div>

          </div>

          {/* EMAIL */}

          <div className="profile-row">

            <div className="profile-label">

              <FaEnvelope />

              <span>
                Email
              </span>

            </div>

            <div className="profile-value">
              {user.email}
            </div>

          </div>

          {/* MOBILE NUMBER */}

          <div className="profile-row">

            <div className="profile-label">

              <FaPhoneAlt />

              <span>
                Mobile Number
              </span>

            </div>

            <div className="profile-value">
              {user.contact}
            </div>

          </div>

          {/* ROLE */}

          <div className="profile-row">

            <div className="profile-label">

              <FaUser />

              <span>
                Role
              </span>

            </div>

            <div className="profile-value">
              {roleName}
            </div>

          </div>

          {/* ACCOUNT STATUS */}

          <div className="profile-row">

            <div className="profile-label">

              <FaUser />

              <span>
                Account Status
              </span>

            </div>

            <div className="profile-value">

              {user.isActive
                ? "Active"
                : "Inactive"}

            </div>

          </div>

        </div>

        {/* =====================================
            PROFILE ACTIONS
        ====================================== */}

        <div className="profile-actions">

          {/* EDIT PROFILE */}

          <button
            className="change-password-btn"
            onClick={() =>
              navigate("../edit-profile")
            }
          >

            <FaUserEdit />

            <span>
              Edit Profile
            </span>

          </button>

          {/* CHANGE PASSWORD */}

          <button
            className="change-password-btn"
            onClick={() =>
              navigate("/change-password")
            }
          >

            <FaLock />

            <span>
              Change Password
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;