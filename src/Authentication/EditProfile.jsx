import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/axios";
import "../styles/dashbord.css";
import "../styles/EditProfile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
 // FaCamera,
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
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


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

        console.log(
          "Profile Response:",
          response.data
        );

        setUser({
          firstName:
            response.data.firstName || "",

          lastName:
            response.data.lastName || "",

          email:
            response.data.email || "",

          contact:
            response.data.contact || "",

          profileImage:
            response.data.profileImage || null,
        });

      } catch (err) {
        console.error(
          "Profile Fetch Error:",
          err
        );

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
    const {
      name,
      value
    } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // HANDLE IMAGE CHANGE
  // =========================================

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }


//     setUser((prev) => ({
//       ...prev,
//       profileImage: URL.createObjectURL(file),
//     }));
//   };

  // =========================================
  // SUBMIT UPDATE
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    setMessage("");
    setError("");

    // =========================================
    // VALIDATION
    // =========================================

    if (!user.firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!user.lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!user.contact.trim()) {
      setError("Please enter your contact number.");
      return;
    }

    // =========================================
    // GET TOKEN
    // =========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not logged in. Please login again."
      );
      return;
    }

    try {
      setSaving(true);

      // =========================================
      // REQUEST BODY
      // =========================================

      const data = {
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
        contact: user.contact.trim(),
      };

      console.log(
        "Update Profile Request:",
        data
      );

      // =========================================
      // UPDATE PROFILE
      // =========================================

      const response = await axios.put(
        `${API_BASE_URL}/auth/update-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Update Profile Response:",
        response.data
      );

      // =========================================
      // SUCCESS
      // =========================================

      setMessage(
        response.data?.message ||
        "Profile updated successfully."
      );

      alert(
        response.data?.message ||
        "Profile updated successfully."
      );

      // =========================================
      // GO BACK
      // =========================================

      navigate(-1);

    } catch (err) {

      console.error(
        "Update Profile Error:",
        err
      );

      const backendMessage =
        err.response?.data?.message;

      if (backendMessage) {

        setError(backendMessage);

      } else if (
        typeof err.response?.data ===
        "string"
      ) {

        setError(
          err.response.data
        );

      } else {

        setError(
          "Unable to update profile. Please try again."
        );
      }

    } finally {

      setSaving(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="edit-profile-page">

        <div className="edit-profile-card">

          <h2>
            Edit Profile
          </h2>

          <p>
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  // =========================================
  // ERROR WHILE LOADING PROFILE
  // =========================================

  if (error && !user.email) {
    return (
      <div className="edit-profile-page">

        <div className="edit-profile-card">

          <h2>
            Edit Profile
          </h2>

          <div className="error-message">
            {error}
          </div>

          <div className="edit-profile-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(-1)
              }
            >
              <FaTimes />
              <span>
                Go Back
              </span>
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =========================================
  // EDIT PROFILE
  // =========================================

  return (
    <div className="edit-profile-page">

      <div className="edit-profile-card">

        <h2>
          Edit Profile
        </h2>

        {/* <p>
          Update your personal information
          below.
        </p> */}

        {/* =====================================
            SUCCESS MESSAGE
        ====================================== */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* =====================================
            ERROR MESSAGE
        ====================================== */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* =====================================
              PROFILE IMAGE
          ====================================== */}

          <div className="profile-image-section">

            <img
              src={
                user.profileImage
                  ? user.profileImage
                  : updated_imgs
              }
              alt="Profile"
              className="edit-profile-image"
            />

            {/* <label className="upload-btn">

             

             

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

            </label> */}

          </div>

          {/* =====================================
              PROFILE FORM
          ====================================== */}

          <div className="edit-profile-grid">

            {/* FIRST NAME */}

            <div className="form-group">

              <label>
                First Name
              </label>

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

              <label>
                Last Name
              </label>

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

            {/* EMAIL */}

            <div className="form-group full-width">

              <label>
                Email Address
              </label>

              <div className="input-box readonly">

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

            <div className="form-group full-width">

              <label>
                Mobile Number
              </label>

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

          </div>

          {/* =====================================
              ACTION BUTTONS
          ====================================== */}

          <div className="edit-profile-actions">

            {/* CANCEL */}

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate(-1)
              }
              disabled={saving}
            >

              <FaTimes />

              <span>
                Cancel
              </span>

            </button>

            {/* SAVE */}

            <button
              type="submit"
              className="dashboard-btn"
              disabled={saving}
            >

              <FaSave />

              <span>
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </span>

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;