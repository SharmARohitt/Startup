import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { GlassCard } from '../../components/GlassCard';
import { InterestChip } from '../../components/InterestChip';
import { events } from '../../constants/mockData';
import { palette } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const selectedInterests = useAppStore((state) => state.selectedInterests);
  const toggleInterest = useAppStore((state) => state.toggleInterest);
  const attendedCount = 12;
  const plannedCount = 5;
  const streakDays = 7;
  const totalScore = 780;
  const nextLevelScore = 1000;
  const completionPercent = Math.round((attendedCount / 20) * 100);
  const levelProgressPercent = Math.round((totalScore / nextLevelScore) * 100);

  const progressStyle = useAnimatedStyle(() => ({
    width: withTiming(`${levelProgressPercent}%`, { duration: 700 }) as never,
  }));

  const completionStyle = useAnimatedStyle(() => ({
    width: withTiming(`${completionPercent}%`, { duration: 700 }) as never,
  }));

  const achievements = [
    { title: 'Social Magnet', subtitle: 'Joined 10+ events with friends', icon: 'people' as const },
    { title: 'Event Finisher', subtitle: 'Completed 12 events', icon: 'checkmark-done' as const },
    { title: 'Consistency Streak', subtitle: `${streakDays} active days in a row`, icon: 'flame' as const },
  ];

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <GlassCard style={styles.profileCard}>
            <View style={styles.headerTopRow}>
              <Text style={styles.avatar}>SE</Text>
              <View style={styles.headerTextWrap}>
                <Text style={styles.name}>Startup Explorer</Text>
                <Text style={styles.level}>Pro Navigator • Level 7</Text>
              </View>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.statValue}>{attendedCount}</Text>
                <Text style={styles.statLabel}>Attended</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.statValue}>{plannedCount}</Text>
                <Text style={styles.statLabel}>Planned</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.statValue}>{streakDays}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>

            <Text style={styles.progressTitle}>Level Progress</Text>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, progressStyle]} />
            </View>
            <Text style={styles.progressMeta}>{totalScore}/{nextLevelScore} XP • {levelProgressPercent}%</Text>
          </GlassCard>

          <GlassCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Progress Summary</Text>
            <Text style={styles.sectionSubtitle}>Your event completion journey this month</Text>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, completionStyle]} />
            </View>
            <Text style={styles.progressMeta}>{completionPercent}% of monthly target completed</Text>
          </GlassCard>

          <GlassCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementList}>
              {achievements.map((achievement) => (
                <View key={achievement.title} style={styles.achievementItem}>
                  <View style={styles.achievementIcon}>
                    <Ionicons name={achievement.icon} color="#AFC0FF" size={16} />
                  </View>
                  <View style={styles.achievementTextWrap}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementSubtitle}>{achievement.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </GlassCard>

          <Text style={styles.sectionHeading}>Focus Interests</Text>
          <View style={styles.badges}>
            {(selectedInterests.length ? selectedInterests : ['Tech', 'Music', 'Food']).map((interest) => (
              <InterestChip key={interest} label={interest} onPress={() => toggleInterest(interest)} selected />
            ))}
          </View>

          <Text style={styles.sectionHeading}>Experience Timeline</Text>
          {events.slice(0, 4).map((event, index) => (
            <Animated.View key={event.id} entering={FadeInRight.delay(index * 80)}>
              <GlassCard style={styles.timelineCard}>
                <View style={styles.timelineTopRow}>
                  <Text style={styles.timelineTitle}>{event.title}</Text>
                  <Text style={styles.timelineBadge}>{event.category}</Text>
                </View>
                <Text style={styles.timelineMeta}>{event.location}</Text>
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
    gap: 12,
  },
  profileCard: {
    marginBottom: 2,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  headerTextWrap: {
    flex: 1,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    color: '#F8FAFF',
    fontWeight: '700',
    fontSize: 22,
  },
  name: {
    color: palette.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  level: {
    color: palette.textSecondary,
  },
  metricRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.14)',
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
    fontSize: 12,
  },
  progressTitle: {
    color: '#ECF1FF',
    fontWeight: '700',
    marginBottom: 8,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#8FA8FF',
  },
  progressMeta: {
    color: palette.textSecondary,
    fontSize: 12,
  },
  sectionCard: {
    marginBottom: 2,
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionSubtitle: {
    color: palette.textSecondary,
    marginBottom: 10,
    fontSize: 13,
  },
  achievementList: {
    gap: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  achievementIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  achievementTextWrap: {
    flex: 1,
  },
  achievementTitle: {
    color: '#F8FAFF',
    fontWeight: '700',
    marginBottom: 2,
  },
  achievementSubtitle: {
    color: palette.textSecondary,
    fontSize: 12,
  },
  sectionHeading: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  timelineCard: {
    marginBottom: 2,
  },
  timelineTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  timelineTitle: {
    color: '#F8FAFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineBadge: {
    color: '#E1E8FF',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  timelineMeta: {
    color: 'rgba(248,250,255,0.74)',
  },
});
