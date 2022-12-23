import Icon from "../Icon";
import Button, { ButtonProps } from "../Button";
import styles from "./closeButton.module.css";

const CloseButton = ({ onClick }: ButtonProps) => (
  <Button className={styles.closeButton} onClick={onClick} title="Close Menu">
    <Icon name="close" className={styles.closeIcon} />
  </Button>
);

export default CloseButton;
