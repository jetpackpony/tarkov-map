import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Marker color": "Marker color:",
      "Activation needed": "Needs to be activated",
      "PMC": "PMC",
      "Scav": "Scav",
      "Clear map": "Clear map"
    }
  },
  ru: {
    translation: {
      "Marker color": "Цвет маркера:",
      "Activation needed": "Нужна активация",
      "PMC": "ЧВК",
      "Scav": "Дикий",
      "Clear map": "Очистить карту"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: ["en", "ru", "dev"],
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;