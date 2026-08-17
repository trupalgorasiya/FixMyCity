

import { useState } from "react";
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
  FaFilter,
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
  Line,
} from "recharts";

function Reports() {
  /* ==========================================================
     REPORT PREVIEW STATE
  ========================================================== */

  const [showReport, setShowReport] = useState(false);

  /* ==========================================================
     SUMMARY DATA
  ========================================================== */

  const [summary] = useState({
    totalComplaints: 1248,
    resolvedComplaints: 986,
    pendingComplaints: 182,
    inProgress: 80,
    totalCitizens: 542,
    totalEngineers: 28,
    totalDepartments: 6,
    resolutionRate: "79%",
  });

  /* ==========================================================
     RECENT ACTIVITIES
  ========================================================== */

  const [recentActivities] = useState([
    {
      id: 1,
      title: "Road complaint resolved",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "New engineer assigned",
      time: "35 minutes ago",
    },
    {
      id: 3,
      title: "Water leakage complaint received",
      time: "1 hour ago",
    },
    {
      id: 4,
      title: "Street Light department updated",
      time: "Today",
    },
  ]);

  /* ==========================================================
     CHART DATA
  ========================================================== */

  const complaintStatusData = [
    {
      name: "Resolved",
      value: summary.resolvedComplaints,
    },
    {
      name: "Pending",
      value: summary.pendingComplaints,
    },
    {
      name: "In Progress",
      value: summary.inProgress,
    },
  ];

  const departmentData = [
    {
      department: "Road",
      complaints: 320,
    },
    {
      department: "Water",
      complaints: 265,
    },
    {
      department: "Garbage",
      complaints: 215,
    },
    {
      department: "Street Light",
      complaints: 180,
    },
    {
      department: "Drainage",
      complaints: 145,
    },
    {
      department: "Other",
      complaints: 123,
    },
  ];

  const monthlyData = [
    {
      month: "Jan",
      complaints: 82,
    },
    {
      month: "Feb",
      complaints: 105,
    },
    {
      month: "Mar",
      complaints: 120,
    },
    {
      month: "Apr",
      complaints: 145,
    },
    {
      month: "May",
      complaints: 168,
    },
    {
      month: "Jun",
      complaints: 185,
    },
    {
      month: "Jul",
      complaints: 205,
    },
    {
      month: "Aug",
      complaints: 238,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#7c3aed",
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
      efficiency: "94%",
    },
    {
      name: "Amit Patel",
      department: "Water Department",
      assigned: 42,
      completed: 38,
      pending: 4,
      efficiency: "90%",
    },
    {
      name: "Jay Mehta",
      department: "Garbage Department",
      assigned: 36,
      completed: 31,
      pending: 5,
      efficiency: "86%",
    },
    {
      name: "Vijay Shah",
      department: "Street Light",
      assigned: 32,
      completed: 28,
      pending: 4,
      efficiency: "88%",
    },
  ];

  /* ==========================================================
     DEPARTMENT DATA
  ========================================================== */

  const departments = [
    {
      name: "Road Department",
      total: 320,
      resolved: 288,
      pending: 32,
      rate: "90%",
    },
    {
      name: "Water Department",
      total: 265,
      resolved: 241,
      pending: 24,
      rate: "91%",
    },
    {
      name: "Garbage Department",
      total: 215,
      resolved: 194,
      pending: 21,
      rate: "90%",
    },
    {
      name: "Street Light",
      total: 180,
      resolved: 160,
      pending: 20,
      rate: "89%",
    },
    {
      name: "Drainage Department",
      total: 145,
      resolved: 121,
      pending: 24,
      rate: "83%",
    },
  ];

  /* ==========================================================
     OPEN REPORT
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
     Browser Print -> Save as PDF
  ========================================================== */

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <>
      {/* ======================================================
          MAIN ADMIN REPORT PAGE
      ====================================================== */}

      <div className="reports-page">

        {/* PAGE HEADER */}

        <div className="page-header">

          <div className="page-title-section">

            <div className="page-title-icon">
              <FaChartBar />
            </div>

            <div>
              <h1>Reports & Analytics</h1>

              <p>
                Monitor complaints, departments, engineers
                and overall system performance.
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
              <h4>Total Complaints</h4>
              <h2>{summary.totalComplaints}</h2>
            </div>

            <div className="summary-icon blue">
              <FaClipboardList />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Resolved</h4>
              <h2>{summary.resolvedComplaints}</h2>
            </div>

            <div className="summary-icon green">
              <FaCheckCircle />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Pending</h4>
              <h2>{summary.pendingComplaints}</h2>
            </div>

            <div className="summary-icon orange">
              <FaClock />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>In Progress</h4>
              <h2>{summary.inProgress}</h2>
            </div>

            <div className="summary-icon purple">
              <FaExclamationTriangle />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Total Citizens</h4>
              <h2>{summary.totalCitizens}</h2>
            </div>

            <div className="summary-icon cyan">
              <FaUsers />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Total Engineers</h4>
              <h2>{summary.totalEngineers}</h2>
            </div>

            <div className="summary-icon indigo">
              <FaUserCog />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Departments</h4>
              <h2>{summary.totalDepartments}</h2>
            </div>

            <div className="summary-icon teal">
              <FaBuilding />
            </div>

          </div>

          <div className="summary-card">

            <div className="summary-info">
              <h4>Resolution Rate</h4>
              <h2>{summary.resolutionRate}</h2>
            </div>

            <div className="summary-icon green">
              <FaChartLine />
            </div>

          </div>

        </div>

        {/* ==================================================
            FILTER SECTION
        ================================================== */}

        <div className="filter-card">

          <div className="card-header">

            <div>
              <h2>
                <FaFilter />
                Report Filters
              </h2>

              <p>
                Filter reports by date, department,
                status and engineer.
              </p>
            </div>

          </div>

          <div className="filter-grid">

            <div className="form-group">

              <label>From Date</label>

              <input type="date" />

            </div>

            <div className="form-group">

              <label>To Date</label>

              <input type="date" />

            </div>

            <div className="form-group">

              <label>Department</label>

              <select>

                <option>All Departments</option>
                <option>Road Department</option>
                <option>Water Department</option>
                <option>Garbage Department</option>
                <option>Street Light Department</option>
                <option>Drainage Department</option>

              </select>

            </div>

            <div className="form-group">

              <label>Status</label>

              <select>

                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>

              </select>

            </div>

            <div className="form-group">

              <label>Engineer</label>

              <select>

                <option>All Engineers</option>
                <option>Rahul Sharma</option>
                <option>Amit Patel</option>
                <option>Jay Mehta</option>
                <option>Vijay Shah</option>

              </select>

            </div>

            <div className="form-group button-group">

              <label>&nbsp;</label>

              <button className="apply-btn">
                Apply Filter
              </button>

            </div>

          </div>

        </div>

        {/* ==================================================
            ANALYTICS
        ================================================== */}

        <div className="analytics-grid">

          {/* PIE CHART */}

          <div className="analytics-card">

            <div className="card-header">

              <div>
                <h2>Complaint Status</h2>

                <p>
                  Overall complaint distribution
                </p>
              </div>

            </div>

            <div className="chart-box">

              <ResponsiveContainer
                width="100%"
                height={330}
              >

                <PieChart>

                  <Pie
                    data={complaintStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    label
                  >

                    {complaintStatusData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
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

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}

          <div className="analytics-card">

            <div className="card-header">

              <div>
                <h2>Department Performance</h2>

                <p>
                  Complaints handled by department
                </p>
              </div>

            </div>

            <div className="chart-box">

              <ResponsiveContainer
                width="100%"
                height={330}
              >

                <BarChart
                  data={departmentData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 20,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="department"
                    tick={{
                      fontSize: 11,
                    }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="complaints"
                    name="Complaints"
                    fill="#2563eb"
                    radius={[
                      7,
                      7,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* LINE CHART */}

          <div className="analytics-card full-width">

            <div className="card-header">

              <div>
                <h2>Monthly Complaint Trend</h2>

                <p>
                  Complaints received during the year
                </p>
              </div>

            </div>

            <div className="chart-box line-chart-box">

              <ResponsiveContainer
                width="100%"
                height={360}
              >

                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 5,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="complaints"
                    name="Complaints"
                    stroke="#2563eb"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      fill: "#2563eb",
                    }}
                    activeDot={{
                      r: 8,
                    }}
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

            <div>
              <h2>Top Engineer Performance</h2>

              <p>
                Engineer workload and completion statistics
              </p>
            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Engineer</th>
                  <th>Department</th>
                  <th>Assigned</th>
                  <th>Completed</th>
                  <th>Pending</th>
                  <th>Efficiency</th>
                </tr>

              </thead>

              <tbody>

                {engineers.map((engineer) => (

                  <tr key={engineer.name}>

                    <td>{engineer.name}</td>

                    <td>{engineer.department}</td>

                    <td>{engineer.assigned}</td>

                    <td>{engineer.completed}</td>

                    <td>{engineer.pending}</td>

                    <td>
                      <span className="efficiency-badge">
                        {engineer.efficiency}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ==================================================
            DEPARTMENT TABLE
        ================================================== */}

        <div className="table-card">

          <div className="card-header">

            <div>
              <h2>Department Performance</h2>

              <p>
                Complaint statistics by department
              </p>
            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Department</th>
                  <th>Total Complaints</th>
                  <th>Resolved</th>
                  <th>Pending</th>
                  <th>Resolution Rate</th>
                </tr>

              </thead>

              <tbody>

                {departments.map((department) => (

                  <tr key={department.name}>

                    <td>{department.name}</td>

                    <td>{department.total}</td>

                    <td>{department.resolved}</td>

                    <td>{department.pending}</td>

                    <td>
                      <span className="efficiency-badge">
                        {department.rate}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ==================================================
            RECENT ACTIVITIES
        ================================================== */}

        <div className="activity-card">

          <div className="card-header">

            <div>
              <h2>Recent Activities</h2>

              <p>
                Latest updates from the complaint system
              </p>
            </div>

          </div>

          <div className="activity-list">

            {recentActivities.map((activity) => (

              <div
                className="activity-item"
                key={activity.id}
              >

                <div className="activity-dot"></div>

                <div className="activity-content">

                  <h4>
                    {activity.title}
                  </h4>

                  <span>
                    {activity.time}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* ======================================================
          GENERATED REPORT MODAL
      ====================================================== */}

      {showReport && (

        <div className="report-overlay">

          <div className="generated-report">

            {/* REPORT HEADER */}

            <div className="generated-header">

              <div className="report-brand">

                <div className="report-logo">
                  <FaBuilding />
                </div>

                <div>
                  <h1>FixMyCity</h1>

                  <p>
                    Smart City Complaint Management System
                  </p>
                </div>

              </div>

              <div className="report-meta">

                <strong>ADMINISTRATIVE REPORT</strong>

                <span>
                  Generated:{" "}
                  {new Date().toLocaleDateString()}
                </span>

              </div>

            </div>

            {/* REPORT TITLE */}

            <div className="generated-title">

              <div>
                <span>OFFICIAL REPORT</span>

                <h2>
                  City Complaint & Performance Report
                </h2>

                <p>
                  Comprehensive overview of complaints,
                  departments, engineers and system performance.
                </p>
              </div>

              <div className="report-status">
                <FaCheckCircle />
                Report Ready
              </div>

            </div>

            {/* REPORT SUMMARY */}

            <div className="generated-summary">

              <div className="generated-stat">
                <span>Total Complaints</span>
                <strong>{summary.totalComplaints}</strong>
              </div>

              <div className="generated-stat">
                <span>Resolved</span>
                <strong>{summary.resolvedComplaints}</strong>
              </div>

              <div className="generated-stat">
                <span>Pending</span>
                <strong>{summary.pendingComplaints}</strong>
              </div>

              <div className="generated-stat">
                <span>Resolution Rate</span>
                <strong>{summary.resolutionRate}</strong>
              </div>

            </div>

            {/* REPORT CHARTS */}

            <div className="generated-section">

              <div className="generated-section-title">
                <h3>Complaint Analytics</h3>

                <p>
                  Visual summary of city complaint performance
                </p>
              </div>

              <div className="generated-chart-grid">

                {/* PIE */}

                <div className="generated-chart-card">

                  <h4>Complaint Status</h4>

                  <ResponsiveContainer
                    width="100%"
                    height={280}
                  >

                    <PieChart>

                      <Pie
                        data={complaintStatusData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={4}
                        label
                      >

                        {complaintStatusData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
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

                {/* BAR */}

                <div className="generated-chart-card">

                  <h4>Department Performance</h4>

                  <ResponsiveContainer
                    width="100%"
                    height={280}
                  >

                    <BarChart data={departmentData}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="department"
                        tick={{ fontSize: 10 }}
                      />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="complaints"
                        name="Complaints"
                        fill="#2563eb"
                        radius={[
                          6,
                          6,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* LINE */}

              <div className="generated-chart-card generated-line-chart">

                <h4>Monthly Complaint Trend</h4>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <LineChart data={monthlyData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name="Complaints"
                      stroke="#2563eb"
                      strokeWidth={4}
                      dot={{ r: 5 }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* ENGINEER REPORT */}

            <div className="generated-section">

              <div className="generated-section-title">

                <h3>Engineer Performance</h3>

                <p>
                  Workload and completion statistics
                </p>

              </div>

              <div className="generated-table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Engineer</th>
                      <th>Department</th>
                      <th>Assigned</th>
                      <th>Completed</th>
                      <th>Pending</th>
                      <th>Efficiency</th>
                    </tr>

                  </thead>

                  <tbody>

                    {engineers.map((engineer) => (

                      <tr key={engineer.name}>

                        <td>{engineer.name}</td>
                        <td>{engineer.department}</td>
                        <td>{engineer.assigned}</td>
                        <td>{engineer.completed}</td>
                        <td>{engineer.pending}</td>
                        <td>
                          <strong className="report-green">
                            {engineer.efficiency}
                          </strong>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* DEPARTMENT REPORT */}

            <div className="generated-section">

              <div className="generated-section-title">

                <h3>Department Performance</h3>

                <p>
                  Department-wise complaint resolution statistics
                </p>

              </div>

              <div className="generated-table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Department</th>
                      <th>Total</th>
                      <th>Resolved</th>
                      <th>Pending</th>
                      <th>Rate</th>
                    </tr>

                  </thead>

                  <tbody>

                    {departments.map((department) => (

                      <tr key={department.name}>

                        <td>{department.name}</td>

                        <td>{department.total}</td>

                        <td>{department.resolved}</td>

                        <td>{department.pending}</td>

                        <td>
                          <strong className="report-green">
                            {department.rate}
                          </strong>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* REPORT FOOTER */}

            <div className="generated-footer">

              <div>

                <strong>
                  FixMyCity
                </strong>

                <span>
                  Smart City Complaint Management System
                </span>

              </div>

              <div>
                <span>
                  Confidential Administrative Report
                </span>

                <span>
                  Page Generated Automatically
                </span>
              </div>

            </div>

            {/* REPORT ACTIONS */}

            <div className="generated-actions">

              <button
                className="close-report-btn"
                onClick={handleCloseReport}
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

    </>
  );
}

export default Reports;