// import { useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";
// import "./EngineerWorkDetails.css";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup
// } from "react-leaflet";

// import {
//   FaMapMarkerAlt,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaUpload,
//   FaCheckCircle,
//   FaTools,
//   FaFilePdf,
//   FaVideo,
//   FaTimes
// } from "react-icons/fa";

// function EngineerWorkDetails() {

//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const complaintData = location.state;


//   // ==========================================================
//   // COMPLAINT DATA
//   // ==========================================================

//   const complaint = {
//     id: complaintData?.complaintNumber || id,

//     citizen:
//       `${complaintData?.firstName || ""} ${complaintData?.lastName || ""}`.trim(),

//     email:
//       complaintData?.email || "-",

//     phone:
//       complaintData?.contact || "-",

//     category:
//       complaintData?.categoryName ||
//       complaintData?.category ||
//       "-",

//     priority:
//       complaintData?.priority || "-",

//     address:
//       complaintData?.address || "Address not available",

//     pincode:
//       complaintData?.pincode || "-",

//     latitude:
//       complaintData?.latitude || 23.0225,

//     longitude:
//       complaintData?.longitude || 72.5714,

//     description:
//       complaintData?.description ||
//       "Complaint description not available.",

//     engineer:
//       complaintData?.engineerName ||
//       "Assigned Engineer"
//   };


//   // ==========================================================
//   // FILE STATES
//   // ==========================================================

//   const [beforeFiles, setBeforeFiles] = useState([]);

//   const [afterFiles, setAfterFiles] = useState([]);


//   // ==========================================================
//   // WORK NOTE
//   // ==========================================================

//   const [remarks, setRemarks] = useState("");


//   // ==========================================================
//   // SUBMIT / LOADING
//   // ==========================================================

//   const [saving, setSaving] = useState(false);

//   const [beforeSubmitted, setBeforeSubmitted] =
//     useState(false);

//   const [afterSubmitted, setAfterSubmitted] =
//     useState(false);


//   // ==========================================================
//   // POPUP
//   // ==========================================================

//   const [popup, setPopup] = useState({
//     show: false,
//     type: "success",
//     message: ""
//   });


//   // ==========================================================
//   // SHOW POPUP
//   // ==========================================================

//   const showPopup = (
//     message,
//     type = "success"
//   ) => {

//     setPopup({
//       show: true,
//       type,
//       message
//     });

//   };


//   // ==========================================================
//   // CLOSE POPUP
//   // ==========================================================

//   const closePopup = () => {

//     setPopup({
//       show: false,
//       type: "success",
//       message: ""
//     });

//   };


//   // ==========================================================
//   // VALIDATE FILE
//   // ==========================================================

//   const isAllowedFile = (file) => {

//     return (
//       file.type.startsWith("image/") ||
//       file.type.startsWith("video/") ||
//       file.type === "application/pdf"
//     );

//   };


//   // ==========================================================
//   // MERGE FILES
//   // ==========================================================

//   const mergeFiles = (
//     currentFiles,
//     newFiles
//   ) => {

//     const combinedFiles = [
//       ...currentFiles,
//       ...newFiles
//     ];


//     if (combinedFiles.length > 3) {

//       showPopup(
//         "Maximum 3 files are allowed.",
//         "error"
//       );

//       return currentFiles;

//     }


//     if (
//       !combinedFiles.every(
//         isAllowedFile
//       )
//     ) {

//       showPopup(
//         "Only image, video and PDF files are allowed.",
//         "error"
//       );

//       return currentFiles;

//     }


//     return combinedFiles;

//   };


//   // ==========================================================
//   // BEFORE FILE UPLOAD
//   // ==========================================================

//   const handleBeforeUpload = (e) => {

//     const newFiles =
//       Array.from(e.target.files || []);


//     if (newFiles.length === 0) {
//       return;
//     }


//     const updatedFiles =
//       mergeFiles(
//         beforeFiles,
//         newFiles
//       );


//     setBeforeFiles(
//       updatedFiles
//     );

//     setBeforeSubmitted(false);


//     e.target.value = "";

//   };


