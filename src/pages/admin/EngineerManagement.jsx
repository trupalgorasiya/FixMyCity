
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, BASE_URL } from "../../api/axios";
import "./EngineerManagement.css";

import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaUserCheck,
  FaUserSlash,
  FaTimes,
  FaFilePdf,
} from "react-icons/fa";

function EngineerManagement() {

  /* ==========================================================
     STATES
  ========================================================== */

  const [engineers, setEngineers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const engineersPerPage = 5;

  const getApplicationStatus = (engineer) => {
    if (engineer.isRejected === null || engineer.isRejected === undefined) {
      return "Pending";
    }
    if (engineer.isRejected === true) {
      return "Rejected";
    }
    return "Approved";
  };


  /* ==========================================================
     GET ADMIN JWT
  ========================================================== */

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("accessToken")
    );

  };


  /* ==========================================================
     GET ALL ENGINEERS
  ========================================================== */

  useEffect(() => {

    const fetchEngineers = async () => {

      try {

        setLoading(true);

        const token = getToken();

        if (!token) {

          console.error("Admin JWT not found");

          setEngineers([]);

          return;

        }


        const response = await fetch(
          `${API_BASE_URL}/admin/engineers`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );


        if (!response.ok) {

          const errorText = await response.text();

          console.error(
            "Engineer API Error:",
            response.status,
            errorText
          );

          throw new Error(
            `Failed to load engineers: ${response.status}`
          );

        }


        const data = await response.json();


        console.log(
          "Admin Engineer Response:",
          data
        );


        /*
         * IMPORTANT:
         *
         * Your API returns:
         *
         * [
         *   {
         *     engineerId: 4,
         *     firstName: "Rajan",
         *     ...
         *   }
         * ]
         *
         * It does NOT return:
         *
         * {
         *   content: [...]
         * }
         *
         * Therefore we use:
         *
         * setEngineers(data)
         */

        if (Array.isArray(data)) {

          setEngineers(data);

        } else if (data && Array.isArray(data.content)) {

          /*
           * This also supports Page<> response
           * if you change your backend later.
           */

          setEngineers(data.content);

        } else {

          console.error(
            "Unexpected engineer response format:",
            data
          );

          setEngineers([]);

        }

      } catch (error) {

        console.error(
          "Error loading engineers:",
          error
        );

        setEngineers([]);

      } finally {

        setLoading(false);

      }

    };


    fetchEngineers();

  }, []);


  /* ==========================================================
     FILTER & SEARCH ENGINEERS
  ========================================================== */

  const filteredEngineers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return engineers.filter((engineer) => {
      const fullName =
        `${engineer.firstName || ""} ${engineer.lastName || ""}`.toLowerCase();
      const applicationStatus = getApplicationStatus(engineer);

      const matchesSearch =
        !keyword ||
        String(engineer.engineerId || "").toLowerCase().includes(keyword) ||
        fullName.includes(keyword) ||
        String(engineer.email || "").toLowerCase().includes(keyword) ||
        String(engineer.contact || "").toLowerCase().includes(keyword) ||
        String(engineer.department || "").toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        applicationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [engineers, search, statusFilter]);

  /* ==========================================================
     ACTIVATE ENGINEER
  ========================================================== */

  const activateEngineer = async (engineerId) => {
    const targetId = engineerId || selectedEngineer?.engineerId;
    if (!targetId) return;

    try {
      setProcessingId(targetId);
      const token = getToken();

      const response = await fetch(
        `${API_BASE_URL}/admin/engineers/${targetId}/activate`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to activate engineer.");
      }

      alert("Engineer activated successfully.");

      setEngineers((prev) =>
        prev.map((eng) =>
          eng.engineerId === targetId
            ? { ...eng, isActive: true, isAvailable: true }
            : eng
        )
      );

      if (selectedEngineer && selectedEngineer.engineerId === targetId) {
        setSelectedEngineer((prev) => ({
          ...prev,
          isActive: true,
          isAvailable: true,
        }));
      }
    } catch (error) {
      console.error("Activate Error:", error);
      alert(error.message || "Unable to activate engineer.");
    } finally {
      setProcessingId(null);
    }
  };

  /* ==========================================================
     DEACTIVATE ENGINEER
  ========================================================== */

  const deactivateEngineer = async (engineerId) => {
    const targetId = engineerId || selectedEngineer?.engineerId;
    if (!targetId) return;

    try {
      setProcessingId(targetId);
      const token = getToken();

      const response = await fetch(
        `${API_BASE_URL}/admin/engineers/${targetId}/deactivate`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to deactivate engineer.");
      }

      alert("Engineer deactivated successfully.");

      setEngineers((prev) =>
        prev.map((eng) =>
          eng.engineerId === targetId
            ? { ...eng, isActive: false, isAvailable: false }
            : eng
        )
      );

      if (selectedEngineer && selectedEngineer.engineerId === targetId) {
        setSelectedEngineer((prev) => ({
          ...prev,
          isActive: false,
          isAvailable: false,
        }));
      }
    } catch (error) {
      console.error("Deactivate Error:", error);
      alert(error.message || "Unable to deactivate engineer.");
    } finally {
      setProcessingId(null);
    }
  };

  /* ==========================================================
     VIEW DETAILS & DOCUMENTS
  ========================================================== */

  const openDetails = (engineer) => {
    setSelectedEngineer(engineer);
    setShowDetails(true);
  };

  const openDocument = (path) => {
    if (!path) {
      alert("Document not available.");
      return;
    }
    const url = path.startsWith("http")
      ? path
      : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };


  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredEngineers.length / engineersPerPage
  );


  const indexOfLastEngineer =
    currentPage * engineersPerPage;


  const indexOfFirstEngineer =
    indexOfLastEngineer - engineersPerPage;


  const currentEngineers =
    filteredEngineers.slice(
      indexOfFirstEngineer,
      indexOfLastEngineer
    );


  const paginate = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {

      return;

    }


    setCurrentPage(page);

  };


  /* ==========================================================
     SUMMARY
  ========================================================== */

  const totalEngineers =
    engineers.length;


  const activeEngineers =
    engineers.filter(
      (engineer) =>
        engineer.isActive === true
    ).length;


  const availableEngineers =
    engineers.filter(
      (engineer) =>
        engineer.isAvailable === true
    ).length;


  const totalDepartments =
    new Set(
      engineers
        .map(
          (engineer) =>
            engineer.department
        )
        .filter(Boolean)
    ).size;


  /* ==========================================================
     JSX
  ========================================================== */

  return (

    <div className="engineer-page">


      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="page-header">

        <div>

          <h1>
            Engineer Information
          </h1>

          <p>
            View and monitor all registered engineers
            across departments.
          </p>

        </div>

      </div>


      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="summary-grid">


        {/* TOTAL ENGINEERS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Total Engineers
            </h4>

            <h2>
              {totalEngineers}
            </h2>

          </div>

        </div>


        {/* ACTIVE ENGINEERS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Active Engineers
            </h4>

            <h2>
              {activeEngineers}
            </h2>

          </div>

        </div>


        {/* AVAILABLE ENGINEERS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Available Engineers
            </h4>

            <h2>
              {availableEngineers}
            </h2>

          </div>

        </div>


        {/* DEPARTMENTS */}

        {/* <div className="summary-card">

          <div className="summary-info">

            <h4>
              Departments
            </h4>

            <h2>
              {totalDepartments}
            </h2>

          </div>

        </div> */}

      </div>

      {/* ======================================================
          SEARCH & FILTER TOOLBAR
      ====================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search engineer by ID, name, email or department..."
            value={search}
            onChange={(e) => {

              setSearch(e.target.value);

              setCurrentPage(1);

            }}
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="engineer-filter-select"
        >
          <option value="All">All Applications</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>


      {/* ======================================================
          ENGINEER TABLE
      ====================================================== */}

      <div className="dashboard-boxs">


        {/* TABLE HEADER */}

        <div className="card-header">

          <div>

            <h2>
              Registered Engineers
            </h2>

            <p>

              Showing{" "}

              {currentEngineers.length}

              {" "}of{" "}

              {filteredEngineers.length}

              {" "}engineers.

            </p>

          </div>

        </div>


        {/* TABLE */}

        <div className="table-wrapper">

          <table className="dashboard-table">


            {/* ==================================================
                TABLE HEAD
            ================================================== */}

            <thead>

              <tr>

                <th>
                  Engineer ID
                </th>

                <th>
                  Engineer Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Department
                </th>

                {/* <th>
                  Application
                </th> */}

                <th>
                  Status
                </th>

                {/* <th>
                  Availability
                </th> */}

                <th>
                  Action
                </th>

              </tr>

            </thead>


            {/* ==================================================
                TABLE BODY
            ================================================== */}

            <tbody>


              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-row"
                  >

                    Loading engineers...

                  </td>

                </tr>

              )


              /* DATA */

              : currentEngineers.length > 0 ? (

                currentEngineers.map(
                  (engineer,index) => (

                    <tr
                      key={
                        engineer.engineerId
                      }
                    >


                      {/* ENGINEER ID */}

                      <td>

                        {indexOfFirstEngineer +
                                                    index +
                                                    1}
                      </td>


                      {/* ENGINEER NAME */}

                      <td>

                        <strong>

                          {engineer.firstName || ""}

                          {" "}

                          {engineer.lastName || ""}

                        </strong>

                      </td>


                      {/* EMAIL */}

                      <td>

                        {engineer.email || "-"}

                      </td>


                      {/* MOBILE */}

                      <td>

                        {engineer.contact || "-"}

                      </td>


                      {/* DEPARTMENT */}

                      <td>

                        {engineer.department || "-"}

                      </td>


                      {/* APPLICATION STATUS */}

                      {/* <td>

                        <span
                          className={
                            getApplicationStatus(engineer) === "Approved"
                              ? "status active"
                              : getApplicationStatus(engineer) === "Rejected"
                              ? "status inactive"
                              : "status pending"
                          }
                        >

                          {getApplicationStatus(engineer)}

                        </span>

                      </td> */}


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            engineer.isActive
                              ? "status active"
                              : "status inactive"
                          }
                        >

                          {engineer.isActive
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>


                      {/* AVAILABILITY */}

                      {/* <td>

                        <span
                          className={
                            engineer.isAvailable
                              ? "status available"
                              : "status unavailable"
                          }
                        >

                          {engineer.isAvailable
                            ? "Available"
                            : "Unavailable"}

                        </span>

                      </td> */}


                      {/* ACTION */}

                      <td>

                        <div className="action-buttons-cell">

                          {/* <button
                            type="button"
                            className="view-engineer-btn"
                            onClick={() => openDetails(engineer)}
                            title="View Engineer Details"
                          >

                            <FaEye /> View

                          </button> */}

                          {getApplicationStatus(engineer) === "Approved" && (

                            engineer.isActive ? (

                              <button
                                type="button"
                                className="deactivate-btn-action"
                                onClick={() => deactivateEngineer(engineer.engineerId)}
                                disabled={processingId === engineer.engineerId}
                                title="Deactivate Engineer"
                              >

                                <FaUserSlash />

                                {processingId === engineer.engineerId ? "..." : "Deactivate"}

                              </button>

                            ) : (

                              <button
                                type="button"
                                className="activate-btn-action"
                                onClick={() => activateEngineer(engineer.engineerId)}
                                disabled={processingId === engineer.engineerId}
                                title="Activate Engineer"
                              >

                                <FaUserCheck />

                                {processingId === engineer.engineerId ? "..." : "Activate"}

                              </button>

                            )

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )


              /* NO DATA */

              : (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-row"
                  >

                    {search || statusFilter !== "All"
                      ? "No engineers found matching your search and filter."
                      : "No engineers found."
                    }

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {filteredEngineers.length >
        engineersPerPage && (

        <div className="pagination-wrapper">


          {/* PREVIOUS */}

          <button
            onClick={() =>
              paginate(
                currentPage - 1
              )
            }
            disabled={
              currentPage === 1
            }
          >

            <FaChevronLeft />

            Previous

          </button>


          {/* PAGE NUMBERS */}

          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    paginate(
                      index + 1
                    )
                  }
                  className={
                    currentPage ===
                    index + 1
                      ? "active-page"
                      : ""
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          {/* NEXT */}

          <button
            onClick={() =>
              paginate(
                currentPage + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      )}


      {/* ======================================================
          VIEW DETAILS MODAL
      ====================================================== */}

      {showDetails && selectedEngineer && (

        <div className="engineer-modal-overlay">

          <div className="engineer-modal">

            <div className="engineer-modal-header">

              <div>

                <h2>

                  {selectedEngineer.firstName} {selectedEngineer.lastName}

                </h2>

                <p>Engineer ID: ENG-{selectedEngineer.engineerId}</p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedEngineer(null);
                }}
              >

                <FaTimes />

              </button>

            </div>

            <div className="engineer-details-grid">

              <div>

                <strong>Email</strong>

                <span>{selectedEngineer.email || "-"}</span>

              </div>

              <div>

                <strong>Contact</strong>

                <span>{selectedEngineer.contact || "-"}</span>

              </div>

              <div>

                <strong>Department</strong>

                <span>{selectedEngineer.department || "-"}</span>

              </div>

              <div>

                <strong>Qualification</strong>

                <span>{selectedEngineer.highestQualification || "-"}</span>

              </div>

              <div>

                <strong>Experience</strong>

                <span>

                  {selectedEngineer.experience != null
                    ? `${selectedEngineer.experience} Years`
                    : "-"}

                </span>

              </div>

              <div>

                <strong>Branch</strong>

                <span>{selectedEngineer.engineerBranch || "-"}</span>

              </div>

              <div className="full">

                <strong>Address</strong>

                <span>{selectedEngineer.address || "-"}</span>

              </div>

            </div>

            {/* DOCUMENTS */}

            {(selectedEngineer.degreeCertificate || selectedEngineer.experienceCertificate) && (

              <div className="engineer-documents">

                <h3>Submitted Documents & Certificates</h3>

                <div className="document-cards-grid">

                  {selectedEngineer.degreeCertificate && (

                    <div className="doc-card">

                      <div className="doc-card-header">

                        <span className="doc-type-badge">Degree Certificate</span>

                        <button
                          type="button"
                          className="doc-open-link"
                          onClick={() => openDocument(selectedEngineer.degreeCertificate)}
                          title="Open in new tab"
                        >

                          External ↗

                        </button>

                      </div>

                      <div
                        className="doc-image-wrapper"
                        onClick={() =>
                          setPreviewDoc({
                            title: "Degree Certificate",
                            url: `${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/degree`,
                          })
                        }
                      >

                        <img
                          src={`${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/degree`}
                          alt="Degree Certificate"
                          className="doc-preview-img"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = "flex";
                            }
                          }}
                        />

                        <div className="doc-fallback-view" style={{ display: "none" }}>

                          <FaFilePdf />

                          <span>Click to View Certificate</span>

                        </div>

                        <div className="doc-overlay-hover">

                          <FaEye /> Click to View Full Size

                        </div>

                      </div>

                    </div>

                  )}

                  {selectedEngineer.experienceCertificate && (

                    <div className="doc-card">

                      <div className="doc-card-header">

                        <span className="doc-type-badge">Experience Certificate</span>

                        <button
                          type="button"
                          className="doc-open-link"
                          onClick={() => openDocument(selectedEngineer.experienceCertificate)}
                          title="Open in new tab"
                        >

                          External ↗

                        </button>

                      </div>

                      <div
                        className="doc-image-wrapper"
                        onClick={() =>
                          setPreviewDoc({
                            title: "Experience Certificate",
                            url: `${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/experience`,
                          })
                        }
                      >

                        <img
                          src={`${API_BASE_URL}/admin/engineers/${selectedEngineer.engineerId}/document/experience`}
                          alt="Experience Certificate"
                          className="doc-preview-img"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = "flex";
                            }
                          }}
                        />

                        <div className="doc-fallback-view" style={{ display: "none" }}>

                          <FaFilePdf />

                          <span>Click to View Certificate</span>

                        </div>

                        <div className="doc-overlay-hover">

                          <FaEye /> Click to View Full Size

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            )}

            {/* REJECTION REASON */}

            {selectedEngineer.isRejected === true && (

              <div className="rejection-box">

                <strong>Rejection Reason</strong>

                <p>{selectedEngineer.rejectedReason || "No reason specified."}</p>

              </div>

            )}

            {/* MODAL ACTIONS - ACTIVE / DISACTIVE BUTTON */}

            <div className="engineer-modal-actions">

              {getApplicationStatus(selectedEngineer) === "Approved" && (

                selectedEngineer.isActive ? (

                  <button
                    type="button"
                    className="deactivate-btn"
                    onClick={() => deactivateEngineer(selectedEngineer.engineerId)}
                    disabled={processingId === selectedEngineer.engineerId}
                  >

                    <FaUserSlash />

                    {processingId === selectedEngineer.engineerId
                      ? "Deactivating..."
                      : "Deactivate"}

                  </button>

                ) : (

                  <button
                    type="button"
                    className="activate-btn"
                    onClick={() => activateEngineer(selectedEngineer.engineerId)}
                    disabled={processingId === selectedEngineer.engineerId}
                  >

                    <FaUserCheck />

                    {processingId === selectedEngineer.engineerId
                      ? "Activating..."
                      : "Activate"}

                  </button>

                )

              )}

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowDetails(false);
                  setSelectedEngineer(null);
                }}
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          FULL DOCUMENT ZOOM MODAL
      ====================================================== */}

      {previewDoc && (

        <div
          className="document-zoom-overlay"
          onClick={() => setPreviewDoc(null)}
        >

          <div
            className="document-zoom-container"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="document-zoom-header">

              <h3>{previewDoc.title}</h3>

              <button
                type="button"
                className="zoom-close-btn"
                onClick={() => setPreviewDoc(null)}
              >

                <FaTimes />

              </button>

            </div>

            <div className="document-zoom-body">

              <img
                src={previewDoc.url}
                alt={previewDoc.title}
                className="document-zoom-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = "block";
                  }
                }}
              />

              <div className="zoom-fallback-frame" style={{ display: "none" }}>

                <iframe
                  src={previewDoc.url}
                  title={previewDoc.title}
                  className="document-zoom-iframe"
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default EngineerManagement;
