import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './translations/en.json';
import zh from './translations/zh.json';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default to English for now
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
