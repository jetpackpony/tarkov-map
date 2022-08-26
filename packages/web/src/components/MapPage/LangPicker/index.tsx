import { h } from "preact";
import { Language, useLanguageContext } from "../../../I18nContext";
import Button from "../Button/Button";
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

const LangPicker = () => {
  const { getCurrentLang, setLang } = useLanguageContext();
  return (
    <div>
      {Object.values(Language).map((lang) => (
        <LangButton
          lang={lang}
          selected={lang === getCurrentLang()}
          changeLang={(lang) => setLang(lang)}
        />
      ))}
    </div>
  );
};

export default LangPicker;
