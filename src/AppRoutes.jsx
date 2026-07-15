import { Routes, Route } from "react-router-dom";

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
import ReportComplaint from "./pages/ReportComplaint";
import MyComplaints from "./pages/user/MyComplaints";
import Notification from "./pages/user/Notification";
import ComplaintTracking from "./pages/ComplaintTracking";
import Profile from "./Authentication/Profile";
import EditProfile from "./Authentication/EditProfile"
function AppRoutes() {

    return (

        <Routes>

            <Route path="/user" element={<UserLayout />}> 
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<Profile />} /> 
                <Route path="edit-profile" element={<EditProfile/>}/>
                <Route path="my-complaints" element={<MyComplaints/>}/>
                <Route path="notification" element={<Notification/>}/>
                <Route path="track" element={<ComplaintTracking/>}/>
                <Route path="report" element={<ReportComplaint/>}/>

                
            </Route>

            <Route path="/department" element={<DepartmentLayout />}> 
             <Route path="dashboard" element={<DepartmentDashboard />} /> 
             <Route path="profile" element={<Profile />} />
             <Route path="edit-profile" element={<EditProfile/>}/>
             </Route>

            <Route path="/engineer" element={<EngineerLayout />}>
             <Route path="dashboard" element={<EngineerDashboard />} />
             <Route path="profile" element={<Profile />} />
             <Route path="edit-profile" element={<EditProfile/>}/>
             </Route>

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

    );

}

export default AppRoutes;