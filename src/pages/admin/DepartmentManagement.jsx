// import  { useState } from "react";
// import {
//   FaBuilding,
//   FaUsers,
//   FaClipboardList,
//   FaCheckCircle,
//   FaEdit,
//   FaTrash
// } from "react-icons/fa";

// import "./DepartmentManagement.css";

// function DepartmentManagement() {

//   const [search, setSearch] = useState("");

//   const departments = [
//     {
//       id: "D001",
//       name: "Road Department",
//       head: "Amit Patel",
//       engineers: 8,
//       complaints: 145,
//       resolved: 120
//     },
//     {
//       id: "D002",
//       name: "Water Department",
//       head: "Raj Shah",
//       engineers: 6,
//       complaints: 110,
//       resolved: 90
//     },
//     {
//       id: "D003",
//       name: "Garbage Department",
//       head: "Neha Joshi",
//       engineers: 10,
//       complaints: 220,
//       resolved: 180
//     }
//   ];

//   const filteredDepartments = departments.filter((dept) =>
//     dept.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="department-page">

//       <div className="page-header">

//         <div>
//           <h1>Department Management</h1>
//           <p>Manage all municipal departments</p>
//         </div>

//         <button className="add-btn">
//           + Add Department
//         </button>

//       </div>

//       {/* Statistics */}

//       <div className="stats-grid">

//         <div className="stat-card">
//           <FaBuilding />
//           <h2>12</h2>
//           <p>Total Departments</p>
//         </div>

//         <div className="stat-card">
//           <FaUsers />
//           <h2>35</h2>
//           <p>Total Engineers</p>
//         </div>

//         <div className="stat-card">
//           <FaClipboardList />
//           <h2>520</h2>
//           <p>Total Complaints</p>
//         </div>

//         <div className="stat-card">
//           <FaCheckCircle />
//           <h2>450</h2>
//           <p>Resolved Complaints</p>
//         </div>

//       </div>

//       {/* Search */}

//       <div className="search-box">

//         <input
//           type="text"
//           placeholder="Search Department..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//       </div>

//       {/* Table */}

//       <div className="table-container">

//         <table>

//           <thead>

//             <tr>
//               <th>Department ID</th>
//               <th>Department Name</th>
//               <th>Department Head</th>
//               <th>Engineers</th>
//               <th>Total Complaints</th>
//               <th>Resolved</th>
//               <th>Actions</th>
//             </tr>

//           </thead>

//           <tbody>

//             {filteredDepartments.map((dept) => (

//               <tr key={dept.id}>

//                 <td>{dept.id}</td>
//                 <td>{dept.name}</td>
//                 <td>{dept.head}</td>
//                 <td>{dept.engineers}</td>
//                 <td>{dept.complaints}</td>
//                 <td>{dept.resolved}</td>

//                 <td>

//                   <button className="edit-btn">
//                     <FaEdit />
//                   </button>

//                   <button className="delete-btn">
//                     <FaTrash />
//                   </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default DepartmentManagement;


import { useState } from "react";
import "./DepartmentManagement.css";

function DepartmentManagement() {

  const [search, setSearch] = useState("");

  const [departments, setDepartments] = useState([
    {
      id: "D001",
      name: "Road Department",
      head: "Rahul Sharma",
      email: "road@fixmycity.com",
      contact: "9876543210",
      engineers: 8,
      complaints: 145,
      resolved: 120
    },
    {
      id: "D002",
      name: "Water Department",
      head: "Amit Patel",
      email: "water@fixmycity.com",
      contact: "9876543211",
      engineers: 6,
      complaints: 110,
      resolved: 90
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    head: "",
    email: "",
    contact: ""
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddDepartment = () => {

    if (
      !formData.name ||
      !formData.head ||
      !formData.email ||
      !formData.contact
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {

      setDepartments(
        departments.map((dept) =>
          dept.id === editId
            ? {
                ...dept,
                ...formData
              }
            : dept
        )
      );

      setEditId(null);

    } else {

      const newDepartment = {
        id: `D00${departments.length + 1}`,
        ...formData,
        engineers: 0,
        complaints: 0,
        resolved: 0
      };

      setDepartments([...departments, newDepartment]);
    }

    setFormData({
      name: "",
      head: "",
      email: "",
      contact: ""
    });
  };

  const handleEdit = (dept) => {

    setEditId(dept.id);

    setFormData({
      name: dept.name,
      head: dept.head,
      email: dept.email,
      contact: dept.contact
    });
  };

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Delete this department?"
    );

    if (confirmDelete) {
      setDepartments(
        departments.filter(
          (dept) => dept.id !== id
        )
      );
    }
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="department-page">

      <div className="page-header">
        <h1>Department Management</h1>
        <p>Manage all departments</p>
      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{departments.length}</h2>
          <p>Total Departments</p>
        </div>

        <div className="stat-card">
          <h2>35</h2>
          <p>Total Engineers</p>
        </div>

        <div className="stat-card">
          <h2>520</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>450</h2>
          <p>Resolved Complaints</p>
        </div>

      </div>

      {/* Add Department */}

      <div className="department-form">

        <h2>
          {editId
            ? "Edit Department"
            : "Add Department"}
        </h2>

        <div className="form-grid">

          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="head"
            placeholder="Department Head"
            value={formData.head}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Department Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
          />

        </div>

        <button
          className="add-btn"
          onClick={handleAddDepartment}
        >
          {editId
            ? "Update Department"
            : "Add Department"}
        </button>

      </div>

      {/* Search */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Table */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Head</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Engineers</th>
              <th>Complaints</th>
              <th>Resolved</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredDepartments.map((dept) => (

              <tr key={dept.id}>

                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.email}</td>
                <td>{dept.contact}</td>
                <td>{dept.engineers}</td>
                <td>{dept.complaints}</td>
                <td>{dept.resolved}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(dept)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(dept.id)
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

    </div>
  );
}

export default DepartmentManagement;