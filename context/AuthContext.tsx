import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
  confirmCode: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  signInWithPhoneNumber: async () => {},
  confirmCode: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);

      if (user) {
        const userDocument = await firestore().collection('users').doc(user.uid).get();
        if (!userDocument.exists) {
          await firestore().collection('users').doc(user.uid).set({
            phoneNumber: user.phoneNumber,
            name: null,
            profilePicture: null,
            email: null,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    });

    return unsubscribe;
  }, []);

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async (code: string) => {
    if (!confirm) return;

    await confirm.confirm(code);
    setConfirm(null);
  };

  const signOut = async () => {
    await auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        signInWithPhoneNumber,
        confirmCode,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
