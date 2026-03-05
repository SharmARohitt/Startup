import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { EventCard } from '../../components/EventCard';
import { InterestChip } from '../../components/InterestChip';
import { discoverCategories, events } from '../../constants/mockData';
import { palette } from '../../constants/theme';

export default function DiscoverScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'All') return events;
    return events.filter((event) => event.category === activeCategory);
  }, [activeCategory]);

  return (
    <LinearGradient colors={[palette.bgTop, palette.bgBottom]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Discover Events</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          decelerationRate="fast"
        >
          <InterestChip
            label="All"
            selected={activeCategory === 'All'}
            onPress={() => setActiveCategory('All')}
          />
          {discoverCategories.map((category) => (
            <InterestChip
              key={category}
              label={category}
              selected={activeCategory === category}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 60)}>
              <EventCard event={item} onPress={() => router.push(`/event/${item.id}`)} />
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    paddingHorizontal: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});
