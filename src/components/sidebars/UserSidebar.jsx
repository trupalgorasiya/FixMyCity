import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaClipboardList,
    FaMapMarkedAlt,
    FaUser,
    // FaQuestionCircle,
    FaSignOutAlt
} from "react-icons/fa";

import { logout } from "../../api/auth";
import "./Sidebar.css";

function UserSidebar() {
    const navigate = useNavigate();
    const handleLogout=() => {
        logout();
        navigate("/login", { replace: true });
    };
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

                        <li> <NavLink to="/user/profile"> <FaUser /> <span>Profile</span> </NavLink> </li>

                        {/* <li> <NavLink to="/user/help"> <FaQuestionCircle /> <span>Help</span> </NavLink> </li> */}

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

export default UserSidebar;