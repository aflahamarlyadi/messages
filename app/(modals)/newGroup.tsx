import { StyleSheet, Pressable, TextInput } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const NewGroupModal = () => {
  const colorScheme = useColorScheme();
  
  const router = useRouter();

  const { members } = useLocalSearchParams();

  const [groupName, setGroupName] = useState('');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.dismissAll();
                router.dismissAll();
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

      <View style={styles.nameSection}>
        <TextInput
          style={[styles.nameInput, { color: colorScheme === 'light' ? 'black' : 'white' }]}
          value={groupName}
          onChangeText={setGroupName}
          placeholder='Group name (optional)'
          placeholderTextColor={Colors[colorScheme ?? 'light'].gray}
        />
      </View>
    </View>
  );
}

export default NewGroupModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  nameSection: {
    borderRadius: 12,
    backgroundColor: '#181414',
  },
  nameInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  memberSection: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#181414',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
});