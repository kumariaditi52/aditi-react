import "../../css/admin_dashboard.css";
import Sidebar from "../../components/adminDashboard/Sidebar";
import CodeIcon from '@mui/icons-material/Code';
import SourceIcon from '@mui/icons-material/Source';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Admin_loader } from "../../components/admin_loader";

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            // Redirect to login if token is missing
            toast.error("Admin doesn't exist");
            setTimeout(() => {
                window.location.href = "/*admin";
            }, 1000);
        } else {
            // Verify the token with backend
            axios.post("/api/adminAuth", {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include JWT token in the request headers
                },
            })
                .then((response) => {
                    if (response.data.isValid) {
                        setIsAuthenticated(true); // Allow access to the dashboard
                    } else {
                        // Redirect if token is invalid
                        toast.error("Invalid token");
                        // setTimeout(() => {
                        //     // window.location.href = "/*admin";
                        // }, 1000);
                    }
                })
                .catch((error) => {
                    // Handle token verification error
                    console.error("Token verification error:", error);
                    toast.error("Session expired, please log in again");
                    // setTimeout(() => {
                    //     window.location.href = "/*admin";
                    // }, 1000);
                });
        }
    }, []);

    // Render the dashboard content if authenticated, otherwise show loader
    return (
        <div className="dashboard-body-container">
            <div className="dashboard-nav-container">
                Admin Dashboard
            </div>

            {/* Conditionally render content based on authentication status */}
            {isAuthenticated ? (
                <div className="dashboard-main-container">
                    <Sidebar />
                    <div className="dashboard-container">
                        <div className="card">
                            <CodeIcon />
                        </div>
                        <div className="card">
                            <SourceIcon />
                        </div>
                        <div className="card">Card 3</div>
                        <div className="card">Card 4</div>
                    </div>
                </div>
            ) : (
                <Admin_loader /> // Show loader while authentication is being verified
            )}
        </div>
    );
};

export default AdminDashboard;
