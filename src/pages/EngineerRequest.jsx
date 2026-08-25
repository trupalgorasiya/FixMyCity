// import  { useState } from "react";
// import "../styles/EngineerRequest.css";

// const EngineerRequest = () => {

//     const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     address: "",
//     qualification: "",
//     otherQualification: "",
//     branch: "",
//     experience: "",
//     department: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     photo: null,
//     degree: null,
//     experienceCertificate: null,
//     declaration: false
// });

//     const handleChange = (e) => {

//         const { name, value, type, checked, files} = e.target;

//         setFormData({
//             ...formData,
//             [name]:
//                 type === "checkbox"
//                     ? checked
//                     : type === "file"
//                     ? files[0]
//                     : value,
//         });
//     };

//     const handleSubmit = (e) => {

//         e.preventDefault();

//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         if (!formData.declaration) {
//             alert("Please accept declaration.");
//             return;
//         }

//         console.log(formData);

//         alert("Engineer Request Submitted Successfully!");
//     };

//     const handleReset = () => {
//         setFormData({
//             firstName: "",
//             lastName:"",
//             mobile: "",
//             email: "",
//             address: "",
//             qualification: "",
//             branch: "",
//             experience: "",
//             department: "",
//             username: "",
//             password: "",
//             otherQualification: "",
//             confirmPassword: "",
//             photo: null,
//             degree: null,
//             experienceCertificate: null,
//             declaration: false
//         });
//     };

//     return (

//         <div className="engineer-request-page">

//             <div className="request-card">

//                 <div className="request-header">

//                     <h2>Engineer Registration</h2>

//                     <p>
//                         Submit your request to join the selected department.
//                     </p>

//                 </div>

//                 <form onSubmit={handleSubmit}>

//                     {/* Personal Information */}

//                     <div className="section-title">
//                         Personal Information
//                     </div>

//                     <div className="form-grid">

//                         <div className="form-group">

//                             <label>First Name</label>

//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 placeholder="Enter Full Name"
//                                 required
//                             />

//                         </div>
//                         <div className="form-group">

//                             <label>Last Name</label>

//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 placeholder="Enter Full Name"
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Mobile Number</label>

//                             <input
//                                 type="tel"
//                                 name="mobile"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 placeholder="Enter Mobile Number"
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Email Address</label>

//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Enter Email"
//                                 required
//                             />

//                         </div>

//                         <div className="form-group full-width">

//                             <label>Address</label>

//                             <textarea
//                                 name="address"
//                                 rows="3"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 placeholder="Enter Address"
//                             />

//                         </div>

//                     </div>

//                     {/* Professional */}

//                     <div className="section-title">
//                         Professional Information
//                     </div>

//                     <div className="form-grid">

//                         <div className="form-group">

//                             <label>Engineering Branch</label>

//                             <select
//                                 name="branch"
//                                 value={formData.branch}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Branch
//                                 </option>

//                                 <option>Civil Engineering</option>

//                                 <option>Mechanical Engineering</option>

//                                 <option>Electrical Engineering</option>

//                                 <option>Computer Engineering</option>

//                                 <option>Environmental Engineering</option>

//                             </select>

//                         </div>

//                         <div className="form-group">

//     <label>Highest Qualification</label>

//     <select
//         name="qualification"
//         value={formData.qualification}
//         onChange={handleChange}
//         required
//     >
//         <option value="">
//             Select Qualification
//         </option>

//         <option value="B.E.">
//             B.E.
//         </option>

//         <option value="B.Tech">
//             B.Tech
//         </option>

//         <option value="M.E.">
//             M.E.
//         </option>

//         <option value="M.Tech">
//             M.Tech
//         </option>

//         <option value="Diploma">
//             Diploma in Engineering
//         </option>

//         <option value="Ph.D.">
//             Ph.D.
//         </option>

//         <option value="Other">
//             Other
//         </option>

//     </select>

