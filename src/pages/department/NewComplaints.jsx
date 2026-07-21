import { useMemo, useState } from "react";
import "./NewComplaints.css";

import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function NewComplaints() {
  const [assignedPriority, setAssignedPriority] = useState("");

  /* ==========================================================
     DUMMY COMPLAINT DATA
  ========================================================== */

  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      citizen: "Jeel Bhalani",
      category: "Garbage Collection",
      location: "Nikol",
      priority: "",
      date: "16 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP002",
      citizen: "Rahul Patel",
      category: "Garbage Collection",
      location: "Bopal",
      priority: "",
      date: "16 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP003",
      citizen: "Amit Shah",
      category: "Garbage Collection",
      location: "Satellite",
      priority: "",
      date: "15 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP004",
      citizen: "Priya Patel",
      category: "Garbage Collection",
      location: "Gota",
      priority: "",
      date: "15 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP005",
      citizen: "Harsh Patel",
      category: "Garbage Collection",
      location: "Naroda",
      priority: "",
      date: "14 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP006",
      citizen: "Riya Shah",
      category: "Garbage Collection",
      location: "Chandkheda",
      priority: "",
      date: "14 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP007",
      citizen: "Vivek Mehta",
      category: "Garbage Collection",
      location: "Maninagar",
      priority: "",
      date: "13 Jul 2026",
      status: "New",
      engineer: "",
    },

    {
      id: "CMP008",
      citizen: "Karan Joshi",
      category: "Garbage Collection",
      location: "Vastrapur",
      priority: "",
      date: "13 Jul 2026",
      status: "New",
      engineer: "",
    },
  ]);

  /* ==========================================================
     STATES
  ========================================================== */

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [selectedEngineer, setSelectedEngineer] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const complaintsPerPage = 5;

  /* ==========================================================
     ENGINEERS
  ========================================================== */

  const engineers = [
    {
      id: 1,
      name: "Rahul Sharma",
    },

    {
      id: 2,
      name: "Karan Patel",
    },

    {
      id: 3,
      name: "Amit Singh",
    },

    {
      id: 4,
      name: "Vivek Kumar",
    },

    {
      id: 5,
      name: "Jay Mehta",
    },
  ];

  /* ==========================================================
     SEARCH & FILTER
  ========================================================== */

  const filteredComplaints = useMemo(() => {

    return complaints.filter((item) => {

      const keyword =
        searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(keyword) ||
        item.citizen.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [
    complaints,
    searchTerm,
    categoryFilter,
  ]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages = Math.ceil(
    filteredComplaints.length /
      complaintsPerPage
  );

  const indexOfLastComplaint =
    currentPage * complaintsPerPage;

  const indexOfFirstComplaint =
    indexOfLastComplaint -
    complaintsPerPage;

  const currentComplaints =
    filteredComplaints.slice(
      indexOfFirstComplaint,
      indexOfLastComplaint
    );

  const nextPage = () => {

    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }

  };

  const previousPage = () => {

    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }

  };

  /* ==========================================================
     OPEN ASSIGN MODAL
  ========================================================== */

  const openAssignModal = (complaint) => {

    setSelectedComplaint(complaint);

  setSelectedEngineer("");

  setAssignedPriority(complaint.priority);

};

  /* ==========================================================
     ASSIGN ENGINEER
  ========================================================== */

  const assignEngineer = () => {

    if (!selectedEngineer) {
      alert("Please select an engineer.");
      return;
    }
    if (!assignedPriority) {
      alert("Please select a priority.");
      return;
    }

    const updatedComplaints =
      complaints.map((item) => {

        if (
          item.id ===
          selectedComplaint.id
        ) {

          return {
            ...item,
            engineer:selectedEngineer,
            priority: assignedPriority,
            status: "Assigned",
          };

        }

        return item;

      });

    setComplaints(updatedComplaints);

    setSelectedComplaint(null);

    setSelectedEngineer("");
    setAssignedPriority("");

    alert(
      "Engineer Assigned Successfully"
    );

  };

  /* ==========================================================
     JSX START
  ========================================================== */

  return (

    <div className="assigned-page">

      {/* ==========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            New Complaints
          </h1>

          <p>
            Review newly submitted
            complaints and assign
            them to department
            engineers.
          </p>

        </div>

      </div>

      {/* ==========================================================
          SEARCH & FILTER
      ========================================================== */}

      <div className="complaint-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Complaint ID, Citizen or Category..."
            value={searchTerm}
            onChange={(e) => {

              setSearchTerm(
                e.target.value
              );

              setCurrentPage(1);

            }}
          />

        </div>

        <div className="toolbar-right">

          <div className="filter-box">

            <FaFilter />

            <select
              value={categoryFilter}
              onChange={(e) => {

                setCategoryFilter(
                  e.target.value
                );

                setCurrentPage(1);

              }}
            >

              <option>
                All
              </option>

              <option>
                Garbage Collection
              </option>

              <option>
                Road Damage
              </option>

              <option>
                Street Light
              </option>

              <option>
                Water Leakage
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ==========================================================
          COMPLAINT TABLE
      ========================================================== */}
{/* ==========================================================
          COMPLAINT TABLE
      ========================================================== */}

      <div className="assigned-card">

        <div className="card-header">

          <h2>New Complaint List</h2>

        </div>

        <div className="table-wrapper">

          <table className="assigned-table">

            <thead>

              <tr>

                <th>Complaint ID</th>

                <th>Citizen</th>

                <th>Category</th>

                <th>Location</th>

                <th>Priority</th>

                <th>Date</th>

                <th>Engineer</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentComplaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-row"
                  >
                    No complaints found.
                  </td>

                </tr>

              ) : (

                currentComplaints.map((item) => (

                  <tr key={item.id}>

                    {/* Complaint ID */}

                    <td className="complaint-id">
                      {item.id}
                    </td>

                    {/* Citizen */}

                    <td>

                      <strong>{item.citizen}</strong>

                    </td>

                    {/* Category */}

                    <td>

                      {item.category}

                    </td>

                    {/* Location */}

                    <td>

                      {item.location}

                    </td>

                    {/* Priority */}

                    <td>

                      {item.priority ? (

                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>

                    ) : (

                      <span>-</span>

                    )}

                    </td>

                    {/* Date */}

                    <td>

                      {item.date}

                    </td>

                    {/* Engineer */}

                    <td>

                      {item.engineer || "-"}

                    </td>

                    {/* Action */}

                    <td>

                      {item.status === "New" ? (

                        <button
                          className="assign-btn"
                          onClick={() =>
                            openAssignModal(item)
                          }
                        >
                          Assign
                        </button>

                      ) : (

                        <button
                          className="assigned-btn"
                          disabled
                        >
                          Assigned
                        </button>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
            {/* ==========================================================
          ASSIGN ENGINEER MODAL
      ========================================================== */}

      {selectedComplaint && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedComplaint(null)}
        >

          <div
            className="assign-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ======================================================
                MODAL HEADER
            ====================================================== */}

            <div className="modal-header">

              <h2>Assign Engineer</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                ✕
              </button>

            </div>

            {/* ======================================================
    MODAL BODY
====================================================== */}

<div className="assign-form">

  {/* Complaint ID */}

  <div className="form-group">

    <label>Complaint ID</label>

    <input
      type="text"
      value={selectedComplaint.id}
      readOnly
    />

  </div>



  {/* Assign Priority */}

  <div className="form-group">

    <label>Assign Priority</label>

    <select
  value={assignedPriority}
  onChange={(e) =>
    setAssignedPriority(e.target.value)
  }
>

  <option value="">
    Select Priority
  </option>

  <option value="High">
    High
  </option>

  <option value="Medium">
    Medium
  </option>

  <option value="Low">
    Low
  </option>

</select>

  </div>

  {/* Engineer */}

  <div className="form-group">

    <label>Select Engineer</label>

    <select
      value={selectedEngineer}
      onChange={(e) =>
        setSelectedEngineer(e.target.value)
      }
    >

      <option value="">
        Choose Engineer
      </option>

      {engineers.map((eng) => (

        <option
          key={eng.id}
          value={eng.name}
        >
          {eng.name}
        </option>

      ))}

    </select>

  </div>

</div>

            {/* ======================================================
                MODAL BUTTONS
            ====================================================== */}

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={assignEngineer}
              >
                Assign Engineer
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ==========================================================
          PAGINATION
      ========================================================== */}

      {filteredComplaints.length >
        complaintsPerPage && (

        <div className="pagination-wrapper">

          <button
            onClick={previousPage}
            disabled={currentPage === 1}
          >

            <FaChevronLeft />

            Previous

          </button>

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
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>

              )
            )}

          </div>

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

export default NewComplaints;