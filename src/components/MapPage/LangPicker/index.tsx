import { h } from 'preact';
import { useTranslation } from 'react-i18next';
import './langPicker.css';

const LangButton = ({lang, selected, changeLang}) => (
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
        i18n.languages.sort().map((lang) => (
          (lang === "dev")
            ? null
            : <LangButton
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