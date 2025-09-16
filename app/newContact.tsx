import { StyleSheet, Pressable, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useContacts } from '@/context/ContactsContext';
import { Country } from '@/types/Country';

const NewContactModal = () => {
  const colorScheme = useColorScheme();
  
  const router = useRouter();
  
  const { createContact } = useContacts();

  const { selectedCountry } = useLocalSearchParams<{ selectedCountry: string }>();
  
  const [country, setCountry] = useState<Country>({
    name: 'United States',
    code: 'US',
    callingCode: '+1',
    flag: '🇺🇸',
  });
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [callingCode, setCallingCode] = useState<string>(country.callingCode);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    if (selectedCountry) {
      const parsedCountry: Country = JSON.parse(selectedCountry);
      setCountry(parsedCountry);
      setCallingCode(country.callingCode);
      setPhoneNumber('');
    }
  }, [selectedCountry]);

  const openSelectCountry = () => {
    router.push('/selectCountry');
  };

  const handleSave = async () => {
    const success = await createContact({
      firstName,
      lastName,
      phoneNumber: `${country.callingCode}${phoneNumber}`
    });
    
    if (success) {
      router.dismissAll();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={handleSave}
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
                Save
              </Text>
            </Pressable>
          ),
        }}
      />
      <View style={styles.nameSection}>
        <TextInput
          style={[styles.nameInput, { color: colorScheme === 'light' ? 'black' : 'white' }]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder='First name'
          placeholderTextColor={Colors[colorScheme ?? 'light'].gray}
        />

        <View style={[styles.separator, { backgroundColor: Colors[colorScheme ?? 'light'].gray }]} />

        <TextInput
          style={[styles.nameInput, { color: colorScheme === 'light' ? 'black' : 'white' }]}
          value={lastName}
          onChangeText={setLastName}
          placeholder='Last name'
          placeholderTextColor={Colors[colorScheme ?? 'light'].gray}
        />
      </View>

      <View style={styles.phoneNumberSection}>
        <Pressable
          style={[
            styles.countrySelection,
            { borderBottomColor: colorScheme === 'light' ? 'black' : 'white' }
          ]}
          onPress={openSelectCountry}
        >
          <Text style={styles.countryText}>{country.name}</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors[colorScheme ?? 'light'].gray}  />
        </Pressable>

        <View style={[styles.separator, { backgroundColor: Colors[colorScheme ?? 'light'].gray }]} />

        <View style={styles.phoneContainer}>          
          <TextInput
            style={[
              styles.callingCodeText, 
              { color: colorScheme === 'light' ? 'black' : 'white' }
            ]}
            value={callingCode}
            onChangeText={setCallingCode}
            keyboardType='numeric'
            editable={false}
          />

          <TextInput
            style={[
              styles.phoneInput,
              { color: colorScheme === 'light' ? 'black' : 'white' }
            ]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder='Phone number'
            placeholderTextColor={Colors[colorScheme ?? 'light'].gray}
            keyboardType='numeric'
            autoFocus
          />
        </View>
      </View>
    </View>
  );
};

export default NewContactModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  separator: {
    height: 0.5,
    marginLeft: 16,
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
  phoneNumberSection: {
    borderRadius: 12,
    backgroundColor: '#181414',
  },
  countrySelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  countryText: {
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  callingCodeText: {
    fontSize: 16,
  },
  phoneInput: {
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
