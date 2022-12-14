import { ComponentChildren, h } from "preact";
import Button from "../Button/Button";
import styles from "./sidebar.module.css";

interface SidebarProps {
  children: ComponentChildren;
  headerElement: ComponentChildren;
  isOpen: boolean;
  close: () => void;
}

const Sidebar = ({ children, headerElement, isOpen, close }: SidebarProps) => {
  const classes = [styles.sidebar];
  if (!isOpen) classes.push(styles.hidden);
  return (
    <div onMouseLeave={close} class={classes.join(" ")}>
      <div class={styles.container}>
        <header class={styles.header}>
          {headerElement}
          <Button className={styles.closeButton} onClick={close}>
            <div />
            <div />
          </Button>
        </header>
        <div class={styles.sidebarContent}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
