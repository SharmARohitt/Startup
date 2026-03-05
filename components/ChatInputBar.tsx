import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ChatInputBarProps {
  onSend: (value: string) => void;
  onShareEvent: () => void;
  onCreatePoll: () => void;
}

export const ChatInputBar = ({ onSend, onShareEvent, onCreatePoll }: ChatInputBarProps) => {
  const [value, setValue] = useState('');
  const focusScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: focusScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.overlay} />

      <Pressable style={styles.iconButton} onPress={onShareEvent}>
        <Ionicons name="attach" size={18} color="#FFFFFF" />
      </Pressable>

      <TextInput
        value={value}
        onChangeText={setValue}
        onFocus={() => {
          focusScale.value = withSpring(1.02);
        }}
        onBlur={() => {
          focusScale.value = withSpring(1);
        }}
        style={styles.input}
        placeholder="Message your group..."
        placeholderTextColor="rgba(255,255,255,0.6)"
      />

      <Pressable style={styles.iconButton} onPress={onCreatePoll}>
        <Ionicons name="stats-chart-outline" size={18} color="#FFFFFF" />
      </Pressable>

      <Pressable
        style={styles.sendButton}
        onPress={() => {
          onSend(value);
          setValue('');
        }}
      >
        <Ionicons name="send" size={16} color="#FFFFFF" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 25, 53, 0.55)',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 8,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(143,168,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
