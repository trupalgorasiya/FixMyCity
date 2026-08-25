import { NavLink,useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaBuilding,
    // FaUserTie,
    FaHardHat,
    FaClipboardList,
    FaUserTie,
    FaFileAlt,
    FaUser,
    FaComments,
    FaSignOutAlt
} from "react-icons/fa";

import { logout } from "../../api/auth";
import "./Sidebar.css";

function SuperAdminSidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login",{replace:true});
    };
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

                        <li><NavLink to="/admin/user-manage"><FaUsers /><span>Users</span></NavLink></li>

                        <li><NavLink to="/admin/dept-manage"><FaBuilding /><span>Departments</span></NavLink></li>

                        <li><NavLink to="/admin/category"><FaBuilding /><span>Category</span></NavLink></li>


                        <li><NavLink to="/admin/engineer-manage"><FaHardHat /><span>Engineers</span></NavLink></li>

                        <li><NavLink to="/admin/complaint-manage"><FaClipboardList /><span>Complaints</span></NavLink></li>

                        <li><NavLink to="/admin/viewfeedback"><FaComments /><span>Feedback</span></NavLink></li>

                        <li><NavLink to="/admin/enginner-request"><FaUserTie  /><span>Engineers Applications</span></NavLink></li>

                        <li><NavLink to="/admin/report"><FaFileAlt /><span>Reports</span></NavLink></li>

                        <li><NavLink to="/admin/profile"><FaUser /><span>Profile</span></NavLink></li>

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

export default SuperAdminSidebar;