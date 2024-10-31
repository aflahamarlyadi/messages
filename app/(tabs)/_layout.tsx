import { ActivityIndicator } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (!user) {
    return <Redirect href='/(auth)/welcome' />;
  }

  return (
    <Tabs 
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen 
          name="(chats)"
          options={{
            title: 'Chats',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
            ),
            headerShown: false,
          }}
      />
      <Tabs.Screen 
          name="settings"
          options={{ 
            title: 'Settings',
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons name={focused ? "cog" : "cog-outline"} size={size} color={color} />
            ),
            headerShown: false,
          }}
      />
    </Tabs>
  );
}
