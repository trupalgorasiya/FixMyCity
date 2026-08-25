// import { useState } from "react";
// import "./EngineerManagement.css";
// import {
//   FaUserCog,
//   FaUserCheck,
//   FaBuilding,
//   FaClipboardList,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";
// function EngineerManagement() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const engineersPerPage = 5;

//   const [departments, setDepartments] = useState([
//     "Road Department",
//     "Water Department",
//     "Garbage Department",
//     "Street Light Department"
//   ]);

//   const [newDepartment, setNewDepartment] = useState("");

//   const [engineers, setEngineers] = useState([
//     {
//       id: "ENG001",
//       name: "Rahul Patel",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//     {
//       id: "ENG002",
//       name: "Amit Sharma",
//       email: "amit@gmail.com",
//       mobile: "9876543211",
//       department: "Water Department",
//       role: "Senior Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     },
//      {
//       id: "ENG001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer"
//     }
//   ]);

//   const [search, setSearch] = useState("");

//   const [showModal, setShowModal] = useState(false);

//   const [isEditMode, setIsEditMode] = useState(false);

//   const [formData, setFormData] = useState({
//     id: "",
//     fname: "",
//     lname:"",
//     email: "",
//     mobile: "",
//     department: "Road Department",
//     role: "Engineer"
//   });


//   const handleAddDepartment = () => {
//   const dept = newDepartment.trim();

//   if (!dept) {
//     alert("Please enter a department name.");
//     return;
//   }

//   // Prevent duplicate departments
//   if (
//     departments.some(
//       (item) => item.toLowerCase() === dept.toLowerCase()
//     )
//   ) {
//     alert("Department already exists.");
//     return;
//   }

//   setDepartments((prev) => [...prev, dept]);

//   setNewDepartment("");

//   alert("Department added successfully!");
// };

//   // Input Change

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Open Add Modal

//   const openAddModal = () => {

//     setIsEditMode(false);

//     setFormData({
//       id: "",
//       fname: "",
//       lname:"",
//       email: "",
//       mobile: "",
//       department: departments[0],
//       role: "Engineer"
//     });

//     setShowModal(true);
//   };

//   // Open Edit Modal

//   const openEditModal = (engineer) => {

//     setIsEditMode(true);

//     setFormData(engineer);

//     setShowModal(true);
//   };

//   // Save Engineer

//   const handleSave = () => {

//     if (isEditMode) {

//       setEngineers(
//         engineers.map((eng) =>
//           eng.id === formData.id
//             ? {
//                 ...eng,
//                 department: formData.department,
//                 role: formData.role
//               }
//             : eng
//         )
//       );

//     } else {

//       const newEngineer = {
//         ...formData,
//         id: `ENG${Date.now()}`
//       };

//       setEngineers([
//         ...engineers,
//         newEngineer
//       ]);
//     }

//     setShowModal(false);
//   };

//   // Delete Engineer

//   const handleDelete = (id) => {

//     if (
//       window.confirm(
//         "Are you sure you want to delete this engineer?"
//       )
//     ) {

//       setEngineers(
//         engineers.filter(
//           (eng) => eng.id !== id
//         )
//       );

//     }
//   };

//   const filteredEngineers = engineers.filter((eng) => {
//   const value = search.toLowerCase();

//   return (
//     eng.id.toLowerCase().includes(value) ||
//     eng.name.toLowerCase().includes(value) ||
//     eng.email.toLowerCase().includes(value) ||
//     eng.mobile.includes(value) ||
//     eng.department.toLowerCase().includes(value)
//   );
// });
// const totalPages = Math.ceil(
//   filteredEngineers.length / engineersPerPage
// );

// const indexOfLast =
//   currentPage * engineersPerPage;

// const indexOfFirst =
//   indexOfLast - engineersPerPage;

// const currentEngineers =
//   filteredEngineers.slice(
//     indexOfFirst,
//     indexOfLast
//   );

// const paginate = (page) =>
//   setCurrentPage(page);

// const previousPage = () => {
//   if (currentPage > 1)
//     setCurrentPage((prev) => prev - 1);
// };

