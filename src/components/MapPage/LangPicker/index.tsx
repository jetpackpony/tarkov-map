import { h } from 'preact';
import { Language, useLanguageContext } from '../../../I18nContext';
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
  const { getCurrentLang, setLang } = useLanguageContext();
  return (
    <div class="langPicker">
      {
        Object.values(Language).map((lang) => (
          <LangButton
            lang={lang}
            selected={lang === getCurrentLang()}
            changeLang={(lang) => setLang(lang)}
          />
        ))
      }
    </div>
  );
};

export default LangPicker;