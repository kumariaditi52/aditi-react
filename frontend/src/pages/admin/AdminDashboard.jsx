import ButtonGroup from "../../components/adminDashboard/ButtonGroup";
import "../../css/admin_dashboard.css";
import { AdminHome } from "../../components/admin-components/AdminHome";
import { Product_avail } from "../../components/admin-components/Product_avail";
import { Update_Products } from "../../components/admin-components/Update_Products";
import { Mailbox } from "../../components/admin-components/Mailbox";
import { OurTeam } from "../../components/admin-components/OurTeam";
import { PackageStations } from "../../components/admin-components/PackageStations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
import axios from "axios";

import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';

const buttons = [
    "Home", "Product_avail", "Update_Products", "Our Team", "Package Stations", "Mailbox", "Log Out",
];
const icons = [
    <HomeIcon />, <InventoryIcon />, <PeopleIcon />, <GroupIcon />,
    <LocalShippingIcon />, <MailIcon />, <LogoutIcon />
];

const RenderComponent = ({ index }) => {
    switch (index) {
        case 0: return <AdminHome />;
        case 1: return <Product_avail />;
        case 2: return <Update_Products />;
        case 3: return <OurTeam />;
        case 4: return <PackageStations />;
        case 5: return <Mailbox />;
        default: return null; // No component for "Logout"
    }
}

function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
    const [isSelected, setIsSelected] = useState(
        parseInt(localStorage.getItem("isSelected")) || 0
    );
    const navigate = useNavigate();

    // Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            // If no token, redirect to login
            navigate('/*admin');
        } else {
            // Set isAuthenticated to true if token exists
            setIsAuthenticated(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem("isSelected", isSelected);
        }
    }, [isSelected, isAuthenticated]);

    // Handle Logout function
    const handleLogout = () => {
        axios.post('/api/admin-logout')
            .then(() => {
                localStorage.removeItem('adminToken'); // Clear local storage
                setIsAuthenticated(false); // Update state
                setIsSelected(0); // Reset selection
                navigate('/*admin'); // Redirect to login
            })
            .catch(err => console.error("Logout failed:", err));
    };


    if (!isAuthenticated) {
        // If not authenticated, don't render the dashboard
        return null;
    }

    return (
        <div className="dashboard-body-container">
            <div className="dashboard-nav-container">
                Admin Dashboard
            </div>
            <div className="dashboard-main-container">
                <div className="sidebar">
                    <ButtonGroup
                        buttons={buttons}
                        icons={icons}
                        isSelected={isSelected}
                        setIsSelected={(index) => {
                            if (index === 6) { // Logout button index
                                handleLogout();
                            } else {
                                setIsSelected(index);
                            }
                        }}
                    />
                </div>
                <RenderComponent index={isSelected} />
            </div>
        </div>
    )
}

export default AdminDashboard;
