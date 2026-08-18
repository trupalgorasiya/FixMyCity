import  { useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaLayerGroup,
    FaRoad,
    FaTrashAlt,
    FaTint,
    FaLightbulb,
    FaWater,
    FaCheck,
    FaTimes,
    FaClipboardList
} from "react-icons/fa";

import "./ManageCategory.css";

const initialCategories = [
    {
        id: 1,
        name: "Potholes",
        description: "Complaints related to potholes and damaged road surfaces.",
        complaints: 42,
        status: "Active",
        icon: "road"
    },
    {
        id: 2,
        name: "Broken Footpath",
        description: "Complaints about damaged or broken pedestrian footpaths.",
        complaints: 18,
        status: "Active",
        icon: "road"
    },
    {
        id: 3,
        name: "Road Damage",
        description: "General complaints related to damaged roads.",
        complaints: 25,
        status: "Active",
        icon: "road"
    },
    {
        id: 4,
        name: "Traffic Sign Damage",
        description: "Damaged or missing traffic signs and road signs.",
        complaints: 11,
        status: "Inactive",
        icon: "road"
    }
];

function DepartmentCategory() {

    /*
        In your real project, replace this with the
        logged-in department received from login/API/context.

        Example:
        const departmentName = loggedInUser.department;
    */

    const departmentName = "Road & Infrastructure";

    const [categories, setCategories] =
        useState(initialCategories);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [showModal, setShowModal] =
        useState(false);

    const [editingCategory, setEditingCategory] =
        useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "road",
        status: "Active"
    });


    /* =====================================================
       FILTER
    ===================================================== */

    const filteredCategories = categories.filter((category) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            category.name
                .toLowerCase()
                .includes(searchText) ||

            category.description
                .toLowerCase()
                .includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            category.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    /* =====================================================
       STATISTICS
    ===================================================== */

    const totalCategories =
        categories.length;

    const activeCategories =
        categories.filter(
            category => category.status === "Active"
        ).length;

    const inactiveCategories =
        categories.filter(
            category => category.status === "Inactive"
        ).length;

    const totalComplaints =
        categories.reduce(
            (total, category) =>
                total + category.complaints,
            0
        );


    /* =====================================================
       ICON
    ===================================================== */

    const getCategoryIcon = (icon) => {

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


    /* =====================================================
       OPEN ADD MODAL
    ===================================================== */

    const openAddModal = () => {

        setEditingCategory(null);

        setFormData({
            name: "",
            description: "",
            icon: "road",
            status: "Active"
        });

        setShowModal(true);
    };


    /* =====================================================
       OPEN EDIT MODAL
    ===================================================== */

    const openEditModal = (category) => {

        setEditingCategory(category);

        setFormData({
            name: category.name,
            description: category.description,
            icon: category.icon,
            status: category.status
        });

        setShowModal(true);
    };


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const closeModal = () => {

        setShowModal(false);

        setEditingCategory(null);
    };


    /* =====================================================
       INPUT CHANGE
    ===================================================== */

    const handleInputChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    /* =====================================================
       SAVE CATEGORY
    ===================================================== */

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            alert("Please enter category name.");

            return;
        }


        /* EDIT */

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

        }


        /* ADD */

        else {

            const newCategory = {

                id: Date.now(),

                name: formData.name,

                description:
                    formData.description,

                complaints: 0,

                status:
                    formData.status,

                icon:
                    formData.icon
            };

            setCategories(prev => [
                ...prev,
                newCategory
            ]);
        }

        closeModal();
    };


    /* =====================================================
       DELETE
    ===================================================== */

    const deleteCategory = (id) => {

        const confirmation =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (!confirmation) {
            return;
        }

        setCategories(prev =>
            prev.filter(
                category => category.id !== id
            )
        );
    };


    return (

        <div className="dept-category-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dept-category-header">

                <div className="dept-category-header-left">

                    <div className="dept-category-header-icon">
                        <FaLayerGroup />
                    </div>

                    <div>

                        <h1>
                            Category Management
                        </h1>

                        <p>
                            Manage complaint categories for your department.
                        </p>

                    </div>

                </div>


                <button
                    className="dept-category-add-button"
                    onClick={openAddModal}
                >

                    <FaPlus />

                    Add Category

                </button>

            </div>


            {/* =================================================
                DEPARTMENT INFORMATION
            ================================================= */}

            <div className="dept-category-department-banner">

                <div className="dept-category-banner-left">

                    <div className="dept-category-banner-icon">
                        <FaLayerGroup />
                    </div>

                    <div>

                        <span>
                            CURRENT DEPARTMENT
                        </span>

                        <h2>
                            {departmentName}
                        </h2>

                    </div>

                </div>


                <div className="dept-category-banner-status">

                    <FaCheck />

                    Department Active

                </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="dept-category-stat-grid">


                <div className="dept-category-stat-card">

                    <div className="dept-category-stat-icon blue">
                        <FaLayerGroup />
                    </div>

                    <div>

                        <span>
                            Total Categories
                        </span>

                        <strong>
                            {totalCategories}
                        </strong>

                    </div>

                </div>


                <div className="dept-category-stat-card">

                    <div className="dept-category-stat-icon green">
                        <FaCheck />
                    </div>

                    <div>

                        <span>
                            Active Categories
                        </span>

                        <strong>
                            {activeCategories}
                        </strong>

                    </div>

                </div>


                <div className="dept-category-stat-card">

                    <div className="dept-category-stat-icon orange">
                        <FaTimes />
                    </div>

                    <div>

                        <span>
                            Inactive Categories
                        </span>

                        <strong>
                            {inactiveCategories}
                        </strong>

                    </div>

                </div>


                <div className="dept-category-stat-card">

                    <div className="dept-category-stat-icon purple">
                        <FaClipboardList />
                    </div>

                    <div>

                        <span>
                            Total Complaints
                        </span>

                        <strong>
                            {totalComplaints}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="dept-category-toolbar">

                <div className="dept-category-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search categories..."
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


            {/* =================================================
                CATEGORY CARD
            ================================================= */}

            <div className="dept-category-main-card">


                <div className="dept-category-card-header">

                    <div>

                        <h2>
                            Department Categories
                        </h2>

                        <p>
                            {filteredCategories.length} categories available
                        </p>

                    </div>


                    <button
                        className="dept-category-mini-add"
                        onClick={openAddModal}
                    >

                        <FaPlus />

                        Add

                    </button>

                </div>


                {/* TABLE */}

                <div className="dept-category-table-wrapper">

                    <table className="dept-category-table">

                        <thead>

                            <tr>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Complaints
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredCategories.length > 0 ? (

                                filteredCategories.map(category => (

                                    <tr key={category.id}>


                                        {/* CATEGORY */}

                                        <td>

                                            <div className="dept-category-name">

                                                <div className="dept-category-item-icon">

                                                    {getCategoryIcon(
                                                        category.icon
                                                    )}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {category.name}
                                                    </strong>

                                                    <span>
                                                        {departmentName}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* DESCRIPTION */}

                                        <td>

                                            <span className="dept-category-description">

                                                {category.description}

                                            </span>

                                        </td>


                                        {/* COMPLAINTS */}

                                        <td>

                                            <span className="dept-category-complaint-number">

                                                {category.complaints}

                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={
                                                    category.status === "Active"
                                                        ? "dept-category-status active"
                                                        : "dept-category-status inactive"
                                                }
                                            >

                                                {category.status}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="dept-category-actions">

                                                <button
                                                    className="dept-category-edit"
                                                    title="Edit Category"
                                                    onClick={() =>
                                                        openEditModal(category)
                                                    }
                                                >

                                                    <FaEdit />

                                                </button>


                                                <button
                                                    className="dept-category-delete"
                                                    title="Delete Category"
                                                    onClick={() =>
                                                        deleteCategory(
                                                            category.id
                                                        )
                                                    }
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
                                        colSpan="5"
                                        className="dept-category-empty"
                                    >

                                        <FaLayerGroup />

                                        <h3>
                                            No Categories Found
                                        </h3>

                                        <p>
                                            Try changing your search or status filter.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =================================================
                ADD / EDIT MODAL
            ================================================= */}

            {showModal && (

                <div className="dept-category-modal-overlay">

                    <div className="dept-category-modal">


                        {/* MODAL HEADER */}

                        <div className="dept-category-modal-header">

                            <div>

                                <h2>

                                    {editingCategory
                                        ? "Edit Category"
                                        : "Add New Category"
                                    }

                                </h2>

                                <p>
                                    Add a complaint category for your department.
                                </p>

                            </div>


                            <button
                                className="dept-category-modal-close"
                                onClick={closeModal}
                            >

                                <FaTimes />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            className="dept-category-form"
                            onSubmit={handleSubmit}
                        >


                            {/* DEPARTMENT */}

                            <div className="dept-category-form-group">

                                <label>
                                    Department
                                </label>

                                <div className="dept-category-readonly-department">

                                    <FaLayerGroup />

                                    <span>
                                        {departmentName}
                                    </span>

                                    <small>
                                        Current Department
                                    </small>

                                </div>

                            </div>


                            {/* CATEGORY NAME */}

                            <div className="dept-category-form-group">

                                <label>
                                    Category Name
                                    <span>*</span>
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


                            {/* DESCRIPTION */}

                            <div className="dept-category-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Enter category description..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />

                            </div>


                            {/* FORM ROW */}

                            <div className="dept-category-form-row">


                                {/* ICON */}

                                <div className="dept-category-form-group">

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


                                {/* STATUS */}

                                <div className="dept-category-form-group">

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


                            {/* BUTTONS */}

                            <div className="dept-category-modal-actions">

                                <button
                                    type="button"
                                    className="dept-category-cancel"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="dept-category-save"
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

export default DepartmentCategory;