import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignUpForm from "./sign-up-form";
import SignInForm from "./sign-in-form";
import PhoneSignInForm from "./phone-sign-in-form";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


export default function AuthView() {
  const [isSocialLoading, setIsSocialLoading] = useState<"google" | null>(null);
  const { toast } = useToast();

   const handleSocialSignIn = async (providerName: "google") => {
    if (!auth) return;
    setIsSocialLoading(providerName);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The useAuthSession hook will handle redirection to the profile form
      // if the user is new.
    } catch (error: any) {
      toast({
        title: "Social Sign In Failed",
        description: error.message || "Could not sign in with the selected provider. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSocialLoading(null);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">AuthFlow Pro</CardTitle>
        <CardDescription>Welcome! Sign in or create an account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Email</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="pt-4">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="pt-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-1">
            <Button variant="outline" onClick={() => handleSocialSignIn("google")} disabled={!!isSocialLoading}>
            {isSocialLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icons name="google" className="mr-2 h-4 w-4" />}
            Google
            </Button>
        </div>

      </CardContent>
    </Card>
  );
}
