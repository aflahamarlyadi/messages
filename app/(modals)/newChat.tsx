import { StyleSheet, Pressable, SectionList, FlatList, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';
import { useAuth } from '@/context/AuthContext';

import { Contact } from '@/types/Contact';
import { ChatService } from '@/modules/chats/services/chatService';

type Section = {
  title: string;
  data: Contact[];
};

const NewChatModal = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { registeredContacts, unregisteredContacts, loading, error } = useContacts();
  const { user } = useAuth();

  const getSections = (contacts: Contact[]): Section[] => {
    const sections: { [key: string]: Contact[] } = {};
    
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

  const sections: Section[] = getSections(registeredContacts || []);

  const handleChatPress = async (contact: Contact) => {
    if (!user?.uid || !contact.id) return;
    
    try {
      const chatId = await ChatService.startPrivateChat(user.uid, contact.id);
      router.navigate({
        pathname: `/(tabs)/(chats)/[id]`,
        params: { 
          id: chatId,
          name: contact.name,
          image: contact.profilePicture
        }
      });
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

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
          <Pressable 
            style={styles.contactContainer}
            onPress={() => handleChatPress(item)}
          >
            <Image style={styles.contactImage} source={item.profilePicture ? { uri: item.profilePicture } : require('@/assets/images/placeholder-profile.png')}/>
            <Text style={styles.contactName}>{item.name}</Text>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={
          <View style={{ paddingTop: 16 }}>
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
        ListFooterComponent={
          <View>
            <Text style={styles.sectionHeader}>Invite to Messages</Text>
            <FlatList
              data={unregisteredContacts}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.contactContainer}
                >
                  <Image style={styles.contactImage} source={require('@/assets/images/placeholder-profile.png')}/>
                  <Text style={styles.contactName}>{item.name}</Text>
                </Pressable>
              )}
            />
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
    padding: 16,
  },
  optionText: {
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactName: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 14,
  },
  sectionHeader: {
    paddingLeft: 16,
    paddingTop: 16,
    fontWeight: 'bold',
  },
});
