"use client";

import * as React from "react";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";

import type { UtilsFor } from "~/utils/types";
import {
  loginAction as loginActionFn,
  registerAction as registerActionFn,
} from "~/actions/auth.actions";
import { deleteCookie } from "~/utils/delete-cookie";
import { usePocketBase } from "./use-pocketbase";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  created: z.string(),
  updated: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const useAuth = (opts?: {
  loginActionUtils?: UtilsFor<typeof loginActionFn>;
  registerActionUtils?: UtilsFor<typeof registerActionFn>;
}) => {
  const { loginActionUtils, registerActionUtils } = opts ?? {};

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

  const { executeAsync: loginAction } = useAction(
    loginActionFn,
    loginActionUtils,
  );

  const { executeAsync: registerAction } = useAction(
    registerActionFn,
    registerActionUtils,
  );

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await loginAction({ email, password });
    pb.authStore.loadFromCookie(document.cookie);
  };

  const logout = () => {
    pb.authStore.clear();
    deleteCookie("pb_auth");
  };

  const register = async ({
    email,
    password,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    await registerAction({ email, password, passwordConfirm });
    pb.authStore.loadFromCookie(document.cookie);
  };

  return {
    user,
    token,
    login,
    logout,
    register,
    isAuth: pb.authStore.isValid,
  };
};
