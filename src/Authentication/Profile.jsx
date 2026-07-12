import "../styles/dashbord.css"
import "../styles/Profile.css";
import imgs from "../assets/default-profile.jpeg"
import {FaUser,FaEnvelope,FaPhoneAlt,FaUserEdit,FaLock} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile(){

const user={
firstName:"John",
lastName:"Doe",
email:"john.doe@gmail.com",
mobile:"9876543210",
role:"Administrator",
profileImage:"https://via.placeholder.com/150"
};
const navigate = useNavigate();
return(
    <div className="profile-page">

        <div className="profile-card">

            <div className="profile-header">
                <img
                    src={user.profileImage || {imgs}}
                    alt="Profile"
                    className="profile-image"
                />
                <h2>{user.firstName} {user.lastName}</h2>
                <span className="profile-role">{user.role}</span>
            </div>

        <div className="profile-details">

            <div className="profile-row">
                <div className="profile-label">
                    <FaUser/>
                        <span>First Name</span>
                </div>
                <div className="profile-value">
                    {user.firstName}
                </div>
            </div>

        <div className="profile-row">
            <div className="profile-label">
                <FaUser/>
                <span>Last Name</span>
            </div>
            <div className="profile-value">
                {user.lastName}
            </div>
        </div>

        <div className="profile-row">
            <div className="profile-label">
                <FaEnvelope/>
                <span>Email</span>
            </div>
        <div className="profile-value">
                {user.email}
            </div>
        </div>

<div className="profile-row">
<div className="profile-label">
<FaPhoneAlt/>
<span>Mobile Number</span>
</div>
<div className="profile-value">
{user.mobile}
</div>
</div>

</div>

<div className="profile-actions">
<button
className="change-password-btn"
onClick={() => navigate("../edit-profile")}
><FaUserEdit/>
<span>Edit Profile</span>
</button>

<button
className="change-password-btn"
onClick={() => navigate("/change-password")}
>
<FaLock/>
<span>Change Password</span>
</button>
</div>

</div>

</div>
);

}

export default Profile;