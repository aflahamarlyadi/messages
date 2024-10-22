import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect, memo } from 'react';
import { useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';

interface Country {
  name: string;
  alpha2Code: string;
  callingCode: string;
  flag: string;
}

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

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const getFlag = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 0x1F1E6 + char.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
  };

  const handleCountrySelect = (country: Country) => {
    router.push({
      pathname: '/enterPhone', 
      params: { selectedCountry: JSON.stringify(country) }
    });
  };

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(response => response.json())
      .then(data => {
        const countryData = data.map((item: any) => ({
          name: item.name,
          alpha2Code: item.alpha2Code,
          callingCode: `+${item.callingCodes[0]}`,
          flag: getFlag(item.alpha2Code),
        }));

        setCountries(countryData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
    {loading ? (
      <ActivityIndicator size="large" color="black" />
    ) : (
      <FlatList
        data={countries}
        keyExtractor={(item) => item.alpha2Code}
        renderItem={({ item }) => <CountryItem item={item} onSelect={handleCountrySelect} />}
      />
    )}
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
    padding: 16,
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
