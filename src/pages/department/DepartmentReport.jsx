import  { useState } from "react";

import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaSpinner,
    FaChartBar,
    FaBuilding,
    FaTimes,
    FaDownload,
    FaCalendarAlt,
    FaSearch
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


const DepartmentReport = () => {

    /* =====================================================
       DEPARTMENT
    ===================================================== */

    const departmentName = "Garbage Department";


    /* =====================================================
       COMPLAINT DATA
       Replace this later with your API data
    ===================================================== */

    const [departmentComplaints] = useState([
        {
            id: "CMP001",
            title: "Garbage overflow near society",
            citizen: "Raj Patel",
            location: "Satellite Area",
            priority: "High",
            status: "Pending",
            engineer: "Not Assigned",
            date: "18-07-2026"
        },
        {
            id: "CMP002",
            title: "Waste collection delayed",
            citizen: "Amit Shah",
            location: "Navrangpura",
            priority: "Medium",
            status: "Assigned",
            engineer: "Rahul Sharma",
            date: "17-07-2026"
        },
        {
            id: "CMP003",
            title: "Garbage bin damaged",
            citizen: "Priya Patel",
            location: "Maninagar",
            priority: "Low",
            status: "Resolved",
            engineer: "Amit Patel",
            date: "15-07-2026"
        },
        {
            id: "CMP004",
            title: "Street garbage issue",
            citizen: "Karan Joshi",
            location: "Bopal",
            priority: "High",
            status: "In Progress",
            engineer: "Rahul Sharma",
            date: "14-07-2026"
        }
    ]);


    /* =====================================================
       ENGINEER DATA
    ===================================================== */

    const [departmentEngineers] = useState([
        {
            id: "ENG001",
            name: "Rahul Sharma",
            assigned: 40,
            completed: 32
        },
        {
            id: "ENG002",
            name: "Amit Patel",
            assigned: 35,
            completed: 28
        },
        {
            id: "ENG003",
            name: "Vijay Shah",
            assigned: 25,
            completed: 20
        }
    ]);


    /* =====================================================
       SEARCH
    ===================================================== */

    const [searchText, setSearchText] =
        useState("");


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    const [selectedStatus, setSelectedStatus] =
        useState("All");


    /* =====================================================
       REPORT PREVIEW
    ===================================================== */

    const [showDepartmentReport, setShowDepartmentReport] =
        useState(false);


    /* =====================================================
       CALCULATIONS
    ===================================================== */

    const totalComplaints =
        departmentComplaints.length;


    const pendingComplaints =
        departmentComplaints.filter(
            item => item.status === "Pending"
        ).length;


    const assignedComplaints =
        departmentComplaints.filter(
            item => item.status === "Assigned"
        ).length;


    const inProgressComplaints =
        departmentComplaints.filter(
            item => item.status === "In Progress"
        ).length;


    const resolvedComplaints =
        departmentComplaints.filter(
            item => item.status === "Resolved"
        ).length;


    const totalAssigned =
        departmentEngineers.reduce(
            (sum, engineer) =>
                sum + engineer.assigned,
            0
        );


    const totalCompleted =
        departmentEngineers.reduce(
            (sum, engineer) =>
                sum + engineer.completed,
            0
        );


    const overallCompletion =
        totalAssigned > 0
            ? Math.round(
                (totalCompleted /
                    totalAssigned) *
                100
            )
            : 0;


    /* =====================================================
       FILTER DATA
    ===================================================== */

    const filteredComplaints =
        departmentComplaints.filter(
            complaint => {

                const search =
                    searchText
                        .toLowerCase()
                        .trim();


                const matchesSearch =
                    complaint.id
                        .toLowerCase()
                        .includes(search) ||

                    complaint.title
                        .toLowerCase()
                        .includes(search) ||

                    complaint.citizen
                        .toLowerCase()
                        .includes(search) ||

                    complaint.location
                        .toLowerCase()
                        .includes(search) ||

                    complaint.priority
                        .toLowerCase()
                        .includes(search) ||

                    complaint.status
                        .toLowerCase()
                        .includes(search) ||

                    complaint.engineer
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    selectedStatus === "All" ||
                    complaint.status === selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );


    /* =====================================================
       STATUS CHART
    ===================================================== */

    const statusChartData = [
        {
            name: "Pending",
            value: pendingComplaints
        },
        {
            name: "Assigned",
            value: assignedComplaints
        },
        {
            name: "In Progress",
            value: inProgressComplaints
        },
        {
            name: "Resolved",
            value: resolvedComplaints
        }
    ];


    const statusChartColors = [
        "#f59e0b",
        "#3b82f6",
        "#7c3aed",
        "#16a34a"
    ];


    /* =====================================================
       MONTHLY CHART
    ===================================================== */

    const monthlyComplaintData = [
        {
            month: "Jan",
            complaints: 20
        },
        {
            month: "Feb",
            complaints: 35
        },
        {
            month: "Mar",
            complaints: 45
        },
        {
            month: "Apr",
            complaints: 60
        },
        {
            month: "May",
            complaints: 52
        },
        {
            month: "Jun",
            complaints: 68
        }
    ];


    /* =====================================================
       ENGINEER CHART
    ===================================================== */

    const engineerChartData =
        departmentEngineers.map(
            engineer => ({
                name: engineer.name,
                Assigned: engineer.assigned,
                Completed: engineer.completed
            })
        );


    /* =====================================================
       DATE
    ===================================================== */

    const reportDate =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    /* =====================================================
       CLASS HELPERS
    ===================================================== */

    const getDeptStatusClass =
        status => {

            return status
                .toLowerCase()
                .replace(/\s+/g, "-");
        };


    const getDeptPriorityClass =
        priority => {

            return priority
                .toLowerCase();
        };


    /* =====================================================
       DOWNLOAD REPORT
       
       IMPORTANT:
       This creates a completely separate HTML report.
       It does NOT print the React page.
    ===================================================== */

    const downloadDepartmentReport = () => {

        const reportWindow =
            window.open(
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


        /* =================================================
           COMPLAINT TABLE
        ================================================= */

        const complaintTableRows =
            departmentComplaints
                .map(
                    complaint => `

                    <tr>

                        <td>
                            ${complaint.id}
                        </td>

                        <td>
                            ${complaint.title}
                        </td>

                        <td>
                            ${complaint.citizen}
                        </td>

                        <td>
                            ${complaint.location}
                        </td>

                        <td>

                            <span class="
                                dept-download-priority
                                dept-download-priority-${complaint.priority.toLowerCase()}
                            ">

                                ${complaint.priority}

                            </span>

                        </td>

                        <td>

                            <span class="
                                dept-download-status
                                dept-download-status-${complaint.status
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}
                            ">

                                ${complaint.status}

                            </span>

                        </td>

                    </tr>

                `
                )
                .join("");


        /* =================================================
           ENGINEER TABLE
        ================================================= */

        const engineerTableRows =
            departmentEngineers
                .map(
                    engineer => {

                        const completion =
                            engineer.assigned > 0
                                ? Math.round(
                                    (
                                        engineer.completed /
                                        engineer.assigned
                                    ) * 100
                                )
                                : 0;


                        return `

                            <tr>

                                <td>
                                    ${engineer.id}
                                </td>

                                <td>
                                    ${engineer.name}
                                </td>

                                <td>
                                    ${engineer.assigned}
                                </td>

                                <td>
                                    ${engineer.completed}
                                </td>

                                <td>

                                    <strong class="dept-download-green">

                                        ${completion}%

                                    </strong>

                                </td>

                            </tr>

                        `;

                    }
                )
                .join("");


        /* =================================================
           PIE CHART
        ================================================= */

        const chartTotal =
            totalComplaints || 1;


        const pendingDegrees =
            (
                pendingComplaints /
                chartTotal
            ) * 360;


        const assignedDegrees =
            (
                (
                    pendingComplaints +
                    assignedComplaints
                ) /
                chartTotal
            ) * 360;


        const progressDegrees =
            (
                (
                    pendingComplaints +
                    assignedComplaints +
                    inProgressComplaints
                ) /
                chartTotal
            ) * 360;


        /* =================================================
           MONTHLY BARS
        ================================================= */

        const highestMonthValue =
            Math.max(
                ...monthlyComplaintData.map(
                    item => item.complaints
                ),
                1
            );


        const monthlyBars =
            monthlyComplaintData
                .map(
                    item => {

                        const barHeight =
                            (
                                item.complaints /
                                highestMonthValue
                            ) * 100;


                        return `

                            <div class="dept-download-month">

                                <div class="
                                    dept-download-month-value
                                ">
                                    ${item.complaints}
                                </div>

                                <div
                                    class="
                                        dept-download-month-bar
                                    "
                                    style="
                                        height:${barHeight}%;
                                    "
                                ></div>

                                <div class="
                                    dept-download-month-name
                                ">
                                    ${item.month}
                                </div>

                            </div>

                        `;

                    }
                )
                .join("");


        /* =================================================
           ENGINEER BARS
        ================================================= */

        const highestEngineerValue =
            Math.max(
                ...departmentEngineers.map(
                    engineer =>
                        engineer.assigned
                ),
                1
            );


        const engineerBars =
            departmentEngineers
                .map(
                    engineer => {

                        const assignedWidth =
                            (
                                engineer.assigned /
                                highestEngineerValue
                            ) * 100;


                        const completedWidth =
                            (
                                engineer.completed /
                                highestEngineerValue
                            ) * 100;


                        return `

                            <div class="
                                dept-download-engineer-row
                            ">

                                <div class="
                                    dept-download-engineer-name
                                ">

                                    ${engineer.name}

                                </div>


                                <div class="
                                    dept-download-engineer-bars
                                ">

                                    <div
                                        class="
                                            dept-download-engineer-bar
                                            dept-download-assigned
                                        "
                                        style="
                                            width:${assignedWidth}%;
                                        "
                                    >

                                        Assigned:
                                        ${engineer.assigned}

                                    </div>


                                    <div
                                        class="
                                            dept-download-engineer-bar
                                            dept-download-completed
                                        "
                                        style="
                                            width:${completedWidth}%;
                                        "
                                    >

                                        Completed:
                                        ${engineer.completed}

                                    </div>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");


        /* =================================================
           WRITE DOCUMENT
        ================================================= */

        reportWindow.document.open();


        reportWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
FixMyCity - ${departmentName} Report
</title>


<style>

/* =====================================================
   DOWNLOAD REPORT RESET
===================================================== */

* {
    box-sizing: border-box;
}


html,
body {
    margin: 0;
    padding: 0;
}


body {

    background: #ffffff;

    color: #0f172a;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    padding: 20px;
}


/* =====================================================
   MAIN DOWNLOAD REPORT
===================================================== */

.dept-download-document {

    width: 100%;

    max-width: 1100px;

    margin: 0 auto;

    background: #ffffff;
}


/* =====================================================
   HEADER
===================================================== */

.dept-download-header {

    padding: 28px 32px;

    background:
        linear-gradient(
            135deg,
            #0f172a,
            #1e3a8a
        );

    color: #ffffff;

    border-radius: 12px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;
}


.dept-download-brand {

    display: flex;

    align-items: center;

    gap: 15px;
}


.dept-download-logo {

    width: 55px;

    height: 55px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        rgba(255,255,255,.15);

    font-size: 25px;
}


.dept-download-brand h1 {

    margin: 0;

    font-size: 26px;
}


.dept-download-brand p {

    margin: 5px 0 0;

    color: #cbd5e1;

    font-size: 11px;
}


.dept-download-date {

    text-align: right;
}


.dept-download-date strong {

    display: block;

    font-size: 11px;

    letter-spacing: 1px;
}


.dept-download-date span {

    display: block;

    margin-top: 5px;

    color: #cbd5e1;

    font-size: 10px;
}


/* =====================================================
   TITLE
===================================================== */

.dept-download-title {

    padding: 25px 5px 20px;

    border-bottom:
        1px solid #e5e7eb;
}


.dept-download-label {

    color: #2563eb;

    font-size: 10px;

    font-weight: 800;

    letter-spacing: 1.5px;
}


.dept-download-title h2 {

    margin: 7px 0 5px;

    font-size: 24px;
}


.dept-download-title p {

    margin: 0;

    color: #64748b;

    font-size: 11px;
}


/* =====================================================
   STATISTICS
===================================================== */

.dept-download-stats {

    margin: 22px 0;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    border:
        1px solid #e5e7eb;

    border-radius: 10px;

    overflow: hidden;
}


.dept-download-stat {

    padding: 18px;

    background: #f8fafc;

    border-right:
        1px solid #e5e7eb;
}


.dept-download-stat:last-child {

    border-right: none;
}


.dept-download-stat span {

    display: block;

    color: #64748b;

    font-size: 10px;
}


.dept-download-stat strong {

    display: block;

    margin-top: 7px;

    font-size: 24px;
}


.dept-download-total strong {

    color: #2563eb;
}


.dept-download-pending strong {

    color: #d97706;
}


.dept-download-progress strong {

    color: #7c3aed;
}


.dept-download-resolved strong {

    color: #15803d;
}


/* =====================================================
   PERFORMANCE
===================================================== */

.dept-download-performance {

    margin-bottom: 25px;

    padding: 18px 22px;

    background: #f8fafc;

    border:
        1px solid #e2e8f0;

    border-radius: 12px;

    display: flex;

    justify-content: space-between;

    align-items: center;
}


.dept-download-performance h3 {

    margin: 0;

    font-size: 14px;
}


.dept-download-performance p {

    margin: 6px 0 0;

    color: #64748b;

    font-size: 10px;
}


.dept-download-performance-circle {

    width: 72px;

    height: 72px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    position: relative;

    background:
        conic-gradient(
            #2563eb
            ${overallCompletion * 3.6}deg,
            #dbeafe
            ${overallCompletion * 3.6}deg
        );

    color: #2563eb;

    font-size: 14px;

    font-weight: 800;
}


.dept-download-performance-circle::after {

    content: "";

    position: absolute;

    width: 52px;

    height: 52px;

    border-radius: 50%;

    background: #ffffff;
}


.dept-download-performance-circle span {

    position: relative;

    z-index: 2;
}


/* =====================================================
   CHART GRID
===================================================== */

.dept-download-chart-grid {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 18px;

    margin-bottom: 28px;
}


.dept-download-chart-card {

    padding: 18px;

    border:
        1px solid #e5e7eb;

    border-radius: 12px;

    page-break-inside: avoid;
}


.dept-download-chart-card h3 {

    margin: 0 0 15px;

    font-size: 13px;
}


/* =====================================================
   PIE CHART
===================================================== */

.dept-download-pie-area {

    min-height: 220px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 30px;
}


.dept-download-pie {

    width: 145px;

    height: 145px;

    border-radius: 50%;

    flex-shrink: 0;

    background:
        conic-gradient(

            #f59e0b
            0deg
            ${pendingDegrees}deg,

            #3b82f6
            ${pendingDegrees}deg
            ${assignedDegrees}deg,

            #7c3aed
            ${assignedDegrees}deg
            ${progressDegrees}deg,

            #16a34a
            ${progressDegrees}deg
            360deg

        );

    position: relative;
}


.dept-download-pie::after {

    content: "";

    position: absolute;

    width: 65px;

    height: 65px;

    left: 50%;

    top: 50%;

    transform:
        translate(
            -50%,
            -50%
        );

    background: #ffffff;

    border-radius: 50%;
}


.dept-download-legend {

    display: flex;

    flex-direction: column;

    gap: 10px;

    font-size: 9px;
}


.dept-download-legend-item {

    display: flex;

    align-items: center;

    gap: 8px;
}


.dept-download-dot {

    width: 10px;

    height: 10px;

    border-radius: 50%;
}


.dept-download-dot-pending {
    background: #f59e0b;
}


.dept-download-dot-assigned {
    background: #3b82f6;
}


.dept-download-dot-progress {
    background: #7c3aed;
}


.dept-download-dot-resolved {
    background: #16a34a;
}


/* =====================================================
   MONTHLY CHART
===================================================== */

.dept-download-monthly-chart {

    height: 220px;

    display: flex;

    align-items: flex-end;

    justify-content: space-around;

    gap: 10px;

    border-bottom:
        1px solid #cbd5e1;
}


.dept-download-month {

    height: 100%;

    flex: 1;

    max-width: 60px;

    display: flex;

    flex-direction: column;

    justify-content: flex-end;

    align-items: center;

    gap: 5px;
}


.dept-download-month-value {

    font-size: 8px;

    font-weight: 700;
}


.dept-download-month-bar {

    width: 28px;

    min-height: 5px;

    background: #2563eb;

    border-radius:
        6px 6px 0 0;
}


.dept-download-month-name {

    font-size: 8px;

    color: #64748b;
}


/* =====================================================
   ENGINEER CHART
===================================================== */

.dept-download-engineer-chart {

    padding: 5px 0;
}


.dept-download-engineer-row {

    display: grid;

    grid-template-columns:
        120px 1fr;

    gap: 12px;

    align-items: center;

    margin-bottom: 16px;
}


.dept-download-engineer-name {

    font-size: 9px;

    font-weight: 700;

    color: #334155;
}


.dept-download-engineer-bars {

    display: flex;

    flex-direction: column;

    gap: 5px;
}


.dept-download-engineer-bar {

    height: 20px;

    min-width: 50px;

    display: flex;

    align-items: center;

    padding-left: 8px;

    color: #ffffff;

    border-radius: 4px;

    font-size: 8px;

    font-weight: 700;
}


.dept-download-assigned {

    background: #2563eb;
}


.dept-download-completed {

    background: #16a34a;
}


/* =====================================================
   SECTIONS
===================================================== */

.dept-download-section {

    margin-bottom: 28px;

    page-break-inside: avoid;
}


.dept-download-section-title {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 12px;
}


.dept-download-section-number {

    width: 30px;

    height: 30px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 8px;

    background: #eff6ff;

    color: #2563eb;

    font-size: 10px;

    font-weight: 800;
}


.dept-download-section-title h3 {

    margin: 0;

    font-size: 14px;
}


.dept-download-section-title p {

    margin: 3px 0 0;

    color: #64748b;

    font-size: 10px;
}


/* =====================================================
   TABLE
===================================================== */

.dept-download-table-wrapper {

    width: 100%;

    border:
        1px solid #e5e7eb;

    border-radius: 10px;

    overflow: hidden;
}


.dept-download-table {

    width: 100%;

    border-collapse: collapse;

    table-layout: fixed;
}


.dept-download-table th {

    padding: 11px 8px;

    text-align: left;

    background: #f8fafc;

    color: #475569;

    font-size: 9px;
}


.dept-download-table td {

    padding: 11px 8px;

    border-top:
        1px solid #edf2f7;

    color: #334155;

    font-size: 9px;

    word-break: break-word;
}


/* =====================================================
   BADGES
===================================================== */

.dept-download-status,
.dept-download-priority {

    display: inline-block;

    padding: 5px 8px;

    border-radius: 20px;

    font-size: 8px;

    font-weight: 700;
}


.dept-download-priority-high,
.dept-download-status-pending {

    background: #fee2e2;

    color: #dc2626;
}


.dept-download-priority-medium,
.dept-download-status-assigned {

    background: #fef3c7;

    color: #b45309;
}


.dept-download-priority-low,
.dept-download-status-resolved {

    background: #dcfce7;

    color: #15803d;
}


.dept-download-status-in-progress {

    background: #ede9fe;

    color: #7c3aed;
}


.dept-download-green {

    color: #15803d;
}


/* =====================================================
   FOOTER
===================================================== */

.dept-download-footer {

    margin-top: 25px;

    padding: 20px 25px;

    background: #0f172a;

    color: #ffffff;

    display: flex;

    justify-content: space-between;

    gap: 20px;

    border-radius: 10px;
}


.dept-download-footer strong {

    display: block;

    font-size: 12px;
}


.dept-download-footer span {

    display: block;

    margin-top: 4px;

    color: #94a3b8;

    font-size: 8px;
}


.dept-download-footer-right {

    color: #94a3b8;

    font-size: 8px;

    text-align: right;
}


/* =====================================================
   PRINT
===================================================== */

@media print {

    @page {

        size: A4;

        margin: 10mm;

    }


    html,
    body {

        margin: 0;

        padding: 0;

        background: #ffffff;

    }


    .dept-download-document {

        max-width: none;

        width: 100%;

    }


    .dept-download-header,
    .dept-download-footer,
    .dept-download-stat,
    .dept-download-performance-circle,
    .dept-download-pie,
    .dept-download-month-bar,
    .dept-download-engineer-bar {

        -webkit-print-color-adjust:
            exact;

        print-color-adjust:
            exact;
    }


    .dept-download-section,
    .dept-download-chart-card,
    .dept-download-table-wrapper,
    .dept-download-performance {

        break-inside: avoid;

        page-break-inside: avoid;
    }

}

</style>

</head>


<body>


<div class="dept-download-document">


    <!-- HEADER -->

    <div class="dept-download-header">

        <div class="dept-download-brand">

            <div class="dept-download-logo">
                🏙️
            </div>

            <div>

                <h1>
                    FixMyCity
                </h1>

                <p>
                    Department Management System
                </p>

            </div>

        </div>


        <div class="dept-download-date">

            <strong>
                DEPARTMENT REPORT
            </strong>

            <span>
                ${reportDate}
            </span>

        </div>

    </div>


    <!-- TITLE -->

    <div class="dept-download-title">

        <div class="dept-download-label">
            DEPARTMENT PERFORMANCE REPORT
        </div>

        <h2>
            ${departmentName}
        </h2>

        <p>
            Complete department complaint and
            engineer performance report.
        </p>

    </div>


    <!-- STATISTICS -->

    <div class="dept-download-stats">


        <div class="
            dept-download-stat
            dept-download-total
        ">

            <span>
                Total Complaints
            </span>

            <strong>
                ${totalComplaints}
            </strong>

        </div>


        <div class="
            dept-download-stat
            dept-download-pending
        ">

            <span>
                Pending
            </span>

            <strong>
                ${pendingComplaints}
            </strong>

        </div>


        <div class="
            dept-download-stat
            dept-download-progress
        ">

            <span>
                In Progress
            </span>

            <strong>
                ${inProgressComplaints}
            </strong>

        </div>


        <div class="
            dept-download-stat
            dept-download-resolved
        ">

            <span>
                Resolved
            </span>

            <strong>
                ${resolvedComplaints}
            </strong>

        </div>


    </div>


    <!-- PERFORMANCE -->

    <div class="dept-download-performance">

        <div>

            <h3>
                Overall Engineer Completion
            </h3>

            <p>

                ${totalCompleted}

                completed out of

                ${totalAssigned}

                assigned complaints

            </p>

        </div>


        <div class="
            dept-download-performance-circle
        ">

            <span>
                ${overallCompletion}%
            </span>

        </div>

    </div>


    <!-- CHARTS -->

    <div class="
        dept-download-chart-grid
    ">


        <!-- STATUS -->

        <div class="
            dept-download-chart-card
        ">

            <h3>
                Complaint Status
            </h3>


            <div class="
                dept-download-pie-area
            ">

                <div class="
                    dept-download-pie
                "></div>


                <div class="
                    dept-download-legend
                ">


                    <div class="
                        dept-download-legend-item
                    ">

                        <span class="
                            dept-download-dot
                            dept-download-dot-pending
                        "></span>

                        Pending:
                        ${pendingComplaints}

                    </div>


                    <div class="
                        dept-download-legend-item
                    ">

                        <span class="
                            dept-download-dot
                            dept-download-dot-assigned
                        "></span>

                        Assigned:
                        ${assignedComplaints}

                    </div>


                    <div class="
                        dept-download-legend-item
                    ">

                        <span class="
                            dept-download-dot
                            dept-download-dot-progress
                        "></span>

                        In Progress:
                        ${inProgressComplaints}

                    </div>


                    <div class="
                        dept-download-legend-item
                    ">

                        <span class="
                            dept-download-dot
                            dept-download-dot-resolved
                        "></span>

                        Resolved:
                        ${resolvedComplaints}

                    </div>


                </div>

            </div>

        </div>


        <!-- MONTHLY -->

        <div class="
            dept-download-chart-card
        ">

            <h3>
                Monthly Complaints
            </h3>


            <div class="
                dept-download-monthly-chart
            ">

                ${monthlyBars}

            </div>

        </div>


    </div>


    <!-- ENGINEER CHART -->

    <div class="
        dept-download-section
    ">


        <div class="
            dept-download-section-title
        ">

            <div class="
                dept-download-section-number
            ">
                01
            </div>


            <div>

                <h3>
                    Engineer Performance
                </h3>

                <p>
                    Assigned versus completed complaints.
                </p>

            </div>

        </div>


        <div class="
            dept-download-chart-card
        ">

            <div class="
                dept-download-engineer-chart
            ">

                ${engineerBars}

            </div>

        </div>

    </div>


    <!-- COMPLAINT TABLE -->

    <div class="
        dept-download-section
    ">


        <div class="
            dept-download-section-title
        ">

            <div class="
                dept-download-section-number
            ">
                02
            </div>


            <div>

                <h3>
                    Complaint Summary
                </h3>

                <p>
                    Complete department complaint details.
                </p>

            </div>

        </div>


        <div class="
            dept-download-table-wrapper
        ">


            <table class="
                dept-download-table
            ">


                <thead>

                    <tr>

                        <th>
                            Complaint ID
                        </th>

                        <th>
                            Complaint
                        </th>

                        <th>
                            Citizen
                        </th>

                        <th>
                            Location
                        </th>

                        <th>
                            Priority
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${complaintTableRows}

                </tbody>


            </table>

        </div>

    </div>


    <!-- ENGINEER TABLE -->

    <div class="
        dept-download-section
    ">


        <div class="
            dept-download-section-title
        ">

            <div class="
                dept-download-section-number
            ">
                03
            </div>


            <div>

                <h3>
                    Engineer Performance
                </h3>

                <p>
                    Complete engineer performance details.
                </p>

            </div>

        </div>


        <div class="
            dept-download-table-wrapper
        ">


            <table class="
                dept-download-table
            ">


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

                    ${engineerTableRows}

                </tbody>


            </table>

        </div>

    </div>


    <!-- FOOTER -->

    <div class="
        dept-download-footer
    ">


        <div>

            <strong>
                FixMyCity
            </strong>

            <span>
                Department Management System
            </span>

        </div>


        <div class="
            dept-download-footer-right
        ">

            Generated on
            ${reportDate}

            <br />

            Confidential Department Report

        </div>


    </div>


</div>


<script>

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                window.focus();

                window.print();

            },
            800
        );

    }
);


window.addEventListener(
    "afterprint",
    function () {

        setTimeout(
            function () {

                window.close();

            },
            500
        );

    }
);

</script>


</body>

</html>

        `);


        reportWindow.document.close();
    };


    /* =====================================================
       JSX
    ===================================================== */

    return (

        <div className="
            dept-report-page
        ">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                dept-report-page-header
            ">

                <div>

                    <h1>
                        {departmentName} Report
                    </h1>

                    <p>
                        Monitor complaints, engineers
                        and department performance
                    </p>

                </div>


                <div className="
                    dept-report-department-tag
                ">

                    <FaBuilding />

                    {departmentName}

                </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="
                dept-report-summary-grid
            ">


                <div className="
                    dept-report-summary-card
                ">

                    <div>

                        <h4>
                            Total Complaints
                        </h4>

                        <h2>
                            {totalComplaints}
                        </h2>

                    </div>


                    <div className="
                        dept-report-summary-icon
                    ">

                        <FaClipboardList />

                    </div>

                </div>


                <div className="
                    dept-report-summary-card
                ">

                    <div>

                        <h4>
                            Pending
                        </h4>

                        <h2>
                            {pendingComplaints}
                        </h2>

                    </div>


                    <div className="
                        dept-report-summary-icon
                    ">

                        <FaClock />

                    </div>

                </div>


                <div className="
                    dept-report-summary-card
                ">

                    <div>

                        <h4>
                            In Progress
                        </h4>

                        <h2>
                            {inProgressComplaints}
                        </h2>

                    </div>


                    <div className="
                        dept-report-summary-icon
                    ">

                        <FaSpinner />

                    </div>

                </div>


                <div className="
                    dept-report-summary-card
                ">

                    <div>

                        <h4>
                            Resolved
                        </h4>

                        <h2>
                            {resolvedComplaints}
                        </h2>

                    </div>


                    <div className="
                        dept-report-summary-icon
                    ">

                        <FaCheckCircle />

                    </div>

                </div>


            </div>


            {/* =================================================
                GENERATE
            ================================================= */}

            <div className="
                dept-report-actions
            ">

                <button
                    className="
                        dept-report-generate-btn
                    "
                    onClick={() =>
                        setShowDepartmentReport(true)
                    }
                >

                    <FaChartBar />

                    Generate Report

                </button>

            </div>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="
                dept-report-toolbar
            ">


                <div className="
                    dept-report-search-box
                ">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="
                            Search complaint, citizen,
                            location, engineer...
                        "
                        value={searchText}
                        onChange={e =>
                            setSearchText(
                                e.target.value
                            )
                        }
                    />

                </div>


                <select
                    value={selectedStatus}
                    onChange={e =>
                        setSelectedStatus(
                            e.target.value
                        )
                    }
                >

                    <option value="All">
                        All Status
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Assigned">
                        Assigned
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Resolved">
                        Resolved
                    </option>

                </select>

            </div>


            {/* =================================================
                ENGINEER TABLE
            ================================================= */}

            <div className="
                dept-report-main-card
            ">

                <div className="
                    dept-report-card-header
                ">

                    <h2>
                        Engineer Performance
                    </h2>

                    <p>
                        Department engineer work summary
                    </p>

                </div>


                <div className="
                    dept-report-table-scroll
                ">

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

                            {departmentEngineers.map(
                                engineer => {

                                    const percentage =
                                        engineer.assigned > 0
                                            ? Math.round(
                                                (
                                                    engineer.completed /
                                                    engineer.assigned
                                                ) * 100
                                            )
                                            : 0;


                                    return (

                                        <tr
                                            key={
                                                engineer.id
                                            }
                                        >

                                            <td>
                                                {engineer.id}
                                            </td>

                                            <td>
                                                {engineer.name}
                                            </td>

                                            <td>
                                                {engineer.assigned}
                                            </td>

                                            <td>
                                                {engineer.completed}
                                            </td>

                                            <td>

                                                <span className="
                                                    dept-report-completion-badge
                                                ">

                                                    {percentage}%

                                                </span>

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =================================================
                CHARTS
            ================================================= */}

            <div className="
                dept-report-charts-grid
            ">


                {/* PIE */}

                <div className="
                    dept-report-chart-card
                ">

                    <h2>
                        Complaint Status
                    </h2>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={
                                    statusChartData
                                }
                                dataKey="value"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={100}
                                label
                            >

                                {statusChartData.map(
                                    (item, index) => (

                                        <Cell
                                            key={
                                                item.name
                                            }
                                            fill={
                                                statusChartColors[
                                                    index
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>


                {/* MONTHLY */}

                <div className="
                    dept-report-chart-card
                ">

                    <h2>
                        Monthly Complaints
                    </h2>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={
                                monthlyComplaintData
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
                                strokeWidth={3}
                                dot={{
                                    r: 5
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>


                {/* ENGINEER */}

                <div className="
                    dept-report-chart-card
                    dept-report-full-chart
                ">

                    <h2>
                        Engineer Performance
                    </h2>


                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={
                                engineerChartData
                            }
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />


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


            {/* =================================================
                REPORT PREVIEW
            ================================================= */}

            {showDepartmentReport && (

                <div className="
                    dept-report-preview-overlay
                ">


                    <div className="
                        dept-report-preview
                    ">


                        {/* HEADER */}

                        <div className="
                            dept-report-preview-header
                        ">

                            <div className="
                                dept-report-preview-brand
                            ">

                                <div className="
                                    dept-report-preview-logo
                                ">

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


                            <div className="
                                dept-report-preview-date
                            ">

                                <FaCalendarAlt />

                                <div>

                                    <span>
                                        Report Date
                                    </span>

                                    <strong>
                                        {reportDate}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* TITLE */}

                        <div className="
                            dept-report-preview-title
                        ">

                            <span>
                                DEPARTMENT PERFORMANCE REPORT
                            </span>

                            <h2>
                                {departmentName}
                            </h2>

                            <p>
                                Complete department performance
                                and complaint summary.
                            </p>

                        </div>


                        {/* STATISTICS */}

                        <div className="
                            dept-report-preview-stat-grid
                        ">


                            <div className="
                                dept-report-preview-stat
                            ">

                                <span>
                                    Total Complaints
                                </span>

                                <strong>
                                    {totalComplaints}
                                </strong>

                            </div>


                            <div className="
                                dept-report-preview-stat
                                dept-report-preview-pending
                            ">

                                <span>
                                    Pending
                                </span>

                                <strong>
                                    {pendingComplaints}
                                </strong>

                            </div>


                            <div className="
                                dept-report-preview-stat
                                dept-report-preview-progress
                            ">

                                <span>
                                    In Progress
                                </span>

                                <strong>
                                    {inProgressComplaints}
                                </strong>

                            </div>


                            <div className="
                                dept-report-preview-stat
                                dept-report-preview-resolved
                            ">

                                <span>
                                    Resolved
                                </span>

                                <strong>
                                    {resolvedComplaints}
                                </strong>

                            </div>


                        </div>


                        {/* PERFORMANCE */}

                        <div className="
                            dept-report-preview-performance
                        ">

                            <div>

                                <h3>
                                    Overall Engineer Completion
                                </h3>

                                <p>

                                    {totalCompleted}

                                    completed out of

                                    {totalAssigned}

                                    assigned complaints

                                </p>

                            </div>


                            <div className="
                                dept-report-preview-performance-circle
                            ">

                                {overallCompletion}%

                            </div>

                        </div>


                        {/* COMPLAINT TABLE */}

                        <div className="
                            dept-report-preview-section
                        ">

                            <div className="
                                dept-report-preview-section-title
                            ">

                                <div>
                                    01
                                </div>

                                <div>

                                    <h3>
                                        Complaint Summary
                                    </h3>

                                    <p>
                                        Department complaint overview
                                    </p>

                                </div>

                            </div>


                            <div className="
                                dept-report-preview-table-wrapper
                            ">

                                <table>

                                    <thead>

                                        <tr>

                                            <th>
                                                Complaint ID
                                            </th>

                                            <th>
                                                Complaint
                                            </th>

                                            <th>
                                                Citizen
                                            </th>

                                            <th>
                                                Location
                                            </th>

                                            <th>
                                                Priority
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {departmentComplaints.map(
                                            complaint => (

                                                <tr
                                                    key={
                                                        complaint.id
                                                    }
                                                >

                                                    <td>
                                                        {complaint.id}
                                                    </td>

                                                    <td>
                                                        {complaint.title}
                                                    </td>

                                                    <td>
                                                        {complaint.citizen}
                                                    </td>

                                                    <td>
                                                        {complaint.location}
                                                    </td>

                                                    <td>

                                                        <span className={`
                                                            dept-report-preview-priority
                                                            ${getDeptPriorityClass(
                                                                complaint.priority
                                                            )}
                                                        `}>

                                                            {
                                                                complaint.priority
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className={`
                                                            dept-report-preview-status
                                                            ${getDeptStatusClass(
                                                                complaint.status
                                                            )}
                                                        `}>

                                                            {
                                                                complaint.status
                                                            }

                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* ENGINEER TABLE */}

                        <div className="
                            dept-report-preview-section
                        ">

                            <div className="
                                dept-report-preview-section-title
                            ">

                                <div>
                                    02
                                </div>

                                <div>

                                    <h3>
                                        Engineer Performance
                                    </h3>

                                    <p>
                                        Engineer performance summary
                                    </p>

                                </div>

                            </div>


                            <div className="
                                dept-report-preview-table-wrapper
                            ">

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

                                        {departmentEngineers.map(
                                            engineer => {

                                                const percentage =
                                                    engineer.assigned > 0
                                                        ? Math.round(
                                                            (
                                                                engineer.completed /
                                                                engineer.assigned
                                                            ) * 100
                                                        )
                                                        : 0;


                                                return (

                                                    <tr
                                                        key={
                                                            engineer.id
                                                        }
                                                    >

                                                        <td>
                                                            {engineer.id}
                                                        </td>

                                                        <td>
                                                            {engineer.name}
                                                        </td>

                                                        <td>
                                                            {engineer.assigned}
                                                        </td>

                                                        <td>
                                                            {engineer.completed}
                                                        </td>

                                                        <td>

                                                            <span className="
                                                                dept-report-preview-completion
                                                            ">

                                                                {percentage}%

                                                            </span>

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="
                            dept-report-preview-footer
                        ">

                            <div>

                                <strong>
                                    FixMyCity
                                </strong>

                                <span>
                                    Department Management System
                                </span>

                            </div>


                            <div>
                                Generated on {reportDate}
                            </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="
                            dept-report-preview-actions
                        ">

                            <button
                                className="
                                    dept-report-close-btn
                                "
                                onClick={() =>
                                    setShowDepartmentReport(
                                        false
                                    )
                                }
                            >

                                <FaTimes />

                                Close Report

                            </button>


                            <button
                                className="
                                    dept-report-download-btn
                                "
                                onClick={
                                    downloadDepartmentReport
                                }
                            >

                                <FaDownload />

                                Download Report

                            </button>

                        </div>


                    </div>

                </div>

            )}

        </div>

    );

};


export default DepartmentReport;