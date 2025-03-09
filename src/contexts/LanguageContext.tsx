
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages
export type Language = 'en' | 'fr';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Translation function
  const t = (key: string) => {
    const translations = require('../translations').default;
    // Return the translation for the current language, fallback to English, or key itself
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
