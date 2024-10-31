import { Stack } from 'expo-router';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function ChatsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerBackVisible: false,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerRight: () => (
            <MaterialCommunityIcons 
              name="square-edit-outline" 
              size={24} 
              color={ Colors[colorScheme ?? 'light'].tint }
            />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
      />
    </Stack>
  );
}
