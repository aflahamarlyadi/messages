import { Stack } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function SettingsLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerBackVisible: false,
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background
          },
        }}
      />
    </Stack>
  );
}
