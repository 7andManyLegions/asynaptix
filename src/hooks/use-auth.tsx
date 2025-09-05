
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const provider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  // Simulate a logged-in user to bypass auth issues for development
  const mockUser: User = {
    uid: 'mock-user-id',
    email: 'dev@asynaptix.com',
    displayName: 'Dev User',
    photoURL: 'https://picsum.photos/100/100',
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    providerId: 'firebase',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'mock-token',
    getIdTokenResult: async () => ({
        token: 'mock-token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
  };

  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false); // Set loading to false as we are not waiting for a real auth check
  const router = useRouter();

  // The original useEffect is commented out to prevent real auth calls
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     setLoading(false);
  //   }, (error) => {
  //     console.error("Firebase Auth Error:", error);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const loginWithGoogle = async () => {
    console.log("Simulating Google login.");
    setUser(mockUser);
    return Promise.resolve();
  };

  const logout = async () => {
    console.log("Simulating logout.");
    setUser(null);
    router.push('/login');
    return Promise.resolve();
  };
  
  if (loading) {
    return null; // This will not be hit with the current setup but kept for safety
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
