import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import hi from './translations/hi.json';
import te from './translations/te.json';
import { StorageService } from '../services/storage.service';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  te: { translation: te },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export const initI18n = async () => {
  try {
    const savedLang = await StorageService.getLanguage();
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'te')) {
      if (savedLang !== i18n.language) {
        await i18n.changeLanguage(savedLang);
      }
    }
  } catch {}
};

export const changeLanguage = async (lang: 'en' | 'hi' | 'te') => {
  await i18n.changeLanguage(lang);
  await StorageService.saveLanguage(lang);
};

export default i18n;