// const nextPage = () => {
//   if (currentPage < totalPages)
//     setCurrentPage((prev) => prev + 1);
// };

//   return (

//     <div className="engineer-page">

//       {/* Header */}

//       <div className="page-header">
//         <div>
//         <h1>
//           Engineer Management
//         </h1>
        
//         <p>
//           Manage engineers, departments and roles
//         </p>
//     </div>
//       </div>

//       {/* Stats */}

//       <div className="summary-grid">

//   <div className="summary-card">
//     <div className="summary-info">
//       <h4>Total Engineers</h4>
//       <h2>{engineers.length}</h2>
//     </div>

//     <div className="summary-icon">
//       <FaUserCog />
//     </div>
//   </div>

//   <div className="summary-card">
//     <div className="summary-info">
//       <h4>Active Engineers</h4>
//       <h2>18</h2>
//     </div>

//     <div className="summary-icon">
//       <FaUserCheck />
//     </div>
//   </div>

//   <div className="summary-card">
//     <div className="summary-info">
//       <h4>Total Departments</h4>
//       <h2>{departments.length}</h2>
//     </div>

//     <div className="summary-icon">
//       <FaBuilding />
//     </div>
//   </div>

//   <div className="summary-card">
//     <div className="summary-info">
//       <h4>Assigned Complaints</h4>
//       <h2>245</h2>
//     </div>

//     <div className="summary-icon">
//       <FaClipboardList />
//     </div>
//   </div>

// </div>

//       {/* Top Bar */}

//       <div className="top-bar">

//         <input
//           type="text"
//           placeholder="Search Engineer..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         {/* <button
//           className="add-btn"
//           onClick={openAddModal}
//         >
//           + Add Engineer
//         </button> */}

//       </div>

     

//       {/* Table */}

//       <div className="table-container">

//         <table>

//           <thead>

//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Department</th>
//               <th>Actions</th>
//             </tr>

//           </thead>

//           <tbody>

//            {currentEngineers.length > 0 ? (

//     currentEngineers.map((eng) => (

//               <tr key={eng.id}>

//                 <td>{eng.id}</td>
//                 <td>{eng.name}</td>
//                 <td>{eng.email}</td>
//                 <td>{eng.mobile}</td>
//                 <td>{eng.department}</td>

//                 <td className="action-buttons">

//                   <button
//                     className="edit-btn"
//                     onClick={() =>
//                       openEditModal(eng)
//                     }
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() =>
//                       handleDelete(eng.id)
//                     }
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>

//             ))
//             ) : (

//     <tr>
//       <td
//         colSpan="6"
//         className="empty-row"
//       >
//         No engineers found.
//       </td>
//     </tr>

//   )}

//           </tbody>

//         </table>
       

//       </div>
//        {filteredEngineers.length > engineersPerPage && (

//   <div className="pagination-wrapper">

//     <button
//       onClick={previousPage}
//       disabled={currentPage === 1}
//     >
//       <FaChevronLeft />
//       Previous
//     </button>

//     <div className="page-numbers">

//       {[...Array(totalPages)].map((_, index) => (

//         <button
//           key={index}
//           onClick={() => paginate(index + 1)}
//           className={
//             currentPage === index + 1
//               ? "active-page"
//               : ""
//           }
//         >
//           {index + 1}
//         </button>

//       ))}

//     </div>

//     <button
//       onClick={nextPage}
//       disabled={currentPage === totalPages}
//     >
//       Next
//       <FaChevronRight />
//     </button>

//   </div>

// )}

//       {/* Modal */}

//       {showModal && (

//         <div className="modal-overlay">

//           <div className="modal">

//             <h2>
//               {isEditMode
//                 ? "Update Engineer"
//                 : "Add Engineer"}
//             </h2>

//             {/* Name */}

//             <input
//               type="text"
//               name="name"
//               placeholder="Engineer First Name"
//               value={formData.fname}
//               onChange={handleChange}
//               disabled={isEditMode}
//             />
//             <input
//               type="text"
//               name="name"
//               placeholder="Engineer Last Name"
//               value={formData.lname}
//               onChange={handleChange}
//               disabled={isEditMode}
//             />

