import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaClipboardList,
    FaMapMarkedAlt,
    FaBell,
    FaUser,
    // FaQuestionCircle,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function UserSidebar() {

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-header">
                    <h2>Citizen</h2>
                    <p>Complaint Portal</p>
                </div>

                <nav className="sidebar-menu">

                    <ul>

                        <li> <NavLink to="/user/dashboard"> <FaHome /> <span>Dashboard</span> </NavLink> </li>

                        <li> <NavLink to="/user/report"> <FaPlusCircle /> <span>Report Complaint</span></NavLink> </li>

                        <li> <NavLink to="/user/my-complaints"> <FaClipboardList /> <span>My Complaints</span> </NavLink> </li>

                        <li> <NavLink to="/user/track"> <FaMapMarkedAlt /> <span>Track Complaint</span> </NavLink> </li>

                        <li> <NavLink to="/user/notification"> <FaBell /> <span>Notifications</span> </NavLink> </li>

                        <li> <NavLink to="/user/profile"> <FaUser /> <span>Profile</span> </NavLink> </li>

                        {/* <li> <NavLink to="/user/help"> <FaQuestionCircle /> <span>Help</span> </NavLink> </li> */}

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

export default UserSidebar;