import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import { Language } from '../../../i18n';
import './langPicker.css';

interface LangButtonProps {
  lang: Language,
  selected: boolean,
  changeLang: (lang: Language) => void
};

const LangButton = ({ lang, selected, changeLang }: LangButtonProps) => (
  <button
    class={`picker-button ${(selected) ? "selected" : ""}`}
    onClick={() => changeLang(lang)}
  >
    {lang}
  </button>
);

const LangPicker = () => {
  const { i18n } = useTranslation();
  return (
    <div class="langPicker">
      {
        Object.values(Language).map((lang) => (
          <LangButton
            lang={lang}
            selected={lang === i18n.language}
            changeLang={(lang) => i18n.changeLanguage(lang)}
          />
        ))
      }
    </div>
  );
};

export default LangPicker;