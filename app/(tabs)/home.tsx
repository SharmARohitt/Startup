import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventCard } from '../../components/EventCard';
import { GlassCard } from '../../components/GlassCard';
import { events } from '../../constants/mockData';
import { palette } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';

export default function HomeScreen() {
  const router = useRouter();
  const selectedInterests = useAppStore((state) => state.selectedInterests);

  const recommended = events.filter((event) =>
    selectedInterests.some((interest) => interest.toLowerCase().includes(event.category.toLowerCase()))
  );

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.greeting}>Hey, Explorer 👋</Text>
          <Text style={styles.subtitle}>Find events that match your vibe and bring your crew.</Text>

          <GlassCard style={styles.aiCard}>
            <Text style={styles.aiTitle}>AI-style Recommendations</Text>
            <Text style={styles.aiSubtitle}>Personalized picks based on your interests and social activity.</Text>
          </GlassCard>

          <Text style={styles.sectionTitle}>Trending events</Text>
          {events.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}

          <Text style={styles.sectionTitle}>Recommended for you</Text>
          {(recommended.length ? recommended : events.slice(2, 4)).map((event) => (
            <EventCard key={event.id} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}

          <Text style={styles.sectionTitle}>Friends are attending</Text>
          {events.slice(1, 3).map((event) => (
            <EventCard key={`friends-${event.id}`} event={event} onPress={() => router.push(`/event/${event.id}`)} />
          ))}

          <View style={styles.createRow}>
            <Text style={styles.createTitle}>Want to host a micro event?</Text>
            <Text style={styles.createLink} onPress={() => router.push('/create/create-event')}>
              Create now →
            </Text>
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
    paddingBottom: 40,
  },
  greeting: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: palette.textSecondary,
    marginTop: 8,
    marginBottom: 16,
  },
  aiCard: {
    marginBottom: 14,
  },
  aiTitle: {
    color: '#F8FAFF',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  aiSubtitle: {
    color: 'rgba(248,250,255,0.75)',
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
  },
  createRow: {
    marginTop: 8,
    marginBottom: 18,
  },
  createTitle: {
    color: palette.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  createLink: {
    color: palette.accent,
    fontWeight: '700',
  },
});
