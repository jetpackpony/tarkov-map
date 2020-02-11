import { h } from 'preact';
import { useTranslation } from 'react-i18next';

const LangPicker = () => {
  const { i18n } = useTranslation();
  console.log("Lang: ", i18n.language);
  return (
    <div class="langPicker">
      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </div>
  );
};

export default LangPicker;