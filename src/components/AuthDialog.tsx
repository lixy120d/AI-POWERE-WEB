import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  location: z.string().min(2, "Enter your location"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthDialogProps {
  triggerClassName?: string;
  triggerSize?: "sm" | "default" | "lg" | "icon";
}

export const AuthDialog = ({ triggerClassName, triggerSize = "sm" }: AuthDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  const loginForm = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const signupForm = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    // If auth state changes to signed in, close dialog
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setOpen(false);
        setTab("login");
        loginForm.reset();
        signupForm.reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [loginForm, signupForm]);

  const onLogin = async (values: LoginFormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast({ title: "Login failed", description: error.message });
      return;
    }
    if (!data.session?.user.email_confirmed_at) {
      toast({ title: "Verify your email", description: "Please confirm your email to complete login." });
    } else {
      toast({ title: "Logged in", description: "Welcome back!" });
    }
    setOpen(false);
    loginForm.reset();
  };

  const onSignup = async (values: SignupFormValues) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          phone: values.phone,
          location: values.location,
        },
        emailRedirectTo: redirectUrl,
      },
    });
    if (error) {
      toast({ title: "Sign up failed", description: error.message });
      return;
    }
    toast({ title: "Check your email", description: "We sent a verification link to confirm your account." });
    setOpen(false);
    signupForm.reset();
    setTab("login");
  };

  const handleResetPassword = async () => {
    const email = loginForm.getValues("email");
    if (!email) {
      toast({ title: "Enter your email", description: "Please enter your email to reset your password." });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) {
      toast({ title: "Reset failed", description: error.message });
      return;
    }
    toast({ title: "Check your email", description: "We sent a password reset link to your email." });
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    });
    if (error) {
      toast({ title: "Google sign-in failed", description: error.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={triggerSize} className={triggerClassName}>Log In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tab === 'login' ? 'Log in to your account' : 'Create your account'}</DialogTitle>
          <DialogDescription>
            {tab === 'login' ? 'Enter your email and password to continue.' : 'Fill in your details to get started.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="you@example.com" {...loginForm.register("email")} />
                {loginForm.formState.errors.email && (
                  <p className="text-destructive text-sm">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" placeholder="••••••••" {...loginForm.register("password")} />
                {loginForm.formState.errors.password && (
                  <p className="text-destructive text-sm">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="flex justify-end -mt-2">
                <Button type="button" variant="link" size="sm" onClick={handleResetPassword}>Forgot password?</Button>
              </div>
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </form>
            <Separator className="my-4" />
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>Continue with Google</Button>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Jane Doe" {...signupForm.register("fullName")} />
                  {signupForm.formState.errors.fullName && (
                    <p className="text-destructive text-sm">{signupForm.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+256726798473" {...signupForm.register("phone")} />
                  {signupForm.formState.errors.phone && (
                    <p className="text-destructive text-sm">{signupForm.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Uganda, Kampala" {...signupForm.register("location")} />
                {signupForm.formState.errors.location && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.location.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="you@example.com" {...signupForm.register("email")} />
                {signupForm.formState.errors.email && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="••••••••" {...signupForm.register("password")} />
                {signupForm.formState.errors.password && (
                  <p className="text-destructive text-sm">{signupForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={signupForm.formState.isSubmitting}>
                  {signupForm.formState.isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </form>
            <Separator className="my-4" />
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>Continue with Google</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
