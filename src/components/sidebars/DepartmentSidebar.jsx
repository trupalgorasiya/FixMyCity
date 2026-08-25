import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaClipboardCheck,
    FaTasks,
    FaComments,
    FaUsers,
    FaChartBar,
    FaInbox,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import { logout } from "../../api/auth";

import "./Sidebar.css";

function DepartmentSidebar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-header">
                    <h2>Department</h2>
                    <p>Admin Panel</p>
                </div>

                <nav className="sidebar-menu">

                    <ul>

                        <li><NavLink to="/department/dashboard"><FaHome /><span>Dashboard</span></NavLink></li>

                        <li><NavLink to="/department/new-complaints"><FaClipboardCheck /><span>New Complaints</span></NavLink></li>

                        <li><NavLink to="/department/all-complaints"><FaTasks /><span>All Complaints</span></NavLink></li>

                        <li><NavLink to="/department/engineer-manage"><FaUsers /><span>Engineers</span></NavLink></li>

                        <li><NavLink to="/department/categories"><FaUser /><span>Category</span></NavLink></li>

                        <li><NavLink to="/department/view-feedback"><FaComments /><span>Feedback</span></NavLink></li>

                        <li><NavLink to="/department/view-enginner-request"><FaInbox /><span>Engineer Applications</span></NavLink></li>

                        <li><NavLink to="/department/department-report"><FaChartBar /><span>Reports</span></NavLink></li>

                        <li><NavLink to="/department/profile"><FaUser /><span>Profile</span></NavLink></li>

                    </ul>

                </nav>

            </div>

            <div className="sidebar-footer">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

        </aside>

    );

}

export default DepartmentSidebar;