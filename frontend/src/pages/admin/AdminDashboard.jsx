import "../../css/admin_dashboard.css";
import Sidebar from "../../components/adminDashboard/Sidebar";
// import CodeIcon from '@mui/icons-material/Code';
// import SourceIcon from '@mui/icons-material/Source';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Admin_loader } from "../../components/admin_loader";
import { AdminHome } from "../../components/admin-components/AdminHome";
import { Product_avail } from "../../components/admin-components/Product_avail";

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentSection, setCurrentSection] = useState('home'); // Default section

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
                        setTimeout(() => {
                            window.location.href = "/*admin";
                        }, 1000);
                    }
                })
                .catch((error) => {
                    // Handle token verification error
                    console.error("Token verification error:", error);
                    toast.error("Session expired, please log in again");
                    setTimeout(() => {
                        window.location.href = "/*admin";
                    }, 1000);
                });
        }
    }, []);
    const handleSectionChange = (section) => {
        setCurrentSection(section);
        window.location.pathname = section; // Or use a routing library to change the route
    };



    const renderContent = () => {
        switch (currentSection) {
            case 'home':
                return <AdminHome />; // Replace with actual content
            case 'productAvail':
                return <Product_avail />; // Replace with actual content
            default:
                return <div>Home Content</div>; // Default content
        }
    };


    // Render the dashboard content if authenticated, otherwise show loader
    return (
        <div className="dashboard-body-container">
            <div className="dashboard-nav-container">
                Admin Dashboard
            </div>

            {/* Conditionally render content based on authentication status */}
            {isAuthenticated ? (
                <div className="dashboard-main-container">
                    <Sidebar onSectionChange={handleSectionChange} />
                    <div className="dashboard-container">
                        {renderContent()}
                    </div>
                </div>
            ) : (
                <Admin_loader /> // Show loader while authentication is being verified
            )}

        </div>
    );
};

export default AdminDashboard;
