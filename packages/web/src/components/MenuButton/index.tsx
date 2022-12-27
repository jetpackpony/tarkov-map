import { h } from "preact";
import Icon from "../Icon";
import styles from "./menuButton.module.css";

interface MenuButtonProps {
  onClick: (isTouchUsed: boolean) => void;
}
const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      class={styles.menuButton}
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
      <Icon name="menu" />
    </button>
  );
};

export default MenuButton;
