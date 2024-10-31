import { StyleSheet, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import firestore from '@react-native-firebase/firestore';

const ChatsScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);

  const handleChatPress = (chatId: string) => {
    router.push(`/(tabs)/(chats)/${chatId}`);
  }

  return (
    <View style={styles.container}>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
