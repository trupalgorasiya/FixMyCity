import "../../styles/dashbord.css";

function Dashboard() {

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>Department Dashboard</h1>

                <p>
                    Manage complaints and assign engineers.
                </p>

            </div>

            <div className="dashboard-body">

                <div className="dashboard-card">
                    New Complaints
                </div>

                <div className="dashboard-card">
                    Assigned
                </div>

                <div className="dashboard-card">
                    Under Review
                </div>

                <div className="dashboard-card">
                    Completed
                </div>

            </div>

        </div>

    );

}

export default Dashboard;