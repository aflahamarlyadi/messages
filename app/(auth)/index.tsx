import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const WelcomeScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.area}>

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Messages</Text>
      </View>

      <Link href={'/enterPhoneNumber'} replace asChild 
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme ?? 'light'].tint }
        ]}
      >
        <Pressable>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Link>

    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
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
