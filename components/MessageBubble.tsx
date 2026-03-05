import { StyleSheet, Text, View } from 'react-native';

import { Message, User } from '../utils/chatTypes';

interface MessageBubbleProps {
  message: Message;
  user?: User;
  isCurrentUser: boolean;
}

export const MessageBubble = ({ message, user, isCurrentUser }: MessageBubbleProps) => {
  const label = message.type === 'reaction' ? `${message.text ?? ''}` : message.text;

  return (
    <View style={[styles.row, isCurrentUser && styles.currentRow]}>
      {!isCurrentUser ? (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.avatar ?? 'NA'}</Text>
        </View>
      ) : null}

      <View style={[styles.bubble, isCurrentUser ? styles.currentBubble : styles.otherBubble]}>
        {!isCurrentUser ? <Text style={styles.name}>{user?.name ?? 'Member'}</Text> : null}
        <Text style={styles.message}>{label}</Text>
        <Text style={styles.time}>{message.timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    gap: 8,
  },
  currentRow: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
  },
  currentBubble: {
    backgroundColor: 'rgba(143,168,255,0.35)',
    borderColor: 'rgba(255,255,255,0.28)',
  },
  otherBubble: {
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  name: {
    color: '#DDE5FF',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  message: {
    color: '#F8FAFF',
    fontSize: 14,
    lineHeight: 18,
  },
  time: {
    color: 'rgba(248,250,255,0.7)',
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});
