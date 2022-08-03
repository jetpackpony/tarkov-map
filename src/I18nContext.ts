import { createContext } from "preact";
import { useContext, useMemo, useState } from "preact/hooks";
import { isEnum } from "./types";

export enum Language {
  EN = "en",
  RU = "ru"
};

export type LocalizedString = {
  [key in Language]: string
};

export const isLanguage = isEnum(Language);

export interface LanguageContextInterface {
  getCurrentLang: () => Language,
  setLang: (lang: Language) => void,
  t: (handle: string) => string
};

export const LanguageContext = createContext({
  getCurrentLang: (): Language => Language.EN,
  setLang: (lang: Language) => { },
  t: (handle: string) => handle
});

export const useInitLanguageContext = () => {
  const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
  const languageContextValue = useMemo<LanguageContextInterface>(() => ({
    getCurrentLang: () => currentLang,
    setLang: (lang: Language) => setCurrentLang(lang),
    t: (handle: string) => {
      const trans = resources[currentLang].translation;
      return (handle in trans) ? trans[handle] : handle;
    }
  }), [currentLang, setCurrentLang]);
  return languageContextValue;
};

export const useLanguageContext = () => {
  const languageContextValue = useContext(LanguageContext);
  return languageContextValue;
};

type Resources = {
  [key in Language]: {
    translation: {
      [key: string]: string
    }
  }
};

// the translations
// (tip move them in a JSON file and import them)
const resources: Resources = {
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
