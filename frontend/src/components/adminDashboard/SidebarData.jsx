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
        link: "/adminDashboard"
    },
    {
        title: "Manage Sellers",
        icon: <DvrIcon />,
        link: "/home"
    },
    {
        title: "Mailbox",
        icon: <AttachEmailIcon />,
        link: "/home"
    },
    {
        title: "Our Team",
        icon: <Diversity2Icon />,
        link: "/home"
    },
    {
        title: "Package Stations",
        icon: <LocalConvenienceStoreIcon />,
        link: "/home"
    },
    {
        title: "Products Avail",
        icon: <ProductionQuantityLimitsIcon />,
        link: "/productAvail"
    },
    {
        title: "Log Out",
        icon: <ExitToAppIcon />,
        link: "/home"
    },

]
