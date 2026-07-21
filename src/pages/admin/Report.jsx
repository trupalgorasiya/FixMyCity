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
  FaExclamationTriangle
} from "react-icons/fa";

function Reports() {

  const [summary] = useState({

    totalComplaints: 1248,
    resolvedComplaints: 986,
    pendingComplaints: 182,
    inProgress: 80,

    totalCitizens: 542,
    totalEngineers: 28,
    totalDepartments: 6,
    resolutionRate: "79%"

  });

  const [recentActivities] = useState([

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

  ]);

  return (

    <div className="reports-page">

      {/* ==========================================
                  PAGE HEADER
      ========================================== */}

      <div className="page-header">

        <div>

          <h1>
            Reports & Analytics
          </h1>

          <p>
            Monitor complaints, departments,
            engineers and overall system performance.
          </p>

        </div>

      </div>

      {/* ==========================================
                SUMMARY CARDS
      ========================================== */}

      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-info">

            <h4>Total Complaints</h4>

            <h2>
              {summary.totalComplaints}
            </h2>

          </div>

          <div className="summary-icon">
            <FaClipboardList />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Resolved</h4>

            <h2>
              {summary.resolvedComplaints}
            </h2>

          </div>

          <div className="summary-icon">
            <FaCheckCircle />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Pending</h4>

            <h2>
              {summary.pendingComplaints}
            </h2>

          </div>

          <div className="summary-icon">
            <FaClock />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>In Progress</h4>

            <h2>
              {summary.inProgress}
            </h2>

          </div>

          <div className="summary-icon">
            <FaExclamationTriangle />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Total Citizens</h4>

            <h2>
              {summary.totalCitizens}
            </h2>

          </div>

          <div className="summary-icon">
            <FaUsers />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Total Engineers</h4>

            <h2>
              {summary.totalEngineers}
            </h2>

          </div>

          <div className="summary-icon">
            <FaUserCog />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Departments</h4>

            <h2>
              {summary.totalDepartments}
            </h2>

          </div>

          <div className="summary-icon">
            <FaBuilding />
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-info">

            <h4>Resolution Rate</h4>

            <h2>
              {summary.resolutionRate}
            </h2>

          </div>

          <div className="summary-icon">
            <FaChartLine />
          </div>

        </div>

      </div>
            {/* ==========================================
                  FILTER SECTION
      ========================================== */}

      <div className="filter-card">

        <div className="card-header">

          <div>
            <h2>Report Filters</h2>
            <p>
              Filter reports by date, department,
              status and engineer.
            </p>
          </div>

        </div>

        <div className="filter-grid">

          <div className="form-group">

            <label>From Date</label>

            <input
              type="date"
            />

          </div>

          <div className="form-group">

            <label>To Date</label>

            <input
              type="date"
            />

          </div>

          <div className="form-group">

            <label>Department</label>

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
                Street Light Department
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>Status</label>

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

              <option>
                Rejected
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>Engineer</label>

            <select>

              <option>
                All Engineers
              </option>

              <option>
                Rahul Sharma
              </option>

              <option>
                Amit Patel
              </option>

              <option>
                Jay Mehta
              </option>

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

      {/* ==========================================
                 EXPORT SECTION
      ========================================== */}

      <div className="export-card">

        <div>

          <h2>
            Export Reports
          </h2>

          <p>
            Download reports in different formats.
          </p>

        </div>

        <div className="export-buttons">

          <button className="pdf-btn">
            Export PDF
          </button>

          <button className="excel-btn">
            Export Excel
          </button>

          <button className="print-btn">
            Print Report
          </button>

        </div>

      </div>

      {/* ==========================================
                ANALYTICS SECTION
      ========================================== */}

      <div className="analytics-grid">

        {/* Complaint Status */}

        <div className="analytics-card">

          <div className="card-header">

            <div>

              <h2>
                Complaint Status
              </h2>

              <p>
                Overall complaint distribution
              </p>

            </div>

          </div>

          <div className="chart-placeholder">

            <h3>Pie Chart</h3>

            <p>
              Complaint Status Distribution
            </p>

          </div>

        </div>

        {/* Department Performance */}

        <div className="analytics-card">

          <div className="card-header">

            <div>

              <h2>
                Department Performance
              </h2>

              <p>
                Complaints handled by department
              </p>

            </div>

          </div>

          <div className="chart-placeholder">

            <h3>Bar Chart</h3>

            <p>
              Department-wise Complaints
            </p>

          </div>

        </div>

        {/* Monthly Trend */}

        <div className="analytics-card full-width">

          <div className="card-header">

            <div>

              <h2>
                Monthly Complaint Trend
              </h2>

              <p>
                Complaints received over time
              </p>

            </div>

          </div>

          <div className="chart-placeholder line-chart">

            <h3>
              Line Chart
            </h3>

            <p>
              Monthly Complaint Analysis
            </p>

          </div>

        </div>

      </div>
            {/* ==========================================
              TOP ENGINEERS PERFORMANCE
      ========================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>

            <h2>
              Top Engineer Performance
            </h2>

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

              <tr>

                <td>Rahul Sharma</td>
                <td>Road Department</td>
                <td>48</td>
                <td>45</td>
                <td>3</td>
                <td>94%</td>

              </tr>

              <tr>

                <td>Amit Patel</td>
                <td>Water Department</td>
                <td>42</td>
                <td>38</td>
                <td>4</td>
                <td>90%</td>

              </tr>

              <tr>

                <td>Jay Mehta</td>
                <td>Garbage Department</td>
                <td>36</td>
                <td>31</td>
                <td>5</td>
                <td>86%</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================
            DEPARTMENT PERFORMANCE
      ========================================== */}

      <div className="table-card">

        <div className="card-header">

          <div>

            <h2>
              Department Performance
            </h2>

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

              <tr>

                <td>Road Department</td>
                <td>320</td>
                <td>288</td>
                <td>32</td>
                <td>90%</td>

              </tr>

              <tr>

                <td>Water Department</td>
                <td>265</td>
                <td>241</td>
                <td>24</td>
                <td>91%</td>

              </tr>

              <tr>

                <td>Garbage Department</td>
                <td>215</td>
                <td>194</td>
                <td>21</td>
                <td>90%</td>

              </tr>

              <tr>

                <td>Street Light</td>
                <td>180</td>
                <td>160</td>
                <td>20</td>
                <td>89%</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================
                 RECENT ACTIVITY
      ========================================== */}

      <div className="activity-card">

        <div className="card-header">

          <div>

            <h2>
              Recent Activities
            </h2>

            <p>
              Latest updates from the complaint system
            </p>

          </div>

        </div>

        <div className="activity-list">

          {recentActivities.map((activity) => (

            <div
              key={activity.id}
              className="activity-item"
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

  );

}

export default Reports;