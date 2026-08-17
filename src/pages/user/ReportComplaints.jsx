import { useState } from "react";
import "../../styles/ReportComplaint.css";
import "../../styles/LocationPicker.css";
import LocationPicker from "../../pages/LocationPicker";

function ReportComplaint() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    title: "",
    department: "",
    category: "",
    description: "",
    address: "",
    pincode: "",
    latitude: "",
    longitude: "",
    attachments: [],
    confirm: false,
  });

  // Department-wise complaint categories
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // When department changes, reset category
    if (name === "department") {
      setFormData((prev) => ({
        ...prev,
        department: value,
        category: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
        attachments: [...prev.attachments, ...filesToAdd],
      };
    });

    // Allow selecting the same file again
    e.target.value = "";
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      pincode: location.pincode,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      alert("Please enter your first name.");
      return;
    }

    if (!formData.lastName.trim()) {
      alert("Please enter your last name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!formData.contact.trim()) {
      alert("Please enter your contact number.");
      return;
    }

    if (!formData.department) {
      alert("Please select a department.");
      return;
    }

    if (!formData.category) {
      alert("Please select a complaint category.");
      return;
    }

    if (!formData.title) {
      alert("Please Enter a Title.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter complaint description.");
      return;
    }

    if (!formData.address) {
      alert("Please select complaint location.");
      return;
    }

    if (!formData.confirm) {
      alert("Please confirm that the information provided is correct.");
      return;
    }

    console.log("Complaint Data:", formData);

    alert("Complaint submitted successfully!");

    // Later:
    // Call API here
    // Send complaint data to Spring Boot backend
  };

  return (
    <div className="complaint-page">
      <div className="complaint-card">
        <h1>Report a Complaint</h1>

        <p>
          Help improve your city by reporting civic issues quickly and
          accurately.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Citizen Information */}

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

          {/* Complaint Department */}

          <h2 className="section-title">
            Complaint Details
          </h2>

          <div className="grid-2">
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

                {Object.keys(departmentCategories).map(
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
                  departmentCategories[
                    formData.department
                  ]?.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" 
            name="title " 
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}/>
          </div>
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

          {/* Location */}

          <h2 className="section-title">
            Complaint Location
          </h2>

          <LocationPicker
            onLocationSelect={handleLocationSelect}
          />

          <div className="form-group">
            <label>Selected Address</label>

            <textarea
              rows="3"
              value={formData.address}
              readOnly
              placeholder="Select a location from the map"
            />
          </div>

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

          {/* Attachments */}

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
              disabled={formData.attachments.length >= 3}
            />

            <small className="upload-note">
              Maximum 3 files total. Supported formats:
              JPG, PNG, JPEG, PDF and Video.
            </small>

            <small className="upload-note">
              {formData.attachments.length} / 3 files selected
            </small>
          </div>

          {/* Attachment Preview */}

          <div className="preview-grid">
            {formData.attachments.map((file, index) => {
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

                  {/* Image Preview */}

                  {fileType === "image" && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Complaint ${index + 1}`}
                    />
                  )}

                  {/* Video Preview */}

                  {fileType === "video" && (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                    />
                  )}

                  {/* PDF Preview */}

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
            })}
          </div>

          {/* Declaration */}

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="confirm"
              checked={formData.confirm}
              onChange={handleChange}
            />

            <span>
              I confirm that the information provided is
              correct and the complaint details are accurate.
            </span>
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportComplaint;