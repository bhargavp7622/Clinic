# Tapza Care — React Native Patient App

> Built for **Tapza Technologies Mobile Engineer Assignment**.  
> Stack: **React Native CLI (0.88)**, **TypeScript Strict**, **React Navigation Native Stack & Tabs**, **AsyncStorage Offline Resilience**, **i18next (English, Hindi, Telugu)**.

---

## 📱 Overview

Tapza Care is the patient-facing companion app for Tapza Clinic (used by doctors across Hyderabad, Vijayawada, and Guntur). Patients receive their digital prescriptions on WhatsApp after a clinic visit, and can:
1. **Explore a Zepto-style config-driven home screen** with dynamic background bands, festival theme switching at runtime, and parallax scrolling.
2. **Book specialist appointments** with an instant optimistic update and gesture-driven bottom sheet slot picker.
3. **Track daily prescribed medicines** with a morning, afternoon, and night schedule, marking doses as taken with offline persistence.
4. **Inspect resilience features** through an in-app Admin & Dev Controller (toggle latency, force network failure, and simulate slot conflicts).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js >= 20
- Ruby & CocoaPods (for iOS)
- Android Studio / Android SDK (for Android)

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/bhargavp7622/Clinic.git
cd Clinic

# 2. Install JavaScript dependencies
npm install

# 3. Install iOS CocoaPods
cd ios && pod install && cd ..

# 4. Start Metro bundler
npm start

# 5. Run on Android or iOS
npm run android
# OR
npm run ios
```

### Running Tests & TypeScript Validation
```bash
# Run unit tests (config validation, section renderer, booking state)
npm test

