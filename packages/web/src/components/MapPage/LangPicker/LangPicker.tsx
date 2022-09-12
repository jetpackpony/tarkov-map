import { h } from "preact";
import { Language } from "../../../language";
import LangButton from "./LangButton";

interface LangPickerProps {
  selectedLang: Language;
  onChangeLang: (payload: { lang: Language }) => void;
}

const LangPicker = ({ selectedLang, onChangeLang }: LangPickerProps) => {
  return (
    <div>
      {Object.values(Language).map((lang) => (
        <LangButton
          key={lang}
          lang={lang}
          selected={lang === selectedLang}
          changeLang={(lang: Language) => onChangeLang({ lang })}
        />
      ))}
    </div>
  );
};

export default LangPicker;
