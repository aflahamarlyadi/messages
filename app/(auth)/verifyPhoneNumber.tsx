import { StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import { useAuth } from '@/context/AuthContext';

const CELL_COUNT = 6;

const VerifyPhoneNumberScreen = () => {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const { confirmCode } = useAuth();

  const { callingCode, phoneNumber } = useLocalSearchParams<{ callingCode: string, phoneNumber: string }>();

  const [code, setCode] = useState<string>('');
  const [showCaret, setShowCaret] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleNextPress = async () => {
    setLoading(true);

    try {
      await confirmCode(code);
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        Alert.alert(
          'Incorrect code',
          'The code entered is incorrect. Please try again.',
          [{ text: 'OK' }]
        );
        setCode('');
      } else {
        Alert.alert(
          'Something went wrong',
          'An unexpected error occurred. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setLoading(false);
    }
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
          Sent to <Text style={styles.subtitleEmphasis}>{callingCode}{phoneNumber}</Text>
        </Text>
      </View>

      <Pressable
        style={[styles.button, code.length !== CELL_COUNT ? { backgroundColor: 'gray' } : { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleNextPress}
        disabled={loading || code.length !== CELL_COUNT}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>

      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
            <Text>Verifying code...</Text>
          </View>
        </View>
      )}
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
  loadingContainer: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 28,
    borderRadius: 2,
  },
});
