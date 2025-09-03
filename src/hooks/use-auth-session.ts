"use client";

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, onSnapshot } from 'firebase/firestore';

export interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date; // Made optional as it's not collected on all sign-up methods
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

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      setSession(s => ({ ...s, user, loading: false }));
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (session.user && db) {
      setSession(s => ({ ...s, profileLoading: true }));
      const profileDocRef = doc(db, 'profiles', session.user.uid);
      const unsubscribeProfile = onSnapshot(profileDocRef, snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const profileData: UserProfile = {
            firstName: data.firstName,
            lastName: data.lastName,
          };
          if (data.dateOfBirth) {
            profileData.dateOfBirth = data.dateOfBirth.toDate();
          }
          setSession(s => ({
            ...s,
            profile: profileData,
            profileLoading: false,
          }));
        } else {
          setSession(s => ({ ...s, profile: null, profileLoading: false }));
        }
      }, (error) => {
        console.error("Error fetching profile:", error);
        setSession(s => ({ ...s, profile: null, profileLoading: false }));
      });
      return () => unsubscribeProfile();
    } else {
      // No user, so clear profile and set loading to false
      setSession(s => ({ ...s, profile: null, profileLoading: false }));
    }
  }, [session.user]);

  return session;
}
