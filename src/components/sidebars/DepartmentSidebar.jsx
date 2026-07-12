import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaClipboardCheck,
    FaTasks,
    FaUserCog,
    FaUsers,
    FaChartBar,
    FaBell,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";


import "./Sidebar.css";

function DepartmentSidebar() {

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

                        <li><NavLink to="/department/new"><FaClipboardCheck /><span>New Complaints</span></NavLink></li>

                        <li><NavLink to="/department/all"><FaTasks /><span>All Complaints</span></NavLink></li>

                        <li><NavLink to="/department/assign"><FaUserCog /><span>Assign Engineer</span></NavLink></li>

                        <li><NavLink to="/department/engineers"><FaUsers /><span>Engineers</span></NavLink></li>

                        <li><NavLink to="/department/reports"><FaChartBar /><span>Reports</span></NavLink></li>

                        <li><NavLink to="/department/notifications"><FaBell /><span>Notifications</span></NavLink></li>

                        <li><NavLink to="/department/profile"><FaUser /><span>Profile</span></NavLink></li>

                    </ul>

                </nav>

            </div>

            <div className="sidebar-footer">

                <NavLink to="/logout">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </NavLink>

            </div>

        </aside>

    );

}

export default DepartmentSidebar;