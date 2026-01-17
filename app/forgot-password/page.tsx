"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
try {
        setSubmitting(true);
        const res = await fetch(API_ENDPOINTS.auth.forgotPassword, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send reset link");
      }

      toast({
        title: "Link sent",
        description: `If an account exists, a reset link was sent to ${values.email}.`,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md p-6 space-y-6 shadow-lg rounded-2xl">
          <div className="space-y-2 text-center">
            <h1 className="font-nav text-3xl font-bold tracking-tight">Forgot password</h1>
            <p className="text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Sending…" : "Send reset link"}
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-primary underline hover:text-primary/80">
                  Back to sign in
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}


