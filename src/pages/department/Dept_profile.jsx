// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Dept_profile.css";

// import {
//     FaBuilding,
//     FaEnvelope,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
//     FaAlignLeft,
//     FaUserEdit,
//     FaSave,
//     FaTimes,
//     FaLock
// } from "react-icons/fa";


// function Dept_profile() {

//     const navigate = useNavigate();

//     /* =====================================================
//        EDITING STATE
//     ===================================================== */

//     const [isEditing, setIsEditing] = useState(false);


//     /* =====================================================
//        DEPARTMENT DATA
//     ===================================================== */

//     const [department, setDepartment] = useState({

//         departmentName: "Sanitation Department",

//         email: "sanitation@fixmycity.com",

//         contact: "9876543210",

//         address:
//             "Municipal Corporation, Main Road, Ahmedabad",

//         description:
//             "The Sanitation Department is responsible for maintaining cleanliness, garbage collection, waste management and resolving sanitation-related complaints in the city."

//     });


//     /* =====================================================
//        TEMPORARY EDIT DATA
//     ===================================================== */

//     const [tempDepartment, setTempDepartment] =
//         useState(department);


//     /* =====================================================
//        EDIT PROFILE
//     ===================================================== */

//     const handleEdit = () => {

//         setTempDepartment(department);

//         setIsEditing(true);

//     };


//     /* =====================================================
//        CANCEL EDIT
//     ===================================================== */

//     const handleCancel = () => {

//         setTempDepartment(department);

//         setIsEditing(false);

//     };


