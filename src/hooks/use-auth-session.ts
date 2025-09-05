"use client";

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, onSnapshot } from 'firebase/firestore';

export interface UserProfile {
  firstName: string;
  lastName: string;
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
        // User is signed in, now check for profile
        setSession(s => ({ ...s, user, loading: false, profileLoading: true }));
        if (db) {
          const profileDocRef = doc(db, 'users', user.uid);
          // Use onSnapshot for real-time updates
          const unsubscribeProfile = onSnapshot(profileDocRef, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              const profileData: UserProfile = {
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
              };
              if (data.dateOfBirth) {
                profileData.dateOfBirth = data.dateOfBirth.toDate();
              }
               if (data.accountCreationTime) {
                profileData.accountCreationTime = data.accountCreationTime.toDate();
              }
              if (data.lastSignInTime) {
                profileData.lastSignInTime = data.lastSignInTime.toDate();
              }
              setSession(s => ({
                ...s,
                profile: profileData,
                profileLoading: false,
              }));
            } else {
              // Profile does not exist, user needs to create one.
              setSession(s => ({ ...s, profile: null, profileLoading: false }));
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
