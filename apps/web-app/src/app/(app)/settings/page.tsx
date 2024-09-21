"use client";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Button } from "@faire/ui/button";

import { logoutAction } from "~/actions/auth.actions";

export default function Settings() {
  const router = useRouter();

  const { execute: logout } = useAction(logoutAction, {
    onSuccess() {
      router.push("/");
    },
    onError({ error }) {
      toast.error("Something went wrong", { description: error.serverError });
    },
  });

  return (
    <div className="container max-w-[48rem] pt-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
