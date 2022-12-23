import { isFullScreen, toggleFullscreen } from "../App/useFullScreen";
import Button, { ButtonProps } from "../Button";
import Icon from "../Icon";
import styles from "./fullScreenButton.module.css";

const FullScreenButton = ({ onClick }: ButtonProps) => (
  <Button
    className={styles.fullScreenButton}
    onClick={(e) => {
      toggleFullscreen();
      onClick(e);
    }}
    title={isFullScreen() ? "Exit Fullscreen" : "Fullscreen"}
  >
    <Icon
      name={isFullScreen() ? "exit-fullscreen" : "fullscreen"}
      className={styles.fullScreenIcon}
    />
  </Button>
);

export default FullScreenButton;
