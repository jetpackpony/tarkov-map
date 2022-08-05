import { ComponentChildren, h } from 'preact';
import styles from './Button.module.css';

interface ButtonProps {
  children: ComponentChildren,
  onClick: (e: MouseEvent) => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button class={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;