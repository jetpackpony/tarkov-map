import Button, { ButtonProps } from "../Button/Button";
import styles from "./closeButton.module.css";

const CloseButton = ({ onClick }: ButtonProps) => (
  <Button className={styles.closeButton} onClick={onClick}>
    <div />
    <div />
  </Button>
);

export default CloseButton;
