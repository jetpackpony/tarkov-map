import { ComponentChildren, h } from 'preact';
import './sidebar.css'

interface SidebarProps {
  children: ComponentChildren,
  headerElement: ComponentChildren,
  isOpen: boolean,
  close: () => void
};

const Sidebar = ({ children, headerElement, isOpen, close }: SidebarProps) => {
  return (
    <div onMouseLeave={close} class={`sidebar ${(isOpen) ? "" : "hidden"}`}>
      <header>
        {headerElement}
      </header>
      <div class="sidebar-content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;