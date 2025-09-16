import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import { Contact } from '@/types/Contact';

type ContactsContextType = {
  loading: boolean;
  error: string | null;
  contacts: Contacts.Contact[];
  registeredContacts: Contact[];
  unregisteredContacts: Contact[];
  createContact: (contact: { 
    firstName: string; 
    lastName: string; 
    phoneNumber: string; 
  }) => Promise<boolean>;
};

const ContactsContext = createContext<ContactsContextType>({
  loading: false,
  error: null,
  contacts: [],
  registeredContacts: [],
  unregisteredContacts: [],
  createContact: async () => false,
});

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [registeredContacts, setRegisteredContacts] = useState<Contact[]>([]);
  const [unregisteredContacts, setUnregisteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);
        
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Name,
              Contacts.Fields.PhoneNumbers,
            ],
          });

          const validContacts: Contacts.Contact[] = data.filter(contact => 
            contact.phoneNumbers && contact.phoneNumbers.length > 0
          );

          setContacts(validContacts);
        } else {
          setError('Contacts permission was denied');
        }
      } catch (error) {
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (contacts.length === 0) return;

    const formattedContacts: Contact[] = contacts.flatMap(contact =>
      contact.phoneNumbers?.map(phone => ({
        phoneNumber: phone.number?.replace(/(?!^\+)\D/g, '') ?? '',
        name: contact.name,
        profilePicture: null,
        id: null,
      })) || []
    );

    if (formattedContacts.length === 0) return;

    (async () => {
      const snapshot = await firestore()
        .collection('users')
        .where('phoneNumber', 'in', formattedContacts.map(contact => contact.phoneNumber))
        .get();

      snapshot.docs.forEach(doc => {
        const user = doc.data();

        const formattedContact = formattedContacts.find(contact => contact.phoneNumber === user.phoneNumber);
        if (formattedContact) {
          // formattedContact.name = user.name;
          formattedContact.profilePicture = user.profilePicture;
          formattedContact.id = doc.id;
        }
      });
      
      const registeredContacts: Contact[] = [];
      const unregisteredContacts: Contact[] = [];
    
      formattedContacts.forEach(contact => {
        if (contact.id) {
          registeredContacts.push(contact);
        } else {
          unregisteredContacts.push(contact);
        }
      });
    
      setRegisteredContacts(registeredContacts);
      setUnregisteredContacts(unregisteredContacts);
    })();
  }, [contacts]);

  const createContact = async (contact: { 
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable contacts permission to create new contacts'
        );
        return false;
      }

      await Contacts.addContactAsync({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumbers: [{
          number: contact.phoneNumber,
          label: 'mobile'
        }],
        name: `${contact.firstName} ${contact.lastName}`,
        contactType: 'person',
      });

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
        ],
      });

      const validContacts = data.filter(contact => 
        contact.phoneNumbers && contact.phoneNumbers.length > 0
      );

      setContacts(validContacts);
      
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <ContactsContext.Provider value={{ contacts, registeredContacts, unregisteredContacts, loading, error, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
