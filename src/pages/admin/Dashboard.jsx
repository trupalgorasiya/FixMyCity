
import "./AdminDashboard.css";

import {
  FaUsers,
  FaClipboardList,
  FaBuilding,
  FaUserCog,
  FaChartLine,
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

  const department_name = [
    {
      name: "Solid Waste Management",
      value:50
    },
     {
      name: "Water Project & Water Operation",
      value:85
    },
     {
      name: "Drainage",
      value:78
    },
     {
      name: "Light & Traffic",
      value:45
    },
     {
      name: "Ahmedabad Municipal Transport Service (AMTS)",
      value:12
    },
     {
      name: "Bus Rapid Transit System (BRTS / Ahmedabad Janmarg Ltd)",
      value:78
    },
     {
      name: "Fire & Emergency Services",
      value:95
    },
     {
      name: "Parks and Gardens",
      value:73
    },
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

            <h3>Department Performance</h3>
            <br></br>
            {department_name.map((dept,index)=>
              <div className="department-progress" key={index}>

                <div className="progress-header">
                  <span>{dept.name}</span>
                  <span>{dept.value}%</span>
                </div>
                

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${dept.value}%`,
                   backgroundColor: dept.value < 25 ? "#ef4444" : dept.value >= 70 ? "#22c55e" : "#f59e0b"
                  }}
                  ></div>
                </div>

              </div>
            )}
           

            

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;