# Purok-Health

Purok-Health is a service-first healthcare facility finder for Pampanga, Philippines. It helps residents find facilities based on the availability of specific medicines and laboratory services.

## Tech Stack
- **Frontend:** Angular 21.2 (Standalone, Signals, Router)
- **Styling:** TailwindCSS 3.4
- **Backend:** Firebase Firestore
- **Maps:** OpenStreetMap + Leaflet.js
- **Environment:** Angular SSR enabled
- **Testing:** Vitest

## Getting Started

### 1. Firebase Setup
This project requires a Firebase project.
1. Create a project at [firebase.google.com](https://firebase.google.com/).
2. Add a Web App and copy the configuration.
3. Update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your credentials.
4. Enable Cloud Firestore in your Firebase console.

### 2. Development
Install dependencies:
```bash
npm install --legacy-peer-deps
```
Run locally:
```bash
npm run dev
```

### 4. Testing & Build
Run unit tests:
```bash
npm run test
```
Build for production:
```bash
npm run build
```

## Features
- **Real-time Search:** Debounced search for medicines and services.
- **Interactive Maps:** Locate facilities using OpenStreetMap.
- **Mobile Responsive:** Fully functional hamburger menu and fluid layouts.

## Social Impact
Purok-Health is dedicated to empowering communities through better healthcare accessibility. By making facility services and medicine availability transparent, we help residents save time and resources when seeking medical care.
