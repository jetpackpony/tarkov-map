import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

export enum Language {
  EN = "en",
  RU = "ru"
};

export type LocalizedString = {
  [key in Language]: string
};

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  [Language.EN]: {
    translation: {
      "Marker color": "Marker color:",
      "Activation needed": "Needs to be activated",
      "PMC": "PMC",
      "Scav": "Scav",
      "Clear map": "Clear map"
    }
  },
  [Language.RU]: {
    translation: {
      "Marker color": "Цвет маркера:",
      "Activation needed": "Нужна активация",
      "PMC": "ЧВК",
      "Scav": "Дикий",
      "Clear map": "Очистить карту"
    }
  }
};

export const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: Language.EN,
      fallbackLng: [Language.EN, Language.RU, "dev"],
      keySeparator: false,
      interpolation: {
        escapeValue: false
      }
    });
};

export default i18n;