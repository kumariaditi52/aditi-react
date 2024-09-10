import "../../css/admin_dashboard.css";
import Sidebar from "../../components/adminDashboard/Sidebar";

const AdminDashboard = () => {
    return (
        <>
            <div className="dashboard-body-container">
                <Sidebar />
            </div>
        </>
    );
}

export default AdminDashboard;
