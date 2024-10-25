import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const EnterPhoneNumberScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { selectedCountry } = useLocalSearchParams();

  const [country, setCountry] = useState<Country>({
    name: 'United States',
    code: 'US',
    callingCode: '+1',
    flag: '🇺🇸',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      const parsedCountry: Country = JSON.parse(selectedCountry as string);
      setCountry(parsedCountry);
      setPhoneNumber('');
    }
  }, [selectedCountry]);

  const openSelectCountry = () => {
    router.push('/selectCountry');
  };

  const handleNextPress = () => {
    router.push(`/verifyPhoneNumber?phoneNumber=${phoneNumber}`);
  };

  return (
    <View style={styles.area}>
      <View style={styles.container}>

        <Text style={styles.title}>
          Enter your phone number
        </Text>

        <View style={styles.inputContainer}>
          <Pressable
            style={[
              styles.selectCountry,
              { borderBottomColor: colorScheme === 'light' ? 'black' : 'white' }
            ]}
            onPress={openSelectCountry}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={styles.countryCode}>{country.callingCode}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={colorScheme === 'light' ? 'black' : 'white'}  />
          </Pressable>

          <TextInput
            style={[
              styles.input,
              { color: colorScheme === 'light' ? 'black' : 'white', borderBottomColor: colorScheme === 'light' ? 'black' : 'white' }
            ]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType='numeric'
            autoFocus={true}
            cursorColor='black'
            selectionColor='#808080'
          />
        </View>

        <Text style={styles.subtitle}>
          Messages will send you a text with a verification code.
        </Text>

      </View>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme ?? 'light'].tint }
        ]}
        onPress={handleNextPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>

    </View>
  );
}

export default EnterPhoneNumberScreen;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 128,
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  flag: {
    fontSize: 24,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  selectCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomWidth: 2,
  },
  input: {
    flex: 1,
    paddingBottom: 4,
    borderBottomWidth: 2,
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    padding: 14,
    margin: 32,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
