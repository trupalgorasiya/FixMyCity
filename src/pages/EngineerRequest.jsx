import  { useState } from "react";
import "../styles/EngineerRequest.css";

const EngineerRequest = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        address: "",
        qualification: "",
        branch: "",
        experience: "",
        department: "",
        username: "",
        password: "",
        confirmPassword: "",
        photo: null,
        degree: null,
        experienceCertificate: null,
        declaration: false
    });

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files[0]
                    : value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!formData.declaration) {
            alert("Please accept declaration.");
            return;
        }

        console.log(formData);

        alert("Engineer Request Submitted Successfully!");
    };

    const handleReset = () => {
        setFormData({
            fullName: "",
            mobile: "",
            email: "",
            address: "",
            qualification: "",
            branch: "",
            experience: "",
            department: "",
            username: "",
            password: "",
            confirmPassword: "",
            photo: null,
            degree: null,
            experienceCertificate: null,
            declaration: false
        });
    };

    return (

        <div className="engineer-request-page">

            <div className="request-card">

                <div className="request-header">

                    <h2>Engineer Registration</h2>

                    <p>
                        Submit your request to join the selected department.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Personal Information */}

                    <div className="section-title">
                        Personal Information
                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter Full Name"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Mobile Number</label>

                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                required
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Address</label>

                            <textarea
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter Address"
                            />

                        </div>

                    </div>

                    {/* Professional */}

                    <div className="section-title">
                        Professional Information
                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Engineering Branch</label>

                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Branch
                                </option>

                                <option>Civil Engineering</option>

                                <option>Mechanical Engineering</option>

                                <option>Electrical Engineering</option>

                                <option>Computer Engineering</option>

                                <option>Environmental Engineering</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Highest Qualification</label>

                            <select
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Qualification
                                </option>

                                <option>B.E.</option>

                                <option>B.Tech</option>

                                <option>M.E.</option>

                                <option>M.Tech</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Experience (Years)</label>

                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Preferred Department</label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option>Road Department</option>

                                <option>Water Department</option>

                                <option>Electrical Department</option>

                                <option>Waste Management</option>

                            </select>

                        </div>

                    </div>

                    {/* Documents */}

                    <div className="section-title">
                        Upload Documents
                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Passport Size Photo</label>

                            <input
                                type="file"
                                name="photo"
                                onChange={handleChange}
                                accept="image/*"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Degree Certificate</label>

                            <input
                                type="file"
                                name="degree"
                                onChange={handleChange}
                                accept=".pdf,.jpg,.png"
                                required
                            />

                        </div>

                        <div className="form-group full-width">

                            <label>Experience Certificate (Optional)</label>

                            <input
                                type="file"
                                name="experienceCertificate"
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Login */}

                    <div className="section-title">
                        Account Information
                    </div>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    {/* Declaration */}

                    <div className="checkbox-area">

                        <input
                            type="checkbox"
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleChange}
                        />

                        <span>
                            I declare that the above information is true.
                        </span>

                    </div>

                    {/* Buttons */}

                    <div className="button-group">

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Submit
                        </button>

                        <button
                            type="button"
                            className="reset-btn"
                            onClick={handleReset}
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