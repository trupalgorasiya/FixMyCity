import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ReportComplaint.css";
import StatusPopup from "../../configure/StatusPopup";
import "../../styles/LocationPicker.css";
import LocationPicker from "../../pages/LocationPicker";
import axios from "axios";

function ReportComplaint() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [complaintNumber, setComplaintNumber] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
    details: "",
  });
  const [formData, setFormData] = useState({
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

  // =========================================
  // GET DEPARTMENTS
  // =========================================

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in. Please login again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8085/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setDepartments(data);
      } catch (err) {
        console.error("Department Fetch Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load departments."
        );
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // =========================================
  // GET CATEGORY BY DEPARTMENT
  // =========================================

  const fetchCategories = async (departmentId) => {
    if (!departmentId) {
      setCategories([]);
      return;
    }

    try {
      setLoadingCategories(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please login again.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8085/api/categories/department/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setCategories(data);
    } catch (err) {
      console.error("Category Fetch Error:", err);

      setCategories([]);

      setError(
        err.response?.data?.message ||
        "Unable to load categories."
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  // =========================================
  // HANDLE FORM CHANGE
  // =========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    // Department changed
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

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================
  // FILE TYPE
  // =========================================

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

  // =========================================
  // FILE CHANGE
  // =========================================

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFormData((prev) => {
      const remainingSlots =
        3 - prev.attachments.length;

      if (remainingSlots <= 0) {
        alert("Maximum 3 attachments are allowed.");
        return prev;
      }

      const filesToAdd =
        selectedFiles.slice(
          0,
          remainingSlots
        );

      if (
        selectedFiles.length >
        remainingSlots
      ) {
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

    e.target.value = "";
  };

  // =========================================
  // REMOVE ATTACHMENT
  // =========================================

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments:
        prev.attachments.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================
  // LOCATION
  // =========================================

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      pincode: location.pincode,
    }));
  };

  // =========================================
  // SUBMIT COMPLAINT
  // =========================================

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) {
    return;
  }

  setError("");

  if (!formData.departmentId) {
    setError("Please select a department.");
    return;
  }

  if (!formData.category) {
    setError("Please select a complaint category.");
    return;
  }

  if (!formData.title.trim()) {
    setError("Please enter a complaint title.");
    return;
  }

  if (!formData.description.trim()) {
    setError("Please enter complaint description.");
    return;
  }

  if (!formData.address) {
    setError("Please select complaint location.");
    return;
  }

  if (!formData.confirm) {
    setError(
      "Please confirm that the information provided is correct."
    );
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setError("You are not logged in. Please login again.");
    return;
  }

  try {
    setSubmitting(true);

    const data = new FormData();

    data.append(
      "title",
      formData.title.trim()
    );

    data.append(
      "description",
      formData.description.trim()
    );

    data.append(
      "address",
      formData.address
    );

    data.append(
      "pincode",
      formData.pincode
    );

    data.append(
      "latitude",
      formData.latitude
    );

    data.append(
      "longitude",
      formData.longitude
    );

    data.append(
      "department",
      formData.department
    );

    data.append(
      "category",
      formData.category
    );

    formData.attachments.forEach((file) => {
      data.append("media", file);
    });

    const response = await axios.post(
      "http://localhost:8085/api/citizen/complaints",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(
      "Complaint Response:",
      response.data
    );

    const complaintNumber =
      response.data?.complaintNumber;

    const successMessage =
      response.data?.message ||
      "Your complaint has been registered successfully.";

    setComplaintNumber(
      complaintNumber || ""
    );

    setMessage(
      successMessage
    );

    // =========================================
    // SHOW SUCCESS POPUP
    // =========================================

    setPopup({
      show: true,
      type: "success",
      title: "Complaint Registered!",
      message: successMessage,
      details: complaintNumber
        ? `Complaint Number: ${complaintNumber}`
        : "",
    });

  } catch (err) {

    console.error(
      "Complaint Submit Error:",
      err
    );

    const backendMessage =
      err.response?.data?.message;

    let errorMessage;

    if (backendMessage) {
      errorMessage = backendMessage;
    } else if (
      typeof err.response?.data === "string"
    ) {
      errorMessage = err.response.data;
    } else {
      errorMessage =
        "Unable to register complaint. Please try again.";
    }

    setError(errorMessage);

    // =========================================
    // SHOW ERROR POPUP
    // =========================================

    setPopup({
      show: true,
      type: "error",
      title: "Complaint Registration Failed",
      message: errorMessage,
      details: "",
    });

  } finally {

    setSubmitting(false);

  }
};

  // =========================================
  // LOADING DEPARTMENTS
  // =========================================

  if (loadingDepartments) {
    return (
      <div className="complaint-page">
        <div className="complaint-card">

          <h1>
            Report a Complaint
          </h1>

          <p>
            Loading complaint form...
          </p>

        </div>

      </div>
    );
  }

 // =========================================
// PAGE
// =========================================

return (
  <div className="complaint-page">

    <div className="complaint-card">

      <h1>
        Report a Complaint
      </h1>

      <p>
        Help improve your city by reporting
        civic issues quickly and accurately.
      </p>

      {/* =====================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && (
        <div className="success-message">

          <h3>
            Complaint Registered Successfully
          </h3>

          <p>
            {message}
          </p>

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

      {/* =====================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* =====================================
          FORM
      ====================================== */}

      <form onSubmit={handleSubmit}>

        {/* =====================================
            CITIZEN INFORMATION
        ====================================== */}

        <h2 className="section-title">
          Citizen Information
        </h2>

        <p className="form-info">
          Your registered citizen information is
          automatically taken from your login account.
          You do not need to enter it again.
        </p>

        {/* =====================================
            COMPLAINT DETAILS
        ====================================== */}

        <h2 className="section-title">
          Complaint Details
        </h2>

        {/* Department + Category */}

        <div className="grid-2">

          <div className="form-group">

            <label>
              Department
            </label>

            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              disabled={loadingDepartments}
            >

              <option value="">
                Select Department
              </option>

              {departments.map((department) => (
                <option
                  key={department.departmentId}
                  value={department.departmentId}
                >
                  {department.name}
                </option>
              ))}

            </select>

          </div>

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
                loadingCategories
              }
            >

              <option value="">
                {!formData.departmentId
                  ? "Select Department First"
                  : loadingCategories
                  ? "Loading Categories..."
                  : "Select Category"}
              </option>

              {categories.map((category) => (
                <option
                  key={category.categoryId}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* =====================================
            TITLE
        ====================================== */}

        <div className="form-group">

          <label>
            Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter Complaint Title"
            value={formData.title}
            onChange={handleChange}
          />

        </div>

        {/* =====================================
            DESCRIPTION
        ====================================== */}

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
          />

        </div>

        {/* =====================================
            LOCATION
        ====================================== */}

        <h2 className="section-title">
          Complaint Location
        </h2>

        <LocationPicker
          onLocationSelect={handleLocationSelect}
        />

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

        <div className="grid-3">

          <div className="form-group">

            <label>
              Pincode
            </label>

            <input
              type="text"
              value={formData.pincode}
              readOnly
            />

          </div>

          <div className="form-group">

            <label>
              Latitude
            </label>

            <input
              type="text"
              value={formData.latitude}
              readOnly
            />

          </div>

          <div className="form-group">

            <label>
              Longitude
            </label>

            <input
              type="text"
              value={formData.longitude}
              readOnly
            />

          </div>

        </div>

        {/* =====================================
            ATTACHMENTS
        ====================================== */}

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
            Supported formats:
            JPG, PNG, JPEG, PDF and Video.
          </small>

          <small className="upload-note">
            {formData.attachments.length} / 3 files selected
          </small>

        </div>

        {/* =====================================
            PREVIEW
        ====================================== */}

        <div className="preview-grid">

          {formData.attachments.map(
            (file, index) => {

              const fileType = getFileType(file);

              return (
                <div
                  className="preview-card"
                  key={`${file.name}-${index}`}
                >

                  <button
                    type="button"
                    className="remove-image"
                    onClick={() =>
                      removeAttachment(index)
                    }
                  >
                    ×
                  </button>

                  {fileType === "image" && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Complaint ${index + 1}`}
                    />
                  )}

                  {fileType === "video" && (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                    />
                  )}

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

                  <div className="file-name">
                    {file.name}
                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* =====================================
            DECLARATION
        ====================================== */}

        <div className="checkbox-group">

          <input
            type="checkbox"
            name="confirm"
            checked={formData.confirm}
            onChange={handleChange}
          />

          <span>
            I confirm that the information
            provided is correct and the
            complaint details are accurate.
          </span>

        </div>

        {/* =====================================
            SUBMIT
        ====================================== */}

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >

          {submitting
            ? "Submitting Complaint..."
            : "Submit Complaint"}

        </button>

      </form>

    </div>

    {/* =====================================
        STATUS POPUP
    ====================================== */}

    {popup.show && (
      <StatusPopup
        type={popup.type}
        title={popup.title}
        message={popup.message}
        details={popup.details}
        buttonText={
          popup.type === "success"
            ? "Go to Dashboard"
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
            navigate("/user/dashboard");
          }

        }}
      />
    )}

  </div>
);
}

export default ReportComplaint;