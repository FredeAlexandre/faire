"use client";

import * as React from "react";
import { z } from "zod";

import { usePocketBase } from "./use-pocketbase";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  created: z.string(),
  updated: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const useAuth = () => {
  const pb = usePocketBase();

  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState("");

  React.useEffect(
    () =>
      pb.authStore.onChange((token, model) => {
        setToken(token);
        setUser(UserSchema.nullable().parse(model));
      }),
    [pb],
  );

  const login = ({ email, password }: { email: string; password: string }) => {
    return pb.collection("users").authWithPassword(email, password);
  };

  const logout = () => {
    return pb.authStore.clear();
  };

  const register = async (
    data: {
      email: string;
      password: string;
      repassword: string;
    } & Partial<User>,
  ) => {
    return pb.collection("users").create(data);
  };

  return { user, token, login, logout, register, isAuth: user !== null };
};
