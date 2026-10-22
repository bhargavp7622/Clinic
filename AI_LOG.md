# AI Log: Tapza Care React Native Assignment

This document logs the development journey, prompts that shaped the architecture, decisions made, alternative approaches rejected, and technical rationale for each phase of the Tapza Care mobile application.

---

## 1. Initial Prompt & Understanding
* **User Directive:** Create a clean React Native CLI project in TypeScript completing the Tapza Care assignment. Implement professional folder structure, strict TypeScript, remote config-driven home screen with distinct background bands, dynamic themes, multi-language (i18n) for Hindi and Telugu, stack & tab navigation, offline caching, network resilience with latency and failure switches, optimistic slot booking with conflict handling (409), prescription dose tracker (morning/afternoon/night), and modular separation (`index.tsx` and `styles.ts` per screen).
* **Target Audience:** Indian patients and families on mid-range Android devices, elderly family members in Hyderabad and Vijayawada who prefer Telugu or Hindi.

---

## 2. Architectural Choices & Prompts

### A. React Native CLI vs Expo
* **Decision:** React Native Community CLI 0.88 with Hermes engine.
* **Rejected:** Pure Expo or Expo Go.
* **Rationale:** The prompt strictly instructed: *"use react native cli"*. React Native CLI gives direct control over native Android and iOS build steps, CocoaPods, and native dependencies.

### B. Styling Strategy & Dynamic Theme Token System
* **Prompt:** *"Colours, spacing and type sizes come from a theme derived from the config; nothing hard-coded in components."*
* **Decision:** Created `ThemeContext` with a transformer function (`createThemeFromConfig`) that maps `LayoutConfig.theme` to complete design tokens:
  - Spacing (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`)
  - Border radius (`xs`, `sm`, `md`, `lg`, `xl`, `full`)
  - Semantic colors (`primary`, `secondary`, `surface`, `background`, `accent`, `border`, `divider`, `badgeBg`, `shimmerBase`)
  - Typography variants respecting OS font scaling and minimum touch target size (44pt) for accessibility.
* **Rejected:** Hard-coding hex colors inside component styles or relying on static global style files.

### C. Config-Driven Zepto-Style Home Architecture
* **Prompt:** *"Build the first slice of that app: a Zepto-style home screen whose sections appear as you scroll, each with its own background (solid colour, gradient or image) so the home reads as distinct bands as you scroll... An unknown section type must render nothing and never crash."*
* **Architecture:**
  - `src/screens/Home/index.tsx`: Orchestrator managing scroll parallax header and pull-to-refresh.
  - `src/screens/Home/styles.ts`: Theme-reactive layout styles.
  - `src/screens/Home/sections/SectionWrapper.tsx`: Handles band backgrounds (solid color, SVG linear gradient, or cover image).
  - `src/screens/Home/sections/SectionRenderer.tsx`: Dynamic polymorphic dispatcher. Unknown section types return `null` without throwing errors.
  - Supported Section Types:
    1. `hero_banner` (greeting, parallax on scroll, clinic CTA)
    2. `category_chips` (horizontal chip selector)
    3. `quick_actions` (2-column icon tiles with status badges)
    4. `offer_strip` (promotional banner with coupon badge)
    5. `doctor_carousel` (horizontal doctor cards with next available slot)
    6. `service_grid` (Zepto/Blinkit style service cards with discount badges)

### D. Optimistic Booking Flow & 409 Slot Conflict Rollback
* **Prompt:** *"Confirming should feel instant (optimistic update, then reconcile with the mock)."*
* **Decision:**
  - Instantly appends the newly created appointment into `BookingContext` state (0ms latency for perceived performance) and plays a success haptic.
  - Simultaneously fires asynchronous request to `MockApiClient.createBooking()`.
  - If a 409 Conflict occurs (slot taken by another patient), the optimistic item is removed from state and the user is alerted to select another slot.
  - If the device is offline or in simulated failure mode, the booking is retained in an offline queue marked `pending` and saved to `AsyncStorage`.

### E. Resilience Engine & In-App Admin Controller
* **Prompt:** *"Your mock must have a switch for latency and failure... Cache the last good config."*
* **Decision:** Built a complete in-app Admin screen accessible via the header icon:
  - Runtime config switcher between **Normal Day** (Calming Teal) and **Diwali Festival** (Festive Saffron & Gold 🪔).
  - Latency simulator: `0ms` (Instant), `1000ms` (4G), `3000ms` (Slow 2G/3G).
  - Network failure toggle (HTTP 503 simulation) to test offline fallback to AsyncStorage cache.
  - Slot conflict toggle (HTTP 409 simulation) to test optimistic booking rollback.
  - Live JSON config viewer.

### F. Accessibility & Localization (i18n)
* **Prompt:** *"The audience is Indian patients and their families on mid-range Android phones, many of them older, many who prefer Hindi or Telugu."*
* **Decision:** Configured `i18next` with complete translations across 3 languages:
  - English (`en`)
  - Hindi (`hi`)
  - Telugu (`te`)
* Designed with high contrast ratios, touch targets >= 44pt, and simple iconographic cues.

---

## 3. What Was Rejected & Why

1. **Rejected Third-Party Native Font Linking (`react-native-vector-icons` font files):**
   - *Why:* Native font files frequently fail during builds or pod installations across differing React Native versions.
   - *Chosen Alternative:* Custom vector icons powered by `react-native-svg` for crisp, reliable, cross-platform vector graphics.

2. **Rejected Complex Native Animation Libraries:**
   - *Why:* React 19 / RN 0.88 compatibility issues with native C++ JSI bindings.
   - *Chosen Alternative:* React Native's built-in `Animated` API with `useNativeDriver: true` and `PanResponder` for the gesture-driven BottomSheet.

---

## 4. Live Verification Checklist
- [x] Strict TypeScript: Zero errors on `npx tsc --noEmit`
- [x] Unit Tests: 4 test suites passing (config validation, section renderer, booking state, app render)
- [x] Two full remote configs shipped (Normal & Diwali Festival) with live runtime switcher
- [x] Offline caching of last good config via `AsyncStorage`
- [x] Gesture-driven BottomSheet for slot picking with morning & evening categories
- [x] Morning / afternoon / night medicine schedule with persistent taken/untaken dose toggling
- [x] English, Hindi, and Telugu localization
