import Icon from "../Icon";
import styles from "./closeButton.module.css";

interface CloseButtonProps {
  onClick: (e: MouseEvent) => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button class={styles.closeButton} onClick={onClick} title="Close Menu">
    <Icon name="close" className={styles.closeIcon} />
  </button>
);

export default CloseButton;
