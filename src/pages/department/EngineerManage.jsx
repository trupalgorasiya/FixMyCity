

import { useState } from "react";
import "./EngineerManage.css";

function DepartmentManagement() {
  const [departments, setDepartments] = useState([
    "Road Department",
    "Water Department",
    "Electric Department",
  ]);

  const [departmentName, setDepartmentName] = useState("");

  const [engineers, setEngineers] = useState([
    {
      id: 1,
      name: "Jeel Bhalani",
      email: "jeel@gmail.com",
      phone: "9876543210",
      department: "Road Department",
    },
  ]);

  const [engineer, setEngineer] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [search, setSearch] = useState("");

  const addDepartment = () => {
    if (!departmentName.trim()) return;

    setDepartments([...departments, departmentName]);
    setDepartmentName("");
  };

  const addEngineer = () => {
    if (
      !engineer.name ||
      !engineer.email ||
      !engineer.phone ||
      !engineer.department
    )
      return;

    setEngineers([
      ...engineers,
      {
        id: Date.now(),
        ...engineer,
      },
    ]);

    setEngineer({
      name: "",
      email: "",
      phone: "",
      department: "",
    });
  };

  const deleteEngineer = (id) => {
    setEngineers(engineers.filter((eng) => eng.id !== id));
  };

  const filteredEngineers = engineers.filter(
    (eng) =>
      eng.name.toLowerCase().includes(search.toLowerCase()) ||
      eng.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="department-page">

      {/* Header */}

      <div className="page-header">
        <h1>Engineer Management</h1>
        <p>Manage Departments and Engineers</p>
      </div>

      {/* Forms */}

      <div className="form-section">

        <div className="card">
          <h2>Add Department</h2>

          <input
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />

          <button onClick={addDepartment}>
            Add Department
          </button>
        </div>

        <div className="card">
          <h2>Add Engineer</h2>

          <input
            type="text"
            placeholder="Engineer Name"
            value={engineer.name}
            onChange={(e) =>
              setEngineer({
                ...engineer,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={engineer.email}
            onChange={(e) =>
              setEngineer({
                ...engineer,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={engineer.phone}
            onChange={(e) =>
              setEngineer({
                ...engineer,
                phone: e.target.value,
              })
            }
          />

          <select
            value={engineer.department}
            onChange={(e) =>
              setEngineer({
                ...engineer,
                department: e.target.value,
              })
            }
          >
            <option value="">Select Department</option>

            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <button onClick={addEngineer}>
            Add Engineer
          </button>
        </div>

      </div>

      {/* Engineer Table */}

      <div className="table-card">

        <div className="table-header">
          <h2>Engineer List</h2>

          <input
            type="text"
            placeholder="Search Engineer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredEngineers.length > 0 ? (
              filteredEngineers.map((eng) => (
                <tr key={eng.id}>
                  <td>{eng.id}</td>
                  <td>{eng.name}</td>
                  <td>{eng.email}</td>
                  <td>{eng.phone}</td>
                  <td>{eng.department}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEngineer(eng.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Engineers Found
                </td>
              </tr>
            )}

          </tbody>
        </table>

      </div>

    </div>
  );
}

export default DepartmentManagement;