import "../department/EngineerManage.css";
import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function DepartmentManagement() {

  /* ==========================================================
     STATES
  ========================================================== */

  const [engineers, setEngineers] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const engineersPerPage = 5;


  /* ==========================================================
     GET ENGINEERS OF LOGGED-IN DEPARTMENT
  ========================================================== */

  useEffect(() => {

    const fetchEngineers = async () => {

      try {

        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:8085/api/department/engineers",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {

          if (response.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }

          if (response.status === 403) {
            throw new Error(
              "You do not have permission to view engineers."
            );
          }

          throw new Error("Failed to load engineers.");
        }

        const data = await response.json();

        /*
         * Backend returns:
         *
         * {
         *   content: [...]
         * }
         */

        const engineerList = data.content || [];

        setEngineers(engineerList);

      } catch (err) {

        console.error("Error loading engineers:", err);

        setError(
          err.message ||
          "Unable to load engineers."
        );

        setEngineers([]);

      } finally {

        setLoading(false);

      }

    };

    fetchEngineers();

  }, []);


  /* ==========================================================
     SEARCH
  ========================================================== */

  const filteredEngineers = useMemo(() => {

    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return engineers;
    }

    return engineers.filter((item) => {

      const engineerId =
        String(item.engineerId || "").toLowerCase();

      const userId =
        String(item.userId || "").toLowerCase();

      const firstName =
        String(item.firstName || "").toLowerCase();

      const lastName =
        String(item.lastName || "").toLowerCase();

      const email =
        String(item.email || "").toLowerCase();

      const contact =
        String(item.contact || "").toLowerCase();

      const department =
        String(item.department || "").toLowerCase();

      return (
        engineerId.includes(keyword) ||
        userId.includes(keyword) ||
        firstName.includes(keyword) ||
        lastName.includes(keyword) ||
        email.includes(keyword) ||
        contact.includes(keyword) ||
        department.includes(keyword)
      );

    });

  }, [engineers, search]);


  /* ==========================================================
     RESET PAGE WHEN SEARCH CHANGES
  ========================================================== */

  useEffect(() => {

    setCurrentPage(1);

  }, [search]);


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


  /* ==========================================================
     NEXT PAGE
  ========================================================== */

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };


  /* ==========================================================
     PREVIOUS PAGE
  ========================================================== */

  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };


  /* ==========================================================
     JSX
  ========================================================== */

  return (

    <div className="assigned-page">

      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            Engineer Management
          </h1>

          <p>
            View engineers assigned to your department.
          </p>

        </div>

      </div>


      {/* ==========================================================
          SEARCH TOOLBAR
      ========================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Engineer ID, Name or Email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

        </div>

      </div>


      {/* ==========================================================
          ENGINEER TABLE
      ========================================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>
            Engineer List
          </h2>

        </div>


        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>
                  Engineer ID
                </th>

                <th>
                  Name
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

              </tr>

            </thead>


            <tbody>

              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-row"
                  >

                    Loading engineers...

                  </td>

                </tr>

              ) : error ? (

                /* ==================================================
                   ERROR
                ================================================== */

                <tr>

                  <td
                    colSpan="5"
                    className="empty-row"
                  >

                    {error}

                  </td>

                </tr>

              ) : currentEngineers.length === 0 ? (

                /* ==================================================
                   NO ENGINEERS
                ================================================== */

                <tr>

                  <td
                    colSpan="5"
                    className="empty-row"
                  >

                    No engineer found.

                  </td>

                </tr>

              ) : (

                /* ==================================================
                   ENGINEER DATA
                ================================================== */

                currentEngineers.map((item) => (

                  <tr
                    key={item.engineerId}
                  >

                    {/* Engineer ID */}

                    <td className="complaint-id">

                      ENG-{item.engineerId}

                    </td>


                    {/* Name */}

                    <td>

                      <strong>

                        {item.firstName}{" "}

                        {item.lastName}

                      </strong>

                    </td>


                    {/* Email */}

                    <td>

                      {item.email}

                    </td>


                    {/* Mobile */}

                    <td>

                      {item.contact}

                    </td>


                    {/* Department */}

                    <td>

                      {item.department}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {filteredEngineers.length > engineersPerPage && (

        <div className="pagination-wrapper">

          {/* Previous */}

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
          >

            <FaChevronLeft />

            Previous

          </button>


          {/* Page Numbers */}

          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          {/* Next */}

          <button
            onClick={nextPage}
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

export default DepartmentManagement;