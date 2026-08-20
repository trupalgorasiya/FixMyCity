// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//     FaUser,
//     FaEnvelope,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaCodeBranch,
//     FaGraduationCap,
//     FaBriefcase,
//     FaBuilding,
//     FaFilePdf,
//     FaUserEdit,
//     FaLock,
//     FaSave,
//     FaTimes
// } from "react-icons/fa";

// import "./Engineer_profile.css";


// function Engineer_profile() {

//     const navigate = useNavigate();

//     /* =====================================================
//        EDIT MODE
//     ===================================================== */

//     const [isEditing, setIsEditing] = useState(false);


//     /* =====================================================
//        ENGINEER PROFILE DATA
//     ===================================================== */

//     const [engineer, setEngineer] = useState({

//         firstName: "John",

//         lastName: "Doe",

//         email: "john.doe@fixmycity.com",

//         contact: "9876543210",

//         address:
//             "Ahmedabad, Gujarat, India",

//         engineerBranch:
//             "Civil Engineering",

//         highestQualification:
//             "Bachelor of Engineering",

//         experience: "3",

//         department:
//             "Road & Infrastructure",

//         degreeCertificate:
//             "degree-certificate.pdf",

//         experienceCertificate:
//             "experience-certificate.pdf"

//     });


//     /* =====================================================
//        TEMPORARY EDIT DATA
//     ===================================================== */

//     const [editEngineer, setEditEngineer] = useState({

//         firstName: engineer.firstName,

//         lastName: engineer.lastName,

//         email: engineer.email,

//         contact: engineer.contact

//     });


//     /* =====================================================
//        EDIT PROFILE
//     ===================================================== */

//     const handleEdit = () => {

//         setEditEngineer({

//             firstName: engineer.firstName,

//             lastName: engineer.lastName,

//             email: engineer.email,

//             contact: engineer.contact

//         });

//         setIsEditing(true);

//     };


//     /* =====================================================
//        HANDLE EDIT INPUT
//     ===================================================== */

//     const handleEditChange = (e) => {

//         const { name, value } = e.target;

//         setEditEngineer((previous) => ({

//             ...previous,

//             [name]: value

//         }));

//     };


//     /* =====================================================
//        SAVE CHANGES
//     ===================================================== */

//     const handleSave = () => {

//         setEngineer((previous) => ({

//             ...previous,

//             firstName: editEngineer.firstName,

//             lastName: editEngineer.lastName,

//             contact: editEngineer.contact

//             // Email intentionally NOT updated

//         }));

//         setIsEditing(false);

//     };


//     /* =====================================================
//        CANCEL
//     ===================================================== */

//     const handleCancel = () => {

//         setEditEngineer({

//             firstName: engineer.firstName,

//             lastName: engineer.lastName,

//             email: engineer.email,

//             contact: engineer.contact

//         });

//         setIsEditing(false);

//     };


//     /* =====================================================
//        CHANGE PASSWORD
//     ===================================================== */

//     const handleChangePassword = () => {

//         navigate("/change-password");

//     };


//     return (

//         <div className="engineer-profile-page">

//             <div className="engineer-profile-card">


//                 {/* =================================================
//                    EDIT MODE
//                 ================================================= */}

//                 {isEditing ? (

//                     <>

//                         {/* =================================================
//                            EDIT HEADER
//                         ================================================= */}

//                         <div className="engineer-profile-edit-header">

//                             <div className="engineer-profile-edit-icon">

//                                 <FaUserEdit />

//                             </div>

//                             <h2>
//                                 Edit Profile
//                             </h2>

//                             <p>
//                                 Update your personal information
//                             </p>

//                         </div>


//                         {/* =================================================
//                            EDIT FORM
//                         ================================================= */}

//                         <div className="engineer-profile-edit-form">


//                             {/* =============================================
//                                FIRST NAME
//                             ============================================== */}

//                             <div className="engineer-profile-edit-field">

//                                 <label>

//                                     <FaUser />

//                                     First Name

//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={editEngineer.firstName}
//                                     onChange={handleEditChange}
//                                     placeholder="Enter first name"
//                                 />

//                             </div>


