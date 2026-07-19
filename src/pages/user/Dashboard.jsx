import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaBell,
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


const notifications = [
  {
    id:1,
    message:"Complaint #CMP-102 assigned to department.",
    time:"2 hours ago"
  },
  {
    id:2,
    message:"Engineer started working on Water Leakage.",
    time:"5 hours ago"
  },
  {
    id:3,
    message:"Complaint #CMP-103 has been resolved.",
    time:"Yesterday"
  }
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
            {/* ================= Main Dashboard Grid ================= */}


      <div className="dashboard-grid">



        {/* ================= Complaint Management ================= */}


        <div className="left-panel">



          <div className="dashboard-box">



            <div className="box-header">


              <h2>
                Complaint Management
              </h2>


              <button className="dashboard-btn-outline">

                View All

              </button>


            </div>





            <div className="table-wrapper">


              <table className="complaint-table">


                <thead>


                  <tr>

                    <th>
                      Complaint ID
                    </th>


                    <th>
                      Category
                    </th>


                    <th>
                      Date
                    </th>


                    <th>
                      Status
                    </th>


                    


                  </tr>


                </thead>




                <tbody>



                  {
                    recentComplaints.map((item)=>(



                      <tr key={item.id}>


                        <td>
                          {item.id}
                        </td>



                        <td>
                          {item.category}
                        </td>



                        <td>
                          {item.date}
                        </td>




                        <td>


                          <span
                            className={`status ${
                              item.status
                              .toLowerCase()
                              .replace(" ","-")
                            }`}
                          >

                            {item.status}

                          </span>


                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          </div>

          <div className="dashboard-box">
            <div className="box-header">
              <h2>
                Notifications
              </h2>
              <FaBell className="box-header-icon"/>
            </div>
            <ul className="notification-list">
              {
                notifications.map((notification)=>(
                  <li key={notification.id}>
                    <div className="notification-icon">
                      <FaBell/>
                    </div>
                    <div className="notification-content">


                      <h4>
                        {notification.message}
                      </h4>

                      <p className="notification-time">
                        {notification.time}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

            </div>



      {/* ================= Complaint Location ================= */}



      {/* ================= Complaint Location ================= */}


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