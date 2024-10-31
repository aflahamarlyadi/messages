import { StyleSheet, Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

const SettingsScreen = () => {
  const colorScheme = useColorScheme();

  const { signOut } = useAuth();

  const handleLogOutPress = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleLogOutPress}
      >
        <Text style={styles.title}>Log out</Text>
      </Pressable>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});
