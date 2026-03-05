import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeAreaSpacing = () => {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top,
    bottom: Math.max(insets.bottom, 16),
    horizontal: 16,
  };
};
