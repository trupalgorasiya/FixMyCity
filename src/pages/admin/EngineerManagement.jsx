// import  { useState } from "react";
// import "./EngineerManagement.css";

// function EngineerManagement() {

//   const [engineers, setEngineers] = useState([
//     {
//       id: "E001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       mobile: "9876543210",
//       department: "Road Department",
//       role: "Engineer",
//       assigned: 20,
//       completed: 18
//     },
//     {
//       id: "E002",
//       name: "Amit Patel",
//       email: "amit@gmail.com",
//       mobile: "9876543211",
//       department: "Water Department",
//       role: "Senior Engineer",
//       assigned: 15,
//       completed: 12
//     }
//   ]);

//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     mobile: "",
//     department: "Road Department",
//     role: "Engineer"
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const openAddModal = () => {
//     setFormData({
//       id: "",
//       name: "",
//       email: "",
//       mobile: "",
//       department: "Road Department",
//       role: "Engineer"
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (eng) => {
//     setFormData(eng);
//     setShowModal(true);
//   };

//   const handleSave = () => {

//     if (formData.id) {

//       setEngineers(
//         engineers.map((eng) =>
//           eng.id === formData.id ? formData : eng
//         )
//       );

//     } else {

//       const newEngineer = {
//         ...formData,
//         id: `E00${engineers.length + 1}`,
//         assigned: 0,
//         completed: 0
//       };

//       setEngineers([...engineers, newEngineer]);
//     }

//     setShowModal(false);
//   };

//   const handleDelete = (id) => {

//     if (
//       window.confirm(
//         "Delete this engineer?"
//       )
//     ) {
//       setEngineers(
//         engineers.filter(
//           (eng) => eng.id !== id
//         )
//       );
//     }
//   };

//   const filteredEngineers =
//     engineers.filter((eng) =>
//       eng.name
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );

//   return (
//     <div className="engineer-page">

//       <div className="page-header">
//         <h1>Engineer Management</h1>
//         <p>
//           Manage engineers, roles and departments
//         </p>
//       </div>

//       <div className="stats-grid">

//         <div className="stat-card">
//           <h2>{engineers.length}</h2>
//           <p>Total Engineers</p>
//         </div>

//         <div className="stat-card">
//           <h2>30</h2>
//           <p>Active Engineers</p>
//         </div>

//         <div className="stat-card">
//           <h2>250</h2>
//           <p>Assigned Works</p>
//         </div>

//         <div className="stat-card">
//           <h2>220</h2>
//           <p>Completed Works</p>
//         </div>

//       </div>

//       <div className="top-bar">

//         <input
//           type="text"
//           placeholder="Search Engineer..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />

//         <button
//           className="add-btn"
//           onClick={openAddModal}
//         >
//           + Add Engineer
//         </button>

//       </div>

//       <div className="table-container">

//         <table>

//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Department</th>
//               <th>Role</th>
//               <th>Assigned</th>
//               <th>Completed</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredEngineers.map(
//               (eng) => (

//                 <tr key={eng.id}>

//                   <td>{eng.id}</td>
//                   <td>{eng.name}</td>
//                   <td>{eng.email}</td>
//                   <td>{eng.mobile}</td>
//                   <td>{eng.department}</td>
//                   <td>{eng.role}</td>
//                   <td>{eng.assigned}</td>
//                   <td>{eng.completed}</td>

//                   <td>

//                     <button
//                       className="edit-btn"
//                       onClick={() =>
//                         handleEdit(eng)
//                       }
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="delete-btn"
//                       onClick={() =>
//                         handleDelete(
//                           eng.id
//                         )
//                       }
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               )
//             )}

//           </tbody>

//         </table>

//       </div>

//       {showModal && (

//         <div className="modal-overlay">

//           <div className="modal">

//             <h2>
//               {formData.id
//                 ? "Update Engineer"
//                 : "Add Engineer"}
//             </h2>

//             <input
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//             />

//             <input
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />

//             <input
//               name="mobile"
//               placeholder="Mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//             />

//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               <option>
//                 Road Department
//               </option>
//               <option>
//                 Water Department
//               </option>
//               <option>
//                 Garbage Department
//               </option>
//               <option>
//                 Street Light Department
//               </option>
//             </select>

