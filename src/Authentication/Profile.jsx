import "../styles/dashbord.css";
import "../styles/Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaUserEdit,
  FaLock,
  FaIdCard,
  FaCalendarAlt,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../api/axios";
import profile from "../assets/default-profile.jpeg";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // HELPER: PROFILE IMAGE URL
  // =========================================
  const getProfileImageUrl = (img) => {
    if (!img) return profile;
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
  // HELPER: DATE FORMATTING
  // =========================================
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
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
          setError("You are not logged in. Please login to continue.");
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
          (typeof err.response?.data === "string" ? err.response.data : "") ||
          "Unable to load profile information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================================
  // LOADING STATE
  // =========================================
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card" style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>Loading Profile...</h2>
          <p style={{ color: "#6b7280", marginTop: "10px" }}>Fetching your account information...</p>
        </div>
      </div>
    );
  }

  // =========================================
  // ERROR STATE
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
            <h2>Profile Status</h2>
          </div>

          <div className="profile-details">
            <div className="profile-row">
              <div className="profile-label">
                <FaUser />
                <span>Notice</span>
              </div>
              <div className="profile-value" style={{ color: "#dc2626" }}>
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
  // ROLE DISPLAY NAME
  // =========================================
  const rawRole = (user.role || "").toUpperCase();
  let roleName = user.role || "User";

  if (rawRole === "ADMIN" || rawRole === "SUPERADMIN" || rawRole === "SUPER_ADMIN") {
    roleName = "Administrator";
  } else if (rawRole === "CITIZEN") {
    roleName = "Citizen";
  } else if (rawRole === "DEPARTMENT") {
    roleName = "Department Official";
  } else if (rawRole === "ENGINEER") {
    roleName = "Municipal Engineer";
  }

  const roleData = user.roleData || {};

  // Navigation target for Edit Profile
  const handleEditNavigate = () => {
    if (rawRole.includes("ADMIN")) {
      navigate("/admin/edit-profile");
    } else if (rawRole.includes("ENGINEER")) {
      navigate("/engineer/profile");
    } else if (rawRole.includes("DEPT")) {
      navigate("/department/profile");
    } else {
      navigate("/user/edit-profile");
    }
  };

  // =========================================
  // PROFILE PAGE RENDER
  // =========================================
  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* =====================================
            PROFILE HEADER
        ====================================== */}
        <div className="profile-header">
          <img
            src={getProfileImageUrl(user.profileImage)}
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profile;
            }}
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

          {/* CITIZEN ID (FOR CITIZENS) */}
          {rawRole === "CITIZEN" && roleData.citizenId && (
            <div className="profile-row">
              <div className="profile-label">
                <FaIdCard />
                <span>Citizen ID</span>
              </div>
              <div className="profile-value">
                #{roleData.citizenId}
              </div>
            </div>
          )}

          {/* FIRST NAME */}
          <div className="profile-row">
            <div className="profile-label">
              <FaUser />
              <span>First Name</span>
            </div>
            <div className="profile-value">
              {user.firstName || "-"}
            </div>
          </div>

          {/* LAST NAME */}
          <div className="profile-row">
            <div className="profile-label">
              <FaUser />
              <span>Last Name</span>
            </div>
            <div className="profile-value">
              {user.lastName || "-"}
            </div>
          </div>

          {/* EMAIL */}
          <div className="profile-row">
            <div className="profile-label">
              <FaEnvelope />
              <span>Email Address</span>
            </div>
            <div className="profile-value">
              {user.email || "-"}
            </div>
          </div>

          {/* MOBILE NUMBER */}
          <div className="profile-row">
            <div className="profile-label">
              <FaPhoneAlt />
              <span>Mobile Number</span>
            </div>
            <div className="profile-value">
              {user.contact || "-"}
            </div>
          </div>

          {/* DEPARTMENT SPECIFIC INFO */}
          {roleData.departmentName && (
            <div className="profile-row">
              <div className="profile-label">
                <FaBuilding />
                <span>Department</span>
              </div>
              <div className="profile-value">
                {roleData.departmentName}
              </div>
            </div>
          )}

          {/* ENGINEER SPECIFIC INFO */}
          {roleData.engineerBranch && (
            <div className="profile-row">
              <div className="profile-label">
                <FaBriefcase />
                <span>Specialization</span>
              </div>
              <div className="profile-value">
                {roleData.engineerBranch}
              </div>
            </div>
          )}

          {/* ADDRESS */}
          {roleData.address && (
            <div className="profile-row">
              <div className="profile-label">
                <FaMapMarkerAlt />
                <span>Address</span>
              </div>
              <div className="profile-value">
                {roleData.address}
              </div>
            </div>
          )}

          {/* ROLE */}
          <div className="profile-row">
            <div className="profile-label">
              <FaShieldAlt />
              <span>User Role</span>
            </div>
            <div className="profile-value">
              {roleName}
            </div>
          </div>

          {/* MEMBER SINCE */}
          {user.createdAt && (
            <div className="profile-row">
              <div className="profile-label">
                <FaCalendarAlt />
                <span>Member Since</span>
              </div>
              <div className="profile-value">
                {formatDate(user.createdAt)}
              </div>
            </div>
          )}

          {/* ACCOUNT STATUS */}
          <div className="profile-row">
            <div className="profile-label">
              {user.isActive ? (
                <FaCheckCircle style={{ color: "#16a34a" }} />
              ) : (
                <FaTimesCircle style={{ color: "#dc2626" }} />
              )}
              <span>Account Status</span>
            </div>
            <div
              className="profile-value"
              style={{
                color: user.isActive ? "#16a34a" : "#dc2626",
                fontWeight: 600,
              }}
            >
              {user.isActive ? "Active" : "Inactive"}
            </div>
          </div>

        </div>

        {/* =====================================
            PROFILE ACTIONS
        ====================================== */}
        <div className="profile-actions">

          {/* EDIT PROFILE */}
          <button
            type="button"
            className="change-password-btn"
            onClick={handleEditNavigate}
          >
            <FaUserEdit />
            <span>Edit Profile</span>
          </button>

          {/* CHANGE PASSWORD */}
          <button
            type="button"
            className="change-password-btn"
            onClick={() => navigate("/change-password")}
          >
            <FaLock />
            <span>Change Password</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;