export enum TravelTimeOfDay {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

export enum Language {
  EN = 'en',
  AR = 'ar',
}

export interface SuggestionOutput {
  directSuggestion: string;
  explanation: string;
}

export interface NumericLocationPoint {
  lat: number;
  lon: number;
}

export enum CardinalDirection {
  N = 'North',
  NE = 'North-East',
  E = 'East',
  SE = 'South-East',
  S = 'South',
  SW = 'South-West',
  W = 'West',
  NW = 'North-West',
}

// For seat suggestions
export interface SeatSuggestionKeys {
  sitLeft: string;
  sitRight: string;
  sitFront: string;
  sitBack: string;
  sitAnySideFront: string;
  sitAnySideBack: string;
  sitFrontLeft: string;
  sitFrontRight: string;
  sitBackLeft: string;
  sitBackRight: string;
  sitMiddle: string;
  sitAnywhere: string;
}

// For seat explanations
export interface SeatExplanationKeys {
  travelN_sunE: string;
  travelNE_sunE: string;
  travelE_sunE: string;
  travelSE_sunE: string;
  travelS_sunE: string;
  travelSW_sunE: string;
  travelW_sunE: string;
  travelNW_sunE: string;
  travelN_sunW: string;
  travelNE_sunW: string;
  travelE_sunW: string;
  travelSE_sunW: string;
  travelS_sunW: string;
  travelSW_sunW: string;
  travelW_sunW: string;
  travelNW_sunW: string;
  middleGeneral: string;
  noSun: string;
}

// For travel time map
export type TravelTimeMapTranslations = Record<TravelTimeOfDay, string>;

// Utility type to extract keys of T whose values are of type V
export type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

// Comprehensive type for all translations for a single language
export interface LanguageTranslations {
  sunSeatAdvisor: string;
  appDescription: string;
  appDescriptionMap: string;
  travelTime: string;
  getSuggestion: string;
  gettingSuggestion: string;
  suggestion: string;
  errorOccurred: string;
  poweredByNew: string;
  allRightsReserved: string;
  switchLanguageToArabic: string;
  switchLanguageToEnglish: string;
  directSuggestionTitle: string;
  explanationTitle: string;
  startCoordinates: string;
  destinationCoordinates: string;
  latitude: string;
  longitude: string;
  latitudePlaceholder: string;
  longitudePlaceholder: string;
  startLocationLabel: string;
  destinationLocationLabel: string;
  searchLocationPlaceholder: string;
  selectedCoordinates: string;
  currentSelection: string;
  clickToSelectLocationPlaceholder: string;
  mapModalTitle: string;
  mapModalSearchPlaceholder: string;
  mapModalConfirmButton: string;
  interactiveMap: string;
  enterAllCoordinates: string;
  selectStartLocationError: string;
  selectDestinationLocationError: string;
  invalidCoordinates: string;
  invalidCoordinateRange: string;
  errorCalculatingSuggestion: string;
  sameCoordinatesError: string;
  enterTravelTime: string;
  selectTimePlaceholder: string;
  selectTimeModalTitle: string;
  hourLabel: string;
  minuteLabel: string;
  setTimeButton: string;
  cancelButton: string;
  AM: string;
  PM: string;
  settings: string;
  settingsModalTitle: string;
  closeModal: string;

  seatSuggestions: SeatSuggestionKeys;
  seatExplanations: SeatExplanationKeys;
  travelTimeMap: TravelTimeMapTranslations;
}