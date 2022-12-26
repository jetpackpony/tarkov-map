import icons from "./icons.svg";
import styles from "./Icon.module.css";

interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className }: IconProps) => (
  <svg class={`${styles.icon} ${className}`}>
    <use href={`${icons}#icon-${name}`} />
  </svg>
);

export default Icon;
