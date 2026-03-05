import { EventItem, GroupItem } from '../utils/types';

export const interests = [
  'Music concerts',
  'Comedy shows',
  'Art exhibitions',
  'Hackathons',
  'Food festivals',
  'Startup events',
  'Gaming tournaments',
];

export const discoverCategories = [
  'Music',
  'Comedy',
  'Art',
  'Tech',
  'Food',
  'Gaming',
  'Workshops',
] as const;

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Neon Nights Concert',
    category: 'Music',
    description: 'A high-energy live concert with immersive light visuals and guest DJs.',
    dateTime: '2026-03-18T20:00:00.000Z',
    location: 'Skyline Arena',
    interestedCount: 823,
    attendees: ['AL', 'RK', 'TI', 'MS'],
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200',
  },
  {
    id: '2',
    title: 'Laugh Lab Live',
    category: 'Comedy',
    description: 'Stand-up night featuring top local and touring comedians.',
    dateTime: '2026-03-12T19:30:00.000Z',
    location: 'Downtown Theater',
    interestedCount: 301,
    attendees: ['JP', 'AN', 'LH'],
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200',
  },
  {
    id: '3',
    title: 'Future Founders Meetup',
    category: 'Tech',
    description: 'Networking and panel discussions for startup builders and operators.',
    dateTime: '2026-03-23T17:45:00.000Z',
    location: 'Launch Hub',
    interestedCount: 548,
    attendees: ['DS', 'EW', 'PM', 'OD'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
  },
  {
    id: '4',
    title: 'Pixel Clash Championship',
    category: 'Gaming',
    description: 'Citywide esports finals with live commentary and fan zones.',
    dateTime: '2026-03-28T14:00:00.000Z',
    location: 'Core Arena',
    interestedCount: 677,
    attendees: ['CY', 'NX', 'QZ'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
  },
  {
    id: '5',
    title: 'Taste Trail Festival',
    category: 'Food',
    description: 'Curated street food experience with chefs, pop-ups, and live music.',
    dateTime: '2026-03-30T12:00:00.000Z',
    location: 'Riverfront Plaza',
    interestedCount: 912,
    attendees: ['MA', 'BK', 'IO', 'TR'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
  },
];

export const groups: GroupItem[] = [
  {
    id: 'g1',
    name: 'Weekend Explorers',
    members: ['AL', 'RK', 'TI', 'MS', 'NW'],
    suggestionIds: ['1', '5', '3'],
    poll: {
      id: 'p1',
      question: 'Should we attend this event?',
      options: [
        { id: 'yes', label: 'Yes', votes: 7 },
        { id: 'no', label: 'No', votes: 1 },
        { id: 'maybe', label: 'Maybe', votes: 3 },
      ],
      totalVoters: 11,
    },
  },
];
