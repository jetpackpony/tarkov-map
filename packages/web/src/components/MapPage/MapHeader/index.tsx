import { h } from "preact";
import MenuButton from "../../MenuButton";
import styles from "./mapHeader.module.css";

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
