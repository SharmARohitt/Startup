import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvatarStack } from '../../components/AvatarStack';
import { GlassCard } from '../../components/GlassCard';
import { PollCard } from '../../components/PollCard';
import { events, groups } from '../../constants/mockData';
import { palette } from '../../constants/theme';

export default function GroupsScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Group Coordination</Text>
          <Text style={styles.subtitle}>Plan with your friends and decide together.</Text>

          {groups.map((group) => (
            <GlassCard key={group.id} style={styles.groupCard}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.membersRow}>
                <AvatarStack avatars={group.members} maxVisible={5} />
                <Text style={styles.membersCount}>{group.members.length} members</Text>
              </View>

              <Text style={styles.sectionLabel}>Event suggestions</Text>
              {group.suggestionIds.map((id) => {
                const event = events.find((item) => item.id === id);
                if (!event) return null;
                return (
                  <Text key={id} style={styles.suggestion} onPress={() => router.push(`/event/${id}`)}>
                    • {event.title}
                  </Text>
                );
              })}
            </GlassCard>
          ))}

          <Text style={styles.sectionTitle}>Group decision poll</Text>
          <PollCard poll={groups[0].poll} />
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
    paddingBottom: 30,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: palette.textSecondary,
    marginTop: 8,
    marginBottom: 14,
  },
  groupCard: {
    marginBottom: 14,
  },
  groupName: {
    color: palette.textPrimary,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  membersCount: {
    color: palette.textSecondary,
    fontSize: 12,
  },
  sectionLabel: {
    color: '#DDE5FF',
    fontWeight: '700',
    marginBottom: 6,
  },
  suggestion: {
    color: palette.textSecondary,
    marginBottom: 6,
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
});
