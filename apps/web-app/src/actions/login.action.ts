"use server";

import { cookies } from "next/headers";
import PocketBase from "pocketbase";

import { pocketBaseCookieExtractValue } from "~/lib/pocketbase-cookie-extract-value";
import { base_url } from "~/pocketbase";
import { client } from "./client";
import { loginSchema } from "./login.schema";

export const loginAction = client
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const pb = new PocketBase(base_url);

    try {
      await pb.collection("users").authWithPassword(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return {
        success: false,
        message: "Invalid credentials, failed to auth",
      } as const;
    }

    const value = pocketBaseCookieExtractValue(pb.authStore.exportToCookie());

    if (!value)
      return {
        success: false,
        message: "Internal server error, cookie failed to set",
      } as const;

    cookies().set("pb_auth", value, {
      maxAge: 1209600,
      sameSite: "strict",
      secure: true,
      httpOnly: false,
    });

    if (!value)
      return { success: true, message: "You are now connected !" } as const;
  });
