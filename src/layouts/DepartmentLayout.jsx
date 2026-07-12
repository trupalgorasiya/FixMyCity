import { Outlet } from "react-router-dom";

import DepartmentSidebar from "../components/sidebars/DepartmentSidebar";

function DepartmentLayout() {

    return (

        <>


            <DepartmentSidebar />

            <main className="dashboard-content">
                <Outlet />
            </main>

        </>

    );

}

export default DepartmentLayout;