//   // ==========================================================
//   // AFTER FILE UPLOAD
//   // ==========================================================

//   const handleAfterUpload = (e) => {

//     const newFiles =
//       Array.from(e.target.files || []);


//     if (newFiles.length === 0) {
//       return;
//     }


//     const updatedFiles =
//       mergeFiles(
//         afterFiles,
//         newFiles
//       );


//     setAfterFiles(
//       updatedFiles
//     );

//     setAfterSubmitted(false);


//     e.target.value = "";

//   };


//   // ==========================================================
//   // REMOVE BEFORE FILE
//   // ==========================================================

//   const removeBeforeFile = (
//     index
//   ) => {

//     setBeforeFiles(
//       (previousFiles) =>
//         previousFiles.filter(
//           (_, i) =>
//             i !== index
//         )
//     );

//     setBeforeSubmitted(false);

//   };


//   // ==========================================================
//   // REMOVE AFTER FILE
//   // ==========================================================

//   const removeAfterFile = (
//     index
//   ) => {

//     setAfterFiles(
//       (previousFiles) =>
//         previousFiles.filter(
//           (_, i) =>
//             i !== index
//         )
//     );

//     setAfterSubmitted(false);

//   };


//   // ==========================================================
//   // PREVIEW FILE
//   // ==========================================================

//   const previewFile = (
//     file
//   ) => {

//     return URL.createObjectURL(
//       file
//     );

//   };


//   // ==========================================================
//   // SAVE WORK
//   // ==========================================================

//   const saveWork = async () => {

//     // --------------------------------------------------------
//     // VALIDATION
//     // --------------------------------------------------------

//     if (
//       beforeFiles.length > 3
//     ) {

//       showPopup(
//         "Maximum 3 before-work files are allowed.",
//         "error"
//       );

//       return;

//     }


//     if (
//       afterFiles.length > 3
//     ) {

//       showPopup(
//         "Maximum 3 after-work files are allowed.",
//         "error"
//       );

//       return;

//     }


//     if (
//       beforeFiles.length === 0 &&
//       afterFiles.length === 0 &&
//       !remarks.trim()
//     ) {

//       showPopup(
//         "Please upload work files or add a work note before saving.",
//         "error"
//       );

//       return;

//     }


//     const token =
//       localStorage.getItem("token");


//     if (!token) {

//       showPopup(
//         "You are not logged in. Please login again.",
//         "error"
//       );

//       return;

//     }


//     try {

//       setSaving(true);


//       // ------------------------------------------------------
//       // FORM DATA
//       // ------------------------------------------------------

//       const formData =
//         new FormData();


//       // ------------------------------------------------------
//       // BEFORE FILES
//       // ------------------------------------------------------

//       beforeFiles.forEach(
//         (file) => {

//           formData.append(
//             "BeforeFiles",
//             file
//           );

//         }
//       );


//       // ------------------------------------------------------
//       // AFTER FILES
//       // ------------------------------------------------------

//       afterFiles.forEach(
//         (file) => {

//           formData.append(
//             "afterFiles",
//             file
//           );

//         }
//       );


//       // ------------------------------------------------------
//       // ENGINEER WORK NOTE
//       // ------------------------------------------------------

//       formData.append(
//         "engineerWorkNote",
//         remarks.trim()
//       );


//       // ------------------------------------------------------
//       // API
//       // ------------------------------------------------------

//       const response =
//         await axios.post(

//           `http://localhost:8085/api/engineer/${complaint.id}/work`,

//           formData,

//           {
//             headers: {
//               Authorization:
//                 `Bearer ${token}`
//             }
//           }

//         );


//       console.log(
//         "Work Details Response:",
//         response.data
//       );


//       // ------------------------------------------------------
//       // SUCCESS
//       // ------------------------------------------------------

//       setBeforeSubmitted(
//         beforeFiles.length > 0
//       );

//       setAfterSubmitted(
//         afterFiles.length > 0
//       );


//       showPopup(
//         response.data?.message ||
//         "Complaint work details saved successfully.",
//         "success"
//       );


//     } catch (err) {

//       console.error(
//         "Save Work Error:",
//         err
//       );


