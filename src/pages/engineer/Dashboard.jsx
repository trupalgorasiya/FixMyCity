import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import {
  FaClipboardList,
  FaCheckCircle,
  FaTools,
  FaClock,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaTimes,
  FaCamera
} from "react-icons/fa";


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";


import L from "leaflet";
import "leaflet/dist/leaflet.css";


// ===============================
// CUSTOM MAP LOCATION ICON
// ===============================

const createMarkerIcon = (color)=>{

return new L.DivIcon({

html:`

<div 
class="complaint-marker"
style="
background:${color};
">
</div>

`,

className:"custom-marker"

});

};



// ===============================
// STATUS BASED MAP ICONS
// ===============================

const complaintIcons = {

  Pending:createMarkerIcon("#ef4444"),

  Assigned:createMarkerIcon("#f59e0b"),

  "In Progress":createMarkerIcon("#9333ea"),

  Completed:createMarkerIcon("#22c55e")

};





function Dashboard() {

  const navigate = useNavigate();
  // ===============================
  // CURRENT LOGIN ENGINEER
  // ===============================

  const loggedEngineer = "Amit Patel";




  // ===============================
  // DASHBOARD STATISTICS
  // ===============================


  const dashboardStats = [

    {
      title:"Assigned",
      value:18,
      icon:<FaClipboardList />,
      color:"#2563eb",
      bg:"#eff6ff"
    },


    {
      title:"Pending",
      value:5,
      icon:<FaClock />,
      color:"#d97706",
      bg:"#fff7ed"
    },


    {
      title:"In Progress",
      value:8,
      icon:<FaTools />,
      color:"#9333ea",
      bg:"#f3e8ff"
    },


    {
      title:"Completed",
      value:34,
      icon:<FaCheckCircle />,
      color:"#16a34a",
      bg:"#ecfdf5"
    }

  ];





  // ===============================
  // COMPLAINT DATA
  // Later this comes from backend API
  // ===============================


  const complaintData = [

    {
      id:"CMP-1001",
      citizen:"Rahul Patel",
      category:"Road Damage",
      priority:"High",
      status:"Pending",
      engineer:"Amit Patel",
      date:"17 Jul 2026",
      address:"Satellite, Ahmedabad",
      description:
      "Large potholes near the bridge causing traffic issues.",
      latitude:23.0225,
      longitude:72.5714
    },



    {
      id:"CMP-1002",
      citizen:"Amit Shah",
      category:"Water Leakage",
      priority:"Medium",
      status:"In Progress",
      engineer:"Amit Patel",
      date:"17 Jul 2026",
      address:"Maninagar, Ahmedabad",
      description:
      "Water pipeline leakage near the main road.",
      latitude:22.9950,
      longitude:72.6030
    },



    {
      id:"CMP-1003",
      citizen:"Neha Joshi",
      category:"Street Light",
      priority:"Low",
      status:"Completed",
      engineer:"Amit Patel",
      date:"16 Jul 2026",
      address:"Navrangpura, Ahmedabad",
      description:
      "Street lights are not working during night.",
      latitude:23.0358,
      longitude:72.5618
    },



    {
      id:"CMP-1004",
      citizen:"Karan Mehta",
      category:"Garbage",
      priority:"High",
      status:"Pending",
      engineer:"Amit Patel",
      date:"17 Jul 2026",
      address:"Bopal, Ahmedabad",
      description:
      "Garbage collection has not been done for three days.",
      latitude:23.0396,
      longitude:72.4651
    },



    {
      id:"CMP-1005",
      citizen:"Priya Desai",
      category:"Drainage",
      priority:"Medium",
      status:"Assigned",
      engineer:"Amit Patel",
      date:"17 Jul 2026",
      address:"Naranpura, Ahmedabad",
      description:
      "Drainage overflow due to heavy rainfall.",
      latitude:23.0655,
      longitude:72.5595
    }


  ];





  // ===============================
  // STATES
  // ===============================


  const [search,setSearch] = useState("");

  const [statusFilter,setStatusFilter] = useState("All");

  const [priorityFilter,setPriorityFilter] = useState("All");

  const [selectedComplaint,setSelectedComplaint] = useState(null);




const complaints = [
  {
    id: "CMP001",
    username: "Rahul Patel",
    email: "rahul@gmail.com",
    phone: "9876543210",

    category: "Road Damage",

    priority: "High",

    status: "Assigned",

    address: "Satellite, Ahmedabad",

    pincode: "380015",

    latitude: 23.0225,

    longitude: 72.5714,

    description:
      "Large pothole causing traffic problems.",

    engineer: "Amit Patel",

    date: "20-07-2026"
  }
];
  // ===============================
  // TABLE FILTER
  // ===============================


  const filteredComplaints = useMemo(()=>{


    return complaintData.filter((item)=>{


      const matchesSearch =

      item.id
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      item.category
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      item.citizen
      .toLowerCase()
      .includes(search.toLowerCase());




      const matchesStatus =

      statusFilter==="All"

      ||

      item.status===statusFilter;




      const matchesPriority =

      priorityFilter==="All"

      ||

      item.priority===priorityFilter;




      return (

        matchesSearch

        &&

        matchesStatus

        &&

        matchesPriority

      );


    });


  },[
    search,
    statusFilter,
    priorityFilter
  ]);





  // ===============================
  // ONLY THIS ENGINEER COMPLAINTS
  // FOR MAP
  // ===============================


  const engineerMapComplaints = filteredComplaints.filter(

    (item)=>

      item.engineer===loggedEngineer

      &&

      item.latitude

      &&

      item.longitude

  );
return (

<div className="engineer-dashboard">


{/* ===============================
    WELCOME SECTION
================================ */}

<div className="engineer-welcome">

<div>

<h1>
Welcome Back, Engineer 👷
</h1>


<p>
Manage assigned complaints, update work progress,
upload work evidence and complete field tasks.
</p>


<div className="system-status">

<span className="status-dot"></span>

<span>
{/* Pending Complaints : {engineerComplaints.length} */}
Pending Complaints: 30
</span>

</div>
</div>
</div>
<div className="engineer-stats">

{
dashboardStats.map((card,index)=>(


<div
className="engineer-stat-card"
key={index}
>


<div

className="engineer-stat-icon"

style={{
background:card.bg,
color:card.color
}}

>

{card.icon}

</div>


<div>

<h2>
{card.value}
</h2>

<p>
{card.title}
</p>


</div>


</div>


))

}


</div>

<div className="complaint-toolbar">


<div className="search-box">


<FaSearch/>


<input


type="text"


placeholder="Search Complaint..."


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


/>


</div>





<div className="toolbar-right">


<div className="filter-box">


<FaFilter/>


<select

value={statusFilter}

onChange={(e)=>

setStatusFilter(e.target.value)

}

>


<option>
All
</option>

<option>
Assigned
</option>

<option>
Pending
</option>

<option>
In Progress
</option>

<option>
Completed
</option>


</select>

</div>


<div className="filter-box">

<FaFilter/>

<select

value={priorityFilter}

onChange={(e)=>

setPriorityFilter(e.target.value)

}

>

<option>
All
</option>

<option>
High
</option>

<option>
Medium
</option>

<option>
Low
</option>

</select>

</div>

</div>

</div>
<div className="engineer-card full-width">


<div className="card-header">


<h2>

<FaClipboardList/>

Today's Assigned Complaints

</h2>



</div>




<div className="table-wrapper">


<table className="engineer-table">


<thead>


<tr>

<th>ID</th>

<th>Citizen</th>

<th>Category</th>

<th>Priority</th>

<th>Status</th>

<th>Date</th>

<th>Action</th>


</tr>


</thead>




<tbody>


{

filteredComplaints.length===0

?

<tr>

<td

colSpan="7"

className="empty-row"

>

No complaints found

</td>

</tr>


:


filteredComplaints.map((item)=>(


<tr key={item.id}>


<td className="complaint-id">

{item.id}

</td>


<td>
{item.citizen}
</td>


<td>
{item.category}
</td>



<td>


<span

className={

`priority-badge ${item.priority.toLowerCase()}`

}

>

{item.priority}

</span>


</td>



<td>


<span

className={

`status-badge ${
item.status
.replace(/\s+/g,"-")
.toLowerCase()
}`

}

>

{item.status}

</span>


</td>



<td>

{item.date}

</td>



<td>

<div className="action-buttons">

{/* <button
className="view-btn"
onClick={() => setSelectedComplaint(item)}
>
<FaEye />
View
</button> */}

<button
className="work-btn"
onClick={() =>
navigate(`/engineer/work/${item.id}`, {
state: item,
})
}
>
🛠 Open Work
</button>

</div>

</td>
</tr>
))
}

</tbody>

</table>

</div>

</div>
<div className="engineer-card full-width">

<div className="card-header">

<h2>

<FaMapMarkerAlt/>

Assigned Complaint Locations

</h2>

</div>

<div className="complaint-map">

<MapContainer

center={[
23.0225,
72.5714
]}

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
engineerMapComplaints.map((item)=>(

<Marker

key={item.id}

position={[

item.latitude,

item.longitude

]}

icon={

complaintIcons[item.status]

}

>

<Popup>


<h3>

{item.id}

</h3>

<p>

Category :

{item.category}

</p>


<p>

Citizen :

{item.citizen}

</p>


<p>

Location :

{item.address}

</p>


<p>

Status :

<b>

{item.status}

</b>

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
<span className="legend-dot in-progress"></span>
In Progress
</div>


<div>
<span className="legend-dot completed"></span>
Completed
</div>


</div>
</div>


{

selectedComplaint &&


<div className="modal-overlay">


<div className="complaint-modal">

<div className="modal-header">

<div>

<h2>
Complaint Details
</h2>

<p>
Complete complaint information
</p>

</div>

<button


className="close-btn"


onClick={()=>setSelectedComplaint(null)}

>

<FaTimes/>

</button>

</div>

<div className="detail-grid">

<div className="detail-card">

<span>
Complaint ID
</span>

<h4>
{selectedComplaint.id}
</h4>

</div>

<div className="detail-card">

<span>
Citizen
</span>

<h4>
{selectedComplaint.citizen}
</h4>

</div>

<div className="detail-card">

<span>
Category
</span>

<h4>
{selectedComplaint.category}
</h4>

</div>

<div className="detail-card">

<span>
Status
</span>

<div

className={

`status-badge ${
selectedComplaint.status
.replace(/\s+/g,"-")
.toLowerCase()
}`

}

>

{selectedComplaint.status}

</div>

</div>

</div>

<div className="info-section">

<h3>

<FaMapMarkerAlt/>

Location

</h3>

<p>

{selectedComplaint.address}

</p>

</div>

<div className="info-section">

<h3>
Description
</h3>


<p>

{selectedComplaint.description}

</p>

</div>


<div className="info-section">

<h3>

<FaCamera/>

Complaint Image

</h3>

<div className="complaint-image">

<img src="https://placehold.co/900x350?text=Complaint+Image" alt="complaint" />

</div>

</div>

</div>

</div>

}

</div>


);


}


export default Dashboard;