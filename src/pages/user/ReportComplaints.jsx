import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/axios";

import "../../styles/ReportComplaint.css";
import "../../styles/LocationPicker.css";

import StatusPopup from "../../configure/StatusPopup";
import LocationPicker from "../../pages/LocationPicker";

function ReportComplaint() {
  const navigate = useNavigate();

  // =========================================================
  // DEPARTMENT / CATEGORY
  // =========================================================

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // =========================================================
  // SUBMIT
  // =========================================================

  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // MESSAGE
  // =========================================================

  const [message, setMessage] = useState("");
  const [complaintNumber, setComplaintNumber] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // POPUP
  // =========================================================

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    // Complaint information
    title: "",
    department: "",
    departmentId: "",
    category: "",
    description: "",

    // Location
    address: "",
    pincode: "",
    latitude: "",
    longitude: "",

    // Files
    attachments: [],

    // Confirmation
    confirm: false,
  });

  // =========================================================
  // GET DEPARTMENTS
  // =========================================================

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        setError("");

        const response = await axios.get(
          `${API_BASE_URL}/departments`
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setDepartments(data);
      } catch (err) {
        console.error("Department Fetch Error:", err);

        const backendMessage =
          err.response?.data?.message ||
          err.response?.data;

        const errorMessage =
          typeof backendMessage === "string"
            ? backendMessage
            : "Unable to load departments.";

        setError(errorMessage);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // =========================================================
  // GET CATEGORY BY DEPARTMENT
  // =========================================================

  const fetchCategories = async (departmentId) => {
    if (!departmentId) {
      setCategories([]);
      return;
    }

    try {
      setLoadingCategories(true);
      setError("");

      const response = await axios.get(
        `${API_BASE_URL}/categories/department/${departmentId}`
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setCategories(data);
    } catch (err) {
      console.error("Category Fetch Error:", err);

      setCategories([]);

      const backendMessage =
        err.response?.data?.message ||
        err.response?.data;

      const errorMessage =
        typeof backendMessage === "string"
          ? backendMessage
          : "Unable to load categories.";

      setError(errorMessage);
    } finally {
      setLoadingCategories(false);
    }
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // =======================================================
    // DEPARTMENT CHANGED
    // =======================================================

    if (name === "departmentId") {
      const selectedDepartment = departments.find(
        (department) =>
          String(department.departmentId) === String(value)
      );

      setFormData((prev) => ({
        ...prev,
        departmentId: value,
        department: selectedDepartment?.name || "",
        category: "",
      }));

      setCategories([]);

      if (value) {
        fetchCategories(value);
      }

      return;
    }

    // =======================================================
    // NORMAL INPUT
    // =======================================================

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // GET FILE TYPE
  // =========================================================

  const getFileType = (file) => {
    if (file.type?.startsWith("image/")) {
      return "image";
    }

    if (file.type === "application/pdf") {
      return "pdf";
    }

    if (file.type?.startsWith("video/")) {
      return "video";
    }

    return "other";
  };

  // =========================================================
  // FILE CHANGE
  // =========================================================

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setFormData((prev) => {
      const remainingSlots =
        3 - prev.attachments.length;

      if (remainingSlots <= 0) {
        alert(
          "Maximum 3 attachments are allowed."
        );

        return prev;
      }

      const filesToAdd =
        selectedFiles.slice(0, remainingSlots);

      if (selectedFiles.length > remainingSlots) {
        alert(
          "You can upload a maximum of 3 attachments."
        );
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

  // =========================================================
  // REMOVE ATTACHMENT
  // =========================================================

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================================================
  // LOCATION
  // =========================================================

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.address || "",
      latitude: location.latitude ?? "",
      longitude: location.longitude ?? "",
      pincode: location.pincode || "",
    }));
  };

  // =========================================================
  // VALIDATE FORM
  // =========================================================

  const validateForm = () => {
    if (!formData.departmentId) {
      return "Please select a department.";
    }

    if (!formData.category) {
      return "Please select a complaint category.";
    }

    if (!formData.title.trim()) {
      return "Please enter a complaint title.";
    }

    if (!formData.description.trim()) {
      return "Please enter complaint description.";
    }

    if (!formData.address) {
      return "Please select complaint location.";
    }

    if (!formData.confirm) {
      return "Please confirm that the information provided is correct.";
    }

    return null;
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setMessage("");
    setComplaintNumber("");

    // =======================================================
    // VALIDATION
    // =======================================================

    const validationError = validateForm();

if (validationError) {
  setError(validationError);

  setPopup({
    show: true,
    type: "error",
    title: "Confirmation Required",
    message: validationError,
    details: "",
  });

  return;
}

    // =======================================================
    // SUBMIT COMPLAINT
    // =======================================================

    try {
      setSubmitting(true);

      const complaintData = new FormData();

      complaintData.append(
        "department",
        formData.department
      );

      complaintData.append(
        "category",
        formData.category
      );

      complaintData.append(
        "title",
        formData.title.trim()
      );

      complaintData.append(
        "description",
        formData.description.trim()
      );

      complaintData.append(
        "address",
        formData.address
      );

      complaintData.append(
        "pincode",
        formData.pincode || ""
      );

      complaintData.append(
        "latitude",
        formData.latitude || ""
      );

      complaintData.append(
        "longitude",
        formData.longitude || ""
      );

      // =====================================================
      // ATTACHMENTS
      // =====================================================

      if (
        formData.attachments &&
        formData.attachments.length > 0
      ) {
        formData.attachments.forEach((file) => {
          complaintData.append("media", file);
        });
      }

      // =====================================================
      // API REQUEST
      // =====================================================

      const token = localStorage.getItem("token");

      if (!token) {
        setPopup({
          show: true,
          type: "error",
          title: "Authentication Required",
          message: "You must be logged in as a citizen to submit a complaint. Please log in first.",
          details: "",
        });
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/citizen/complaints`,
        complaintData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // =====================================================
      // RESPONSE
      // =====================================================

      const responseData =
        response.data?.data ||
        response.data ||
        {};

      const compNumber =
        responseData.complaintNumber || "";

      const successMessage =
        responseData.message ||
        "Your complaint has been registered successfully.";

      setComplaintNumber(compNumber);
      setMessage(successMessage);

      // =====================================================
      // SUCCESS POPUP
      // =====================================================

      setPopup({
        show: true,
        type: "success",
        title: "Complaint Registered!",
        message: successMessage,
        details: compNumber
          ? `Complaint Number: ${compNumber}`
          : "Your complaint has been registered successfully.",
      });

      // =====================================================
      // RESET FORM
      // =====================================================

      setFormData({
        title: "",
        department: "",
        departmentId: "",
        category: "",
        description: "",
        address: "",
        pincode: "",
        latitude: "",
        longitude: "",
        attachments: [],
        confirm: false,
      });

      setCategories([]);
    } catch (err) {
      console.error(
        "Submit Complaint Error:",
        err
      );

      const backendMessage =
        err.response?.data?.message ||
        err.response?.data;

      const errorMessage =
        typeof backendMessage === "string"
          ? backendMessage
          : "Unable to submit complaint. Please try again.";

      setError(errorMessage);

      setPopup({
        show: true,
        type: "error",
        title: "Submission Failed",
        message: errorMessage,
        details: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // LOADING DEPARTMENTS
  // =========================================================

  if (loadingDepartments) {
    return (
      <div className="complaint-page">
        <div className="complaint-card">
          <h1>Report a Complaint</h1>
          <p>Loading complaint form...</p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="complaint-page">
      <div className="complaint-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <h1>Report a Complaint</h1>

        <p>
          Help improve your city by reporting civic
          issues quickly and accurately.
        </p>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="success-message">
            <h3>
              Complaint Registered Successfully
            </h3>

            <p>{message}</p>

            {complaintNumber && (
              <p>
                <strong>
                  Complaint Number:
                </strong>{" "}
                {complaintNumber}
              </p>
            )}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              COMPLAINT DETAILS
          ================================================= */}

          <h2 className="section-title">
            Complaint Details
          </h2>

          <div className="grid-2">

            {/* Department */}

            <div className="form-group">
              <label>Department</label>

              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">
                  Select Department
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department.departmentId}
                      value={department.departmentId}
                    >
                      {department.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Category */}

            <div className="form-group">
              <label>
                Complaint Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={
                  !formData.departmentId ||
                  loadingCategories ||
                  submitting
                }
              >
                <option value="">
                  {!formData.departmentId
                    ? "Select Department First"
                    : loadingCategories
                    ? "Loading Categories..."
                    : "Select Category"}
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.categoryId}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="form-group">

            <label>
              Complaint Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter Complaint Title"
              value={formData.title}
              onChange={handleChange}
              disabled={submitting}
            />

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
              disabled={submitting}
            />

          </div>

          {/* =================================================
              LOCATION
          ================================================= */}

          <h2 className="section-title">
            Complaint Location
          </h2>

          <LocationPicker
            onLocationSelect={
              handleLocationSelect
            }
          />

          {/* Selected Address */}

          <div className="form-group">

            <label>
              Selected Address
            </label>

            <textarea
              rows="3"
              value={formData.address}
              readOnly
              placeholder="Select a location from the map"
            />

          </div>

          {/* Location Information */}

          <div className="grid-3">

            {/* Pincode */}

            <div className="form-group">

              <label>Pincode</label>

              <input
                type="text"
                value={formData.pincode}
                readOnly
              />

            </div>

            {/* Latitude */}

            <div className="form-group">

              <label>Latitude</label>

              <input
                type="text"
                value={formData.latitude}
                readOnly
              />

            </div>

            {/* Longitude */}

            <div className="form-group">

              <label>Longitude</label>

              <input
                type="text"
                value={formData.longitude}
                readOnly
              />

            </div>

          </div>

          {/* =================================================
              ATTACHMENTS
          ================================================= */}

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
                formData.attachments.length >= 3 ||
                submitting
              }
            />

            <small className="upload-note">
              Maximum 3 files total.
              Supported formats:
              JPG, PNG, JPEG, PDF and Video.
            </small>

            <small className="upload-note">
              {formData.attachments.length} / 3
              files selected
            </small>

          </div>

          {/* =================================================
              FILE PREVIEW
          ================================================= */}

          <div className="preview-grid">

            {formData.attachments.map(
              (file, index) => {

                const fileType =
                  getFileType(file);

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
                      disabled={submitting}
                    >
                      ×
                    </button>

                    {/* Image */}

                    {fileType === "image" && (
                      <img
                        src={URL.createObjectURL(
                          file
                        )}
                        alt={`Complaint ${
                          index + 1
                        }`}
                      />
                    )}

                    {/* Video */}

                    {fileType === "video" && (
                      <video
                        src={URL.createObjectURL(
                          file
                        )}
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

                    {/* Other */}

                    {fileType === "other" && (
                      <div className="file-preview">

                        <div className="file-icon">
                          FILE
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

          {/* =================================================
              CONFIRMATION
          ================================================= */}

          <div className="checkbox-group">

            <input
              type="checkbox"
              name="confirm"
              checked={formData.confirm}
              onChange={handleChange}
              disabled={submitting}
            />

            <span>
              I confirm that the information provided
              is correct and the complaint details are
              accurate.
            </span>

          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting
              ? "Processing..."
              : "Submit Complaint"}
          </button>

        </form>

      </div>

      {/* =====================================================
          STATUS POPUP
      ====================================================== */}

      {popup.show && (
        <StatusPopup
          type={popup.type}
          title={popup.title}
          message={popup.message}
          details={popup.details}
          buttonText={
            popup.type === "success"
              ? "Go to My Complaints"
              : "Close"
          }
          onClose={() => {
            const popupType = popup.type;

            setPopup({
              show: false,
              type: "success",
              title: "",
              message: "",
              details: "",
            });

            if (popupType === "success") {
              navigate("/user/my-complaints");
            }
          }}
        />
      )}

    </div>
  );
}

export default ReportComplaint;