//       // ------------------------------------------------------
//       // BACKEND ERROR MESSAGE
//       // ------------------------------------------------------

//       const backendMessage =
//         err.response?.data?.message;


//       if (backendMessage) {

//         showPopup(
//           backendMessage,
//           "error"
//         );

//       } else if (
//         typeof err.response?.data ===
//         "string"
//       ) {

//         showPopup(
//           err.response.data,
//           "error"
//         );

//       } else if (
//         err.response?.status === 401
//       ) {

//         showPopup(
//           "Your session has expired. Please login again.",
//           "error"
//         );

//       } else if (
//         err.response?.status === 403
//       ) {

//         showPopup(
//           "You are not authorized to update this complaint.",
//           "error"
//         );

//       } else {

//         showPopup(
//           "Unable to save work details. Please try again.",
//           "error"
//         );

//       }

//     } finally {

//       setSaving(false);

//     }

//   };


//   // ==========================================================
//   // FILE PREVIEW
//   // ==========================================================

//   const renderFilePreview = (
//     file,
//     index,
//     type
//   ) => {

//     const fileUrl =
//       previewFile(file);


//     return (

//       <div
//         className="image-card"
//         key={`${file.name}-${index}`}
//       >

//         {/* IMAGE */}

//         {file.type.startsWith("image/") && (

//           <img
//             src={fileUrl}
//             alt={`${type} ${index + 1}`}
//           />

//         )}


//         {/* VIDEO */}

//         {file.type.startsWith("video/") && (

//           <div className="video-preview">

//             <video
//               controls
//               src={fileUrl}
//             />

//             <div className="file-type-label">

//               <FaVideo />

//               <span>
//                 Video
//               </span>

//             </div>

//           </div>

//         )}


//         {/* PDF */}

//         {file.type === "application/pdf" && (

//           <div className="pdf-preview">

//             <FaFilePdf />

//             <span>
//               PDF File
//             </span>

//             <a
//               href={fileUrl}
//               target="_blank"
//               rel="noreferrer"
//             >
//               Open PDF
//             </a>

//           </div>

//         )}


//         {/* FILE NAME */}

//         <p>
//           {type} {index + 1}
//         </p>

//         <small>
//           {file.name}
//         </small>


//         {/* REMOVE */}

//         <button
//           type="button"
//           className="remove-file"
//           onClick={() => {

//             if (
//               type === "Before"
//             ) {

//               removeBeforeFile(
//                 index
//               );

//             } else {

//               removeAfterFile(
//                 index
//               );

//             }

//           }}
//         >

//           <FaTimes />

//           Remove

//         </button>

//       </div>

//     );

//   };


//   // ==========================================================
//   // JSX
//   // ==========================================================

//   return (

//     <div className="engineer-work-page">


//       {/* ================================================= */}
//       {/* HEADER */}
//       {/* ================================================= */}

//       <div className="work-header">

//         <div>

//           <h1>
//             Engineer Work Details
//           </h1>

//           <p>
//             View complaint details, upload work
//             evidence and add work notes.
//           </p>

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* COMPLAINT INFORMATION */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaTools />

//           Complaint Information

//         </div>


//         <div className="details-grid">


//           {/* COMPLAINT ID */}

//           <div className="detail-box">

//             <label>
//               Complaint ID
//             </label>

//             <span>
//               {complaint.id}
//             </span>

//           </div>


//           {/* CATEGORY */}

//           <div className="detail-box">

//             <label>
//               Category
//             </label>

//             <span>
//               {complaint.category}
//             </span>

//           </div>


//           {/* CITIZEN */}

//           <div className="detail-box">

//             <label>
//               Citizen
//             </label>

//             <span>

//               <FaUser />

//               {complaint.citizen}

//             </span>

//           </div>


//           {/* PHONE */}

//           <div className="detail-box">

//             <label>
//               Phone
//             </label>

//             <span>

//               <FaPhone />

//               {complaint.phone}

//             </span>

//           </div>


//           {/* EMAIL */}

//           <div className="detail-box">

//             <label>
//               Email
//             </label>

//             <span>

