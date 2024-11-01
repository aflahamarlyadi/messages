import { StyleSheet, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';

const NewChatModal = () => {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const { contacts, loading, error } = useContacts();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerSearchBarOptions: {
          placeholder: 'Search name or number',
          hideWhenScrolling: false,
          hintTextColor: 'gray',
          headerIconColor: colorScheme === 'light' ? 'black' : 'white',
          textColor: colorScheme === 'light' ? 'black' : 'white',
        },
      }} />

      <View style={styles.optionSection}>
        <Pressable 
          style={styles.optionContainer}
          onPress={() => { router.push('/newContact') }}
        >
          <Ionicons name="person-outline" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={styles.optionText}>New Contact</Text>
        </Pressable>

        <Pressable 
          style={styles.optionContainer}
          onPress={() => { router.push('/(modals)/addMembers') }}
        >
          <Ionicons name="people-outline" size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={styles.optionText}>New Group</Text>
        </Pressable>
      </View>

      <View style={styles.contactSection}>
      </View>
    </View>
  )
};

export default NewChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  optionSection: {
    borderRadius: 12,
    backgroundColor: '#181414',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  optionText: {
    fontSize: 16,
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
