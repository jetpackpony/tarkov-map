import { ComponentChildren, h } from 'preact';
import './Button.css';

interface ButtonProps {
  children: ComponentChildren,
  onClick: (e: MouseEvent) => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;