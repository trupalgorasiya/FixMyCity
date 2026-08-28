
import { useEffect, useMemo, useState } from "react";
import "./EngineerManagement.css";

import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function EngineerManagement() {

  /* ==========================================================
     STATES
  ========================================================== */

  const [engineers, setEngineers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const engineersPerPage = 5;


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
          "http://localhost:8085/api/admin/engineers",
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
     SEARCH ENGINEERS
  ========================================================== */

  const filteredEngineers = useMemo(() => {

    const keyword = search
      .toLowerCase()
      .trim();


    if (!keyword) {

      return engineers;

    }


    return engineers.filter((engineer) => {

      const fullName =
        `${engineer.firstName || ""} ${engineer.lastName || ""}`
          .toLowerCase();


      return (

        String(engineer.engineerId || "")
          .toLowerCase()
          .includes(keyword)

        ||

        fullName.includes(keyword)

        ||

        String(engineer.email || "")
          .toLowerCase()
          .includes(keyword)

        ||

        String(engineer.contact || "")
          .toLowerCase()
          .includes(keyword)

        ||

        String(engineer.department || "")
          .toLowerCase()
          .includes(keyword)

      );

    });

  }, [engineers, search]);


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

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Departments
            </h4>

            <h2>
              {totalDepartments}
            </h2>

          </div>

        </div>

      </div>


      {/* ======================================================
          SEARCH
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

      </div>


      {/* ======================================================
          ENGINEER TABLE
      ====================================================== */}

      <div className="dashboard-box">


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

                <th>
                  Status
                </th>

                <th>
                  Availability
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
                    colSpan="7"
                    className="empty-row"
                  >

                    Loading engineers...

                  </td>

                </tr>

              )


              /* DATA */

              : currentEngineers.length > 0 ? (

                currentEngineers.map(
                  (engineer) => (

                    <tr
                      key={
                        engineer.engineerId
                      }
                    >


                      {/* ENGINEER ID */}

                      <td>

                        {engineer.engineerId}

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

                      <td>

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

                      </td>

                    </tr>

                  )
                )

              )


              /* NO DATA */

              : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >

                    {search
                      ? "No engineers found matching your search."
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

    </div>

  );

}

export default EngineerManagement;
