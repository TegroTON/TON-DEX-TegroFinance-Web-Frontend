import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from "./en";
import { ru } from "./ru";
import { ua } from "./ua";

export const defaultNS = "ns1";

i18next.use(initReactI18next).use(LanguageDetector).init({
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: 'i18nextLng',
    caches: ["localStorage"]
  },
  // lng: "en",
  fallbackLng: "en",
  debug: false,
  supportedLngs: ["en", "ru", "ua"],
  resources: {
    en: {
      ns1: en,
    },
    ua: {
      ns1: ua,
    },
    ru: {
      ns1: ru,
    },
  },
  defaultNS,
});
