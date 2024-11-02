import { StyleSheet, Pressable, SectionList, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Contacts from 'expo-contacts';

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';

type Section = {
  title: string;
  data: Contacts.Contact[];
};

const NewChatModal = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { contacts, loading, error } = useContacts();

  const getSections = (contacts: Contacts.Contact[]): Section[] => {
    const sections: { [key: string]: Contacts.Contact[] } = {};
    
    contacts.forEach((contact) => {
      const firstChar = (contact.name || "").charAt(0).toUpperCase();
      const sectionKey = /^[A-Z]$/.test(firstChar) ? firstChar : '#';
      if (!sections[sectionKey]) {
        sections[sectionKey] = [];
      }
      sections[sectionKey].push(contact);
    });

    return Object.keys(sections)
      .sort((a, b) => {
        if (a === '#') return 1;
        if (b === '#') return -1;
        return a.localeCompare(b);
      })
      .map((char) => ({
        title: char,
        data: sections[char],
      }));
  };

  const sections: Section[] = getSections(contacts || []);

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

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={
          <View>
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
        }
      />
      
    </View>
  );
};

export default NewChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginLeft: 16,
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactText: {
    fontSize: 16,
  },
  sectionHeader: {
    paddingLeft: 16,
    paddingTop: 16,
    fontWeight: 'bold',
  },
});
