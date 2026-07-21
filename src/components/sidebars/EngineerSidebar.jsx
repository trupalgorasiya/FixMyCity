import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaTasks,
    FaHistory,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";


import "./Sidebar.css";

function EngineerSidebar() {

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-header">
                    <h2>Engineer</h2>
                    <p>Work Panel</p>
                </div>

                <nav className="sidebar-menu">

                    <ul>

                        <li><NavLink to="/engineer/dashboard"><FaHome /><span>Dashboard</span></NavLink></li>

                        <li><NavLink to="/engineer/complents"><FaTasks /><span>Assigned Work</span></NavLink></li>

                        <li><NavLink to="/engineer/history"><FaHistory /><span>Work History</span></NavLink></li>

                        <li><NavLink to="/engineer/profile"><FaUser /><span>Profile</span></NavLink></li>

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

export default EngineerSidebar;