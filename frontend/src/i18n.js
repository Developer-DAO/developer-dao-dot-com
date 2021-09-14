import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translations';
import translationEs from './locales/es/translations';
import translationFr from './locales/fr/translations';
import translationZhsc from './locales/zhsc/translations';
import translationZhtc from './locales/zhtc/translations';
import translationRu from './locales/ru/translations';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'es', 'fr', 'zhsc', 'zhtc', 'ru'];
const language =
  typeof window !== 'undefined' ? localStorage.getItem('language') : undefined;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    fallbackLng,
    debug:
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'testing',
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
      fr: {
        translation: { ...translationFr },
      },
      zhsc: {
        translation: { ...translationZhsc },
      },
      zhtc: {
        translation: { ...translationZhtc },
      },
    },
  });

export default i18n;
