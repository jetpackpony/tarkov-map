import { h } from "preact";
import { Language } from "../../language";
import styles from "./langPicker.module.css";

interface LangButtonProps {
  lang: Language;
  selected: boolean;
  changeLang: (lang: Language) => void;
}

const LangButton = ({ lang, selected, changeLang }: LangButtonProps) => (
  <button
    class={`${styles.pickerButton} ${selected ? styles.selected : ""}`}
    onClick={() => changeLang(lang)}
  >
    {lang}
  </button>
);

export default LangButton;
