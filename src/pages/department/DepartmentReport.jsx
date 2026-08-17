


import { useState } from "react";
import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaFilePdf,
    FaSpinner,
    FaChartBar,
    FaBuilding,
    FaTimes,
    FaDownload,
    FaCalendarAlt
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

function DepartmentReport() {

    const department = "Garbage Department";

    /* =====================================================
       COMPLAINT DATA
    ===================================================== */

    const [complaints] = useState([
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

    const [engineers] = useState([
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
       SEARCH / FILTER
    ===================================================== */

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    /* =====================================================
       REPORT PREVIEW STATE
    ===================================================== */

    const [showReport, setShowReport] = useState(false);

    /* =====================================================
       STATISTICS
    ===================================================== */

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(
        item => item.status === "Pending"
    ).length;

    const progressComplaints = complaints.filter(
        item => item.status === "In Progress"
    ).length;

    const resolvedComplaints = complaints.filter(
        item => item.status === "Resolved"
    ).length;

    const totalAssigned = engineers.reduce(
        (total, engineer) => total + engineer.assigned,
        0
    );

    const totalCompleted = engineers.reduce(
        (total, engineer) => total + engineer.completed,
        0
    );

    const overallCompletion =
        totalAssigned > 0
            ? Math.round((totalCompleted / totalAssigned) * 100)
            : 0;

    /* =====================================================
       FILTERED COMPLAINTS
    ===================================================== */

    const filteredComplaints = complaints.filter(item => {

        const value = search.toLowerCase().trim();

        const searchMatch =
            item.id.toLowerCase().includes(value) ||
            item.title.toLowerCase().includes(value) ||
            item.citizen.toLowerCase().includes(value) ||
            item.location.toLowerCase().includes(value) ||
            item.priority.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value) ||
            item.engineer.toLowerCase().includes(value) ||
            item.date.toLowerCase().includes(value);

        const statusMatch =
            statusFilter === "All" ||
            item.status === statusFilter;

        return searchMatch && statusMatch;
    });

    /* =====================================================
       PIE CHART DATA
    ===================================================== */

    const COLORS = [
        "#f59e0b",
        "#7c3aed",
        "#16a34a"
    ];

    const complaintStatusData = [
        {
            name: "Pending",
            value: pendingComplaints
        },
        {
            name: "In Progress",
            value: progressComplaints
        },
        {
            name: "Resolved",
            value: resolvedComplaints
        }
    ];

    /* =====================================================
       ENGINEER CHART DATA
    ===================================================== */

    const engineerPerformanceData = engineers.map(engineer => ({
        name: engineer.name,
        Assigned: engineer.assigned,
        Completed: engineer.completed
    }));

    /* =====================================================
       MONTHLY DATA
    ===================================================== */

    const monthlyComplaintData = [
        { month: "Jan", complaints: 20 },
        { month: "Feb", complaints: 35 },
        { month: "Mar", complaints: 45 },
        { month: "Apr", complaints: 60 }
    ];

    /* =====================================================
       CURRENT DATE
    ===================================================== */

    const reportDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    /* =====================================================
       DOWNLOAD REPORT
       Browser Print -> Save as PDF
    ===================================================== */

    const handleDownloadReport = () => {
        window.print();
    };

    /* =====================================================
       STATUS CLASS
    ===================================================== */

    const getStatusClass = status => {
        return status
            .toLowerCase()
            .replace(/\s+/g, "-");
    };

    /* =====================================================
       PRIORITY CLASS
    ===================================================== */

    const getPriorityClass = priority => {
        return priority.toLowerCase();
    };

    return (

        <div className="department-report-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        {department} Report
                    </h1>

                    <p>
                        Monitor complaints, engineers and department
                        performance
                    </p>

                </div>

                <div className="department-tag">

                    <FaBuilding />

                    {department}

                </div>

            </div>

            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

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
                        <FaClipboardList />
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
                        <FaClock />
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
                        <FaSpinner />
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
                        <FaCheckCircle />
                    </div>

                </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="report-actions">

                <button
                    className="generate-btn"
                    onClick={() => setShowReport(true)}
                >

                    <FaChartBar />

                    Generate Report

                </button>

            </div>

            {/* =================================================
                SEARCH / FILTER
            ================================================= */}

            <div className="report-toolbar">

                <div className="search-box">

                    <FaClipboardList />

                    <input
                        type="text"
                        placeholder="Search complaint..."
                        value={search}
                        onChange={e =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <select
                    value={statusFilter}
                    onChange={e =>
                        setStatusFilter(e.target.value)
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
                ENGINEER PERFORMANCE TABLE
            ================================================= */}

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

                            {engineers.map(engineer => {

                                const percentage =
                                    engineer.assigned > 0
                                        ? Math.round(
                                            (engineer.completed /
                                                engineer.assigned) *
                                            100
                                        )
                                        : 0;

                                return (

                                    <tr key={engineer.id}>

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

                                            <span className="completion-badge">

                                                {percentage}%

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* =================================================
                CHARTS
            ================================================= */}

            <div className="charts-grid">

                <div className="chart-card">

                    <h2>
                        Complaint Status
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={complaintStatusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                innerRadius={55}
                                label
                            >

                                {complaintStatusData.map(
                                    (item, index) => (

                                        <Cell
                                            key={item.name}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
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

                <div className="chart-card">

                    <h2>
                        Monthly Complaints
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={monthlyComplaintData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

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

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={engineerPerformanceData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="name" />

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

            {showReport && (

                <div className="report-preview-overlay">

                    <div className="generated-report">

                        {/* REPORT HEADER */}

                        <div className="generated-report-header">

                            <div className="report-brand">

                                <div className="report-logo">
                                    <FaBuilding />
                                </div>

                                <div>

                                    <h1>
                                        FixMyCity
                                    </h1>

                                    <p>
                                        Smart City Complaint Management
                                    </p>

                                </div>

                            </div>

                            <div className="report-date">

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

                        {/* REPORT TITLE */}

                        <div className="generated-report-title">

                            <span>
                                DEPARTMENT PERFORMANCE REPORT
                            </span>

                            <h2>
                                {department}
                            </h2>

                            <p>
                                Complete department performance
                                and complaint summary
                            </p>

                        </div>

                        {/* REPORT STATISTICS */}

                        <div className="report-stat-grid">

                            <div className="report-stat">

                                <span>
                                    Total Complaints
                                </span>

                                <strong>
                                    {totalComplaints}
                                </strong>

                            </div>

                            <div className="report-stat pending-stat">

                                <span>
                                    Pending
                                </span>

                                <strong>
                                    {pendingComplaints}
                                </strong>

                            </div>

                            <div className="report-stat progress-stat">

                                <span>
                                    In Progress
                                </span>

                                <strong>
                                    {progressComplaints}
                                </strong>

                            </div>

                            <div className="report-stat resolved-stat">

                                <span>
                                    Resolved
                                </span>

                                <strong>
                                    {resolvedComplaints}
                                </strong>

                            </div>

                        </div>

                        {/* OVERALL PERFORMANCE */}

                        <div className="overall-performance">

                            <div>

                                <h3>
                                    Overall Engineer Completion
                                </h3>

                                <p>
                                    {totalCompleted} completed out of{" "}
                                    {totalAssigned} assigned complaints
                                </p>

                            </div>

                            <div className="performance-circle">

                                {overallCompletion}%

                            </div>

                        </div>

                        {/* COMPLAINT SUMMARY */}

                        <div className="generated-section">

                            <div className="generated-section-title">

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

                            <div className="generated-table-wrapper">

                                <table className="generated-table">

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

                                        {complaints.map(item => (

                                            <tr key={item.id}>

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {item.title}
                                                </td>

                                                <td>
                                                    {item.citizen}
                                                </td>

                                                <td>
                                                    {item.location}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`priority ${getPriorityClass(
                                                            item.priority
                                                        )}`}
                                                    >
                                                        {item.priority}
                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`status ${getStatusClass(
                                                            item.status
                                                        )}`}
                                                    >
                                                        {item.status}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* ENGINEER SUMMARY */}

                        <div className="generated-section">

                            <div className="generated-section-title">

                                <div>
                                    02
                                </div>

                                <div>

                                    <h3>
                                        Engineer Performance
                                    </h3>

                                    <p>
                                        Department engineer performance
                                    </p>

                                </div>

                            </div>

                            <div className="generated-table-wrapper">

                                <table className="generated-table">

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

                                        {engineers.map(engineer => {

                                            const percentage =
                                                engineer.assigned > 0
                                                    ? Math.round(
                                                        (engineer.completed /
                                                            engineer.assigned) *
                                                        100
                                                    )
                                                    : 0;

                                            return (

                                                <tr key={engineer.id}>

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

                                                        <span className="completion-badge">

                                                            {percentage}%

                                                        </span>

                                                    </td>

                                                </tr>

                                            );

                                        })}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* REPORT FOOTER */}

                        <div className="generated-report-footer">

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

                        {/* ACTION BUTTONS */}

                        <div className="generated-report-actions">

                            <button
                                className="close-report-btn"
                                onClick={() =>
                                    setShowReport(false)
                                }
                            >

                                <FaTimes />

                                Close Report

                            </button>

                            <button
                                className="download-report-btn"
                                onClick={handleDownloadReport}
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
}

export default DepartmentReport;