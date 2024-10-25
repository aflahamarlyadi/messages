import { Stack } from 'expo-router';

export default function MessagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="enterPhoneNumber"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="selectCountry"
        options={{
          presentation: 'modal',
          headerTitle: 'Select Country',
        }}
      />
      <Stack.Screen
        name="verifyPhoneNumber"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