//     /* =====================================================
//        HANDLE INPUT CHANGE
//     ===================================================== */

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setTempDepartment({

//             ...tempDepartment,

//             [name]: value

//         });

//     };


//     /* =====================================================
//        SAVE CHANGES
//     ===================================================== */

//     const handleSave = () => {

//         setDepartment(tempDepartment);

//         setIsEditing(false);

//     };


//     /* =====================================================
//        CHANGE PASSWORD
//     ===================================================== */

//     const handleChangePassword = () => {

//         navigate("/change-password");

//     };


//     return (

//         <div className="dept-profile-page">


//             {/* =================================================
//                MAIN CARD
//             ================================================= */}

//             <div className="dept-profile-card">


//                 {/* =================================================
//                    HEADER
//                 ================================================= */}

//                 <div className="dept-profile-header">


//                     {/* Department Icon */}

//                     <div className="dept-profile-icon">

//                         <FaBuilding />

//                     </div>


//                     {/* Department Name */}

//                     <div className="dept-profile-header-content">

//                         <h2>
//                             {department.departmentName}
//                         </h2>

//                         <span className="dept-profile-role">

//                             Department Administrator

//                         </span>

//                     </div>

//                 </div>



//                 {/* =================================================
//                    PROFILE CONTENT
//                 ================================================= */}

//                 <div className="dept-profile-content">


//                     {/* =================================================
//                        DEPARTMENT NAME
//                     ================================================= */}

//                     <div className="dept-profile-field">


//                         <div className="dept-profile-label">

//                             <FaBuilding />

//                             <span>
//                                 Department Name
//                             </span>

//                         </div>


//                         {isEditing ? (

//                             <input
//                                 type="text"
//                                 name="departmentName"
//                                 value={
//                                     tempDepartment.departmentName
//                                 }
//                                 onChange={handleChange}
//                                 className="dept-profile-input"
//                                 placeholder="Enter department name"
//                             />

//                         ) : (

//                             <div className="dept-profile-value">

//                                 {department.departmentName}

//                             </div>

//                         )}

//                     </div>



//                     {/* =================================================
//                        EMAIL
//                     ================================================= */}

//                     <div className="dept-profile-field">


//                         <div className="dept-profile-label">

//                             <FaEnvelope />

//                             <span>
//                                 Email
//                             </span>

//                         </div>


//                         <div className="dept-profile-email-wrapper">


//                             <input
//                                 type="email"
//                                 value={
//                                     isEditing
//                                         ? tempDepartment.email
//                                         : department.email
//                                 }
//                                 disabled
//                                 className="dept-profile-input dept-profile-email-disabled"
//                             />


//                             {isEditing && (

//                                 <span className="dept-profile-readonly">

//                                     <FaLock />

//                                     Cannot be changed

//                                 </span>

//                             )}

//                         </div>

//                     </div>



//                     {/* =================================================
//                        CONTACT NUMBER
//                     ================================================= */}

//                     <div className="dept-profile-field">


//                         <div className="dept-profile-label">

//                             <FaPhoneAlt />

//                             <span>
//                                 Contact Number
//                             </span>

//                         </div>


//                         {isEditing ? (

//                             <input
//                                 type="tel"
//                                 name="contact"
//                                 value={
//                                     tempDepartment.contact
//                                 }
//                                 onChange={handleChange}
//                                 className="dept-profile-input"
//                                 placeholder="Enter contact number"
//                             />

//                         ) : (

//                             <div className="dept-profile-value">

//                                 {department.contact}

//                             </div>

//                         )}

//                     </div>



//                     {/* =================================================
//                        ADDRESS
//                     ================================================= */}

//                     <div className="dept-profile-field">


//                         <div className="dept-profile-label">

//                             <FaMapMarkerAlt />

//                             <span>
//                                 Address
//                             </span>

//                         </div>


//                         {isEditing ? (

//                             <textarea
//                                 name="address"
//                                 value={
//                                     tempDepartment.address
//                                 }
//                                 onChange={handleChange}
//                                 className="dept-profile-textarea"
//                                 placeholder="Enter department address"
//                                 rows="3"
//                             />

//                         ) : (

//                             <div className="dept-profile-value dept-profile-address">

//                                 {department.address}

//                             </div>

//                         )}

//                     </div>



//                     {/* =================================================
//                        DESCRIPTION
//                     ================================================= */}

//                     <div className="dept-profile-field dept-profile-description-field">


//                         <div className="dept-profile-label">

//                             <FaAlignLeft />

//                             <span>
//                                 Description
//                             </span>

//                         </div>


//                         {isEditing ? (

//                             <textarea
//                                 name="description"
//                                 value={
//                                     tempDepartment.description
//                                 }
//                                 onChange={handleChange}
//                                 className="dept-profile-textarea dept-profile-description"
//                                 placeholder="Enter department description"
//                                 rows="5"
//                             />

//                         ) : (

//                             <div className="dept-profile-value dept-profile-description-view">

//                                 {department.description}

//                             </div>

//                         )}

//                     </div>

//                 </div>



//                 {/* =================================================
//                    ACTION BUTTONS
//                 ================================================= */}

//                 <div className="dept-profile-actions">


//                     {/* =================================================
//                        NORMAL MODE
//                     ================================================= */}

//                     {!isEditing ? (

//                         <>


//                             {/* EDIT PROFILE */}

//                             <button
//                                 type="button"
//                                 className="dept-profile-edit-btn"
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
//                                 className="dept-profile-password-btn"
//                                 onClick={handleChangePassword}
//                             >

//                                 <FaLock />

//                                 <span>
//                                     Change Password
//                                 </span>

//                             </button>


//                         </>

//                     ) : (

//                         <>


//                             {/* =================================================
//                                CANCEL BUTTON
//                             ================================================= */}

//                             <button
//                                 type="button"
//                                 className="dept-profile-cancel-btn"
//                                 onClick={handleCancel}
//                             >

//                                 <FaTimes />

//                                 <span>
//                                     Cancel
//                                 </span>

//                             </button>



//                             {/* =================================================
//                                SAVE BUTTON
//                             ================================================= */}

//                             <button
//                                 type="button"
//                                 className="dept-profile-save-btn"
//                                 onClick={handleSave}
//                             >

//                                 <FaSave />

//                                 <span>
//                                     Save Changes
//                                 </span>

//                             </button>


//                         </>

//                     )}

//                 </div>

//             </div>

//         </div>

//     );

// }


// export default Dept_profile;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    // EDIT STATE
    // =========================================================

    const [isEditing, setIsEditing] = useState(false);


    // =========================================================
    // LOADING
    // =========================================================

    const [loading, setLoading] = useState(true);


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

    const [tempDepartment, setTempDepartment] =
        useState(department);


    // =========================================================
    // POPUP
    // =========================================================

    const [popup, setPopup] = useState({

        show: false,

        type: "error",

        message: ""

    });


    // =========================================================
    // SHOW POPUP
    // =========================================================

    const showPopup = (
        message,
        type = "error"
    ) => {

        setPopup({

            show: true,

            type,

            message

        });

    };


    // =========================================================
    // CLOSE POPUP
    // =========================================================

    const closePopup = () => {

        setPopup({

            show: false,

            type: "error",

            message: ""

        });

    };


    // =========================================================
    // FETCH DEPARTMENT PROFILE
    // =========================================================

    const fetchProfile = async () => {

        try {

            setLoading(true);


            // -------------------------------------------------
            // GET TOKEN
            // -------------------------------------------------

            const token =
                localStorage.getItem("token");


            if (!token) {

                showPopup(
                    "You are not logged in. Please login again.",
                    "error"
                );

                return;

            }


            // -------------------------------------------------
            // API REQUEST
            // -------------------------------------------------

            const response =
                await axios.get(

                    "http://localhost:8085/api/auth/profile",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );


            console.log(
                "Department Profile:",
                response.data
            );


            const data =
                response.data;


            // -------------------------------------------------
            // CHECK ROLE
            // -------------------------------------------------

            if (data.role !== "DEPARTMENT") {

                showPopup(
                    "This profile belongs to a different user role.",
                    "error"
                );

                return;

            }


            // -------------------------------------------------
            // ROLE DATA
            // -------------------------------------------------

            const roleData =
                data.roleData || {};


            // -------------------------------------------------
            // CREATE DEPARTMENT OBJECT
            // -------------------------------------------------

            const departmentData = {

                departmentName:
                    roleData.departmentName || "",

                email:
                    data.email || "",

                contact:
                    data.contact || "",

                address:
                    roleData.address || "",

                description:
                    roleData.description || "",

                profilePhoto:
                    data.profileImage || null

            };


            // -------------------------------------------------
            // SET DATA
            // -------------------------------------------------

            setDepartment(
                departmentData
            );


            setTempDepartment(
                departmentData
            );


        } catch (error) {

            console.error(
                "Department Profile Error:",
                error
            );


            // -------------------------------------------------
            // BACKEND MESSAGE
            // -------------------------------------------------

            const backendMessage =
                error.response?.data?.message;


            if (backendMessage) {

                showPopup(
                    backendMessage,
                    "error"
                );

            }

            // -------------------------------------------------
            // STRING RESPONSE
            // -------------------------------------------------

            else if (
                typeof error.response?.data ===
                "string"
            ) {

                showPopup(
                    error.response.data,
                    "error"
                );

            }

            // -------------------------------------------------
            // NETWORK ERROR
            // -------------------------------------------------

            else if (
                error.request &&
                !error.response
            ) {

                showPopup(
                    "Unable to connect to the server. Please check whether the backend is running.",
                    "error"
                );

            }

            // -------------------------------------------------
            // UNKNOWN ERROR
            // -------------------------------------------------

            else {

                showPopup(
                    "Unable to load department profile.",
                    "error"
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // FETCH PROFILE WHEN PAGE LOADS
    // =========================================================

    useEffect(() => {

        fetchProfile();

    }, []);


    // =========================================================
    // EDIT PROFILE
    // =========================================================

    const handleEdit = () => {

        setTempDepartment({

            ...department

        });

        setIsEditing(true);

    };


    // =========================================================
    // CANCEL EDIT
    // =========================================================

    const handleCancel = () => {

        setTempDepartment({

            ...department

        });

        setIsEditing(false);

    };


    // =========================================================
    // HANDLE INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setTempDepartment(
            (previous) => ({

                ...previous,

                [name]: value

            })
        );

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

        const file =
            e.target.files?.[0];


        if (!file) {

            return;

        }


        // -----------------------------------------------------
        // IMAGE VALIDATION
        // -----------------------------------------------------

        if (
            !file.type.startsWith("image/")
        ) {

            showPopup(
                "Please select a valid image file.",
                "error"
            );

            return;

        }


        // -----------------------------------------------------
        // PREVIEW
        // -----------------------------------------------------

        const imageUrl =
            URL.createObjectURL(file);


        setTempDepartment(
            (previous) => ({

                ...previous,

                profilePhoto: imageUrl

            })
        );

    };


    // =========================================================
    // SAVE CHANGES
    // =========================================================

    const handleSave = () => {

        /*
         * Currently this only updates frontend state.
         *
         * We will connect this button to the backend
         * once the Department Update Profile API is created.
         */

        setDepartment({

            ...tempDepartment

        });


        setIsEditing(false);


        showPopup(
            "Profile changes saved locally.",
            "success"
        );

    };


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    const handleChangePassword = () => {

        navigate(
            "/change-password"
        );

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

                        <h1>
                            Edit Profile
                        </h1>

                    </div>

                ) : (

                    <div className="dept-profile-header">


                        {/* =================================================
                           PROFILE PHOTO
                        ================================================= */}

                        <div className="dept-profile-icon-wrapper">

                            {department.profilePhoto ? (

                                <img
                                    src={
                                        department.profilePhoto
                                    }
                                    alt="Department Profile"
                                    className="dept-profile-photo"
                                />

                            ) : (

                                <div className="dept-profile-icon">

                                    <FaBuilding />

                                </div>

                            )}

                        </div>


                        {/* =================================================
                           DEPARTMENT NAME
                        ================================================= */}

                        <div className="dept-profile-header-content">

                            <h2>

                                {
                                    department.departmentName ||
                                    "Department"
                                }

                            </h2>


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


                        {/* PROFILE IMAGE */}

                        <div className="dept-profile-edit-photo-wrapper">

                            {tempDepartment.profilePhoto ? (

                                <img
                                    src={
                                        tempDepartment.profilePhoto
                                    }
                                    alt="Department Profile Preview"
                                    className="dept-profile-edit-photo"
                                />

                            ) : (

                                <div className="dept-profile-edit-photo-placeholder">

                                    <FaBuilding />

                                </div>

                            )}

                        </div>


                        {/* HIDDEN FILE INPUT */}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={
                                handlePhotoChange
                            }
                            className="dept-profile-file-input"
                        />


                        {/* CHANGE PHOTO BUTTON */}

                        <button
                            type="button"
                            className="dept-profile-change-photo-btn"
                            onClick={
                                handleChangePhoto
                            }
                        >

                            <FaCamera />

                            <span>
                                Change Photo
                            </span>

                        </button>


                        <p className="dept-profile-photo-hint">

                            JPG, PNG or WEBP • Recommended square image

                        </p>

                    </div>

                )}


                {/* =================================================
                   PROFILE CONTENT
                ================================================= */}

                <div className="dept-profile-content">


                    {/* =================================================
                       DEPARTMENT NAME
                    ================================================= */}

                    <div className="dept-profile-field">

                        <div className="dept-profile-label">

                            <FaBuilding />

                            <span>
                                Department Name
                            </span>

                        </div>


                        {isEditing ? (

                            <input
                                type="text"
                                name="departmentName"
                                value={
                                    tempDepartment.departmentName
                                }
                                onChange={
                                    handleChange
                                }
                                className="dept-profile-input"
                                placeholder="Enter department name"
                            />

                        ) : (

                            <div className="dept-profile-value">

                                {
                                    department.departmentName ||
                                    "-"
                                }

                            </div>

                        )}

                    </div>


                    {/* =================================================
                       EMAIL
                    ================================================= */}

                    <div className="dept-profile-field">

                        <div className="dept-profile-label">

                            <FaEnvelope />

                            <span>
                                Email
                            </span>

                        </div>


                        <div className="dept-profile-email-wrapper">

                            <input
                                type="email"
                                value={
                                    isEditing
                                        ? tempDepartment.email
                                        : department.email
                                }
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


                    {/* =================================================
                       CONTACT
                    ================================================= */}

                    <div className="dept-profile-field">

                        <div className="dept-profile-label">

                            <FaPhoneAlt />

                            <span>
                                Contact Number
                            </span>

                        </div>


                        {isEditing ? (

                            <input
                                type="tel"
                                name="contact"
                                value={
                                    tempDepartment.contact
                                }
                                onChange={
                                    handleChange
                                }
                                className="dept-profile-input"
                                placeholder="Enter contact number"
                            />

                        ) : (

                            <div className="dept-profile-value">

                                {
                                    department.contact ||
                                    "-"
                                }

                            </div>

                        )}

                    </div>


                    {/* =================================================
                       ADDRESS
                    ================================================= */}

                    <div className="dept-profile-field">

                        <div className="dept-profile-label">

                            <FaMapMarkerAlt />

                            <span>
                                Address
                            </span>

                        </div>


                        {isEditing ? (

                            <textarea
                                name="address"
                                value={
                                    tempDepartment.address
                                }
                                onChange={
                                    handleChange
                                }
                                className="dept-profile-textarea"
                                placeholder="Enter department address"
                                rows="3"
                            />

                        ) : (

                            <div className="dept-profile-value dept-profile-address">

                                {
                                    department.address ||
                                    "-"
                                }

                            </div>

                        )}

                    </div>


                    {/* =================================================
                       DESCRIPTION
                    ================================================= */}

                    <div className="dept-profile-field dept-profile-description-field">

                        <div className="dept-profile-label">

                            <FaAlignLeft />

                            <span>
                                Description
                            </span>

                        </div>


                        {isEditing ? (

                            <textarea
                                name="description"
                                value={
                                    tempDepartment.description
                                }
                                onChange={
                                    handleChange
                                }
                                className="dept-profile-textarea dept-profile-description"
                                placeholder="Enter department description"
                                rows="5"
                            />

                        ) : (

                            <div className="dept-profile-value dept-profile-description-view">

                                {
                                    department.description ||
                                    "-"
                                }

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
                                onClick={
                                    handleEdit
                                }
                            >

                                <FaUserEdit />

                                <span>
                                    Edit Profile
                                </span>

                            </button>


                            {/* CHANGE PASSWORD */}

                            <button
                                type="button"
                                className="dept-profile-password-btn"
                                onClick={
                                    handleChangePassword
                                }
                            >

                                <FaLock />

                                <span>
                                    Change Password
                                </span>

                            </button>

                        </>

                    ) : (

                        <>

                            {/* CANCEL */}

                            <button
                                type="button"
                                className="dept-profile-cancel-btn"
                                onClick={
                                    handleCancel
                                }
                            >

                                <FaTimes />

                                <span>
                                    Cancel
                                </span>

                            </button>


                            {/* SAVE */}

                            <button
                                type="button"
                                className="dept-profile-save-btn"
                                onClick={
                                    handleSave
                                }
                            >

                                <FaSave />

                                <span>
                                    Save Changes
                                </span>

                            </button>

                        </>

                    )}

                </div>

            </div>

        </div>

    );

}


export default Dept_profile;