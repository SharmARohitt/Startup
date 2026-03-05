import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { palette, radius } from '../constants/theme';

interface InterestChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export const InterestChip = ({ label, selected, onPress }: InterestChipProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.95);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
    >
      <Animated.View style={[styles.chip, selected && styles.selectedChip, animatedStyle]}>
        <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  selectedChip: {
    borderColor: palette.accent,
    backgroundColor: 'rgba(143,168,255,0.24)',
  },
  label: {
    color: palette.textPrimary,
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
});
