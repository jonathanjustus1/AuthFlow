import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignUpForm from "./sign-up-form";
import SignInForm from "./sign-in-form";
import PhoneSignInForm from "./phone-sign-in-form";

export default function AuthView() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">AuthFlow Pro</CardTitle>
        <CardDescription>Welcome! Sign in or create an account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sign-in">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="pt-4">
            <SignInForm />
          </TabsContent>
          <TabsContent value="phone" className="pt-4">
            <PhoneSignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="pt-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
}
