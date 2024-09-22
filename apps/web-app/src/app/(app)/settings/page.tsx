"use client";

import { useRouter } from "next/navigation";

import { Button } from "@faire/ui/button";

import { useAuth } from "~/pocketbase/use-auth";

export default function Settings() {
  const router = useRouter();

  const { logout } = useAuth();

  return (
    <div className="container max-w-[48rem] pt-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Button
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
