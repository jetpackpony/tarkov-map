import { h } from 'preact';
import './mapHeader.css';

const MenuButton = ({ onHover }: { onHover: (e: MouseEvent) => void }) => {
  return (
    <button class="menu-icon" onMouseEnter={onHover}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

const MapHeader = ({ openSidebar }: { openSidebar: (e: MouseEvent) => void }) => {
  return (
    <header class="page">
      <MenuButton onHover={openSidebar} />
    </header>
  );
};

export default MapHeader;