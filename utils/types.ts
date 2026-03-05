export type EventCategory =
  | 'Music'
  | 'Comedy'
  | 'Art'
  | 'Tech'
  | 'Food'
  | 'Gaming'
  | 'Workshops';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  dateTime: string;
  location: string;
  interestedCount: number;
  attendees: string[];
  imageUrl: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface PollItem {
  id: string;
  question: string;
  options: PollOption[];
  totalVoters: number;
}

export interface GroupItem {
  id: string;
  name: string;
  members: string[];
  suggestionIds: string[];
  poll: PollItem;
}
