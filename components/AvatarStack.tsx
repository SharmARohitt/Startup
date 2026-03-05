import { StyleSheet, Text, View } from 'react-native';

import { palette } from '../constants/theme';

interface AvatarStackProps {
  avatars: string[];
  maxVisible?: number;
}

export const AvatarStack = ({ avatars, maxVisible = 4 }: AvatarStackProps) => {
  const visible = avatars.slice(0, maxVisible);
  const remaining = avatars.length - visible.length;

  return (
    <View style={styles.row}>
      {visible.map((avatar, index) => (
        <View key={`${avatar}-${index}`} style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10 }]}>
          <Text style={styles.avatarText}>{avatar}</Text>
        </View>
      ))}
      {remaining > 0 ? (
        <View style={[styles.avatar, styles.extra, { marginLeft: -10 }]}>
          <Text style={styles.avatarText}>+{remaining}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  extra: {
    backgroundColor: 'rgba(143,168,255,0.35)',
  },
  avatarText: {
    color: palette.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
});
