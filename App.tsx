
import React, { useState, useCallback, useEffect } from 'react';
// import { Input } from './components/Input'; // No longer directly used for coordinates
import { TimePickerInput } from './components/TimePickerInput';
import { Button } from './components/Button';
import { SuggestionCard } from './components/SuggestionCard';
import { LoadingIcon } from './components/LoadingIcon';
import { SunIcon } from './components/SunIcon';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MapInput } from './components/MapInput'; // Import new MapInput component
import { getSunAvoidanceSuggestion } from './services/recommendationService';
import { SuggestionOutput, Language, TravelTimeOfDay, NumericLocationPoint } from './types';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { t, language } = useTranslation();
  const [startPoint, setStartPoint] = useState<NumericLocationPoint | null>(null);
  const [endPoint, setEndPoint] = useState<NumericLocationPoint | null>(null);
  const [travelTimeInput, setTravelTimeInput] = useState<string>('09:00');
  const [suggestion, setSuggestion] = useState<SuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelected = (
    type: 'start' | 'destination',
    location: NumericLocationPoint | null
  ) => {
    if (type === 'start') {
      setStartPoint(location);
    } else {
      setEndPoint(location);
    }
  };

  const getTimeCategory = (time: string): TravelTimeOfDay => {
    if (!time) return TravelTimeOfDay.MORNING;
    const [hoursStr] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    if (hours >= 4 && hours < 12) return TravelTimeOfDay.MORNING;
    if (hours >= 12 && hours < 18) return TravelTimeOfDay.AFTERNOON;
    return TravelTimeOfDay.EVENING;
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!startPoint) {
      setError(t('selectStartLocationError'));
      return;
    }
    if (!endPoint) {
      setError(t('selectDestinationLocationError'));
      return;
    }
    if (!travelTimeInput) {
      setError(t('enterTravelTime'));
      return;
    }
    
    // Coordinates are now NumericLocationPoint, direct validation for format/range is less critical
    // as they come from Google Maps. Same coordinate check is still useful.
    if (startPoint.lat === endPoint.lat && startPoint.lon === endPoint.lon) {
        setError(t('sameCoordinatesError'));
        return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const travelTimeCategory = getTimeCategory(travelTimeInput);

    try {
      const result = await getSunAvoidanceSuggestion(
        startPoint, // Already NumericLocationPoint
        endPoint,   // Already NumericLocationPoint
        travelTimeCategory,
        language
      );
      setSuggestion(result);
    } catch (err) {
      setError(t('errorCalculatingSuggestion'));
      if (err instanceof Error) {
        console.error("Calculation Error:", err.message);
        if (err.message === "SAME_COORDINATES") {
            setError(t('sameCoordinatesError'));
        }
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [startPoint, endPoint, travelTimeInput, t, language]);
  
  useEffect(() => {
    const newLang = language || Language.EN; 
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    if (newLang === 'ar') {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "'Roboto', sans-serif";
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 w-full max-w-lg">
        <div className="flex justify-end items-center mb-6 -mt-2 md:-mt-4">
          <LanguageSwitcher />
        </div>
        
        <header className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-full mb-5 shadow-md">
            <SunIcon className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{t('sunSeatAdvisor')}</h1>
          <p className="text-slate-600 mt-2 text-sm">
            {t('appDescriptionMap')} {/* Updated description */}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MapInput
            id="startLocation"
            label={t('startLocationLabel')}
            onLocationSelect={(loc) => handleLocationSelected('start', loc)}
            currentLocation={startPoint}
            language={language}
          />

          <MapInput
            id="destinationLocation"
            label={t('destinationLocationLabel')}
            onLocationSelect={(loc) => handleLocationSelected('destination', loc)}
            currentLocation={endPoint}
            language={language}
          />
          
          <TimePickerInput
            id="travelTime"
            label={t('travelTime')}
            value={travelTimeInput}
            onChange={setTravelTimeInput}
            required
            aria-label={t('travelTime')}
          />
          <Button type="submit" disabled={isLoading} className="w-full !mt-8">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingIcon className="w-5 h-5 me-3" />
                <span>{t('gettingSuggestion')}</span>
              </div>
            ) : (
              t('getSuggestion')
            )}
          </Button>
        </form>

        {(suggestion || error) && (
          <div className="mt-8">
            <SuggestionCard 
              suggestionOutput={suggestion} 
              errorText={error} 
            />
          </div>
        )}
      </div>
      <footer className="text-center mt-10 text-sm text-slate-500">
        <p>{t('poweredByNew')}</p>
        <p>&copy; {new Date().getFullYear()} {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default App;