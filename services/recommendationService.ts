
import { TravelTimeOfDay, Language, SuggestionOutput, NumericLocationPoint } from '../types';
import { calculateRecommendation } from './sunCalculatorService';

export const getSunAvoidanceSuggestion = async (
  startPoint: NumericLocationPoint,
  endPoint: NumericLocationPoint,
  travelTime: TravelTimeOfDay,
  language: Language
): Promise<SuggestionOutput> => {
  // Simulate async operation if needed, though calculation is synchronous
  // await new Promise(resolve => setTimeout(resolve, 100)); 

  if (startPoint.lat === endPoint.lat && startPoint.lon === endPoint.lon) {
    throw new Error("SAME_COORDINATES");
  }

  try {
    const suggestion = calculateRecommendation(startPoint, endPoint, travelTime, language);
    return suggestion;
  } catch (error) {
    console.error("Error in recommendation calculation:", error);
    // Re-throw or handle specific calculation errors
    throw error; 
  }
};
