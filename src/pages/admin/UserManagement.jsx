import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/axios";
import "./UserManagement.css";

import {
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaClipboardList,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function UserInformation() {

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const usersPerPage = 5;


  /* =====================================================
     GET CITIZENS
  ===================================================== */

  useEffect(() => {

    const fetchCitizens = async () => {

      try {

        setLoading(true);

        /*
         * Get JWT of logged-in ADMIN
         */
        const token = localStorage.getItem("token");

        if (!token) {

          throw new Error(
            "Admin JWT token not found. Please login again."
          );

        }


        /*
         * Call Admin Citizen API
         */
        const response = await fetch(
          `${API_BASE_URL}/admin/citizens?page=0&size=10`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );


        /*
         * Read response
         */
        const data = await response.json();


        console.log(
          "Citizen API Status:",
          response.status
        );

        console.log(
          "Citizen API Response:",
          data
        );


        /*
         * Check API response
         */
        if (!response.ok) {

          throw new Error(
            data.message ||
            `Failed to load citizens: ${response.status}`
          );

        }


        /*
         * Backend returns Page< Citizen >
         *
         * {
         *   content: [...]
         * }
         */
        setUsers(
          Array.isArray(data.content)
            ? data.content
            : []
        );

      } catch (error) {

        console.error(
          "Error loading citizens:",
          error
        );

        setUsers([]);

      } finally {

        setLoading(false);

      }

    };


    fetchCitizens();

  }, []);


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredUsers = users.filter((user) => {

    const keyword =
      search.toLowerCase().trim();


    /*
     * Null-safe values
     */
    const firstName =
      user.firstName || "";

    const lastName =
      user.lastName || "";

    const email =
      user.email || "";

    const contact =
      user.contact || "";

    const citizenId =
      user.citizenId || "";


    const fullName =
      `${firstName} ${lastName}`.toLowerCase();


    return (

      fullName.includes(keyword) ||

      email
        .toLowerCase()
        .includes(keyword) ||

      contact.includes(keyword) ||

      String(citizenId)
        .toLowerCase()
        .includes(keyword)

    );

  });


  /* =====================================================
     PAGINATION
  ===================================================== */

  const indexOfLast =
    currentPage * usersPerPage;

  const indexOfFirst =
    indexOfLast - usersPerPage;


  const currentUsers =
    filteredUsers.slice(
      indexOfFirst,
      indexOfLast
    );


  const totalPages =
    Math.ceil(
      filteredUsers.length /
      usersPerPage
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


  /* =====================================================
     SUMMARY
  ===================================================== */

  const totalCitizens =
    users.length;


  /* =====================================================
     JSX
  ===================================================== */

  return (

    <div className="user-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div>

          <h1>
            Citizen Information
          </h1>

          <p>
            View, search and monitor all registered citizens.
          </p>

        </div>

      </div>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="summary-grid">


        {/* TOTAL CITIZENS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Total Citizens
            </h4>

            <h2>
              {totalCitizens}
            </h2>

          </div>

          <div className="summary-icon">

            <FaUsers />

          </div>

        </div>


        {/* REGISTERED CITIZENS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Registered Citizens
            </h4>

            <h2>
              {totalCitizens}
            </h2>

          </div>

          <div className="summary-icon">

            <FaUserCheck />

          </div>

        </div>


        {/* CITIZEN RECORDS */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Citizen Records
            </h4>

            <h2>
              {users.length}
            </h2>

          </div>

          <div className="summary-icon">

            <FaClipboardList />

          </div>

        </div>


        {/* CITIZEN ROLE */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Citizen Role
            </h4>

            <h2>
              CITIZEN
            </h2>

          </div>

          <div className="summary-icon">

            <FaCheckCircle />

          </div>

        </div>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search citizen by ID, name, email or mobile..."
            value={search}
            onChange={(e) => {

              setSearch(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />

        </div>

      </div>


      {/* =====================================================
          CITIZEN TABLE
      ===================================================== */}

      <div className="dashboard-box">


        {/* CARD HEADER */}

        <div className="card-header">

          <div>

            <h2>
              Registered Citizens
            </h2>

            <p>

              Showing{" "}
              {currentUsers.length}{" "}

              of{" "}
              {filteredUsers.length}{" "}

              registered citizens.

            </p>

          </div>

        </div>


        {/* TABLE */}

        <div className="table-wrapper">

          <table className="dashboard-table">


            {/* TABLE HEADER */}

            <thead>

              <tr>

                <th>
                  No.
                </th>

                <th>
                  Citizen Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Registered On
                </th>

                <th>
                  Role
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}

            <tbody>


              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >

                    Loading citizens...

                  </td>

                </tr>

              ) : currentUsers.length > 0 ? (


                /* CITIZEN DATA */

                currentUsers.map((user, index) => (

                  <tr
                    key={user.citizenId}
                  >


                    {/* CITIZEN ID */}

                    <td>

                     {indexOfFirst + index + 1}

                    </td>


                    {/* NAME */}

                    <td>

                      <strong>

                        {user.firstName || "-"}{" "}

                        {user.lastName || ""}

                      </strong>

                    </td>


                    {/* EMAIL */}

                    <td>

                      {user.email || "-"}

                    </td>


                    {/* MOBILE */}

                    <td>

                      {user.contact || "-"}

                    </td>


                    {/* CREATED DATE */}

                    <td>

                      {user.createdAt

                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )

                        : "-"

                      }

                    </td>


                    {/* ROLE */}

                    <td>

                      {user.role || "-"}

                    </td>


                  </tr>

                ))


              ) : (


                /* NO DATA */

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >

                    No citizens found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {filteredUsers.length > usersPerPage && (

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
              currentPage ===
              totalPages
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

export default UserInformation; 