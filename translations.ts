
import { Language, TravelTimeOfDay } from './types';
import type { LanguageTranslations } from './types';

export const translations: Record<Language, LanguageTranslations> = {
  [Language.EN]: {
    sunSeatAdvisor: "SunSmart Seating",
    appDescription: "Enter your trip coordinates to find the best seat to avoid strong sunlight.", // Original
    appDescriptionMap: "Search for your start and destination to find the best seat for sun avoidance.", // Updated for search
    travelTime: "Time of Travel",
    getSuggestion: "Suggest Best Seat",
    gettingSuggestion: "Calculating suggestion...",
    suggestion: "💡 Suggestion:",
    errorOccurred: "An Error Occurred",
    poweredByNew: "Made by Mdluex", // Updated
    allRightsReserved: "SunSmart Seating. All rights reserved.",
    switchLanguageToArabic: "العربية",
    switchLanguageToEnglish: "English",
    
    directSuggestionTitle: "Recommended Seat",
    explanationTitle: "Reasoning",

    // Coordinate Inputs (Manual - kept for reference or if any part still uses them conceptually)
    startCoordinates: "Start Coordinates",
    destinationCoordinates: "Destination Coordinates",
    latitude: "Latitude",
    longitude: "Longitude",
    latitudePlaceholder: "e.g., 30.0444",
    longitudePlaceholder: "e.g., 31.2357",

    // Map/Search Inputs
    startLocationLabel: "Start Location",
    destinationLocationLabel: "Destination Location",
    searchLocationPlaceholder: "Search for a location...", // General search placeholder for MapInput (now unused there)
    selectedCoordinates: "Selected",
    currentSelection: "Current Selection",
    clickToSelectLocationPlaceholder: "Click to select location", // New for MapInput button
    
    // Map Modal
    mapModalTitle: "Select Location on Map",
    mapModalSearchPlaceholder: "Search or click on map...", // This key is no longer used by MapModal
    mapModalConfirmButton: "Confirm Location",
    interactiveMap: "Interactive map for location selection",


    // Errors
    enterAllCoordinates: "Please enter latitude and longitude for both start and destination points.", // Old
    selectStartLocationError: "Please select a start location.", // Updated
    selectDestinationLocationError: "Please select a destination location.", // Updated
    invalidCoordinates: "Invalid coordinate format. Please enter numbers only.",
    invalidCoordinateRange: "Latitude must be between -90 and 90. Longitude must be between -180 and 180.",
    errorCalculatingSuggestion: "Error calculating suggestion. Please check your inputs.",
    sameCoordinatesError: "Start and destination coordinates are the same. Please enter different points for a travel suggestion.",
    enterTravelTime: "Please enter the time of travel.",

    // Time Picker
    selectTimePlaceholder: "Select time",
    selectTimeModalTitle: "Select Time of Travel",
    hourLabel: "Hour",
    minuteLabel: "Minute",
    setTimeButton: "Set Time",
    cancelButton: "Cancel",
    AM: "AM",
    PM: "PM",

    seatSuggestions: {
        sitLeft: "Sit on the Left Side",
        sitRight: "Sit on the Right Side",
        sitFront: "Sit in the Front",
        sitBack: "Sit in the Back",
        sitAnySideFront: "Sit on either side, towards the Front",
        sitAnySideBack: "Sit on either side, towards the Back",
        sitFrontLeft: "Sit on the Front-Left Side",
        sitFrontRight: "Sit on the Front-Right Side",
        sitBackLeft: "Sit on the Back-Left Side",
        sitBackRight: "Sit on the Back-Right Side",
        sitMiddle: "Consider a middle seat or one with flexible shading.",
        sitAnywhere: "Sit Anywhere / No Direct Sun",
    },
    seatExplanations: {
        travelN_sunE: "Traveling North, with the sun in the East (to your vehicle's right), the left side is shaded.",
        travelNE_sunE: "Traveling North-East, with the sun in the East (to your vehicle's right-front), the back-left side offers more shade.",
        travelE_sunE: "Traveling East, with the sun in the East (to your vehicle's front), sides towards the back are best.",
        travelSE_sunE: "Traveling South-East, with the sun in the East (to your vehicle's left-front), the back-right side offers the most shade.",
        travelS_sunE: "Traveling South, with the sun in the East (to your vehicle's left), the right side is shaded.",
        travelSW_sunE: "Traveling South-West, with the sun in the East (to your vehicle's left-rear), the front-right side offers more shade.",
        travelW_sunE: "Traveling West, with the sun in the East (to your vehicle's rear), sides towards the front are best.",
        travelNW_sunE: "Traveling North-West, with the sun in the East (to your vehicle's right-rear), the front-left side offers more shade.",
        
        travelN_sunW: "Traveling North, with the sun in the West (to your vehicle's left), the right side is shaded.",
        travelNE_sunW: "Traveling North-East, with the sun in the West (to your vehicle's left-front), the back-right side offers the most shade.",
        travelE_sunW: "Traveling East, with the sun in the West (to your vehicle's rear), sides towards the front are best.",
        travelSE_sunW: "Traveling South-East, with the sun in the West (to your vehicle's left-rear), the front-right side offers the most shade.",
        travelS_sunW: "Traveling South, with the sun in the West (to your vehicle's right), the left side is shaded.",
        travelSW_sunW: "Traveling South-West, with the sun in the West (to your vehicle's right-front), the back-left side offers more shade.",
        travelW_sunW: "Traveling West, with the sun in the West (to your vehicle's front), sides towards the back are best.",
        travelNW_sunW: "Traveling North-West, with the sun in the West (to your vehicle's left-rear), the front-right side offers the most shade.",
        middleGeneral: "The sun's impact might be variable. Look for available shade.",
        noSun: "At this time, the sun is not a significant factor. Choose any comfortable seat.",
    },

    travelTimeMap: {
      [TravelTimeOfDay.MORNING]: "morning",
      [TravelTimeOfDay.AFTERNOON]: "afternoon",
      [TravelTimeOfDay.EVENING]: "evening",
    },
    settings: "Settings", 
    settingsModalTitle: "Application Settings", 
    closeModal: "Close modal",
  },
  [Language.AR]: {
    sunSeatAdvisor: "تقعد فين؟",
    appDescription: "أدخل إحداثيات رحلتك لمعرفة أفضل مقعد لتجنب أشعة الشمس القوية.",
    appDescriptionMap: "ابحث عن نقطتي الانطلاق والوجهة لمعرفة أفضل مقعد لتجنب أشعة الشمس.",
    travelTime: "وقت الرحلة",
    getSuggestion: "اقترح أفضل مقعد",
    gettingSuggestion: "جاري حساب الاقتراح...",
    suggestion: "💡 الاقتراح:",
    errorOccurred: "حدث خطأ",
    poweredByNew: "صنع بواسطة Mdluex",
    allRightsReserved: "تقعد فين؟. جميع الحقوق محفوظة.",
    switchLanguageToArabic: "العربية",
    switchLanguageToEnglish: "English",
    
    directSuggestionTitle: "المقعد الموصى به",
    explanationTitle: "السبب",

    startCoordinates: "إحداثيات البداية",
    destinationCoordinates: "إحداثيات الوجهة",
    latitude: "خط العرض",
    longitude: "خط الطول",
    latitudePlaceholder: "مثال: 30.0444",
    longitudePlaceholder: "مثال: 31.2357",

    startLocationLabel: "نقطة الانطلاق",
    destinationLocationLabel: "نقطة الوجهة",
    searchLocationPlaceholder: "ابحث عن مكان...",
    selectedCoordinates: "المحدد",
    currentSelection: "الاختيار الحالي",
    clickToSelectLocationPlaceholder: "انقر لاختيار الموقع",

    mapModalTitle: "اختر الموقع على الخريطة",
    mapModalSearchPlaceholder: "ابحث أو انقر على الخريطة...",
    // Note: The AR translations below are added based on the EN version for type conformity.
    // The user should provide actual Arabic translations for these.
    mapModalConfirmButton: "تأكيد الموقع", // Placeholder
    interactiveMap: "خريطة تفاعلية لاختيار الموقع", // Placeholder

    enterAllCoordinates: "الرجاء إدخال خطوط الطول والعرض لكل من نقطتي البداية والوجهة.", // Placeholder
    selectStartLocationError: "الرجاء اختيار موقع البدء.", // Placeholder
    selectDestinationLocationError: "الرجاء اختيار موقع الوجهة.", // Placeholder
    invalidCoordinates: "تنسيق الإحداثيات غير صالح. الرجاء إدخال أرقام فقط.", // Placeholder
    invalidCoordinateRange: "يجب أن يكون خط العرض بين -90 و 90. يجب أن يكون خط الطول بين -180 و 180.", // Placeholder
    errorCalculatingSuggestion: "خطأ في حساب الاقتراح. يرجى التحقق من المدخلات الخاصة بك.", // Placeholder
    sameCoordinatesError: "إحداثيات البداية والوجهة هي نفسها. الرجاء إدخال نقاط مختلفة لاقتراح السفر.", // Placeholder
    enterTravelTime: "الرجاء إدخال وقت الرحلة.", // Placeholder

    selectTimePlaceholder: "اختر الوقت", // Placeholder
    selectTimeModalTitle: "اختر وقت الرحلة", // Placeholder
    hourLabel: "ساعة", // Placeholder
    minuteLabel: "دقيقة", // Placeholder
    setTimeButton: "ضبط الوقت", // Placeholder
    cancelButton: "إلغاء", // Placeholder
    AM: "ص", // Placeholder
    PM: "م", // Placeholder

    seatSuggestions: {
        sitLeft: "اجلس على الجانب الأيسر",
        sitRight: "اجلس على الجانب الأيمن",
        sitFront: "اجلس في الأمام",
        sitBack: "اجلس في الخلف",
        sitAnySideFront: "اجلس على أي من الجانبين، باتجاه الأمام",
        sitAnySideBack: "اجلس على أي من الجانبين، باتجاه الخلف",
        sitFrontLeft: "اجلس على الجانب الأمامي الأيسر",
        sitFrontRight: "اجلس على الجانب الأمامي الأيمن",
        sitBackLeft: "اجلس على الجانب الخلفي الأيسر",
        sitBackRight: "اجلس على الجانب الخلفي الأيمن",
        sitMiddle: "فكر في مقعد في المنتصف أو مقعد به تظليل مرن.",
        sitAnywhere: "اجلس في أي مكان / لا يوجد شمس مباشرة",
    },
    seatExplanations: {
        travelN_sunE: "السفر شمالاً، مع وجود الشمس في الشرق (على يمين مركبتك)، يكون الجانب الأيسر مظللاً.",
        travelNE_sunE: "السفر باتجاه الشمال الشرقي، مع وجود الشمس في الشرق (أمام يمين مركبتك)، يوفر الجانب الخلفي الأيسر مزيدًا من الظل.",
        travelE_sunE: "السفر شرقاً، مع وجود الشمس في الشرق (أمام مركبتك)، تكون الجوانب باتجاه الخلف هي الأفضل.",
        travelSE_sunE: "السفر باتجاه الجنوب الشرقي، مع وجود الشمس في الشرق (أمام يسار مركبتك)، يوفر الجانب الخلفي الأيمن أكبر قدر من الظل.",
        travelS_sunE: "السفر جنوبًا، مع وجود الشمس في الشرق (على يسار مركبتك)، يكون الجانب الأيمن مظللاً.",
        travelSW_sunE: "السفر باتجاه الجنوب الغربي، مع وجود الشمس في الشرق (خلف يسار مركبتك)، يوفر الجانب الأمامي الأيمن مزيدًا من الظل.",
        travelW_sunE: "السفر غربًا، مع وجود الشمس في الشرق (خلف مركبتك)، تكون الجوانب باتجاه الأمام هي الأفضل.",
        travelNW_sunE: "السفر باتجاه الشمال الغربي، مع وجود الشمس في الشرق (خلف يمين مركبتك)، يوفر الجانب الأمامي الأيسر مزيدًا من الظل.",
        travelN_sunW: "السفر شمالاً، مع وجود الشمس في الغرب (على يسار مركبتك)، يكون الجانب الأيمن مظللاً.",
        travelNE_sunW: "السفر باتجاه الشمال الشرقي، مع وجود الشمس في الغرب (أمام يسار مركبتك)، يوفر الجانب الخلفي الأيمن أكبر قدر من الظل.",
        travelE_sunW: "السفر شرقاً، مع وجود الشمس في الغرب (خلف مركبتك)، تكون الجوانب باتجاه الأمام هي الأفضل.",
        travelSE_sunW: "السفر باتجاه الجنوب الشرقي، مع وجود الشمس في الغرب (خلف يسار مركبتك)، يوفر الجانب الأمامي الأيمن مزيدًا من الظل.",
        travelS_sunW: "السفر جنوبًا، مع وجود الشمس في الغرب (على يمين مركبتك)، يكون الجانب الأيسر مظللاً.",
        travelSW_sunW: "السفر باتجاه الجنوب الغربي، مع وجود الشمس في الغرب (أمام يمين مركبتك)، يوفر الجانب الخلفي الأيسر مزيدًا من الظل.",
        travelW_sunW: "السفر غربًا، مع وجود الشمس في الغرب (أمام مركبتك)، تكون الجوانب باتجاه الخلف هي الأفضل.",
        travelNW_sunW: "السفر باتجاه الشمال الغربي، مع وجود الشمس في الغرب (أمام يمين مركبتك)، يوفر الجانب الأمامي الأيمن مزيدًا من الظل.",
        middleGeneral: "قد يكون تأثير الشمس متغيرًا. ابحث عن الظل المتاح.",
        noSun: "في هذا الوقت، الشمس ليست عاملاً هامًا. اختر أي مقعد مريح.",
    },
    travelTimeMap: {
      [TravelTimeOfDay.MORNING]: "صباح",
      [TravelTimeOfDay.AFTERNOON]: "بعد الظهر",
      [TravelTimeOfDay.EVENING]: "مساء",
    },
    settings: "الإعدادات", // Placeholder
    settingsModalTitle: "إعدادات التطبيق", // Placeholder
    closeModal: "إغلاق النافذة", // Placeholder
  },
};