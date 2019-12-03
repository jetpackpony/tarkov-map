import { h } from 'preact';
import './mapHeader.css';

const MenuButton = ({ onClick }) => {
  return (
    <button class="menu-icon" onClick={onClick}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

const MapHeader = ({ openSidebar }) => {
  return (
    <header class="page">
      <MenuButton onClick={openSidebar} />
    </header>
  );
};

export default MapHeader;