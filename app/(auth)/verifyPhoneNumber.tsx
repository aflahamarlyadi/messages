import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const CELL_COUNT = 6;

const VerifyPhoneNumberScreen = () => {
  const colorScheme = useColorScheme();
  const [code, setCode] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const { phoneNumber } = useLocalSearchParams();
  const router = useRouter();

  const handleTextChange = (text: string) => {
    if (text.length <= CELL_COUNT) {
      setCode(text);
    }
  };

  useEffect(() => {
    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);

    return () => clearInterval(caretInterval);
  }, []);

  const handleNextPress = () => {
    router.push('/(messages)');
  };

  return (
    <View style={styles.area}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter your verification code
        </Text>

        <TextInput
          style={styles.hiddenInput}
          value={code}
          onChangeText={handleTextChange}
          maxLength={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoFocus
        />

        <View style={styles.codeFieldContainer}>
          {Array.from({ length: CELL_COUNT }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeFieldCell,
                { borderBottomColor: colorScheme === 'light' ? 'black' : 'white' }
              ]}
            >
              <Text style={styles.codeFieldText}>
                {code[index] || ''}
              </Text>
              {showCaret && index === code.length && (
                <View
                  style={[
                    styles.caret,
                    { backgroundColor: colorScheme === 'light' ? 'black' : 'white' }
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <Text style={styles.subtitle}>
          Sent to <Text style={styles.subtitleEmphasis}>{phoneNumber}</Text>
        </Text>
      </View>

      <Pressable
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleNextPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

export default VerifyPhoneNumberScreen;

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
  subtitleEmphasis: {
    fontWeight: 'bold',
  },
  codeFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  codeFieldCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
    borderBottomWidth: 2,
  },
  codeFieldText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caret: {
    width: 2,
    height: '80%',
    position: 'absolute',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
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
