import  { useMemo, useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaRoad,
    FaTrashAlt,
    FaTint,
    FaLightbulb,
    FaWater,
    FaLayerGroup,
    FaTimes,
    FaCheck,
    FaFilter
} from "react-icons/fa";

import "./CategoryManagement.css";

const initialCategories = [
    {
        id: 1,
        name: "Potholes",
        department: "Road & Infrastructure",
        description: "Road damage, potholes and unsafe road surfaces.",
        complaints: 42,
        status: "Active",
        icon: "road"
    },
    {
        id: 2,
        name: "Broken Footpath",
        department: "Road & Infrastructure",
        description: "Damaged or broken pedestrian footpaths.",
        complaints: 18,
        status: "Active",
        icon: "road"
    },
    {
        id: 3,
        name: "Garbage Collection",
        department: "Garbage & Sanitation",
        description: "Issues related to garbage collection and disposal.",
        complaints: 36,
        status: "Active",
        icon: "garbage"
    },
    {
        id: 4,
        name: "Overflowing Garbage Bin",
        department: "Garbage & Sanitation",
        description: "Garbage bins that are full or overflowing.",
        complaints: 27,
        status: "Active",
        icon: "garbage"
    },
    {
        id: 5,
        name: "Water Leakage",
        department: "Water Supply",
        description: "Public water pipeline leakage complaints.",
        complaints: 21,
        status: "Active",
        icon: "water"
    },
    {
        id: 6,
        name: "No Water Supply",
        department: "Water Supply",
        description: "Complaints regarding interruption of water supply.",
        complaints: 14,
        status: "Inactive",
        icon: "water"
    },
    {
        id: 7,
        name: "Street Light Not Working",
        department: "Street Light",
        description: "Non-working or damaged street lights.",
        complaints: 31,
        status: "Active",
        icon: "light"
    },
    {
        id: 8,
        name: "Drainage Blockage",
        department: "Drainage",
        description: "Blocked or overflowing drainage systems.",
        complaints: 25,
        status: "Active",
        icon: "drainage"
    }
];

const departments = [
    "Road & Infrastructure",
    "Garbage & Sanitation",
    "Water Supply",
    "Street Light",
    "Drainage"
];

