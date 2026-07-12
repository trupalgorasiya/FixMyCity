import { Outlet } from "react-router-dom";

import UserSidebar from "../components/sidebars/UserSidebar";

function UserLayout() {

    return (

        <>


            <UserSidebar />

            <main className="dashboard-content">
                <Outlet />
            </main>

        </>

    );

}

export default UserLayout;