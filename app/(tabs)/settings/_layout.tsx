import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerBackVisible: false,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
    </Stack>
  );
}
