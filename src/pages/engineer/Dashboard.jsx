import "../../styles/dashbord.css";

function Dashboard() {

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>Engineer Dashboard</h1>

                <p>
                    View assigned work and update complaint status.
                </p>

            </div>

            <div className="dashboard-body">

                <div className="dashboard-card">
                    Assigned Tasks
                </div>

                <div className="dashboard-card">
                    Working
                </div>

                <div className="dashboard-card">
                    Completed
                </div>

                <div className="dashboard-card">
                    Today's Tasks
                </div>

            </div>

        </div>

    );

}

export default Dashboard;