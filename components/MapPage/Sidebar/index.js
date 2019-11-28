import { h} from 'preact';
import './sidebar.css'

const Sidebar = ({ children, headerElement, isOpen, close }) => {
  return (
    <div class={`sidebar ${(isOpen) ? "" : "hidden"}`}>
      <header>
        {headerElement}
        <button class="close" onClick={close}>
          <div></div>
          <div></div>
        </button>
      </header>
      <div class="sidebar-content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;