//                             {/* =============================================
//                                LAST NAME
//                             ============================================== */}

//                             <div className="engineer-profile-edit-field">

//                                 <label>

//                                     <FaUser />

//                                     Last Name

//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={editEngineer.lastName}
//                                     onChange={handleEditChange}
//                                     placeholder="Enter last name"
//                                 />

//                             </div>


//                             {/* =============================================
//                                EMAIL - NOT EDITABLE
//                             ============================================== */}

//                             <div className="engineer-profile-edit-field">

//                                 <label>

//                                     <FaEnvelope />

//                                     Email

//                                 </label>

//                                 <div className="engineer-profile-email-edit-wrapper">

//                                     <input
//                                         type="email"
//                                         value={editEngineer.email}
//                                         disabled
//                                         className="engineer-profile-email-readonly"
//                                     />

//                                     <span className="engineer-profile-email-lock">

//                                         <FaLock />

//                                         Email cannot be changed

//                                     </span>

//                                 </div>

//                             </div>


//                             {/* =============================================
//                                CONTACT
//                             ============================================== */}

//                             <div className="engineer-profile-edit-field">

//                                 <label>

//                                     <FaPhoneAlt />

//                                     Contact Number

//                                 </label>

//                                 <input
//                                     type="tel"
//                                     name="contact"
//                                     value={editEngineer.contact}
//                                     onChange={handleEditChange}
//                                     placeholder="Enter contact number"
//                                 />

//                             </div>


//                         </div>


//                         {/* =================================================
//                            EDIT ACTION BUTTONS
//                         ================================================= */}

//                         <div className="engineer-profile-actions">


//                             {/* CANCEL */}

//                             <button
//                                 type="button"
//                                 className="engineer-profile-cancel-btn"
//                                 onClick={handleCancel}
//                             >

//                                 <FaTimes />

//                                 <span>
//                                     Cancel
//                                 </span>

//                             </button>


//                             {/* SAVE */}

//                             <button
//                                 type="button"
//                                 className="engineer-profile-save-btn"
//                                 onClick={handleSave}
//                             >

//                                 <FaSave />

//                                 <span>
//                                     Save Changes
//                                 </span>

//                             </button>


//                         </div>

//                     </>

//                 ) : (

//                     /* =====================================================
//                        NORMAL PROFILE MODE
//                     ===================================================== */

//                     <>


//                         {/* =================================================
//                            PROFILE HEADER
//                         ================================================= */}

//                         <div className="engineer-profile-header">

//                             <div className="engineer-profile-icon">

//                                 <FaUser />

//                             </div>


//                             <div className="engineer-profile-header-content">

//                                 <h2>

//                                     {engineer.firstName}{" "}

//                                     {engineer.lastName}

//                                 </h2>

//                                 <span className="engineer-profile-role">

//                                     Engineer

//                                 </span>

//                             </div>

//                         </div>



//                         {/* =================================================
//                            PROFILE DETAILS
//                         ================================================= */}

//                         <div className="engineer-profile-content">


//                             {/* =================================================
//                                PERSONAL INFORMATION
//                             ================================================= */}

//                             <div className="engineer-profile-section-title">

//                                 <h3>
//                                     Personal Information
//                                 </h3>

//                             </div>


//                             {/* FIRST NAME */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaUser />

//                                     <span>
//                                         First Name
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.firstName}

//                                 </div>

//                             </div>


//                             {/* LAST NAME */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaUser />

//                                     <span>
//                                         Last Name
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.lastName}

//                                 </div>

//                             </div>


//                             {/* EMAIL */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaEnvelope />

//                                     <span>
//                                         Email
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.email}

//                                 </div>

//                             </div>


//                             {/* CONTACT */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaPhoneAlt />

//                                     <span>
//                                         Contact Number
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.contact}

//                                 </div>

//                             </div>



//                             {/* =================================================
//                                PROFESSIONAL INFORMATION
//                             ================================================= */}

//                             <div className="engineer-profile-section-title engineer-profile-professional-title">

//                                 <h3>
//                                     Professional Information
//                                 </h3>

//                             </div>


//                             {/* ADDRESS */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaMapMarkerAlt />

