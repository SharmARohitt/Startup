import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { activeGroup, chatPolls, groupUsers, initialMessages, sharedEvents } from '../constants/groupChatMock';
import { Message, Poll } from '../utils/chatTypes';

interface GroupChatState {
  groupName: string;
  users: typeof groupUsers;
  events: typeof sharedEvents;
  messages: Message[];
  polls: Poll[];
  userVotes: Record<string, string>;
  sendMessage: (text: string) => void;
  shareEventMessage: (eventId: string) => void;
  createPollMessage: () => void;
  votePoll: (pollId: string, optionId: string) => void;
}

const currentUserId = 'u1';

export const useGroupChatStore = create<GroupChatState>()(
  persist(
    (set) => ({
      groupName: activeGroup.name,
      users: groupUsers,
      events: sharedEvents,
      messages: initialMessages,
      polls: chatPolls,
      userVotes: {},
      sendMessage: (text) => {
        const value = text.trim();
        if (!value) return;

        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: `m-${Date.now()}`,
              type: 'text',
              userId: currentUserId,
              text: value,
              timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            },
          ],
        }));
      },
      shareEventMessage: (eventId) => {
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: `m-${Date.now()}`,
              type: 'event',
              userId: currentUserId,
              eventId,
              timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            },
          ],
        }));
      },
      createPollMessage: () => {
        set((state) => {
          const latestEvent = state.events[0];
          const pollId = `poll-${Date.now()}`;
          const newPoll: Poll = {
            id: pollId,
            question: latestEvent
              ? `Should we attend ${latestEvent.title} this weekend?`
              : 'Should we attend the next group event?',
            options: [
              { id: 'yes', label: 'Yes', votes: 0, voters: [] },
              { id: 'maybe', label: 'Maybe', votes: 0, voters: [] },
              { id: 'no', label: 'No', votes: 0, voters: [] },
            ],
            totalVoters: 0,
          };

          return {
            polls: [newPoll, ...state.polls],
            messages: [
              ...state.messages,
              {
                id: `m-${Date.now()}`,
                type: 'poll',
                userId: currentUserId,
                pollId,
                timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
              },
            ],
          };
        });
      },
      votePoll: (pollId, optionId) => {
        set((state) => {
          const previousVote = state.userVotes[pollId];

          const polls = state.polls.map((poll) => {
            if (poll.id !== pollId) return poll;

            const options = poll.options.map((option) => {
              let votes = option.votes;
              let voters = option.voters;

              if (previousVote === option.id) {
                votes = Math.max(0, votes - 1);
                voters = voters.filter((id) => id !== currentUserId);
              }

              if (option.id === optionId) {
                votes += 1;
                voters = voters.includes(currentUserId) ? voters : [...voters, currentUserId];
              }

              return {
                ...option,
                votes,
                voters,
              };
            });

            return {
              ...poll,
              options,
              totalVoters: options.reduce((count, option) => count + option.votes, 0),
            };
          });

          return {
            polls,
            userVotes: {
              ...state.userVotes,
              [pollId]: optionId,
            },
          };
        });
      },
    }),
    {
      name: 'startup-group-chat-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        messages: state.messages,
        polls: state.polls,
        userVotes: state.userVotes,
      }),
    }
  )
);
