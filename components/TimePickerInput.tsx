
import React, { useState } from 'react';
import { TimePickerModal } from './TimePickerModal';
import { useTranslation } from '../hooks/useTranslation';
import { Language } from '../types';

interface TimePickerInputProps {
  id: string;
  label: string;
  value: string; // HH:mm format (24-hour)
  onChange: (value: string) => void; // HH:mm format (24-hour)
  required?: boolean;
  'aria-label'?: string;
}

const formatTimeTo12Hour = (time24: string, t: (key: string) => string, lang: Language): string => {
  if (!time24) return t('selectTimePlaceholder');
  const [hStr, mStr] = time24.split(':');
  if (!hStr || !mStr) return t('selectTimePlaceholder');

  let hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10);
  
  const period = hours >= 12 ? t('PM') : t('AM');
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (00 -> 12 AM) and noon (12 -> 12 PM)

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
  const hoursStr = hours < 10 ? `0${hours}` : hours.toString();

  // For Arabic, the period (ص/م) often comes after the time.
  // The useTranslation hook handles language directionality for AM/PM strings already.
  return `${hoursStr}:${minutesStr} ${period}`;
};


export const TimePickerInput: React.FC<TimePickerInputProps> = ({
  id,
  label,
  value, // This is 24-hour HH:mm
  onChange,
  required,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useTranslation();

  const handleConfirm = (newTime24: string) => { // newTime24 is HH:mm
    onChange(newTime24);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayValue = value ? formatTimeTo12Hour(value, t, language) : <span className="text-slate-400">{t('selectTimePlaceholder')}</span>;
  
  const textAlignClass = language === Language.AR ? 'text-right' : 'text-left';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={openModal}
        className={`mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out ${textAlignClass}`}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-label={props['aria-label'] || label}
        aria-required={required}
      >
        {displayValue}
      </button>
      <TimePickerModal
        isOpen={isModalOpen}
        initialValue={value} // Pass 24-hour HH:mm
        onConfirm={handleConfirm} // Expects 24-hour HH:mm
        onClose={closeModal}
      />
    </div>
  );
};
