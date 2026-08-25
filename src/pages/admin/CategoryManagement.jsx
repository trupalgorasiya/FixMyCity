import { useEffect, useMemo, useState } from "react";
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

const API_BASE_URL = "http://localhost:8085";

function CategoryManagement() {

    /* =====================================================
       STATES
    ===================================================== */

    const [departments, setDepartments] = useState([]);

    const [categories, setCategories] = useState([]);

    const [selectedDepartment, setSelectedDepartment] =
        useState("All");

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [showModal, setShowModal] =
        useState(false);

    const [editingCategory, setEditingCategory] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [formData, setFormData] = useState({
        departmentId: "",
        name: "",
        description: "",
        icon: "road",
        status: "Active"
    });


    /* =====================================================
       GET TOKEN
       ===================================================== */

    const getToken = () => {

        return (
            localStorage.getItem("token") ||
            localStorage.getItem("accessToken")
        );
    };


    /* =====================================================
       API HEADERS
       ===================================================== */

    const getHeaders = () => {

        const token = getToken();

        return {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization: `Bearer ${token}`
                }
                : {})
        };
    };


    /* =====================================================
       LOAD DEPARTMENTS
       GET /api/departments
       ===================================================== */

    const loadDepartments = async () => {

        try {

            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/departments`,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load departments."
                );
            }

            const data = await response.json();

            setDepartments(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Department loading error:",
                error
            );

            setError(
                "Unable to load departments."
            );
        }
    };


    /* =====================================================
       LOAD ALL CATEGORIES
       
       We load categories department-wise because
       your API provides:

       GET /api/categories/department/{departmentId}
       ===================================================== */

    const loadCategories = async () => {

        try {

            setLoading(true);

            setError("");

            if (departments.length === 0) {

                setCategories([]);

                return;
            }

            const allCategories = [];

            for (const department of departments) {

                try {

                    const response = await fetch(
                        `${API_BASE_URL}/api/categories/department/${department.departmentId}`,
                        {
                            method: "GET",
                            headers: getHeaders()
                        }
                    );

                    if (!response.ok) {
                        continue;
                    }

                    const data =
                        await response.json();

                    if (Array.isArray(data)) {

                        data.forEach(category => {

                            allCategories.push({

                                ...category,

                                departmentId:
                                    category.departmentId ||
                                    department.departmentId,

                                departmentName:
                                    category.departmentName ||
                                    department.name,

                                /*
                                    Your backend currently does
                                    not return status.

                                    Keeping Active here only for
                                    existing UI compatibility.
                                */
                                status:
                                    category.status ||
                                    "Active",

                                /*
                                    Your API also doesn't return
                                    complaint count.

                                    Keep 0 until backend provides it.
                                */
                                complaints:
                                    category.complaints || 0,

                                /*
                                    Icon is frontend-only.
                                */
                                icon:
                                    category.icon || "road"

                            });

                        });
                    }

                } catch (departmentError) {

                    console.error(
                        `Failed to load categories for department ${department.departmentId}`,
                        departmentError
                    );
                }
            }

            setCategories(allCategories);

        } catch (error) {

            console.error(
                "Category loading error:",
                error
            );

            setError(
                "Unable to load categories."
            );

        } finally {

            setLoading(false);
        }
    };


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    useEffect(() => {

        loadDepartments();

    }, []);


    /* =====================================================
       LOAD CATEGORIES AFTER DEPARTMENTS LOAD
       ===================================================== */

    useEffect(() => {

        if (departments.length > 0) {

            loadCategories();

        }

    }, [departments]);


    /* =====================================================
       FILTER
       ===================================================== */

    const filteredCategories = useMemo(() => {

        return categories.filter((category) => {

            const matchesDepartment =
                selectedDepartment === "All" ||
                String(category.departmentId) ===
                String(selectedDepartment);

            const matchesStatus =
                statusFilter === "All" ||
                category.status === statusFilter;

            const searchText =
                search.toLowerCase().trim();

            const matchesSearch =
                category.name
                    ?.toLowerCase()
                    .includes(searchText) ||

                category.departmentName
                    ?.toLowerCase()
                    .includes(searchText) ||

                category.description
                    ?.toLowerCase()
                    .includes(searchText);

            return (
                matchesDepartment &&
                matchesStatus &&
                matchesSearch
            );

        });

    }, [
        categories,
        selectedDepartment,
        statusFilter,
        search
    ]);


    /* =====================================================
       STATISTICS
       ===================================================== */

    const totalCategories =
        categories.length;


    const activeCategories =
        categories.filter(
            category =>
                category.status === "Active"
        ).length;


    const inactiveCategories =
        categories.filter(
            category =>
                category.status === "Inactive"
        ).length;


    const totalComplaints =
        categories.reduce(
            (sum, category) =>
                sum +
                Number(category.complaints || 0),
            0
        );


    /* =====================================================
       ICON
       ===================================================== */

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


    /* =====================================================
       OPEN ADD MODAL
       ===================================================== */

    const openAddModal = () => {

        setEditingCategory(null);

        setFormData({

            departmentId:
                selectedDepartment !== "All"
                    ? selectedDepartment
                    : "",

            name: "",

            description: "",

            icon: "road",

            status: "Active"

        });

        setShowModal(true);

        setError("");
    };


    /* =====================================================
       OPEN EDIT MODAL
       ===================================================== */

    const openEditModal = async (category) => {

        try {

            /*
                Load latest category details from backend.

                GET /api/categories/{id}
            */

            const response = await fetch(
                `${API_BASE_URL}/api/categories/${category.categoryId}`,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load category."
                );
            }

            const latestCategory =
                await response.json();

            setEditingCategory(
                latestCategory
            );

            setFormData({

                departmentId:
                    latestCategory.departmentId,

                name:
                    latestCategory.name || "",

                description:
                    latestCategory.description || "",

                icon:
                    latestCategory.icon ||
                    "road",

                status:
                    latestCategory.status ||
                    "Active"

            });

            setShowModal(true);

            setError("");

        } catch (error) {

            console.error(
                "Category loading error:",
                error
            );

            /*
                If single category API fails,
                still open using table data.
            */

            setEditingCategory(category);

            setFormData({

                departmentId:
                    category.departmentId,

                name:
                    category.name || "",

                description:
                    category.description || "",

                icon:
                    category.icon ||
                    "road",

                status:
                    category.status ||
                    "Active"

            });

            setShowModal(true);
        }
    };


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    const closeModal = () => {

        setShowModal(false);

        setEditingCategory(null);

        setFormData({

            departmentId: "",

            name: "",

            description: "",

            icon: "road",

            status: "Active"

        });
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
       ADD CATEGORY
       
       POST /api/categories

       {
           "name": "...",
           "description": "...",
           "departmentId": 4
       }
       ===================================================== */

    const createCategory = async () => {

        const requestBody = {

            name:
                formData.name.trim(),

            description:
                formData.description.trim(),

            departmentId:
                Number(formData.departmentId)

        };


        const response = await fetch(
            `${API_BASE_URL}/api/categories`,
            {
                method: "POST",

                headers: getHeaders(),

                body:
                    JSON.stringify(requestBody)
            }
        );


        if (!response.ok) {

            let message =
                "Failed to create category.";

            try {

                const errorData =
                    await response.json();

                message =
                    errorData.message ||
                    message;

            } catch {

                // Ignore JSON parsing error

            }

            throw new Error(message);
        }


        return response.json();
    };


    /* =====================================================
       UPDATE CATEGORY
       
       PUT /api/categories/{id}

       {
           "name": "...",
           "description": "...",
           "departmentId": 2
       }
       ===================================================== */

    const updateCategory = async () => {

        const requestBody = {

            name:
                formData.name.trim(),

            description:
                formData.description.trim(),

            departmentId:
                Number(formData.departmentId)

        };


        const response = await fetch(
            `${API_BASE_URL}/api/categories/${editingCategory.categoryId}`,
            {
                method: "PUT",

                headers: getHeaders(),

                body:
                    JSON.stringify(requestBody)
            }
        );


        if (!response.ok) {

            let message =
                "Failed to update category.";

            try {

                const errorData =
                    await response.json();

                message =
                    errorData.message ||
                    message;

            } catch {

                // Ignore JSON parsing error

            }

            throw new Error(message);
        }


        return response.json();
    };


    /* =====================================================
       SAVE CATEGORY
       ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.departmentId) {

            alert(
                "Please select a department."
            );

            return;
        }


        if (!formData.name.trim()) {

            alert(
                "Please enter category name."
            );

            return;
        }


        try {

            setSaving(true);

            setError("");


            if (editingCategory) {

                await updateCategory();

            } else {

                await createCategory();

            }


            /*
                Reload categories from backend
                after successful operation.
            */

            await loadCategories();


            closeModal();

        } catch (error) {

            console.error(
                "Category save error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong."
            );

        } finally {

            setSaving(false);
        }
    };


    /* =====================================================
       DELETE CATEGORY
       
       DELETE /api/categories/{id}
       ===================================================== */

    const deleteCategory = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this category?"
            );


        if (!confirmDelete) {

            return;
        }


        try {

            setError("");


            const response =
                await fetch(
                    `${API_BASE_URL}/api/categories/${id}`,
                    {
                        method: "DELETE",

                        headers: getHeaders()
                    }
                );


            if (!response.ok) {

                let message =
                    "Failed to delete category.";

                try {

                    const errorData =
                        await response.json();

                    message =
                        errorData.message ||
                        message;

                } catch {

                    // Ignore JSON parsing error

                }

                throw new Error(message);
            }


            /*
                Reload after deletion.
            */

            await loadCategories();

        } catch (error) {

            console.error(
                "Category delete error:",
                error
            );

            setError(
                error.message ||
                "Unable to delete category."
            );
        }
    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div className="category-management-page">


            {/* =================================================
                HEADER
            ================================================= */}

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


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div
                    style={{
                        background: "#fee2e2",
                        color: "#b91c1c",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                >

                    {error}

                </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="category-management-stats">


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon blue">

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


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon green">

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


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon orange">

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


                <div className="category-management-stat-card">

                    <div className="category-management-stat-icon purple">

                        <FaFilter />

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
                DEPARTMENT SELECTOR
            ================================================= */}

            <div className="category-management-department-box">

                <div className="category-management-department-heading">

                    <div className="category-management-department-icon">

                        <FaLayerGroup />

                    </div>

                    <div>

                        <h3>
                            Select Department
                        </h3>

                        <p>
                            Select a department to view its categories.
                        </p>

                    </div>

                </div>


                <div className="category-management-department-list">


                    {/* ALL */}

                    <button
                        className={
                            selectedDepartment === "All"
                                ? "category-management-department active"
                                : "category-management-department"
                        }

                        onClick={() =>
                            setSelectedDepartment("All")
                        }
                    >

                        <span className="category-management-dept-symbol">
                            All
                        </span>

                        <span>
                            All Categories
                        </span>

                    </button>


                    {/* REAL DEPARTMENTS */}

                    {departments.map(department => (

                        <button
                            key={department.departmentId}

                            className={
                                String(selectedDepartment) ===
                                String(department.departmentId)
                                    ? "category-management-department active"
                                    : "category-management-department"
                            }

                            onClick={() =>
                                setSelectedDepartment(
                                    String(
                                        department.departmentId
                                    )
                                )
                            }
                        >

                            <span className="category-management-dept-symbol">

                                {department.name
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </span>

                            <span>

                                {department.name}

                            </span>

                        </button>

                    ))}

                </div>

            </div>


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="category-management-toolbar">


                <div className="category-management-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search category, department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
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
                CATEGORY TABLE
            ================================================= */}

            <div className="category-management-card">


                <div className="category-management-card-header">

                    <div>

                        <h2>

                            {selectedDepartment === "All"

                                ? "All Categories"

                                : departments.find(
                                    department =>
                                        String(
                                            department.departmentId
                                        ) ===
                                        String(
                                            selectedDepartment
                                        )
                                )?.name ||
                                "Department"

                            }

                        </h2>

                        <p>

                            {filteredCategories.length}
                            {" "}
                            categories found

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

                                <th>
                                    Category
                                </th>

                                <th>
                                    Department
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
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="category-management-empty"
                                    >

                                        <h3>
                                            Loading categories...
                                        </h3>

                                    </td>

                                </tr>

                            ) : filteredCategories.length > 0 ? (

                                filteredCategories.map(
                                    category => (

                                        <tr
                                            key={
                                                category.categoryId
                                            }
                                        >


                                            {/* CATEGORY */}

                                            <td>

                                                <div className="category-management-name">

                                                    <div className="category-management-category-icon">

                                                        {getIcon(
                                                            category.icon
                                                        )}

                                                    </div>

                                                    <strong>

                                                        {category.name}

                                                    </strong>

                                                </div>

                                            </td>


                                            {/* DEPARTMENT */}

                                            <td>

                                                <span className="category-management-department-badge">

                                                    {
                                                        category.departmentName
                                                    }

                                                </span>

                                            </td>


                                            {/* DESCRIPTION */}

                                            <td>

                                                <span className="category-management-description">

                                                    {
                                                        category.description
                                                    }

                                                </span>

                                            </td>


                                            {/* COMPLAINTS */}

                                            <td>

                                                <strong className="category-management-complaint-count">

                                                    {
                                                        category.complaints
                                                    }

                                                </strong>

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        category.status ===
                                                        "Active"

                                                            ? "category-management-status active"

                                                            : "category-management-status inactive"
                                                    }
                                                >

                                                    {
                                                        category.status
                                                    }

                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <div className="category-management-actions">


                                                    <button
                                                        className="category-management-edit"

                                                        onClick={() =>
                                                            openEditModal(
                                                                category
                                                            )
                                                        }

                                                        title="Edit"
                                                    >

                                                        <FaEdit />

                                                    </button>


                                                    <button
                                                        className="category-management-delete"

                                                        onClick={() =>
                                                            deleteCategory(
                                                                category.categoryId
                                                            )
                                                        }

                                                        title="Delete"
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

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


            {/* =================================================
                ADD / EDIT MODAL
            ================================================= */}

            {showModal && (

                <div className="category-management-modal-overlay">

                    <div className="category-management-modal">


                        {/* MODAL HEADER */}

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


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="category-management-form"
                        >


                            {/* DEPARTMENT */}

                            <div className="category-management-form-group">

                                <label>
                                    Department
                                </label>

                                <select
                                    name="departmentId"
                                    value={
                                        formData.departmentId
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Department
                                    </option>


                                    {departments.map(
                                        department => (

                                            <option
                                                key={
                                                    department.departmentId
                                                }
                                                value={
                                                    department.departmentId
                                                }
                                            >

                                                {
                                                    department.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* CATEGORY NAME */}

                            <div className="category-management-form-group">

                                <label>
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Example: Water Leakage"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    required
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="category-management-form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Enter category description..."
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleInputChange
                                    }
                                    rows="4"
                                />

                            </div>


                            {/* FORM ROW */}

                            <div className="category-management-form-row">


                                {/* ICON */}

                                <div className="category-management-form-group">

                                    <label>
                                        Category Icon
                                    </label>

                                    <select
                                        name="icon"
                                        value={
                                            formData.icon
                                        }
                                        onChange={
                                            handleInputChange
                                        }
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

                                <div className="category-management-form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={
                                            formData.status
                                        }
                                        onChange={
                                            handleInputChange
                                        }
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


                            {/* ACTIONS */}

                            <div className="category-management-modal-actions">

                                <button
                                    type="button"
                                    className="category-management-cancel"
                                    onClick={closeModal}
                                    disabled={saving}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="category-management-save"
                                    disabled={saving}
                                >

                                    <FaCheck />

                                    {saving

                                        ? "Saving..."

                                        : editingCategory

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