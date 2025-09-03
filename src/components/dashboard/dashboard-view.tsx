"use client";

import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User as UserIcon } from "lucide-react";
import type { UserProfile } from "@/hooks/use-auth-session";
import { Badge } from "@/components/ui/badge";

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
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <UserIcon className="h-8 w-8 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-semibold">{profile.firstName} {profile.lastName}</span>
              {profile.role && <Badge variant="secondary" className="w-fit capitalize">{profile.role}</Badge>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This is your dashboard. You have successfully authenticated and created a profile.</p>
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
