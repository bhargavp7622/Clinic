# Tapza Care — React Native Patient App

A modular React Native CLI patient companion application featuring config-driven dynamic layouts, offline persistence, optimistic booking, prescription medicine scheduling, and multi-language support (English, Hindi, Telugu).

---

## 📂 Project Structure

```
Clinic/
├── __tests__/          # Unit test suites (Jest)
├── android/            # Android native project
├── ios/                # iOS native project & Podfile
└── src/
    ├── api/            # API client & mock data
    ├── common/         # Design tokens & theme
    ├── components/     # Reusable UI components & icons
    ├── context/        # React context state providers
    ├── hooks/          # Custom hooks (debounce, pagination)
    ├── i18n/           # Multi-language translations (en, hi, te)
    ├── navigation/     # Stack & Tab navigators
    ├── screens/        # Screen modules (Home, Booking, etc.)
    ├── services/       # Offline storage service
    ├── types/          # TypeScript type definitions
    └── utils/          # Helpers (formatters, haptics, validation)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- Ruby & CocoaPods (for iOS)
- Android Studio / Android SDK (for Android)

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. iOS Pods (macOS only)
cd ios && pod install && cd ..

# 3. Start Metro bundler
npm start

# 4. Run application
npm run android
# OR
npm run ios
```

### Tests & Type Checking

```bash
# Run unit tests
npm test

# Run TypeScript type check
npx tsc --noEmit
```

---

## ✨ Key Features

- **Config-Driven Dynamic UI**: Remote layout engine with runtime theme switching (Standard & Festival modes).
- **Optimistic Booking**: Instant appointment scheduling with conflict detection (HTTP 409) and offline rollback.
- **Medicine Tracker**: Prescription schedule with morning/afternoon/night dose tracking.
- **Offline Resilience**: Local caching with AsyncStorage and automated NetInfo connectivity handling.
- **Multi-Language**: Instant runtime language switching for English, Hindi (हिंदी), and Telugu (తెలుగు).
- **Admin Controller**: In-app control panel to simulate latency, network errors (HTTP 503), and slot conflicts.
