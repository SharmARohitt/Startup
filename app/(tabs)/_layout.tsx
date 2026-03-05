import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: styles.label,
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          height: 72,
          borderTopWidth: 0,
          borderRadius: 22,
          backgroundColor: 'transparent',
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 0,
        },
        tabBarItemStyle: styles.item,
        tabBarActiveTintColor: '#8FA8FF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.55)',
        tabBarBackground: () => (
          <View style={styles.tabBackgroundWrap}>
            <BlurView intensity={45} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.tabOverlay} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size + 1} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} color={color} size={size + 1} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} color={color} size={size + 1} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={size + 1} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBackgroundWrap: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  tabOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 25, 53, 0.52)',
  },
  item: {
    borderRadius: 16,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
});
