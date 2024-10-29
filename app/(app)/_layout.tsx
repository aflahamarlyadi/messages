import { ActivityIndicator } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { View } from '@/components/Themed';
import { useAuth } from '@/context/AuthContext';

export default function MessagesLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  if (!user) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Messages',
          headerBackVisible: false,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      <Stack.Screen
        name="settings"
      />
    </Stack>
  );
}
