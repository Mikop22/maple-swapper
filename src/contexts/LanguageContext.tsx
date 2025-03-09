
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getTranslationByLanguage, TranslationRecord } from '@/lib/importTranslation';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const defaultLanguage = 'en';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState<TranslationRecord>(
    getTranslationByLanguage(defaultLanguage)
  );

  // Update translations when language changes
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    setTranslations(getTranslationByLanguage(lang));
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[key] || key;
    
    // Replace parameters in the format {0}, {1}, etc.
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
