// import { useMemo, useState } from "react";
// import "./NewComplaints.css";

// import {
//   FaSearch,
//   FaFilter,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// function NewComplaints() {
//   const [assignedPriority, setAssignedPriority] = useState("");

//   /* ==========================================================
//      DUMMY COMPLAINT DATA
//   ========================================================== */

//   const [complaints, setComplaints] = useState([
//     {
//       id: "CMP001",
//       citizen: "Jeel Bhalani",
//       category: "Garbage Collection",
//       location: "Nikol",
//       priority: "",
//       date: "16 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP002",
//       citizen: "Rahul Patel",
//       category: "Garbage Collection",
//       location: "Bopal",
//       priority: "",
//       date: "16 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP003",
//       citizen: "Amit Shah",
//       category: "Garbage Collection",
//       location: "Satellite",
//       priority: "",
//       date: "15 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP004",
//       citizen: "Priya Patel",
//       category: "Garbage Collection",
//       location: "Gota",
//       priority: "",
//       date: "15 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP005",
//       citizen: "Harsh Patel",
//       category: "Garbage Collection",
//       location: "Naroda",
//       priority: "",
//       date: "14 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP006",
//       citizen: "Riya Shah",
//       category: "Garbage Collection",
//       location: "Chandkheda",
//       priority: "",
//       date: "14 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP007",
//       citizen: "Vivek Mehta",
//       category: "Garbage Collection",
//       location: "Maninagar",
//       priority: "",
//       date: "13 Jul 2026",
//       status: "New",
//       engineer: "",
//     },

//     {
//       id: "CMP008",
//       citizen: "Karan Joshi",
//       category: "Garbage Collection",
//       location: "Vastrapur",
//       priority: "",
//       date: "13 Jul 2026",
//       status: "New",
//       engineer: "",
//     },
//   ]);

//   /* ==========================================================
//      STATES
//   ========================================================== */

//   const [searchTerm, setSearchTerm] = useState("");

//   const [categoryFilter, setCategoryFilter] =
//     useState("All");

//   const [selectedComplaint, setSelectedComplaint] =
//     useState(null);

//   const [selectedEngineer, setSelectedEngineer] =
//     useState("");

//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const complaintsPerPage = 5;

//   /* ==========================================================
//      ENGINEERS
//   ========================================================== */

//   const engineers = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//     },

//     {
//       id: 2,
//       name: "Karan Patel",
//     },

//     {
//       id: 3,
//       name: "Amit Singh",
//     },

//     {
//       id: 4,
//       name: "Vivek Kumar",
//     },

//     {
//       id: 5,
//       name: "Jay Mehta",
//     },
//   ];

//   /* ==========================================================
//      SEARCH & FILTER
//   ========================================================== */

//   const filteredComplaints = useMemo(() => {

//     return complaints.filter((item) => {

//       const keyword =
//         searchTerm.toLowerCase();

//       const matchesSearch =
//         item.id.toLowerCase().includes(keyword) ||
//         item.citizen.toLowerCase().includes(keyword) ||
//         item.category.toLowerCase().includes(keyword);

//       const matchesCategory =
//         categoryFilter === "All" ||
//         item.category === categoryFilter;

//       return (
//         matchesSearch &&
//         matchesCategory
//       );

//     });

//   }, [
//     complaints,
//     searchTerm,
//     categoryFilter,
//   ]);

//   /* ==========================================================
//      PAGINATION
//   ========================================================== */

//   const totalPages = Math.ceil(
//     filteredComplaints.length /
//       complaintsPerPage
//   );

//   const indexOfLastComplaint =
//     currentPage * complaintsPerPage;

//   const indexOfFirstComplaint =
//     indexOfLastComplaint -
//     complaintsPerPage;

//   const currentComplaints =
//     filteredComplaints.slice(
//       indexOfFirstComplaint,
//       indexOfLastComplaint
//     );

//   const nextPage = () => {

