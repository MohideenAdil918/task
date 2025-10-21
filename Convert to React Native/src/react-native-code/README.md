# Project Management App - React Native

A full-featured project management application built with React Native and Expo.

## Features

- 📋 Project Management with progress tracking
- ✅ Sub-task creation and management
- 🔍 Search projects and tasks
- ✓ Approval workflows
- 📊 Report generation
- 💬 Daily progress tracking with comments
- 🎤 Voice recording
- 📷 Image/video/audio file uploads
- 👤 User profiles

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (for testing)

## Installation

1. Navigate to the react-native-code folder:
```bash
cd react-native-code
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platforms:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web browser
npm run web
```

### Testing on Physical Device:

1. Install "Expo Go" app from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in terminal after running `npm start`
3. The app will load on your device

## Project Structure

```
react-native-code/
├── App.tsx                    # Main app entry point
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation configuration
│   ├── screens/
│   │   ├── ProjectListScreen.tsx
│   │   ├── CreateProjectScreen.tsx
│   │   ├── ProjectDetailScreen.tsx
│   │   ├── DailyProgressScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── ApprovalsScreen.tsx
│   │   ├── ReportScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   └── (reusable components)
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   └── styles/
│       └── colors.ts          # Color scheme
```

## Key Differences from Web Version

### Navigation
- Uses React Navigation instead of conditional rendering
- Bottom Tab Navigator for main tabs
- Stack Navigator for nested screens

### UI Components
- React Native core components (View, Text, TouchableOpacity, etc.)
- React Native Paper for Material Design components
- No Tailwind CSS - uses StyleSheet API

### Media Features
- expo-image-picker for photo/video selection
- expo-av for audio recording and playback
- expo-document-picker for file uploads
- Native camera and microphone access

### Styling
- StyleSheet.create() instead of Tailwind classes
- Flexbox for layouts
- Platform-specific styling when needed

## Building for Production

### Android APK:
```bash
expo build:android
```

### iOS IPA:
```bash
expo build:ios
```

### Using EAS Build (recommended):
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Troubleshooting

### Metro bundler issues:
```bash
expo start -c
```

### Clear cache:
```bash
npm start -- --reset-cache
```

### iOS Simulator not working:
- Make sure Xcode is installed
- Run: `sudo xcode-select --switch /Applications/Xcode.app`

### Android Emulator not working:
- Make sure Android Studio is installed
- Set up Android SDK and create a virtual device

## Notes

- Some features require physical device testing (camera, microphone)
- Push notifications require additional setup (expo-notifications)
- For production apps, consider using EAS Build instead of classic expo build
- Add proper error boundaries for production use
- Implement proper data persistence (AsyncStorage, SQLite, or backend API)

## Next Steps

1. Add authentication (Firebase, Auth0, etc.)
2. Implement backend API integration
3. Add offline support with local storage
4. Implement push notifications
5. Add analytics tracking
6. Set up error reporting (Sentry)
7. Add automated testing
