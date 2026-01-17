"use client";

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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);

      const token = params?.token;
      if (!token) {
        toast({
          title: "Invalid link",
          description: "Missing reset token in the URL.",
          variant: "destructive",
        });
        return;
      }

const res = await fetch(API_ENDPOINTS.auth.resetPassword(token), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
        });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      toast({
        title: "Password updated",
        description: "Password has been updated successfully. Redirecting to login...",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
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
            <h1 className="font-nav text-3xl font-bold tracking-tight">Reset password</h1>
            <p className="text-muted-foreground">
              Enter and confirm your new password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="New password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Updating…" : "Update password"}
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


