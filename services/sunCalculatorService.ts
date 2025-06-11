
import { TravelTimeOfDay, Language, SuggestionOutput, NumericLocationPoint, CardinalDirection } from '../types';
import { translations } from '../translations';

const toRadians = (degrees: number): number => degrees * Math.PI / 180;
const toDegrees = (radians: number): number => radians * 180 / Math.PI;

const calculateBearing = (start: NumericLocationPoint, end: NumericLocationPoint): number => {
  const lat1 = toRadians(start.lat);
  const lon1 = toRadians(start.lon);
  const lat2 = toRadians(end.lat);
  const lon2 = toRadians(end.lon);

  const deltaLon = lon2 - lon1;

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  
  let bearing = toDegrees(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // Normalize to 0-360 degrees
  return bearing;
};

const getTravelDirection = (bearing: number): CardinalDirection => {
  if (bearing >= 337.5 || bearing < 22.5) return CardinalDirection.N;
  if (bearing >= 22.5 && bearing < 67.5) return CardinalDirection.NE;
  if (bearing >= 67.5 && bearing < 112.5) return CardinalDirection.E;
  if (bearing >= 112.5 && bearing < 157.5) return CardinalDirection.SE;
  if (bearing >= 157.5 && bearing < 202.5) return CardinalDirection.S;
  if (bearing >= 202.5 && bearing < 247.5) return CardinalDirection.SW;
  if (bearing >= 247.5 && bearing < 292.5) return CardinalDirection.W;
  if (bearing >= 292.5 && bearing < 337.5) return CardinalDirection.NW;
  return CardinalDirection.N; // Should not happen
};

type SunGlobalPosition = 'EAST' | 'WEST' | 'NONE';

const getSunPosition = (timeOfDay: TravelTimeOfDay): SunGlobalPosition => {
  switch (timeOfDay) {
    case TravelTimeOfDay.MORNING:
      return 'EAST';
    case TravelTimeOfDay.AFTERNOON:
      return 'WEST';
    case TravelTimeOfDay.EVENING: // Evening now covers nighttime
      return 'NONE';
    default:
      return 'NONE'; // Fallback, though should not be reached with current enum
  }
};

export const calculateRecommendation = (
  startPoint: NumericLocationPoint,
  endPoint: NumericLocationPoint,
  travelTime: TravelTimeOfDay,
  language: Language
): SuggestionOutput => {
  const bearing = calculateBearing(startPoint, endPoint);
  const travelDirection = getTravelDirection(bearing);
  const sunGlobalPos = getSunPosition(travelTime);

  const localeTranslations = translations[language];
  let directSuggestionKey: keyof typeof localeTranslations.seatSuggestions = 'sitMiddle';
  let explanationKey: keyof typeof localeTranslations.seatExplanations = 'middleGeneral';

  if (sunGlobalPos === 'NONE') {
    directSuggestionKey = 'sitAnywhere';
    explanationKey = 'noSun';
  } else if (sunGlobalPos === 'EAST') { // Morning sun
    switch (travelDirection) {
      case CardinalDirection.N: directSuggestionKey = 'sitLeft'; explanationKey = 'travelN_sunE'; break;
      case CardinalDirection.NE: directSuggestionKey = 'sitBackLeft'; explanationKey = 'travelNE_sunE'; break;
      case CardinalDirection.E: directSuggestionKey = 'sitAnySideBack'; explanationKey = 'travelE_sunE'; break;
      case CardinalDirection.SE: directSuggestionKey = 'sitBackRight'; explanationKey = 'travelSE_sunE'; break; 
      case CardinalDirection.S: directSuggestionKey = 'sitRight'; explanationKey = 'travelS_sunE'; break;
      case CardinalDirection.SW: directSuggestionKey = 'sitFrontRight'; explanationKey = 'travelSW_sunE'; break;
      case CardinalDirection.W: directSuggestionKey = 'sitAnySideFront'; explanationKey = 'travelW_sunE'; break;
      case CardinalDirection.NW: directSuggestionKey = 'sitFrontLeft'; explanationKey = 'travelNW_sunE'; break;
    }
  } else if (sunGlobalPos === 'WEST') { // Afternoon sun
    switch (travelDirection) {
      case CardinalDirection.N: directSuggestionKey = 'sitRight'; explanationKey = 'travelN_sunW'; break;
      case CardinalDirection.NE: directSuggestionKey = 'sitBackRight'; explanationKey = 'travelNE_sunW'; break;
      case CardinalDirection.E: directSuggestionKey = 'sitAnySideFront'; explanationKey = 'travelE_sunW'; break;
      case CardinalDirection.SE: directSuggestionKey = 'sitFrontRight'; explanationKey = 'travelSE_sunW'; break; 
      case CardinalDirection.S: directSuggestionKey = 'sitLeft'; explanationKey = 'travelS_sunW'; break;
      case CardinalDirection.SW: directSuggestionKey = 'sitBackLeft'; explanationKey = 'travelSW_sunW'; break;
      case CardinalDirection.W: directSuggestionKey = 'sitAnySideBack'; explanationKey = 'travelW_sunW'; break;
      case CardinalDirection.NW: directSuggestionKey = 'sitFrontRight'; explanationKey = 'travelNW_sunW'; break;
    }
  }
  
  return {
    directSuggestion: localeTranslations.seatSuggestions[directSuggestionKey] || localeTranslations.seatSuggestions.sitMiddle,
    explanation: localeTranslations.seatExplanations[explanationKey] || localeTranslations.seatExplanations.middleGeneral,
  };
};
