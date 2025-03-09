
// This is a helper function to import translation files using ES modules
// instead of CommonJS require statements
import enTranslations from '@/translations/en.json';
import frTranslations from '@/translations/fr.json';

export type TranslationRecord = Record<string, string>;

export const getTranslationByLanguage = (language: string): TranslationRecord => {
  switch (language) {
    case 'fr':
      return frTranslations;
    case 'en':
    default:
      return enTranslations;
  }
};
