import { ComponentChildren, h } from 'preact';
import styles from './Button.module.css';

interface ButtonProps {
  children: ComponentChildren,
  onClick: (e: MouseEvent) => void,
  className?: string
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  let classes = [styles.button];
  if (className) {
    classes.push(className);
  }
  return (
    <button class={classes.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;