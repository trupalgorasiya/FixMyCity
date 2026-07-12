import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/dashbord.css"
import "../styles/EditProfile.css";
import {FaUser,FaEnvelope,FaPhoneAlt,FaCamera,FaSave,FaTimes} from "react-icons/fa";

function EditProfile(){

const navigate=useNavigate();

const [user,setUser]=useState({
firstName:"John",
lastName:"Doe",
email:"john.doe@gmail.com",
mobile:"9876543210",
profileImage:"https://via.placeholder.com/150"
});

const handleChange=(e)=>{
const{name,value}=e.target;
setUser({...user,[name]:value});
};

const handleImageChange=(e)=>{
const file=e.target.files[0];
if(file){
setUser({
...user,
profileImage:URL.createObjectURL(file)
});
}
};

const handleSubmit=(e)=>{
e.preventDefault();
console.log(user);
// Later call Spring Boot API here
// axios.put("/api/profile",user);
navigate(-1);
};

return(

<div className="edit-profile-page">

<div className="edit-profile-card">

<h2>Edit Profile</h2>

<form onSubmit={handleSubmit}>

<div className="profile-image-section">

<img
src={user.profileImage || "../assets/default-profile.png"}
alt="Profile"
className="edit-profile-image"
/>

<label className="upload-btn">
<FaCamera/>
<span>Change Photo</span>
<input
type="file"
accept="image/*"
onChange={handleImageChange}
hidden
/>
</label>

</div>

<div className="edit-profile-grid">

<div className="form-group">
<label>First Name</label>
<div className="input-box">
<FaUser/>
<input
type="text"
name="firstName"
value={user.firstName}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group">
<label>Last Name</label>
<div className="input-box">
<FaUser/>
<input
type="text"
name="lastName"
value={user.lastName}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group full-width">
<label>Email Address</label>
<div className="input-box readonly">
<FaEnvelope/>
<input
type="email"
name="email"
value={user.email}
readOnly
/>
</div>
</div>

<div className="form-group full-width">
<label>Mobile Number</label>
<div className="input-box">
<FaPhoneAlt/>
<input
type="tel"
name="mobile"
value={user.mobile}
onChange={handleChange}
required
/>
</div>
</div>

</div>

<div className="edit-profile-actions">

<button
type="button"
className="cancel-btn"
onClick={()=>navigate(-1)}
>
<FaTimes/>
<span>Cancel</span>
</button>

<button
type="submit"
className="dashboard-btn"
>
<FaSave/>
<span>Save Changes</span>
</button>

</div>

</form>

</div>

</div>

);

}

export default EditProfile;