//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }

//   };

//   const previousPage = () => {

//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }

//   };

//   /* ==========================================================
//      OPEN ASSIGN MODAL
//   ========================================================== */

//   const openAssignModal = (complaint) => {

//     setSelectedComplaint(complaint);

//   setSelectedEngineer("");

//   setAssignedPriority(complaint.priority);

// };

//   /* ==========================================================
//      ASSIGN ENGINEER
//   ========================================================== */

//   const assignEngineer = () => {

//     if (!selectedEngineer) {
//       alert("Please select an engineer.");
//       return;
//     }
//     if (!assignedPriority) {
//       alert("Please select a priority.");
//       return;
//     }

//     const updatedComplaints =
//       complaints.map((item) => {

//         if (
//           item.id ===
//           selectedComplaint.id
//         ) {

//           return {
//             ...item,
//             engineer:selectedEngineer,
//             priority: assignedPriority,
//             status: "Assigned",
//           };

//         }

//         return item;

//       });

//     setComplaints(updatedComplaints);

//     setSelectedComplaint(null);

//     setSelectedEngineer("");
//     setAssignedPriority("");

//     alert(
//       "Engineer Assigned Successfully"
//     );

//   };

//   /* ==========================================================
//      JSX START
//   ========================================================== */

//   return (

//     <div className="assigned-page">

//       {/* ==========================================================
//           PAGE HEADER
//       ========================================================== */}

//       <div className="assigned-header">

//         <div>

//           <h1>
//             New Complaints
//           </h1>

//           <p>
//             Review newly submitted
//             complaints and assign
//             them to department
//             engineers.
//           </p>

//         </div>

//       </div>

//       {/* ==========================================================
//           SEARCH & FILTER
//       ========================================================== */}

//       <div className="complaint-toolbar">

//         <div className="search-box">

//           <FaSearch />

//           <input
//             type="text"
//             placeholder="Search Complaint ID, Citizen or Category..."
//             value={searchTerm}
//             onChange={(e) => {

//               setSearchTerm(
//                 e.target.value
//               );

//               setCurrentPage(1);

//             }}
//           />

//         </div>

//         <div className="toolbar-right">

//           <div className="filter-box">

//             <FaFilter />

//             <select
//               value={categoryFilter}
//               onChange={(e) => {

//                 setCategoryFilter(
//                   e.target.value
//                 );

//                 setCurrentPage(1);

//               }}
//             >

//               <option>
//                 All
//               </option>

//               <option>
//                 Garbage Collection
//               </option>

//               <option>
//                 Road Damage
//               </option>

//               <option>
//                 Street Light
//               </option>

//               <option>
//                 Water Leakage
//               </option>

//             </select>

//           </div>

//         </div>

//       </div>

//       {/* ==========================================================
//           COMPLAINT TABLE
//       ========================================================== */}
// {/* ==========================================================
//           COMPLAINT TABLE
//       ========================================================== */}

//       <div className="assigned-card">

//         <div className="card-header">

//           <h2>New Complaint List</h2>

//         </div>

//         <div className="table-wrapper">

//           <table className="assigned-table">

//             <thead>

//               <tr>

//                 <th>Complaint ID</th>

//                 <th>Citizen</th>

//                 <th>Category</th>

//                 <th>Location</th>

//                 <th>Priority</th>

//                 <th>Date</th>

//                 <th>Engineer</th>

//                 <th>Action</th>

//               </tr>

//             </thead>

//             <tbody>

//               {currentComplaints.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan="9"
//                     className="empty-row"
//                   >
//                     No complaints found.
//                   </td>

//                 </tr>

//               ) : (

//                 currentComplaints.map((item) => (

//                   <tr key={item.id}>

//                     {/* Complaint ID */}

//                     <td className="complaint-id">
//                       {item.id}
//                     </td>

//                     {/* Citizen */}

//                     <td>

//                       <strong>{item.citizen}</strong>

