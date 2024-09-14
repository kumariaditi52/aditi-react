import ButtonGroup from "../../components/adminDashboard/ButtonGroup";
import "../../css/admin_dashboard.css";
import { AdminHome } from "../../components/admin-components/AdminHome";
import { Product_avail } from "../../components/admin-components/Product_avail";
import { ManageSellers } from "../../components/admin-components/ManageSellers";
import { Mailbox } from "../../components/admin-components/Mailbox";
import { OurTeam } from "../../components/admin-components/OurTeam";
import { PackageStations } from "../../components/admin-components/PackageStations";
import { Logout } from "../../components/admin-components/Logout";
import { useState } from "react";


import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';

const buttons = [
    "Home", "Product_avail", "Manage Sellers", "Our Team", "Package Stations", "Mailbox", "Log Out",
];
const icons = [
    <HomeIcon />, <InventoryIcon />, <PeopleIcon />, <GroupIcon />,
    <LocalShippingIcon />, <MailIcon />, <LogoutIcon />,
];

const RenderComponent = ({ index }) => {
    switch (index) {
        case 0: return <AdminHome />;
        case 1: return <Product_avail />;
        case 2: return <ManageSellers />;
        case 3: return <OurTeam />;
        case 4: return <PackageStations />;
        case 5: return <Mailbox />;
        case 6: return <Logout />;
    }
}

function AdminDashboard() {
    const [isSelected, setIsSelected] = useState(0);
    return (
        <div className="dashboard-body-container">
            <div className="dashboard-nav-container">
                Admin Dashboard
            </div>
            <div className="dashboard-main-container">
                <div className="sidebar">
                    <ButtonGroup buttons={buttons} icons={icons} isSelected={isSelected} setIsSelected={setIsSelected} />
                </div>
                <RenderComponent index={isSelected} />
            </div>
        </div>
    )
}

export default AdminDashboard