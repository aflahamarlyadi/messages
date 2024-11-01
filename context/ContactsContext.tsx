import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';

type ContactsContextType = {
  contacts: Contacts.Contact[];
  loading: boolean;
  error: string | null;
  createContact: (contact: { 
    firstName: string; 
    lastName: string; 
    phoneNumber: string; 
  }) => Promise<boolean>;
};

const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
  loading: false,
  error: null,
  createContact: async () => false,
});

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.PhoneNumbers,
            ],
          });
          
          const validContacts = data.filter(contact => 
            contact.phoneNumbers && contact.phoneNumbers.length > 0
          );
          setContacts(validContacts);
        } else {
          setError('Contacts permission was denied');
        }
      } catch (err) {
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

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
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      setContacts(data.filter(contact => 
        contact.phoneNumbers && contact.phoneNumbers.length > 0
      ));
      
      return true;
    } catch (error) {
      console.error('Error creating contact:', error);
      return false;
    }
  };

  return (
    <ContactsContext.Provider value={{ contacts, loading, error, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
