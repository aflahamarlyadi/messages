import { StyleSheet, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';

const AddMembersModal = () => {
  const colorScheme = useColorScheme();
  
  const router = useRouter();

  const { contacts, loading, error } = useContacts();

  const [groupMembers, setGroupMembers] = useState([]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push('/(modals)/newGroup');
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text
                style={{
                  color: Colors[colorScheme ?? 'light'].tint,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Next
              </Text>
            </Pressable>
          ),
        }}
      />
    </View>
  );
}

export default AddMembersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  contactSection: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#181414',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
});
