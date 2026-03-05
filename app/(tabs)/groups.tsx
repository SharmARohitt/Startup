import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { AvatarStack } from '../../components/AvatarStack';
import { ChatInputBar } from '../../components/ChatInputBar';
import { EventShareCard } from '../../components/EventShareCard';
import { GlassCard } from '../../components/GlassCard';
import { GlassHeader } from '../../components/GlassHeader';
import { MessageBubble } from '../../components/MessageBubble';
import { PollCard } from '../../components/PollCard';
import { palette } from '../../constants/theme';
import { useGroupChatStore } from '../../store/useGroupChatStore';

export default function GroupsScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const groupName = useGroupChatStore((state) => state.groupName);
  const users = useGroupChatStore((state) => state.users);
  const events = useGroupChatStore((state) => state.events);
  const messages = useGroupChatStore((state) => state.messages);
  const polls = useGroupChatStore((state) => state.polls);
  const userVotes = useGroupChatStore((state) => state.userVotes);
  const sendMessage = useGroupChatStore((state) => state.sendMessage);
  const shareEventMessage = useGroupChatStore((state) => state.shareEventMessage);
  const createPollMessage = useGroupChatStore((state) => state.createPollMessage);
  const votePoll = useGroupChatStore((state) => state.votePoll);

  const userMap = useMemo(() => {
    return Object.fromEntries(users.map((user) => [user.id, user]));
  }, [users]);

  const onlineUsers = users.filter((user) => user.isOnline);
  const topPoll = polls[0];
  const yesVoters = topPoll?.options.find((option) => option.id === 'yes')?.voters ?? [];
  const interestedCount = Math.max(events[0]?.interestCount ?? 0, yesVoters.length);
  const tabBarClearance = insets.bottom + 96;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 90], [0, -10], Extrapolation.CLAMP),
      },
    ],
    opacity: interpolate(scrollY.value, [0, 120], [1, 0.9], Extrapolation.CLAMP),
  }));

  const renderMessageBlock = (messageId: string) => {
    const message = messages.find((item) => item.id === messageId);
    if (!message) return null;

    const user = userMap[message.userId];

    if (message.type === 'text' || message.type === 'reaction') {
      return <MessageBubble message={message} user={user} isCurrentUser={message.userId === 'u1'} />;
    }

    if (message.type === 'event' && message.eventId) {
      const event = events.find((item) => item.id === message.eventId);
      if (!event) return null;

      return (
        <View style={styles.messageCardWrap}>
          <Text style={styles.messageMeta}>{user?.name ?? 'Member'} shared an event • {message.timestamp}</Text>
          <EventShareCard
            event={event}
            onView={() => router.push('/event/1')}
            onAddToPoll={createPollMessage}
            onReact={() => sendMessage(`I like ${event.title} 🙌`)}
          />
        </View>
      );
    }

    if (message.type === 'poll' && message.pollId) {
      const poll = polls.find((item) => item.id === message.pollId);
      if (!poll) return null;

      return (
        <View style={styles.messageCardWrap}>
          <Text style={styles.messageMeta}>{user?.name ?? 'Member'} started a poll • {message.timestamp}</Text>
          <PollCard
            poll={poll}
            selectedOptionId={userVotes[poll.id]}
            showVoters
            onVote={(optionId) => votePoll(poll.id, optionId)}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.inner}>
          <Animated.View style={headerAnimatedStyle}>
            <GlassHeader
              groupName={groupName}
              avatars={users.map((user) => user.avatar)}
              onlineCount={onlineUsers.length}
              onInvite={() => {
                sendMessage('Invite sent to your friend ✅');
                Alert.alert('Invite sent', 'Your invite has been shared with your friend.');
              }}
              onCreatePoll={createPollMessage}
              onSuggestEvent={() => shareEventMessage(events[0].id)}
            />
          </Animated.View>

          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={[styles.content, { paddingBottom: tabBarClearance + 88 }]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Shared event suggestions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventsStrip}>
              {events.map((event) => (
                <EventShareCard
                  key={event.id}
                  event={event}
                  compact
                  onView={() => router.push('/event/1')}
                  onAddToPoll={createPollMessage}
                  onReact={() => sendMessage(`Reacted to ${event.title} 😍`)}
                />
              ))}
            </ScrollView>

            {interestedCount >= 3 ? (
              <GlassCard style={styles.bannerCard}>
                <Text style={styles.bannerTitle}>{interestedCount} members interested in this event</Text>
                <Text style={styles.bannerAction} onPress={createPollMessage}>Create poll →</Text>
              </GlassCard>
            ) : null}

            <Text style={styles.sectionTitle}>Group chat</Text>
            {messages.map((message, index) => (
              <Animated.View key={message.id} entering={FadeInDown.delay(index * 50)}>
                {renderMessageBlock(message.id)}
              </Animated.View>
            ))}

            {yesVoters.length > 0 ? (
              <GlassCard style={styles.attendanceCard}>
                <Text style={styles.attendingText}>{yesVoters.length} members attending</Text>
                <AvatarStack avatars={yesVoters.map((voter) => (userMap[voter]?.avatar ?? 'NA'))} maxVisible={6} />
              </GlassCard>
            ) : null}
          </Animated.ScrollView>

          <View style={[styles.inputWrap, { bottom: tabBarClearance }]}> 
            <ChatInputBar
              onSend={sendMessage}
              onShareEvent={() => shareEventMessage(events[0].id)}
              onCreatePoll={() => {
                createPollMessage();
                Alert.alert('Poll created', 'Your poll has been added to the group chat.');
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  content: {},
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  eventsStrip: {
    gap: 10,
    paddingBottom: 8,
    marginBottom: 10,
  },
  bannerCard: {
    marginBottom: 14,
  },
  bannerTitle: {
    color: palette.textPrimary,
    fontWeight: '700',
    marginBottom: 6,
  },
  bannerAction: {
    color: palette.accent,
    fontWeight: '700',
  },
  messageMeta: {
    color: palette.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  messageCardWrap: {
    marginBottom: 10,
  },
  attendanceCard: {
    marginTop: 8,
  },
  attendingText: {
    color: palette.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
  },
});
