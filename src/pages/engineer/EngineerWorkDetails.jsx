import { useState } from "react";
import { useParams, useLocation  } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
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
  FaClock,
  FaTools
} from "react-icons/fa";

function EngineerWorkDetails() {

  const {id} = useParams();
  const location = useLocation();
  const complaintData = location.state;
  const complaint = {

id: complaintData?.id || id,
citizen: complaintData?.username,
email: complaintData?.email,
phone: complaintData?.phone,
category:"Road Damage",
priority: complaintData?.priority,
address:"Satellite, Ahmedabad, Gujarat",
pincode:"380015",
latitude:23.0225,
longitude:72.5714,
description:"Large pothole causing traffic problems near main road.",
engineer:"Amit Patel"
};
  const [status,setStatus] = useState("Assigned");
  const [beforeImages,setBeforeImages] =useState([]);
  const [afterImages,setAfterImages] =useState([]);
  const [uploadedBefore,setUploadedBefore] = useState(false);
  const [uploadedAfter,setUploadedAfter] = useState(false);
  const [remarks,setRemarks] =useState("");
  const validateFiles = (files)=>{


 if(files.length > 3){

   alert("Maximum 3 files allowed");

   return false;

 }


 const allowedFiles = files.every(file =>

    file.type.startsWith("image/") ||
    file.type.startsWith("video/") ||
    file.type === "application/pdf"

 );


 if(!allowedFiles){

    alert(
      "Only Image, Video and PDF files allowed"
    );

    return false;

 }


 return true;


};

const handleBeforeUpload = (e)=>{
 const files = Array.from(e.target.files);
 if(validateFiles(files)){
    setBeforeImages(files);
    setUploadedBefore(false);
 }

};
const handleAfterUpload = (e)=>{
 const files = Array.from(e.target.files);

 if(validateFiles(files)){
    setAfterImages(files);
    setUploadedAfter(false);
 }
};
  const previewImage = (file)=>{
    return URL.createObjectURL(file);
  };
  const updateStatus=(value)=>{
    setStatus(value);
  };
  const saveWork=()=>{
    alert(
      "Complaint updated successfully"
    );
  };
const submitBeforeImages = ()=>{
 if(beforeImages.length === 0){
   alert("Please select before work files");
   return;
 }
 setUploadedBefore(true);
 alert(
  "Before work images uploaded successfully"
 );
};
const submitAfterImages = ()=>{
 if(afterImages.length === 0){
   alert("Please select after work files");
   return;
 }
 setUploadedAfter(true);
 alert(
  "After work images uploaded successfully"
 );
};

const removeBeforeFile=(index)=>{
 const updated =
 beforeImages.filter(
 (_,i)=>i !== index
 );
 setBeforeImages(updated);
};

const removeAfterFile=(index)=>{
 const updated =
 afterImages.filter(
 (_,i)=>i !== index
 );
 setAfterImages(updated);
};
  return (

    <div className="engineer-work-page">

      <div className="work-header">

        <div>

          <h1>
            Engineer Work Details
          </h1>
          <p>
            Update complaint progress,
            upload evidence and complete work.
          </p>

        </div>
      </div>
      <div className="work-card">
        <div className="card-title">
          <FaTools/>
          Complaint Information
        </div>
        <div className="details-grid">
          <div className="detail-box">
            <label>
              Complaint ID
            </label>
            <span>
              {complaint.id}
            </span>
          </div>
          <div className="detail-box">
            <label>
              Category
            </label>
            <span>
              {complaint.category}
            </span>
          </div>
          <div className="detail-box">
            <label>
              Citizen
            </label>

            <span>
              <FaUser/>
              {complaint.citizen}
            </span>

          </div>



          <div className="detail-box">

            <label>
              Phone
            </label>

            <span>
              <FaPhone/>
              {complaint.phone}
            </span>

          </div>



          <div className="detail-box">

            <label>
              Email
            </label>

            <span>
              <FaEnvelope/>
              {complaint.email}
            </span>

          </div>



          <div className="detail-box">

            <label>
              Priority
            </label>


            <span className="priority high">

              {complaint.priority}

            </span>


          </div>


        </div>



        <div className="description-box">

          <label>
            Complaint Description
          </label>


          <p>
            {complaint.description}
          </p>


        </div>


      </div>
         


      <div className="work-card">


        <div className="card-title">

          <FaMapMarkerAlt />

          Complaint Location

        </div>



        <div className="location-container">


          <div className="address-content">


<h3>
 Selected Address
</h3>


<p>
 <FaMapMarkerAlt/>

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


          <div className="map-box">


<MapContainer

center={[
complaint.latitude,
complaint.longitude
]}

zoom={15}

style={{
height:"300px",
width:"100%"
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

<br/>

Pincode:
{complaint.pincode}

</Popup>


</Marker>


</MapContainer>


</div>


        </div>


      </div>


      <div className="work-card">


        <div className="card-title">

          <FaUpload />

          Before Work Images

        </div>



        <p className="section-description">

          Upload images before starting the repair work.

        </p>



        <div className="upload-area">


          <input

            type="file"

            id="before-upload"

            multiple

            accept="image/*,video/*,.pdf"

            onChange={handleBeforeUpload}

          />



          <label htmlFor="before-upload">


            <FaUpload />


            <span>
              Upload Before Images
            </span>


            <small>
              PNG, JPG, JPEG supported
            </small>


          </label>


        </div>



      {
beforeImages.length > 0 && (

<div>


<button
className="upload-submit-btn"
onClick={submitBeforeImages}
>
Upload Before Files
</button>
{
uploadedBefore &&

<p className="upload-success">
✓ Before files uploaded successfully
</p>

}


<div className="image-preview">


{
beforeImages.map((image,index)=>(


<div
className="image-card"
key={index}
>


{
image.type.startsWith("image") &&

<img
src={previewImage(image)}
alt="before"
/>

}



{
image.type.startsWith("video") &&

<video
controls
src={previewImage(image)}
/>

}



{
image.type==="application/pdf" &&

<div className="pdf-preview">

PDF File

</div>

}



<p>
Before {index+1}
</p>


<button

className="remove-file"

onClick={()=>
removeBeforeFile(index)
}

>

Remove

</button>


</div>


))
}


</div>


</div>

)
}

      </div>
      <div className="work-card">
        <div className="card-title">
          <FaClock />
          Update Work Status
        </div>

        <div className="status-selector">
          <button
            className={
              status==="Assigned"
              ?
              "active-status"
              :
              ""
            }
            onClick={()=>updateStatus("Assigned")}
          >
            Assigned
          </button>

          <span>
            →
          </span>
          <button
            className={
              status==="In Progress"
              ?
              "active-status"
              :
              ""
            }


            onClick={()=>
              updateStatus("In Progress")
            }


          >

            In Progress

          </button>




          <span>
            →
          </span>




          <button


            className={
              status==="Completed"
              ?
              "active-status"
              :
              ""
            }



            onClick={()=>
              updateStatus("Completed")
            }



          >

            Completed

          </button>



        </div>



      </div>





   



      <div className="work-card">


        <div className="card-title">


          <FaCheckCircle />


          After Work Images


        </div>




        <p className="section-description">

          Upload final images after completing work.

        </p>




        <div className="upload-area">



          <input


            type="file"


            id="after-upload"


            multiple


            accept="image/*,video/*,.pdf"


            onChange={handleAfterUpload}


          />




          <label htmlFor="after-upload">


            <FaUpload />


            <span>

              Upload Completed Work Images

            </span>


            <small>

              Show repaired condition

            </small>


          </label>



        </div>





        {


          afterImages.length > 0 && (
<button

className="upload-submit-btn"

onClick={submitAfterImages}

>

Upload Completed Files

</button>

)
}

            <div className="image-preview">



              {

                afterImages.map((image,index)=>(


                  <div

                    className="image-card"

                    key={index}

                  >


                    <img

                      src={
                        previewImage(image)
                      }


                      alt="after"


                    />



                    <p>

                      After {index+1}

                    </p>



                  </div>



                ))


              }



            </div>



          


        



      </div>
            


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

            onChange={(e)=>
              setRemarks(e.target.value)
            }

          />


        </div>



      </div>




      <div className="work-card">


        <div className="card-title">

          <FaCheckCircle />

          Work Summary

        </div>




        <div className="summary-grid">


          <div className="summary-box">

            <label>
              Current Status
            </label>

            <strong>
              {status}
            </strong>

          </div>




          <div className="summary-box">

            <label>
              Engineer
            </label>

            <strong>
              {complaint.engineer}
            </strong>

          </div>




          <div className="summary-box">

            <label>
              Before Images
            </label>

            <strong>
              {beforeImages.length}
            </strong>

          </div>




          <div className="summary-box">

            <label>
              After Images
            </label>

            <strong>
              {afterImages.length}
            </strong>

          </div>



        </div>



      </div>






      <div className="work-actions">



        <button

          className="save-btn"

          onClick={saveWork}

        >

          Save Draft

        </button>




        <button

          className="complete-btn"

          onClick={()=>{


            setStatus("Completed");

            alert(
              "Complaint marked as completed"
            );


          }}

        >

          <FaCheckCircle />

          Complete Work


        </button>



      </div>



    </div>


  );

}


export default EngineerWorkDetails;