//               <FaEnvelope />

//               {complaint.email}

//             </span>

//           </div>


//           {/* PRIORITY */}

//           <div className="detail-box">

//             <label>
//               Priority
//             </label>

//             <span
//               className={`priority ${complaint.priority?.toLowerCase()}`}
//             >

//               {complaint.priority}

//             </span>

//           </div>

//         </div>


//         {/* DESCRIPTION */}

//         <div className="description-box">

//           <label>
//             Complaint Description
//           </label>

//           <p>
//             {complaint.description}
//           </p>

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* LOCATION */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaMapMarkerAlt />

//           Complaint Location

//         </div>


//         <div className="location-container">


//           <div className="address-content">

//             <h3>
//               Selected Address
//             </h3>

//             <p>

//               <FaMapMarkerAlt />

//               {complaint.address}

//             </p>


//             <h3>
//               Pincode
//             </h3>

//             <p>
//               {complaint.pincode}
//             </p>


//             <h3>
//               Latitude
//             </h3>

//             <p>
//               {complaint.latitude}
//             </p>


//             <h3>
//               Longitude
//             </h3>

//             <p>
//               {complaint.longitude}
//             </p>

//           </div>


//           <div className="map-box">

//             <MapContainer
//               center={[
//                 complaint.latitude,
//                 complaint.longitude
//               ]}
//               zoom={15}
//               style={{
//                 height: "300px",
//                 width: "100%"
//               }}
//             >

//               <TileLayer
//                 url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />


//               <Marker
//                 position={[
//                   complaint.latitude,
//                   complaint.longitude
//                 ]}
//               >

//                 <Popup>

//                   {complaint.address}

//                   <br />

//                   Pincode:
//                   {" "}
//                   {complaint.pincode}

//                 </Popup>

//               </Marker>

//             </MapContainer>

//           </div>

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* BEFORE WORK FILES */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaUpload />

//           Before Work Files

//         </div>


//         <p className="section-description">

//           Upload photos, videos or PDF documents
//           showing the condition before starting
//           the repair work.

//         </p>


//         <div className="upload-area">

//           <input
//             type="file"
//             id="before-upload"
//             multiple
//             accept="image/*,video/*,.pdf,application/pdf"
//             onChange={handleBeforeUpload}
//           />


//           <label htmlFor="before-upload">

//             <FaUpload />

//             <span>
//               Upload Before Work Files
//             </span>

//             <small>
//               Maximum 3 files • Images, Videos or PDF
//             </small>

//           </label>

//         </div>


//         {beforeFiles.length > 0 && (

//           <div className="file-upload-section">

//             <div className="upload-count">

//               <span>
//                 Selected Files
//               </span>

//               <strong>
//                 {beforeFiles.length}/3
//               </strong>

//             </div>


//             <div className="image-preview">

//               {beforeFiles.map(
//                 (file, index) =>
//                   renderFilePreview(
//                     file,
//                     index,
//                     "Before"
//                   )
//               )}

//             </div>


//             {beforeSubmitted && (

//               <p className="upload-success">

//                 ✓ Before-work files submitted successfully

//               </p>

//             )}

//           </div>

//         )}

//       </div>


//       {/* ================================================= */}
//       {/* AFTER WORK FILES */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaCheckCircle />

//           After Work Files

//         </div>


//         <p className="section-description">

//           Upload photos, videos or PDF documents
//           showing the completed repair work.

//         </p>


//         <div className="upload-area">

//           <input
//             type="file"
//             id="after-upload"
//             multiple
//             accept="image/*,video/*,.pdf,application/pdf"
//             onChange={handleAfterUpload}
//           />


//           <label htmlFor="after-upload">

//             <FaUpload />

//             <span>
//               Upload Completed Work Files
//             </span>

//             <small>
//               Maximum 3 files • Images, Videos or PDF
//             </small>

//           </label>

//         </div>


//         {afterFiles.length > 0 && (

//           <div className="file-upload-section">

//             <div className="upload-count">

//               <span>
//                 Selected Files
//               </span>

//               <strong>
//                 {afterFiles.length}/3
//               </strong>

