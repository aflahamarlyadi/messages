import { StyleSheet, FlatList, Pressable } from 'react-native';
import { useState, useEffect, memo } from 'react';
import { Stack, useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import { countries } from '@/constants/Countries';

const CountryItem = memo(({ item, onSelect }: { item: Country; onSelect: (country: Country) => void }) => {
  return (
    <Pressable onPress={() => onSelect(item)} style={styles.itemContainer}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.callingCode}>{item.callingCode}</Text>
    </Pressable>
  );
});

const SelectCountryModal = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleCountrySelect = (country: Country) => {
    router.push({
      pathname: '/enterPhoneNumber', 
      params: { selectedCountry: JSON.stringify(country) }
    });
  };

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().startsWith(lowercasedQuery) ||
      country.callingCode.includes(lowercasedQuery)
    );
    setFilteredCountries(filtered);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerSearchBarOptions: {
          placeholder: 'Search countries',
          onChangeText: (event) => setSearchQuery(event.nativeEvent.text),
          hintTextColor: 'gray',
          headerIconColor: colorScheme === 'light' ? 'black' : 'white',
          textColor: colorScheme === 'light' ? 'black' : 'white',
        },
      }} />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => <CountryItem item={item} onSelect={handleCountrySelect} />}
      />
  </View>
  );
}

export default SelectCountryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  callingCode: {
    fontSize: 16,
    fontWeight:'bold',
    color: 'gray',
  },
});
