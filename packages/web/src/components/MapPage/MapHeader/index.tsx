import { h } from "preact";
import styles from "./mapHeader.module.css";

interface MenuButtonProps {
  onClick: (isTouchUsed: boolean) => void;
}
const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      class={styles.menuIcon}
      // With mouse or pen, activate button by hovering
      onPointerEnter={(e: PointerEvent) => {
        e.pointerType !== "touch" && onClick(false);
      }}
      // With touch, activate button at touchstart and prevent emulating mouse events
      onTouchStart={(e: TouchEvent) => {
        e.preventDefault();
        onClick(true);
      }}
    >
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
      <MenuButton onClick={openSidebar} />
    </header>
  );
};

export default MapHeader;
