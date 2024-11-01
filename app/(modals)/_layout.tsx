import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
        <Stack.Screen 
          name='newChat' 
          options={{
            title: 'New Chat',
          }} 
        />
        <Stack.Screen
          name='addMembers'
          options={{
            title: 'Add members'
          }}
        />
        <Stack.Screen
          name='newGroup'
          options={{
            title: 'New Group'
          }}
        />
    </Stack>
  );
}