function CategoryManagement() {

    const [categories, setCategories] = useState(initialCategories);

    const [selectedDepartment, setSelectedDepartment] = useState("All");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [showModal, setShowModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);

    const [formData, setFormData] = useState({
        department: "",
        name: "",
        description: "",
        icon: "road",
        status: "Active"
    });

    const filteredCategories = useMemo(() => {

        return categories.filter((category) => {

            const matchesDepartment =
                selectedDepartment === "All" ||
                category.department === selectedDepartment;

            const matchesStatus =
                statusFilter === "All" ||
                category.status === statusFilter;

            const searchText = search.toLowerCase();

            const matchesSearch =
                category.name.toLowerCase().includes(searchText) ||
                category.department.toLowerCase().includes(searchText) ||
                category.description.toLowerCase().includes(searchText);

            return (
                matchesDepartment &&
                matchesStatus &&
                matchesSearch
            );
        });

    }, [categories, selectedDepartment, statusFilter, search]);

    const totalCategories = categories.length;

    const activeCategories =
        categories.filter(c => c.status === "Active").length;

    const inactiveCategories =
        categories.filter(c => c.status === "Inactive").length;

    const totalComplaints =
        categories.reduce((sum, c) => sum + c.complaints, 0);

    const getIcon = (icon) => {

        switch (icon) {

            case "garbage":
                return <FaTrashAlt />;

            case "water":
                return <FaTint />;

            case "light":
                return <FaLightbulb />;

            case "drainage":
                return <FaWater />;

            default:
                return <FaRoad />;
        }
    };

    const openAddModal = () => {

        setEditingCategory(null);

        setFormData({
            department: selectedDepartment !== "All"
                ? selectedDepartment
                : "",
            name: "",
            description: "",
            icon: "road",
            status: "Active"
        });

        setShowModal(true);
    };

    const openEditModal = (category) => {

        setEditingCategory(category);

        setFormData({
            department: category.department,
            name: category.name,
            description: category.description,
            icon: category.icon,
            status: category.status
        });

        setShowModal(true);
    };

    const closeModal = () => {

        setShowModal(false);
        setEditingCategory(null);
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.department ||
            !formData.name.trim()
        ) {
            alert("Please select department and enter category name.");
            return;
        }

        if (editingCategory) {

            setCategories(prev =>
                prev.map(category =>
                    category.id === editingCategory.id
                        ? {
                            ...category,
                            ...formData
                        }
                        : category
                )
            );

        } else {

            const newCategory = {
                id: Date.now(),
                name: formData.name,
                department: formData.department,
                description: formData.description,
                icon: formData.icon,
                status: formData.status,
                complaints: 0
            };

            setCategories(prev => [
                ...prev,
                newCategory
            ]);
        }

        closeModal();
    };

    const deleteCategory = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (!confirmDelete) return;

        setCategories(prev =>
            prev.filter(category => category.id !== id)
        );
    };

    return (

        <div className="category-management-page">

            {/* HEADER */}

            <div className="category-management-header">

                <div>

                    <div className="category-management-title-row">

                        <div className="category-management-title-icon">
                            <FaLayerGroup />
                        </div>

                        <div>

                            <h1>
                                Category Management
                            </h1>

                            <p>
                                Manage complaint categories department-wise.
                            </p>

                        </div>

                    </div>

                </div>

                <button
                    className="category-management-add-btn"
                    onClick={openAddModal}
                >
                    <FaPlus />
                    Add Category
                </button>

            </div>


            {/* STATISTICS */}

            <div className="category-management-stats">

                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon blue">
                        <FaLayerGroup />
                    </div>

                    <div>
                        <span>Total Categories</span>
                        <strong>{totalCategories}</strong>
                    </div>

                </div>


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon green">
                        <FaCheck />
                    </div>

                    <div>
                        <span>Active Categories</span>
                        <strong>{activeCategories}</strong>
                    </div>

                </div>


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon orange">
                        <FaTimes />
                    </div>

                    <div>
                        <span>Inactive Categories</span>
                        <strong>{inactiveCategories}</strong>
                    </div>

                </div>


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon purple">
                        <FaFilter />
                    </div>

                    <div>
                        <span>Total Complaints</span>
                        <strong>{totalComplaints}</strong>
                    </div>

                </div>

            </div>


            {/* DEPARTMENT SELECTOR */}

            <div className="category-management-department-box">

                <div className="category-management-department-heading">

                    <div className="category-management-department-icon">
                        <FaLayerGroup />
                    </div>

                    <div>
                        <h3>Select Department</h3>
                        <p>
                            Select a department to view its categories.
                        </p>
                    </div>

                </div>


                <div className="category-management-department-list">

                    <button
                        className={
                            selectedDepartment === "All"
                                ? "category-management-department active"
                                : "category-management-department"
                        }
                        onClick={() => setSelectedDepartment("All")}
                    >
                        <span className="category-management-dept-symbol">
                            All
                        </span>

                        <span>
                            All Categories
                        </span>

                    </button>


                    {departments.map(department => (

                        <button
                            key={department}
                            className={
                                selectedDepartment === department
                                    ? "category-management-department active"
                                    : "category-management-department"
                            }
                            onClick={() =>
                                setSelectedDepartment(department)
                            }
                        >

                            <span className="category-management-dept-symbol">
                                {department.charAt(0)}
                            </span>

                            <span>
                                {department}
                            </span>

                        </button>

                    ))}

                </div>

            </div>


            {/* TOOLBAR */}

            <div className="category-management-toolbar">

                <div className="category-management-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search category, department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >

                    <option value="All">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            {/* CATEGORY TABLE */}

            <div className="category-management-card">

                <div className="category-management-card-header">

                    <div>

                        <h2>
                            {selectedDepartment === "All"
                                ? "All Categories"
                                : selectedDepartment
                            }
                        </h2>

                        <p>
                            {filteredCategories.length} categories found
                        </p>

                    </div>

                    <button
                        onClick={openAddModal}
                        className="category-management-small-add"
                    >
                        <FaPlus />
                        Add
                    </button>

                </div>


                <div className="category-management-table-wrapper">

                    <table className="category-management-table">

                        <thead>

                            <tr>

                                <th>Category</th>

                                <th>Department</th>

                                <th>Description</th>

                                <th>Complaints</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCategories.length > 0 ? (

                                filteredCategories.map(category => (

                                    <tr key={category.id}>

                                        <td>

                                            <div className="category-management-name">

                                                <div className="category-management-category-icon">
                                                    {getIcon(category.icon)}
                                                </div>

                                                <strong>
                                                    {category.name}
                                                </strong>

                                            </div>

                                        </td>


                                        <td>

                                            <span className="category-management-department-badge">
                                                {category.department}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="category-management-description">
                                                {category.description}
                                            </span>

                                        </td>


                                        <td>

                                            <strong className="category-management-complaint-count">
                                                {category.complaints}
                                            </strong>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    category.status === "Active"
                                                        ? "category-management-status active"
                                                        : "category-management-status inactive"
                                                }
                                            >
                                                {category.status}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="category-management-actions">

                                                <button
                                                    className="category-management-edit"
                                                    onClick={() =>
                                                        openEditModal(category)
                                                    }
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </button>


                                                <button
                                                    className="category-management-delete"
                                                    onClick={() =>
                                                        deleteCategory(category.id)
                                                    }
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="category-management-empty"
                                    >

                                        <FaLayerGroup />

                                        <h3>
                                            No Categories Found
                                        </h3>

                                        <p>
                                            Try changing your search or department filter.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ADD / EDIT MODAL */}

            {showModal && (

                <div className="category-management-modal-overlay">

                    <div className="category-management-modal">

                        <div className="category-management-modal-header">

                            <div>

                                <h2>
                                    {editingCategory
                                        ? "Edit Category"
                                        : "Add New Category"
                                    }
                                </h2>

                                <p>
                                    Create a department-specific complaint category.
                                </p>

                            </div>

                            <button
                                className="category-management-modal-close"
                                onClick={closeModal}
                            >
                                <FaTimes />
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="category-management-form"
                        >

                            <div className="category-management-form-group">

                                <label>
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map(department => (

                                        <option
                                            key={department}
                                            value={department}
                                        >
                                            {department}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            <div className="category-management-form-group">

                                <label>
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Example: Potholes"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />

                            </div>


                            <div className="category-management-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Enter category description..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                />

                            </div>


                            <div className="category-management-form-row">

                                <div className="category-management-form-group">

                                    <label>
                                        Category Icon
                                    </label>

                                    <select
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                    >

                                        <option value="road">
                                            Road
                                        </option>

                                        <option value="garbage">
                                            Garbage
                                        </option>

                                        <option value="water">
                                            Water
                                        </option>

                                        <option value="light">
                                            Street Light
                                        </option>

                                        <option value="drainage">
                                            Drainage
                                        </option>

                                    </select>

                                </div>


                                <div className="category-management-form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div className="category-management-modal-actions">

                                <button
                                    type="button"
                                    className="category-management-cancel"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="category-management-save"
                                >
                                    <FaCheck />

                                    {editingCategory
                                        ? "Update Category"
                                        : "Save Category"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default CategoryManagement;