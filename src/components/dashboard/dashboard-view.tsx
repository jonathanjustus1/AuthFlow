"use client";

import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import type { UserProfile } from "@/hooks/use-auth-session";

interface DashboardViewProps {
  user: User;
  profile: UserProfile;
}

export default function DashboardView({ user, profile }: DashboardViewProps) {
  const { toast } = useToast();

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error: any) {
      toast({
        title: "Error Signing Out",
        description: error.message || "There was an issue signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Welcome, {profile.firstName}!</CardTitle>
        <CardDescription>You are logged in as {user.email}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This is your dashboard. You have successfully authenticated and created a profile.</p>
          <p className="text-sm text-muted-foreground">More features coming soon!</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignOut} className="w-full" variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}
