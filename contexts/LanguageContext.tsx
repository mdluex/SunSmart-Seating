
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language } from '../types';
import type { LanguageTranslations, KeysMatching } from '../types'; // Import LanguageTranslations and KeysMatching
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: KeysMatching<LanguageTranslations, string>, ...args: any[]) => string; // Use KeysMatching for key
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(Language.AR); // Default to Arabic

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useCallback((key: KeysMatching<LanguageTranslations, string>, ...args: any[]): string => {
    const langTranslations = translations[language]; // langTranslations is now LanguageTranslations
    
    // Accessing with a key that is guaranteed by KeysMatching to map to a string value
    const translation = langTranslations[key];

    // The original code had a check for `typeof translation === 'function'`.
    // Since LanguageTranslations defines properties as strings or specific objects (not functions),
    // this check is not strictly necessary for keys typed with KeysMatching<LanguageTranslations, string>.
    // If function-based translations were to be supported, LanguageTranslations would need to reflect that.
    
    // Fallback to the key itself if the translation is missing or empty, similar to original behavior.
    // Explicitly convert key to string in case it's a symbol (not possible with current KeysMatching usage but good practice).
    return translation || String(key); 
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};