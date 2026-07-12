import { Outlet } from "react-router-dom";

import SuperAdminSidebar from "../components/sidebars/SuperAdminSidebar";

function SuperAdminLayout() {

    return (

        <>


            <SuperAdminSidebar />

            <main className="dashboard-content">
                <Outlet />
            </main>

        </>

    );

}

export default SuperAdminLayout;