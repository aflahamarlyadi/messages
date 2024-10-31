import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


const ChatScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);


  if (!user) return;

  return (
    <View>
    </View>
  );
};

export default ChatScreen;