//                                     <span>
//                                         Address
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.address}

//                                 </div>

//                             </div>


//                             {/* ENGINEER BRANCH */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaCodeBranch />

//                                     <span>
//                                         Engineer Branch
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.engineerBranch}

//                                 </div>

//                             </div>


//                             {/* HIGHEST QUALIFICATION */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaGraduationCap />

//                                     <span>
//                                         Highest Qualification
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.highestQualification}

//                                 </div>

//                             </div>


//                             {/* EXPERIENCE */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaBriefcase />

//                                     <span>
//                                         Experience
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.experience} Years

//                                 </div>

//                             </div>


//                             {/* DEPARTMENT */}

//                             <div className="engineer-profile-field">

//                                 <div className="engineer-profile-label">

//                                     <FaBuilding />

//                                     <span>
//                                         Department
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-value">

//                                     {engineer.department}

//                                 </div>

//                             </div>



//                             {/* =================================================
//                                CERTIFICATES
//                             ================================================= */}

//                             <div className="engineer-profile-section-title engineer-profile-certificate-title">

//                                 <h3>
//                                     Certificates
//                                 </h3>

//                             </div>


//                             {/* DEGREE CERTIFICATE */}

//                             <div className="engineer-profile-field engineer-profile-certificate-field">

//                                 <div className="engineer-profile-label">

//                                     <FaFilePdf />

//                                     <span>
//                                         Degree Certificate
//                                     </span>

//                                 </div>

//                                 <div className="engineer-profile-certificate-box">

//                                     <span className="engineer-profile-file-name">

//                                         {engineer.degreeCertificate}

//                                     </span>

//                                 </div>

//                             </div>


//                             {/* EXPERIENCE CERTIFICATE */}

//                             {Number(engineer.experience) > 0 && (

//                                 <div className="engineer-profile-field engineer-profile-certificate-field">

//                                     <div className="engineer-profile-label">

//                                         <FaFilePdf />

//                                         <span>
//                                             Experience Certificate
//                                         </span>

//                                     </div>

//                                     <div className="engineer-profile-certificate-box">

//                                         <span className="engineer-profile-file-name">

//                                             {engineer.experienceCertificate}

//                                         </span>

//                                     </div>

//                                 </div>

//                             )}

//                         </div>



//                         {/* =================================================
//                            NORMAL ACTION BUTTONS
//                         ================================================= */}

//                         <div className="engineer-profile-actions">


//                             {/* EDIT */}

//                             <button
//                                 type="button"
//                                 className="engineer-profile-edit-btn"
//                                 onClick={handleEdit}
//                             >

//                                 <FaUserEdit />

//                                 <span>
//                                     Edit Profile
//                                 </span>

//                             </button>


//                             {/* CHANGE PASSWORD */}

//                             <button
//                                 type="button"
//                                 className="engineer-profile-password-btn"
//                                 onClick={handleChangePassword}
//                             >

//                                 <FaLock />

//                                 <span>
//                                     Change Password
//                                 </span>

//                             </button>


//                         </div>

//                     </>

//                 )}

//             </div>

//         </div>

//     );

// }

