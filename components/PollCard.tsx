import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useAppStore } from '../store/useAppStore';
import { PollItem } from '../utils/types';
import { Poll as ChatPoll } from '../utils/chatTypes';
import { AvatarStack } from './AvatarStack';
import { GlassCard } from './GlassCard';
import { InterestChip } from './InterestChip';

interface PollCardProps {
  poll: PollItem | ChatPoll;
  onVote?: (optionId: string) => void;
  selectedOptionId?: string;
  showVoters?: boolean;
}

const PollBar = ({ percent }: { percent: number }) => {
  const style = useAnimatedStyle(() => ({
    width: withTiming(`${percent}%`, { duration: 600 }) as never,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, style]} />
    </View>
  );
};

export const PollCard = ({ poll, onVote, selectedOptionId, showVoters }: PollCardProps) => {
  const votePoll = useAppStore((state) => state.votePoll);
  const fallbackSelectedOption = useAppStore((state) => state.pollVotes[poll.id]);
  const selectedOption = selectedOptionId ?? fallbackSelectedOption;

  return (
    <GlassCard>
      <Text style={styles.question}>{poll.question}</Text>
      <View style={styles.optionsRow}>
        {poll.options.map((option) => (
          <InterestChip
            key={option.id}
            label={option.label}
            selected={selectedOption === option.id}
            onPress={() => (onVote ? onVote(option.id) : votePoll(poll.id, option.id))}
          />
        ))}
      </View>

      <View style={styles.results}>
        {poll.options.map((option) => {
          const percent = poll.totalVoters ? Math.round((option.votes / poll.totalVoters) * 100) : 0;
          return (
            <View key={option.id} style={styles.resultItem}>
              <View style={styles.resultRow}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.percentLabel}>{percent}%</Text>
              </View>
              <PollBar percent={percent} />
              {showVoters && 'voters' in option && option.voters.length > 0 ? (
                <AvatarStack avatars={option.voters.map((voter) => voter.slice(0, 2).toUpperCase())} maxVisible={4} />
              ) : null}
            </View>
          );
        })}
      </View>

      <Text style={styles.total}>{poll.totalVoters} voters</Text>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  question: {
    color: '#F8FAFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  results: {
    gap: 8,
  },
  resultItem: {
    gap: 6,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionLabel: {
    color: 'rgba(248,250,255,0.9)',
    fontWeight: '600',
  },
  percentLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  track: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  fill: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#8FA8FF',
  },
  total: {
    marginTop: 12,
    color: 'rgba(248,250,255,0.75)',
    fontSize: 12,
  },
});
