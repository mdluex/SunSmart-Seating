import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex justify-end gap-2"> {/* Removed mb-6 -mt-2 md:-mt-4 */}
      <button
        onClick={() => handleLanguageChange(Language.EN)}
        disabled={language === Language.EN}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150
                    ${language === Language.EN 
                      ? 'bg-blue-600 text-white cursor-default shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}
        aria-pressed={language === Language.EN}
        aria-label={t('switchLanguageToEnglish')}
      >
        {t('switchLanguageToEnglish')}
      </button>
      <button
        onClick={() => handleLanguageChange(Language.AR)}
        disabled={language === Language.AR}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150
                    ${language === Language.AR 
                      ? 'bg-blue-600 text-white cursor-default shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'}`}
        aria-pressed={language === Language.AR}
        aria-label={t('switchLanguageToArabic')}
      >
        {t('switchLanguageToArabic')}
      </button>
    </div>
  );
};