import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Event } from '../utils/chatTypes';
import { GlassCard } from './GlassCard';

interface EventShareCardProps {
  event: Event;
  compact?: boolean;
  onView: () => void;
  onAddToPoll: () => void;
  onReact: () => void;
}

export const EventShareCard = ({ event, compact, onView, onAddToPoll, onReact }: EventShareCardProps) => {
  return (
    <GlassCard style={[styles.card, compact && styles.compactCard]}>
      <Image source={{ uri: event.imageUrl }} style={[styles.image, compact && styles.compactImage]} />
      <Text style={styles.title} numberOfLines={2}>
        {event.title}
      </Text>
      <Text style={styles.meta}>{event.date}</Text>
      <Text style={styles.meta}>{event.interestCount} interested</Text>

      <View style={styles.actionsRow}>
        <Pressable onPress={onView} style={styles.action}>
          <Ionicons name="open-outline" size={14} color="#FFFFFF" />
          <Text style={styles.actionText}>View</Text>
        </Pressable>
        <Pressable onPress={onAddToPoll} style={styles.action}>
          <Ionicons name="stats-chart-outline" size={14} color="#FFFFFF" />
          <Text style={styles.actionText}>Poll</Text>
        </Pressable>
        <Pressable onPress={onReact} style={styles.action}>
          <Ionicons name="happy-outline" size={14} color="#FFFFFF" />
          <Text style={styles.actionText}>React</Text>
        </Pressable>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
  },
  compactCard: {
    width: 220,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    marginBottom: 10,
  },
  compactImage: {
    height: 100,
  },
  title: {
    color: '#F8FAFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: 'rgba(248,250,255,0.74)',
    fontSize: 12,
    marginBottom: 3,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
