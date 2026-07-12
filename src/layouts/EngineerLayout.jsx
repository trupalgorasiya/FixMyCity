import { Outlet } from "react-router-dom";

import EngineerSidebar from "../components/sidebars/EngineerSidebar";

function EngineerLayout() {

    return (

        <>

            

            <EngineerSidebar />

            <main className="dashboard-content">
                <Outlet />
            </main>

        </>

    );

}

export default EngineerLayout;