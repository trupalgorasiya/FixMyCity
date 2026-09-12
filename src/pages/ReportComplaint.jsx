import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ReportComplaint.css";
import "../styles/LocationPicker.css";
import LocationPicker from "../pages/LocationPicker";
import EmailOtpModal from "./EmailOtpModal";
import "../styles/EmailOtpModel.css";
import StatusPopup from "../configure/StatusPopup";

function ReportComplaint() {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    department: "",
    category: "",
    title: "",
    description: "",
    address: "",
    pincode: "",
    latitude: "",
    longitude: "",
    attachments: [],
    confirm: false,
  });

  // Department-wise complaint categories (fallback)
  const departmentCategories = {
    "Roads & Infrastructure": [
      "Road Damage",
      "Pothole",
      "Broken Footpath",
      "Road Construction Issue",
      "Bridge Damage",
      "Divider Damage",
    ],
    "Water Supply": [
      "Water Leakage",
      "Water Pipeline Damage",
      "Low Water Pressure",
      "No Water Supply",
      "Contaminated Water",
      "Water Overflow",
    ],
    "Sanitation & Waste Management": [
      "Garbage Collection",
      "Garbage Dump",
      "Unclean Area",
      "Open Garbage",
      "Waste Collection Issue",
      "Dead Animal Disposal",
    ],
    "Street Lighting": [
      "Street Light Not Working",
      "Broken Street Light",
      "Flickering Street Light",
      "Dark Street Area",
      "Damaged Light Pole",
    ],
    "Drainage & Sewerage": [
      "Drainage Blockage",
      "Sewerage Overflow",
      "Open Drain",
      "Drainage Leakage",
      "Water Logging",
      "Bad Drainage Smell",
    ],
    "Traffic Management": [
      "Traffic Signal Issue",
      "Damaged Traffic Signal",
      "Illegal Parking",
      "Missing Traffic Sign",
      "Damaged Traffic Sign",
      "Traffic Congestion",
    ],
    "Public Safety": [
      "Dangerous Public Area",
      "Broken Public Property",
      "Unsafe Structure",
      "Open Manhole",
      "Fallen Tree",
      "Other Safety Issue",
    ],
    "Parks & Public Places": [
      "Park Maintenance",
      "Damaged Playground",
      "Broken Public Bench",
      "Public Toilet Issue",
      "Garden Maintenance",
      "Public Place Cleanliness",
    ],
  };

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/departments");
        const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
        if (data && data.length > 0) {
          setDepartments(data);
        }
      } catch (err) {
        console.warn("Could not load departments from API, using fallback categories", err);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch categories when department changes
  const fetchCategories = async (deptName) => {
    const selectedDept = departments.find(
      (d) => d.name?.toLowerCase() === deptName.toLowerCase()
    );

    if (!selectedDept || !selectedDept.departmentId) {
      setCategories([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8085/api/categories/department/${selectedDept.departmentId}`
      );
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setCategories(data);
    } catch (err) {
      console.warn("Could not load categories for department", err);
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Department change
    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        department: value,
        category: "",
      }));

      if (value) {
        fetchCategories(value);
      } else {
        setCategories([]);
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Image / PDF / Video upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFormData((prev) => {
      const remainingSlots = 3 - prev.attachments.length;

      if (remainingSlots <= 0) {
        alert("Maximum 3 attachments are allowed.");
        return prev;
      }

      const filesToAdd = selectedFiles.slice(0, remainingSlots);

      if (selectedFiles.length > remainingSlots) {
        alert("You can upload a maximum of 3 attachments.");
      }

      return {
        ...prev,
        attachments: [
          ...prev.attachments,
          ...filesToAdd,
        ],
      };
    });

    // Allow selecting the same file again
    e.target.value = "";
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Location selection
  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      pincode: location.pincode,
    }));
  };

  // Get attachment type
  const getFileType = (file) => {
    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type === "application/pdf") {
      return "pdf";
    }

    if (file.type.startsWith("video/")) {
      return "video";
    }

    return "other";
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      department: "",
      category: "",
      title: "",
      description: "",
      address: "",
      pincode: "",
      latitude: "",
      longitude: "",
      attachments: [],
      confirm: false,
    });
    setCategories([]);
  };

  // Submit complaint form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    // Basic validation
    if (!formData.firstName.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your first name.",
        details: "",
      });
      return;
    }

    if (!formData.lastName.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your last name.",
        details: "",
      });
      return;
    }

    if (!formData.email.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your email address.",
        details: "",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter a valid email address.",
        details: "",
      });
      return;
    }

    if (!formData.contact.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter your contact number.",
        details: "",
      });
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact.trim())) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Contact number must be exactly 10 digits.",
        details: "",
      });
      return;
    }

    if (!formData.department) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please select a department.",
        details: "",
      });
      return;
    }

    if (!formData.category) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please select a complaint category.",
        details: "",
      });
      return;
    }

    if (!formData.title.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter complaint title.",
        details: "",
      });
      return;
    }

    if (!formData.description.trim()) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please enter complaint description.",
        details: "",
      });
      return;
    }

    if (!formData.address) {
      setPopup({
        show: true,
        type: "warning",
        title: "Validation Error",
        message: "Please select complaint location from map.",
        details: "",
      });
      return;
    }

    if (!formData.confirm) {
      setPopup({
        show: true,
        type: "warning",
        title: "Confirmation Required",
        message: "Please confirm that the information provided is correct.",
        details: "",
      });
      return;
    }

    try {
      setSubmitting(true);

      // STEP 1: Check if user email is present in backend database
      const checkRes = await axios.get(
        `http://localhost:8085/api/guest-complaint/check-email?email=${encodeURIComponent(formData.email.trim())}`
      );

      const isRegistered = checkRes.data?.exists === true;

      if (isRegistered) {
        // =======================================================
        // FLOW 1: EMAIL IS PRESENT -> DIRECT COMPLAINT
        // =======================================================
        const directData = new FormData();
        directData.append("firstName", formData.firstName.trim());
        directData.append("lastName", formData.lastName.trim());
        directData.append("email", formData.email.trim());
        directData.append("contact", formData.contact.trim());
        directData.append("department", formData.department);
        directData.append("category", formData.category);
        directData.append("title", formData.title.trim());
        directData.append("description", formData.description.trim());
        directData.append("address", formData.address);
        directData.append("pincode", formData.pincode || "");
        directData.append("latitude", formData.latitude || "");
        directData.append("longitude", formData.longitude || "");

        if (formData.attachments && formData.attachments.length > 0) {
          formData.attachments.forEach((file) => {
            directData.append("media", file);
          });
        }

        const directResponse = await axios.post(
          "http://localhost:8085/api/guest-complaint/direct-complaint",
          directData
        );

        const compNumber = directResponse.data?.complaintNumber || "";
        const successMsg =
          directResponse.data?.message ||
          "Complaint registered successfully under your registered account.";

        setPopup({
          show: true,
          type: "success",
          title: "Complaint Submitted Successfully!",
          message: successMsg,
          details: compNumber
            ? `Complaint Number: ${compNumber}`
            : "A confirmation email has been sent to your registered email.",
        });

        resetForm();
      } else {
        // =======================================================
        // FLOW 2: EMAIL NOT PRESENT -> SEND OTP & OPEN MODAL
        // =======================================================
        await axios.post(
          "http://localhost:8085/api/guest-complaint/send-otp",
          {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            contact: formData.contact.trim(),
            department: formData.department,
            category: formData.category,
            title: formData.title.trim(),
            description: formData.description.trim(),
            address: formData.address,
            pincode: formData.pincode || "",
            latitude: formData.latitude || "",
            longitude: formData.longitude || "",
          }
        );

        setShowOtpModal(true);
      }
    } catch (err) {
      console.error("Submit Complaint Error:", err);
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to submit complaint. Please check the details and try again.";

      setPopup({
        show: true,
        type: "error",
        title: "Submission Failed",
        message:
          typeof backendMessage === "string"
            ? backendMessage
            : "An unexpected error occurred.",
        details: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Called after OTP verification succeeds
  const handleVerified = (responseData) => {
    setShowOtpModal(false);

    const compNumber = responseData?.complaintNumber || "";
    const successMsg =
      responseData?.message ||
      "Complaint registered and account created successfully!";

    if (responseData?.token) {
      localStorage.setItem("token", responseData.token);
    }

    setPopup({
      show: true,
      type: "success",
      title: "Account Created & Complaint Registered!",
      message: successMsg,
      details: compNumber
        ? `Complaint Number: ${compNumber}`
        : "Your login credentials and complaint confirmation have been emailed to you.",
    });

    resetForm();
  };

  // Resend OTP handler for modal
  const handleResendOtp = async () => {
    await axios.post(
      "http://localhost:8085/api/guest-complaint/send-otp",
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        contact: formData.contact.trim(),
        department: formData.department,
        category: formData.category,
        title: formData.title.trim(),
        description: formData.description.trim(),
        address: formData.address,
        pincode: formData.pincode || "",
        latitude: formData.latitude || "",
        longitude: formData.longitude || "",
      }
    );
  };

  return (
    <div className="complaint-page">
      <div className="complaint-card">

        <h1>Report a Complaint</h1>

        <p>
          Help improve your city by reporting civic issues
          quickly and accurately.
        </p>

        <form onSubmit={handleSubmit}>

          {/* ================================
              CITIZEN INFORMATION
          ================================= */}

          <h2 className="section-title">
            Citizen Information
          </h2>

          <div className="grid-2">

            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="grid-2">

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>

              <input
                type="tel"
                name="contact"
                placeholder="Enter Contact Number"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* ================================
              COMPLAINT DETAILS
          ================================= */}

          <h2 className="section-title">
            Complaint Details
          </h2>

          <div className="grid-2">

            {/* Department */}

            <div className="form-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >

                <option value="">
                  Select Department
                </option>

                {departments.length > 0
                  ? departments.map((dept) => (
                      <option
                        key={dept.departmentId || dept.name}
                        value={dept.name}
                      >
                        {dept.name}
                      </option>
                    ))
                  : Object.keys(departmentCategories).map(
                      (department) => (
                        <option
                          key={department}
                          value={department}
                        >
                          {department}
                        </option>
                      )
                    )}

              </select>
            </div>

            {/* Category */}

            <div className="form-group">
              <label>Complaint Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!formData.department}
              >

                <option value="">
                  {formData.department
                    ? "Select Category"
                    : "Select Department First"}
                </option>

                {formData.department &&
                  (categories.length > 0
                    ? categories.map((cat) => (
                        <option
                          key={cat.categoryId || cat.name}
                          value={cat.name}
                        >
                          {cat.name}
                        </option>
                      ))
                    : (departmentCategories[
                        formData.department
                      ] || []).map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      )))}

              </select>
            </div>

          </div>

          {/* Title */}

          <div className="form-group">

            <label>Complaint Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter Complaint Title"
              value={formData.title}
              onChange={handleChange}
            />

          </div>

          {/* Description */}

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          {/* ================================
              LOCATION
          ================================= */}

          <h2 className="section-title">
            Complaint Location
          </h2>

          <LocationPicker
            onLocationSelect={handleLocationSelect}
          />

          {/* Selected Address */}

          <div className="form-group">

            <label>Selected Address</label>

            <textarea
              rows="3"
              value={formData.address}
              readOnly
              placeholder="Select a location from the map"
            />

          </div>

          {/* Location Details */}

          <div className="grid-3">

            <div className="form-group">

              <label>Pincode</label>

              <input
                type="text"
                value={formData.pincode}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>Latitude</label>

              <input
                type="text"
                value={formData.latitude}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>Longitude</label>

              <input
                type="text"
                value={formData.longitude}
                readOnly
              />

            </div>

          </div>

          {/* ================================
              ATTACHMENTS
          ================================= */}

          <h2 className="section-title">
            Complaint Evidence
          </h2>

          <div className="form-group">

            <label>
              Upload Images, PDF or Video
            </label>

            <input
              type="file"
              name="attachments"
              accept="image/*,application/pdf,video/*"
              multiple
              onChange={handleFileChange}
              disabled={
                formData.attachments.length >= 3
              }
            />

            <small className="upload-note">
              Maximum 3 files total.
              Supported formats: JPG, PNG, JPEG,
              PDF and Video.
            </small>

            <small className="upload-note">
              {formData.attachments.length} / 3 files
              selected
            </small>

          </div>

          {/* Attachment Preview */}

          <div className="preview-grid">

            {formData.attachments.map(
              (file, index) => {

                const fileType = getFileType(file);

                return (
                  <div
                    className="preview-card"
                    key={`${file.name}-${index}`}
                  >

                    {/* Remove */}

                    <button
                      type="button"
                      className="remove-image"
                      onClick={() =>
                        removeAttachment(index)
                      }
                    >
                      ×
                    </button>

                    {/* Image */}

                    {fileType === "image" && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Complaint ${index + 1}`}
                      />
                    )}

                    {/* Video */}

                    {fileType === "video" && (
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                      />
                    )}

                    {/* PDF */}

                    {fileType === "pdf" && (
                      <div className="file-preview">

                        <div className="file-icon">
                          PDF
                        </div>

                        <p>
                          {file.name}
                        </p>

                      </div>
                    )}

                    {/* File Name */}

                    <div className="file-name">
                      {file.name}
                    </div>

                  </div>
                );
              }
            )}

          </div>

          {/* ================================
              DECLARATION
          ================================= */}

          <div className="checkbox-group">

            <input
              type="checkbox"
              name="confirm"
              checked={formData.confirm}
              onChange={handleChange}
            />

            <span>
              I confirm that the information provided
              is correct.
            </span>

          </div>

          {/* ================================
              SUBMIT
          ================================= */}

          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Submit Complaint"}
          </button>

        </form>

      </div>

      {/* ================================
          EMAIL OTP MODAL
      ================================= */}

      {showOtpModal && (
        <EmailOtpModal
          email={formData.email}
          attachments={formData.attachments}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerified}
          onResend={handleResendOtp}
        />
      )}

      {/* ================================
          STATUS POPUP
      ================================= */}

      {popup.show && (
        <StatusPopup
          type={popup.type}
          title={popup.title}
          message={popup.message}
          details={popup.details}
          buttonText="OK"
          onClose={() =>
            setPopup((prev) => ({ ...prev, show: false }))
          }
        />
      )}

    </div>
  );
}

export default ReportComplaint;