//     {formData.qualification === "Other" && (
//         <input
//             type="text"
//             name="otherQualification"
//             value={formData.otherQualification}
//             onChange={handleChange}
//             placeholder="Enter your qualification"
//             required
//         />
//     )}

// </div>

//                         <div className="form-group">

//                             <label>Experience (Years)</label>

//                             <input
//                                 type="number"
//                                 name="experience"
//                                 value={formData.experience}
//                                 onChange={handleChange}
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Preferred Department</label>

//                             <select
//                                 name="department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Department
//                                 </option>

//                                 <option>Road Department</option>

//                                 <option>Water Department</option>

//                                 <option>Electrical Department</option>

//                                 <option>Waste Management</option>

//                             </select>

//                         </div>

//                     </div>

//                     {/* Documents */}

//                     <div className="section-title">
//                         Upload Documents
//                     </div>

//                     <div className="form-grid">

//                         <div className="form-group">

//                             <label>Passport Size Photo</label>

//                             <input
//                                 type="file"
//                                 name="photo"
//                                 onChange={handleChange}
//                                 accept="image/*"
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Degree Certificate</label>

//                             <input
//                                 type="file"
//                                 name="degree"
//                                 onChange={handleChange}
//                                 accept=".pdf,.jpg,.png"
//                                 required
//                             />

//                         </div>

//                         <div className="form-group full-width">

//                             <label>Experience Certificate (Optional)</label>

//                             <input
//                                 type="file"
//                                 name="experienceCertificate"
//                                 onChange={handleChange}
//                             />

//                         </div>

//                     </div>

//                     {/* Login */}

//                     <div className="section-title">
//                         Account Information
//                     </div>

//                     <div className="form-grid">


//                         <div className="form-group">

//                             <label>Password</label>

//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                         <div className="form-group">

//                             <label>Confirm Password</label>

//                             <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>

//                     {/* Declaration */}

//                     <div className="checkbox-area">

//                         <input
//                             type="checkbox"
//                             name="declaration"
//                             checked={formData.declaration}
//                             onChange={handleChange}
//                         />

//                         <span>
//                             I declare that the above information is true.
//                         </span>

//                     </div>

//                     {/* Buttons */}

//                     <div className="button-group">

//                         <button
//                             type="submit"
//                             className="submit-btn"
//                         >
//                             Submit
//                         </button>

//                         <button
//                             type="button"
//                             className="reset-btn"
//                             onClick={handleReset}
//                         >
//                             Reset
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>

//     );
// };

// export default EngineerRequest;

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EngineerRequest.css";

import CustomPopup from "../configure/CustomPopup"

const API_BASE_URL = "http://localhost:8085";

const INITIAL_FORM_DATA = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
    qualification: "",
    otherQualification: "",
    branch: "",
    experience: "",
    department: "",
    password: "FixMy@123",
    confirmPassword: "FixMy@123",
    photo: null,
    degree: null,
    experienceCertificate: null,
    declaration: false
};

