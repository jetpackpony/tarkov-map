import { ComponentChildren, h } from "preact";
import styles from "./Button.module.css";

export interface ButtonProps {
  children?: ComponentChildren;
  onClick: (e: MouseEvent) => void;
  className?: string;
  title?: string;
}

const Button = ({ children, onClick, className, title }: ButtonProps) => {
  const classes = [styles.button];
  if (className) {
    classes.push(className);
  }
  return (
    <button class={classes.join(" ")} onClick={onClick} title={title}>
      {children}
    </button>
  );
};

export default Button;
