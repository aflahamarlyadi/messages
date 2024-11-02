import { StyleSheet, Pressable, SectionList, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';
import * as Contacts from 'expo-contacts';

type Section = {
  title: string;
  data: Contacts.Contact[];
};

const AddMembersModal = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { contacts, loading, error } = useContacts();
  const [groupMembers, setGroupMembers] = useState([]);

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
      />
    </View>
  );
};

export default AddMembersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