# Run TypeScript strict type-check
npx tsc --noEmit
```

---

## 📂 Professional Folder Structure & Rationale

```
Clinic/
├── __tests__/                   # Meaningful unit test suites
│   ├── configValidation.test.ts # Tests remote config validation & sanitizer
│   ├── sectionRenderer.test.tsx # Tests polymorphic section dispatch & unknown type safety
│   ├── bookingState.test.ts     # Tests optimistic booking & 409 conflict simulation
│   └── App.test.tsx             # Root render test
├── android/                     # Native Android project configuration
├── ios/                         # Native iOS project & Podfile (91 pods installed)
├── src/
│   ├── api/                     # Mock backend & endpoints
│   │   ├── mockApiClient.ts     # Resilient API client with latency & failure switches
│   │   └── mockData.ts          # Normal & Diwali Festival configs, Hyderabad/Vijayawada clinic data
│   ├── components/
│   │   ├── common/              # Modular, reusable design system components
│   │   │   ├── Button.tsx       # Accessible button with 44pt tap target & haptics
│   │   │   ├── Card.tsx         # Theme-elevated card container
│   │   │   ├── Badge.tsx        # Status chip (Confirmed, Popular, Discount)
│   │   │   ├── Skeleton.tsx     # Animated shimmer loaders matching real shape
│   │   │   ├── EmptyState.tsx   # Calming, designed empty states
│   │   │   ├── SearchBar.tsx    # Debounced search bar with clear button
│   │   │   ├── BottomSheet.tsx  # Gesture-driven PanResponder bottom sheet
│   │   │   ├── SuccessModal.tsx # Celebration modal on confirmed booking
│   │   │   └── OfflineBanner.tsx# Resilient network warning banner with retry
│   │   └── icons/
│   │       └── Icon.tsx         # Crisp, zero-dependency SVG icon system
│   ├── context/                 # State management layer
│   │   ├── ThemeContext.tsx     # Derives full design tokens from remote config theme
│   │   ├── ConfigContext.tsx    # Fetches GET /config with offline cache fallback
│   │   ├── NetworkContext.tsx   # NetInfo tracking + latency & failure switches
│   │   ├── BookingContext.tsx   # Optimistic slot booking & conflict rollback
│   │   └── PrescriptionContext.tsx # Medicine schedule & dose history tracking
│   ├── hooks/                   # Custom reusable hooks
│   │   ├── useDebounce.ts       # Debounce hook for instant search queries
│   │   └── usePagination.ts     # Infinite scroll & list pagination hook
│   ├── i18n/                    # Localization layer
│   │   ├── translations/
│   │   │   ├── en.json          # English
│   │   │   ├── hi.json          # Hindi (हिंदी) for North Indian patients
│   │   │   └── te.json          # Telugu (తెలుగు) for Andhra/Telangana regional patients
│   │   └── index.ts             # i18next configuration & language switcher
│   ├── navigation/              # Navigation layer
│   │   ├── RootNavigator.tsx    # Native Stack Navigator with deep linking
│   │   └── TabNavigator.tsx     # Config-driven Bottom Tab Navigator
│   ├── screens/                 # Screen controllers (index.tsx + styles.ts separation)
│   │   ├── Home/                # Zepto-style remote config driven home screen
│   │   │   ├── index.tsx        # Orchestrator with scroll parallax & shrinking header
│   │   │   ├── styles.ts        # Theme-driven styles
│   │   │   └── sections/        # Modular section components
│   │   │       ├── SectionWrapper.tsx       # Distinct color/gradient/image bands
│   │   │       ├── SectionRenderer.tsx      # Safe polymorphic section dispatcher
│   │   │       ├── HeroBannerSection.tsx    # Greeting & scroll parallax
│   │   │       ├── CategoryChipsSection.tsx # Horizontal scrollable chips
│   │   │       ├── QuickActionsSection.tsx  # 2-column icon tiles with badges
│   │   │       ├── ServiceGridSection.tsx   # Zepto-style 2-column service cards
│   │   │       ├── DoctorCarouselSection.tsx# Specialist cards with next slot & fee
│   │   │       └── OfferStripSection.tsx    # Thin promo band with coupon code
│   │   ├── Booking/             # Doctor & appointment booking screen
│   │   │   ├── index.tsx        # Date selector, gesture bottom sheet, slot picker
│   │   │   └── styles.ts
│   │   ├── Bookings/            # Patient appointments tab screen
│   │   │   ├── index.tsx        # Confirmed & offline queue list with cancel option
│   │   │   └── styles.ts
│   │   ├── Prescriptions/       # WhatsApp Prescriptions list
│   │   │   ├── index.tsx        # Search, filters, and medicine count
│   │   │   └── styles.ts
│   │   ├── PrescriptionDetail/  # Schedule & medicine tracker
│   │   │   ├── index.tsx        # Morning / afternoon / night dose toggle
│   │   │   └── styles.ts
│   │   ├── Profile/             # Patient profile & language switcher
│   │   │   └── index.tsx
│   │   └── AdminConfig/         # In-App resilience & runtime theme switcher
│   │       ├── index.tsx        # Switch Normal <-> Diwali festival, latency, 503, 409
│   │       └── styles.ts
│   ├── services/
│   │   └── storage.service.ts   # Typed AsyncStorage helper for offline persistence
│   ├── types/                   # Strict TypeScript contracts & domain models
│   └── utils/                   # Currency INR (₹), dates, haptics, validation
├── docs/                        # Screenshots & demo walkthrough
├── App.tsx                      # Root application entry point
├── AI_LOG.md                    # Record of prompts, design decisions, and rejections
└── README.md                    # Complete project documentation
```

---

## 🏛️ Key Architectural Decisions

### 1. Dynamic Design Token System (`ThemeContext`)
Rather than hardcoding colors or styles, all UI components read from a theme object dynamically derived from `LayoutConfig.theme`. When the admin switches from **Standard Day** to **Diwali Festival**, the theme colors (Teal ➔ Saffron/Gold), borders, cards, and elevation update instantly across the entire application without reloading or code changes.

### 2. Resilient Remote Config & Offline Fallback
- `GET /config` loads the active configuration.
- The last valid configuration is automatically cached in `AsyncStorage`.
- If the network fails or simulated failure is enabled, the app seamlessly falls back to the cached configuration and displays a subtle `OfflineBanner` with a retry trigger.
- **Graceful unknown section handling:** Any unknown section type in the config (e.g. `ai_smart_vitals_telemetry_radar`) is silently ignored by `SectionRenderer.tsx` and will never crash the app.

### 3. Instant Optimistic Booking with Conflict Rollback
- Appointment confirmation feels instantaneous (0ms perceived latency). The booking is immediately appended to the state and marked `confirmed`.
- The app reconciles with `MockApiClient.createBooking()` in the background.
- If a `409 Conflict` occurs (slot already taken), the optimistic booking is rolled back and the patient is prompted with an error message to select another slot.
- If offline, the booking is preserved in local storage in a `pending (offline)` state and synced later.

### 4. Elderly & Accessibility-First Design
- **Minimum Tap Targets:** All interactive chips, buttons, and dose toggles maintain at least a 44pt touch area.
- **Multi-language Support:** Translated into English, Hindi (हिंदी), and Telugu (తెలుగు) so elders and regional family members can easily navigate clinic visits and pill schedules.
- **Haptic Feedback:** Subtle sensory vibrations acknowledge critical actions (booking confirmation, dose marked as taken).

---

## 🎛️ In-App Admin & Resilience Testing Screen

Tap the **slider/gear icon** in the top right of the Home or Profile header to open the live controller:
1. **Remote Config Theme Switcher:** Toggle between **Standard Day** (Calming Teal) and **Diwali Festival** (Warm Saffron & Gold 🪔). Notice how colors, banners, cards, and section ordering change live.
2. **Latency Simulation:** Switch between **0ms** (Instant), **1000ms** (4G), and **3000ms** (Slow 2G/3G) to verify shimmer skeleton behavior.
3. **Simulated Failure Mode (HTTP 503):** Turn ON to test offline fallback, cache retention, and error banners.
4. **Slot Conflict Mode (HTTP 409):** Turn ON to test booking rollback when a slot is already taken.
5. **Live Config JSON Inspector:** Scroll through the active remote config JSON payload in real time.

---

## 🧪 Unit Tests

Run the test suite with:
```bash
npm test
```

All 4 test suites pass:
- `configValidation.test.ts`: Verifies normal and festival configs, validates mandatory theme colors, and tests section sanitizer.
- `sectionRenderer.test.tsx`: Tests polymorphic rendering and verifies unknown section types render nothing (`null`) without crashing.
- `bookingState.test.ts`: Tests slot generation, optimistic booking, 409 conflict handling, and offline cache fallback.
- `App.test.tsx`: Verifies root component mounting.

---

## ⏱️ Honest Time Spent

| Phase | Description | Time Spent |
|---|---|---|
| **Phase 1** | Project setup (RN CLI, Native Pods, Strict TS, Linting) | 45 mins |
| **Phase 2** | Architecture, Design tokens, Types, & Mock API engine | 60 mins |
| **Phase 3** | Zepto-style Config-driven Home (Bands, Parallax, Sections) | 90 mins |
| **Phase 4** | Booking Flow (Interactive Dates, Gesture BottomSheet, Optimistic 409) | 75 mins |
| **Phase 5** | Prescriptions & Medicine Schedule (Morning/Afternoon/Night tracker) | 60 mins |
| **Phase 6** | Resilience Layer (In-App Admin, Offline Cache, 3-language i18n) | 60 mins |
| **Phase 7** | Unit Testing, Documentation, & AI Log | 45 mins |
| **Total** | Complete, production-grade implementation | **~7.25 hours** |

---

## 📄 License & Attribution
Developed for Tapza Technologies Mobile Engineer Evaluation.
Author: Bhargav Parmar
