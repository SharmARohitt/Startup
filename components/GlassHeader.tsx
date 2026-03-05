import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '../constants/theme';
import { AvatarStack } from './AvatarStack';

interface GlassHeaderProps {
  groupName: string;
  avatars: string[];
  onlineCount: number;
  onInvite: () => void;
  onCreatePoll: () => void;
  onSuggestEvent: () => void;
}

const ActionButton = ({ label, icon, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} style={styles.actionButton}>
      <Ionicons name={icon} size={14} color={palette.textPrimary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
};

export const GlassHeader = ({
  groupName,
  avatars,
  onlineCount,
  onInvite,
  onCreatePoll,
  onSuggestEvent,
}: GlassHeaderProps) => {
  return (
    <View style={styles.shell}>
      <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.overlay} />

      <View style={styles.topRow}>
        <View>
          <Text style={styles.groupName}>{groupName}</Text>
          <Text style={styles.onlineText}>{onlineCount} members online</Text>
        </View>
        <AvatarStack avatars={avatars} maxVisible={5} />
      </View>

      <View style={styles.actionsRow}>
        <ActionButton label="Invite" icon="person-add-outline" onPress={onInvite} />
        <ActionButton label="Create Poll" icon="stats-chart-outline" onPress={onCreatePoll} />
        <ActionButton label="Suggest Event" icon="sparkles-outline" onPress={onSuggestEvent} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    marginBottom: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 25, 53, 0.55)',
  },
  topRow: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupName: {
    color: palette.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  onlineText: {
    color: palette.success,
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    gap: 6,
  },
  actionLabel: {
    color: palette.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
});
