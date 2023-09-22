import { isEnum } from "./types";
import { useCallback } from "preact/hooks";
import { useAppSelector } from "./store";
import { selectCurrentLang } from "./store/uiSlice";

export enum Language {
  EN = "en",
  RU = "ru",
}

export type LocalizedString = {
  [key in Language]: string;
};

export const isLanguage = isEnum(Language);

type Resources = {
  [key in Language]: {
    translation: {
      [key: string]: string;
    };
  };
};

// the translations
// (tip move them in a JSON file and import them)
export const resources: Resources = {
  [Language.EN]: {
    translation: {
      "Marker color": "Marker color:",
      "Activation needed": "Needs to be activated",
      "PMC": "PMC",
      "Scav": "Scav",
      "Clear map": "Clear map",
    },
  },
  [Language.RU]: {
    translation: {
      "Marker color": "Цвет маркера:",
      "Activation needed": "Нужна активация",
      "PMC": "ЧВК",
      "Scav": "Дикий",
      "Clear map": "Очистить карту",
    },
  },
};

export const useLanguage = () => {
  const currentLang = useAppSelector(selectCurrentLang);
  const t = useCallback(
    (handle: string) => {
      const trans = resources[currentLang].translation;
      return handle in trans ? trans[handle] : handle;
    },
    [currentLang],
  );

  return {
    t,
    currentLang,
  };
};
