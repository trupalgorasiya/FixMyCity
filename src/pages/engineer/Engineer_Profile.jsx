import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../../api/axios";
import CustomPopup from "../../configure/CustomPopup";

import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaBriefcase,
    FaBuilding,
    FaCertificate,
    FaUserEdit,
    FaLock,
    FaCamera,
    FaSave,
    FaTimes
} from "react-icons/fa";

import defaultProfile from "../../assets/default-profile.jpeg";
import "./Engineer_profile.css";

function EngineerProfile() {
    const navigate = useNavigate();

    /* =========================================================
       ENGINEER PROFILE DATA
    ========================================================= */
    const [engineer, setEngineer] = useState(null);

    /* =========================================================
       EDIT MODE & FORM DATA
    ========================================================= */
    const [isEditing, setIsEditing] = useState(false);
    const [editEngineer, setEditEngineer] = useState(null);

    /* =========================================================
       STATUS / POPUP STATES
    ========================================================= */
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

    /* =========================================================
       FILE URL NORMALIZATION
    ========================================================= */
    const getFileUrl = (filePath) => {
        if (!filePath) return null;
        if (
            filePath.startsWith("http://") ||
            filePath.startsWith("https://") ||
            filePath.startsWith("blob:") ||
            filePath.startsWith("data:")
        ) {
            return filePath;
        }
        const normalizedPath = filePath.replace(/\\/g, "/");
        return `${BASE_URL}/${normalizedPath.startsWith("/") ? normalizedPath.slice(1) : normalizedPath}`;
    };

    /* =========================================================
       FETCH PROFILE FROM BACKEND
    ========================================================= */
    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            if (!token) {
                setError("You are not logged in. Please login again.");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;
            const roleData = data.roleData || {};

            const profileData = {
                userId: data.userId,
                engineerId: roleData.engineerId,
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                contact: data.contact || "",
                address: roleData.address || "",
                branch: roleData.engineerBranch || "",
                qualification: roleData.highestQualification || "",
                experience: roleData.experience ?? 0,
                department: roleData.department || "",
                degreeCertificate: roleData.degreeCertificate || null,
                experienceCertificate: roleData.experienceCertificate || null,
                profileImage: data.profileImage || null,
                joiningDate: roleData.joiningDate || null,
                isAvailable: roleData.isAvailable ?? false
            };

            setEngineer(profileData);
            setEditEngineer(profileData);
        } catch (err) {
            console.error("Engineer Profile Fetch Error:", err);
            const backendMessage = err.response?.data?.message;
            if (backendMessage) {
                setError(backendMessage);
            } else {
                setError("Unable to load profile. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    /* =========================================================
       OPEN EDIT PROFILE
    ========================================================= */
    const handleEdit = () => {
        setEditEngineer({
            ...engineer,
            profileImageFile: null
        });
        setIsEditing(true);
    };

    /* =========================================================
       HANDLE INPUT CHANGE
    ========================================================= */
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEngineer((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    /* =========================================================
       CHANGE PROFILE PHOTO
    ========================================================= */
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageURL = URL.createObjectURL(file);
        setEditEngineer((previous) => ({
            ...previous,
            profileImage: imageURL,
            profileImageFile: file
        }));
    };

    /* =========================================================
       SAVE CHANGES TO BACKEND
    ========================================================= */
    const handleSave = async (e) => {
        if (e) e.preventDefault();

        if (!editEngineer.firstName.trim()) {
            setPopup({
                isOpen: true,
                type: "warning",
                title: "Validation Error",
                message: "Please enter your first name."
            });
            return;
        }

        if (!editEngineer.lastName.trim()) {
            setPopup({
                isOpen: true,
                type: "warning",
                title: "Validation Error",
                message: "Please enter your last name."
            });
            return;
        }

        if (!editEngineer.contact.trim()) {
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

            if (editEngineer.profileImageFile) {
                // MULTIPART UPDATE WITH PHOTO
                const formData = new FormData();
                formData.append("firstName", editEngineer.firstName.trim());
                formData.append("lastName", editEngineer.lastName.trim());
                formData.append("contact", editEngineer.contact.trim());
                formData.append("address", (editEngineer.address || "").trim());
                formData.append("profilePhoto", editEngineer.profileImageFile);

                await axios.put(`${API_BASE_URL}/engineers/update-profile`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
            } else {
                // JSON UPDATE
                const updateData = {
                    firstName: editEngineer.firstName.trim(),
                    lastName: editEngineer.lastName.trim(),
                    contact: editEngineer.contact.trim(),
                    address: (editEngineer.address || "").trim(),
                    profileImage: editEngineer.profileImage
                };

                await axios.put(`${API_BASE_URL}/engineers`, updateData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            }

            // Refresh profile from database
            await fetchProfile();

            setIsEditing(false);

            setPopup({
                isOpen: true,
                type: "success",
                title: "Profile Updated",
                message: "Your profile information has been updated successfully!"
            });
        } catch (err) {
            console.error("Save Engineer Profile Error:", err);
            const message =
                err.response?.data?.message ||
                (typeof err.response?.data === "string" ? err.response.data : "") ||
                "Failed to update profile. Please try again.";

            setPopup({
                isOpen: true,
                type: "error",
                title: "Update Failed",
                message: message
            });
        } finally {
            setSaving(false);
        }
    };

    /* =========================================================
       CANCEL EDIT
    ========================================================= */
    const handleCancel = () => {
        setEditEngineer({
            ...engineer,
            profileImageFile: null
        });
        setIsEditing(false);
    };

    /* =========================================================
       LOADING SCREEN
    ========================================================= */
    if (loading) {
        return (
            <div className="engineer-profile-page">
                <div className="engineer-profile-card">
                    <h2>Loading Profile...</h2>
                </div>
            </div>
        );
    }

    /* =========================================================
       ERROR SCREEN
    ========================================================= */
    if (error) {
        return (
            <div className="engineer-profile-page">
                <div className="engineer-profile-card">
                    <h2>Unable to Load Profile</h2>
                    <p>{error}</p>
                    <button
                        type="button"
                        className="engineer-profile-edit-btn"
                        style={{ marginTop: "20px" }}
                        onClick={fetchProfile}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!engineer) {
        return null;
    }

    /* =========================================================
       EDIT PROFILE MODE
    ========================================================= */
    if (isEditing) {
        return (
            <div className="engineer-edit-page">
                <div className="engineer-edit-card">
                    {/* EDIT PROFILE HEADER */}
                    <div className="engineer-edit-header">
                        <h2>Edit Profile</h2>

                        {/* PROFILE PHOTO */}
                        <div className="engineer-edit-photo-section">
                            <img
                                src={
                                    editEngineer.profileImage
                                        ? editEngineer.profileImage.startsWith("blob:")
                                            ? editEngineer.profileImage
                                            : getFileUrl(editEngineer.profileImage)
                                        : defaultProfile
                                }
                                alt="Engineer Profile"
                                className="engineer-edit-photo"
                            />

                            {/* CHANGE PHOTO */}
                            {/* <label className="engineer-edit-change-photo">
                                <FaCamera />
                                <span>Change Photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                            </label> */}
                        </div>
                    </div>

                    {/* EDIT FORM */}
                    <form className="engineer-edit-form" onSubmit={handleSave}>
                        {/* FIRST + LAST NAME */}
                        <div className="engineer-edit-name-row">
                            {/* FIRST NAME */}
                            <div className="engineer-edit-name-field">
                                <label className="engineer-edit-label">
                                    <FaUser />
                                    <span>First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editEngineer.firstName}
                                    onChange={handleEditChange}
                                    className="engineer-edit-input"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>

                            {/* LAST NAME */}
                            <div className="engineer-edit-name-field">
                                <label className="engineer-edit-label">
                                    <FaUser />
                                    <span>Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editEngineer.lastName}
                                    onChange={handleEditChange}
                                    className="engineer-edit-input"
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>

                        {/* EMAIL (DISABLED) */}
                        <div className="engineer-edit-email-field">
                            <label className="engineer-edit-label">
                                <FaEnvelope />
                                <span>Email</span>
                            </label>
                            <input
                                type="email"
                                value={editEngineer.email}
                                disabled
                                className="engineer-edit-email-input"
                            />
                            <span className="engineer-edit-email-note">
                                <FaLock />
                                Email cannot be changed
                            </span>
                        </div>

                        {/* CONTACT */}
                        <div className="engineer-edit-contact-field">
                            <label className="engineer-edit-label">
                                <FaPhoneAlt />
                                <span>Contact Number</span>
                            </label>
                            <input
                                type="tel"
                                name="contact"
                                value={editEngineer.contact}
                                onChange={handleEditChange}
                                className="engineer-edit-input"
                                placeholder="Enter contact number"
                                required
                            />
                        </div>

                        {/* ADDRESS */}
                        <div className="engineer-edit-address-field">
                            <label className="engineer-edit-label">
                                <FaMapMarkerAlt />
                                <span>Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={editEngineer.address || ""}
                                onChange={handleEditChange}
                                className="engineer-edit-input"
                                placeholder="Enter residential / work address"
                            />
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="engineer-edit-actions">
                            <button
                                type="button"
                                className="engineer-edit-cancel"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                <FaTimes />
                                <span>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                className="engineer-edit-save"
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
                        onClose={() => setPopup((p) => ({ ...p, isOpen: false }))}
                        onConfirm={popup.onConfirm}
                    />
                )}
            </div>
        );
    }

    /* =========================================================
       NORMAL VIEW PROFILE MODE
    ========================================================= */
    return (
        <div className="engineer-profile-page">
            <div className="engineer-profile-card">
                {/* PROFILE HEADER */}
                <div className="engineer-profile-header">
                    <div className="engineer-profile-photo-wrapper">
                        <img
                            src={
                                engineer.profileImage
                                    ? getFileUrl(engineer.profileImage)
                                    : defaultProfile
                            }
                            alt="Engineer Profile"
                            className="engineer-profile-photo"
                        />
                    </div>

                    <h2 className="engineer-profile-name">
                        {engineer.firstName} {engineer.lastName}
                    </h2>

                    <div className="engineer-profile-role-badge">
                        <FaBuilding />
                        <span className="engineer-profile-role">
                            {engineer.department || "Municipal Engineer"}
                        </span>
                    </div>
                </div>

                {/* PROFILE INFORMATION */}
                <div className="engineer-profile-content">
                    {/* PERSONAL INFORMATION */}
                    <div className="engineer-profile-section-title">
                        <h3>Personal Information</h3>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaUser />
                            <span>First Name</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.firstName}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaUser />
                            <span>Last Name</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.lastName}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaEnvelope />
                            <span>Email</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.email}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaPhoneAlt />
                            <span>Contact</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.contact}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaMapMarkerAlt />
                            <span>Address</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.address || "Not specified"}
                        </div>
                    </div>

                    {/* PROFESSIONAL INFORMATION */}
                    <div className="engineer-profile-section-title">
                        <h3>Professional Details</h3>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaGraduationCap />
                            <span>Highest Qualification</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.qualification || "Engineering Degree"}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaBuilding />
                            <span>Engineering Branch</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.branch || "General"}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaBriefcase />
                            <span>Experience</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.experience} Year{engineer.experience !== 1 ? "s" : ""}
                        </div>
                    </div>

                    <div className="engineer-profile-field">
                        <div className="engineer-profile-label">
                            <FaBuilding />
                            <span>Department</span>
                        </div>
                        <div className="engineer-profile-value">
                            {engineer.department || "Public Works"}
                        </div>
                    </div>

                    {/* CERTIFICATES */}
                    {(engineer.degreeCertificate || engineer.experienceCertificate) && (
                        <>
                            <div className="engineer-profile-section-title">
                                <h3>Verified Credentials</h3>
                            </div>

                            {engineer.degreeCertificate && (
                                <div className="engineer-profile-field">
                                    <div className="engineer-profile-label">
                                        <FaCertificate />
                                        <span>Degree Certificate</span>
                                    </div>
                                    <div className="engineer-profile-value">
                                        <a
                                            href={getFileUrl(engineer.degreeCertificate)}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
                                        >
                                            📄 View Degree Certificate
                                        </a>
                                    </div>
                                </div>
                            )}

                            {engineer.experienceCertificate && (
                                <div className="engineer-profile-field">
                                    <div className="engineer-profile-label">
                                        <FaCertificate />
                                        <span>Experience Certificate</span>
                                    </div>
                                    <div className="engineer-profile-value">
                                        <a
                                            href={getFileUrl(engineer.experienceCertificate)}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
                                        >
                                            📄 View Experience Certificate
                                        </a>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* PROFILE ACTIONS */}
                <div className="engineer-profile-actions">
                    <button
                        type="button"
                        className="engineer-profile-edit-btn"
                        onClick={handleEdit}
                    >
                        <FaUserEdit />
                        <span>Edit Profile</span>
                    </button>

                    <button
                        type="button"
                        className="engineer-profile-password-btn"
                        onClick={() => navigate("/change-password")}
                    >
                        <FaLock />
                        <span>Change Password</span>
                    </button>
                </div>
            </div>

            {/* CUSTOM POPUP */}
            {popup.isOpen && (
                <CustomPopup
                    isOpen={popup.isOpen}
                    type={popup.type}
                    title={popup.title}
                    message={popup.message}
                    onClose={() => setPopup((p) => ({ ...p, isOpen: false }))}
                    onConfirm={popup.onConfirm}
                />
            )}
        </div>
    );
}

export default EngineerProfile;