export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  interestCount: number;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  voters: string[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVoters: number;
  isClosed?: boolean;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
}

export type MessageType = 'text' | 'event' | 'poll' | 'reaction';

export interface Message {
  id: string;
  type: MessageType;
  userId: string;
  timestamp: string;
  text?: string;
  eventId?: string;
  pollId?: string;
  reaction?: string;
}
