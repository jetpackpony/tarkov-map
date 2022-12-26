import { isFullscreen, toggleFullscreen } from "../App/useFullScreen";
import Icon from "../Icon";
import styles from "./fullScreenButton.module.css";

interface FullScreenButtonProps {
  onClick: (e: MouseEvent) => void;
}

const FullScreenButton = ({ onClick }: FullScreenButtonProps) => (
  <button
    class={styles.fullScreenButton}
    onClick={(e) => {
      toggleFullscreen();
      onClick(e);
    }}
    title={isFullscreen() ? "Exit Fullscreen" : "Fullscreen"}
  >
    <Icon name={isFullscreen() ? "exit-fullscreen" : "fullscreen"} />
  </button>
);

export default FullScreenButton;
