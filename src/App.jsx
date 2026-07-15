import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Footer from "./components/Navbar/Footer";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPassword";
import ChangePassword from "./Authentication/ChangePassword";
import ReportComplaint from "./pages/ReportComplaint";
import ComplaintTracking from "./pages/ComplaintTracking";



import UserLayout from "./layouts/UserLayout";
import DepartmentLayout from "./layouts/DepartmentLayout";
import EngineerLayout from "./layouts/EngineerLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

import UserDashboard from "./pages/user/Dashboard";
import DepartmentDashboard from "./pages/department/Dashboard";
import EngineerDashboard from "./pages/engineer/Dashboard";
import SuperAdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import EngineerManagement from "./pages/admin/EngineerManagement";
import ComplaintManagement from "./pages/admin/ComplaintManagement";
import Report from "./pages/admin/Report";


import MyComplaints from "./pages/user/MyComplaints";
import Notification from "./pages/user/Notification";


import EditProfile from "./Authentication/EditProfile";
import Profile from "./Authentication/Profile";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* <Route path="/com" element={<ReportComplaint />} /> */}
        <Route path="/tracking" element={<ComplaintTracking />} />
        
        {/* User Dashboard */}

<Route path="/user" element={<UserLayout />}>
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="edit-profile" element={<EditProfile/>}/>
    <Route path="my-complaints" element={<MyComplaints/>}/>
    <Route path="notification" element={<Notification/>}/>
    <Route path="track" element={<ComplaintTracking/>}/>
    <Route path="report" element={<ReportComplaint/>}/>
</Route>

{/* Department */}

<Route path="/department" element={<DepartmentLayout />}>
    <Route path="dashboard" element={<DepartmentDashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="edit-profile" element={<EditProfile/>}/>
</Route>

{/* Engineer */}

<Route path="/engineer" element={<EngineerLayout />}>
    <Route path="dashboard" element={<EngineerDashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="edit-profile" element={<EditProfile/>}/>
</Route>

{/* Super Admin */}

<Route path="/admin" element={<SuperAdminLayout />}>
    <Route path="dashboard" element={<SuperAdminDashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="edit-profile" element={<EditProfile/>}/>
    <Route path="user-manage" element={<UserManagement/>}></Route>
    <Route path="dept-manage" element={<DepartmentManagement/>}></Route>
    <Route path="engineer-manage" element={<EngineerManagement/>}></Route>
    <Route path="complaint-manage" element={<ComplaintManagement/>}></Route>
    <Route path="report" element={<Report/>}></Route>

</Route>
        
      </Routes> 
      <Footer />
    </BrowserRouter>
  );
}

export default App;