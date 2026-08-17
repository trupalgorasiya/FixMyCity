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

import { useState, useEffect } from "react";
import "./EngineerManagement.css";

import {
  FaUserCog,
  FaUserCheck,
  FaBuilding,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTimes
} from "react-icons/fa";

function EngineerManagement() {

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const engineersPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  /* ==========================================================
     DEPARTMENTS
  ========================================================== */

  const [departments, setDepartments] = useState([
    "Road Department",
    "Water Department",
    "Garbage Department",
    "Street Light Department"
  ]);

  const [newDepartment, setNewDepartment] = useState("");

  /* ==========================================================
     ENGINEERS

     IMPORTANT:
     Every engineer MUST have a unique ID.
  ========================================================== */

  const [engineers, setEngineers] = useState([
    {
      id: "ENG001",
      fname: "Rahul",
      lname: "Patel",
      name: "Rahul Patel",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
    {
      id: "ENG002",
      fname: "Amit",
      lname: "Sharma",
      name: "Amit Sharma",
      email: "amit@gmail.com",
      mobile: "9876543211",
      department: "Water Department",
      role: "Senior Engineer"
    },
    {
      id: "ENG003",
      fname: "Rahul",
      lname: "Sharma",
      name: "Rahul Sharma",
      email: "rahulsharma@gmail.com",
      mobile: "9876543212",
      department: "Road Department",
      role: "Engineer"
    },
    {
      id: "ENG004",
      fname: "Priya",
      lname: "Patel",
      name: "Priya Patel",
      email: "priya@gmail.com",
      mobile: "9876543213",
      department: "Garbage Department",
      role: "Engineer"
    },
    {
      id: "ENG005",
      fname: "Vikas",
      lname: "Mehta",
      name: "Vikas Mehta",
      email: "vikas@gmail.com",
      mobile: "9876543214",
      department: "Street Light Department",
      role: "Senior Engineer"
    },
    {
      id: "ENG006",
      fname: "Neha",
      lname: "Shah",
      name: "Neha Shah",
      email: "neha@gmail.com",
      mobile: "9876543215",
      department: "Water Department",
      role: "Engineer"
    },
    {
      id: "ENG007",
      fname: "Karan",
      lname: "Joshi",
      name: "Karan Joshi",
      email: "karan@gmail.com",
      mobile: "9876543216",
      department: "Road Department",
      role: "Engineer"
    },
    {
      id: "ENG008",
      fname: "Mehul",
      lname: "Desai",
      name: "Mehul Desai",
      email: "mehul@gmail.com",
      mobile: "9876543217",
      department: "Garbage Department",
      role: "Engineer"
    },
    {
      id: "ENG009",
      fname: "Pooja",
      lname: "Trivedi",
      name: "Pooja Trivedi",
      email: "pooja@gmail.com",
      mobile: "9876543218",
      department: "Water Department",
      role: "Engineer"
    },
    {
      id: "ENG010",
      fname: "Jay",
      lname: "Patel",
      name: "Jay Patel",
      email: "jay@gmail.com",
      mobile: "9876543219",
      department: "Street Light Department",
      role: "Engineer"
    }
  ]);

  /* ==========================================================
     SEARCH
  ========================================================== */

  const [search, setSearch] = useState("");

  /* ==========================================================
     MODAL
  ========================================================== */

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    fname: "",
    lname: "",
    name: "",
    email: "",
    mobile: "",
    department: "Road Department",
    role: "Engineer"
  });

  /* ==========================================================
     TEXT NORMALIZATION

     This makes search:

     Rahul
     RAHUL
     rahul

     all equivalent.

     It also removes unnecessary spaces
     and special characters.
  ========================================================== */

  const normalizeText = (value) => {
    return String(value ?? "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* ==========================================================
     COMPACT SEARCH

     Allows:

     Rahul Patel
     RahulPatel
     rahul-patel

     to match the same engineer.
  ========================================================== */

  const compactText = (value) => {
    return normalizeText(value).replace(/\s/g, "");
  };

  /* ==========================================================
     ADD DEPARTMENT
  ========================================================== */

  const handleAddDepartment = () => {

    const dept = newDepartment.trim();

    if (!dept) {
      alert("Please enter a department name.");
      return;
    }

    const exists = departments.some(
      (item) =>
        normalizeText(item) === normalizeText(dept)
    );

    if (exists) {
      alert("Department already exists.");
      return;
    }

    setDepartments((prev) => [
      ...prev,
      dept
    ]);

    setNewDepartment("");

    alert("Department added successfully!");
  };

  /* ==========================================================
     INPUT CHANGE
  ========================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => {

      const updated = {
        ...prev,
        [name]: value
      };

      /* Automatically create full name */

      if (
        name === "fname" ||
        name === "lname"
      ) {

        const firstName =
          name === "fname"
            ? value
            : prev.fname;

        const lastName =
          name === "lname"
            ? value
            : prev.lname;

        updated.name =
          `${firstName} ${lastName}`.trim();
      }

      return updated;
    });
  };

  /* ==========================================================
     OPEN ADD MODAL
  ========================================================== */

  const openAddModal = () => {

    setIsEditMode(false);

    setFormData({
      id: "",
      fname: "",
      lname: "",
      name: "",
      email: "",
      mobile: "",
      department: departments[0] || "",
      role: "Engineer"
    });

    setShowModal(true);
  };

  /* ==========================================================
     OPEN EDIT MODAL
  ========================================================== */

  const openEditModal = (engineer) => {

    setIsEditMode(true);

    setFormData({
      id: engineer.id || "",
      fname: engineer.fname || "",
      lname: engineer.lname || "",
      name: engineer.name || "",
      email: engineer.email || "",
      mobile: engineer.mobile || "",
      department: engineer.department || "",
      role: engineer.role || "Engineer"
    });

    setShowModal(true);
  };

  /* ==========================================================
     SAVE ENGINEER
  ========================================================== */

  const handleSave = () => {

    /* Validation */

    if (
      !formData.fname.trim() ||
      !formData.lname.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const fullName =
      `${formData.fname.trim()} ${formData.lname.trim()}`
        .replace(/\s+/g, " ")
        .trim();

    if (isEditMode) {

      /* UPDATE */

      setEngineers((prev) =>
        prev.map((eng) =>
          eng.id === formData.id
            ? {
                ...eng,

                department:
                  formData.department,

                role:
                  formData.role
              }
            : eng
        )
      );

      alert("Engineer updated successfully!");

    } else {

      /* ADD */

      const newEngineer = {
        id: `ENG${Date.now()}`,

        fname:
          formData.fname.trim(),

        lname:
          formData.lname.trim(),

        name:
          fullName,

        email:
          formData.email.trim(),

        mobile:
          formData.mobile.trim(),

        department:
          formData.department,

        role:
          formData.role
      };

      setEngineers((prev) => [
        ...prev,
        newEngineer
      ]);

      alert("Engineer added successfully!");
    }

    setShowModal(false);
  };

  /* ==========================================================
     DELETE ENGINEER
  ========================================================== */

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this engineer?"
      );

    if (!confirmDelete) {
      return;
    }

    setEngineers((prev) =>
      prev.filter(
        (engineer) =>
          engineer.id !== id
      )
    );
  };

  /* ==========================================================
     SEARCH

     SEARCHES ALL FIELDS:

     1. ID
     2. First Name
     3. Last Name
     4. Full Name
     5. Email
     6. Mobile
     7. Department
     8. Role
  ========================================================== */

  const filteredEngineers = engineers.filter(
    (engineer) => {

      /* Empty search = show everything */

      if (!search.trim()) {
        return true;
      }

      const searchText =
        normalizeText(search);

      const compactSearch =
        compactText(search);

      /* Individual fields */

      const id =
        normalizeText(engineer.id);

      const fname =
        normalizeText(engineer.fname);

      const lname =
        normalizeText(engineer.lname);

      const name =
        normalizeText(engineer.name);

      const email =
        normalizeText(engineer.email);

      const mobile =
        normalizeText(engineer.mobile);

      const department =
        normalizeText(engineer.department);

      const role =
        normalizeText(engineer.role);

      /*
        Combine all fields.
      */

      const allFields = [
        id,
        fname,
        lname,
        name,
        email,
        mobile,
        department,
        role
      ];

      /*
        --------------------------------------------------
        DIRECT SEARCH
        --------------------------------------------------

        Example:

        Search: rahul

        Finds:
        Rahul Patel
        Rahul Sharma
      */

      const directMatch =
        allFields.some((field) =>
          field.includes(searchText)
        );

      if (directMatch) {
        return true;
      }

      /*
        --------------------------------------------------
        COMPACT SEARCH
        --------------------------------------------------

        Example:

        Search:
        rahulpatel

        Matches:
        Rahul Patel
      */

      const compactFields =
        allFields.map((field) =>
          field.replace(/\s/g, "")
        );

      const compactMatch =
        compactFields.some((field) =>
          field.includes(compactSearch)
        );

      if (compactMatch) {
        return true;
      }

      /*
        --------------------------------------------------
        MULTI-WORD SEARCH
        --------------------------------------------------

        Example:

        "rahul road"

        Every word must be present
        somewhere in the engineer's data.
      */

      const words =
        searchText
          .split(" ")
          .filter(Boolean);

      return words.every((word) =>
        allFields.some((field) =>
          field.includes(word)
        )
      );
    }
  );

  /* ==========================================================
     RESET PAGE WHEN SEARCH CHANGES
  ========================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredEngineers.length /
        engineersPerPage
      )
    );

  /*
    Make sure current page
    never goes beyond total pages.
  */

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const indexOfLast =
    safeCurrentPage *
    engineersPerPage;

  const indexOfFirst =
    indexOfLast -
    engineersPerPage;

  const currentEngineers =
    filteredEngineers.slice(
      indexOfFirst,
      indexOfLast
    );

  /* ==========================================================
     PAGINATION
  ========================================================== */

  const paginate = (page) => {

    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  const previousPage = () => {

    if (safeCurrentPage > 1) {
      setCurrentPage(
        safeCurrentPage - 1
      );
    }
  };

  const nextPage = () => {

    if (safeCurrentPage < totalPages) {
      setCurrentPage(
        safeCurrentPage + 1
      );
    }
  };

  /* ==========================================================
     CLEAR SEARCH
  ========================================================== */

  const clearSearch = () => {

    setSearch("");

    setCurrentPage(1);
  };

  /* ==========================================================
     RETURN
  ========================================================== */

  return (

    <div className="engineer-page">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="page-header">

        <div>

          <h1>
            Engineer Management
          </h1>

          <p>
            Manage engineers, departments and roles
          </p>

        </div>

      </div>

      {/* ======================================================
          STATS
      ====================================================== */}

      <div className="summary-grid">

        {/* Total Engineers */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Total Engineers
            </h4>

            <h2>
              {engineers.length}
            </h2>

          </div>

          <div className="summary-icon">
            <FaUserCog />
          </div>

        </div>

        {/* Active Engineers */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Active Engineers
            </h4>

            <h2>
              {engineers.length}
            </h2>

          </div>

          <div className="summary-icon">
            <FaUserCheck />
          </div>

        </div>

        {/* Departments */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Total Departments
            </h4>

            <h2>
              {departments.length}
            </h2>

          </div>

          <div className="summary-icon">
            <FaBuilding />
          </div>

        </div>

        {/* Complaints */}

        <div className="summary-card">

          <div className="summary-info">

            <h4>
              Assigned Complaints
            </h4>

            <h2>
              245
            </h2>

          </div>

          <div className="summary-icon">
            <FaClipboardList />
          </div>

        </div>

      </div>

      {/* ======================================================
          SEARCH BAR
      ====================================================== */}

      <div className="top-bar">

        <div
          className="search-wrapper"
          style={{
            position: "relative",
            width: "100%"
          }}
        >

          {/* Search Icon */}

          <FaSearch
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform:
                "translateY(-50%)",
              color: "#94a3b8",
              pointerEvents: "none",
              zIndex: 2
            }}
          />

          <input
            type="text"
            placeholder="Search by ID, name, email, mobile, department or role..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            autoComplete="off"
            style={{
              width: "100%",
              paddingLeft: "48px",
              paddingRight: search
                ? "45px"
                : "18px"
            }}
          />

          {/* Clear Button */}

          {search && (

            <button
              type="button"
              onClick={clearSearch}
              title="Clear search"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
                color: "#64748b",
                fontSize: "16px",
                zIndex: 3
              }}
            >
              <FaTimes />
            </button>

          )}

        </div>

      </div>

      {/* ======================================================
          SEARCH RESULT COUNT
      ====================================================== */}

      {search.trim() && (

        <div
          style={{
            marginTop: "-8px",
            marginBottom: "15px",
            color: "#64748b",
            fontSize: "14px"
          }}
        >

          Showing{" "}

          <strong>
            {filteredEngineers.length}
          </strong>{" "}

          result
          {filteredEngineers.length !== 1
            ? "s"
            : ""}

          {" "}for{" "}

          <strong>
            "{search}"
          </strong>

        </div>

      )}

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>
                ID
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

              <th>
                Role
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {currentEngineers.length > 0 ? (

              currentEngineers.map(
                (engineer) => (

                  <tr
                    key={engineer.id}
                  >

                    <td>
                      {engineer.id}
                    </td>

                    <td>
                      {engineer.name}
                    </td>

                    <td>
                      {engineer.email}
                    </td>

                    <td>
                      {engineer.mobile}
                    </td>

                    <td>
                      {engineer.department}
                    </td>

                    <td>
                      {engineer.role}
                    </td>

                    <td className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditModal(
                            engineer
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            engineer.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="empty-row"
                >

                  {search.trim()
                    ? `No engineers found for "${search}".`
                    : "No engineers found."
                  }

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {filteredEngineers.length >
        engineersPerPage && (

        <div className="pagination-wrapper">

          {/* Previous */}

          <button
            onClick={previousPage}
            disabled={
              safeCurrentPage === 1
            }
          >

            <FaChevronLeft />

            Previous

          </button>

          {/* Page Numbers */}

          <div className="page-numbers">

            {Array.from(
              {
                length: totalPages
              },
              (_, index) => (

                <button
                  key={index + 1}
                  onClick={() =>
                    paginate(index + 1)
                  }
                  className={
                    safeCurrentPage ===
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

          {/* Next */}

          <button
            onClick={nextPage}
            disabled={
              safeCurrentPage ===
              totalPages
            }
          >

            Next

            <FaChevronRight />

          </button>

        </div>

      )}

      {/* ======================================================
          MODAL
      ====================================================== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>

              {isEditMode
                ? "Update Engineer"
                : "Add Engineer"
              }

            </h2>

            {/* First Name */}

            <input
              type="text"
              name="fname"
              placeholder="Engineer First Name"
              value={formData.fname}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Last Name */}

            <input
              type="text"
              name="lname"
              placeholder="Engineer Last Name"
              value={formData.lname}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Email */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Mobile */}

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              disabled={isEditMode}
            />

            {/* Department */}

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >

              {departments.map(
                (department) => (

                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>

                )
              )}

            </select>

            {/* Role */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="Engineer">
                Engineer
              </option>

              <option value="Senior Engineer">
                Senior Engineer
              </option>

              <option value="Team Lead">
                Team Lead
              </option>

              <option value="Supervisor">
                Supervisor
              </option>

            </select>

            {/* Buttons */}

            <div className="modal-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-btn"
                onClick={handleSave}
              >

                {isEditMode
                  ? "Update"
                  : "Add Engineer"
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default EngineerManagement;

