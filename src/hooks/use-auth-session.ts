"use client";

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, onSnapshot, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email?: string;
  providerId?: string;
  role?: string; 
  dateOfBirth?: Date;
  accountCreationTime?: Date;
  lastSignInTime?: Date;
}

interface AuthSession {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
}

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    profile: null,
    loading: true,
    profileLoading: true,
  });

  useEffect(() => {
    if (!auth) {
      setSession({
        user: null,
        profile: null,
        loading: false,
        profileLoading: false,
      });
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setSession(s => ({ ...s, user, loading: false, profileLoading: true }));
        if (db) {
          const profileDocRef = doc(db, 'users', user.uid);

          const unsubscribeProfile = onSnapshot(profileDocRef, async (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              const profileData: UserProfile = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                providerId: data.providerId,
                role: data.role,
                dateOfBirth: data.dateOfBirth?.toDate(),
                accountCreationTime: data.accountCreationTime?.toDate(),
                lastSignInTime: data.lastSignInTime?.toDate(),
              };
              setSession(s => ({
                ...s,
                profile: profileData,
                profileLoading: false,
              }));
            } else {
              // Profile doesn't exist, this must be the very first sign-in for this user.
              // Create the profile document.
                try {
                  const [firstName, lastName] = user.displayName?.split(" ") || ["", ""];
                  const newProfileData = {
                      firstName: firstName,
                      lastName: lastName,
                      email: user.email,
                      providerId: user.providerData[0]?.providerId || 'unknown',
                      accountCreationTime: user.metadata.creationTime ? new Date(user.metadata.creationTime) : serverTimestamp(),
                      lastSignInTime: user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime) : serverTimestamp(),
                  };
                  await setDoc(profileDocRef, newProfileData);
                  // The onSnapshot listener will pick this up and update the session state,
                  // but we'll show the profile form because dateOfBirth is missing.
                } catch (error) {
                    console.error("Error creating user profile:", error);
                    setSession(s => ({ ...s, profile: null, profileLoading: false }));
                }
            }
          }, (error) => {
            console.error("Error fetching profile:", error);
            setSession(s => ({ ...s, profile: null, profileLoading: false }));
          });
          return () => unsubscribeProfile();
        }
      } else {
        // User is signed out
        setSession({ user: null, profile: null, loading: false, profileLoading: false });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return session;
}