//             {/* Email */}

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={isEditMode}
//             />

//             {/* Mobile */}

//             <input
//               type="text"
//               name="mobile"
//               placeholder="Mobile Number"
//               value={formData.mobile}
//               onChange={handleChange}
//               disabled={isEditMode}
//             />

//             {/* Department */}

//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >

//               {departments.map((dept) => (

//                 <option
//                   key={dept}
//                   value={dept}
//                 >
//                   {dept}
//                 </option>

//               ))}

//             </select>

//             {/* Role */}

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >

//               <option>
//                 Engineer
//               </option>

//               {/* <option>
//                 Senior Engineer
//               </option>

//               <option>
//                 Team Lead
//               </option>

//               <option>
//                 Supervisor
//               </option> */}

//             </select>

//             <div className="modal-buttons">

//               <button
//                 className="cancel-btn"
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//               >
//                 Cancel
//               </button>

//               <button
//                 className="save-btn"
//                 onClick={handleSave}
//               >
//                 {isEditMode
//                   ? "Update"
//                   : "Add Engineer"}
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default EngineerManagement;
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

        console.log("Admin Engineer Response:", data);

        setEngineers(data.content || []);

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
     SEARCH
  ========================================================== */

  const filteredEngineers = useMemo(() => {

    const keyword = search.toLowerCase().trim();

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
          .includes(keyword) ||

        fullName.includes(keyword) ||

        String(engineer.email || "")
          .toLowerCase()
          .includes(keyword) ||

        String(engineer.contact || "")
          .toLowerCase()
          .includes(keyword) ||

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

    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

  };


  /* ==========================================================
     SUMMARY
  ========================================================== */

  const totalEngineers = engineers.length;

  const activeEngineers =
    engineers.filter(
      (engineer) => engineer.isActive === true
    ).length;

  const availableEngineers =
    engineers.filter(
      (engineer) => engineer.isAvailable === true
    ).length;


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
          SUMMARY
      ====================================================== */}

      <div className="summary-grid">

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


        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Departments
            </h4>

            <h2>
              {
                new Set(
                  engineers
                    .map(
                      (engineer) =>
                        engineer.department
                    )
                    .filter(Boolean)
                ).size
              }
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

        <div className="card-header">

          <div>

            <h2>
              Registered Engineers
            </h2>

            <p>
              Showing {currentEngineers.length} of{" "}
              {filteredEngineers.length} engineers.
            </p>

          </div>

        </div>


        <div className="table-wrapper">

          <table className="dashboard-table">

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


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >
                    Loading engineers...
                  </td>

                </tr>

              ) : currentEngineers.length > 0 ? (

                currentEngineers.map((engineer) => (

                  <tr
                    key={engineer.engineerId}
                  >

                    {/* Engineer ID */}

                    <td>
                      {engineer.engineerId}
                    </td>


                    {/* Name */}

                    <td>

                      <strong>

                        {engineer.firstName || ""}{" "}

                        {engineer.lastName || ""}

                      </strong>

                    </td>


                    {/* Email */}

                    <td>
                      {engineer.email || "-"}
                    </td>


                    {/* Mobile */}

                    <td>
                      {engineer.contact || "-"}
                    </td>


                    {/* Department */}

                    <td>
                      {engineer.department || "-"}
                    </td>


                    {/* Status */}

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


                    {/* Availability */}

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

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >

                    No engineers found.

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

      {filteredEngineers.length > engineersPerPage && (

        <div className="pagination-wrapper">

          <button
            onClick={() =>
              paginate(currentPage - 1)
            }
            disabled={
              currentPage === 1
            }
          >

            <FaChevronLeft />

            Previous

          </button>


          <div className="page-numbers">

            {[...Array(totalPages)].map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    paginate(index + 1)
                  }
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                >

                  {index + 1}

                </button>

              )
            )}

          </div>


          <button
            onClick={() =>
              paginate(currentPage + 1)
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