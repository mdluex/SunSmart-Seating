
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useTranslation } from '../hooks/useTranslation';

interface TimePickerModalProps {
  isOpen: boolean;
  initialValue: string; // HH:mm (24-hour format)
  onConfirm: (time: string) => void; // HH:mm (24-hour format)
  onClose: () => void;
}

const hoursArray12 = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutesArray = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
type Period = 'AM' | 'PM';

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  initialValue,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();
  const [selectedHour12, setSelectedHour12] = useState<string>('09'); // 01-12
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('AM');

  const hourColumnRef = useRef<HTMLDivElement>(null);
  const minuteColumnRef = useRef<HTMLDivElement>(null);
  const selectedHourRef = useRef<HTMLButtonElement>(null);
  const selectedMinuteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      let initialH = 9;
      let initialM = 0;
      let period: Period = 'AM';

      if (initialValue) {
        const [hStr, mStr] = initialValue.split(':');
        initialH = parseInt(hStr, 10);
        initialM = parseInt(mStr, 10);

        period = initialH >= 12 ? 'PM' : 'AM';
        if (initialH === 0) { // 12 AM
          initialH = 12;
        } else if (initialH > 12) { // PM hours
          initialH -= 12;
        }
      }
      
      setSelectedHour12(initialH.toString().padStart(2, '0'));
      setSelectedMinute(initialM.toString().padStart(2, '0'));
      setSelectedPeriod(period);

    }
  }, [isOpen, initialValue]);

  const scrollToSelected = useCallback((ref: React.RefObject<HTMLButtonElement>, columnRef: React.RefObject<HTMLDivElement>) => {
    if (ref.current && columnRef.current) {
      requestAnimationFrame(() => {
        if (ref.current) {
           ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToSelected(selectedHourRef, hourColumnRef);
    }
  }, [isOpen, selectedHour12, scrollToSelected]);

  useEffect(() => {
    if (isOpen) {
      scrollToSelected(selectedMinuteRef, minuteColumnRef);
    }
  }, [isOpen, selectedMinute, scrollToSelected]);


  const handleConfirm = () => {
    let hour24 = parseInt(selectedHour12, 10);
    if (selectedPeriod === 'AM' && hour24 === 12) { // 12 AM is 00 hours
      hour24 = 0;
    } else if (selectedPeriod === 'PM' && hour24 !== 12) { // PM hours (except 12 PM)
      hour24 += 12;
    }
    // If AM and not 12, or PM and 12, hour is already correct for 24h format (1-12 for AM, 12 for 12PM)

    const finalTime24 = `${hour24.toString().padStart(2, '0')}:${selectedMinute}`;
    onConfirm(finalTime24);
  };

  const TimeColumnItem: React.FC<{
    value: string;
    isSelected: boolean;
    onClick: () => void;
    itemRef?: React.RefObject<HTMLButtonElement>;
    ariaLabel?: string;
  }> = ({ value, isSelected, onClick, itemRef, ariaLabel }) => (
    <button
      ref={itemRef}
      type="button"
      onClick={onClick}
      className={`w-full text-center py-2.5 px-3 rounded-md text-lg transition-colors duration-150 ease-in-out
                  ${isSelected 
                    ? 'bg-blue-600 text-white font-semibold shadow-md' 
                    : 'bg-slate-50 hover:bg-slate-200 text-slate-700 hover:text-slate-900'}`}
      aria-pressed={isSelected}
      aria-label={ariaLabel || value}
    >
      {value}
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('selectTimeModalTitle')}
      closeButtonAriaLabel={t('closeModal')}
    >
      <div className="space-y-6">
        {/* AM/PM Selector */}
        <div className="flex justify-center items-center gap-3 pt-1 pb-3">
          {(['AM', 'PM'] as Period[]).map((period) => (
            <Button
              key={period}
              type="button"
              onClick={() => setSelectedPeriod(period)}
              className={`!py-2 !px-6 !text-base !font-medium
                          ${selectedPeriod === period 
                            ? '!bg-blue-600 text-white shadow-md' 
                            : '!bg-slate-200 hover:!bg-slate-300 !text-slate-700 hover:!text-slate-900'}`}
              aria-pressed={selectedPeriod === period}
              aria-label={t(period as 'AM' | 'PM')}
            >
              {t(period as 'AM' | 'PM')}
            </Button>
          ))}
        </div>

        <div className="flex justify-around items-stretch gap-4 max-h-[260px] sm:max-h-[300px]">
          {/* Hour Column */}
          <div className="flex-1 flex flex-col items-center">
            <p id="hour-label" className="text-sm font-medium text-slate-600 mb-2">{t('hourLabel')}</p>
            <div 
              ref={hourColumnRef} 
              className="w-full h-56 sm:h-64 overflow-y-auto bg-slate-100 p-2 rounded-lg border border-slate-200 space-y-1 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200"
              role="listbox"
              aria-labelledby="hour-label"
            >
              {hoursArray12.map((hour) => (
                <TimeColumnItem
                  key={`hour-${hour}`}
                  value={hour}
                  isSelected={selectedHour12 === hour}
                  onClick={() => setSelectedHour12(hour)}
                  itemRef={selectedHour12 === hour ? selectedHourRef : undefined}
                  ariaLabel={`${hour} ${t('hourLabel')}`}
                />
              ))}
            </div>
          </div>

          {/* Minute Column */}
          <div className="flex-1 flex flex-col items-center">
             <p id="minute-label" className="text-sm font-medium text-slate-600 mb-2">{t('minuteLabel')}</p>
            <div 
              ref={minuteColumnRef} 
              className="w-full h-56 sm:h-64 overflow-y-auto bg-slate-100 p-2 rounded-lg border border-slate-200 space-y-1 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200"
              role="listbox"
              aria-labelledby="minute-label"
            >
              {minutesArray.map((minute) => (
                <TimeColumnItem
                  key={`minute-${minute}`}
                  value={minute}
                  isSelected={selectedMinute === minute}
                  onClick={() => setSelectedMinute(minute)}
                  itemRef={selectedMinute === minute ? selectedMinuteRef : undefined}
                  ariaLabel={`${minute} ${t('minuteLabel')}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <Button onClick={handleConfirm} className="w-full sm:flex-1 !bg-blue-600 hover:!bg-blue-700" aria-label={t('setTimeButton')}>
            {t('setTimeButton')}
          </Button>
          <Button onClick={onClose} className="w-full sm:flex-1 !bg-slate-500 hover:!bg-slate-600" aria-label={t('cancelButton')}>
            {t('cancelButton')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
