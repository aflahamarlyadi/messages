import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, memo } from 'react';
import { Stack, useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { countries } from '@/constants/Countries';

const CountryItem = memo(({ item, onSelect }: { item: Country; onSelect: (country: Country) => void }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.itemContainer}>
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.callingCode}>{item.callingCode}</Text>
    </TouchableOpacity>
  );
});

export default function SelectCountryModal() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleCountrySelect = (country: Country) => {
    router.push({
      pathname: '/enterPhone', 
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