// export default Engineer_profile;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const [engineer, setEngineer] = useState({

        firstName: "John",

        lastName: "Doe",

        email: "john.doe@gmail.com",

        contact: "9876543210",

        address:
            "Ahmedabad, Gujarat, India",

        branch:
            "Civil Engineering",

        qualification:
            "Bachelor of Engineering",

        experience:
            "3 Years",

        department:
            "Road & Infrastructure Department",

        degreeCertificate:
            "degree-certificate.jpg",

        experienceCertificate:
            "experience-certificate.jpg",

        profileImage: defaultProfile

    });


    /* =========================================================
       EDIT MODE
    ========================================================= */

    const [isEditing, setIsEditing] = useState(false);


    /* =========================================================
       TEMPORARY EDIT DATA
    ========================================================= */

    const [editEngineer, setEditEngineer] = useState(engineer);


    /* =========================================================
       OPEN EDIT PROFILE
    ========================================================= */

    const handleEdit = () => {

        setEditEngineer({
            ...engineer
        });

        setIsEditing(true);
    };


    /* =========================================================
       HANDLE INPUT CHANGE
    ========================================================= */

    const handleEditChange = (e) => {

        const {
            name,
            value
        } = e.target;

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

        if (!file) {
            return;
        }

        /*
         * Create temporary image preview
         */

        const imageURL = URL.createObjectURL(file);

        setEditEngineer((previous) => ({

            ...previous,

            profileImage: imageURL

        }));
    };


    /* =========================================================
       SAVE CHANGES
    ========================================================= */

    const handleSave = () => {

        setEngineer({

            ...editEngineer

        });

        setIsEditing(false);
    };


    /* =========================================================
       CANCEL EDIT
    ========================================================= */

    const handleCancel = () => {

        /*
         * Restore original information
         */

        setEditEngineer({

            ...engineer

        });

        setIsEditing(false);
    };


    /* =========================================================
       EDIT PROFILE PAGE
    ========================================================= */

    if (isEditing) {

        return (

            <div className="engineer-edit-page">

                <div className="engineer-edit-card">


                    {/* =================================================
                        EDIT PROFILE HEADER
                    ================================================= */}

                    <div className="engineer-edit-header">

                        <h2>
                            Edit Profile
                        </h2>


                        {/* =================================================
                            PROFILE PHOTO
                        ================================================= */}

                        <div className="engineer-edit-photo-section">

                            <img
                                src={
                                    editEngineer.profileImage ||
                                    defaultProfile
                                }
                                alt="Engineer Profile"
                                className="engineer-edit-photo"
                            />


                            {/* =================================================
                                CHANGE PHOTO BUTTON
                            ================================================= */}

                            <label className="engineer-edit-change-photo">

                                <FaCamera />

                                <span>
                                    Change Photo
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />

                            </label>

                        </div>

                    </div>


                    {/* =================================================
                        EDIT FORM
                    ================================================= */}

                    <div className="engineer-edit-form">


                        {/* =================================================
                            FIRST NAME + LAST NAME
                        ================================================= */}

                        <div className="engineer-edit-name-row">


                            {/* FIRST NAME */}

                            <div className="engineer-edit-name-field">

                                <label className="engineer-edit-label">

                                    <FaUser />

                                    <span>
                                        First Name
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="firstName"
                                    value={
                                        editEngineer.firstName
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    className="engineer-edit-input"
                                    placeholder="Enter first name"
                                />

                            </div>


                            {/* LAST NAME */}

                            <div className="engineer-edit-name-field">

                                <label className="engineer-edit-label">

                                    <FaUser />

                                    <span>
                                        Last Name
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="lastName"
                                    value={
                                        editEngineer.lastName
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    className="engineer-edit-input"
                                    placeholder="Enter last name"
                                />

                            </div>

                        </div>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="engineer-edit-email-field">

                            <label className="engineer-edit-label">

                                <FaEnvelope />

                                <span>
                                    Email
                                </span>

                            </label>


                            <input
                                type="email"
                                value={
                                    editEngineer.email
                                }
                                disabled
                                className="engineer-edit-email-input"
                            />


                            <span className="engineer-edit-email-note">

                                <FaLock />

                                Email cannot be changed

                            </span>

                        </div>


                        {/* =================================================
                            CONTACT
                        ================================================= */}

                        <div className="engineer-edit-contact-field">

                            <label className="engineer-edit-label">

                                <FaPhoneAlt />

                                <span>
                                    Contact Number
                                </span>

                            </label>


                            <input
                                type="tel"
                                name="contact"
                                value={
                                    editEngineer.contact
                                }
                                onChange={
                                    handleEditChange
                                }
                                className="engineer-edit-input"
                                placeholder="Enter contact number"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ACTION BUTTONS
                    ================================================= */}

                    <div className="engineer-edit-actions">


                        {/* CANCEL */}

                        <button
                            type="button"
                            className="engineer-edit-cancel"
                            onClick={handleCancel}
                        >

                            <FaTimes />

                            <span>
                                Cancel
                            </span>

                        </button>


                        {/* SAVE */}

                        <button
                            type="button"
                            className="engineer-edit-save"
                            onClick={handleSave}
                        >

                            <FaSave />

                            <span>
                                Save Changes
                            </span>

                        </button>

                    </div>

                </div>

            </div>

        );
    }


    /* =========================================================
       NORMAL ENGINEER PROFILE PAGE
    ========================================================= */

    return (

        <div className="engineer-profile-page">

            <div className="engineer-profile-card">


                {/* =================================================
                    PROFILE HEADER
                ================================================= */}

                <div className="engineer-profile-header">


                    <div className="engineer-profile-photo-wrapper">

                        <img
                            src={
                                engineer.profileImage ||
                                defaultProfile
                            }
                            alt="Engineer Profile"
                            className="engineer-profile-photo"
                        />

                    </div>


                    <div className="engineer-profile-header-content">

                        <h2>

                            {engineer.firstName}{" "}

                            {engineer.lastName}

                        </h2>


                        <span className="engineer-profile-role">

                            Engineer

                        </span>

                    </div>

                </div>


                {/* =================================================
                    PROFILE INFORMATION
                ================================================= */}

                <div className="engineer-profile-content">


                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

                    <div className="engineer-profile-section-title">

                        <h3>
                            Personal Information
                        </h3>

                    </div>


                    {/* FIRST NAME */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaUser />

                            <span>
                                First Name
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.firstName}

                        </div>

                    </div>


                    {/* LAST NAME */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaUser />

                            <span>
                                Last Name
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.lastName}

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaEnvelope />

                            <span>
                                Email
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.email}

                        </div>

                    </div>


                    {/* CONTACT */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaPhoneAlt />

                            <span>
                                Contact Number
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.contact}

                        </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaMapMarkerAlt />

                            <span>
                                Address
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.address}

                        </div>

                    </div>


                    {/* =================================================
                        PROFESSIONAL INFORMATION
                    ================================================= */}

                    <div className="engineer-profile-section-title">

                        <h3>
                            Professional Information
                        </h3>

                    </div>


                    {/* ENGINEER BRANCH */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaBuilding />

                            <span>
                                Engineer Branch
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.branch}

                        </div>

                    </div>


                    {/* HIGHEST QUALIFICATION */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaGraduationCap />

                            <span>
                                Highest Qualification
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.qualification}

                        </div>

                    </div>


                    {/* EXPERIENCE */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaBriefcase />

                            <span>
                                Experience
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.experience}

                        </div>

                    </div>


                    {/* DEPARTMENT */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaBuilding />

                            <span>
                                Department
                            </span>

                        </div>


                        <div className="engineer-profile-value">

                            {engineer.department}

                        </div>

                    </div>


                    {/* =================================================
                        CERTIFICATES
                    ================================================= */}

                    <div className="engineer-profile-section-title">

                        <h3>
                            Certificates
                        </h3>

                    </div>


                    {/* DEGREE CERTIFICATE */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaCertificate />

                            <span>
                                Degree Certificate
                            </span>

                        </div>


                        <div className="engineer-profile-certificate">

                            {engineer.degreeCertificate}

                        </div>

                    </div>


                    {/* EXPERIENCE CERTIFICATE */}

                    <div className="engineer-profile-field">

                        <div className="engineer-profile-label">

                            <FaCertificate />

                            <span>
                                Experience Certificate
                            </span>

                        </div>


                        <div className="engineer-profile-certificate">

                            {engineer.experienceCertificate}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PROFILE ACTION BUTTONS
                ================================================= */}

                <div className="engineer-profile-actions">


                    {/* EDIT PROFILE */}

                    <button
                        type="button"
                        className="engineer-profile-edit-btn"
                        onClick={handleEdit}
                    >

                        <FaUserEdit />

                        <span>
                            Edit Profile
                        </span>

                    </button>


                    {/* CHANGE PASSWORD */}

                    <button
                        type="button"
                        className="engineer-profile-password-btn"
                        onClick={() =>
                            navigate("/change-password")
                        }
                    >

                        <FaLock />

                        <span>
                            Change Password
                        </span>

                    </button>

                </div>

            </div>

        </div>

    );
}

export default EngineerProfile;