//             </div>


//             <div className="image-preview">

//               {afterFiles.map(
//                 (file, index) =>
//                   renderFilePreview(
//                     file,
//                     index,
//                     "After"
//                   )
//               )}

//             </div>


//             {afterSubmitted && (

//               <p className="upload-success">

//                 ✓ After-work files submitted successfully

//               </p>

//             )}

//           </div>

//         )}

//       </div>


//       {/* ================================================= */}
//       {/* WORK NOTES */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaTools />

//           Work Notes & Resolution

//         </div>


//         <div className="notes-container">

//           <label>
//             Work Performed
//           </label>


//           <textarea
//             placeholder="Write details about completed work..."
//             value={remarks}
//             onChange={(e) =>
//               setRemarks(
//                 e.target.value
//               )
//             }
//           />

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* WORK SUMMARY */}
//       {/* ================================================= */}

//       <div className="work-card">

//         <div className="card-title">

//           <FaCheckCircle />

//           Work Summary

//         </div>


//         <div className="summary-grid">


//           <div className="summary-box">

//             <label>
//               Engineer
//             </label>

//             <strong>
//               {complaint.engineer}
//             </strong>

//           </div>


//           <div className="summary-box">

//             <label>
//               Before Files
//             </label>

//             <strong>
//               {beforeFiles.length}/3
//             </strong>

//           </div>


//           <div className="summary-box">

//             <label>
//               After Files
//             </label>

//             <strong>
//               {afterFiles.length}/3
//             </strong>

//           </div>


//           <div className="summary-box">

//             <label>
//               Work Notes
//             </label>

//             <strong>

//               {remarks.trim()
//                 ? "Added"
//                 : "Not Added"}

//             </strong>

//           </div>

//         </div>

//       </div>


//       {/* ================================================= */}
//       {/* SAVE */}
//       {/* ================================================= */}

//       <div className="work-actions">

//         <button
//           type="button"
//           className="save-btn"
//           onClick={saveWork}
//           disabled={saving}
//         >

//           <FaCheckCircle />

//           {saving
//             ? "Saving..."
//             : "Save Work Details"}

//         </button>

//       </div>


//       {/* ================================================= */}
//       {/* POPUP */}
//       {/* ================================================= */}

//       {popup.show && (

//         <div
//           className="work-popup-overlay"
//           onClick={closePopup}
//         >

//           <div
//             className={`work-popup ${
//               popup.type === "error"
//                 ? "work-popup-error"
//                 : "work-popup-success"
//             }`}
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >

//             <div className="work-popup-icon">

//               {popup.type === "error"
//                 ? "!"
//                 : "✓"}

//             </div>


//             <h3>

//               {popup.type === "error"
//                 ? "Error"
//                 : "Success"}

//             </h3>


//             <p>
//               {popup.message}
//             </p>


//             <button
//               type="button"
//               onClick={closePopup}
//             >
//               OK
//             </button>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// }

// export default EngineerWorkDetails;


