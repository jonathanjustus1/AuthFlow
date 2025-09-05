
"use client";

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { getAdditionalUserInfo } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  firstName: string;
  lastName: string;
  role?: string; 
  dateOfBirth?: Date;
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
          const profileDocRef = doc(db, 'profiles', user.uid);
          
          const unsubscribeProfile = onSnapshot(profileDocRef, async (snapshot) => {
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
              setSession(s => ({
                ...s,
                profile: profileData,
                profileLoading: false,
              }));
            } else {
              // Profile does not exist, check if this is a new social user
              // This is a bit of a workaround because onAuthStateChanged doesn't give us the full credential
              // A more robust way is to handle this in the signInWithPopup().then() block, but that scatters logic.
              // We'll try to handle it here based on user metadata.
              const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
              
              if (isNewUser && user.displayName) {
                try {
                  const [firstName, ...lastNameParts] = user.displayName.split(' ');
                  const lastName = lastNameParts.join(' ');
                  const newProfile: UserProfile = {
                    firstName: firstName || '',
                    lastName: lastName || '',
                  };
                  await setDoc(profileDocRef, newProfile);
                  // The onSnapshot listener will then pick up this new document
                } catch (error) {
                    console.error("Error creating profile for new social user:", error);
                    setSession(s => ({ ...s, profile: null, profileLoading: false }));
                }
              } else {
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
