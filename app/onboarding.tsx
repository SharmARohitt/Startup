import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedButton } from '../components/AnimatedButton';
import { GlassCard } from '../components/GlassCard';
import { InterestChip } from '../components/InterestChip';
import { interests } from '../constants/mockData';
import { palette } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';

const MIN_INTERESTS = 3;

export default function OnboardingScreen() {
  const router = useRouter();
  const selectedInterests = useAppStore((state) => state.selectedInterests);
  const toggleInterest = useAppStore((state) => state.toggleInterest);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const progress = useMemo(() => Math.min(selectedInterests.length / MIN_INTERESTS, 1), [selectedInterests]);

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Pick your interests</Text>
          <Text style={styles.subtitle}>We will personalize your event feed and group suggestions.</Text>

          <GlassCard style={styles.progressCard}>
            <Text style={styles.progressText}>{selectedInterests.length} selected</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressHint}>Choose at least {MIN_INTERESTS} to continue</Text>
          </GlassCard>

          <View style={styles.chipsGrid}>
            {interests.map((interest) => (
              <InterestChip
                key={interest}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomCta}>
          <AnimatedButton
            label="Continue"
            disabled={selectedInterests.length < MIN_INTERESTS}
            onPress={() => {
              completeOnboarding();
              router.replace('/(tabs)/home');
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    color: palette.textSecondary,
    fontSize: 15,
    marginBottom: 18,
  },
  progressCard: {
    marginBottom: 18,
  },
  progressText: {
    color: palette.textPrimary,
    fontWeight: '700',
    marginBottom: 10,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.accent,
  },
  progressHint: {
    color: palette.textSecondary,
    fontSize: 12,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  bottomCta: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