import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./EngineerWorkDetails.css";
import CustomPopup from "../../configure/CustomPopup";

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

  const navigate = useNavigate();

  const complaintData = location.state;


  // ==========================================================
  // COMPLAINT DATA
  // ==========================================================

  const complaint = {

    id:
      complaintData?.complaintNumber ||
      id,

    citizen:
      `${complaintData?.firstName || ""} ${complaintData?.lastName || ""}`.trim(),

    email:
      complaintData?.email ||
      "-",

    phone:
      complaintData?.contact ||
      "-",

    category:
      complaintData?.categoryName ||
      complaintData?.category ||
      "-",

    priority:
      complaintData?.priority ||
      "-",

    address:
      complaintData?.address ||
      "Address not available",

    pincode:
      complaintData?.pincode ||
      "-",

    latitude:
      complaintData?.latitude ||
      23.0225,

    longitude:
      complaintData?.longitude ||
      72.5714,

    description:
      complaintData?.description ||
      "Complaint description not available.",

    engineer:
      complaintData?.engineerName ||
      "Assigned Engineer"

  };


  // ==========================================================
  // FILE STATES
  // ==========================================================

  const [beforeFiles, setBeforeFiles] =
    useState([]);

  const [afterFiles, setAfterFiles] =
    useState([]);


  // ==========================================================
  // WORK NOTE
  // ==========================================================

  const [remarks, setRemarks] =
    useState("");


  // ==========================================================
  // SUBMIT / LOADING
  // ==========================================================

  const [saving, setSaving] =
    useState(false);

  const [beforeSubmitted, setBeforeSubmitted] =
    useState(false);

  const [afterSubmitted, setAfterSubmitted] =
    useState(false);


  // ==========================================================
  // POPUP
  // ==========================================================

  const [popup, setPopup] = useState({

    show: false,

    type: "success",

    message: ""

  });


  // ==========================================================
  // REDIRECT AFTER SUCCESS
  // ==========================================================

  const [redirectAfterSuccess, setRedirectAfterSuccess] =
    useState(false);


  // ==========================================================
  // SHOW POPUP
  // ==========================================================

  const showPopup = (
    message,
    type = "success"
  ) => {

    setPopup({

      show: true,

      type,

      message

    });

  };


  // ==========================================================
  // CLOSE POPUP
  // ==========================================================

  const closePopup = () => {

    const shouldRedirect =
      redirectAfterSuccess &&
      popup.type === "success";


    setPopup({

      show: false,

      type: "success",

      message: ""

    });


    setRedirectAfterSuccess(false);


    // ========================================================
    // REDIRECT TO ASSIGNED COMPLAINTS
    // ========================================================

    if (shouldRedirect) {

      navigate(
        "/engineer/complents"
      );

    }

  };


  // ==========================================================
  // VALIDATE FILE
  // ==========================================================

  const isAllowedFile = (file) => {

    return (

      file.type.startsWith("image/") ||

      file.type.startsWith("video/") ||

      file.type === "application/pdf"

    );

  };


  // ==========================================================
  // MERGE FILES
  // ==========================================================

  const mergeFiles = (
    currentFiles,
    newFiles
  ) => {

    const combinedFiles = [

      ...currentFiles,

      ...newFiles

    ];


    // ========================================================
    // MAXIMUM 3 FILES
    // ========================================================

    if (
      combinedFiles.length > 3
    ) {

      showPopup(

        "Maximum 3 files are allowed.",

        "error"

      );

      return currentFiles;

    }


    // ========================================================
    // FILE TYPE VALIDATION
    // ========================================================

    if (
      !combinedFiles.every(
        isAllowedFile
      )
    ) {

      showPopup(

        "Only image, video and PDF files are allowed.",

        "error"

      );

      return currentFiles;

    }


    return combinedFiles;

  };


  // ==========================================================
  // BEFORE FILE UPLOAD
  // ==========================================================

  const handleBeforeUpload = (e) => {

    const newFiles =
      Array.from(
        e.target.files || []
      );


    if (
      newFiles.length === 0
    ) {

      return;

    }


    const updatedFiles =
      mergeFiles(

        beforeFiles,

        newFiles

      );


    setBeforeFiles(
      updatedFiles
    );


    setBeforeSubmitted(
      false
    );


    // Allow same file selection again

    e.target.value = "";

  };


  // ==========================================================
  // AFTER FILE UPLOAD
  // ==========================================================

  const handleAfterUpload = (e) => {

    const newFiles =
      Array.from(
        e.target.files || []
      );


    if (
      newFiles.length === 0
    ) {

      return;

    }


    const updatedFiles =
      mergeFiles(

        afterFiles,

        newFiles

      );


    setAfterFiles(
      updatedFiles
    );


    setAfterSubmitted(
      false
    );


    // Allow same file selection again

    e.target.value = "";

  };


  // ==========================================================
  // REMOVE BEFORE FILE
  // ==========================================================

  const removeBeforeFile = (
    index
  ) => {

    setBeforeFiles(

      (previousFiles) =>

        previousFiles.filter(

          (_, i) =>
            i !== index

        )

    );


    setBeforeSubmitted(
      false
    );

  };


  // ==========================================================
  // REMOVE AFTER FILE
  // ==========================================================

  const removeAfterFile = (
    index
  ) => {

    setAfterFiles(

      (previousFiles) =>

        previousFiles.filter(

          (_, i) =>
            i !== index

        )

    );


    setAfterSubmitted(
      false
    );

  };


  // ==========================================================
  // PREVIEW FILE
  // ==========================================================

  const previewFile = (
    file
  ) => {

    return URL.createObjectURL(
      file
    );

  };


  // ==========================================================
  // SAVE WORK
  // ==========================================================

  const saveWork = async () => {


    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      beforeFiles.length > 3
    ) {

      showPopup(

        "Maximum 3 before-work files are allowed.",

        "error"

      );

      return;

    }


    if (
      afterFiles.length > 3
    ) {

      showPopup(

        "Maximum 3 after-work files are allowed.",

        "error"

      );

      return;

    }


    // ========================================================
    // NOTHING TO SAVE
    // ========================================================

    if (

      beforeFiles.length === 0 &&

      afterFiles.length === 0 &&

      !remarks.trim()

    ) {

      showPopup(

        "Please upload work files or add a work note before saving.",

        "error"

      );

      return;

    }


    // ========================================================
    // GET TOKEN
    // ========================================================

    const token =
      localStorage.getItem(
        "token"
      );


    if (!token) {

      showPopup(

        "You are not logged in. Please login again.",

        "error"

      );

      return;

    }


    try {

      setSaving(
        true
      );


      // ======================================================
      // FORM DATA
      // ======================================================

      const formData =
        new FormData();


      // ======================================================
      // BEFORE FILES
      // ======================================================

      beforeFiles.forEach(
        (file) => {

          formData.append(
            "BeforeFiles",
            file
          );

        }
      );


      // ======================================================
      // AFTER FILES
      // ======================================================

      afterFiles.forEach(
        (file) => {

          formData.append(
            "afterFiles",
            file
          );

        }
      );


      // ======================================================
      // ENGINEER WORK NOTE
      // ======================================================

      formData.append(

        "engineerWorkNote",

        remarks.trim()

      );


      // ======================================================
      // API REQUEST
      // ======================================================

      const response =
        await axios.post(

          `http://localhost:8085/api/engineer/${complaint.id}/work`,

          formData,

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );


      // ======================================================
      // DEBUG RESPONSE
      // ======================================================

      console.log(
        "Work Details Response:",
        response.data
      );


      // ======================================================
      // SUCCESS STATE
      // ======================================================

      setBeforeSubmitted(
        beforeFiles.length > 0
      );


      setAfterSubmitted(
        afterFiles.length > 0
      );


      // ======================================================
      // ENABLE REDIRECT AFTER POPUP
      // ======================================================

      setRedirectAfterSuccess(
        true
      );


      // ======================================================
      // SUCCESS POPUP
      // ======================================================

      showPopup(

        response.data?.message ||

        "Complaint work details saved successfully.",

        "success"

      );


    } catch (err) {

      console.error(
        "Save Work Error:",
        err
      );


      // ======================================================
      // BACKEND ERROR MESSAGE
      // ======================================================

      const backendMessage =
        err.response?.data?.message;


      if (backendMessage) {

        showPopup(

          backendMessage,

          "error"

        );

      }

      else if (

        typeof err.response?.data ===
        "string"

      ) {

        showPopup(

          err.response.data,

          "error"

        );

      }

      else if (

        err.response?.status === 401

      ) {

        showPopup(

          "Your session has expired. Please login again.",

          "error"

        );

      }

      else if (

        err.response?.status === 403

      ) {

        showPopup(

          "You are not authorized to update this complaint.",

          "error"

        );

      }

      else {

        showPopup(

          "Unable to save work details. Please try again.",

          "error"

        );

      }


    } finally {

      setSaving(
        false
      );

    }

  };


  // ==========================================================
  // FILE PREVIEW
  // ==========================================================

  const renderFilePreview = (
    file,
    index,
    type
  ) => {

    const fileUrl =
      previewFile(
        file
      );


    return (

      <div

        className="image-card"

        key={
          `${file.name}-${index}`
        }

      >


        {/* ==================================================
            IMAGE
        ================================================== */}

        {file.type.startsWith(
          "image/"
        ) && (

          <img

            src={fileUrl}

            alt={
              `${type} ${index + 1}`
            }

          />

        )}


        {/* ==================================================
            VIDEO
        ================================================== */}

        {file.type.startsWith(
          "video/"
        ) && (

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


        {/* ==================================================
            PDF
        ================================================== */}

        {file.type ===
          "application/pdf" && (

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


        {/* ==================================================
            FILE NAME
        ================================================== */}

        <p>

          {type}{" "}
          {index + 1}

        </p>


        <small>

          {file.name}

        </small>


        {/* ==================================================
            REMOVE
        ================================================== */}

        <button

          type="button"

          className="remove-file"

          onClick={() => {

            if (
              type === "Before"
            ) {

              removeBeforeFile(
                index
              );

            }

            else {

              removeAfterFile(
                index
              );

            }

          }}

        >

          <FaTimes />

          Remove

        </button>

      </div>

    );

  };


  // ==========================================================
  // JSX
  // ==========================================================

  return (

    <div className="engineer-work-page">
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

      {/* ====================================================
          HEADER
      ==================================================== */}

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


      {/* ====================================================
          COMPLAINT INFORMATION
      ==================================================== */}

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


            <span

              className={`priority ${
                complaint.priority?.toLowerCase()
              }`}

            >

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


      {/* ====================================================
          LOCATION
      ==================================================== */}

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


      {/* ====================================================
          BEFORE WORK FILES
      ==================================================== */}

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


        {/* UPLOAD AREA */}

        <div className="upload-area">

          <input

            type="file"

            id="before-upload"

            multiple

            accept="image/*,video/*,.pdf,application/pdf"

            onChange={
              handleBeforeUpload
            }

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


            {/* FILE PREVIEW */}

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


            {/* SUCCESS */}

            {beforeSubmitted && (

              <p className="upload-success">

                ✓ Before-work files submitted successfully

              </p>

            )}

          </div>

        )}

      </div>


      {/* ====================================================
          AFTER WORK FILES
      ==================================================== */}

      <div className="work-card">

        <div className="card-title">

          <FaCheckCircle />

          After Work Files

        </div>


        <p className="section-description">

          Upload photos, videos or PDF documents
          showing the completed repair work.

        </p>


        {/* UPLOAD AREA */}

        <div className="upload-area">

          <input

            type="file"

            id="after-upload"

            multiple

            accept="image/*,video/*,.pdf,application/pdf"

            onChange={
              handleAfterUpload
            }

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


            {/* FILE PREVIEW */}

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


            {/* SUCCESS */}

            {afterSubmitted && (

              <p className="upload-success">

                ✓ After-work files submitted successfully

              </p>

            )}

          </div>

        )}

      </div>


      {/* ====================================================
          WORK NOTES
      ==================================================== */}

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
              setRemarks(
                e.target.value
              )
            }

          />

        </div>

      </div>


      {/* ====================================================
          WORK SUMMARY
      ==================================================== */}

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

              {beforeFiles.length}/3

            </strong>

          </div>


          {/* AFTER */}

          <div className="summary-box">

            <label>
              After Files
            </label>


            <strong>

              {afterFiles.length}/3

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


      {/* ====================================================
          SAVE BUTTON
      ==================================================== */}

      <div className="work-actions">

        <button

          type="button"

          className="save-btn"

          onClick={saveWork}

          disabled={saving}

        >

          <FaCheckCircle />


          {saving

            ? "Saving..."

            : "Save Work Details"

          }

        </button>

      </div>


      {/* ====================================================
          POPUP
      ==================================================== */}

       {/* {popup.show && (

        <div

          className="work-popup-overlay"

          onClick={closePopup}

        >

          <div

            className={`work-popup ${
              popup.type === "error"

                ? "work-popup-error"

                : "work-popup-success"
            }`}

            onClick={(e) =>
              e.stopPropagation()
            }

          >


            {/* POPUP ICON */}



    </div>

  );

}


export default EngineerWorkDetails;