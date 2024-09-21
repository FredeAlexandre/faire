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

  const user = React.useSyncExternalStore(
    (callback) => pb.authStore.onChange(callback),
    () => {
      const model = pb.authStore.model;
      return UserSchema.nullable().parse(model);
    },
  );

  const token = React.useSyncExternalStore(
    (callback) => pb.authStore.onChange(callback),
    () => pb.authStore.token,
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
