# Startup Event Discovery App (Expo SDK 54)

Modern Event Discovery + Social Coordination mobile app built with Expo Router and TypeScript.

## Stack

- Expo SDK 54
- React Native + TypeScript
- Expo Router
- React Native Reanimated
- Expo Blur + Expo Linear Gradient
- React Native Gesture Handler
- React Native Safe Area Context
- Zustand + AsyncStorage persistence

## Run

```bash
npm install
npm start
```

## Key Routes

- `/onboarding`
- `/(tabs)/home`
- `/(tabs)/discover`
- `/(tabs)/groups`
- `/(tabs)/profile`
- `/event/[id]`
- `/create/create-event`

## Notes

- Map and real-time features are intentionally not implemented yet.
- App uses modular reusable components in `components/` and persistent global state in `store/`.
