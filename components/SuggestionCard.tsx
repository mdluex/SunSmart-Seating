import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { SuggestionOutput } from '../types';

interface SuggestionCardProps {
  suggestionOutput: SuggestionOutput | null;
  errorText: string | null;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestionOutput, errorText }) => {
  const { t } = useTranslation();

  if (errorText) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded-lg shadow-md" role="alert">
        <h3 className="text-lg font-semibold text-red-700 mb-2">{t('errorOccurred')}</h3>
        <p className="text-red-600 whitespace-pre-wrap text-sm">{errorText}</p>
      </div>
    );
  }

  if (suggestionOutput) {
    return (
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-md animate-fadeIn" role="status">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-blue-700 mb-1.5">{t('directSuggestionTitle')}</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-900 leading-tight">
            {suggestionOutput.directSuggestion}
          </p>
        </div>
        <hr className="my-4 border-blue-200" />
        <div>
          <h3 className="text-base font-semibold text-blue-700 mb-1.5">{t('explanationTitle')}</h3>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
            {suggestionOutput.explanation}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

// Add a simple fadeIn animation.
const styleElement = document.getElementById('custom-animations-style');
if (!styleElement) {
  const style = document.createElement('style');
  style.id = 'custom-animations-style';
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);
}