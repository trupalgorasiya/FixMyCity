import { useState } from "react";
import "./NewComplaints.css";

function NewComplaints() {

  const [complaints, setComplaints] = useState([
    {
      id: "CMP001",
      citizen: "Jeel Bhalani",
      category: "Garbage Collection",
      location: "Nikol",
      priority: "High",
      date: "16 Jul 2026",
      status: "New",
      engineer: ""
    },
    {
      id: "CMP002",
      citizen: "Rahul Patel",
      category: "Road Damage",
      location: "Bopal",
      priority: "Medium",
      date: "16 Jul 2026",
      status: "New",
      engineer: ""
    },
    {
      id: "CMP003",
      citizen: "Amit Shah",
      category: "Street Light",
      location: "Satellite",
      priority: "Low",
      date: "15 Jul 2026",
      status: "New",
      engineer: ""
    },
    {
      id: "CMP004",
      citizen: "Priya Patel",
      category: "Water Leakage",
      location: "Gota",
      priority: "High",
      date: "15 Jul 2026",
      status: "New",
      engineer: ""
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedEngineer, setSelectedEngineer] = useState("");

  const engineers = [
    "Rahul Sharma",
    "Karan Patel",
    "Amit Singh",
    "Vivek Kumar"
  ];

  const filteredComplaints = complaints.filter((item) => {

    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.citizen.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All"
        ? true
        : item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const openAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const assignEngineer = () => {

    if (!selectedEngineer) {
      alert("Please select engineer");
      return;
    }

    const updatedComplaints = complaints.map((item) => {

      if (item.id === selectedComplaint.id) {
        return {
          ...item,
          engineer: selectedEngineer,
          status: "Assigned"
        };
      }

      return item;
    });

    setComplaints(updatedComplaints);

    setSelectedComplaint(null);
    setSelectedEngineer("");

    alert("Engineer Assigned Successfully");
  };

  return (
    <div className="new-complaints">

      <div className="page-header">
        <h1>New Complaints</h1>
        <p>Manage and assign complaints to engineers</p>
      </div>

      {/* Search & Filter */}

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search by ID or Citizen Name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Garbage Collection">
            Garbage Collection
          </option>
          <option value="Road Damage">
            Road Damage
          </option>
          <option value="Street Light">
            Street Light
          </option>
          <option value="Water Leakage">
            Water Leakage
          </option>
        </select>

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="complaints-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Status</th>
              <th>Engineer</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredComplaints.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.citizen}</td>

                <td>{item.category}</td>

                <td>{item.location}</td>

                <td>
                  <span className={`priority ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <span
                    className={`status ${
                      item.status === "Assigned"
                        ? "assigned"
                        : "new"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {item.engineer || "-"}
                </td>

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
                    >
                      Assigned
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {selectedComplaint && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Assign Engineer</h2>

            <p>
              Complaint :
              <strong>
                {" "}
                {selectedComplaint.id}
              </strong>
            </p>

            <select
              value={selectedEngineer}
              onChange={(e) =>
                setSelectedEngineer(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Engineer
              </option>

              {engineers.map((eng, index) => (
                <option
                  key={index}
                  value={eng}
                >
                  {eng}
                </option>
              ))}

            </select>

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={assignEngineer}
              >
                Assign
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default NewComplaints;