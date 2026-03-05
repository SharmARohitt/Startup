import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { GlassCard } from '../../components/GlassCard';
import { InterestChip } from '../../components/InterestChip';
import { events } from '../../constants/mockData';
import { palette } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const selectedInterests = useAppStore((state) => state.selectedInterests);

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.profileCard}>
            <Text style={styles.avatar}>SE</Text>
            <Text style={styles.name}>Startup Explorer</Text>
            <Text style={styles.level}>Experience Level: Pro Navigator</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Attended</Text>
              </View>
              <View>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Planned</Text>
              </View>
            </View>
          </GlassCard>

          <Text style={styles.sectionTitle}>Interest badges</Text>
          <View style={styles.badges}>
            {(selectedInterests.length ? selectedInterests : ['Tech', 'Music', 'Food']).map((interest) => (
              <InterestChip key={interest} label={interest} onPress={() => {}} selected />
            ))}
          </View>

          <Text style={styles.sectionTitle}>My Experience Timeline</Text>
          {events.slice(0, 4).map((event, index) => (
            <Animated.View key={event.id} entering={FadeInRight.delay(index * 80)}>
              <GlassCard style={styles.timelineCard}>
                <Text style={styles.timelineTitle}>{event.title}</Text>
                <Text style={styles.timelineMeta}>{event.category} • {event.location}</Text>
              </GlassCard>
            </Animated.View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    color: '#F8FAFF',
    fontWeight: '700',
    fontSize: 26,
    marginBottom: 12,
  },
  name: {
    color: palette.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  level: {
    color: palette.textSecondary,
    marginBottom: 12,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  statLabel: {
    color: palette.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timelineCard: {
    marginBottom: 10,
  },
  timelineTitle: {
    color: '#F8FAFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineMeta: {
    color: 'rgba(248,250,255,0.74)',
  },
});
