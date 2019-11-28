import { h} from 'preact';
import './sidebar.css'

const Sidebar = ({ children, isOpen, close }) => {
  return (
    <div class={`sidebar ${(isOpen) ? "" : "hidden"}`}>
      <header>
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