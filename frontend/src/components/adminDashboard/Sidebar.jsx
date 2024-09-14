// import "../../css/side"
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import DvrIcon from '@mui/icons-material/Dvr';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar() {
  const location = useLocation();

  const SidebarData = [
    { title: "Home", icon: <HomeIcon />, link: "/*admin" },
    { title: "Manage Sellers", icon: <DvrIcon />, link: "manageSellers" },
    { title: "Mailbox", icon: <AttachEmailIcon />, link: "mailbox" },
    { title: "Our Team", icon: <Diversity2Icon />, link: "ourTeam" },
    { title: "Package Stations", icon: <LocalConvenienceStoreIcon />, link: "packageStations" },
    { title: "Products Avail", icon: <ProductionQuantityLimitsIcon />, link: "productAvail" },
    { title: "Log Out", icon: <ExitToAppIcon />, link: "logout" }
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="sidebar-row" id={location.pathname === val.link ? "active" : ""}>
              <Link to={val.link} className="sidebar-link">
                <div id="sidebar-icon"> {val.icon}</div>
                <div id="sidebar-title">
                  {val.title}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
