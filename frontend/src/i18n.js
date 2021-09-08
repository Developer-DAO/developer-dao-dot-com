import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translations';
import translationEs from './locales/es/translations';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'es'];
const language = localStorage.getItem('language');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    fallbackLng,
    debug: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing',
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
    lng: language,
    resources: {
      en: {
        translation: { ...translationEn },
      },
      es: {
        translation: { ...translationEs },
      },
    },
  });

export default i18n;
