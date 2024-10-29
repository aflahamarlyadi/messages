import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, []);

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
