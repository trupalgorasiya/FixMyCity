import { useEffect, useState } from "react";

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

import axios from "axios";

import "./ManageCategory.css";


function DepartmentCategory() {

    /* =====================================================
       API BASE URL
    ===================================================== */

    const API_BASE_URL =
        "http://localhost:8085";


    /* =====================================================
       DEPARTMENT ID

       For now using department ID 1.

       Later you can replace this with the
       department ID from logged-in user.
    ===================================================== */

    const departmentId = 1;


    /* =====================================================
       STATES
    ===================================================== */

    const [categories, setCategories] =
        useState([]);

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

    const [deleting, setDeleting] =
        useState(false);

    const [error, setError] =
        useState("");


    /* =====================================================
       FORM DATA
    ===================================================== */

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });


    /* =====================================================
       POPUP
    ===================================================== */

    const [popup, setPopup] = useState({
        show: false,
        type: "success",
        message: ""
    });


    /* =====================================================
       DEPARTMENT INFORMATION
    ===================================================== */

    const [departmentName, setDepartmentName] =
        useState("");


    /* =====================================================
       SHOW POPUP
    ===================================================== */

    const showPopup = (
        message,
        type = "success"
    ) => {

        setPopup({
            show: true,
            type,
            message
        });

    };


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    const closePopup = () => {

        setPopup({
            show: false,
            type: "success",
            message: ""
        });

    };


    /* =====================================================
       GET TOKEN
    ===================================================== */

    const getToken = () => {

        return localStorage.getItem("token");

    };


    /* =====================================================
       GET AUTH HEADERS
    ===================================================== */

    const getHeaders = () => {

        const token =
            getToken();

        return {
            Authorization:
                `Bearer ${token}`
        };

    };


    /* =====================================================
       FETCH DEPARTMENT CATEGORIES
    ===================================================== */

    const fetchCategories = async () => {

        try {

            setLoading(true);

            setError("");


            const token =
                getToken();


            if (!token) {

                showPopup(
                    "You are not logged in. Please login again.",
                    "error"
                );

                return;

            }


            const response =
                await axios.get(
                    `${API_BASE_URL}/api/categories/department/${departmentId}`,
                    {
                        headers: getHeaders()
                    }
                );


            console.log(
                "Department Categories:",
                response.data
            );


            const data =
                Array.isArray(response.data)
                    ? response.data
                    : [];


            setCategories(data);


            /* -----------------------------------------
               GET DEPARTMENT NAME
            ----------------------------------------- */

            if (data.length > 0) {

                setDepartmentName(
                    data[0].departmentName ||
                    "Department"
                );

            } else {

                setDepartmentName(
                    "Department"
                );

            }


        } catch (err) {

            console.error(
                "Fetch Categories Error:",
                err
            );


            if (
                err.response?.status === 401
            ) {

                showPopup(
                    "Your session has expired. Please login again.",
                    "error"
                );

            } else if (
                err.response?.status === 403
            ) {

                showPopup(
                    "You are not authorized to view these categories.",
                    "error"
                );

            } else {

                setError(
                    err.response?.data?.message ||
                    "Unable to load categories."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       LOAD DATA
    ===================================================== */

    useEffect(() => {

        fetchCategories();

    }, []);


    /* =====================================================
       FILTER
    ===================================================== */

    const filteredCategories =
        categories.filter((category) => {

            const searchText =
                search.toLowerCase();


            const categoryName =
                category.name?.toLowerCase() ||
                "";


            const description =
                category.description?.toLowerCase() ||
                "";


            const matchesSearch =
                categoryName.includes(searchText) ||
                description.includes(searchText);


            /*
                Your current API response does NOT contain
                category status.

                Therefore status filtering cannot actually
                work with the current API.

                We keep "All" only.
            */

            const matchesStatus =
                statusFilter === "All";


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    /* =====================================================
       STATISTICS
    ===================================================== */

    const totalCategories =
        categories.length;


    /*
       Current API does not provide status.
       Therefore Active/Inactive cannot be calculated.
    */

    const activeCategories =
        categories.length;


    const inactiveCategories =
        0;


    /*
       Current category API does not provide complaint count.

       Therefore this value cannot be calculated from
       the supplied API response.
    */

    const totalComplaints =
        0;


    /* =====================================================
       ICON

       Backend does not currently return icon.

       We select an icon based on category name.
    ===================================================== */

    const getCategoryIcon = (name) => {

        const categoryName =
            name?.toLowerCase() || "";


        if (
            categoryName.includes("water") ||
            categoryName.includes("leakage")
        ) {

            return <FaTint />;

        }


        if (
            categoryName.includes("light") ||
            categoryName.includes("electric") ||
            categoryName.includes("signal")
        ) {

            return <FaLightbulb />;

        }


        if (
            categoryName.includes("drain") ||
            categoryName.includes("sewer")
        ) {

            return <FaWater />;

        }


        if (
            categoryName.includes("garbage") ||
            categoryName.includes("waste")
        ) {

            return <FaTrashAlt />;

        }


        return <FaRoad />;

    };


    /* =====================================================
       OPEN ADD MODAL
    ===================================================== */

    const openAddModal = () => {

        /*
           POST API was not provided.

           So currently we only show the form.
           Once you provide the POST API, we can connect it.
        */

        setEditingCategory(null);

        setFormData({
            name: "",
            description: ""
        });

        setShowModal(true);

    };


    /* =====================================================
       OPEN EDIT MODAL
    ===================================================== */

    const openEditModal = (category) => {

        setEditingCategory(category);

        setFormData({
            name:
                category.name || "",

            description:
                category.description || ""
        });

        setShowModal(true);

    };


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const closeModal = () => {

        if (saving) {
            return;
        }


        setShowModal(false);

        setEditingCategory(null);

        setFormData({
            name: "",
            description: ""
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


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    /* =====================================================
       UPDATE CATEGORY
    ===================================================== */

    const updateCategory = async () => {

        if (!editingCategory) {
            return;
        }


        if (!formData.name.trim()) {

            showPopup(
                "Please enter category name.",
                "error"
            );

            return;

        }


        try {

            setSaving(true);


            const requestData = {

                name:
                    formData.name.trim(),

                description:
                    formData.description.trim(),

                departmentId:
                    departmentId

            };


            console.log(
                "Update Category Request:",
                requestData
            );


            const response =
                await axios.put(

                    `${API_BASE_URL}/api/categories/${editingCategory.categoryId}`,

                    requestData,

                    {
                        headers: {
                            ...getHeaders(),
                            "Content-Type":
                                "application/json"
                        }
                    }

                );


            console.log(
                "Update Category Response:",
                response.data
            );


            /* -----------------------------------------
               UPDATE LOCAL DATA
            ----------------------------------------- */

            setCategories((previous) =>
                previous.map((category) =>
                    category.categoryId ===
                    editingCategory.categoryId
                        ? {
                            ...category,

                            name:
                                response.data?.name ||
                                requestData.name,

                            description:
                                response.data?.description ||
                                requestData.description,

                            departmentId:
                                response.data?.departmentId ||
                                departmentId,

                            departmentName:
                                response.data?.departmentName ||
                                category.departmentName
                        }
                        : category
                )
            );


            closeModal();


            showPopup(
                "Category updated successfully.",
                "success"
            );


        } catch (err) {

            console.error(
                "Update Category Error:",
                err
            );


            const backendMessage =
                err.response?.data?.message;


            if (backendMessage) {

                showPopup(
                    backendMessage,
                    "error"
                );

            } else if (
                typeof err.response?.data === "string"
            ) {

                showPopup(
                    err.response.data,
                    "error"
                );

            } else if (
                err.response?.status === 401
            ) {

                showPopup(
                    "Your session has expired. Please login again.",
                    "error"
                );

            } else if (
                err.response?.status === 403
            ) {

                showPopup(
                    "You are not authorized to update this category.",
                    "error"
                );

            } else {

                showPopup(
                    "Unable to update category. Please try again.",
                    "error"
                );

            }

        } finally {

            setSaving(false);

        }

    };


    /* =====================================================
       CREATE CATEGORY
    ===================================================== */

    const createCategory = async () => {

        /*
           IMPORTANT:

           You have not provided the POST API.

           We cannot safely call an unknown endpoint.

           Once you provide something like:

           POST /api/categories

           we can implement this here.
        */

        showPopup(
            "Add category API is not provided yet. Please provide the POST API endpoint.",
            "error"
        );

    };


    /* =====================================================
       SUBMIT FORM
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.name.trim()) {

            showPopup(
                "Please enter category name.",
                "error"
            );

            return;

        }


        if (editingCategory) {

            await updateCategory();

        } else {

            await createCategory();

        }

    };


    /* =====================================================
       DELETE CATEGORY
    ===================================================== */

    const deleteCategory = async (categoryId) => {

        const confirmation =
            window.confirm(
                "Are you sure you want to delete this category?"
            );


        if (!confirmation) {
            return;
        }


        try {

            setDeleting(true);


            console.log(
                "Deleting Category:",
                categoryId
            );


            await axios.delete(

                `${API_BASE_URL}/api/categories/${categoryId}`,

                {
                    headers: getHeaders()
                }

            );


            /* -----------------------------------------
               REMOVE FROM UI
            ----------------------------------------- */

            setCategories((previous) =>
                previous.filter(
                    (category) =>
                        category.categoryId !== categoryId
                )
            );


            showPopup(
                "Category deleted successfully.",
                "success"
            );


        } catch (err) {

            console.error(
                "Delete Category Error:",
                err
            );


            const backendMessage =
                err.response?.data?.message;


            if (backendMessage) {

                showPopup(
                    backendMessage,
                    "error"
                );

            } else if (
                typeof err.response?.data === "string"
            ) {

                showPopup(
                    err.response.data,
                    "error"
                );

            } else if (
                err.response?.status === 401
            ) {

                showPopup(
                    "Your session has expired. Please login again.",
                    "error"
                );

            } else if (
                err.response?.status === 403
            ) {

                showPopup(
                    "You are not authorized to delete this category.",
                    "error"
                );

            } else {

                showPopup(
                    "Unable to delete category. Please try again.",
                    "error"
                );

            }

        } finally {

            setDeleting(false);

        }

    };


    /* =====================================================
       JSX
    ===================================================== */

    return (

        <div className="dept-category-page">


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
                            {departmentName ||
                                `Department ${departmentId}`}
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


                {/* TOTAL */}

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


                {/* ACTIVE */}

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


                {/* INACTIVE */}

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


                {/* COMPLAINTS */}

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
                CATEGORY CARD
            ================================================= */}

            <div className="dept-category-main-card">


                <div className="dept-category-card-header">

                    <div>

                        <h2>
                            Department Categories
                        </h2>

                        <p>
                            {filteredCategories.length}
                            {" "}
                            categories available
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


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (

                    <div
                        className="dept-category-empty"
                    >

                        <h3>
                            Loading categories...
                        </h3>

                    </div>

                ) : error ? (

                    <div
                        className="dept-category-empty"
                    >

                        <h3>
                            {error}
                        </h3>

                        <button
                            onClick={fetchCategories}
                        >
                            Try Again
                        </button>

                    </div>

                ) : (

                    /* =================================================
                       TABLE
                    ================================================= */

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

                                    filteredCategories.map(
                                        (category) => (

                                            <tr
                                                key={
                                                    category.categoryId
                                                }
                                            >


                                                {/* CATEGORY */}

                                                <td>

                                                    <div className="dept-category-name">

                                                        <div className="dept-category-item-icon">

                                                            {
                                                                getCategoryIcon(
                                                                    category.name
                                                                )
                                                            }

                                                        </div>


                                                        <div>

                                                            <strong>

                                                                {
                                                                    category.name
                                                                }

                                                            </strong>

                                                            <span>

                                                                {
                                                                    category.departmentName
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* DESCRIPTION */}

                                                <td>

                                                    <span className="dept-category-description">

                                                        {
                                                            category.description ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                {/* COMPLAINTS */}

                                                <td>

                                                    <span className="dept-category-complaint-number">

                                                        -

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span className="dept-category-status active">

                                                        Active

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="dept-category-actions">


                                                        {/* EDIT */}

                                                        <button
                                                            className="dept-category-edit"
                                                            title="Edit Category"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    category
                                                                )
                                                            }
                                                            disabled={
                                                                saving ||
                                                                deleting
                                                            }
                                                        >

                                                            <FaEdit />

                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            className="dept-category-delete"
                                                            title="Delete Category"
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category.categoryId
                                                                )
                                                            }
                                                            disabled={
                                                                saving ||
                                                                deleting
                                                            }
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
                                            colSpan="5"
                                            className="dept-category-empty"
                                        >

                                            <FaLayerGroup />

                                            <h3>
                                                No Categories Found
                                            </h3>

                                            <p>
                                                Try changing your search.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

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

                                    {editingCategory
                                        ? "Update category information."
                                        : "Add a complaint category for your department."
                                    }

                                </p>

                            </div>


                            <button
                                className="dept-category-modal-close"
                                onClick={closeModal}
                                disabled={saving}
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

                                        {departmentName ||
                                            `Department ${departmentId}`}

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

                                    <span>
                                        *
                                    </span>

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


                            {/* =================================================
                                NOTE
                            ================================================= */}

                            {!editingCategory && (

                                <div
                                    style={{
                                        padding: "12px",
                                        marginBottom: "15px",
                                        borderRadius: "8px",
                                        background: "#fff3cd",
                                        color: "#856404",
                                        fontSize: "14px"
                                    }}
                                >

                                    Add category cannot be saved yet because
                                    the POST category API endpoint has not
                                    been provided.

                                </div>

                            )}


                            {/* BUTTONS */}

                            <div className="dept-category-modal-actions">

                                <button
                                    type="button"
                                    className="dept-category-cancel"
                                    onClick={closeModal}
                                    disabled={saving}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="dept-category-save"
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


            {/* =================================================
                POPUP
            ================================================= */}

            {popup.show && (

                <div
                    className="dept-category-popup-overlay"
                    onClick={closePopup}
                >

                    <div
                        className={`dept-category-popup ${
                            popup.type === "error"
                                ? "error"
                                : "success"
                        }`}
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="dept-category-popup-icon">

                            {popup.type === "error"
                                ? "!"
                                : "✓"}

                        </div>


                        <h3>

                            {popup.type === "error"
                                ? "Error"
                                : "Success"}

                        </h3>


                        <p>
                            {popup.message}
                        </p>


                        <button
                            type="button"
                            onClick={closePopup}
                        >

                            OK

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

export default DepartmentCategory;