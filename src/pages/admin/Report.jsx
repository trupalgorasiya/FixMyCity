import  { useState } from "react";
import "./Report.css";

import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaUserCog,
    FaBuilding,
    FaChartLine,
    FaExclamationTriangle,
    FaFilePdf,
    FaTimes,
    FaDownload,
    FaChartBar,
    FaFilter
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line
} from "recharts";


function Reports() {

    const [showReport, setShowReport] = useState(false);


    /* ==========================================================
       SUMMARY DATA
    ========================================================== */

    const summary = {
        totalComplaints: 1248,
        resolvedComplaints: 986,
        pendingComplaints: 182,
        inProgress: 80,
        totalCitizens: 542,
        totalEngineers: 28,
        totalDepartments: 6,
        resolutionRate: "79%"
    };


    /* ==========================================================
       COMPLAINT STATUS
    ========================================================== */

    const complaintStatusData = [
        {
            name: "Resolved",
            value: 986
        },
        {
            name: "Pending",
            value: 182
        },
        {
            name: "In Progress",
            value: 80
        }
    ];


    /* ==========================================================
       DEPARTMENT DATA
    ========================================================== */

    const departmentData = [
        {
            department: "Road",
            complaints: 320
        },
        {
            department: "Water",
            complaints: 265
        },
        {
            department: "Garbage",
            complaints: 215
        },
        {
            department: "Street Light",
            complaints: 180
        },
        {
            department: "Drainage",
            complaints: 145
        },
        {
            department: "Other",
            complaints: 123
        }
    ];


    /* ==========================================================
       MONTHLY DATA
    ========================================================== */

    const monthlyData = [
        {
            month: "Jan",
            complaints: 82
        },
        {
            month: "Feb",
            complaints: 105
        },
        {
            month: "Mar",
            complaints: 120
        },
        {
            month: "Apr",
            complaints: 145
        },
        {
            month: "May",
            complaints: 168
        },
        {
            month: "Jun",
            complaints: 185
        },
        {
            month: "Jul",
            complaints: 205
        },
        {
            month: "Aug",
            complaints: 238
        }
    ];


    const COLORS = [
        "#16a34a",
        "#f59e0b",
        "#7c3aed"
    ];


    /* ==========================================================
       ENGINEER DATA
    ========================================================== */

    const engineers = [
        {
            name: "Rahul Sharma",
            department: "Road Department",
            assigned: 48,
            completed: 45,
            pending: 3,
            efficiency: "94%"
        },
        {
            name: "Amit Patel",
            department: "Water Department",
            assigned: 42,
            completed: 38,
            pending: 4,
            efficiency: "90%"
        },
        {
            name: "Jay Mehta",
            department: "Garbage Department",
            assigned: 36,
            completed: 31,
            pending: 5,
            efficiency: "86%"
        },
        {
            name: "Vijay Shah",
            department: "Street Light",
            assigned: 32,
            completed: 28,
            pending: 4,
            efficiency: "88%"
        }
    ];


    /* ==========================================================
       DEPARTMENT PERFORMANCE
    ========================================================== */

    const departments = [
        {
            name: "Road Department",
            total: 320,
            resolved: 288,
            pending: 32,
            rate: "90%"
        },
        {
            name: "Water Department",
            total: 265,
            resolved: 241,
            pending: 24,
            rate: "91%"
        },
        {
            name: "Garbage Department",
            total: 215,
            resolved: 194,
            pending: 21,
            rate: "90%"
        },
        {
            name: "Street Light",
            total: 180,
            resolved: 160,
            pending: 20,
            rate: "89%"
        },
        {
            name: "Drainage Department",
            total: 145,
            resolved: 121,
            pending: 24,
            rate: "83%"
        }
    ];


    /* ==========================================================
       RECENT ACTIVITIES
    ========================================================== */

    const recentActivities = [
        {
            id: 1,
            title: "Road complaint resolved",
            time: "10 minutes ago"
        },
        {
            id: 2,
            title: "New engineer assigned",
            time: "35 minutes ago"
        },
        {
            id: 3,
            title: "Water leakage complaint received",
            time: "1 hour ago"
        },
        {
            id: 4,
            title: "Street Light department updated",
            time: "Today"
        }
    ];


    /* ==========================================================
       GENERATE REPORT
    ========================================================== */

    const handleGenerateReport = () => {
        setShowReport(true);
    };


    /* ==========================================================
       CLOSE REPORT
    ========================================================== */

    const handleCloseReport = () => {
        setShowReport(false);
    };


    /* ==========================================================
       DOWNLOAD REPORT
       
       IMPORTANT:
       We are NOT using window.print() on the React page.

       Instead, a completely separate HTML document is created.
       This prevents the black/blank print page problem.
    ========================================================== */

    const handleDownloadReport = () => {

        const reportWindow = window.open(
            "",
            "_blank",
            "width=1200,height=900"
        );


        if (!reportWindow) {

            alert(
                "Please allow pop-ups in your browser to download the report."
            );

            return;
        }


        const today = new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


        /* ======================================================
           ENGINEER TABLE HTML
        ====================================================== */

        const engineerRows = engineers.map(
            (engineer) => `
                <tr>
                    <td>${engineer.name}</td>
                    <td>${engineer.department}</td>
                    <td>${engineer.assigned}</td>
                    <td>${engineer.completed}</td>
                    <td>${engineer.pending}</td>
                    <td class="green">
                        ${engineer.efficiency}
                    </td>
                </tr>
            `
        ).join("");


        /* ======================================================
           DEPARTMENT TABLE HTML
        ====================================================== */

        const departmentRows = departments.map(
            (department) => `
                <tr>
                    <td>${department.name}</td>
                    <td>${department.total}</td>
                    <td>${department.resolved}</td>
                    <td>${department.pending}</td>
                    <td class="green">
                        ${department.rate}
                    </td>
                </tr>
            `
        ).join("");


        /* ======================================================
           DEPARTMENT BARS
        ====================================================== */

        const maxDepartmentValue = Math.max(
            ...departmentData.map(
                item => item.complaints
            )
        );


        const departmentBars = departmentData.map(
            item => {

                const width =
                    (item.complaints /
                        maxDepartmentValue) *
                    100;


                return `
                    <div class="bar-row">

                        <div class="bar-label">
                            ${item.department}
                        </div>

                        <div class="bar-track">

                            <div
                                class="bar-fill"
                                style="width:${width}%"
                            ></div>

                        </div>

                        <div class="bar-value">
                            ${item.complaints}
                        </div>

                    </div>
                `;
            }
        ).join("");


        /* ======================================================
           MONTHLY BARS
        ====================================================== */

        const maxMonthlyValue = Math.max(
            ...monthlyData.map(
                item => item.complaints
            )
        );


        const monthlyBars = monthlyData.map(
            item => {

                const height =
                    (item.complaints /
                        maxMonthlyValue) *
                    100;


                return `
                    <div class="month-column">

                        <div class="month-number">
                            ${item.complaints}
                        </div>

                        <div
                            class="month-bar"
                            style="height:${height}%"
                        ></div>

                        <div class="month-label">
                            ${item.month}
                        </div>

                    </div>
                `;
            }
        ).join("");


        /* ======================================================
           ACTIVITY HTML
        ====================================================== */

        const activityRows = recentActivities.map(
            activity => `
                <div class="activity-row">

                    <div class="activity-dot"></div>

                    <div>
                        <strong>
                            ${activity.title}
                        </strong>

                        <span>
                            ${activity.time}
                        </span>
                    </div>

                </div>
            `
        ).join("");


        /* ======================================================
           COMPLETE REPORT HTML
        ====================================================== */

        reportWindow.document.open();


        reportWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
FixMyCity - Administrative Report
</title>


<style>

* {
    box-sizing: border-box;
}


html,
body {
    margin: 0;
    padding: 0;

    width: 100%;

    background: #ffffff;

    color: #0f172a;

    font-family:
        Arial,
        Helvetica,
        sans-serif;
}


body {
    padding: 25px;
}


.report {
    width: 100%;
    max-width: 1100px;

    margin: 0 auto;

    background: #ffffff;
}


/* ==========================================================
   HEADER
========================================================== */

.header {
    padding: 25px 30px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    background:
        linear-gradient(
            135deg,
            #0f172a,
            #1e3a8a
        );

    color: white;

    border-radius: 12px;
}


.brand {
    display: flex;

    align-items: center;

    gap: 15px;
}


.logo {
    width: 55px;
    height: 55px;

    border-radius: 12px;

    background: rgba(
        255,
        255,
        255,
        0.15
    );

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 25px;
}


.brand h1 {
    margin: 0;

    font-size: 25px;
}


.brand p {
    margin: 5px 0 0;

    color: #cbd5e1;

    font-size: 12px;
}


.meta {
    text-align: right;

    font-size: 11px;
}


.meta strong {
    display: block;

    margin-bottom: 5px;

    font-size: 12px;

    letter-spacing: 1px;
}


/* ==========================================================
   TITLE
========================================================== */

.title-section {
    padding: 25px 5px;

    border-bottom:
        1px solid #e2e8f0;
}


.title-section .small-title {
    color: #2563eb;

    font-size: 10px;

    font-weight: 800;

    letter-spacing: 1.5px;
}


.title-section h2 {
    margin: 7px 0;

    font-size: 25px;
}


.title-section p {
    margin: 0;

    color: #64748b;

    font-size: 12px;
}


/* ==========================================================
   SUMMARY
========================================================== */

.summary {
    margin: 22px 0;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    border:
        1px solid #e2e8f0;

    border-radius: 10px;

    overflow: hidden;
}


.stat {
    padding: 18px;

    background: #f8fafc;

    border-right:
        1px solid #e2e8f0;
}


.stat:last-child {
    border-right: none;
}


.stat-label {
    color: #64748b;

    font-size: 10px;
}


.stat-value {
    margin-top: 7px;

    font-size: 24px;

    font-weight: 800;
}


/* ==========================================================
   SECTION
========================================================== */

.section {
    margin-top: 28px;

    page-break-inside: avoid;
}


.section-title {
    margin-bottom: 14px;
}


.section-title h3 {
    margin: 0;

    font-size: 18px;
}


.section-title p {
    margin: 5px 0 0;

    color: #64748b;

    font-size: 11px;
}


/* ==========================================================
   CHART GRID
========================================================== */

.chart-grid {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 18px;
}


.chart-card {
    padding: 18px;

    border:
        1px solid #e2e8f0;

    border-radius: 10px;

    background: white;

    page-break-inside: avoid;
}


.chart-card h4 {
    margin: 0 0 15px;

    font-size: 13px;
}


/* ==========================================================
   PIE CHART
========================================================== */

.pie-area {
    min-height: 220px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 35px;
}


.pie {
    width: 150px;
    height: 150px;

    flex-shrink: 0;

    border-radius: 50%;

    background:
        conic-gradient(
            #16a34a 0deg 285deg,
            #f59e0b 285deg 337deg,
            #7c3aed 337deg 360deg
        );

    position: relative;
}


.pie::after {
    content: "";

    position: absolute;

    width: 70px;
    height: 70px;

    top: 50%;
    left: 50%;

    transform:
        translate(
            -50%,
            -50%
        );

    border-radius: 50%;

    background: white;
}


.legend {
    display: flex;

    flex-direction: column;

    gap: 12px;
}


.legend-item {
    display: grid;

    grid-template-columns:
        10px 1fr auto;

    gap: 8px;

    align-items: center;

    font-size: 10px;
}


.legend-dot {
    width: 9px;
    height: 9px;

    border-radius: 50%;
}


.resolved {
    background: #16a34a;
}


.pending {
    background: #f59e0b;
}


.progress {
    background: #7c3aed;
}


/* ==========================================================
   DEPARTMENT BAR
========================================================== */

.bar-chart {
    min-height: 220px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    gap: 12px;
}


.bar-row {
    display: grid;

    grid-template-columns:
        75px 1fr 35px;

    gap: 8px;

    align-items: center;
}


.bar-label {
    font-size: 9px;

    color: #475569;

    text-align: right;
}


.bar-track {
    height: 11px;

    background: #e2e8f0;

    border-radius: 20px;

    overflow: hidden;
}


.bar-fill {
    height: 100%;

    background: #2563eb;

    border-radius: 20px;
}


.bar-value {
    font-size: 9px;

    font-weight: 700;
}


/* ==========================================================
   MONTHLY CHART
========================================================== */

.monthly-card {
    margin-top: 18px;

    padding: 18px;

    border:
        1px solid #e2e8f0;

    border-radius: 10px;

    page-break-inside: avoid;
}


.monthly-card h4 {
    margin: 0 0 15px;

    font-size: 13px;
}


.monthly-chart {
    height: 250px;

    display: flex;

    align-items: flex-end;

    justify-content: space-around;

    gap: 10px;

    border-bottom:
        1px solid #cbd5e1;

    padding:
        10px 10px 0;
}


.month-column {
    height: 100%;

    flex: 1;

    max-width: 70px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: flex-end;

    gap: 5px;
}


.month-number {
    font-size: 9px;

    font-weight: 700;
}


.month-bar {
    width: 25px;

    min-height: 5px;

    background: #2563eb;

    border-radius:
        6px 6px 0 0;
}


.month-label {
    font-size: 9px;

    color: #64748b;
}


/* ==========================================================
   TABLE
========================================================== */

.table-wrapper {
    width: 100%;

    overflow: hidden;

    border:
        1px solid #e2e8f0;

    border-radius: 10px;
}


table {
    width: 100%;

    border-collapse: collapse;

    table-layout: fixed;
}


thead th {
    padding: 12px 10px;

    background: #f8fafc;

    color: #475569;

    text-align: left;

    font-size: 10px;
}


tbody td {
    padding: 12px 10px;

    border-top:
        1px solid #edf2f7;

    color: #334155;

    font-size: 10px;

    word-break: break-word;
}


.green {
    color: #15803d !important;

    font-weight: 800;
}


/* ==========================================================
   ACTIVITY
========================================================== */

.activities {
    display: flex;

    flex-direction: column;

    gap: 10px;
}


.activity-row {
    display: flex;

    gap: 10px;

    padding: 11px;

    border:
        1px solid #e2e8f0;

    border-radius: 8px;

    background: #f8fafc;
}


.activity-dot {
    width: 9px;
    height: 9px;

    margin-top: 4px;

    flex-shrink: 0;

    border-radius: 50%;

    background: #2563eb;
}


.activity-row strong {
    display: block;

    font-size: 10px;
}


.activity-row span {
    display: block;

    margin-top: 4px;

    color: #64748b;

    font-size: 9px;
}


/* ==========================================================
   FOOTER
========================================================== */

.footer {
    margin-top: 30px;

    padding-top: 18px;

    border-top:
        1px solid #e2e8f0;

    display: flex;

    justify-content: space-between;

    gap: 20px;

    color: #64748b;

    font-size: 9px;
}


.footer strong {
    display: block;

    color: #0f172a;

    margin-bottom: 4px;
}


/* ==========================================================
   PRINT
========================================================== */

@media print {

    @page {
        size: A4 portrait;

        margin: 10mm;
    }


    html,
    body {
        width: 100%;

        margin: 0;

        padding: 0;

        background: white !important;
    }


    body {
        padding: 0;
    }


    .report {
        width: 100%;

        max-width: none;
    }


    .header {
        -webkit-print-color-adjust: exact;

        print-color-adjust: exact;
    }


    .pie,
    .bar-fill,
    .month-bar,
    .stat {
        -webkit-print-color-adjust: exact;

        print-color-adjust: exact;
    }


    .section,
    .chart-card,
    .monthly-card,
    .table-wrapper,
    .footer {
        break-inside: avoid;

        page-break-inside: avoid;
    }

}

</style>

</head>


<body>


<div class="report">


    <!-- ======================================================
         HEADER
    ======================================================= -->

    <div class="header">

        <div class="brand">

            <div class="logo">
                🏙️
            </div>

            <div>

                <h1>
                    FixMyCity
                </h1>

                <p>
                    Smart City Complaint Management System
                </p>

            </div>

        </div>


        <div class="meta">

            <strong>
                ADMINISTRATIVE REPORT
            </strong>

            <div>
                Generated: ${today}
            </div>

        </div>

    </div>


    <!-- ======================================================
         TITLE
    ======================================================= -->

    <div class="title-section">

        <div class="small-title">
            OFFICIAL REPORT
        </div>

        <h2>
            City Complaint & Performance Report
        </h2>

        <p>
            Comprehensive overview of complaints,
            departments, engineers and system performance.
        </p>

    </div>


    <!-- ======================================================
         SUMMARY
    ======================================================= -->

    <div class="summary">


        <div class="stat">

            <div class="stat-label">
                Total Complaints
            </div>

            <div class="stat-value">
                ${summary.totalComplaints}
            </div>

        </div>


        <div class="stat">

            <div class="stat-label">
                Resolved Complaints
            </div>

            <div class="stat-value">
                ${summary.resolvedComplaints}
            </div>

        </div>


        <div class="stat">

            <div class="stat-label">
                Pending Complaints
            </div>

            <div class="stat-value">
                ${summary.pendingComplaints}
            </div>

        </div>


        <div class="stat">

            <div class="stat-label">
                Resolution Rate
            </div>

            <div class="stat-value">
                ${summary.resolutionRate}
            </div>

        </div>


    </div>


    <!-- ======================================================
         COMPLAINT ANALYTICS
    ======================================================= -->

    <div class="section">

        <div class="section-title">

            <h3>
                Complaint Analytics
            </h3>

            <p>
                Overall complaint distribution and
                department performance.
            </p>

        </div>


        <div class="chart-grid">


            <!-- PIE -->

            <div class="chart-card">

                <h4>
                    Complaint Status
                </h4>


                <div class="pie-area">

                    <div class="pie"></div>


                    <div class="legend">


                        <div class="legend-item">

                            <span
                                class="legend-dot resolved"
                            ></span>

                            <span>
                                Resolved
                            </span>

                            <strong>
                                986
                            </strong>

                        </div>


                        <div class="legend-item">

                            <span
                                class="legend-dot pending"
                            ></span>

                            <span>
                                Pending
                            </span>

                            <strong>
                                182
                            </strong>

                        </div>


                        <div class="legend-item">

                            <span
                                class="legend-dot progress"
                            ></span>

                            <span>
                                In Progress
                            </span>

                            <strong>
                                80
                            </strong>

                        </div>


                    </div>

                </div>

            </div>


            <!-- BAR -->

            <div class="chart-card">

                <h4>
                    Department Performance
                </h4>


                <div class="bar-chart">

                    ${departmentBars}

                </div>

            </div>


        </div>


        <!-- MONTHLY -->

        <div class="monthly-card">

            <h4>
                Monthly Complaint Trend
            </h4>


            <div class="monthly-chart">

                ${monthlyBars}

            </div>

        </div>

    </div>


    <!-- ======================================================
         ENGINEER PERFORMANCE
    ======================================================= -->

    <div class="section">

        <div class="section-title">

            <h3>
                Engineer Performance
            </h3>

            <p>
                Engineer workload and completion statistics.
            </p>

        </div>


        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Engineer
                        </th>

                        <th>
                            Department
                        </th>

                        <th>
                            Assigned
                        </th>

                        <th>
                            Completed
                        </th>

                        <th>
                            Pending
                        </th>

                        <th>
                            Efficiency
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${engineerRows}

                </tbody>

            </table>

        </div>

    </div>


    <!-- ======================================================
         DEPARTMENT PERFORMANCE
    ======================================================= -->

    <div class="section">

        <div class="section-title">

            <h3>
                Department Performance
            </h3>

            <p>
                Department-wise complaint resolution statistics.
            </p>

        </div>


        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>
                            Department
                        </th>

                        <th>
                            Total
                        </th>

                        <th>
                            Resolved
                        </th>

                        <th>
                            Pending
                        </th>

                        <th>
                            Resolution Rate
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${departmentRows}

                </tbody>

            </table>

        </div>

    </div>


    <!-- ======================================================
         RECENT ACTIVITIES
    ======================================================= -->

    <div class="section">

        <div class="section-title">

            <h3>
                Recent Activities
            </h3>

        </div>


        <div class="activities">

            ${activityRows}

        </div>

    </div>


    <!-- ======================================================
         FOOTER
    ======================================================= -->

    <div class="footer">

        <div>

            <strong>
                FixMyCity
            </strong>

            Smart City Complaint Management System

        </div>


        <div>

            Confidential Administrative Report

            <br />

            Generated Automatically

        </div>

    </div>


</div>


<script>

window.onload = function () {

    setTimeout(function () {

        window.focus();

        window.print();

    }, 700);

};


window.onafterprint = function () {

    setTimeout(function () {

        window.close();

    }, 300);

};

</script>


</body>

</html>

        `);


        reportWindow.document.close();

    };


    return (

        <>

            {/* ==================================================
                MAIN REPORT PAGE
            ================================================== */}

            <div className="reports-page">


                {/* HEADER */}

                <div className="page-header">

                    <div className="page-title-section">

                        <div className="page-title-icon">
                            <FaChartBar />
                        </div>

                        <div>

                            <h1>
                                Reports & Analytics
                            </h1>

                            <p>
                                Monitor complaints, departments,
                                engineers and overall system
                                performance.
                            </p>

                        </div>

                    </div>


                    <button
                        className="generate-main-btn"
                        onClick={handleGenerateReport}
                    >

                        <FaFilePdf />

                        Generate Report

                    </button>

                </div>


                {/* ==================================================
                    SUMMARY CARDS
                ================================================== */}

                <div className="summary-grid">


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Total Complaints
                            </h4>

                            <h2>
                                {summary.totalComplaints}
                            </h2>

                        </div>

                        <div className="summary-icon blue">
                            <FaClipboardList />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Resolved
                            </h4>

                            <h2>
                                {summary.resolvedComplaints}
                            </h2>

                        </div>

                        <div className="summary-icon green">
                            <FaCheckCircle />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Pending
                            </h4>

                            <h2>
                                {summary.pendingComplaints}
                            </h2>

                        </div>

                        <div className="summary-icon orange">
                            <FaClock />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                In Progress
                            </h4>

                            <h2>
                                {summary.inProgress}
                            </h2>

                        </div>

                        <div className="summary-icon purple">
                            <FaExclamationTriangle />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Total Citizens
                            </h4>

                            <h2>
                                {summary.totalCitizens}
                            </h2>

                        </div>

                        <div className="summary-icon cyan">
                            <FaUsers />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Total Engineers
                            </h4>

                            <h2>
                                {summary.totalEngineers}
                            </h2>

                        </div>

                        <div className="summary-icon indigo">
                            <FaUserCog />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Departments
                            </h4>

                            <h2>
                                {summary.totalDepartments}
                            </h2>

                        </div>

                        <div className="summary-icon teal">
                            <FaBuilding />
                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-info">

                            <h4>
                                Resolution Rate
                            </h4>

                            <h2>
                                {summary.resolutionRate}
                            </h2>

                        </div>

                        <div className="summary-icon green">
                            <FaChartLine />
                        </div>

                    </div>


                </div>


                {/* ==================================================
                    FILTER CARD
                ================================================== */}

                <div className="filter-card">

                    <div className="card-header">

                        <h2>
                            <FaFilter />
                            Report Filters
                        </h2>

                        <p>
                            Filter report data.
                        </p>

                    </div>


                    <div className="filter-grid">

                        <div className="form-group">

                            <label>
                                From Date
                            </label>

                            <input type="date" />

                        </div>


                        <div className="form-group">

                            <label>
                                To Date
                            </label>

                            <input type="date" />

                        </div>


                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select>

                                <option>
                                    All Departments
                                </option>

                                <option>
                                    Road Department
                                </option>

                                <option>
                                    Water Department
                                </option>

                                <option>
                                    Garbage Department
                                </option>

                                <option>
                                    Street Light
                                </option>

                                <option>
                                    Drainage Department
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select>

                                <option>
                                    All Status
                                </option>

                                <option>
                                    Pending
                                </option>

                                <option>
                                    In Progress
                                </option>

                                <option>
                                    Resolved
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Engineer
                            </label>

                            <select>

                                <option>
                                    All Engineers
                                </option>

                                {
                                    engineers.map(
                                        engineer => (
                                            <option
                                                key={
                                                    engineer.name
                                                }
                                            >
                                                {
                                                    engineer.name
                                                }
                                            </option>
                                        )
                                    )
                                }

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                &nbsp;
                            </label>

                            <button
                                className="apply-btn"
                            >
                                Apply Filter
                            </button>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    SCREEN CHARTS
                ================================================== */}

                <div className="analytics-grid">


                    <div className="analytics-card">

                        <div className="card-header">

                            <h2>
                                Complaint Status
                            </h2>

                            <p>
                                Complaint distribution
                            </p>

                        </div>


                        <div className="chart-box">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={
                                            complaintStatusData
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="45%"
                                        innerRadius={65}
                                        outerRadius={105}
                                        paddingAngle={4}
                                    >

                                        {
                                            complaintStatusData.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            index
                                                        }
                                                        fill={
                                                            COLORS[
                                                                index
                                                            ]
                                                        }
                                                    />

                                                )
                                            )
                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    <div className="analytics-card">

                        <div className="card-header">

                            <h2>
                                Department Performance
                            </h2>

                            <p>
                                Complaints by department
                            </p>

                        </div>


                        <div className="chart-box">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={
                                        departmentData
                                    }
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="department"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="complaints"
                                        fill="#2563eb"
                                        radius={[
                                            7,
                                            7,
                                            0,
                                            0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    <div className="analytics-card full-width">

                        <div className="card-header">

                            <h2>
                                Monthly Complaint Trend
                            </h2>

                            <p>
                                Monthly complaint statistics
                            </p>

                        </div>


                        <div className="chart-box line-chart-box">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={
                                        monthlyData
                                    }
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="month"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="complaints"
                                        stroke="#2563eb"
                                        strokeWidth={4}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                </div>


                {/* ==================================================
                    ENGINEER TABLE
                ================================================== */}

                <div className="table-card">

                    <div className="card-header">

                        <h2>
                            Engineer Performance
                        </h2>

                    </div>


                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Engineer
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Assigned
                                    </th>

                                    <th>
                                        Completed
                                    </th>

                                    <th>
                                        Pending
                                    </th>

                                    <th>
                                        Efficiency
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    engineers.map(
                                        engineer => (

                                            <tr
                                                key={
                                                    engineer.name
                                                }
                                            >

                                                <td>
                                                    {
                                                        engineer.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        engineer.department
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        engineer.assigned
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        engineer.completed
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        engineer.pending
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className="efficiency-badge"
                                                    >
                                                        {
                                                            engineer.efficiency
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* ==================================================
                    DEPARTMENT TABLE
                ================================================== */}

                <div className="table-card">

                    <div className="card-header">

                        <h2>
                            Department Performance
                        </h2>

                    </div>


                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Total
                                    </th>

                                    <th>
                                        Resolved
                                    </th>

                                    <th>
                                        Pending
                                    </th>

                                    <th>
                                        Resolution Rate
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    departments.map(
                                        department => (

                                            <tr
                                                key={
                                                    department.name
                                                }
                                            >

                                                <td>
                                                    {
                                                        department.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.total
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.resolved
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.pending
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className="efficiency-badge"
                                                    >
                                                        {
                                                            department.rate
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>


            </div>


            {/* ==================================================
                REPORT PREVIEW
            ================================================== */}

            {
                showReport && (

                    <div className="report-overlay">

                        <div className="generated-report">


                            <div className="generated-header">

                                <div className="report-brand">

                                    <div className="report-logo">
                                        <FaBuilding />
                                    </div>

                                    <div>

                                        <h1>
                                            FixMyCity
                                        </h1>

                                        <p>
                                            Smart City Complaint
                                            Management System
                                        </p>

                                    </div>

                                </div>


                                <div className="report-meta">

                                    <strong>
                                        ADMINISTRATIVE REPORT
                                    </strong>

                                    <span>
                                        Generated:
                                        {" "}
                                        {
                                            new Date()
                                                .toLocaleDateString()
                                        }
                                    </span>

                                </div>

                            </div>


                            <div className="generated-title">

                                <div>

                                    <span>
                                        OFFICIAL REPORT
                                    </span>

                                    <h2>
                                        City Complaint &
                                        Performance Report
                                    </h2>

                                    <p>
                                        Comprehensive overview of
                                        complaints, departments,
                                        engineers and system
                                        performance.
                                    </p>

                                </div>


                                <div className="report-status">

                                    <FaCheckCircle />

                                    Report Ready

                                </div>

                            </div>


                            <div className="generated-summary">


                                <div className="generated-stat">

                                    <span>
                                        Total Complaints
                                    </span>

                                    <strong>
                                        {
                                            summary.totalComplaints
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Resolved
                                    </span>

                                    <strong>
                                        {
                                            summary.resolvedComplaints
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Pending
                                    </span>

                                    <strong>
                                        {
                                            summary.pendingComplaints
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Resolution Rate
                                    </span>

                                    <strong>
                                        {
                                            summary.resolutionRate
                                        }
                                    </strong>

                                </div>


                            </div>


                            {/* REPORT INFORMATION */}

                            <div className="report-information">

                                <div>
                                    <strong>
                                        Citizens
                                    </strong>

                                    <span>
                                        {summary.totalCitizens}
                                    </span>
                                </div>


                                <div>
                                    <strong>
                                        Engineers
                                    </strong>

                                    <span>
                                        {summary.totalEngineers}
                                    </span>
                                </div>


                                <div>
                                    <strong>
                                        Departments
                                    </strong>

                                    <span>
                                        {summary.totalDepartments}
                                    </span>
                                </div>


                                <div>
                                    <strong>
                                        In Progress
                                    </strong>

                                    <span>
                                        {summary.inProgress}
                                    </span>
                                </div>

                            </div>


                            {/* REPORT TABLE */}

                            <div className="generated-section">

                                <div className="generated-section-title">

                                    <h3>
                                        Engineer Performance
                                    </h3>

                                    <p>
                                        Engineer workload and
                                        completion statistics.
                                    </p>

                                </div>


                                <div className="generated-table-container">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    Engineer
                                                </th>

                                                <th>
                                                    Department
                                                </th>

                                                <th>
                                                    Assigned
                                                </th>

                                                <th>
                                                    Completed
                                                </th>

                                                <th>
                                                    Pending
                                                </th>

                                                <th>
                                                    Efficiency
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                engineers.map(
                                                    engineer => (

                                                        <tr
                                                            key={
                                                                engineer.name
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    engineer.name
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    engineer.department
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    engineer.assigned
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    engineer.completed
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    engineer.pending
                                                                }
                                                            </td>

                                                            <td>

                                                                <strong className="report-green">

                                                                    {
                                                                        engineer.efficiency
                                                                    }

                                                                </strong>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>


                            <div className="generated-section">

                                <div className="generated-section-title">

                                    <h3>
                                        Department Performance
                                    </h3>

                                    <p>
                                        Department-wise complaint
                                        resolution statistics.
                                    </p>

                                </div>


                                <div className="generated-table-container">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    Department
                                                </th>

                                                <th>
                                                    Total
                                                </th>

                                                <th>
                                                    Resolved
                                                </th>

                                                <th>
                                                    Pending
                                                </th>

                                                <th>
                                                    Resolution Rate
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                departments.map(
                                                    department => (

                                                        <tr
                                                            key={
                                                                department.name
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    department.name
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    department.total
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    department.resolved
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    department.pending
                                                                }
                                                            </td>

                                                            <td>

                                                                <strong className="report-green">

                                                                    {
                                                                        department.rate
                                                                    }

                                                                </strong>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>


                            {/* FOOTER */}

                            <div className="generated-footer">

                                <div>

                                    <strong>
                                        FixMyCity
                                    </strong>

                                    <span>
                                        Smart City Complaint
                                        Management System
                                    </span>

                                </div>


                                <div>

                                    <span>
                                        Confidential
                                        Administrative Report
                                    </span>

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div className="generated-actions">

                                <button
                                    className="close-report-btn"
                                    onClick={
                                        handleCloseReport
                                    }
                                >

                                    <FaTimes />

                                    Close Report

                                </button>


                                <button
                                    className="download-report-btn"
                                    onClick={
                                        handleDownloadReport
                                    }
                                >

                                    <FaDownload />

                                    Download Report

                                </button>

                            </div>


                        </div>

                    </div>

                )

            }

        </>

    );

}


export default Reports;