"use client";

import { useAuthSession } from '@/hooks/use-auth-session';
import AuthView from '@/components/auth/auth-view';
import ProfileForm from '@/components/profile/profile-form';
import DashboardView from '@/components/dashboard/dashboard-view';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { auth } from '@/lib/firebase/client';

export default function Home() {
  const { user, profile, loading, profileLoading } = useAuthSession();

  const renderContent = () => {
    if (!auth) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" />
              Firebase Not Configured
            </CardTitle>
            <CardDescription>
              Your Firebase environment variables are not set. Please follow the instructions in the README.md to configure your Firebase project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>You need to create a `.env.local` file with your Firebase project's credentials.</p>
          </CardContent>
        </Card>
      );
    }

    if (loading || (user && profileLoading)) {
      return (
        <Card className="flex h-96 items-center justify-center">
          <CardContent>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      );
    }

    if (!user) {
      return <AuthView />;
    }

    if (!profile) {
      return <ProfileForm user={user} />;
    }

    return <DashboardView user={user} profile={profile} />;
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">{renderContent()}</div>
    </main>
  );
}
