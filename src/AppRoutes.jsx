import { Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import DepartmentLayout from "./layouts/DepartmentLayout";
import EngineerLayout from "./layouts/EngineerLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

import UserDashboard from "./pages/user/Dashboard";
import DepartmentDashboard from "./pages/department/Dashboard";
import EngineerDashboard from "./pages/engineer/Dashboard";
import SuperAdminDashboard from "./pages/admin/Dashboard";

import Profile from "./Authentication/Profile";
import EditProfile from "./Authentication/EditProfile"
function AppRoutes() {

    return (

        <Routes>

            <Route path="/user" element={<UserLayout />}> 
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<Profile />} /> 
                <Route path="edit-profile" element={<EditProfile/>}/>
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
             </Route>

        </Routes>

    );

}

export default AppRoutes;