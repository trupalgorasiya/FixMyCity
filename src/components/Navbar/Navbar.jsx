import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.png";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const isLoggedIn = !!token;

    let user = null;

    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Invalid user data in localStorage",error);
        user = null;
    }

    const role = user?.role;

    const openDashboard = () => {

        if (role === "CITIZEN") {
            navigate("/user/dashboard");
        }
        else if (role === "ENGINEER") {
            navigate("/engineer/dashboard");
        }
        else if (role === "DEPARTMENT") {
            navigate("/department/dashboard");
        }
        else if (role === "ADMIN") {
            navigate("/admin/dashboard");
        }
        else {
            navigate("/login");
        }
    };

    const openNotification = () => {

        if (role === "CITIZEN") {
            navigate("/user/notification");
        }
        else if (role === "ENGINEER") {
            navigate("/engineer/notification");
        }
        else if (role === "DEPARTMENT") {
            navigate("/department/notification");
        }
        else if (role === "ADMIN") {
            navigate("/admin/notification");
        }
        else {
            navigate("/login");
        }
    };

    return (
        <nav className="navbar">

            <div className="nav-logo">

                <img
                    src={logo}
                    alt="Logo"
                />

                <p className="text-logo">
                    Making city cleaner, safer and smarter
                </p>

            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/about">
                        About Us
                    </Link>
                </li>

                <li>
                    <Link to="/faqs">
                        FAQs
                    </Link>
                </li>

                <li>
                    <Link to="/contact">
                        Contact Us
                    </Link>
                </li>

                <li>
                    <Link to="/engineerrequest">
                        Career
                    </Link>
                </li>

            </ul>

            {isLoggedIn ? (

                <div className="nav-user">

                    {/* <button
                        className="icon-btn"
                        onClick={openNotification}
                        title="Notifications"
                    >
                        <FaBell />

                        <span className="notification-dot"></span>

                    </button> */}

                    <button className="icon-btn" onClick={openDashboard} title="Dashboard" >
                        <FaUserCircle />
                    </button>

                </div>

            ) : (

                <Link to="/login" className="login-btn">  Login   </Link>

            )}

        </nav>
    );
}

export default Navbar;