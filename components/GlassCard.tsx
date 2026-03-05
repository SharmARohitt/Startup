import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { palette, radius } from '../constants/theme';

interface GlassCardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export const GlassCard = ({ children, style }: GlassCardProps) => {
  return (
    <View style={[styles.shell, style]}>
      <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={[palette.cardOverlayTop, palette.cardOverlayBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    borderRadius: radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.cardBorder,
    backgroundColor: 'rgba(12, 16, 36, 0.45)',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  content: {
    padding: 14,
  },
});
