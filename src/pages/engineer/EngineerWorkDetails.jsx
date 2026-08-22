import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./EngineerWorkDetails.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import {
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUpload,
  FaCheckCircle,
  FaTools,
  FaFilePdf,
  FaVideo,
  FaTimes
} from "react-icons/fa";

function EngineerWorkDetails() {

  const { id } = useParams();
  const location = useLocation();

  const complaintData = location.state;

  const complaint = {
    id: complaintData?.id || id,
    citizen: complaintData?.username,
    email: complaintData?.email,
    phone: complaintData?.phone,
    category: "Road Damage",
    priority: complaintData?.priority,
    address: "Satellite, Ahmedabad, Gujarat",
    pincode: "380015",
    latitude: 23.0225,
    longitude: 72.5714,
    description: "Large pothole causing traffic problems near main road.",
    engineer: "Amit Patel"
  };


  // ================= FILE STATES =================

  const [beforeFiles, setBeforeFiles] = useState([]);
  const [afterFiles, setAfterFiles] = useState([]);

  const [submittedBeforeFiles, setSubmittedBeforeFiles] = useState([]);
  const [submittedAfterFiles, setSubmittedAfterFiles] = useState([]);

  const [beforeSubmitted, setBeforeSubmitted] = useState(false);
  const [afterSubmitted, setAfterSubmitted] = useState(false);

  const [remarks, setRemarks] = useState("");


  // ================= VALIDATE FILES =================

  const validateFiles = (files) => {

    if (files.length > 3) {

      alert("Maximum 3 files allowed.");

      return false;
    }

    const allowedFiles = files.every(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type === "application/pdf"
    );

    if (!allowedFiles) {

      alert(
        "Only Image, Video and PDF files are allowed."
      );

      return false;
    }

    return true;
  };


  // ================= MERGE FILES =================

  const mergeFiles = (currentFiles, newFiles) => {

    const combinedFiles = [
      ...currentFiles,
      ...newFiles
    ];

    if (combinedFiles.length > 3) {

      alert(
        "Maximum 3 files allowed. Please remove an existing file before adding another."
      );

      return currentFiles;
    }

    return combinedFiles;
  };


  // ================= BEFORE FILE SELECT =================

  const handleBeforeUpload = (e) => {

    const newFiles = Array.from(e.target.files);

    if (newFiles.length === 0) {
      return;
    }

    const combinedFiles = mergeFiles(
      beforeFiles,
      newFiles
    );

    if (validateFiles(combinedFiles)) {

      setBeforeFiles(combinedFiles);

      // New selection means user can submit again
      setBeforeSubmitted(false);
    }

    // Allow selecting the same file again
    e.target.value = "";
  };


  // ================= AFTER FILE SELECT =================

  const handleAfterUpload = (e) => {

    const newFiles = Array.from(e.target.files);

    if (newFiles.length === 0) {
      return;
    }

    const combinedFiles = mergeFiles(
      afterFiles,
      newFiles
    );

    if (validateFiles(combinedFiles)) {

      setAfterFiles(combinedFiles);

      // New selection means user can submit again
      setAfterSubmitted(false);
    }

    // Allow selecting the same file again
    e.target.value = "";
  };


  // ================= PREVIEW FILE =================

  const previewFile = (file) => {

    return URL.createObjectURL(file);
  };


  // ================= REMOVE BEFORE FILE =================

  const removeBeforeFile = (index) => {

    const updatedFiles = beforeFiles.filter(
      (_, i) => i !== index
    );

    setBeforeFiles(updatedFiles);

    setBeforeSubmitted(false);
  };


  // ================= REMOVE AFTER FILE =================

  const removeAfterFile = (index) => {

    const updatedFiles = afterFiles.filter(
      (_, i) => i !== index
    );

    setAfterFiles(updatedFiles);

    setAfterSubmitted(false);
  };


  // ================= SUBMIT BEFORE FILES =================

  const submitBeforeFiles = () => {

    if (beforeFiles.length === 0) {

      alert(
        "Please select at least one before-work file."
      );

      return;
    }

    setSubmittedBeforeFiles([
      ...beforeFiles
    ]);

    setBeforeSubmitted(true);

    alert(
      "Before-work files submitted successfully."
    );
  };


  // ================= SUBMIT AFTER FILES =================

  const submitAfterFiles = () => {

    if (afterFiles.length === 0) {

      alert(
        "Please select at least one after-work file."
      );

      return;
    }

    setSubmittedAfterFiles([
      ...afterFiles
    ]);

    setAfterSubmitted(true);

    alert(
      "After-work files submitted successfully."
    );
  };


  // ================= SAVE WORK =================

  const saveWork = () => {

    alert(
      "Complaint work details saved successfully."
    );
  };


  // ================= FILE PREVIEW =================

  const renderFilePreview = (
    file,
    index,
    type
  ) => {

    const fileUrl = previewFile(file);

    return (

      <div
        className="image-card"
        key={`${file.name}-${index}`}
      >

        {/* IMAGE */}

        {file.type.startsWith("image/") && (

          <img
            src={fileUrl}
            alt={`${type} ${index + 1}`}
          />

        )}


        {/* VIDEO */}

        {file.type.startsWith("video/") && (

          <div className="video-preview">

            <video
              controls
              src={fileUrl}
            />

            <div className="file-type-label">

              <FaVideo />

              <span>
                Video
              </span>

            </div>

          </div>

        )}


        {/* PDF */}

        {file.type === "application/pdf" && (

          <div className="pdf-preview">

            <FaFilePdf />

            <span>
              PDF File
            </span>

            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>

          </div>

        )}


        {/* FILE NAME */}

        <p>
          {type} {index + 1}
        </p>

        <small>
          {file.name}
        </small>


        {/* REMOVE */}

        <button
          type="button"
          className="remove-file"
          onClick={() => {

            if (type === "Before") {

              removeBeforeFile(index);

            } else {

              removeAfterFile(index);

            }

          }}
        >

          <FaTimes />

          Remove

        </button>

      </div>

    );
  };


  return (

    <div className="engineer-work-page">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="work-header">

        <div>

          <h1>
            Engineer Work Details
          </h1>

          <p>
            View complaint details, upload work
            evidence and add work notes.
          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* COMPLAINT INFORMATION */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaTools />

          Complaint Information

        </div>


        <div className="details-grid">


          {/* COMPLAINT ID */}

          <div className="detail-box">

            <label>
              Complaint ID
            </label>

            <span>
              {complaint.id}
            </span>

          </div>


          {/* CATEGORY */}

          <div className="detail-box">

            <label>
              Category
            </label>

            <span>
              {complaint.category}
            </span>

          </div>


          {/* CITIZEN */}

          <div className="detail-box">

            <label>
              Citizen
            </label>

            <span>

              <FaUser />

              {complaint.citizen}

            </span>

          </div>


          {/* PHONE */}

          <div className="detail-box">

            <label>
              Phone
            </label>

            <span>

              <FaPhone />

              {complaint.phone}

            </span>

          </div>


          {/* EMAIL */}

          <div className="detail-box">

            <label>
              Email
            </label>

            <span>

              <FaEnvelope />

              {complaint.email}

            </span>

          </div>


          {/* PRIORITY */}

          <div className="detail-box">

            <label>
              Priority
            </label>

            <span className="priority high">

              {complaint.priority}

            </span>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="description-box">

          <label>
            Complaint Description
          </label>

          <p>
            {complaint.description}
          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* LOCATION */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaMapMarkerAlt />

          Complaint Location

        </div>


        <div className="location-container">


          {/* ADDRESS */}

          <div className="address-content">

            <h3>
              Selected Address
            </h3>

            <p>

              <FaMapMarkerAlt />

              {complaint.address}

            </p>


            <h3>
              Pincode
            </h3>

            <p>
              {complaint.pincode}
            </p>


            <h3>
              Latitude
            </h3>

            <p>
              {complaint.latitude}
            </p>


            <h3>
              Longitude
            </h3>

            <p>
              {complaint.longitude}
            </p>

          </div>


          {/* MAP */}

          <div className="map-box">

            <MapContainer
              center={[
                complaint.latitude,
                complaint.longitude
              ]}
              zoom={15}
              style={{
                height: "300px",
                width: "100%"
              }}
            >

              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              <Marker
                position={[
                  complaint.latitude,
                  complaint.longitude
                ]}
              >

                <Popup>

                  {complaint.address}

                  <br />

                  Pincode:
                  {" "}
                  {complaint.pincode}

                </Popup>

              </Marker>

            </MapContainer>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* BEFORE WORK FILES */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaUpload />

          Before Work Files

        </div>


        <p className="section-description">

          Upload photos, videos or PDF documents
          showing the condition before starting
          the repair work.

        </p>


        {/* UPLOAD */}

        <div className="upload-area">

          <input
            type="file"
            id="before-upload"
            multiple
            accept="image/*,video/*,.pdf,application/pdf"
            onChange={handleBeforeUpload}
          />


          <label htmlFor="before-upload">

            <FaUpload />

            <span>
              Upload Before Work Files
            </span>

            <small>
              Maximum 3 files • Images, Videos or PDF
            </small>

          </label>

        </div>


        {/* SELECTED FILES */}

        {beforeFiles.length > 0 && (

          <div className="file-upload-section">


            <div className="upload-count">

              <span>
                Selected Files
              </span>

              <strong>
                {beforeFiles.length}/3
              </strong>

            </div>


            {/* PREVIEW */}

            <div className="image-preview">

              {beforeFiles.map(
                (file, index) =>
                  renderFilePreview(
                    file,
                    index,
                    "Before"
                  )
              )}

            </div>


            {/* SUBMIT BUTTON */}

            <div className="upload-actions">

              <button
                type="button"
                className="upload-submit-btn"
                onClick={submitBeforeFiles}
              >

                <FaCheckCircle />

                {beforeSubmitted
                  ? "Submitted"
                  : "Submit Before Files"}

              </button>

            </div>


            {/* SUCCESS */}

            {beforeSubmitted && (

              <p className="upload-success">

                ✓ Before-work files submitted successfully

              </p>

            )}

          </div>

        )}

      </div>


      {/* ================================================= */}
      {/* AFTER WORK FILES */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaCheckCircle />

          After Work Files

        </div>


        <p className="section-description">

          Upload photos, videos or PDF documents
          showing the completed repair work.

        </p>


        {/* UPLOAD */}

        <div className="upload-area">

          <input
            type="file"
            id="after-upload"
            multiple
            accept="image/*,video/*,.pdf,application/pdf"
            onChange={handleAfterUpload}
          />


          <label htmlFor="after-upload">

            <FaUpload />

            <span>
              Upload Completed Work Files
            </span>

            <small>
              Maximum 3 files • Images, Videos or PDF
            </small>

          </label>

        </div>


        {/* SELECTED FILES */}

        {afterFiles.length > 0 && (

          <div className="file-upload-section">


            <div className="upload-count">

              <span>
                Selected Files
              </span>

              <strong>
                {afterFiles.length}/3
              </strong>

            </div>


            {/* PREVIEW */}

            <div className="image-preview">

              {afterFiles.map(
                (file, index) =>
                  renderFilePreview(
                    file,
                    index,
                    "After"
                  )
              )}

            </div>


            {/* SUBMIT */}

            <div className="upload-actions">

              <button
                type="button"
                className="upload-submit-btn"
                onClick={submitAfterFiles}
              >

                <FaCheckCircle />

                {afterSubmitted
                  ? "Submitted"
                  : "Submit After Files"}

              </button>

            </div>


            {/* SUCCESS */}

            {afterSubmitted && (

              <p className="upload-success">

                ✓ After-work files submitted successfully

              </p>

            )}

          </div>

        )}

      </div>


      {/* ================================================= */}
      {/* WORK NOTES */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaTools />

          Work Notes & Resolution

        </div>


        <div className="notes-container">

          <label>
            Work Performed
          </label>


          <textarea
            placeholder="Write details about completed work..."
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
          />

        </div>

      </div>


      {/* ================================================= */}
      {/* WORK SUMMARY */}
      {/* ================================================= */}

      <div className="work-card">

        <div className="card-title">

          <FaCheckCircle />

          Work Summary

        </div>


        <div className="summary-grid">


          {/* ENGINEER */}

          <div className="summary-box">

            <label>
              Engineer
            </label>

            <strong>
              {complaint.engineer}
            </strong>

          </div>


          {/* BEFORE */}

          <div className="summary-box">

            <label>
              Before Files
            </label>

            <strong>

              {submittedBeforeFiles.length}/3

            </strong>

          </div>


          {/* AFTER */}

          <div className="summary-box">

            <label>
              After Files
            </label>

            <strong>

              {submittedAfterFiles.length}/3

            </strong>

          </div>


          {/* NOTES */}

          <div className="summary-box">

            <label>
              Work Notes
            </label>

            <strong>

              {remarks.trim()
                ? "Added"
                : "Not Added"}

            </strong>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SAVE */}
      {/* ================================================= */}

      <div className="work-actions">

        <button
          type="button"
          className="save-btn"
          onClick={saveWork}
        >

          <FaCheckCircle />

          Save Work Details

        </button>

      </div>

    </div>

  );
}

export default EngineerWorkDetails;