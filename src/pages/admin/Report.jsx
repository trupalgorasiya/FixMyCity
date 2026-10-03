import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../api/axios";
import "./Report.css";

import {
    FaCheckCircle,
    FaBuilding,
    FaChartLine,
    FaFilePdf,
    FaTimes,
    FaDownload,
    FaChartBar,
    FaFilter
} from "react-icons/fa";


/* ==========================================================
   API URLS
========================================================== */

const DEPARTMENT_API_URL =
    `${API_BASE_URL}/departments`;

const REPORT_API_URL =
    `${API_BASE_URL}/admin/reports/complaints`;


/* ==========================================================
   COLORS
========================================================== */

const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#7c3aed",
    "#2563eb",
    "#ef4444",
    "#0891b2"
];


/* ==========================================================
   EMPTY REPORT
========================================================== */

const EMPTY_REPORT = {

    summary: {
        totalComplaints: 0,
        resolvedComplaints: 0,
        pendingComplaints: 0,
        inProgress: 0,
        totalCitizens: 0,
        totalEngineers: 0,
        totalDepartments: 0,
        resolutionRate: 0
    },

    complaintStatusData: [],

    departmentData: [],

    monthlyData: [],

    engineers: [],

    departments: []

};


/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

const getToken = () => {

    return (
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("jwt") ||
        ""
    );

};


const formatNumber = (value) => {

    const number = Number(value);

    if (Number.isNaN(number)) {
        return 0;
    }

    return number.toLocaleString("en-IN");

};


const formatPercentage = (value) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "0%";
    }

    if (
        typeof value === "string" &&
        value.includes("%")
    ) {
        return value;
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return "0%";
    }

    return `${number.toFixed(0)}%`;

};


const formatStatus = (status) => {

    if (!status) {
        return "Unknown";
    }

    return status
        .toString()
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .toLowerCase()
        .replace(
            /\b\w/g,
            letter => letter.toUpperCase()
        );

};


const formatMonth = (month) => {

    if (!month) {
        return "";
    }

    const monthMap = {

        JANUARY: "Jan",
        FEBRUARY: "Feb",
        MARCH: "Mar",
        APRIL: "Apr",
        MAY: "May",
        JUNE: "Jun",
        JULY: "Jul",
        AUGUST: "Aug",
        SEPTEMBER: "Sep",
        OCTOBER: "Oct",
        NOVEMBER: "Nov",
        DECEMBER: "Dec"

    };

    const upperMonth =
        month.toString().toUpperCase();

    return (
        monthMap[upperMonth] ||
        month.toString()
    );

};


const escapeHtml = (value) => {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

};


/* ==========================================================
   COMPONENT
========================================================== */

