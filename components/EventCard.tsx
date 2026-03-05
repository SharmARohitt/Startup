import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { EventItem } from '../utils/types';
import { formatEventDate } from '../utils/date';
import { AnimatedButton } from './AnimatedButton';
import { AvatarStack } from './AvatarStack';
import { GlassCard } from './GlassCard';

interface EventCardProps {
  event: EventItem;
  onPress: () => void;
  onRsvp?: () => void;
}

export const EventCard = ({ event, onPress, onRsvp }: EventCardProps) => {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={style}>
        <GlassCard style={styles.card}>
          <Image source={{ uri: event.imageUrl }} style={styles.image} />
          <View style={styles.headerRow}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.category}>{event.category}</Text>
          </View>
          <Text style={styles.meta}>{formatEventDate(event.dateTime)}</Text>
          <Text style={styles.meta}>{event.location}</Text>

          <View style={styles.footerRow}>
            <View>
              <Text style={styles.interested}>{event.interestedCount} interested</Text>
              <AvatarStack avatars={event.attendees} />
            </View>
            <View style={styles.rsvpButton}>
              <AnimatedButton label="RSVP" onPress={onRsvp ?? onPress} />
            </View>
          </View>
        </GlassCard>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: 148,
    borderRadius: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#F8FAFF',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  category: {
    color: '#DDE5FF',
    fontWeight: '600',
    fontSize: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  meta: {
    color: 'rgba(248,250,255,0.72)',
    marginBottom: 3,
    fontSize: 13,
  },
  footerRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
  },
  interested: {
    color: '#F8FAFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  rsvpButton: {
    minWidth: 105,
  },
});
