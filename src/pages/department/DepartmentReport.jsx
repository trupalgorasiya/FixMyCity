import { useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaFilePdf,
    FaSpinner,
    FaChartBar,
    
    FaBuilding
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    
    Line
} from "recharts";
import "./DepartmentReport.css";


function DepartmentReport(){


    /*
        Later this will come from:
        
        1. Logged in department user
        2. URL parameter
        3. Backend API
        
        Example:
        const department = user.department
        
    */

    const department = "Garbage Department";



// ================================
// Chart Data
// ================================




    // ================================
    // Department Complaint Data
    // ================================


    const [complaints,setComplaints] = useState([


        {
            id:"CMP001",
            title:"Garbage overflow near society",
            citizen:"Raj Patel",
            location:"Satellite Area",
            priority:"High",
            status:"Pending",
            engineer:"Not Assigned",
            date:"18-07-2026"
        },


        {
            id:"CMP002",
            title:"Waste collection delayed",
            citizen:"Amit Shah",
            location:"Navrangpura",
            priority:"Medium",
            status:"Assigned",
            engineer:"Rahul Sharma",
            date:"17-07-2026"
        },


        {
            id:"CMP003",
            title:"Garbage bin damaged",
            citizen:"Priya Patel",
            location:"Maninagar",
            priority:"Low",
            status:"Resolved",
            engineer:"Amit Patel",
            date:"15-07-2026"
        },


        {
            id:"CMP004",
            title:"Street garbage issue",
            citizen:"Karan Joshi",
            location:"Bopal",
            priority:"High",
            status:"In Progress",
            engineer:"Rahul Sharma",
            date:"14-07-2026"
        }


    ]);





    // ================================
    // Engineer Performance Data
    // ================================


    const [engineers,setEngineers] = useState([


        {
            id:"ENG001",
            name:"Rahul Sharma",
            assigned:40,
            completed:32
        },


        {
            id:"ENG002",
            name:"Amit Patel",
            assigned:35,
            completed:28
        },


        {
            id:"ENG003",
            name:"Vijay Shah",
            assigned:25,
            completed:20
        }


    ]);







    // ================================
    // Search
    // ================================


    const [search,setSearch] = useState("");





    // ================================
    // Status Filter
    // ================================


    const [statusFilter,setStatusFilter] = useState("All");



const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#16a34a"
];


    // ================================
    // Complaint Filtering
    // ================================


    const filteredComplaints = complaints.filter((item)=>{


        const searchMatch =

        item.title
        .toLowerCase()
        .includes(
            search.toLowerCase()
        )



        const statusMatch =

        statusFilter==="All"
        ||
        item.status===statusFilter;



        return searchMatch && statusMatch;


    });







    // ================================
    // Statistics
    // ================================


    const totalComplaints = complaints.length;



    const pendingComplaints =

    complaints.filter(
        item=>item.status==="Pending"
    ).length;




    const progressComplaints =

    complaints.filter(
        item=>item.status==="In Progress"
    ).length;




    const resolvedComplaints =

    complaints.filter(
        item=>item.status==="Resolved"
    ).length;




const complaintStatusData = [

    {
        name:"Pending",
        value:pendingComplaints
    },

    {
        name:"In Progress",
        value:progressComplaints
    },

    {
        name:"Resolved",
        value:resolvedComplaints
    }

];


const engineerPerformanceData = engineers.map(
    (eng)=>({

        name:eng.name,

        Assigned:eng.assigned,

        Completed:eng.completed

    })
);



