
import React, { useState } from 'react';
import { NumericLocationPoint, Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { MapModal } from './MapModal'; // Import the new MapModal

interface MapInputProps {
  id: string;
  label: string;
  onLocationSelect: (location: NumericLocationPoint | null) => void;
  currentLocation: NumericLocationPoint | null;
  language: Language; // Pass language for MapModal if needed
}

export const MapInput: React.FC<MapInputProps> = ({ id, label, onLocationSelect, currentLocation, language }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalConfirm = (location: NumericLocationPoint | null) => {
    onLocationSelect(location);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const displayValue = currentLocation
    ? `Lat: ${currentLocation.lat.toFixed(4)}, Lon: ${currentLocation.lon.toFixed(4)}`
    : t('clickToSelectLocationPlaceholder');
  
  const textAlignClass = language === Language.AR ? 'text-right' : 'text-left';

  return (
    <div>
      <label htmlFor={`${id}-button`} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsModalOpen(true)}
        className={`mt-1 block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-md shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out ${textAlignClass} ${!currentLocation ? 'text-slate-400' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-label={`${label}: ${currentLocation ? displayValue : t('clickToSelectLocationPlaceholder')}`}
      >
        {currentLocation ? displayValue : <span className="text-slate-400">{displayValue}</span>}
      </button>

      {isModalOpen && ( // Conditionally render modal to ensure scripts load correctly on open
        <MapModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          initialLocation={currentLocation}
          language={language}
        />
      )}
    </div>
  );
};
