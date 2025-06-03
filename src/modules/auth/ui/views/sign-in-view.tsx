"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Loader2Icon, OctagonAlertIcon } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { signInSchema } from "@/modules/schema";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";

export const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: ({ value }) => {
      setError(null);
      authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            form.reset();
            router.push("/");
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account.
                </p>
              </div>
              {error && (
                <Alert className="bg-destructive/10 text-destructive border-none">
                  <OctagonAlertIcon className="h-4 w-4" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              <div className="grid gap-3">
                <form.Field
                  name="email"
                  children={(field) => (
                    <>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email address"
                      />
                      {field.state.meta.errors?.map((err, i) =>
                        err ? (
                          <p key={i} className="text-destructive mt-1 text-xs">
                            {err.message ?? String(err)}
                          </p>
                        ) : null,
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <form.Field
                  name="password"
                  children={(field) => (
                    <>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
                      />
                      {field.state.meta.errors?.map((err, i) =>
                        err ? (
                          <p key={i} className="text-destructive mt-1 text-xs">
                            {err.message ?? String(err)}
                          </p>
                        ) : null,
                      )}
                    </>
                  )}
                />
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    className="w-full"
                    type="submit"
                    onClick={form.handleSubmit}
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                )}
              />
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Github
                </Button>
              </div>
              <div className="text-center text-sm">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link
                    className="opacity-90 hover:cursor-pointer hover:underline hover:opacity-100"
                    href="/sign-up"
                  >
                    Click here
                  </Link>{" "}
                  to create one.
                </p>
              </div>
            </div>
          </form>
          <div className="relative hidden flex-col items-center justify-center gap-y-4 bg-radial from-[#FFFBEB] to-[#FFDE5B] md:flex">
            <img
              src="/logo-transparent.png"
              alt="logo"
              className="h-[92px] w-[92px]"
            />
            <p className="text-2xl font-semibold">Linguine</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-4">
        By clicking continue you agree to our terms of service and privacy
        policy.
      </div>
    </div>
  );
};
