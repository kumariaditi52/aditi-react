import { SidebarData } from "./SidebarData"
function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarData.map((val, key) => {
          return (
            < li key={key} className="sidebar-row" id={window.location.pathname === val.link ? "active" : ""} onClick={() => window.location.pathname = val.link}>
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
