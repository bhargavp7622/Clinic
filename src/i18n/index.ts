import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import hi from './translations/hi.json';
import te from './translations/te.json';
import { StorageService } from '../services/storage.service';

export const defaultNS = 'common';
export const resources = {
  en,
  hi,
  te,
} as const;

export const initI18n = async () => {
  const savedLang = await StorageService.getLanguage();

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: savedLang || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (lang: 'en' | 'hi' | 'te') => {
  await i18n.changeLanguage(lang);
  await StorageService.saveLanguage(lang);
};

export default i18n;
