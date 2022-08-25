import { h } from 'preact';
import styles from './mapHeader.module.css'

const MenuButton = ({ onHover }: { onHover: (e: MouseEvent) => void }) => {
  return (
    <button class={styles.menuIcon} onMouseEnter={onHover}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};

const MapHeader = ({ openSidebar }: { openSidebar: (e: MouseEvent) => void }) => {
  return (
    <header class={styles.mapPageHeader}>
      <MenuButton onHover={openSidebar} />
    </header>
  );
};

export default MapHeader;