function Reports() {

    const [showReport, setShowReport] =
        useState(false);

    const [loadingDepartments, setLoadingDepartments] =
        useState(false);

    const [generatingReport, setGeneratingReport] =
        useState(false);

    const [departmentsList, setDepartmentsList] =
        useState([]);

    const [reportData, setReportData] =
        useState(EMPTY_REPORT);


    /* ======================================================
       FILTER STATE
    ====================================================== */

    const [filters, setFilters] = useState({

        fromDate: "",
        toDate: "",
        departmentId: "ALL",
        status: "ALL"

    });


    /* ======================================================
       LOAD DEPARTMENTS
    ====================================================== */

    useEffect(() => {

        loadDepartments();

    }, []);


    const loadDepartments = async () => {

        try {

            setLoadingDepartments(true);

            const token = getToken();

            const response =
                await fetch(
                    DEPARTMENT_API_URL,
                    {
                        method: "GET",

                        headers: {

                            ...(token && {
                                Authorization:
                                    `Bearer ${token}`
                            })

                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load departments."
                );

            }


            const data =
                await response.json();


            setDepartmentsList(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (error) {

            console.error(
                "Department API Error:",
                error
            );

            alert(
                "Unable to load departments."
            );

        } finally {

            setLoadingDepartments(false);

        }

    };


    /* ======================================================
       FILTER CHANGE
    ====================================================== */

    const handleFilterChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFilters(previous => ({

            ...previous,

            [name]: value

        }));

    };


    /* ======================================================
       NORMALIZE REPORT DATA
    ====================================================== */

    const normalizeReportData = (data) => {

        if (!data) {
            return EMPTY_REPORT;
        }


        const summarySource =
            data.summary || data;


        const totalComplaints =
            Number(
                summarySource.totalComplaints ??
                data.totalComplaints ??
                0
            );


        const resolvedComplaints =
            Number(
                summarySource.resolvedComplaints ??
                data.resolvedComplaints ??
                0
            );


        const pendingComplaints =
            Number(
                summarySource.pendingComplaints ??
                data.pendingComplaints ??
                0
            );


        const inProgress =
            Number(
                summarySource.inProgress ??
                summarySource.inProgressComplaints ??
                data.inProgress ??
                data.inProgressComplaints ??
                0
            );


        const totalCitizens =
            Number(
                summarySource.totalCitizens ??
                data.totalCitizens ??
                0
            );


        const totalEngineers =
            Number(
                summarySource.totalEngineers ??
                data.totalEngineers ??
                0
            );


        const totalDepartments =
            Number(
                summarySource.totalDepartments ??
                data.totalDepartments ??
                0
            );


        const resolutionRate =
            summarySource.resolutionRate ??
            data.resolutionRate ??
            (
                totalComplaints > 0
                    ? (
                        resolvedComplaints /
                        totalComplaints
                    ) * 100
                    : 0
            );


        /* ==================================================
           STATUS DATA
        ================================================== */

        const statusSource =
            data.complaintStatusData ||
            data.complaintStatus ||
            data.statusData ||
            [];


        let complaintStatusData =
            Array.isArray(statusSource)
                ? statusSource.map(item => ({

                    name:
                        item.name ||
                        item.status ||
                        "Unknown",

                    value:
                        Number(
                            item.value ??
                            item.complaints ??
                            item.count ??
                            0
                        )

                }))
                : [];


        if (
            complaintStatusData.length === 0
        ) {

            complaintStatusData = [

                {
                    name: "Resolved",
                    value: resolvedComplaints
                },

                {
                    name: "Pending",
                    value: pendingComplaints
                },

                {
                    name: "In Progress",
                    value: inProgress
                }

            ].filter(
                item => item.value > 0
            );

        }


        /* ==================================================
           DEPARTMENT CHART DATA
        ================================================== */

        const departmentSource =
            data.departmentData ||
            data.departmentPerformance ||
            data.departments ||
            [];


        const departmentData =
            Array.isArray(departmentSource)
                ? departmentSource.map(item => ({

                    department:
                        item.department ||
                        item.departmentName ||
                        item.name ||
                        "Unknown",

                    complaints:
                        Number(
                            item.complaints ??
                            item.totalComplaints ??
                            item.total ??
                            0
                        )

                }))
                : [];


        /* ==================================================
           MONTHLY DATA
        ================================================== */

        const monthlySource =
            data.monthlyData ||
            data.monthlyComplaints ||
            [];


        const monthlyData =
            Array.isArray(monthlySource)
                ? monthlySource.map(item => ({

                    month:
                        formatMonth(
                            item.month
                        ),

                    complaints:
                        Number(
                            item.complaints ??
                            item.count ??
                            item.totalComplaints ??
                            0
                        )

                }))
                : [];


        /* ==================================================
           ENGINEERS
        ================================================== */

        const engineerSource =
            data.engineers ||
            data.engineerPerformance ||
            [];


        const engineers =
            Array.isArray(engineerSource)
                ? engineerSource.map(item => ({

                    name:
                        item.name ||
                        item.engineerName ||
                        "Unknown",

                    department:
                        item.department ||
                        item.departmentName ||
                        "Unknown",

                    assigned:
                        Number(
                            item.assigned ??
                            item.assignedComplaints ??
                            0
                        ),

                    completed:
                        Number(
                            item.completed ??
                            item.completedComplaints ??
                            item.resolvedComplaints ??
                            0
                        ),

                    pending:
                        Number(
                            item.pending ??
                            item.pendingComplaints ??
                            0
                        ),

                    efficiency:
                        item.efficiency ??
                        item.efficiencyRate ??
                        0

                }))
                : [];


        /* ==================================================
           DEPARTMENTS TABLE
        ================================================== */

        const departmentTableSource =
            data.departments ||
            data.departmentPerformance ||
            [];


        const departments =
            Array.isArray(
                departmentTableSource
            )
                ? departmentTableSource.map(
                    item => {

                        const total =
                            Number(
                                item.total ??
                                item.totalComplaints ??
                                item.complaints ??
                                0
                            );


                        const resolved =
                            Number(
                                item.resolved ??
                                item.resolvedComplaints ??
                                0
                            );


                        const pending =
                            Number(
                                item.pending ??
                                item.pendingComplaints ??
                                Math.max(
                                    total -
                                    resolved,
                                    0
                                )
                            );


                        const rate =
                            item.rate ??
                            item.performance ??
                            (
                                total > 0
                                    ? (
                                        resolved /
                                        total
                                    ) * 100
                                    : 0
                            );


                        return {

                            name:
                                item.name ||
                                item.department ||
                                item.departmentName ||
                                "Unknown",

                            total,

                            resolved,

                            pending,

                            rate

                        };

                    }
                )
                : [];


        return {

            summary: {

                totalComplaints,

                resolvedComplaints,

                pendingComplaints,

                inProgress,

                totalCitizens,

                totalEngineers,

                totalDepartments,

                resolutionRate

            },

            complaintStatusData,

            departmentData,

            monthlyData,

            engineers,

            departments

        };

    };


    /* ======================================================
       GENERATE REPORT
       
       IMPORTANT:
       Backend may return:
       1. JSON
       2. PDF
    ====================================================== */

  
const handleGenerateReport = async () => {

    // ==========================================
    // DATE VALIDATION
    // ==========================================

    if (
        filters.fromDate &&
        filters.toDate &&
        filters.fromDate > filters.toDate
    ) {

        alert(
            "From Date cannot be greater than To Date."
        );

        return;
    }


    try {

        setGeneratingReport(true);


        // ==========================================
        // TOKEN
        // ==========================================

        const token = getToken();


        if (!token) {

            alert(
                "You are not logged in. Please login again."
            );

            return;
        }


        // ==========================================
        // REQUEST BODY
        // ==========================================

        const requestBody = {


            startDate:
                filters.fromDate || null,

            endDate:
                filters.toDate || null,

            departmentId:
                filters.departmentId === "ALL"
                    ? null
                    : Number(
                        filters.departmentId
                    ),

            status:
                filters.status === "ALL"
                    ? null
                    : filters.status

        };


        console.log(
            "================================"
        );

        console.log(
            "REPORT REQUEST"
        );

        console.log(
            JSON.stringify(
                requestBody,
                null,
                2
            )
        );

        console.log(
            "================================"
        );


        const response =
            await fetch(
                `${API_BASE_URL}/admin/reports/complaints`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/pdf",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(
                            requestBody
                        )

                }
            );


        console.log(
            "Report Response Status:",
            response.status
        );


        console.log(
            "Report Content-Type:",
            response.headers.get(
                "content-type"
            )
        );


        // ==========================================
        // HANDLE ERROR
        // ==========================================

        if (!response.ok) {

            let errorMessage =
                "Failed to generate report.";


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            try {

                if (
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    const errorData =
                        await response.json();


                    errorMessage =
                        errorData.message ||
                        errorData.error ||
                        errorMessage;

                } else {

                    const errorText =
                        await response.text();


                    if (errorText) {

                        errorMessage =
                            errorText;

                    }

                }

            } catch (error) {

                console.error(
                    "Error reading API error:",
                    error
                );

            }


            throw new Error(
                errorMessage
            );

        }


        // ==========================================
        // READ PDF
        // ==========================================

        const pdfBlob =
            await response.blob();


        console.log(
            "PDF Blob:",
            pdfBlob
        );


        // ==========================================
        // VERIFY PDF
        // ==========================================

        if (
            !pdfBlob ||
            pdfBlob.size === 0
        ) {

            throw new Error(
                "The generated PDF is empty."
            );

        }


        // ==========================================
        // OPEN PDF
        // ==========================================

        const pdfUrl =
            window.URL.createObjectURL(
                pdfBlob
            );


        window.open(
            pdfUrl,
            "_blank"
        );


        // ==========================================
        // DOWNLOAD PDF
        // ==========================================

        const downloadLink =
            document.createElement(
                "a"
            );


        downloadLink.href =
            pdfUrl;


        downloadLink.download =
            "FixMyCity-Complaint-Report.pdf";


        document.body.appendChild(
            downloadLink
        );


        downloadLink.click();


        document.body.removeChild(
            downloadLink
        );


        // ==========================================
        // CLEAN URL
        // ==========================================

        setTimeout(() => {

            window.URL.revokeObjectURL(
                pdfUrl
            );

        }, 10000);


    } catch (error) {

        console.error(
            "Report Generation Error:",
            error
        );


        alert(
            error.message ||
            "Unable to generate report."
        );


    } finally {

        setGeneratingReport(
            false
        );

    }

};




    /* ======================================================
       CLOSE REPORT
    ====================================================== */

    const handleCloseReport = () => {

        setShowReport(false);

    };


    /* ======================================================
       DOWNLOAD HTML REPORT
    ====================================================== */
const handleDownloadReport = async () => {

    try {

        const token = getToken();


        if (!token) {

            alert(
                "You are not logged in. Please login again."
            );

            return;
        }


        // ==========================================
        // REQUEST BODY
        // ==========================================

        const requestBody = {

            startDate:
                filters.fromDate || null,

            endDate:
                filters.toDate || null,

            departmentId:
                filters.departmentId === "ALL"
                    ? null
                    : Number(
                        filters.departmentId
                    ),

            status:
                filters.status === "ALL"
                    ? null
                    : filters.status

        };


        console.log(
            "PDF Request:",
            requestBody
        );


        // ==========================================
        // CALL PDF API
        // ==========================================

        const response =
            await fetch(
                `${API_BASE_URL}/admin/reports/complaints`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/pdf",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:
                        JSON.stringify(
                            requestBody
                        )

                }
            );


        // ==========================================
        // ERROR
        // ==========================================

        if (!response.ok) {

            let errorMessage =
                "Unable to download report.";


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            try {

                if (
                    contentType.includes(
                        "application/json"
                    )
                ) {

                    const errorData =
                        await response.json();


                    errorMessage =
                        errorData.message ||
                        errorData.error ||
                        errorMessage;

                } else {

                    const errorText =
                        await response.text();


                    if (errorText) {

                        errorMessage =
                            errorText;

                    }

                }

            } catch {
                // Ignore parsing error
            }


            throw new Error(
                errorMessage
            );

        }


        // ==========================================
        // PDF BLOB
        // ==========================================

        const blob =
            await response.blob();


        if (
            !blob ||
            blob.size === 0
        ) {

            throw new Error(
                "Generated PDF is empty."
            );

        }


        // ==========================================
        // DOWNLOAD
        // ==========================================

        const url =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;


        link.download =
            "FixMyCity-Complaint-Report.pdf";


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        // ==========================================
        // CLEANUP
        // ==========================================

        setTimeout(() => {

            window.URL.revokeObjectURL(
                url
            );

        }, 10000);


    } catch (error) {

        console.error(
            "PDF Download Error:",
            error
        );


        alert(
            error.message ||
            "Unable to download report."
        );

    }

};




    /* ======================================================
       REPORT VALUES
    ====================================================== */

    const summary =
        reportData.summary;

    const complaintStatusData =
        reportData.complaintStatusData;

    const departmentData =
        reportData.departmentData;

    const monthlyData =
        reportData.monthlyData;

    const engineers =
        reportData.engineers;

    const departments =
        reportData.departments;


    /* ======================================================
       STATUS TOTAL
    ====================================================== */

    const statusChartTotal =
        useMemo(
            () =>
                complaintStatusData.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(
                            item.value
                        ),
                    0
                ),
            [
                complaintStatusData
            ]
        );


    /* ======================================================
       RENDER
    ====================================================== */

    return (

        <>

            <div className="reports-page">

                {/* ==================================================
                    HEADER
                ================================================== */}

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
                                Monitor complaints,
                                departments,
                                engineers and overall
                                system performance.
                            </p>

                        </div>

                    </div>


                    <button
                        className="generate-main-btn"
                        onClick={
                            handleGenerateReport
                        }
                        disabled={
                            generatingReport
                        }
                    >

                        <FaFilePdf />

                        {
                            generatingReport
                                ? "Generating..."
                                : "Generate Report"
                        }

                    </button>

                </div>


                {/* ==================================================
                    FILTER CARD
                ================================================== */}

                <div className="filter-card">

                    <div className="card-header">

                        <h2>

                            <FaFilter />

                            {" "}

                            Report Filters

                        </h2>

                        <p>

                            Select the required
                            filters and generate
                            the report.

                        </p>

                    </div>


                    <div className="filter-grid">


                        {/* FROM DATE */}

                        <div className="form-group">

                            <label>
                                From Date
                            </label>

                            <input
                                type="date"
                                name="fromDate"
                                value={
                                    filters.fromDate
                                }
                                onChange={
                                    handleFilterChange
                                }
                            />

                        </div>


                        {/* TO DATE */}

                        <div className="form-group">

                            <label>
                                To Date
                            </label>

                            <input
                                type="date"
                                name="toDate"
                                value={
                                    filters.toDate
                                }
                                onChange={
                                    handleFilterChange
                                }
                            />

                        </div>


                        {/* DEPARTMENT */}

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="departmentId"
                                value={
                                    filters.departmentId
                                }
                                onChange={
                                    handleFilterChange
                                }
                            >

                                <option value="ALL">
                                    All Departments
                                </option>


                                {
                                    departmentsList.map(
                                        department => (

                                            <option
                                                key={
                                                    department.departmentId
                                                }
                                                value={
                                                    department.departmentId
                                                }
                                            >

                                                {
                                                    department.name
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>


                            {
                                loadingDepartments && (

                                    <small>
                                        Loading departments...
                                    </small>

                                )
                            }

                        </div>


                        {/* STATUS */}

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    filters.status
                                }
                                onChange={
                                    handleFilterChange
                                }
                            >

                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="CREATED">
                                    Created
                                </option>

                                <option value="ASSIGNED">
                                    Assigned
                                </option>

                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>

                                <option value="RESOLVED">
                                    Resolved
                                </option>

                                <option value="REJECTED">
                                    Rejected
                                </option>

                                <option value="CLOSED">
                                    Closed
                                </option>

                            </select>

                        </div>


                        {/* BUTTON */}

                        <div className="form-group">

                            <label>
                                &nbsp;
                            </label>

                            <button
                                className="apply-btn"
                                onClick={
                                    handleGenerateReport
                                }
                                disabled={
                                    generatingReport
                                }
                            >

                                <FaChartLine />

                                {" "}

                                {
                                    generatingReport
                                        ? "Generating..."
                                        : "Generate Report"
                                }

                            </button>

                        </div>


                    </div>

                </div>

            </div>


            {/* ======================================================
                REPORT PREVIEW
            ====================================================== */}

            {
                showReport && (

                    <div className="report-overlay">

                        <div className="generated-report">


                            {/* ==================================================
                                HEADER
                            ================================================== */}

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
                                                .toLocaleDateString(
                                                    "en-IN"
                                                )
                                        }

                                    </span>

                                </div>

                            </div>


                            {/* ==================================================
                                TITLE
                            ================================================== */}

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

                                        {
                                            filters.fromDate ||
                                            filters.toDate

                                                ? `Report from ${
                                                    filters.fromDate ||
                                                    "Beginning"
                                                } to ${
                                                    filters.toDate ||
                                                    "Today"
                                                }`

                                                : "Comprehensive overview of complaints, departments, engineers and system performance."

                                        }

                                    </p>

                                </div>


                                <div className="report-status">

                                    <FaCheckCircle />

                                    Report Ready

                                </div>

                            </div>


                            {/* ==================================================
                                SUMMARY
                            ================================================== */}

                            <div className="generated-summary">


                                <div className="generated-stat">

                                    <span>
                                        Total Complaints
                                    </span>

                                    <strong>
                                        {
                                            formatNumber(
                                                summary.totalComplaints
                                            )
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Resolved
                                    </span>

                                    <strong>
                                        {
                                            formatNumber(
                                                summary.resolvedComplaints
                                            )
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Pending
                                    </span>

                                    <strong>
                                        {
                                            formatNumber(
                                                summary.pendingComplaints
                                            )
                                        }
                                    </strong>

                                </div>


                                <div className="generated-stat">

                                    <span>
                                        Resolution Rate
                                    </span>

                                    <strong>
                                        {
                                            formatPercentage(
                                                summary.resolutionRate
                                            )
                                        }
                                    </strong>

                                </div>


                            </div>


                            {/* ==================================================
                                SYSTEM INFORMATION
                            ================================================== */}

                            <div className="report-information">


                                <div>

                                    <strong>
                                        Citizens
                                    </strong>

                                    <span>
                                        {
                                            formatNumber(
                                                summary.totalCitizens
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Engineers
                                    </strong>

                                    <span>
                                        {
                                            formatNumber(
                                                summary.totalEngineers
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Departments
                                    </strong>

                                    <span>
                                        {
                                            formatNumber(
                                                summary.totalDepartments
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        In Progress
                                    </strong>

                                    <span>
                                        {
                                            formatNumber(
                                                summary.inProgress
                                            )
                                        }
                                    </span>

                                </div>


                            </div>


                            {/* ==================================================
                                FILTER INFORMATION
                            ================================================== */}

                            <div className="report-information">


                                <div>

                                    <strong>
                                        From Date
                                    </strong>

                                    <span>
                                        {
                                            filters.fromDate ||
                                            "All"
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        To Date
                                    </strong>

                                    <span>
                                        {
                                            filters.toDate ||
                                            "All"
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Department
                                    </strong>

                                    <span>

                                        {
                                            filters.departmentId ===
                                            "ALL"

                                                ? "All Departments"

                                                : (
                                                    departmentsList.find(
                                                        department =>
                                                            String(
                                                                department.departmentId
                                                            ) ===
                                                            String(
                                                                filters.departmentId
                                                            )
                                                    )?.name ||
                                                    "Selected Department"
                                                )

                                        }

                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Status
                                    </strong>

                                    <span>

                                        {
                                            filters.status ===
                                            "ALL"

                                                ? "All Status"

                                                : formatStatus(
                                                    filters.status
                                                )

                                        }

                                    </span>

                                </div>


                            </div>


                            {/* ==================================================
                                ENGINEER PERFORMANCE
                            ================================================== */}

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
                                                    (
                                                        engineer,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                index
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
                                                                    formatNumber(
                                                                        engineer.assigned
                                                                    )
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    formatNumber(
                                                                        engineer.completed
                                                                    )
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    formatNumber(
                                                                        engineer.pending
                                                                    )
                                                                }
                                                            </td>

                                                            <td>

                                                                <strong className="report-green">

                                                                    {
                                                                        formatPercentage(
                                                                            engineer.efficiency
                                                                        )
                                                                    }

                                                                </strong>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }


                                            {
                                                engineers.length ===
                                                0 && (

                                                    <tr>

                                                        <td
                                                            colSpan="6"
                                                            style={{
                                                                textAlign:
                                                                    "center"
                                                            }}
                                                        >

                                                            No engineer
                                                            data available

                                                        </td>

                                                    </tr>

                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>


                            {/* ==================================================
                                DEPARTMENT PERFORMANCE
                            ================================================== */}

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
                                                    (
                                                        department,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                index
                                                            }
                                                        >

                                                            <td>
                                                                {
                                                                    department.name
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    formatNumber(
                                                                        department.total
                                                                    )
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    formatNumber(
                                                                        department.resolved
                                                                    )
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    formatNumber(
                                                                        department.pending
                                                                    )
                                                                }
                                                            </td>

                                                            <td>

                                                                <strong className="report-green">

                                                                    {
                                                                        formatPercentage(
                                                                            department.rate
                                                                        )
                                                                    }

                                                                </strong>

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                            }


                                            {
                                                departments.length ===
                                                0 && (

                                                    <tr>

                                                        <td
                                                            colSpan="5"
                                                            style={{
                                                                textAlign:
                                                                    "center"
                                                            }}
                                                        >

                                                            No department
                                                            data available

                                                        </td>

                                                    </tr>

                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>


                            {/* ==================================================
                                FOOTER
                            ================================================== */}

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


                            {/* ==================================================
                                BUTTONS
                            ================================================== */}

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