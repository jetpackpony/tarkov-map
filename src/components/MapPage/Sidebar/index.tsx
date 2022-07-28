import { h} from 'preact';
import './sidebar.css'

const Sidebar = ({ children, headerElement, isOpen, close }) => {
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