"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store';
import { loginUser } from '@/store/slices/authSlice';
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await dispatch(loginUser(data));
      if (loginUser.rejected.match(result)) {
        const err = (result.payload as string) || result.error?.message || 'Login failed';
        toast({ title: 'Error', description: String(err), variant: 'destructive' });
        return;
      }
      toast({ title: 'Success!', description: 'Welcome back!' });
      router.push('/dashboard');
    } catch (err) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        
        <Card className="relative w-full max-w-md glass-card rounded-3xl p-8 space-y-8 border-border/50 shadow-2xl">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
              <Lock className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-2 text-center pt-8">
            <h1 className="font-nav text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your trading journey</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          className="pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="Your password" 
                          {...field} 
                          className="pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground">or</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </Form>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Join 10,000+ successful traders</span>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
