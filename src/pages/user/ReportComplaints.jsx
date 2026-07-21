import { useState } from "react";
import "../../styles/ReportComplaint.css";
import "../../styles/LocationPicker.css";
import LocationPicker from "../../pages/LocationPicker";

function ReportComplaint() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    category: "",
    otherCategory: "",
    description: "",
    address: "",
    landmark: "",
    pincode: "",
    latitude: "",
    longitude: "",
    images: [],
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Handle multiple image upload (Max 3)
    if (type === "file") {
      const selectedImages = Array.from(files);

      setFormData((prev) => {
        let updatedImages = [...prev.images];

        for (const image of selectedImages) {
          if (updatedImages.length < 3) {
            updatedImages.push(image);
          }
        }

        if (updatedImages.length === 3 && selectedImages.length > (3 - prev.images.length)) {
          alert("Maximum 3 images are allowed.");
        }

        return {
          ...prev,
          images: updatedImages,
        };
      });

      // Clear file input so the same image can be selected again if removed
      e.target.value = "";

      return;
    }

    // Handle other inputs
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation if required
    alert("success...");
    // Call API to send OTP


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
          <div className="grid-2">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
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
            <label>Complaint Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Road Damage</option>
              <option>Water Leakage</option>
              <option>Garbage Collection</option>
              <option>Street Light Issue</option>
              <option>Drainage Problem</option>
              <option>Traffic Signal Issue</option>
              <option>Illegal Parking</option>
              <option>Public Safety</option>
              <option>Other</option>
            </select>
          </div>

         
          </div>

          {/* Complaint Details */}
 {formData.category === "Other" && (
            <div className="form-group">
              <label>Specify Complaint Category</label>

              <input
                type="text"
                name="otherCategory"
                placeholder="Enter Complaint Category"
                value={formData.otherCategory}
                onChange={handleChange}
              />
            </div>
          )}
          

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Describe the issue..."
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

            {/* <div className="form-group">
              <label>Nearest Landmark</label>

              <input
                type="text"
                name="landmark"
                placeholder="Example: Near D-Mart"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div> */}

          </div>

          

          {/* Upload */}

          <div className="form-group">

    <label>
        Upload Complaint Images
    </label>

    <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleChange}
    />

    <small className="upload-note">
        Maximum 3 images (JPG, PNG, JPEG)
    </small>

</div>
<div className="preview-grid">
  {formData.images.map((image, index) => (
    <div className="preview-card" key={index}>

      <button
        type="button"
        className="remove-image"
        onClick={() => removeImage(index)}
      >
        ×
      </button>

      <img
        src={URL.createObjectURL(image)}
        alt={`Preview ${index + 1}`}
      />

    </div>
  ))}
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
              I confirm that the information provided is correct.
            </span>

          </div>

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