const monthlyComplaintData=[

    {
        month:"Jan",
        complaints:20
    },

    {
        month:"Feb",
        complaints:35
    },

    {
        month:"Mar",
        complaints:45
    },

    {
        month:"Apr",
        complaints:60
    }

];

    return (


    <div className="department-report-page">



        {/* =========================
              HEADER
        ========================= */}


        <div className="page-header">


            <div>

                <h1>
                    {department} Report
                </h1>


                <p>
                    Monitor complaints, engineers and department performance
                </p>


            </div>



            <div className="department-tag">


                <FaBuilding/>


                {department}


            </div>



        </div>






        {/* =========================
              SUMMARY CARDS
        ========================= */}



        <div className="summary-grid">



            <div className="summary-card">


                <div className="summary-info">

                    <h4>
                        Total Complaints
                    </h4>


                    <h2>
                        {totalComplaints}
                    </h2>


                </div>


                <div className="summary-icon">

                    <FaClipboardList/>

                </div>



            </div>





            <div className="summary-card">


                <div className="summary-info">


                    <h4>
                        Pending
                    </h4>


                    <h2>
                        {pendingComplaints}
                    </h2>


                </div>



                <div className="summary-icon">


                    <FaClock/>


                </div>



            </div>





            <div className="summary-card">


                <div className="summary-info">


                    <h4>
                        In Progress
                    </h4>


                    <h2>
                        {progressComplaints}
                    </h2>


                </div>



                <div className="summary-icon">


                    <FaSpinner/>


                </div>



            </div>





            <div className="summary-card">


                <div className="summary-info">


                    <h4>
                        Resolved
                    </h4>


                    <h2>
                        {resolvedComplaints}
                    </h2>


                </div>



                <div className="summary-icon">


                    <FaCheckCircle/>


                </div>



            </div>




        </div>
        <div className="report-actions">


<button className="generate-btn">
<FaChartBar/>
    Generate Report

</button>



<button className="download-btn">
<FaFilePdf/>
    Download PDF

</button>


</div>
        









        {/* =================================
              ENGINEER PERFORMANCE
        ================================= */}



        <div className="report-card">



            <div className="card-header">


                <div>


                    <h2>
                        Engineer Performance
                    </h2>


                    <p>
                        Department engineer work summary
                    </p>


                </div>



            </div>







            <div className="table-container">



                <table>


                    <thead>


                        <tr>


                            <th>
                                Engineer ID
                            </th>


                            <th>
                                Engineer Name
                            </th>


                            <th>
                                Assigned
                            </th>


                            <th>
                                Completed
                            </th>


                            <th>
                                Completion Rate
                            </th>


                        </tr>


                    </thead>






                    <tbody>


                    {
                        engineers.map((eng)=>(


                            <tr key={eng.id}>


                                <td>
                                    {eng.id}
                                </td>



                                <td>
                                    {eng.name}
                                </td>




                                <td>
                                    {eng.assigned}
                                </td>




                                <td>
                                    {eng.completed}
                                </td>




                                <td>


                                    <span className="completion-badge">


                                        {

                                        Math.round(
                                            (eng.completed /
                                            eng.assigned)
                                            *100
                                        )

                                        }%



                                    </span>



                                </td>




                            </tr>


                        ))
                    }


                    </tbody>



                </table>



            </div>



        </div>









<div className="charts-grid">


<div className="chart-card">

<h2>
Complaint Status
</h2>


<ResponsiveContainer width="100%" height={300}>


<PieChart margin={{
    top:20,
    right:20,
    left:20,
    bottom:20
}}>


<Pie

data={complaintStatusData}

dataKey="value"

nameKey="name"

outerRadius={100}
innerRadius={55}
label

>


{
complaintStatusData.map(
(item,index)=>(

<Cell key={index} fill={COLORS[index % COLORS.length]}/>

)

)

}


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</div>





<div className="chart-card">


<h2>
Monthly Complaints
</h2>


<ResponsiveContainer width="100%" height={300}>


<LineChart data={monthlyComplaintData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="complaints"
stroke="#2563eb"
strokeWidth={3}
dot={{ r: 5 }}
/>


</LineChart>


</ResponsiveContainer>


</div>







<div className="chart-card full-chart">


<h2>
Engineer Performance
</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={engineerPerformanceData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Legend/>




<Bar

dataKey="Assigned"
fill="#2563eb"
/>


<Bar

dataKey="Completed"
fill="#16a34a"
/>


</BarChart>



</ResponsiveContainer>


</div>




</div>
        
        

    </div>


    );

}


export default DepartmentReport;