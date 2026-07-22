import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaUserCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Dashboard.css";


const recentComplaints = [
  {
    id: "CMP-101",
    category: "Road Damage",
    date: "12 Jul 2026",
    status: "Pending",
    latitude: "23.0225",
    longitude: "72.5714",
  },
  {
    id: "CMP-102",
    category: "Garbage Collection",
    date: "14 Jul 2026",
    status: "In Progress",
    latitude: "23.0258",
    longitude: "72.5870",
  },
  {
    id: "CMP-103",
    category: "Water Leakage",
    date: "15 Jul 2026",
    status: "Resolved",
    latitude: "23.0300",
    longitude: "72.5700",
  },
];



export default function Dashboard() {



  return (

    <div className="user-dashboard">


      {/* ================= Welcome Section ================= */}

      <div className="welcome-card">


        <div>


          <h1>
            Welcome back, Trupal 👋
          </h1>


          <p>
            Thank you for helping keep your city clean and safe.
            Manage your complaints and services from one place.
          </p>


          <div className="system-status">

            <span className="status-dot"></span>

            2 Complaints Currently Active

          </div>


          <div className="citizen-info">


            <span>
              Citizen ID : CIT-2026-101
            </span>


            


          </div>
        </div>



        <FaUserCircle className="welcome-avatar"/>


      </div>





      {/* ================= Statistics ================= */}


      <div className="stats-grid">


        <div className="stats-card">


          <div className="stats-icon">

            <FaClipboardList/>

          </div>


          <h2>
            12
          </h2>


          <p>
            Total Complaints
          </p>


        </div>




        <div className="stats-card">


          <div className="stats-icon warning">

            <FaClock/>

          </div>


          <h2>
            3
          </h2>


          <p>
            Pending
          </p>


        </div>





        <div className="stats-card">


          <div className="stats-icon progress">

            <FaSpinner/>

          </div>


          <h2>
            5
          </h2>


          <p>
            In Progress
          </p>


        </div>





        <div className="stats-card">


          <div className="stats-icon success">

            <FaCheckCircle/>

          </div>


          <h2>
            4
          </h2>


          <p>
            Resolved
          </p>


        </div>


      </div>

<div className="dashboard-box full-map-section">


    <div className="box-header">


        <h2>
            Complaint Location Tracking
        </h2>


        <FaMapMarkerAlt/>


    </div>



    <div className="map-container">


        <MapContainer

            center={[
                Number(recentComplaints[0].latitude),
                Number(recentComplaints[0].longitude)
            ]}

            zoom={13}

            style={{
                height:"100%",
                width:"100%"
            }}

        >



            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                attribution="&copy; OpenStreetMap contributors"

            />




            {
                recentComplaints.map((complaint)=>(


                    <Marker

                        key={complaint.id}

                        position={[
                            Number(complaint.latitude),
                            Number(complaint.longitude)
                        ]}

                    >



                        <Popup>


                            <div>


                                <h4>
                                    {complaint.id}
                                </h4>


                                <p>
                                    <b>
                                    Category:
                                    </b>
                                    {" "}
                                    {complaint.category}
                                </p>



                                <p>
                                    <b>
                                    Status:
                                    </b>
                                    {" "}
                                    {complaint.status}
                                </p>



                                <p>
                                    <b>
                                    Latitude:
                                    </b>
                                    {" "}
                                    {complaint.latitude}
                                </p>



                                <p>
                                    <b>
                                    Longitude:
                                    </b>
                                    {" "}
                                    {complaint.longitude}
                                </p>


                            </div>



                        </Popup>



                    </Marker>



                ))
            }



        </MapContainer>



    </div>



</div>
    </div>
  );
}