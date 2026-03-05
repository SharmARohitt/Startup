import { Event, Group, Message, Poll, User } from '../utils/chatTypes';

export const groupUsers: User[] = [
  { id: 'u1', name: 'You', avatar: 'YO', isOnline: true },
  { id: 'u2', name: 'Ava', avatar: 'AV', isOnline: true },
  { id: 'u3', name: 'Rohan', avatar: 'RO', isOnline: true },
  { id: 'u4', name: 'Mina', avatar: 'MI', isOnline: false },
  { id: 'u5', name: 'Leo', avatar: 'LE', isOnline: true },
];

export const activeGroup: Group = {
  id: 'group-1',
  name: 'Weekend Explorers',
  memberIds: groupUsers.map((user) => user.id),
};

export const sharedEvents: Event[] = [
  {
    id: 'ce-1',
    title: 'City Comedy Showcase',
    date: 'Sat, Mar 9 • 8:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200',
    interestCount: 5,
  },
  {
    id: 'ce-2',
    title: 'Neon Concert Night',
    date: 'Fri, Mar 15 • 9:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200',
    interestCount: 3,
  },
  {
    id: 'ce-3',
    title: 'Street Food Social',
    date: 'Sun, Mar 17 • 1:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    interestCount: 4,
  },
];

export const chatPolls: Poll[] = [
  {
    id: 'poll-1',
    question: 'Should we attend the comedy show this weekend?',
    options: [
      { id: 'yes', label: 'Yes', votes: 3, voters: ['u2', 'u3', 'u5'] },
      { id: 'maybe', label: 'Maybe', votes: 1, voters: ['u4'] },
      { id: 'no', label: 'No', votes: 0, voters: [] },
    ],
    totalVoters: 4,
  },
];

export const initialMessages: Message[] = [
  {
    id: 'm1',
    type: 'text',
    userId: 'u2',
    text: 'Anyone free this Saturday evening?',
    timestamp: '7:42 PM',
  },
  {
    id: 'm2',
    type: 'event',
    userId: 'u3',
    eventId: 'ce-1',
    timestamp: '7:44 PM',
  },
  {
    id: 'm3',
    type: 'reaction',
    userId: 'u5',
    text: 'I am in 🔥',
    reaction: '🔥',
    timestamp: '7:46 PM',
  },
  {
    id: 'm4',
    type: 'poll',
    userId: 'u1',
    pollId: 'poll-1',
    timestamp: '7:48 PM',
  },
];
