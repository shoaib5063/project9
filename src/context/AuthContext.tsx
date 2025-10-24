"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  AuthError,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { 
  RegisterData,
  LoginData,
  UpdateProfileData,
  ResetPasswordData
} from '@/lib/auth-types';


export interface AuthContextType {
  user: User | null;
  loading: boolean;
  registerUser: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  loginUser: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (data: UpdateProfileData) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (data: ResetPasswordData) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getErrorMessage = (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const authError = error as AuthError;
      switch (authError.code) {
        case 'auth/email-already-in-use':
          return 'This email address is already in use.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/weak-password':
          return 'The password is too weak.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return 'Invalid email or password.';
        case 'auth/network-request-failed':
          return 'Network error. Please try again.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    try {
      const { name, email, password, photoURL } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      setUser(userCredential.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: LoginData) => {
    setLoading(true);
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      // Handle logout error if needed
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: UpdateProfileData) => {
    if (!user) return { success: false, error: "You must be logged in to update your profile." };
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: data.name ?? user.displayName,
        photoURL: data.photoURL ?? user.photoURL,
      });
      // Manually update the user state as updateProfile doesn't trigger onAuthStateChanged
      setUser({ ...user }); 
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  };

  const value = {
    user,
    loading,
    registerUser,
    loginUser,
    logoutUser,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