//                     </td>

//                     {/* Category */}

//                     <td>

//                       {item.category}

//                     </td>

//                     {/* Location */}

//                     <td>

//                       {item.location}

//                     </td>

//                     {/* Priority */}

//                     <td>

//                       {item.priority ? (

//                       <span
//                         className={`priority ${item.priority.toLowerCase()}`}
//                       >
//                         {item.priority}
//                       </span>

//                     ) : (

//                       <span>-</span>

//                     )}

//                     </td>

//                     {/* Date */}

//                     <td>

//                       {item.date}

//                     </td>

//                     {/* Engineer */}

//                     <td>

//                       {item.engineer || "-"}

//                     </td>

//                     {/* Action */}

//                     <td>

//                       {item.status === "New" ? (

//                         <button
//                           className="assign-btn"
//                           onClick={() =>
//                             openAssignModal(item)
//                           }
//                         >
//                           Assign
//                         </button>

//                       ) : (

//                         <button
//                           className="assigned-btn"
//                           disabled
//                         >
//                           Assigned
//                         </button>

//                       )}

//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>
//             {/* ==========================================================
//           ASSIGN ENGINEER MODAL
//       ========================================================== */}

//       {selectedComplaint && (

//         <div
//           className="modal-overlay"
//           onClick={() => setSelectedComplaint(null)}
//         >

//           <div
//             className="assign-modal"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* ======================================================
//                 MODAL HEADER
//             ====================================================== */}

//             <div className="modal-header">

//               <h2>Assign Engineer</h2>

//               <button
//                 className="close-btn"
//                 onClick={() => setSelectedComplaint(null)}
//               >
//                 ✕
//               </button>

//             </div>

//             {/* ======================================================
//     MODAL BODY
// ====================================================== */}

// <div className="assign-form">

//   {/* Complaint ID */}

//   <div className="form-group">

//     <label>Complaint ID</label>

//     <input
//       type="text"
//       value={selectedComplaint.id}
//       readOnly
//     />

//   </div>



//   {/* Assign Priority */}

//   <div className="form-group">

//     <label>Assign Priority</label>

//     <select
//   value={assignedPriority}
//   onChange={(e) =>
//     setAssignedPriority(e.target.value)
//   }
// >

//   <option value="">
//     Select Priority
//   </option>

//   <option value="High">
//     High
//   </option>

//   <option value="Medium">
//     Medium
//   </option>

//   <option value="Low">
//     Low
//   </option>

// </select>

//   </div>

//   {/* Engineer */}

//   <div className="form-group">

//     <label>Select Engineer</label>

//     <select
//       value={selectedEngineer}
//       onChange={(e) =>
//         setSelectedEngineer(e.target.value)
//       }
//     >

//       <option value="">
//         Choose Engineer
//       </option>

//       {engineers.map((eng) => (

//         <option
//           key={eng.id}
//           value={eng.name}
//         >
//           {eng.name}
//         </option>

//       ))}

//     </select>

//   </div>

// </div>

//             {/* ======================================================
//                 MODAL BUTTONS
//             ====================================================== */}

//             <div className="modal-actions">

//               <button
//                 className="cancel-btn"
//                 onClick={() =>
//                   setSelectedComplaint(null)
//                 }
//               >
//                 Cancel
//               </button>

//               <button
//                 className="save-btn"
//                 onClick={assignEngineer}
//               >
//                 Assign Engineer
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* ==========================================================
//           PAGINATION
//       ========================================================== */}

//       {filteredComplaints.length >
//         complaintsPerPage && (

//         <div className="pagination-wrapper">

//           <button
//             onClick={previousPage}
//             disabled={currentPage === 1}
//           >

//             <FaChevronLeft />

//             Previous

//           </button>

//           <div className="page-numbers">

//             {[...Array(totalPages)].map(
//               (_, index) => (

