// import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import DvrIcon from '@mui/icons-material/Dvr';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/adminDashboard" // Home page route
    },
    {
        title: "Manage Sellers",
        icon: <DvrIcon />,
        link: "/manageSellers" // Unique route for Manage Sellers
    },
    {
        title: "Mailbox",
        icon: <AttachEmailIcon />,
        link: "/mailbox" // Unique route for Mailbox
    },
    {
        title: "Our Team",
        icon: <Diversity2Icon />,
        link: "/ourTeam" // Unique route for Our Team
    },
    {
        title: "Package Stations",
        icon: <LocalConvenienceStoreIcon />,
        link: "/packageStations" // Unique route for Package Stations
    },
    {
        title: "Products Avail",
        icon: <ProductionQuantityLimitsIcon />,
        link: "/productAvail" // Route for Products Avail
    },
    {
        title: "Log Out",
        icon: <ExitToAppIcon />,
        link: "/logout" // Potential route for log out or implement logout logic here
    },
];
