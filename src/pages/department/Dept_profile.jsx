import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../../api/axios";
import "./Dept_profile.css";

import {
  FaBuilding,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaUserEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaCamera
} from "react-icons/fa";

import CustomPopup from "../../configure/CustomPopup";

function Dept_profile() {
  const navigate = useNavigate();

  // =========================================================
  // FILE INPUT
  // =========================================================
  const fileInputRef = useRef(null);

  // =========================================================
  // EDIT & LOADING STATES
  // =========================================================
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // DEPARTMENT DATA
  // =========================================================
  const [department, setDepartment] = useState({
    departmentName: "",
    email: "",
    contact: "",
    address: "",
    description: "",
    profilePhoto: null
  });

  // =========================================================
  // TEMPORARY EDIT DATA
  // =========================================================
  const [tempDepartment, setTempDepartment] = useState(department);

  // =========================================================
  // POPUP
  // =========================================================
  const [popup, setPopup] = useState({
    show: false,
    type: "error",
    message: ""
  });

  const showPopup = (message, type = "error") => {
    setPopup({
      show: true,
      type,
      message
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "error",
      message: ""
    });
  };

  // =========================================================
  // HELPER: PROFILE PHOTO URL
  // =========================================================
  const getProfilePhotoUrl = (photo) => {
    if (!photo) return null;
    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://") ||
      photo.startsWith("blob:") ||
      photo.startsWith("data:")
    ) {
      return photo;
    }
    const cleanPath = photo.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${BASE_URL}/${cleanPath}`;
  };

  // =========================================================
  // FETCH DEPARTMENT PROFILE
  // =========================================================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        showPopup("You are not logged in. Please login again.", "error");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Department Profile Response:", response.data);

      const data = response.data;
      const roleData = data.roleData || {};

      const departmentData = {
        departmentName:
          roleData.departmentName ||
          `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
          "Municipal Department",
        email: data.email || "",
        contact: data.contact || "",
        address: roleData.address || "",
        description: roleData.description || "",
        profilePhoto: data.profileImage || null
      };

      setDepartment(departmentData);
      setTempDepartment(departmentData);
    } catch (error) {
      console.error("Department Profile Error:", error);

      const backendMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "");

      if (backendMessage) {
        showPopup(backendMessage, "error");
      } else if (error.request && !error.response) {
        showPopup(
          "Unable to connect to the server. Please check your network connection.",
          "error"
        );
      } else {
        showPopup("Unable to load department profile.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================================================
  // EDIT PROFILE
  // =========================================================
  const handleEdit = () => {
    setTempDepartment({ ...department });
    setIsEditing(true);
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================
  const handleCancel = () => {
    setTempDepartment({ ...department });
    setIsEditing(false);
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempDepartment((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // =========================================================
  // OPEN PHOTO SELECTOR
  // =========================================================
  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // =========================================================
  // HANDLE PROFILE PHOTO
  // =========================================================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showPopup("Please select a valid image file (JPG, PNG, WEBP).", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempDepartment((previous) => ({
        ...previous,
        profilePhoto: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // =========================================================
  // SAVE CHANGES
  // =========================================================
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        showPopup("You are not logged in. Please login again.", "error");
        return;
      }

      const payload = {
        contact: (tempDepartment.contact || "").trim(),
        address: (tempDepartment.address || "").trim(),
        description: (tempDepartment.description || "").trim(),
        profilePhoto: tempDepartment.profilePhoto
      };

      await axios.put(
        `${API_BASE_URL}/auth/department/update-profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setDepartment({ ...tempDepartment });
      setIsEditing(false);
      showPopup("Department profile updated successfully!", "success");
    } catch (error) {
      console.error("Department Update Error:", error);
      const msg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string" ? error.response.data : "") ||
        "Unable to update profile. Please try again.";
      showPopup(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================
  if (loading) {
    return (
      <div className="dept-profile-page">
        <div className="dept-profile-card">
          <div className="dept-profile-loading">
            Loading department profile...
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // JSX
  // =========================================================
  return (
    <div className="dept-profile-page">
      {/* =================================================
         POPUP
      ================================================= */}
      {popup.show && (
        <CustomPopup
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
        />
      )}

      {/* =================================================
         MAIN CARD
      ================================================= */}
      <div className="dept-profile-card">

        {/* =================================================
           HEADER
        ================================================= */}
        {isEditing ? (
          <div className="dept-profile-edit-header">
            <h1>Edit Department Profile</h1>
          </div>
        ) : (
          <div className="dept-profile-header">
            {/* PROFILE PHOTO */}
            <div className="dept-profile-icon-wrapper">
              {department.profilePhoto ? (
                <img
                  src={getProfilePhotoUrl(department.profilePhoto)}
                  alt="Department Profile"
                  className="dept-profile-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="dept-profile-icon">
                  <FaBuilding />
                </div>
              )}
            </div>

            {/* DEPARTMENT NAME */}
            <div className="dept-profile-header-content">
              <h2>{department.departmentName || "Department"}</h2>
              <span className="dept-profile-role">
                Department Administrator
              </span>
            </div>
          </div>
        )}

        {/* =================================================
           EDIT PROFILE PHOTO
        ================================================= */}
        {isEditing && (
          <div className="dept-profile-photo-section">
            <div className="dept-profile-edit-photo-wrapper">
              {tempDepartment.profilePhoto ? (
                <img
                  src={getProfilePhotoUrl(tempDepartment.profilePhoto)}
                  alt="Department Profile Preview"
                  className="dept-profile-edit-photo"
                />
              ) : (
                <div className="dept-profile-edit-photo-placeholder">
                  <FaBuilding />
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="dept-profile-file-input"
            />

            {/* <button
              type="button"
              className="dept-profile-change-photo-btn"
              onClick={handleChangePhoto}
            >
              <FaCamera />
              <span>Change Photo</span>
            </button>

            <p className="dept-profile-photo-hint">
              JPG, PNG or WEBP • Recommended square image
            </p> */}
          </div>
        )}

        {/* =================================================
           PROFILE CONTENT
        ================================================= */}
        <div className="dept-profile-content">
          {/* DEPARTMENT NAME */}
          <div className="dept-profile-field">
            <div className="dept-profile-label">
              <FaBuilding />
              <span>Department Name</span>
            </div>

            <div className="dept-profile-value">
              {department.departmentName || "-"}
            </div>
          </div>

          {/* EMAIL */}
          <div className="dept-profile-field">
            <div className="dept-profile-label">
              <FaEnvelope />
              <span>Email</span>
            </div>

            <div className="dept-profile-email-wrapper">
              <input
                type="email"
                value={isEditing ? tempDepartment.email : department.email}
                disabled
                className="dept-profile-input dept-profile-email-disabled"
              />

              {isEditing && (
                <span className="dept-profile-readonly">
                  <FaLock />
                  Cannot be changed
                </span>
              )}
            </div>
          </div>

          {/* CONTACT NUMBER */}
          <div className="dept-profile-field">
            <div className="dept-profile-label">
              <FaPhoneAlt />
              <span>Contact Number</span>
            </div>

            {isEditing ? (
              <input
                type="tel"
                name="contact"
                value={tempDepartment.contact}
                onChange={handleChange}
                className="dept-profile-input"
                placeholder="Enter contact number"
              />
            ) : (
              <div className="dept-profile-value">
                {department.contact || "-"}
              </div>
            )}
          </div>

          {/* ADDRESS */}
          <div className="dept-profile-field">
            <div className="dept-profile-label">
              <FaMapMarkerAlt />
              <span>Address</span>
            </div>

            {isEditing ? (
              <textarea
                name="address"
                value={tempDepartment.address}
                onChange={handleChange}
                className="dept-profile-textarea"
                placeholder="Enter department address"
                rows="3"
              />
            ) : (
              <div className="dept-profile-value dept-profile-address">
                {department.address || "-"}
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="dept-profile-field dept-profile-description-field">
            <div className="dept-profile-label">
              <FaAlignLeft />
              <span>Description</span>
            </div>

            {isEditing ? (
              <textarea
                name="description"
                value={tempDepartment.description}
                onChange={handleChange}
                className="dept-profile-textarea dept-profile-description"
                placeholder="Enter department description"
                rows="5"
              />
            ) : (
              <div className="dept-profile-value dept-profile-description-view">
                {department.description || "-"}
              </div>
            )}
          </div>
        </div>

        {/* =================================================
           ACTION BUTTONS
        ================================================= */}
        <div className="dept-profile-actions">
          {!isEditing ? (
            <>
              {/* EDIT PROFILE */}
              <button
                type="button"
                className="dept-profile-edit-btn"
                onClick={handleEdit}
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </button>

              {/* CHANGE PASSWORD */}
              <button
                type="button"
                className="dept-profile-password-btn"
                onClick={handleChangePassword}
              >
                <FaLock />
                <span>Change Password</span>
              </button>
            </>
          ) : (
            <>
              {/* CANCEL */}
              <button
                type="button"
                className="dept-profile-cancel-btn"
                onClick={handleCancel}
                disabled={saving}
              >
                <FaTimes />
                <span>Cancel</span>
              </button>

              {/* SAVE */}
              <button
                type="button"
                className="dept-profile-save-btn"
                onClick={handleSave}
                disabled={saving}
              >
                <FaSave />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dept_profile;