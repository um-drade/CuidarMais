import { createContext, useContext, useState, type ReactNode } from 'react';

import * as authService from '@/services/auth';
import type { User } from '@/types/app';

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextValue = {
    user,
    signIn: async (email, password) => {
      setUser(await authService.signIn(email, password));
    },
    signUp: async (name, email, password) => {
      setUser(await authService.signUp(name, email, password));
    },
    signOut: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  }
  return context;
}
