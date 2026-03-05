import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { palette, radius } from '../constants/theme';

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const AnimatedButton = ({ label, onPress, disabled }: AnimatedButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.6 : 1,
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <LinearGradient
          colors={[palette.accent, '#688AFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
