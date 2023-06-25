import React from "react";

export function SidebarNavs({children}) {
  const [activeItem, setActiveItem] = React.useState(1);

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-menu">
        <SidebarItem
          title="Circulars"
          setActiveItem={setActiveItem}
          index={1}
          activeItem={activeItem}
        >
          Sidebar Content Here
        </SidebarItem>

        <SidebarItem
          title="Specifications"
          setActiveItem={setActiveItem}
          index={2}
          activeItem={activeItem}
        >
          Sidebar Content Here
        </SidebarItem>

        <SidebarItem
          title="Specifications"
          setActiveItem={setActiveItem}
          index={3}
          activeItem={activeItem}
        >
          Work Orders
        </SidebarItem>
      </div>
    </div>
  );
}

export function SidebarItem({ title, children, setActiveItem, activeItem, index }) {
  const expanded = activeItem === index;
  const cls = "sidebar-nav-menu-item " + (expanded ? "item-active" : "");
  return (
    <div className={cls}>
      <div className="sidebar-nav-menu-item-head">
        <div className="sidebar-nav-menu-item-head-title">{title}</div>
        <div className="sidebar-nav-menu-item-head-help">
          <button
            type="button"
            className="btn-help"
            onClick={() => setActiveItem(index)}
          >
            View more info
          </button>
        </div>
        <div className="sidebar-nav-menu-item-head-icon">
          <i className="fa fa-caret-down" aria-hidden="true" />
        </div>
      </div>
      <div className="sidebar-nav-menu-item-body">{children}</div>
    </div>
  );
}
  