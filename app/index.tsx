import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAppStore } from '../store/useAppStore';

export default function Index() {
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const onboardingComplete = useAppStore((state) => state.onboardingComplete);

  if (!hasHydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B1022',
        }}
      >
        <ActivityIndicator color="#8FA8FF" />
      </View>
    );
  }

  return onboardingComplete ? <Redirect href="/(tabs)/home" /> : <Redirect href="/onboarding" />;
}