//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option>Engineer</option>
//               <option>
//                 Senior Engineer
//               </option>
//               <option>Team Lead</option>
//               <option>Supervisor</option>
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
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default EngineerManagement;


import { useState } from "react";
import "./EngineerManagement.css";

function EngineerManagement() {

  const [departments, setDepartments] = useState([
    "Road Department",
    "Water Department",
    "Garbage Department",
    "Street Light Department"
  ]);

  const [newDepartment, setNewDepartment] = useState("");

  const [engineers, setEngineers] = useState([
    {
      id: "ENG001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      department: "Road Department",
      role: "Engineer"
    },
    {
      id: "ENG002",
      name: "Amit Patel",
      email: "amit@gmail.com",
      mobile: "9876543211",
      department: "Water Department",
      role: "Senior Engineer"
    }
  ]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    department: "Road Department",
    role: "Engineer"
  });

  // Add Department

  const handleAddDepartment = () => {

    if (!newDepartment.trim()) return;

    setDepartments([
      ...departments,
      newDepartment
    ]);

    setNewDepartment("");
  };

  // Input Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Open Add Modal

  const openAddModal = () => {

    setIsEditMode(false);

    setFormData({
      id: "",
      name: "",
      email: "",
      mobile: "",
      department: departments[0],
      role: "Engineer"
    });

    setShowModal(true);
  };

  // Open Edit Modal

  const openEditModal = (engineer) => {

    setIsEditMode(true);

    setFormData(engineer);

    setShowModal(true);
  };

  // Save Engineer

  const handleSave = () => {

    if (isEditMode) {

      setEngineers(
        engineers.map((eng) =>
          eng.id === formData.id
            ? {
                ...eng,
                department: formData.department,
                role: formData.role
              }
            : eng
        )
      );

    } else {

      const newEngineer = {
        ...formData,
        id: `ENG${Date.now()}`
      };

      setEngineers([
        ...engineers,
        newEngineer
      ]);
    }

    setShowModal(false);
  };

  // Delete Engineer

  const handleDelete = (id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this engineer?"
      )
    ) {

      setEngineers(
        engineers.filter(
          (eng) => eng.id !== id
        )
      );

    }
  };

  const filteredEngineers =
    engineers.filter((eng) =>
      eng.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="engineer-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          Engineer Management
        </h1>

        <p>
          Manage engineers, departments and roles
        </p>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{engineers.length}</h2>
          <p>Total Engineers</p>
        </div>

        <div className="stat-card">
          <h2>{engineers.length}</h2>
          <p>Active Engineers</p>
        </div>

        <div className="stat-card">
          <h2>{departments.length}</h2>
          <p>Departments</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>System Active</p>
        </div>

      </div>

      {/* Top Bar */}

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Engineer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={openAddModal}
        >
          + Add Engineer
        </button>

      </div>

      {/* Add Department */}

      <div className="department-section">

        <h3>
          Add New Department
        </h3>

        <div className="department-box">

          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment}
            onChange={(e) =>
              setNewDepartment(e.target.value)
            }
          />

          <button
            onClick={handleAddDepartment}
          >
            Add Department
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredEngineers.map((eng) => (

              <tr key={eng.id}>

                <td>{eng.id}</td>
                <td>{eng.name}</td>
                <td>{eng.email}</td>
                <td>{eng.mobile}</td>
                <td>{eng.department}</td>
                <td>{eng.role}</td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      openEditModal(eng)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(eng.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {isEditMode
                ? "Update Engineer"
                : "Add Engineer"}
            </h2>

            {/* Name */}

            <input
              type="text"
              name="name"
              placeholder="Engineer Name"
              value={formData.name}
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

              {departments.map((dept) => (

                <option
                  key={dept}
                  value={dept}
                >
                  {dept}
                </option>

              ))}

            </select>

            {/* Role */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option>
                Engineer
              </option>

              <option>
                Senior Engineer
              </option>

              <option>
                Team Lead
              </option>

              <option>
                Supervisor
              </option>

            </select>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                {isEditMode
                  ? "Update"
                  : "Add Engineer"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default EngineerManagement;