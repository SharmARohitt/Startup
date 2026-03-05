import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedButton } from '../../components/AnimatedButton';
import { AvatarStack } from '../../components/AvatarStack';
import { GlassCard } from '../../components/GlassCard';
import { PollCard } from '../../components/PollCard';
import { events, groups } from '../../constants/mockData';
import { palette } from '../../constants/theme';
import { formatEventDate } from '../../utils/date';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === id) ?? events[0];

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(450)}>
            <Image source={{ uri: event.imageUrl }} style={styles.hero} />
          </Animated.View>

          <GlassCard style={styles.overlayCard}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.meta}>{event.category} • {formatEventDate(event.dateTime)}</Text>
            <Text style={styles.meta}>{event.location}</Text>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>About the event</Text>
            <Text style={styles.body}>{event.description}</Text>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Who is going</Text>
            <AvatarStack avatars={event.attendees} maxVisible={6} />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Discussion</Text>
            <Text style={styles.body}>Your group chat and live coordination thread will appear here.</Text>
          </GlassCard>

          <Text style={styles.pollHeading}>Group decision poll</Text>
          <PollCard poll={groups[0].poll} />

          <View style={styles.ctaWrap}>
            <AnimatedButton
              label="RSVP to Event"
              onPress={() => Alert.alert('RSVP Confirmed', `You are now marked as interested in ${event.title}.`)}
            />
          </View>
        </ScrollView>
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
    paddingBottom: 28,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    marginBottom: 12,
  },
  overlayCard: {
    marginBottom: 12,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  meta: {
    color: palette.textSecondary,
    marginBottom: 4,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#F8FAFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    color: 'rgba(248,250,255,0.78)',
    lineHeight: 20,
  },
  pollHeading: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },
  ctaWrap: {
    marginTop: 14,
  },
});
