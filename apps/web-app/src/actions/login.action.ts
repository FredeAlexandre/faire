"use server";

import { cookies } from "next/headers";

import { createPocketBase } from "@faire/pocketbase";

import { pocketBaseCookieExtractValue } from "~/lib/pocketbase-cookie-extract-value";
import { client } from "./client";
import { loginSchema } from "./login.schema";

export const loginAction = client
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const pb = createPocketBase();

    await pb.collection("users").authWithPassword(email, password);

    const value = pocketBaseCookieExtractValue(pb.authStore.exportToCookie());

    if (!value) return { success: false };

    cookies().set("pb_auth", value, {
      maxAge: 1209600,
      sameSite: "strict",
      secure: true,
      httpOnly: false,
    });

    if (!value) return { success: true };
  });
