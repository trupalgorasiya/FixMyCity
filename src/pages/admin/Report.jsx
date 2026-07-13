//import React from "react";
import "./Report.css";

function Reports() {

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="reports-page">

      {/* Header */}

      <div className="report-header">
        <h1>Reports & Analytics</h1>
        <p>
          View complaint statistics, department performance,
          and engineer productivity.
        </p>
      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>1250</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>980</h2>
          <p>Resolved Complaints</p>
        </div>

        <div className="stat-card">
          <h2>180</h2>
          <p>Pending Complaints</p>
        </div>

        <div className="stat-card">
          <h2>90</h2>
          <p>In Progress</p>
        </div>

      </div>

      {/* Department Table */}

      <div className="section-card">

        <h2>Department Performance</h2>

        <table>

          <thead>
            <tr>
              <th>Department</th>
              <th>Total Complaints</th>
              <th>Resolved</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Sanitation</td>
              <td>350</td>
              <td>320</td>
            </tr>

            <tr>
              <td>Road Department</td>
              <td>280</td>
              <td>240</td>
            </tr>

            <tr>
              <td>Water Department</td>
              <td>220</td>
              <td>200</td>
            </tr>

            <tr>
              <td>Electrical Department</td>
              <td>180</td>
              <td>170</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Engineer Table */}

      <div className="section-card">

        <h2>Engineer Performance</h2>

        <table>

          <thead>
            <tr>
              <th>Engineer</th>
              <th>Assigned</th>
              <th>Completed</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Rahul Sharma</td>
              <td>85</td>
              <td>80</td>
            </tr>

            <tr>
              <td>Karan Patel</td>
              <td>76</td>
              <td>70</td>
            </tr>

            <tr>
              <td>Rakesh Singh</td>
              <td>65</td>
              <td>60</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Recent Activities */}

      <div className="section-card">

        <h2>Recent Activities</h2>

        <div className="activity-card">
          CMP001 - Assigned
        </div>

        <div className="activity-card">
          CMP002 - In Progress
        </div>

        <div className="activity-card">
          CMP003 - Resolved
        </div>

        <div className="activity-card">
          CMP004 - Pending
        </div>

      </div>

      {/* PDF Button */}

      <div className="download-section">

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          Download PDF Report
        </button>

      </div>

    </div>
  );
}

export default Reports;