//                 <button
//                   key={index}
//                   className={
//                     currentPage === index + 1
//                       ? "active-page"
//                       : ""
//                   }
//                   onClick={() =>
//                     setCurrentPage(index + 1)
//                   }
//                 >
//                   {index + 1}
//                 </button>

//               )
//             )}

//           </div>

//           <button
//             onClick={nextPage}
//             disabled={
//               currentPage === totalPages
//             }
//           >

//             Next

//             <FaChevronRight />

//           </button>

//         </div>

//       )}

//     </div>

//   );

// }

// export default NewComplaints;
import CustomPopup from "../../configure/CustomPopup";
import { useEffect, useState } from "react";
import "./NewComplaints.css";

import axios from "axios";

import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUserTie,
  FaExclamationTriangle
} from "react-icons/fa";

function NewComplaints() {

  /* =========================================================
     API
  ========================================================= */

  const API_BASE_URL =
    "http://localhost:8085";

  /*
   * IMPORTANT:
   * Replace this URL with your actual assignment API.
   *
   * The request body will be:
   *
   * {
   *     "priority": "HIGH",
   *     "engineerId": 5
   * }
   */
  const ASSIGN_API_URL =
    `${API_BASE_URL}/api/department`;


  /* =========================================================
     COMPLAINT DATA
  ========================================================= */

  const [complaints, setComplaints] =
    useState([]);


  /* =========================================================
     ENGINEERS
  ========================================================= */

  const [engineers, setEngineers] =
    useState([]);


  /* =========================================================
     SEARCH
  ========================================================= */

  const [searchTerm, setSearchTerm] =
    useState("");


  /* =========================================================
     CATEGORY FILTER
  ========================================================= */

  const [categoryFilter, setCategoryFilter] =
    useState("All");


  /* =========================================================
     SELECTED COMPLAINT
  ========================================================= */

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);


  /* =========================================================
     SELECTED ENGINEER
  ========================================================= */

  const [selectedEngineer, setSelectedEngineer] =
    useState("");


  /* =========================================================
     PRIORITY
  ========================================================= */

  const [assignedPriority, setAssignedPriority] =
    useState("");


  /* =========================================================
     PAGINATION
  ========================================================= */

  const [currentPage, setCurrentPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [totalElements, setTotalElements] =
    useState(0);

  const complaintsPerPage = 5;


  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] =
    useState(false);

  const [engineerLoading, setEngineerLoading] =
    useState(false);

  const [assigning, setAssigning] =
    useState(false);


  /* =========================================================
     ERROR
  ========================================================= */

  const [error, setError] =
    useState("");


  /* =========================================================
     POPUP
  ========================================================= */

  const [popup, setPopup] =
    useState({

      show: false,

      type: "error",

      message: ""

    });


  /* =========================================================
     SHOW POPUP
  ========================================================= */

  const showPopup = (
    message,
    type = "error"
  ) => {

    setPopup({

      show: true,

      type,

      message

    });

  };


  /* =========================================================
     CLOSE POPUP
  ========================================================= */

  const closePopup = () => {

    setPopup({

      show: false,

      type: "error",

      message: ""

    });

  };


  /* =========================================================
     GET TOKEN
  ========================================================= */

  const getToken = () => {

    return localStorage.getItem("token");

  };


  /* =========================================================
     ERROR MESSAGE
  ========================================================= */

  const getErrorMessage = (err) => {

    if (err.response?.data?.message) {

      return err.response.data.message;

    }

    if (
      typeof err.response?.data ===
      "string"
    ) {

      return err.response.data;

    }

    if (err.message) {

      return err.message;

    }

    return "Something went wrong. Please try again.";

  };


  /* =========================================================
     FETCH UNASSIGNED COMPLAINTS
  ========================================================= */

  const fetchComplaints = async () => {

    try {

      setLoading(true);

      setError("");

      const token = getToken();

      if (!token) {

        const message =
          "You are not logged in. Please login again.";

        setError(message);

        showPopup(message);

        return;

      }


      const response = await axios.get(

        `${API_BASE_URL}/api/department/unassigned`,

        {

          params: {

            page: currentPage,

            size: complaintsPerPage,

            search:
              searchTerm.trim() ||
              undefined,

            sortBy: "createdAt",

            direction: "desc"

          },

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );


      console.log(
        "Unassigned Complaints:",
        response.data
      );


      const data =
        response.data;


      setComplaints(
        data.content || []
      );


      setTotalPages(
        data.totalPages || 0
      );


      setTotalElements(
        data.totalElements || 0
      );


    } catch (err) {

      console.error(
        "Fetch Complaints Error:",
        err
      );


      const message =
        getErrorMessage(err);


      setError(message);

      showPopup(message);


    } finally {

      setLoading(false);

    }

  };


  /* =========================================================
     FETCH ENGINEERS
  ========================================================= */

  const fetchEngineers = async () => {

    try {

      setEngineerLoading(true);

      const token = getToken();

      if (!token) {

        showPopup(
          "You are not logged in. Please login again."
        );

        return;

      }


      const response = await axios.get(

        `${API_BASE_URL}/api/department/engineersAll`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`

          }

        }

      );


      console.log(
        "Engineers Response:",
        response.data
      );


      /*
       * Depending on your backend response,
       * engineers may directly be an array
       * or may be inside content.
       */

      const data =
        response.data;


      if (Array.isArray(data)) {

        setEngineers(data);

      } else if (
        Array.isArray(data.content)
      ) {

        setEngineers(data.content);

      } else if (
        Array.isArray(data.data)
      ) {

        setEngineers(data.data);

      } else {

        setEngineers([]);

      }


    } catch (err) {

      console.error(
        "Fetch Engineers Error:",
        err
      );


      const message =
        getErrorMessage(err);


      showPopup(message);


    } finally {

      setEngineerLoading(false);

    }

  };


  /* =========================================================
     LOAD COMPLAINTS
  ========================================================= */

  useEffect(() => {

    fetchComplaints();

  }, [
    currentPage,
    searchTerm
  ]);


  /* =========================================================
     LOAD ENGINEERS
  ========================================================= */

  useEffect(() => {

    fetchEngineers();

  }, []);


  /* =========================================================
     OPEN ASSIGN MODAL
  ========================================================= */

  const openAssignModal = (
    complaint
  ) => {

    setSelectedComplaint(
      complaint
    );


    setSelectedEngineer("");


    /*
     * If backend already has priority,
     * show it in modal.
     */

    setAssignedPriority(
      complaint.priority || ""
    );

  };


  /* =========================================================
     CLOSE ASSIGN MODAL
  ========================================================= */

  const closeAssignModal = () => {

    if (assigning) {

      return;

    }


    setSelectedComplaint(null);

    setSelectedEngineer("");

    setAssignedPriority("");

  };


  /* =========================================================
     ASSIGN ENGINEER
  ========================================================= */

  const assignEngineer = async () => {

    if (!selectedComplaint) {

      return;

    }


    if (!assignedPriority) {

      showPopup(
        "Please select a priority."
      );

      return;

    }


    if (!selectedEngineer) {

      showPopup(
        "Please select an engineer."
      );

      return;

    }


    try {

      setAssigning(true);


      const token =
        getToken();


      if (!token) {

        showPopup(
          "You are not logged in. Please login again."
        );

        return;

      }


      /*
       * IMPORTANT
       *
       * Only these two values
       * are sent to backend.
       */

      const requestData = {

        priority:
          assignedPriority,

        engineerId:
          Number(selectedEngineer)

      };


      console.log(
        "Assign Request:",
        requestData
      );


      const response =
        await axios.put(

          /*
           * CHANGE THIS URL ONLY
           * if your backend uses another endpoint.
           */
          `${ASSIGN_API_URL}/${selectedComplaint.complaintNumber}`,

          requestData,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json"

            }

          }

        );


      console.log(
        "Assign Response:",
        response.data
      );


      closeAssignModal();


      showPopup(
        "Engineer assigned successfully.",
        "success"
      );


      /*
       * Refresh backend data.
       *
       * Since the complaint is now assigned,
       * it should disappear from /unassigned.
       */

      await fetchComplaints();


    } catch (err) {

      console.error(
        "Assign Engineer Error:",
        err
      );


      const message =
        getErrorMessage(err);


      showPopup(message);


    } finally {

      setAssigning(false);

    }

  };


  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "-";

    }


    const parsedDate =
      new Date(date);


    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return date;

    }


    return parsedDate.toLocaleDateString(
      "en-GB",
      {

        day: "2-digit",

        month: "2-digit",

        year: "numeric"

      }
    );

  };


  /* =========================================================
     FORMAT STATUS
  ========================================================= */

  const formatStatus = (
    value
  ) => {

    if (!value) {

      return "-";

    }


    return value
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  };


  /* =========================================================
     GET CITIZEN NAME
  ========================================================= */

  const getCitizenName = (
    item
  ) => {

    if (
      item.firstName ||
      item.lastName
    ) {

      return `${item.firstName || ""} ${item.lastName || ""}`
        .trim();

    }


    if (item.citizenName) {

      return item.citizenName;

    }


    return "-";

  };


  /* =========================================================
     GET CATEGORY NAME
  ========================================================= */

  const getCategoryName = (
    item
  ) => {

    if (item.categoryName) {

      return item.categoryName;

    }


    if (
      item.category &&
      typeof item.category === "string"
    ) {

      return item.category;

    }


    if (
      item.category &&
      item.category.name
    ) {

      return item.category.name;

    }


    return "-";

  };


  /* =========================================================
     GET LOCATION
  ========================================================= */

  const getLocation = (
    item
  ) => {

    if (item.address) {

      return item.address;

    }


    if (item.location) {

      return item.location;

    }


    return "-";

  };


  /* =========================================================
     CATEGORY OPTIONS
  ========================================================= */

  const categories = [
    ...new Set(

      complaints

        .map(
          (item) =>
            getCategoryName(item)
        )

        .filter(
          (category) =>
            category !== "-"
        )

    )

  ];


  /* =========================================================
     CATEGORY FILTER
  ========================================================= */

  const visibleComplaints =
    complaints.filter(
      (item) => {

        return (

          categoryFilter === "All" ||

          getCategoryName(item) ===
            categoryFilter

        );

      }
    );


  /* =========================================================
     PREVIOUS PAGE
  ========================================================= */

  const previousPage = () => {

    if (currentPage > 0) {

      setCurrentPage(
        (previous) =>
          previous - 1
      );

    }

  };


  /* =========================================================
     NEXT PAGE
  ========================================================= */

  const nextPage = () => {

    if (
      currentPage <
      totalPages - 1
    ) {

      setCurrentPage(
        (previous) =>
          previous + 1
      );

    }

  };


  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  const changePage = (
    page
  ) => {

    setCurrentPage(page);

  };


  /* =========================================================
     JSX
  ========================================================= */

  return (

    <div className="assigned-page">

{/* =================================================
                POPUP
            ================================================= */}

            {popup.show && (

                <CustomPopup

                    type={popup.type}

                    message={popup.message}

                    onClose={closePopup}

                />

            )}
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="assigned-header">

        <div>

          <h1>
            New Complaints
          </h1>

          <p>
            Review newly submitted complaints
            and assign them to department engineers.
          </p>

        </div>

      </div>


      {/* =====================================================
          SEARCH & FILTER
      ===================================================== */}

      <div className="complaint-toolbar">


        {/* SEARCH */}

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

              setCurrentPage(0);

            }}
          />

        </div>


        {/* FILTER */}

        <div className="toolbar-right">

          <div className="filter-box">

            <FaFilter />

            <select
              value={categoryFilter}
              onChange={(e) => {

                setCategoryFilter(
                  e.target.value
                );

              }}
            >

              <option value="All">
                All
              </option>


              {categories.map(
                (category) => (

                  <option
                    key={category}
                    value={category}
                  >

                    {category}

                  </option>

                )
              )}

            </select>

          </div>

        </div>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="error-message">

          {error}

        </div>

      )}


      {/* =====================================================
          COMPLAINT CARD
      ===================================================== */}

      <div className="assigned-card">


        {/* CARD HEADER */}

        <div className="card-header">

          <h2>
            New Complaint List
          </h2>


          {!loading && (

            <span>

              Total: {totalElements}

            </span>

          )}

        </div>


        {/* TABLE */}

        <div className="table-wrapper">

          <table className="assigned-table">


            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <thead>

              <tr>

                <th>
                  Complaint ID
                </th>

                <th>
                  Citizen
                </th>

                <th>
                  Category
                </th>

                <th>
                  Location
                </th>

                <th>
                  Priority
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>


              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-row"
                  >

                    Loading complaints...

                  </td>

                </tr>

              ) : visibleComplaints.length === 0 ? (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="8"
                    className="empty-row"
                  >

                    No new complaints found.

                  </td>

                </tr>

              ) : (

                /* COMPLAINTS */

                visibleComplaints.map(
                  (item) => (

                    <tr
                      key={
                        item.complaintId ||
                        item.complaintNumber
                      }
                    >


                      {/* COMPLAINT ID */}

                      <td className="complaint-id">

                        {
                          item.complaintNumber ||
                          item.id ||
                          "-"
                        }

                      </td>


                      {/* CITIZEN */}

                      <td>

                        <strong>

                          {
                            getCitizenName(item)
                          }

                        </strong>

                      </td>


                      {/* CATEGORY */}

                      <td>

                        {
                          getCategoryName(item)
                        }

                      </td>


                      {/* LOCATION */}

                      <td>

                        {
                          getLocation(item)
                        }

                      </td>


                      {/* PRIORITY */}

                      <td>

                        {item.priority ? (

                          <span
                            className={`priority ${item.priority.toLowerCase()}`}
                          >

                            {
                              formatStatus(
                                item.priority
                              )
                            }

                          </span>

                        ) : (

                          <span>
                            -
                          </span>

                        )}

                      </td>


                      {/* DATE */}

                      <td>

                        {
                          formatDate(
                            item.createdAt
                          )
                        }

                      </td>


                      {/* STATUS */}

                      <td>

                        <span className="status-badge">

                          {
                            formatStatus(
                              item.status
                            )
                          }

                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          className="assign-btn"
                          onClick={() =>
                            openAssignModal(item)
                          }
                        >

                          <FaUserTie />

                          Assign

                        </button>

                      </td>

                    </tr>

                  )

                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          ASSIGN MODAL
      ===================================================== */}

      {selectedComplaint && (

        <div
          className="modal-overlay"
          onClick={closeAssignModal}
        >


          <div
            className="assign-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="modal-header">

              <h2>
                Assign Engineer
              </h2>


              <button
                className="close-btn"
                onClick={
                  closeAssignModal
                }
                disabled={assigning}
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="assign-form">


              {/* COMPLAINT ID */}

              <div className="form-group">

                <label>
                  Complaint ID
                </label>

                <input
                  type="text"
                  value={
                    selectedComplaint.complaintNumber ||
                    selectedComplaint.id ||
                    ""
                  }
                  readOnly
                />

              </div>


              {/* CITIZEN */}

              <div className="form-group">

                <label>
                  Citizen
                </label>

                <input
                  type="text"
                  value={
                    getCitizenName(
                      selectedComplaint
                    )
                  }
                  readOnly
                />

              </div>


              {/* PRIORITY */}

              <div className="form-group">

                <label>
                  Priority
                </label>

                <select
                  value={
                    assignedPriority
                  }
                  onChange={(e) =>
                    setAssignedPriority(
                      e.target.value
                    )
                  }
                  disabled={assigning}
                >

                  <option value="">
                    Select Priority
                  </option>

                  <option value="LOW">
                    Low
                  </option>

                  <option value="MEDIUM">
                    Medium
                  </option>

                  <option value="HIGH">
                    High
                  </option>

                  <option value="EMERGENCY">
                    Emergency
                  </option>

                </select>

              </div>


              {/* ENGINEER */}

              <div className="form-group">

                <label>
                  Select Engineer
                </label>


                {engineerLoading ? (

                  <div>
                    Loading engineers...
                  </div>

                ) : (

                  <select
                    value={
                      selectedEngineer
                    }
                    onChange={(e) =>
                      setSelectedEngineer(
                        e.target.value
                      )
                    }
                    disabled={
                      assigning
                    }
                  >

                    <option value="">
                      Choose Engineer
                    </option>


                    {engineers.map(
                      (engineer) => (

                        <option
                          key={
                            engineer.engineerId ||
                            engineer.id
                          }
                          value={
                            engineer.engineerId ||
                            engineer.id
                          }
                        >

                          {
                            engineer.firstName
                              ? `${engineer.firstName} ${engineer.lastName || ""}`
                              : engineer.name ||
                                `Engineer ${engineer.engineerId || engineer.id}`
                          }

                        </option>

                      )
                    )}

                  </select>

                )}

              </div>


              {/* REQUEST PREVIEW */}

              {/* {assignedPriority &&
                selectedEngineer && (

              <div className="assign-preview">

                   <FaExclamationTriangle />

                  <div>

                    <strong>
                      Assignment Details
                    </strong>

                    <p>

                      Priority:{" "}

                      {
                        formatStatus(
                          assignedPriority
                        )
                      }

                    </p>

                    <p>

                      Engineer ID:{" "}

                      {
                        selectedEngineer
                      }

                    </p>

                  </div> 

                </div>

              )} */}

            </div>


            {/* =================================================
                MODAL ACTIONS
            ================================================= */}

            <div className="modal-actions">


              <button
                className="cancel-btn"
                onClick={
                  closeAssignModal
                }
                disabled={
                  assigning
                }
              >

                Cancel

              </button>


              <button
                className="save-btn"
                onClick={
                  assignEngineer
                }
                disabled={
                  assigning ||
                  !selectedEngineer ||
                  !assignedPriority
                }
              >

                {assigning
                  ? "Assigning..."
                  : "Assign Engineer"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {totalPages > 1 && (

        <div className="pagination-wrapper">


          {/* PREVIOUS */}

          <button
            onClick={
              previousPage
            }
            disabled={
              currentPage === 0
            }
          >

            <FaChevronLeft />

            PreviousLogin Failed


          </button>


          {/* PAGE NUMBERS */}

          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    changePage(index)
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          {/* NEXT */}

          <button
            onClick={
              nextPage
            }
            disabled={
              currentPage ===
              totalPages - 1
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      )}


      {/* =====================================================
          POPUP
      ===================================================== */}
{/* 
      {popup.show && (

        <div
          className="popup-overlay"
          onClick={
            closePopup
          }
        >

          <div
            className={`popup-box ${popup.type}`}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="popup-close"
              onClick={
                closePopup
              }
            >

              <FaTimes />

            </button>


            <div className="popup-icon">

              {popup.type ===
              "success" ? (

                "✓"

              ) : (

                "!"

              )}

            </div>


            <h3>

              {popup.type ===
              "success"
                ? "Success"
                : "Error"}

            </h3>


            <p>

              {popup.message}

            </p>


            <button
              className="popup-ok-btn"
              onClick={
                closePopup
              }
            >

              OK

            </button>

          </div>

        </div>

      )} */}

    </div>

  );

}

export default NewComplaints;