

[![GitHub - SunSmart Seating](https://img.shields.io/badge/GitHub-SunSmart%20Seating-blue?style=flat-square&logo=github)](https://github.com/mdluex/SunSmart-Seating)
[![Live Demo - SunSmart Seating](https://img.shields.io/badge/Live%20Demo-SunSmart%20Seating-green?style=flat-square&logo=vercel)](https://sun-smart-seating.vercel.app/)

# تقعد فين؟ (SunSmart Seating)

**Description:**
An application that helps you choose the best seat in transportation to avoid direct sunlight, based on your start/destination coordinates and travel time.
(تطبيق يساعدك على اختيار أفضل مقعد في المواصلات لتجنب أشعة الشمس المباشرة، بناءً على إحداثيات نقطة الانطلاق والوجهة ووقت الرحلة.)

## Table of Contents

1.  [Overview](#overview)
2.  [Features](#features)
3.  [Core Logic Explained](#core-logic-explained)
4.  [How to Use](#how-to-use)
5.  [Technical Stack](#technical-stack)
6.  [Project Structure](#project-structure)
7.  [Setup and Running Locally](#setup-and-running-locally)
8.  [Key Files and Their Purpose](#key-files-and-their-purpose)
9.  [Fonts](#fonts)
10. [Accessibility](#accessibility)
11. [Known Behavior & Workarounds](#known-behavior--workarounds)

## Overview

SunSmart Seating is a web application designed to help users select the optimal seat in a vehicle (bus, train, car, etc.) to minimize direct exposure to sunlight. It achieves this by considering the user's start and destination coordinates, along with the time of travel. The application then calculates the direction of travel and the sun's general position to provide a seat recommendation.

This version utilizes an interactive map for easy selection of start and destination points, enhancing user experience compared to manual coordinate input.

## Features

*   **Sun Avoidance Seat Recommendation:** The primary feature, suggesting the best side of the vehicle to sit on.
*   **Coordinate-Based Input:** Uses latitude and longitude for precise location.
*   **Interactive Map Selection:** Users can click on a map or search for locations to set their start and end points.
*   **Time of Travel Input:** Considers morning, afternoon, or evening/nighttime to determine sun position.
*   **Nighttime Handling:** Recognizes when the sun is down and recommends sitting anywhere.
*   **Multilingual Support:** Fully available in English and Arabic, with UI adapting to Right-to-Left (RTL) for Arabic.
*   **Responsive Design:** Optimized for various screen sizes, from mobile to desktop.
*   **Clear Explanations:** Provides reasoning behind each seat suggestion.
*   **Error Handling:** Guides users with messages for invalid inputs or calculation issues.
*   **Dynamic Font Switching:** Uses 'Cairo' for Arabic and 'Roboto' for English text.

## Core Logic Explained

The seat recommendation is based on two main calculations:

1.  **Direction of Travel:**
    *   The application calculates the **bearing** (initial direction of travel) from the start coordinates to the destination coordinates.
    *   This bearing (0-360 degrees) is then mapped to one of **8 cardinal directions**: North (N), North-East (NE), East (E), South-East (SE), South (S), South-West (SW), West (W), North-West (NW).

2.  **Sun's General Position:**
    *   The **time of travel** input is categorized into:
        *   **Morning (4 AM - 11:59 AM):** Sun is generally in the **East**.
        *   **Afternoon (12 PM - 5:59 PM):** Sun is generally in the **West**.
        *   **Evening (6 PM - 3:59 AM):** Sun is considered down (no significant direct sunlight), so position is **None**.
    *   This is a simplification and does not account for exact sun altitude, azimuth, seasons, or specific geographic locations beyond hemisphere generalities.

3.  **Recommendation:**
    *   Based on the vehicle's direction of travel and the sun's relative position (e.g., if traveling North and sun is East, the sun is to the vehicle's right), the app suggests the side (left, right, front, back, or combinations) that is likely to be more shaded.
    *   If it's nighttime (Evening category), it recommends sitting anywhere.

## How to Use

1.  **Select Language (Optional):** Use the language switcher (English/العربية) at the top right.
2.  **Set Start Location:**
    *   Click on the "Start Location" input field.
    *   A map modal will appear.
    *   Click directly on the map to choose a location, or drag the marker if one is already present.
    *   Click "Confirm Location".
3.  **Set Destination Location:**
    *   Click on the "Destination Location" input field.
    *   Use the map modal as described above to select the destination.
    *   Click "Confirm Location".
4.  **Select Time of Travel:**
    *   Click on the "Time of Travel" input field.
    *   A time picker modal will appear.
    *   Select the hour, minute, and AM/PM.
    *   Click "Set Time".
5.  **Get Suggestion:**
    *   Click the "Suggest Best Seat" button.
6.  **View Results:**
    *   The recommended seat and a detailed explanation will appear in a suggestion card.
    *   If there are any errors (e.g., start and end points are the same), an error message will be displayed.

## Technical Stack

*   **Frontend Library:** React (v19) with TypeScript
*   **Styling:** Tailwind CSS
*   **Mapping:** Google Maps JavaScript API (for location input and interactive map)
*   **Core Logic:** Custom positional calculation functions (bearing, sun position relative to travel)
*   **State Management:** React Context API (for language)
*   **Build/Module System:** ES Modules (via `importmap` in `index.html`, using `esm.sh` for React and `@google/genai`)

## Project Structure

```
.
├── README.md
├── index.html
├── index.tsx
├── metadata.json
├── App.tsx
├── types.ts
├── translations.ts
├── components/
│   ├── Button.tsx
│   ├── Input.tsx  // (General purpose input, not directly used for coordinates in App.tsx now)
│   ├── LanguageSwitcher.tsx
│   ├── LoadingIcon.tsx
│   ├── MapInput.tsx
│   ├── MapModal.tsx
│   ├── Modal.tsx
│   ├── Select.tsx // (General purpose select, not currently used in App.tsx)
│   ├── SuggestionCard.tsx
│   ├── SunIcon.tsx
│   ├── TimePickerInput.tsx
│   └── TimePickerModal.tsx
├── contexts/
│   └── LanguageContext.tsx
├── hooks/
│   └── useTranslation.ts
└── services/
    ├── recommendationService.ts
    └── sunCalculatorService.ts
```

## Setup and Running Locally

This application is designed to run directly in a browser that supports ES Modules, without requiring a typical Node.js build process (like `npm install` or `npm start`).

1.  **Clone the Repository:**
    First, clone the repository to your local machine using Git:
    ```bash
    git clone https://github.com/mdluex/SunSmart-Seating.git
    ```
    Navigate into the cloned directory:
    ```bash
    cd SunSmart-Seating
    ```

2.  **Google Maps API Key (Crucial):**
    *   Open the `index.html` file in a text editor.
    *   Locate the following line:
        ```html
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places"></script>
        ```
    *   **You MUST replace `AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao` with your own valid Google Maps JavaScript API key.**
    *   Ensure your API key is enabled for the "Maps JavaScript API" and "Places API" in the Google Cloud Console. You'll also need to have billing enabled for your Google Cloud project and consider setting API restrictions (e.g., HTTP referrers) for security.

3.  **Running the Application:**
    *   **Directly opening `index.html`:** You can simply open the `index.html` file in a modern web browser (e.g., Chrome, Firefox, Edge, Safari).
    *   **Using a local HTTP server (Recommended for development):** For a better development experience and to avoid potential issues with browser security policies (like CORS, though less likely with this setup), it's recommended to serve the files using a local HTTP server.
        *   **If you have Python installed:**
            Navigate to the project directory in your terminal and run:
            ```bash
            python -m http.server
            ```
            Then open `http://localhost:8000` (or the port indicated) in your browser.
        *   **Using VS Code Live Server extension:** If you're using Visual Studio Code, you can install the "Live Server" extension, right-click on `index.html` in the explorer, and select "Open with Live Server".
        *   **Other tools:** Many other simple HTTP server tools are available.

    **Note:** This project does **not** use `npm` or `yarn` for package management or a build step like Webpack/Vite in its current configuration. React and other dependencies are loaded directly via CDNs (`esm.sh`) as specified in the `importmap` in `index.html`.

## Key Files and Their Purpose

*   **`index.html`**: The main HTML file. It includes the Google Maps API, Tailwind CSS, Google Fonts, and the `importmap` for ES module resolution.
*   **`index.tsx`**: The entry point for the React application, rendering the `App` component.
*   **`App.tsx`**: The main application component. It handles state for inputs, manages the form submission, and displays suggestions or errors. The footer in this file uses `t('poweredByNew')` which in `translations.ts` resolves to "Made by Mdluex".
*   **`services/sunCalculatorService.ts`**: Contains the core logic for:
    *   `calculateBearing`: Determines the direction of travel.
    *   `getTravelDirection`: Converts bearing to a cardinal direction.
    *   `getSunPosition`: Determines the sun's general position based on time.
    *   `calculateRecommendation`: Combines these to generate the final seat suggestion and explanation.
*   **`services/recommendationService.ts`**: Acts as an intermediary, calling `sunCalculatorService` and handling basic input validation like checking for identical start/end points.
*   **`components/MapInput.tsx`**: A button-like input that, when clicked, opens the `MapModal.tsx`.
*   **`components/MapModal.tsx`**: Provides an interactive Google Map. Users can click to select a location, or drag an existing marker. It's responsible for initializing the map and handling user interactions with it.
*   **`components/TimePickerInput.tsx` & `components/TimePickerModal.tsx`**: Custom components for a user-friendly time selection experience.
*   **`translations.ts`**: A crucial file holding all user-facing strings for both English and Arabic.
*   **`contexts/LanguageContext.tsx`**: Provides a global way to manage and switch the application's language.
*   **`types.ts`**: Defines TypeScript types and enums used throughout the application.
*   **`metadata.json`**: Provides metadata for the application environment it runs in.

## Fonts

*   **Arabic Text:** Uses the [Cairo](https://fonts.google.com/specimen/Cairo) font from Google Fonts.
*   **English Text:** Uses the [Roboto](https://fonts.google.com/specimen/Roboto) font from Google Fonts.
*   These are linked in `index.html` and applied dynamically in `App.tsx` based on the selected language.

## Accessibility

The application incorporates several accessibility (a11y) features:

*   **Semantic HTML:** Uses appropriate HTML5 elements.
*   **ARIA Attributes:**
    *   `aria-label` for buttons and inputs to provide descriptive names, especially for icon buttons or complex inputs.
    *   `aria-pressed` for toggle buttons (like the language switcher).
    *   `aria-haspopup` and `aria-expanded` for inputs that trigger modals.
    *   `role="dialog"`, `aria-modal="true"`, `aria-labelledby` for modals.
    *   `role="alert"` for error messages and `role="status"` for suggestion cards.
*   **Keyboard Navigation:**
    *   Interactive elements are focusable.
    *   Modals trap focus and can be closed with the "Escape" key.
*   **Focus Management:** Attempts to manage focus when modals open and close.
*   **Language Attributes:** `lang` and `dir` attributes on the `<html>` tag are updated dynamically based on the selected language.
*   **Contrast and Readability:** Styling aims for good color contrast and readable text.

## Known Behavior & Workarounds

*   **Google Maps Error Dialog ("This page can't load Google Maps correctly"):**
    *   If the Google Maps API key in `index.html` is invalid, missing, or misconfigured (e.g., billing not set up, API not enabled), Google Maps will display an error dialog.
    *   The application includes a workaround in `components/MapModal.tsx` that attempts to automatically click the "OK" button on this dialog. This is a client-side workaround and does **not** fix the underlying API key issue. The map may still not function correctly if the API key problem persists. **The correct solution is to ensure a valid and properly configured Google Maps API key is used.**
*   **Simplified Sun Model:** The sun position calculation is a general approximation (East in the morning, West in the afternoon). It does not account for:
    *   Specific seasons.
    *   Exact geographic latitude (e.g., southern vs. northern hemisphere nuances for sun path).
    *   Precise sun azimuth and altitude.
    *   Daylight Saving Time.
    For most general use cases within a hemisphere, this provides a reasonable estimate.

