import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/vite.svg";

function Navbar() {

    // Temporary Login Data
    const isLoggedIn = true;

    // Temporary User Role
    const role = "department";
    // "engineer"
    // "department"
    // "admin"

    const navigate = useNavigate();

    const openDashboard = () => {

        if (role === "citizen") {
            navigate("/user/dashboard");
        }
        else if (role === "engineer") {
            navigate("/engineer/dashboard");
        }
        else if (role === "department") {
            navigate("/department/dashboard");
        }
        else if (role === "admin") {
            navigate("/admin/dashboard");
        }
    };
    const openNotification = () => {

        if (role === "citizen") {
            navigate("/user/notification");
        }
        else if (role === "engineer") {
            navigate("/engineer/notification");
        }
        else if (role === "department") {
            navigate("/department/notification");
        }
        else if (role === "admin") {
            navigate("/admin/notification");
        }
    };
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
                <span>FixMyCity</span>
            </div>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            {
                isLoggedIn ?
                    <div className="nav-user">
                    
                        <button 
                            className="icon-btn" 
                            onClick={openNotification}
                        >
                            <FaBell />
                            <span className="notification-dot"></span>
                        </button>
                        

                        <button
                            className="icon-btn"
                            onClick={openDashboard}
                        >
                            <FaUserCircle />
                        </button>
                    </div>
                    :
                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>
            }
        </nav>
    );
}

export default Navbar;