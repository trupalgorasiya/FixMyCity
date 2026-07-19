
import "./AdminDashboard.css";

import {
  FaUsers,
  FaClipboardList,
  FaBuilding,
  FaUserCog,
  FaChartLine,
  FaFileAlt,
  FaMapMarkerAlt
} from "react-icons/fa";
import {
 MapContainer,
 TileLayer,
 Marker,
 Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";


const createMarkerIcon = (color)=>{

return new L.DivIcon({

html:`

<div class="complaint-marker"
style="
background:${color};
">
</div>

`,

className:"custom-marker",

iconSize:[30,30],

iconAnchor:[15,15]

});

};



const complaintIcons = {

Pending:createMarkerIcon("#ef4444"),

Assigned:createMarkerIcon("#f59e0b"),

Resolved:createMarkerIcon("#22c55e")

};



function Dashboard() {
const complaintLocations = [

{
id:"CMP-1001",
category:"Road Damage",
status:"Pending",
location:"Satellite Ahmedabad",
latitude:23.0225,
longitude:72.5714
},


{
id:"CMP-1002",
category:"Garbage",
status:"Assigned",
location:"Navrangpura Ahmedabad",
latitude:23.0358,
longitude:72.5618
},


{
id:"CMP-1003",
category:"Water Leakage",
status:"Resolved",
location:"Bopal Ahmedabad",
latitude:23.0396,
longitude:72.4651
},


{
id:"CMP-1004",
category:"Street Light",
status:"Pending",
location:"Maninagar Ahmedabad",
latitude:22.9950,
longitude:72.6030
}


];
  const recentComplaints = [
    { id: "CMP-1001", category: "Road Damage", status: "Pending" },
    { id: "CMP-1002", category: "Garbage", status: "Assigned" },
    { id: "CMP-1003", category: "Water Leakage", status: "Resolved" },
    { id: "CMP-1004", category: "Street Light", status: "Pending" }
  ];

  const dashboardStats = [
  {
    title: "Total Complaints",
    value: "2,156",
    icon: <FaClipboardList />,
    color: "#2563eb",
    bg: "#eff6ff"
  },
  {
    title: "Total Users",
    value: "12,458",
    icon: <FaUsers />,
    color: "#16a34a",
    bg: "#ecfdf5"
  },
  {
    title: "Departments",
    value: "12",
    icon: <FaBuilding />,
    color: "#9333ea",
    bg: "#f3e8ff"
  },
  {
    title: "Engineers",
    value: "48",
    icon: <FaUserCog />,
    color: "#ea580c",
    bg: "#fff7ed"
  }
];

  return (

    <div className="admin-dashboard">

      <div className="welcome-card">

        <div>

          <h1>Welcome Back, Administrator 👋</h1>

          <p>
            Monitor complaints, departments, engineers and system analytics from one place.
          </p>

          <div className="system-status">

            <span className="status-dot"></span>

            <span>System Status : Online</span>

          </div>

        </div>

        <button className="dashboard-btn">
          Generate Report
        </button>

      </div>

      <div className="stats-grid">

  {dashboardStats.map((card, index) => (

    <div
      className="stats-card"
      key={index}
    >

      <div
        className="stats-icon"
        style={{
          background: card.bg,
          color: card.color
        }}
      >
        {card.icon}
      </div>

      <div className="stats-content">

        <h2>{card.value}</h2>

        <p>{card.title}</p>

      </div>

    </div>

  ))}

</div>
      <div className="admin-dashboard-grid">

        <div className="left-panel">

         <div className="dashboard-box">

<h2>
<FaMapMarkerAlt/>
{" "}Complaint Location Map
</h2>


<div className="admin-map">


<MapContainer

center={[23.0225,72.5714]}

zoom={12}

style={{
height:"400px",
width:"100%",
borderRadius:"15px"
}}

>


<TileLayer

url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>



{
complaintLocations.map((item)=>(

<Marker

key={item.id}

position={[
item.latitude,
item.longitude
]}

icon={complaintIcons[item.status]}

>


<Popup>

<h3>{item.id}</h3>

<p>
Category : {item.category}
</p>

<p>
Location : {item.location}
</p>

<p>
Status :
<span className={`status ${item.status.toLowerCase()}`}>
{item.status}
</span>
</p>

</Popup>


</Marker>

))

}



</MapContainer>


</div>


<div className="map-legends">


<div>
<span className="legend-dot pending"></span>
Pending
</div>


<div>
<span className="legend-dot assigned"></span>
Assigned
</div>


<div>
<span className="legend-dot resolved"></span>
Resolved
</div>


</div>


</div>




<div className="dashboard-box">


<h2>

<FaChartLine/>

{" "}Monthly Complaint Analytics

</h2>


<div className="chart-placeholder">

📈 Analytics Chart

</div>


</div>

          {/* <div className="dashboard-box">

            <h2>
              <FaFileAlt />
              {" "}Recent Complaints
            </h2>
            <div className="table-wrapper">
              <table className="dashboard-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {recentComplaints.map((item) => (

                    <tr key={item.id}>

                      <td>{item.id}</td>

                      <td>{item.category}</td>

                      <td>

                        <span
  className={`status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}
>
  {item.status}
</span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
            </div>

          </div> */}

        </div>
                <div className="right-panel">

          <div className="dashboard-box">

            <h2>Department Performance</h2>

            <div className="department-progress">

              <div className="progress-header">
                <span>Road Department</span>
                <span>95%</span>
              </div>
              

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "95%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Sanitation Department</span>
                <span>82%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "82%" }}
                ></div>
              </div>

            </div>
            <div className="department-progress">

              <div className="progress-header">
                <span>Water Department</span>
                <span>20%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "20%" }}
                ></div>
              </div>

            </div>
            <div className="department-progress">

              <div className="progress-header">
                <span>Garden Department</span>
                <span>60%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "60%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Electric Department</span>
                <span>69%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "69%" }}
                ></div>
              </div>

            </div>

            <div className="department-progress">

              <div className="progress-header">
                <span>Garbage Department</span>
                <span>91%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "91%" }}
                ></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;