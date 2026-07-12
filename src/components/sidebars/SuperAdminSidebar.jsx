import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaUserTie,
    FaHardHat,
    FaClipboardList,
    FaChartPie,
    FaFileAlt,
    FaCog,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";


import "./Sidebar.css";

function SuperAdminSidebar() {

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-header">
                    <h2>Super Admin</h2>
                    <p>Control Center</p>
                </div>

                <nav className="sidebar-menu">

                    <ul>

                        <li><NavLink to="/admin/dashboard"><FaHome /><span>Dashboard</span></NavLink></li>

                        <li><NavLink to="/admin/users"><FaUsers /><span>Users</span></NavLink></li>

                        <li><NavLink to="/admin/departments"><FaBuilding /><span>Departments</span></NavLink></li>

                        <li><NavLink to="/admin/department-admins"><FaUserTie /><span>Department Admins</span></NavLink></li>

                        <li><NavLink to="/admin/engineers"><FaHardHat /><span>Engineers</span></NavLink></li>

                        <li><NavLink to="/admin/complaints"><FaClipboardList /><span>Complaints</span></NavLink></li>

                        <li><NavLink to="/admin/analytics"><FaChartPie /><span>Analytics</span></NavLink></li>

                        <li><NavLink to="/admin/reports"><FaFileAlt /><span>Reports</span></NavLink></li>

                        <li><NavLink to="/admin/settings"><FaCog /><span>Settings</span></NavLink></li>

                        <li><NavLink to="/admin/profile"><FaUser /><span>Profile</span></NavLink></li>

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

export default SuperAdminSidebar;