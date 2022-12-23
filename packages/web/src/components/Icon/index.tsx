import icons from "./icons.svg";

interface IconProps {
  name: string;
  className: string;
}

const Icon = ({ name, className }: IconProps) => (
  <svg class={className}>
    <use href={`${icons}#icon-${name}`} />
  </svg>
);

export default Icon;
