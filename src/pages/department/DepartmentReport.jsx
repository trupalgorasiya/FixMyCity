//import React from "react";
import "./DepartmentReport.css";

function DepartmentReport() {
  return (
    <div className="report-page">

      <div className="report-header">
        <div>
          <h1>Department Reports</h1>
          <p>Complaint analytics and department performance overview</p>
        </div>

        <button
          className="pdf-btn"
          onClick={() => window.print()}
        >
          Download PDF
        </button>
      </div>

      {/* SUMMARY ROW */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>245</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>32</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>58</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>155</h2>
          <p>Resolved</p>
        </div>

      </div>

      {/* REPORT CONTENT */}

      <div className="report-row">

        <div className="report-card">
          <h2>Engineer Performance</h2>

          <div className="engineer-box">
            <div className="engineer-info">
              <span>Rahul Sharma</span>
              <span>95%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>

          <div className="engineer-box">
            <div className="engineer-info">
              <span>Amit Patel</span>
              <span>88%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>

          <div className="engineer-box">
            <div className="engineer-info">
              <span>Jay Mehta</span>
              <span>76%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "76%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h2>Recent Activity</h2>

          <div className="timeline">

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <p>Road complaint resolved at Nikol</p>
                <span>Today</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <p>Water leakage assigned to engineer</p>
                <span>Today</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <p>Streetlight issue completed</p>
                <span>Yesterday</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MONTHLY SUMMARY */}

      <div className="month-card">

        <h2>Monthly Complaint Summary</h2>

        <table className="report-table">

          <thead>
            <tr>
              <th>Month</th>
              <th>Total</th>
              <th>Resolved</th>
              <th>Pending</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>January</td>
              <td>60</td>
              <td>50</td>
              <td>10</td>
            </tr>

            <tr>
              <td>February</td>
              <td>75</td>
              <td>65</td>
              <td>10</td>
            </tr>

            <tr>
              <td>March</td>
              <td>110</td>
              <td>95</td>
              <td>15</td>
            </tr>

            <tr>
              <td>April</td>
              <td>90</td>
              <td>80</td>
              <td>10</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DepartmentReport;