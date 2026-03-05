import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111733',
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#8FA8FF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.55)',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarLabel: 'Discover' }} />
      <Tabs.Screen name="groups" options={{ title: 'Groups', tabBarLabel: 'Groups' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
