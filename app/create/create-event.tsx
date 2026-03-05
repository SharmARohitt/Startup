import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedButton } from '../../components/AnimatedButton';
import { EventCard } from '../../components/EventCard';
import { InterestChip } from '../../components/InterestChip';
import { discoverCategories } from '../../constants/mockData';
import { palette } from '../../constants/theme';
import { EventItem } from '../../utils/types';

const inputBaseStyle = {
  borderRadius: 14,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
  backgroundColor: 'rgba(255,255,255,0.08)',
  color: '#FFFFFF',
  paddingHorizontal: 14,
  paddingVertical: 12,
};

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('Sunset Rooftop Meetup');
  const [category, setCategory] = useState<(typeof discoverCategories)[number]>('Tech');
  const [description, setDescription] = useState('A cozy networking meetup for builders and creators.');
  const [date, setDate] = useState('2026-04-05T18:00:00.000Z');
  const [maxParticipants, setMaxParticipants] = useState('20');

  const previewEvent: EventItem = {
    id: 'preview',
    title: title || 'Untitled event',
    category,
    description,
    dateTime: date,
    location: `Max ${maxParticipants || '0'} participants`,
    interestedCount: 0,
    attendees: ['YOU'],
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200',
  };

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create Micro Event</Text>

          <Text style={styles.label}>Event title</Text>
          <TextInput value={title} onChangeText={setTitle} style={inputBaseStyle} placeholder="Event title" placeholderTextColor="rgba(255,255,255,0.5)" />

          <Text style={styles.label}>Category</Text>
          <View style={styles.chips}>
            {discoverCategories.map((item) => (
              <InterestChip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />
            ))}
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[inputBaseStyle, styles.multiline]}
            multiline
            placeholder="Describe your event"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />

          <Text style={styles.label}>Date</Text>
          <TextInput value={date} onChangeText={setDate} style={inputBaseStyle} placeholder="ISO date" placeholderTextColor="rgba(255,255,255,0.5)" />

          <Text style={styles.label}>Max participants</Text>
          <TextInput
            value={maxParticipants}
            onChangeText={setMaxParticipants}
            style={inputBaseStyle}
            keyboardType="number-pad"
            placeholder="20"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />

          <Text style={styles.previewHeading}>Preview</Text>
          <EventCard
            event={previewEvent}
            onPress={() => Alert.alert('Preview', 'This is how your event card will appear in the feed.')}
            onRsvp={() => Alert.alert('Preview RSVP', 'RSVP actions will work after publishing this event.')}
          />

          <AnimatedButton
            label="Publish Event"
            onPress={() => {
              if (!title.trim() || !description.trim() || !date.trim() || !maxParticipants.trim()) {
                Alert.alert('Missing details', 'Please fill all fields before publishing.');
                return;
              }

              Alert.alert('Event published', 'Your micro event is now shared with your network.', [
                {
                  text: 'Go to Home',
                  onPress: () => router.replace('/(tabs)/home'),
                },
              ]);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 30,
    gap: 10,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  label: {
    color: '#E9EEFF',
    fontSize: 13,
    fontWeight: '600',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  multiline: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  previewHeading: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