const EngineerRequest = () => {

    // =========================================================
    // FORM DATA
    // =========================================================

    const [formData, setFormData] = useState(
        INITIAL_FORM_DATA
    );


    // =========================================================
    // DEPARTMENTS
    // =========================================================

    const [departments, setDepartments] = useState([]);

    const [departmentLoading, setDepartmentLoading] =
        useState(true);


    // =========================================================
    // SUBMIT LOADING
    // =========================================================

    const [submitting, setSubmitting] =
        useState(false);


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
    // FETCH DEPARTMENTS
    // =========================================================

    useEffect(() => {

        const fetchDepartments = async () => {

            try {

                setDepartmentLoading(true);

                const response = await axios.get(
                    `${API_BASE_URL}/api/departments`
                );

                console.log(
                    "Departments:",
                    response.data
                );


                /*
                 * Depending on your backend response,
                 * departments may directly be an array
                 * or may be inside content/data.
                 */

                const responseData =
                    response.data;


                if (Array.isArray(responseData)) {

                    setDepartments(
                        responseData
                    );

                } else if (
                    Array.isArray(
                        responseData.content
                    )
                ) {

                    setDepartments(
                        responseData.content
                    );

                } else if (
                    Array.isArray(
                        responseData.data
                    )
                ) {

                    setDepartments(
                        responseData.data
                    );

                } else {

                    setDepartments([]);

                    showPopup(
                        "Unable to load departments.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(
                    "Department Fetch Error:",
                    error
                );


                const backendMessage =
                    error.response?.data?.message;


                if (backendMessage) {

                    showPopup(
                        backendMessage,
                        "error"
                    );

                } else if (
                    typeof error.response?.data ===
                    "string"
                ) {

                    showPopup(
                        error.response.data,
                        "error"
                    );

                } else {

                    showPopup(
                        "Unable to load departments. Please try again.",
                        "error"
                    );

                }

            } finally {

                setDepartmentLoading(false);

            }

        };


        fetchDepartments();

    }, []);


    // =========================================================
    // HANDLE INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
            files
        } = e.target;


        setFormData(
            (previous) => ({

                ...previous,

                [name]:

                    type === "checkbox"
                        ? checked

                        : type === "file"
                        ? files?.[0] || null

                        : value

            })
        );

    };


    // =========================================================
    // HANDLE SUBMIT
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // =====================================================
        // DECLARATION
        // =====================================================

        if (!formData.declaration) {

            showPopup(
                "Please accept the declaration.",
                "error"
            );

            return;

        }


        // =====================================================
        // FILE VALIDATION
        // =====================================================

        if (!formData.photo) {

            showPopup(
                "Please upload passport size photo.",
                "error"
            );

            return;

        }


        if (!formData.degree) {

            showPopup(
                "Please upload degree certificate.",
                "error"
            );

            return;

        }


        // =====================================================
        // DEPARTMENT VALIDATION
        // =====================================================

        if (!formData.department) {

            showPopup(
                "Please select a department.",
                "error"
            );

            return;

        }


        // =====================================================
        // QUALIFICATION
        // =====================================================

        let highestQualification =
            formData.qualification;


        if (
            formData.qualification ===
            "Other"
        ) {

            if (
                !formData.otherQualification.trim()
            ) {

                showPopup(
                    "Please enter your qualification.",
                    "error"
                );

                return;

            }


            highestQualification =
                formData.otherQualification.trim();

        }


        // =====================================================
        // PASSWORD
        // =====================================================

        /*
         * Password is intentionally fixed as requested.
         */

        const password = "FixMy@123";

        const confirmPassword =
            "FixMy@123";


        // =====================================================
        // FORM DATA
        // =====================================================

        const data = new FormData();


        // =====================================================
        // PERSONAL INFORMATION
        // =====================================================

        data.append(
            "firstName",
            formData.firstName
        );

        data.append(
            "lastName",
            formData.lastName
        );

        data.append(
            "contact",
            formData.mobile
        );

        data.append(
            "email",
            formData.email
        );

        data.append(
            "address",
            formData.address
        );


        // =====================================================
        // PROFESSIONAL INFORMATION
        // =====================================================

        data.append(
            "highestQualification",
            highestQualification
        );

        data.append(
            "engineer_branch",
            formData.branch
        );

        data.append(
            "experience",
            formData.experience || 0
        );

        data.append(
            "department",
            formData.department
        );


        // =====================================================
        // PASSWORD
        // =====================================================

        data.append(
            "password",
            password
        );

        data.append(
            "conformPassword",
            confirmPassword
        );


        // =====================================================
        // FILES
        // =====================================================

        data.append(
            "passport_image",
            formData.photo
        );

        data.append(
            "degree_Certificate",
            formData.degree
        );


        if (formData.experienceCertificate) {

            data.append(
                "experience_Certificate",
                formData.experienceCertificate
            );

        }


        // =====================================================
        // DEBUG
        // =====================================================

        console.log(
            "Engineer Registration FormData:"
        );

        for (
            const [key, value]
            of data.entries()
        ) {

            console.log(
                key,
                value
            );

        }


        // =====================================================
        // API CALL
        // =====================================================

        try {

            setSubmitting(true);


            const response =
                await axios.post(

                    `${API_BASE_URL}/api/enginners/add-engineer`,

                    data,

                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }

                );


            console.log(
                "Engineer Registration Response:",
                response.data
            );


            // =================================================
            // SUCCESS
            // =================================================

            showPopup(
                response.data?.message ||
                "Engineer Request Submitted Successfully.",
                "success"
            );


            // =================================================
            // RESET FORM
            // =================================================

            setFormData({

                ...INITIAL_FORM_DATA

            });


        } catch (error) {

            console.error(
                "Engineer Registration Error:",
                error
            );


            // =================================================
            // BACKEND MESSAGE
            // =================================================

            const backendMessage =
                error.response?.data?.message;


            if (backendMessage) {

                showPopup(
                    backendMessage,
                    "error"
                );

            }

            // =================================================
            // STRING RESPONSE
            // =================================================

            else if (
                typeof error.response?.data ===
                "string"
            ) {

                showPopup(
                    error.response.data,
                    "error"
                );

            }

            // =================================================
            // VALIDATION ERRORS
            // =================================================

            else if (
                error.response?.data?.errors
            ) {

                const errors =
                    error.response.data.errors;


                const errorMessage =
                    Object.values(errors)
                        .join(", ");


                showPopup(
                    errorMessage ||
                    "Please check the entered information.",
                    "error"
                );

            }

            // =================================================
            // NETWORK ERROR
            // =================================================

            else if (
                error.request &&
                !error.response
            ) {

                showPopup(
                    "Unable to connect to the server. Please check whether the backend is running.",
                    "error"
                );

            }

            // =================================================
            // UNKNOWN ERROR
            // =================================================

            else {

                showPopup(
                    "Engineer registration failed. Please try again.",
                    "error"
                );

            }

        } finally {

            setSubmitting(false);

        }

    };


    // =========================================================
    // RESET
    // =========================================================

    const handleReset = () => {

        setFormData({

            ...INITIAL_FORM_DATA

        });

    };


    // =========================================================
    // JSX
    // =========================================================

    return (

        <div className="engineer-request-page">


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


            <div className="request-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="request-header">

                    <h2>
                        Engineer Registration
                    </h2>

                    <p>
                        Submit your request to join
                        the selected department.
                    </p>

                </div>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* =================================================
                        PERSONAL INFORMATION
                    ================================================= */}

                    <div className="section-title">

                        Personal Information

                    </div>


                    <div className="form-grid">


                        {/* FIRST NAME */}

                        <div className="form-group">

                            <label>
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                value={
                                    formData.firstName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter First Name"
                                required
                            />

                        </div>


                        {/* LAST NAME */}

                        <div className="form-group">

                            <label>
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                value={
                                    formData.lastName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Last Name"
                                required
                            />

                        </div>


                        {/* MOBILE */}

                        <div className="form-group">

                            <label>
                                Mobile Number
                            </label>

                            <input
                                type="tel"
                                name="mobile"
                                value={
                                    formData.mobile
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Mobile Number"
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Email"
                                required
                            />

                        </div>


                        {/* ADDRESS */}

                        <div className="form-group full-width">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                rows="3"
                                value={
                                    formData.address
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Address"
                                required
                            />

                        </div>

                    </div>


                    {/* =================================================
                        PROFESSIONAL INFORMATION
                    ================================================= */}

                    <div className="section-title">

                        Professional Information

                    </div>


                    <div className="form-grid">


                        {/* ENGINEERING BRANCH */}

                        <div className="form-group">

                            <label>
                                Engineering Branch
                            </label>

                            <select
                                name="branch"
                                value={
                                    formData.branch
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select Branch
                                </option>

                                <option value="Civil Engineering">
                                    Civil Engineering
                                </option>

                                <option value="Mechanical Engineering">
                                    Mechanical Engineering
                                </option>

                                <option value="Electrical Engineering">
                                    Electrical Engineering
                                </option>

                                <option value="Computer Engineering">
                                    Computer Engineering
                                </option>

                                <option value="Environmental Engineering">
                                    Environmental Engineering
                                </option>

                            </select>

                        </div>


                        {/* QUALIFICATION */}

                        <div className="form-group">

                            <label>
                                Highest Qualification
                            </label>

                            <select
                                name="qualification"
                                value={
                                    formData.qualification
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select Qualification
                                </option>

                                <option value="B.E.">
                                    B.E.
                                </option>

                                <option value="B.Tech">
                                    B.Tech
                                </option>

                                <option value="M.E.">
                                    M.E.
                                </option>

                                <option value="M.Tech">
                                    M.Tech
                                </option>

                                <option value="Diploma">
                                    Diploma in Engineering
                                </option>

                                <option value="Ph.D.">
                                    Ph.D.
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>


                            {formData.qualification ===
                                "Other" && (

                                <input
                                    type="text"
                                    name="otherQualification"
                                    value={
                                        formData.otherQualification
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your qualification"
                                    required
                                />

                            )}

                        </div>


                        {/* EXPERIENCE */}

                        <div className="form-group">

                            <label>
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                name="experience"
                                min="0"
                                value={
                                    formData.experience
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter Experience"
                            />

                        </div>


                        {/* DEPARTMENT */}

                        <div className="form-group">

                            <label>
                                Preferred Department
                            </label>

                            <select
                                name="department"
                                value={
                                    formData.department
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                disabled={
                                    departmentLoading ||
                                    departments.length === 0
                                }
                            >

                                <option value="">

                                    {departmentLoading
                                        ? "Loading Departments..."
                                        : "Select Department"}

                                </option>


                                {departments.map(
                                    (department) => (

                                        <option
                                            key={
                                                department.departmentId
                                            }
                                            value={
                                                department.name
                                            }
                                        >

                                            {
                                                department.name
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        DOCUMENTS
                    ================================================= */}

                    <div className="section-title">

                        Upload Documents

                    </div>


                    <div className="form-grid">


                        {/* PASSPORT PHOTO */}

                        <div className="form-group">

                            <label>
                                Passport Size Photo
                            </label>

                            <input
                                type="file"
                                name="photo"
                                onChange={
                                    handleChange
                                }
                                accept="image/*"
                                required
                            />

                        </div>


                        {/* DEGREE */}

                        <div className="form-group">

                            <label>
                                Degree Certificate
                            </label>

                            <input
                                type="file"
                                name="degree"
                                onChange={
                                    handleChange
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                            />

                        </div>


                        {/* EXPERIENCE CERTIFICATE */}

                        <div className="form-group full-width">

                            <label>
                                Experience Certificate
                                <span>
                                    {" "} (Optional)
                                </span>
                            </label>

                            <input
                                type="file"
                                name="experienceCertificate"
                                onChange={
                                    handleChange
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ACCOUNT INFORMATION
                    ================================================= */}

                    <div className="section-title">

                        Account Information

                    </div>


                    <div className="form-grid">


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                value="FixMy@123"
                                readOnly
                            />

                            <small>
                                Default password will be
                                assigned by the system.
                            </small>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="form-group">

                            <label>
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value="FixMy@123"
                                readOnly
                            />

                        </div>

                    </div>


                    {/* =================================================
                        DECLARATION
                    ================================================= */}

                    <div className="checkbox-area">

                        <input
                            type="checkbox"
                            name="declaration"
                            checked={
                                formData.declaration
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <span>
                            I declare that the above
                            information is true.
                        </span>

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="button-group">


                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={
                                submitting ||
                                departmentLoading
                            }
                        >

                            {submitting
                                ? "Submitting..."
                                : "Submit"}

                        </button>


                        <button
                            type="button"
                            className="reset-btn"
                            onClick={
                                handleReset
                            }
                            disabled={
                                submitting
                            }
                        >

                            Reset

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EngineerRequest;