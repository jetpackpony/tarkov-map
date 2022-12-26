import { h } from "preact";
import { Language } from "../../language";
import Button from "../Button";
import styles from "./langPicker.module.css";

interface LangButtonProps {
  lang: Language;
  selected: boolean;
  changeLang: (lang: Language) => void;
}

const LangButton = ({ lang, selected, changeLang }: LangButtonProps) => (
  <Button
    className={`${styles.pickerButton} ${selected ? styles.selected : ""}`}
    onClick={() => changeLang(lang)}
  >
    {lang}
  </Button>
);

export default LangButton;
