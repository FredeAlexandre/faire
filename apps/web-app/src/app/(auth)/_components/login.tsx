"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { pb } from "@faire/pocketbase";
import { Button } from "@faire/ui/button";
import { Input } from "@faire/ui/input";
import { toast } from "@faire/ui/toast";

export function Login() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return pb.collection("users").authWithPassword(email, password);
    },
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
  );
}
