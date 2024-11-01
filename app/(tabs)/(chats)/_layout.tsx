import { Pressable } from 'react-native';
import { Stack, Link } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function ChatsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Chats',
          headerBackVisible: false,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerRight: () => (
            <Link href='/(modals)/newChat' asChild>
              <Pressable>
                <Ionicons 
                  name='create-outline'
                  size={24} 
                  color={ Colors[colorScheme ?? 'light'].tint }
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='[id]'
      />
    </Stack>
  );
}
