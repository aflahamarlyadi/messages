import { ActivityIndicator } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { View } from '@/components/Themed';
import { useAuth } from '@/context/AuthContext';

export default function AuthLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (user) {
    return <Redirect href='/(tabs)' />;
  }

  return (
    <Stack>
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='enterPhoneNumber' options={{ headerShown: false }} />
      <Stack.Screen name='verifyPhoneNumber' options={{ headerShown: false }} />
    </Stack>
  )
}
