"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// E.164 phone number format validation
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const phoneFormSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, { message: "Please enter a valid phone number (e.g., +11234567890)." }),
});

const codeFormSchema = z.object({
  code: z.string().min(6, { message: "Code must be 6 digits." }),
});

export default function PhoneSignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const { toast } = useToast();

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: { phoneNumber: "" },
  });

  const codeForm = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (!auth) return;
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (!recaptchaContainer) return;
    
    // Check if verifier is already initialized
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }

    return () => {
        // We don't clear the verifier here to avoid re-creating it on every render
    }
  }, [auth]);

  async function onPhoneSubmit(values: z.infer<typeof phoneFormSchema>) {
    if (!auth || !window.recaptchaVerifier) return;
    setIsLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, values.phoneNumber, appVerifier);
      setConfirmationResult(result);
      toast({
        title: "Code Sent",
        description: "A verification code has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
       if (window.recaptchaVerifier && window.grecaptcha) {
            window.recaptchaVerifier.render().then((widgetId: any) => {
                if(auth) {
                    window.grecaptcha.reset(widgetId);
                }
            });
        }
    } finally {
      setIsLoading(false);
    }
  }

  async function onCodeSubmit(values: z.infer<typeof codeFormSchema>) {
    if (!confirmationResult) return;
    setIsLoading(true);
    try {
      await confirmationResult.confirm(values.code);
      // The useAuthSession hook will handle redirection to the profile form
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (confirmationResult) {
    return (
      <Form {...codeForm}>
        <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
          <FormField
            control={codeForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Code
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <>
      <Form {...phoneForm}>
        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
          <FormField
            control={phoneForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+11234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Verification Code
          </Button>
        </form>
      </Form>
      <div id="recaptcha-container" className="mt-4"></div>
    </>
  );
}

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        grecaptcha: any;
    }
}
