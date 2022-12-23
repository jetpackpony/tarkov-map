import { ComponentChildren, h } from "preact";
import CloseButton from "../../CloseButton";
import FullScreenButton from "../../FullScreenButton";
import styles from "./sidebar.module.css";

interface SidebarProps {
  children: ComponentChildren;
  headerElement: ComponentChildren;
  isOpen: boolean;
  close: () => void;
  showCloseButton: boolean;
}

const Sidebar = ({
  children,
  headerElement,
  isOpen,
  close,
  showCloseButton,
}: SidebarProps) => {
  const classes = [styles.sidebar];
  if (!isOpen) classes.push(styles.hidden);
  return (
    <div onMouseLeave={close} class={classes.join(" ")}>
      <div class={styles.container}>
        <header class={styles.header}>
          {headerElement}
          <div class={styles.buttons}>
            <FullScreenButton onClick={close} />
            {showCloseButton && <CloseButton onClick={close} />}
          </div>
        </header>
        <div class={styles.sidebarContent}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
