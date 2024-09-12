import { SidebarData } from "./SidebarData";
function Sidebar({ onSectionChange }) { // Make sure to accept the prop
  const handleClick = (link) => {
    if (onSectionChange) {
      onSectionChange(link); // Update the section
    }
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarData.map((val, key) => {
          return (
            // < li key={key} className="sidebar-row" id={window.location.pathname === val.link ? "active" : ""} onClick={() => window.location.pathname = val.link}>
            < li key={key} className="sidebar-row" id={window.location.pathname === val.link ? "active" : ""} onClick={() => handleClick(val.link)}>
              {" "}
              < div id="sidebar-icon"> {val.icon}</div>{" "}
              <div id="sidebar-title">
                {val.title}
              </div>
            </li >
          )
        })}
      </ul >
    </div >
  )
}

export default Sidebar
