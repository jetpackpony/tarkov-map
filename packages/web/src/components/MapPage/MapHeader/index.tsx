import { h } from "preact";
import styles from "./mapHeader.module.css";

interface MenuButtonProps {
  onHover: (e: PointerEvent) => void;
}
const MenuButton = ({ onHover }: MenuButtonProps) => {
  return (
    <button class={styles.menuIcon} onPointerEnter={onHover}>
      <div />
      <div />
      <div />
    </button>
  );
};

interface MapHeaderProps {
  openSidebar: (isTouchUsed: boolean) => void;
}
const MapHeader = ({ openSidebar }: MapHeaderProps) => {
  return (
    <header class={styles.mapPageHeader}>
      <MenuButton onHover={(e) => openSidebar(e.pointerType === "touch")} />
    </header>
  );
};

export default MapHeader;
