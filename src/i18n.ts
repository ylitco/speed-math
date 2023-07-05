import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import enTranslations from './locales/en/translation.json';
import hiTranslations from './locales/hi/translation.json';
import ruTranslations from './locales/ru/translation.json';
// import I18NextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  // .use(I18NextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
    }
  });

export default i18n;
