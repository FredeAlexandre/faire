"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@faire/pocketbase/client/auth";
import { Button } from "@faire/ui/button";
import { Input } from "@faire/ui/input";

export default function LoginPage() {
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast("Login with sucess !");
    },
    onError: (err) => {
      toast("Auth failed !\n" + err.message);
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="min-w-[30rem] space-y-4 rounded-xl border p-4">
          <p className="text-xl font-bold">Login</p>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full"
              id="email"
              type="email"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full"
              id="password"
              type="password"
            />
          </div>
          <div className="flex gap-2">
            <Button asChild className="w-full" variant="secondary">
              <Link href="/register">Create account</Link>
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                mutate({ email, password });
              }}
              className="w-full"
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
